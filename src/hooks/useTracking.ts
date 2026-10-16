import { useEffect, useRef } from 'react';
import { trackSectionView, trackCTAClick } from '../utils/analytics';

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
  const trackCTA = (buttonId: string, buttonText: string, pageSection: string, additionalData?: Record<string, unknown>) => {
    trackCTAClick(buttonId, buttonText, pageSection, additionalData);
  };

  return { trackCTA };
};

