import { describe, it, expect, afterEach } from 'vitest';
import { resolvePageName } from '../lib/page-name';

describe('resolvePageName (page-aware analytics)', () => {
  afterEach(() => {
    delete document.body.dataset.pageName;
  });

  it('reads the page name written by ContentLayout', () => {
    document.body.dataset.pageName = 'Pricing Page';
    expect(resolvePageName()).toBe('Pricing Page');
  });

  it('falls back to "Landing Page" when no attribute is set (homepage, no regression)', () => {
    delete document.body.dataset.pageName;
    expect(resolvePageName()).toBe('Landing Page');
  });
});
