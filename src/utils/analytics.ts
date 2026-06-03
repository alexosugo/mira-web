// Analytics tracking utilities. Custom events route through Statsig (the one
// remaining analytics tool); PostHog and GA were removed to cut bundle weight.
import { getStatsigClient } from '../lib/statsig';

/** Coerce arbitrary event properties to the string-only metadata Statsig accepts. */
function toMetadata(properties: Record<string, unknown>): Record<string, string> {
  const meta: Record<string, string> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value === null || value === undefined) continue;
    meta[key] = typeof value === 'string' ? value : JSON.stringify(value);
  }
  return meta;
}

/**
 * Log a custom analytics event. Safe to call before Statsig finishes
 * initializing (the client buffers events) and never throws into the UI.
 */
export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  try {
    getStatsigClient().logEvent({ eventName, metadata: toMetadata(properties) });
  } catch (err) {
    console.error('Event tracking failed:', err);
  }
};

// CTA button click tracking
export const trackCTAClick = (
  buttonId: string,
  buttonText: string,
  pageSection: string,
  additionalData?: Record<string, unknown>
) => {
  trackEvent('cta_click', {
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
  formData: Record<string, unknown>,
  submissionStatus: 'success' | 'error' | 'attempt'
) => {
  trackEvent('form_submit', {
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
  trackEvent('form_interaction', {
    field_id: fieldId,
    field_name: fieldName,
    interaction_type: interactionType,
    value: value || null
  });
};

// Page view tracking
export const trackPageView = (pageName: string, pageSection?: string) => {
  trackEvent('page_view', {
    page_name: pageName,
    page_section: pageSection || 'main'
  });
};

// Section scroll tracking
export const trackSectionView = (sectionId: string, sectionName: string) => {
  trackEvent('section_view', {
    section_id: sectionId,
    section_name: sectionName
  });
};

// Initialize tracking: wire up global error and page-load performance events.
export const initializeTracking = () => {
  window.addEventListener('error', (error) => {
    trackEvent('javascript_error', {
      error_source: error.filename,
      error_line: error.lineno,
      error_column: error.colno,
      message: error.message
    });
  });

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      trackEvent('page_load_time', {
        load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        dom_ready: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
      });
    }
  });
};
