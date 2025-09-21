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

interface DetailedLocationData {
  ip_address: string;
  country_code: string;
  country_name: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
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

class AdvancedAnalyticsTracker {
  private sessionId: string;
  private visitorId: string;
  private pageStartTime: number;
  private sessionStartTime: number;
  private pageViewCount: number;
  private performanceObserver?: PerformanceObserver;
  private locationData: DetailedLocationData | null = null;
  private isTrackingInitialized = false;

  constructor() {
    this.sessionId = this.getSessionId();
    this.visitorId = this.getVisitorId();
    this.pageStartTime = Date.now();
    this.sessionStartTime = this.getSessionStartTime();
    this.pageViewCount = this.getPageViewCount();
    this.initializeTracking();
  }

  private async initializeTracking() {
    if (this.isTrackingInitialized) return;
    
    this.locationData = await this.getDetailedLocationData();
    this.isTrackingInitialized = true;
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
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';

    let os = 'Unknown';
    if (ua.includes('Windows NT')) os = 'Windows';
    else if (ua.includes('Mac OS X')) os = 'macOS';
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

  private async getDetailedLocationData(): Promise<DetailedLocationData> {
    const services = [
      {
        url: 'https://ipapi.co/json/',
        parser: (data: any) => ({
          ip_address: data.ip || 'unknown',
          country_code: data.country_code || 'NL',
          country_name: data.country_name || 'Netherlands',
          region: data.region || 'North Holland',
          city: data.city || 'Amsterdam',
          latitude: parseFloat(data.latitude) || 52.3676,
          longitude: parseFloat(data.longitude) || 4.9041,
          timezone: data.timezone || 'Europe/Amsterdam',
          isp: data.org || 'Unknown'
        })
      },
      {
        url: 'https://api.bigdatacloud.net/data/client-ip',
        parser: (data: any) => ({
          ip_address: data.ipString || 'unknown',
          country_code: data.countryCode || 'NL',
          country_name: data.countryName || 'Netherlands',
          region: data.principalSubdivision || 'North Holland',
          city: data.city || data.locality || 'Amsterdam',
          latitude: parseFloat(data.location?.latitude) || 52.3676,
          longitude: parseFloat(data.location?.longitude) || 4.9041,
          timezone: data.location?.timeZone?.name || 'Europe/Amsterdam',
          isp: data.network?.organisation || 'Unknown'
        })
      }
    ];

    for (const service of services) {
      try {
        console.log(`🌍 Fetching location from: ${service.url}`);
        const response = await fetch(service.url);
        if (response.ok) {
          const data = await response.json();
          const locationData = service.parser(data);
          
          if (locationData.ip_address && locationData.ip_address !== 'unknown') {
            console.log(`✅ Got location data:`, locationData);
            return locationData;
          }
        }
      } catch (error) {
        console.warn(`❌ Location service failed: ${service.url}`, error);
      }
    }

    // Browser geolocation fallback
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 });
        });
        
        console.log('📍 Using browser geolocation');
        return {
          ip_address: 'browser-location',
          country_code: 'NL',
          country_name: 'Netherlands',
          region: 'Unknown',
          city: 'Unknown',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          isp: 'Browser Location'
        };
      }
    } catch (error) {
      console.warn('Browser geolocation failed:', error);
    }

    // Final fallback
    console.log('🏠 Using default Netherlands location');
    return {
      ip_address: 'default-location',
      country_code: 'NL',
      country_name: 'Netherlands',
      region: 'North Holland',
      city: 'Amsterdam',
      latitude: 52.3676,
      longitude: 4.9041,
      timezone: 'Europe/Amsterdam',
      isp: 'Unknown'
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

      this.performanceObserver.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    }

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
    if (!this.isTrackingInitialized) {
      await this.initializeTracking();
    }

    const deviceInfo = this.getDeviceInfo();
    const utmParams = this.getUTMParameters();
    const sessionDuration = Date.now() - this.sessionStartTime;
    const isBounce = this.pageViewCount === 1 && sessionDuration < 30000;
    const locationData = this.locationData || await this.getDetailedLocationData();

    console.log('📊 Tracking enhanced page view:', {
      page: window.location.pathname,
      visitor: this.visitorId.substring(0, 8),
      session: this.sessionId.substring(0, 8),
      location: `${locationData.city}, ${locationData.country_code}`,
      ip: locationData.ip_address,
      device: deviceInfo.device_type,
      browser: deviceInfo.browser
    });

    // Enhanced analytics data with all available information and proper timestamps
    const analyticsData: AnalyticsData = {
      session_id: this.sessionId,
      visitor_id: this.visitorId,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent,
      
      // Enhanced location data with validation
      country_code: locationData.country_code || 'NL',
      city: locationData.city || 'Unknown',
      ip_address: locationData.ip_address || 'unknown',
      
      // Device and browser info
      device_type: deviceInfo.device_type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      screen_resolution: deviceInfo.screen_resolution,
      viewport_size: deviceInfo.viewport_size,
      is_mobile: deviceInfo.is_mobile,
      is_tablet: deviceInfo.is_tablet,
      is_desktop: deviceInfo.is_desktop,
      
      // Session data with proper timestamps
      entry_page: isEntryPage,
      session_duration: Math.floor(sessionDuration / 1000),
      page_views_in_session: this.pageViewCount,
      is_bounce: isBounce,
      
      // UTM parameters
      ...utmParams
    };

    try {
      await supabase.from('website_analytics').insert(analyticsData);
      console.log('✅ Analytics tracked successfully');
    } catch (error) {
      console.error('❌ Failed to track analytics:', error);
    }

    // Store enhanced session data for future visitor sessions implementation with enhanced tracking
    const sessionStorageData = {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      ip_address: locationData.ip_address || 'unknown',
      country_code: locationData.country_code || 'NL',
      country_name: locationData.country_name || 'Netherlands',
      region: locationData.region || 'Unknown',
      city: locationData.city || 'Unknown',
      latitude: locationData.latitude || 0,
      longitude: locationData.longitude || 0,
      timezone: locationData.timezone || 'Europe/Amsterdam',
      isp: locationData.isp || 'Unknown',
      device_type: deviceInfo.device_type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      page_views: this.pageViewCount,
      session_duration: Math.floor(sessionDuration / 1000),
      is_bounce: isBounce,
      last_activity: new Date().toISOString(),
      // Enhanced personal tracking data
      screen_info: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth
      },
      connection_info: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : null,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine
    };

    // Store in session storage for potential future use and update visitor sessions
    sessionStorage.setItem('enhanced_session_data', JSON.stringify(sessionStorageData));
    
    // Also update or create visitor session record for enhanced personalized tracking
    this.updateVisitorSession(sessionStorageData, locationData, deviceInfo);
  }

  async trackPerformance(performanceData: Partial<PerformanceData>) {
    const data: PerformanceData = {
      session_id: this.sessionId,
      page_path: window.location.pathname,
      ...performanceData
    };

    try {
      await supabase.from('page_performance').insert(data);
      console.log('⚡ Performance tracked:', performanceData);
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
      console.log('🎯 Form conversion tracked:', formType);
    } catch (error) {
      console.error('Failed to track form conversion:', error);
    }
  }

  async updateVisitorSession(sessionData: any, locationData: DetailedLocationData, deviceInfo: any) {
    // Store enhanced session tracking data in localStorage for future use
    // Since visitor_sessions table is not accessible in TypeScript types, 
    // we'll store this data locally and use it for enhanced analytics
    try {
      const enhancedSessionData = {
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        ip_address: locationData.ip_address || 'unknown',
        country_code: locationData.country_code || 'NL',
        country_name: locationData.country_name || 'Netherlands',
        region: locationData.region || 'Unknown',
        city: locationData.city || 'Unknown',
        latitude: locationData.latitude || 0,
        longitude: locationData.longitude || 0,
        timezone: locationData.timezone || 'Europe/Amsterdam',
        isp: locationData.isp || 'Unknown',
        device_type: deviceInfo.device_type,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        user_agent: navigator.userAgent,
        screen_resolution: deviceInfo.screen_resolution,
        viewport_size: deviceInfo.viewport_size,
        page_views: this.pageViewCount,
        session_duration: Math.floor((Date.now() - this.sessionStartTime) / 1000),
        is_bounce: this.pageViewCount === 1 && (Date.now() - this.sessionStartTime) < 30000,
        last_activity_at: new Date().toISOString(),
        first_visit_at: new Date(this.sessionStartTime).toISOString(),
        // Enhanced tracking information
        connection_info: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt
        } : null,
        hardware_info: {
          deviceMemory: (navigator as any).deviceMemory || null,
          hardwareConcurrency: navigator.hardwareConcurrency,
          maxTouchPoints: navigator.maxTouchPoints
        },
        preferences: {
          language: navigator.language,
          languages: navigator.languages,
          cookieEnabled: navigator.cookieEnabled,
          doNotTrack: navigator.doNotTrack,
          onLine: navigator.onLine
        }
      };
      
      // Store in localStorage for persistent tracking across sessions
      localStorage.setItem(`visitor_session_${this.visitorId}`, JSON.stringify(enhancedSessionData));
      
      console.log('📊 Enhanced visitor session data stored:', {
        session: this.sessionId.substring(0, 8),
        location: `${locationData.city}, ${locationData.country_code}`,
        device: deviceInfo.device_type,
        connection: enhancedSessionData.connection_info?.effectiveType || 'unknown'
      });
    } catch (error) {
      console.error('Failed to update visitor session data:', error);
    }
  }

  trackPageExit() {
    const sessionDuration = Date.now() - this.pageStartTime;
    console.log('👋 Page exit tracked:', { 
      duration: Math.floor(sessionDuration / 1000) + 's',
      page: window.location.pathname 
    });
    this.trackPageView();
  }

  destroy() {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

let tracker: AdvancedAnalyticsTracker | null = null;

export const useAnalyticsTracking = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      console.log('🚀 Initializing Advanced Analytics Tracker');
      tracker = new AdvancedAnalyticsTracker();
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