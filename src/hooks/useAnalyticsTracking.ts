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
    const sessionDuration = Date.now() - this.sessionStartTime;
    const isBounce = this.pageViewCount === 1 && sessionDuration < 30000; // Less than 30 seconds

    const analyticsData: AnalyticsData = {
      session_id: this.sessionId,
      visitor_id: this.visitorId,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
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