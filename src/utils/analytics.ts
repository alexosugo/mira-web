// Analytics tracking utilities. Every event routes through Mixpanel, the single
// analytics tool for the site. These thin wrappers are the stable seam: the ~13
// component call sites import from here and never touch the SDK directly, so the
// tool can be swapped again without touching the UI.
//
// Event naming convention (per the Mixpanel skill):
//   - User actions  -> object_verb, past tense, snake_case
//                      (page_viewed, cta_clicked, form_submitted, lead_captured)
//   - Diagnostics   -> descriptive snake_case (page_load_time, javascript_error)
// Property values keep native types (numbers stay numeric so Mixpanel can
// aggregate them). Lowercase enum-like values; omit empty/null properties.
import { track } from '../lib/mixpanel';

/**
 * Log a custom analytics event. Never throws into the UI, and no-ops cleanly
 * when analytics is not configured (e.g. local dev without a token). Events
 * fired before the Mixpanel chunk finishes loading are buffered, not dropped.
 *
 * Unlike the previous Statsig setup, properties keep their native types —
 * numbers stay numeric so Mixpanel can aggregate them (sums, averages, ranges).
 */
export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  try {
    track(eventName, properties);
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
  trackEvent('cta_clicked', {
    button_id: buttonId,
    button_text: buttonText,
    page_section: pageSection,
    ...additionalData
  });
};

// Form submission mechanics (funnel friction): attempt and error only. The
// success/value-moment is a distinct lead_captured event (see trackLeadCaptured)
// so one conversion is never double-counted across two events.
export const trackFormSubmission = (
  formId: string,
  formName: string,
  formData: Record<string, unknown>,
  submissionStatus: 'error' | 'attempt'
) => {
  trackEvent('form_submitted', {
    form_id: formId,
    form_name: formName,
    submission_status: submissionStatus,
    ...formData
  });
};

// Lead capture — the on-site Value Moment. Carries the lead's details as event
// properties (there is no Mixpanel profile, by design: the site never calls
// identify). Real signup + identify happens later in app.withmira.co.
export const trackLeadCaptured = (leadData: Record<string, unknown>) => {
  trackEvent('lead_captured', leadData);
};

// Form field interaction tracking
export const trackFormFieldInteraction = (
  fieldId: string,
  fieldName: string,
  interactionType: 'focus' | 'blur' | 'change',
  value?: string
) => {
  trackEvent('form_field_interacted', {
    field_id: fieldId,
    field_name: fieldName,
    interaction_type: interactionType,
    value: value ?? null
  });
};

// Page view tracking
export const trackPageView = (pageName: string, pageSection?: string) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    page_section: pageSection || 'main'
  });
};

// Section scroll tracking
export const trackSectionView = (sectionId: string, sectionName: string) => {
  trackEvent('section_viewed', {
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
