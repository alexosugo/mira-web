import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Mixpanel seam so we can assert what analytics.ts forwards.
const track = vi.fn();
vi.mock('../lib/mixpanel', () => ({
  track: (...args: unknown[]) => track(...args),
}));

import { trackEvent, trackCTAClick, trackFormSubmission } from '../utils/analytics';

describe('analytics → Mixpanel', () => {
  beforeEach(() => {
    track.mockReset();
  });

  it('forwards events to Mixpanel by name', () => {
    trackEvent('page_view', { page_name: 'Landing Page' });
    expect(track).toHaveBeenCalledWith('page_view', { page_name: 'Landing Page' });
  });

  it('preserves native types so numbers stay aggregatable (no Statsig string coercion)', () => {
    trackEvent('scroll_depth', { value: 75, label: '75%' });
    const [, props] = track.mock.calls[0];
    expect(props.value).toBe(75);
    expect(typeof props.value).toBe('number');
  });

  it('builds the cta_click envelope', () => {
    trackCTAClick('hero_cta_button', 'Get started', 'hero', { button_type: 'primary' });
    expect(track).toHaveBeenCalledWith('cta_click', {
      button_id: 'hero_cta_button',
      button_text: 'Get started',
      page_section: 'hero',
      button_type: 'primary',
    });
  });

  it('stamps form_submit with its submission_status', () => {
    trackFormSubmission('elite_contact_form', 'Elite Contact', { plan_type: 'elite' }, 'success');
    expect(track).toHaveBeenCalledWith('form_submit', {
      form_id: 'elite_contact_form',
      form_name: 'Elite Contact',
      submission_status: 'success',
      plan_type: 'elite',
    });
  });

  it('never throws into the UI when the Mixpanel layer errors', () => {
    track.mockImplementationOnce(() => { throw new Error('client exploded'); });
    expect(() => trackEvent('cta_click')).not.toThrow();
  });
});
