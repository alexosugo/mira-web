import { useEffect, useRef } from 'react';
import { trackSectionView, trackCTAClick, trackFormSubmission, trackFormFieldInteraction } from '../utils/analytics';

// Hook for tracking section visibility
export const useSectionTracking = (sectionId: string, sectionName: string) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(sectionId, sectionName);
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionId, sectionName]);

  return sectionRef;
};

// Hook for tracking CTA clicks
export const useCTATracking = () => {
  const trackCTA = (buttonId: string, buttonText: string, pageSection: string, additionalData?: Record<string, any>) => {
    trackCTAClick(buttonId, buttonText, pageSection, additionalData);
  };

  return { trackCTA };
};

// Hook for tracking form submissions
export const useFormTracking = () => {
  const trackSubmission = (formId: string, formName: string, formData: Record<string, any>, status: 'success' | 'error' | 'attempt') => {
    trackFormSubmission(formId, formName, formData, status);
  };

  const trackFieldInteraction = (fieldId: string, fieldName: string, interactionType: 'focus' | 'blur' | 'change', value?: string) => {
    trackFormFieldInteraction(fieldId, fieldName, interactionType, value);
  };

  return { trackSubmission, trackFieldInteraction };
};

// Hook for tracking scroll depth
export const useScrollTracking = () => {
  const scrollDepthRef = useRef(0);
  const trackingIntervalsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent;

        // Track at 25%, 50%, 75%, and 100% intervals
        [25, 50, 75, 100].forEach(interval => {
          if (scrollPercent >= interval && !trackingIntervalsRef.current.has(interval)) {
            trackingIntervalsRef.current.add(interval);
            
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: `${interval}%`,
                value: interval,
                non_interaction: false
              });
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDepthRef;
};