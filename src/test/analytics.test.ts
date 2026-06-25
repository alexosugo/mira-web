import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Mixpanel seam so we can assert what analytics.ts forwards.
const track = vi.fn();
vi.mock('../lib/mixpanel', () => ({
  track: (...args: unknown[]) => track(...args),
}));

import { trackEvent, trackCTAClick, trackFormSubmission, trackLeadCaptured } from '../utils/analytics';

describe('analytics → Mixpanel', () => {
  beforeEach(() => {
    track.mockReset();
  });

  it('forwards events to Mixpanel by name', () => {
    trackEvent('page_viewed', { page_name: 'Landing Page' });
    expect(track).toHaveBeenCalledWith('page_viewed', { page_name: 'Landing Page' });
  });

  it('preserves native types so numbers stay aggregatable (no Statsig string coercion)', () => {
    trackEvent('page_scrolled', { depth_percent: 75 });
    const [, props] = track.mock.calls[0];
    expect(props.depth_percent).toBe(75);
    expect(typeof props.depth_percent).toBe('number');
  });

  it('builds the cta_clicked envelope', () => {
    trackCTAClick('hero_cta_button', 'Get started', 'hero', { button_type: 'primary' });
    expect(track).toHaveBeenCalledWith('cta_clicked', {
      button_id: 'hero_cta_button',
      button_text: 'Get started',
      page_section: 'hero',
      button_type: 'primary',
    });
  });

  it('stamps form_submitted with its submission_status (mechanics only)', () => {
    trackFormSubmission('elite_contact_form', 'Elite Contact', { plan_type: 'elite' }, 'attempt');
    expect(track).toHaveBeenCalledWith('form_submitted', {
      form_id: 'elite_contact_form',
      form_name: 'Elite Contact',
      submission_status: 'attempt',
      plan_type: 'elite',
    });
  });

  it('emits lead_captured as the value moment', () => {
    trackLeadCaptured({ lead_type: 'elite', email: 'nia@example.com' });
    expect(track).toHaveBeenCalledWith('lead_captured', { lead_type: 'elite', email: 'nia@example.com' });
  });

  it('never throws into the UI when the Mixpanel layer errors', () => {
    track.mockImplementationOnce(() => { throw new Error('client exploded'); });
    expect(() => trackEvent('cta_clicked')).not.toThrow();
  });
});
