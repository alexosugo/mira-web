// Testing utilities for analytics tracking
import { trackGoogleAnalyticsEvent, trackHotjarEvent } from './analytics';

// Test all CTA button tracking
export const testCTATracking = () => {
  const ctaButtons = [
    { id: 'header_cta_button', text: 'Get Early Access', section: 'header' },
    { id: 'hero_cta_button', text: 'Get Early Access', section: 'hero' },
    { id: 'solution_cta_button', text: 'Get Early Access', section: 'solution' },
    { id: 'benefits_cta_button', text: 'Get Early Access', section: 'benefits' },
    { id: 'features_cta_button', text: 'Get Early Access', section: 'features' },
    { id: 'testimonials_cta_button', text: 'Get Early Access', section: 'testimonials' },
    { id: 'pricing_cta_button', text: 'Get Early Access', section: 'pricing' }
  ];

  console.log('Testing CTA tracking...');
  
  ctaButtons.forEach(button => {
    console.log(`Testing ${button.id}...`);
    
    // Test Google Analytics
    trackGoogleAnalyticsEvent(
      'CTA_Click',
      button.id,
      `${button.text} - ${button.section}`,
      {
        button_text: button.text,
        page_section: button.section,
        test_mode: true
      }
    );
    
    // Test Hotjar
    trackHotjarEvent('cta_click', {
      button_id: button.id,
      button_text: button.text,
      page_section: button.section,
      test_mode: true
    });
  });

  console.log('CTA tracking test completed');
};

// Test form submission tracking
export const testFormTracking = () => {
  const testFormData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    website: 'https://example.com',
    instagram: 'https://instagram.com/test'
  };

  console.log('Testing form tracking...');

  // Test form submission attempt
  trackGoogleAnalyticsEvent(
    'Form_Submit',
    'waitlist_form',
    'Waitlist Form - attempt',
    {
      form_name: 'Waitlist Form',
      submission_status: 'attempt',
      test_mode: true,
      ...testFormData
    }
  );

  trackHotjarEvent('form_submit', {
    form_id: 'waitlist_form',
    form_name: 'Waitlist Form',
    submission_status: 'attempt',
    test_mode: true,
    ...testFormData
  });

  // Test form submission success
  setTimeout(() => {
    trackGoogleAnalyticsEvent(
      'Form_Submit',
      'waitlist_form',
      'Waitlist Form - success',
      {
        form_name: 'Waitlist Form',
        submission_status: 'success',
        test_mode: true,
        ...testFormData
      }
    );

    trackHotjarEvent('form_submit', {
      form_id: 'waitlist_form',
      form_name: 'Waitlist Form',
      submission_status: 'success',
      test_mode: true,
      ...testFormData
    });
  }, 1000);

  console.log('Form tracking test completed');
};

// Test field interaction tracking
export const testFieldTracking = () => {
  const formFields = [
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'website', name: 'Website' },
    { id: 'instagram', name: 'Instagram' }
  ];

  console.log('Testing field interaction tracking...');

  formFields.forEach(field => {
    ['focus', 'blur', 'change'].forEach(interactionType => {
      console.log(`Testing ${field.id} ${interactionType}...`);
      
      trackGoogleAnalyticsEvent(
        'Form_Interaction',
        `${field.id}_${interactionType}`,
        `${field.name} - ${interactionType}`,
        {
          field_name: field.name,
          interaction_type: interactionType,
          test_mode: true
        }
      );

      trackHotjarEvent('form_interaction', {
        field_id: field.id,
        field_name: field.name,
        interaction_type: interactionType,
        test_mode: true
      });
    });
  });

  console.log('Field interaction tracking test completed');
};

// Test section view tracking
export const testSectionTracking = () => {
  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'solution', name: 'Solution Overview' },
    { id: 'benefits', name: 'Benefits Section' },
    { id: 'features', name: 'Features Section' },
    { id: 'testimonials', name: 'Testimonials Section' },
    { id: 'pricing', name: 'Pricing Section' },
    { id: 'final-cta', name: 'Final CTA Section' }
  ];

  console.log('Testing section view tracking...');

  sections.forEach(section => {
    console.log(`Testing ${section.id} view...`);
    
    trackGoogleAnalyticsEvent(
      'Section_View',
      `section_${section.id}`,
      section.name,
      {
        section_name: section.name,
        section_id: section.id,
        test_mode: true
      }
    );

    trackHotjarEvent('section_view', {
      section_id: section.id,
      section_name: section.name,
      test_mode: true
    });
  });

  console.log('Section view tracking test completed');
};

// Run all tests
export const runAllTests = () => {
  console.log('Starting comprehensive tracking tests...');
  
  testCTATracking();
  setTimeout(() => testFormTracking(), 500);
  setTimeout(() => testFieldTracking(), 1000);
  setTimeout(() => testSectionTracking(), 1500);
  
  setTimeout(() => {
    console.log('All tracking tests completed!');
    console.log('Check your analytics dashboards to verify events were received.');
  }, 2000);
};

// Make test functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).trackingTests = {
    testCTATracking,
    testFormTracking,
    testFieldTracking,
    testSectionTracking,
    runAllTests
  };
  
  console.log('Tracking test utilities available at window.trackingTests');
  console.log('Run window.trackingTests.runAllTests() to test all tracking');
}