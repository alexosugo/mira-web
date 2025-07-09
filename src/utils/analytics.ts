// Analytics tracking utilities for Google Analytics and Hotjar
import Hotjar from '@hotjar/browser';

// Google Analytics event tracking
export const trackGoogleAnalyticsEvent = (
  eventCategory: string,
  eventAction: string,
  eventLabel?: string,
  customParameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventData = {
      event_category: eventCategory,
      event_label: eventLabel || '',
      page_location: window.location.href,
      page_title: document.title,
      non_interaction: false,
      ...customParameters
    };

    console.log('GA Event:', eventCategory, eventAction, eventData);
    window.gtag('event', eventAction, eventData);
  }
};

// Hotjar event tracking
export const trackHotjarEvent = (
  eventName: string,
  attributes: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && Hotjar) {
    const eventData = {
      ...attributes,
      page_location: window.location.href,
      timestamp: Date.now()
    };

    console.log('Hotjar Event:', eventName, eventData);
    Hotjar.event(eventName);
    
    // Add custom attributes for session recordings
    if (attributes.button_text) {
      Hotjar.identify(null, {
        last_cta_clicked: attributes.button_text,
        page_location: window.location.href
      });
    }
  }
};

// CTA button click tracking
export const trackCTAClick = (
  buttonId: string,
  buttonText: string,
  pageSection: string,
  additionalData?: Record<string, any>
) => {
  // Google Analytics tracking
  trackGoogleAnalyticsEvent(
    'CTA_Click',
    buttonId,
    `${buttonText} - ${pageSection}`,
    {
      button_text: buttonText,
      page_section: pageSection,
      ...additionalData
    }
  );

  // Hotjar tracking
  trackHotjarEvent('cta_click', {
    button_id: buttonId,
    button_text: buttonText,
    page_section: pageSection,
    form_name: 'N/A',
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
  // Google Analytics tracking
  trackGoogleAnalyticsEvent(
    'Form_Submit',
    formId,
    `${formName} - ${submissionStatus}`,
    {
      form_name: formName,
      submission_status: submissionStatus,
      form_fields: Object.keys(formData).join(','),
      ...formData
    }
  );

  // Hotjar tracking
  trackHotjarEvent('form_submit', {
    form_id: formId,
    form_name: formName,
    submission_status: submissionStatus,
    button_text: 'Submit Form',
    page_section: 'contact-form',
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
  // Google Analytics tracking
  trackGoogleAnalyticsEvent(
    'Form_Interaction',
    `${fieldId}_${interactionType}`,
    `${fieldName} - ${interactionType}`,
    {
      field_name: fieldName,
      interaction_type: interactionType,
      has_value: value ? 'yes' : 'no'
    }
  );

  // Hotjar tracking
  trackHotjarEvent('form_interaction', {
    field_id: fieldId,
    field_name: fieldName,
    interaction_type: interactionType,
    button_text: 'Form Field',
    page_section: 'contact-form',
    form_name: 'waitlist_form'
  });
};

// Page view tracking
export const trackPageView = (pageName: string, pageSection?: string) => {
  // Google Analytics tracking
  trackGoogleAnalyticsEvent(
    'Page_View',
    'page_view',
    pageName,
    {
      page_name: pageName,
      page_section: pageSection || 'main'
    }
  );

  // Hotjar tracking
  trackHotjarEvent('page_view', {
    page_name: pageName,
    page_section: pageSection || 'main',
    button_text: 'Page Load',
    form_name: 'N/A'
  });
};

// Section scroll tracking
export const trackSectionView = (sectionId: string, sectionName: string) => {
  // Google Analytics tracking
  trackGoogleAnalyticsEvent(
    'Section_View',
    `section_${sectionId}`,
    sectionName,
    {
      section_name: sectionName,
      section_id: sectionId
    }
  );

  // Hotjar tracking
  trackHotjarEvent('section_view', {
    section_id: sectionId,
    section_name: sectionName,
    button_text: 'Section View',
    page_section: sectionId,
    form_name: 'N/A'
  });
};

// Initialize tracking
export const initializeTracking = () => {
  // Set up global error tracking
  window.addEventListener('error', (error) => {
    trackGoogleAnalyticsEvent(
      'Error',
      'javascript_error',
      error.message,
      {
        error_source: error.filename,
        error_line: error.lineno,
        error_column: error.colno
      }
    );
  });

  // Track page load performance
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      trackGoogleAnalyticsEvent(
        'Performance',
        'page_load_time',
        `${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`,
        {
          load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          dom_ready: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
        }
      );
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