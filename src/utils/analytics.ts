// Analytics tracking utilities for PostHog
import posthog from 'posthog-js';

// PostHog event tracking
export const trackPostHogEvent = (
  eventName: string,
  properties: Record<string, any>
) => {
  if (typeof window !== 'undefined' && posthog?.capture) {
    console.log('PostHog Event:', eventName, properties);
    posthog.capture(eventName, properties);
  }
};

// CTA button click tracking
export const trackCTAClick = (
  buttonId: string,
  buttonText: string,
  pageSection: string,
  additionalData?: Record<string, any>
) => {
  // PostHog tracking
  trackPostHogEvent('cta_click', {
    button_id: buttonId,
    button_text: buttonText,
    page_section: pageSection,
    ...additionalData
  });
};

// Form submission tracking
export const trackFormSubmission = (
  formId: string,
  formName: string,
  formData: Record<string, any>,
  submissionStatus: 'success' | 'error' | 'attempt'
) => {
  // PostHog tracking
  trackPostHogEvent('form_submit', {
    form_id: formId,
    form_name: formName,
    submission_status: submissionStatus,
    ...formData
  });
};

// Form field interaction tracking
export const trackFormFieldInteraction = (
  fieldId: string,
  fieldName: string,
  interactionType: 'focus' | 'blur' | 'change',
  value?: string
) => {
  // PostHog tracking
  trackPostHogEvent('form_interaction', {
    field_id: fieldId,
    field_name: fieldName,
    interaction_type: interactionType,
    value: value || null
  });
};

// Page view tracking
export const trackPageView = (pageName: string, pageSection?: string) => {
  // PostHog tracking
  trackPostHogEvent('page_view', {
    page_name: pageName,
    page_section: pageSection || 'main'
  });
};

// Section scroll tracking
export const trackSectionView = (sectionId: string, sectionName: string) => {
  // PostHog tracking
  trackPostHogEvent('section_view', {
    section_id: sectionId,
    section_name: sectionName
  });
};

// Initialize tracking
export const initializeTracking = () => {
  // Set up global error tracking
  window.addEventListener('error', (error) => {
    const props = {
      error_source: error.filename,
      error_line: error.lineno,
      error_column: error.colno,
      message: error.message
    };

    // PostHog error tracking
    trackPostHogEvent('javascript_error', props);
  });

  // Track page load performance
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
      const domReady = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);

      // PostHog performance tracking
      trackPostHogEvent('page_load_time', {
        load_time: loadTime,
        dom_ready: domReady
      });
    }
  });

  console.log('Analytics tracking initialized');
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}