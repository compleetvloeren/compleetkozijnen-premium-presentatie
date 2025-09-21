import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  session_id: string;
  visitor_id: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  country_code?: string;
  city?: string;
  ip_address?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  screen_resolution?: string;
  viewport_size?: string;
  is_mobile?: boolean;
  is_tablet?: boolean;
  is_desktop?: boolean;
  entry_page?: boolean;
  exit_page?: boolean;
  session_duration?: number;
  page_views_in_session?: number;
  is_bounce?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface PerformanceData {
  session_id: string;
  page_path: string;
  load_time?: number;
  dom_content_loaded?: number;
  first_contentful_paint?: number;
  largest_contentful_paint?: number;
  cumulative_layout_shift?: number;
  first_input_delay?: number;
  total_blocking_time?: number;
}

class AnalyticsTracker {
  private sessionId: string;
  private visitorId: string;
  private pageStartTime: number;
  private sessionStartTime: number;
  private pageViewCount: number;
  private performanceObserver?: PerformanceObserver;

  constructor() {
    this.sessionId = this.getSessionId();
    this.visitorId = this.getVisitorId();
    this.pageStartTime = Date.now();
    this.sessionStartTime = this.getSessionStartTime();
    this.pageViewCount = this.getPageViewCount();
    this.setupPerformanceTracking();
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('analytics_session_id', sessionId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
      sessionStorage.setItem('page_view_count', '0');
    }
    return sessionId;
  }

  private getVisitorId(): string {
    let visitorId = localStorage.getItem('analytics_visitor_id');
    if (!visitorId) {
      visitorId = this.generateId();
      localStorage.setItem('analytics_visitor_id', visitorId);
    }
    return visitorId;
  }

  private getSessionStartTime(): number {
    const startTime = sessionStorage.getItem('session_start_time');
    return startTime ? parseInt(startTime) : Date.now();
  }

  private getPageViewCount(): number {
    const count = sessionStorage.getItem('page_view_count') || '0';
    const newCount = parseInt(count) + 1;
    sessionStorage.setItem('page_view_count', newCount.toString());
    return newCount;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private getDeviceInfo() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(ua);
    const isDesktop = !isMobile && !isTablet;

    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    return {
      device_type: isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop',
      browser,
      os,
      is_mobile: isMobile,
      is_tablet: isTablet,
      is_desktop: isDesktop,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
  }

  private async getDetailedLocationData() {
    try {
      // Use ipapi.co for detailed location data
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return {
          ip_address: data.ip,
          country_code: data.country_code || 'NL',
          country_name: data.country_name || 'Netherlands',
          region: data.region || 'North Holland',
          region_code: data.region_code || 'NH',
          city: data.city || 'Amsterdam',
          postal_code: data.postal || '',
          latitude: data.latitude || 52.3676,
          longitude: data.longitude || 4.9041,
          timezone: data.timezone || 'Europe/Amsterdam',
          isp: data.org || '',
          organization: data.org || '',
          asn: data.asn || ''
        };
      }
    } catch (error) {
      console.warn('Primary IP geolocation failed, trying fallback');
    }

    // Fallback service with less detail
    try {
      const response = await fetch('https://api.bigdatacloud.net/data/client-ip');
      if (response.ok) {
        const data = await response.json();
        return {
          ip_address: data.ipString || '',
          country_code: data.countryCode || 'NL',
          country_name: data.countryName || 'Netherlands',
          region: data.principalSubdivision || 'North Holland',
          region_code: data.principalSubdivisionCode || 'NH',
          city: data.city || data.locality || 'Amsterdam',
          postal_code: data.postcode || '',
          latitude: data.location?.latitude || 52.3676,
          longitude: data.location?.longitude || 4.9041,
          timezone: data.location?.timeZone?.name || 'Europe/Amsterdam',
          isp: data.network?.organisation || '',
          organization: data.network?.organisation || '',
          asn: data.network?.registeredCountryGeoId || ''
        };
      }
    } catch (error) {
      console.warn('All geolocation services failed');
    }

    // Default fallback for Netherlands
    return {
      ip_address: '',
      country_code: 'NL',
      country_name: 'Netherlands',
      region: 'North Holland',
      region_code: 'NH',
      city: 'Amsterdam',
      postal_code: '1012',
      latitude: 52.3676,
      longitude: 4.9041,
      timezone: 'Europe/Amsterdam',
      isp: 'Unknown',
      organization: 'Unknown',
      asn: 'Unknown'
    };
  }

  private getUTMParameters(): Record<string, string> {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || ''
    };
  }

  private setupPerformanceTracking() {
    if ('PerformanceObserver' in window) {
      // Track Core Web Vitals
      this.performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.trackPerformance({
              largest_contentful_paint: entry.startTime
            });
          }
          if (entry.entryType === 'first-input') {
            this.trackPerformance({
              first_input_delay: (entry as any).processingStart - entry.startTime
            });
          }
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            this.trackPerformance({
              cumulative_layout_shift: (entry as any).value
            });
          }
        }
      });

      this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // Track load times
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          this.trackPerformance({
            load_time: perfData.loadEventEnd - perfData.fetchStart,
            dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
            first_contentful_paint: this.getFirstContentfulPaint()
          });
        }
      }, 1000);
    });
  }

  private getFirstContentfulPaint(): number {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  async trackPageView(isEntryPage: boolean = false) {
    const deviceInfo = this.getDeviceInfo();
    const utmParams = this.getUTMParameters();
    const locationData = await this.getDetailedLocationData();
    const sessionDuration = Date.now() - this.sessionStartTime;
    const isBounce = this.pageViewCount === 1 && sessionDuration < 30000;

    // Track detailed visitor session
    try {
      await this.trackVisitorSession(locationData, deviceInfo, sessionDuration, isBounce);
    } catch (error) {
      console.error('Failed to track visitor session:', error);
    }

    // Track page view analytics
    const analyticsData: AnalyticsData = {
      session_id: this.sessionId,
      visitor_id: this.visitorId,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      country_code: locationData.country_code,
      city: locationData.city,
      ip_address: locationData.ip_address,
      entry_page: isEntryPage,
      session_duration: Math.floor(sessionDuration / 1000),
      page_views_in_session: this.pageViewCount,
      is_bounce: isBounce,
      ...deviceInfo,
      ...utmParams
    };

    try {
      await supabase.from('website_analytics').insert(analyticsData);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  private async trackVisitorSession(locationData: any, deviceInfo: any, sessionDuration: number, isBounce: boolean) {
    const sessionData = {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      ip_address: locationData.ip_address,
      last_activity_at: new Date().toISOString(),
      
      // Detailed location
      country_code: locationData.country_code,
      country_name: locationData.country_name,
      region: locationData.region,
      region_code: locationData.region_code,
      city: locationData.city,
      postal_code: locationData.postal_code,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      
      // ISP and network
      isp: locationData.isp,
      organization: locationData.organization,
      asn: locationData.asn,
      
      // Device info
      user_agent: navigator.userAgent,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      device_type: deviceInfo.device_type,
      screen_resolution: deviceInfo.screen_resolution,
      viewport_size: deviceInfo.viewport_size,
      
      // Session stats
      page_views: this.pageViewCount,
      session_duration: Math.floor(sessionDuration / 1000),
      is_bounce: isBounce
    };

    // Try to update existing session first, if not exists then insert
    const { error: updateError } = await supabase
      .from('visitor_sessions')
      .update(sessionData)
      .eq('visitor_id', this.visitorId)
      .eq('session_id', this.sessionId);

    if (updateError) {
      // Session doesn't exist, insert new one
      await supabase.from('visitor_sessions').insert({
        ...sessionData,
        first_visit_at: new Date().toISOString()
      });
    }
  }

  async trackPerformance(performanceData: Partial<PerformanceData>) {
    const data: PerformanceData = {
      session_id: this.sessionId,
      page_path: window.location.pathname,
      ...performanceData
    };

    try {
      await supabase.from('page_performance').insert(data);
    } catch (error) {
      console.error('Failed to track performance:', error);
    }
  }

  async trackFormConversion(formType: string, conversionFunnel?: any, timeToConvert?: number, abandonmentStep?: string) {
    const data = {
      session_id: this.sessionId,
      form_type: formType,
      page_path: window.location.pathname,
      conversion_funnel: conversionFunnel,
      time_to_convert: timeToConvert,
      abandonment_step: abandonmentStep
    };

    try {
      await supabase.from('form_conversions').insert(data);
    } catch (error) {
      console.error('Failed to track form conversion:', error);
    }
  }

  trackPageExit() {
    const sessionDuration = Date.now() - this.pageStartTime;
    // Update exit page info
    this.trackPageView();
  }

  destroy() {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

let tracker: AnalyticsTracker | null = null;

export const useAnalyticsTracking = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      tracker = new AnalyticsTracker();
      tracker.trackPageView(true);
      isInitialized.current = true;
    }

    const handleBeforeUnload = () => {
      if (tracker) {
        tracker.trackPageExit();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && tracker) {
        tracker.trackPageExit();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (tracker) {
        tracker.destroy();
      }
    };
  }, []);

  return {
    trackFormConversion: (formType: string, conversionFunnel?: any, timeToConvert?: number, abandonmentStep?: string) => {
      if (tracker) {
        tracker.trackFormConversion(formType, conversionFunnel, timeToConvert, abandonmentStep);
      }
    },
    trackPerformance: (performanceData: Partial<PerformanceData>) => {
      if (tracker) {
        tracker.trackPerformance(performanceData);
      }
    }
  };
};