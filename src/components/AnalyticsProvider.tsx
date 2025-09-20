import React, { createContext, useContext, ReactNode } from 'react';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';

interface AnalyticsContextType {
  trackFormConversion: (formType: string, conversionFunnel?: any, timeToConvert?: number, abandonmentStep?: string) => void;
  trackPerformance: (performanceData: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const { trackFormConversion, trackPerformance } = useAnalyticsTracking();

  return (
    <AnalyticsContext.Provider value={{ trackFormConversion, trackPerformance }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};