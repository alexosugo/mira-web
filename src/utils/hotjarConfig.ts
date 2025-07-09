// Hotjar configuration and event setup
import Hotjar from '@hotjar/browser';

// Hotjar custom event definitions
export const hotjarEvents = {
  CTA_CLICK: 'cta_click',
  FORM_SUBMIT: 'form_submit',
  FORM_INTERACTION: 'form_interaction',
  SECTION_VIEW: 'section_view',
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  ERROR: 'error_event'
};

// Hotjar trigger setup for CSS selectors
export const setupHotjarTriggers = () => {
  // CTA button triggers
  const ctaButtons = [
    '[data-button-id="header_cta_button"]',
    '[data-button-id="header_mobile_cta_button"]',
    '[data-button-id="hero_cta_button"]',
    '[data-button-id="solution_cta_button"]',
    '[data-button-id="benefits_cta_button"]',
    '[data-button-id="features_cta_button"]',
    '[data-button-id="testimonials_cta_button"]',
    '[data-button-id="pricing_cta_button"]'
  ];

  // Form field triggers
  const formFields = [
    '[data-field-name="firstName"]',
    '[data-field-name="lastName"]',
    '[data-field-name="email"]',
    '[data-field-name="website"]',
    '[data-field-name="instagram"]'
  ];

  // Form submit trigger
  const formSubmitButton = '[data-button-id="waitlist_form_submit"]';

  // Set up click listeners for CTA buttons
  ctaButtons.forEach(selector => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector) || target.closest(selector)) {
        const button = target.closest(selector) as HTMLElement;
        const buttonId = button.getAttribute('data-button-id');
        const buttonText = button.getAttribute('data-button-text');
        const pageSection = button.getAttribute('data-page-section');
        
        console.log('Hotjar CTA Click:', {
          buttonId,
          buttonText,
          pageSection,
          selector
        });
        
        // Fire Hotjar event
        Hotjar.event(hotjarEvents.CTA_CLICK);
        
        // Identify user session with CTA context
        Hotjar.identify(null, {
          last_cta_clicked: buttonText,
          last_cta_section: pageSection,
          last_cta_id: buttonId
        });
      }
    });
  });

  // Set up form field listeners
  formFields.forEach(selector => {
    // Focus events
    document.addEventListener('focus', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector)) {
        const fieldName = target.getAttribute('data-field-name');
        console.log('Hotjar Form Focus:', fieldName);
        Hotjar.event(hotjarEvents.FORM_INTERACTION);
      }
    }, true);

    // Blur events
    document.addEventListener('blur', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector)) {
        const fieldName = target.getAttribute('data-field-name');
        console.log('Hotjar Form Blur:', fieldName);
        Hotjar.event(hotjarEvents.FORM_INTERACTION);
      }
    }, true);

    // Change events
    document.addEventListener('change', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector)) {
        const fieldName = target.getAttribute('data-field-name');
        console.log('Hotjar Form Change:', fieldName);
        Hotjar.event(hotjarEvents.FORM_INTERACTION);
      }
    });
  });

  // Set up form submit listener
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches(formSubmitButton) || target.closest(formSubmitButton)) {
      console.log('Hotjar Form Submit');
      Hotjar.event(hotjarEvents.FORM_SUBMIT);
      
      // Identify user session with form context
      Hotjar.identify(null, {
        form_submitted: 'waitlist_form',
        form_submit_time: new Date().toISOString()
      });
    }
  });

  console.log('Hotjar triggers set up for:', {
    ctaButtons: ctaButtons.length,
    formFields: formFields.length,
    formSubmit: 1
  });
};

// Initialize Hotjar heatmaps for specific pages
export const initializeHotjarHeatmaps = () => {
  // Enable heatmaps for all pages with CTAs and forms
  const heatmapConfig = {
    pages: [
      {
        url: '*',
        name: 'Landing Page',
        elements: [
          '.cta-button',
          '[data-hotjar-trigger="cta_click"]',
          '[data-hotjar-trigger="form_submit"]',
          '[data-hotjar-trigger="form_field"]'
        ]
      }
    ]
  };

  console.log('Hotjar heatmaps initialized for:', heatmapConfig);
};

// Set up session recording triggers
export const setupSessionRecording = () => {
  // Start recording when user interacts with key elements
  const keyInteractionSelectors = [
    '[data-hotjar-trigger="cta_click"]',
    '[data-hotjar-trigger="form_submit"]',
    '[data-hotjar-trigger="form_field"]'
  ];

  keyInteractionSelectors.forEach(selector => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector) || target.closest(selector)) {
        // Trigger session recording
        Hotjar.identify(null, {
          key_interaction: true,
          interaction_time: new Date().toISOString(),
          interaction_element: selector
        });
      }
    });
  });

  console.log('Session recording triggers set up');
};