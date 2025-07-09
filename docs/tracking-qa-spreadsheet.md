# Analytics Tracking QA Spreadsheet

## Overview
This document outlines all implemented tracking events for both Google Analytics and Hotjar, testing scenarios, and verification procedures.

## Implemented Tracking Events

### 1. CTA Button Clicks (Event Category: CTA_Click)

| Button ID | Button Text | Page Section | Expected GA Event | Expected Hotjar Event | Test Status |
|-----------|-------------|--------------|-------------------|----------------------|-------------|
| `header_cta_button` | "Get Early Access" | header | ✓ | ✓ | ⏳ Pending |
| `header_mobile_cta_button` | "Get Early Access" | header_mobile | ✓ | ✓ | ⏳ Pending |
| `hero_cta_button` | "Get Early Access" | hero | ✓ | ✓ | ⏳ Pending |
| `solution_cta_button` | "Get Early Access" | solution | ✓ | ✓ | ⏳ Pending |
| `benefits_cta_button` | "Get Early Access" | benefits | ✓ | ✓ | ⏳ Pending |
| `features_cta_button` | "Get Early Access" | features | ✓ | ✓ | ⏳ Pending |
| `testimonials_cta_button` | "Get Early Access" | testimonials | ✓ | ✓ | ⏳ Pending |
| `pricing_cta_button` | "Get Early Access" | pricing | ✓ | ✓ | ⏳ Pending |

### 2. Form Submissions (Event Category: Form_Submit)

| Form ID | Form Name | Event Actions | Expected GA Event | Expected Hotjar Event | Test Status |
|---------|-----------|---------------|-------------------|----------------------|-------------|
| `waitlist_form` | "Waitlist Form" | `attempt`, `success`, `error` | ✓ | ✓ | ⏳ Pending |

### 3. Form Field Interactions (Event Category: Form_Interaction)

| Field ID | Field Name | Interaction Types | Expected GA Event | Expected Hotjar Event | Test Status |
|----------|------------|-------------------|-------------------|----------------------|-------------|
| `firstName` | "First Name" | `focus`, `blur`, `change` | ✓ | ✓ | ⏳ Pending |
| `lastName` | "Last Name" | `focus`, `blur`, `change` | ✓ | ✓ | ⏳ Pending |
| `email` | "Email" | `focus`, `blur`, `change` | ✓ | ✓ | ⏳ Pending |
| `website` | "Website" | `focus`, `blur`, `change` | ✓ | ✓ | ⏳ Pending |
| `instagram` | "Instagram" | `focus`, `blur`, `change` | ✓ | ✓ | ⏳ Pending |

### 4. Section Views (Event Category: Section_View)

| Section ID | Section Name | Expected GA Event | Expected Hotjar Event | Test Status |
|------------|--------------|-------------------|----------------------|-------------|
| `hero` | "Hero Section" | ✓ | ✓ | ⏳ Pending |
| `solution` | "Solution Overview" | ✓ | ✓ | ⏳ Pending |
| `benefits` | "Benefits Section" | ✓ | ✓ | ⏳ Pending |
| `features` | "Features Section" | ✓ | ✓ | ⏳ Pending |
| `testimonials` | "Testimonials Section" | ✓ | ✓ | ⏳ Pending |
| `pricing` | "Pricing Section" | ✓ | ✓ | ⏳ Pending |
| `final-cta` | "Final CTA Section" | ✓ | ✓ | ⏳ Pending |

### 5. Engagement Tracking (Event Category: Engagement)

| Event Action | Description | Expected GA Event | Expected Hotjar Event | Test Status |
|--------------|-------------|-------------------|----------------------|-------------|
| `scroll_depth` | Track scroll at 25%, 50%, 75%, 100% | ✓ | ✓ | ⏳ Pending |
| `page_view` | Track page views | ✓ | ✓ | ⏳ Pending |

## Testing Scenarios

### Desktop Testing
1. **Header CTA Click**
   - Navigate to site
   - Click "Get Early Access" in header
   - Verify GA event: `CTA_Click` > `header_cta_button`
   - Verify Hotjar event: `cta_click` with proper attributes
   - Check smooth scroll to contact form

2. **Mobile Menu CTA Click**
   - Switch to mobile view
   - Open hamburger menu
   - Click "Get Early Access" in mobile menu
   - Verify GA event: `CTA_Click` > `header_mobile_cta_button`
   - Verify Hotjar event: `cta_click` with proper attributes

3. **Hero Section CTA Click**
   - Scroll to hero section
   - Verify section view tracking
   - Click "Get Early Access" button
   - Verify GA event: `CTA_Click` > `hero_cta_button`
   - Verify Hotjar event: `cta_click` with proper attributes

4. **Form Interaction Testing**
   - Navigate to contact form
   - Click in "First Name" field
   - Verify GA event: `Form_Interaction` > `firstName_focus`
   - Type in field
   - Verify GA event: `Form_Interaction` > `firstName_change`
   - Click out of field
   - Verify GA event: `Form_Interaction` > `firstName_blur`
   - Repeat for all form fields

5. **Form Submission Testing**
   - Fill out complete form with valid data
   - Click submit button
   - Verify GA event: `Form_Submit` > `waitlist_form` (attempt)
   - Wait for submission response
   - Verify GA event: `Form_Submit` > `waitlist_form` (success/error)
   - Verify Hotjar event: `form_submit` with proper attributes

6. **Scroll Depth Testing**
   - Load page and scroll to 25%
   - Verify GA event: `Engagement` > `scroll_depth` (25%)
   - Continue scrolling to 50%, 75%, 100%
   - Verify events fire only once per threshold

### Mobile Testing
1. **Touch Interactions**
   - Test all CTA buttons on mobile
   - Verify touch events trigger analytics
   - Test form interactions on mobile
   - Verify mobile-specific attributes

2. **Responsive Behavior**
   - Test on various screen sizes
   - Verify tracking works across breakpoints
   - Test orientation changes

### Cross-Browser Testing
1. **Chrome Testing**
   - Test all tracking events
   - Verify console logs
   - Check network requests

2. **Firefox Testing**
   - Test all tracking events
   - Verify compatibility

3. **Safari Testing**
   - Test all tracking events
   - Verify iOS Safari compatibility

4. **Edge Testing**
   - Test all tracking events
   - Verify compatibility

## Verification Procedures

### Google Analytics Verification
1. **Real-time Reports**
   - Navigate to GA4 > Reports > Realtime
   - Perform test actions
   - Verify events appear in real-time

2. **Event Debugging**
   - Use GA4 DebugView
   - Enable debug mode: `gtag('config', 'GA_MEASUREMENT_ID', { debug_mode: true })`
   - Verify event parameters and structure

3. **Console Verification**
   - Check browser console for GA event logs
   - Verify event structure matches specifications

### Hotjar Verification
1. **Session Recordings**
   - Perform test actions
   - Check Hotjar dashboard for recordings
   - Verify custom events are captured

2. **Events Dashboard**
   - Navigate to Hotjar > Events
   - Verify custom events appear
   - Check event attributes and frequency

3. **Console Verification**
   - Check browser console for Hotjar event logs
   - Verify event structure matches specifications

## Data Quality Checks

### Required Event Parameters
- **Google Analytics**: `event_category`, `event_label`, `page_location`, `page_title`, `non_interaction: false`
- **Hotjar**: `button_text`, `page_section`, `page_location`, `timestamp`

### Data Validation
1. **Event Frequency**
   - Verify events fire only once per action
   - Check for duplicate events
   - Validate event throttling

2. **Data Accuracy**
   - Verify button text matches actual text
   - Check page section accuracy
   - Validate form field names

3. **Error Handling**
   - Test with analytics blocked
   - Verify graceful degradation
   - Check console for errors

## Performance Considerations

### Loading Performance
- Analytics scripts load asynchronously
- Tracking doesn't block page rendering
- Events queued if analytics not ready

### Memory Usage
- Event listeners cleaned up properly
- No memory leaks in tracking code
- Efficient intersection observers

## Compliance and Privacy

### GDPR Compliance
- Analytics tracking respects user consent
- Data minimization principles followed
- User can opt-out of tracking

### Data Retention
- Follow analytics platform retention policies
- Regularly review data collection practices
- Audit tracking implementation

## Deployment Checklist

### Pre-Deployment
- [ ] All tracking events implemented
- [ ] Console logs removed for production
- [ ] Analytics IDs configured correctly
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Performance testing completed

### Post-Deployment
- [ ] Real-time GA events verified
- [ ] Hotjar recordings verified
- [ ] All CTA buttons tracked
- [ ] Form submissions tracked
- [ ] Section views tracked
- [ ] Scroll depth tracked
- [ ] Error tracking verified
- [ ] Performance monitoring active

## Troubleshooting Guide

### Common Issues
1. **Events Not Firing**
   - Check analytics script loading
   - Verify measurement IDs
   - Check console for errors

2. **Duplicate Events**
   - Review event listener setup
   - Check for multiple initializations
   - Verify cleanup on unmount

3. **Missing Parameters**
   - Verify event structure
   - Check parameter spelling
   - Validate data types

### Debug Commands
```javascript
// Check GA4 installation
console.log(window.gtag);

// Check Hotjar installation
console.log(window.hj);

// Verify analytics configuration
console.log(window.dataLayer);
```

## Success Metrics

### Tracking Coverage
- 100% of CTA buttons tracked
- 100% of form interactions tracked
- All page sections tracked
- Error tracking implemented

### Data Quality
- Events fire reliably
- Parameters accurate
- No duplicate events
- Performance impact minimal

### Compliance
- Privacy requirements met
- Data retention policies followed
- User consent respected
- Audit trail maintained

---

**Document Version**: 1.0
**Last Updated**: 2025-01-27
**Next Review**: 2025-02-27
**Owner**: Analytics Team