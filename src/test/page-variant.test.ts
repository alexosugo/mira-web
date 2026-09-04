import { describe, expect, it } from 'vitest';
import { decorForPath, variantForPath } from '../lib/page-variant';
import { ROUTES } from '../lib/routes';

describe('variantForPath', () => {
  it('classifies use-case pages', () => {
    expect(variantForPath('/use-cases/fashion')).toBe('useCase');
  });

  it('classifies feature and integration pages', () => {
    expect(variantForPath('/features/inbox')).toBe('feature');
    expect(variantForPath('/integrations/instagram')).toBe('feature');
  });

  it('classifies guide pages', () => {
    expect(variantForPath('/how-it-works')).toBe('guide');
    expect(variantForPath('/instagram-dm-automation')).toBe('guide');
  });

  it('classifies pricing, trust, and company pages', () => {
    expect(variantForPath('/pricing')).toBe('pricing');
    expect(variantForPath('/security')).toBe('trust');
    expect(variantForPath('/about')).toBe('company');
  });

  it('classifies legal pages', () => {
    expect(variantForPath('/privacy')).toBe('legal');
    expect(variantForPath('/terms')).toBe('legal');
    expect(variantForPath('/data-deletion')).toBe('legal');
  });

  it('falls back to support for anything else', () => {
    expect(variantForPath('/contact')).toBe('support');
    expect(variantForPath('/help')).toBe('support');
    expect(variantForPath('/nonexistent-page')).toBe('support');
  });

  it('assigns a variant to every registered route with no fallback surprises', () => {
    for (const route of ROUTES) {
      expect(() => variantForPath(route.path)).not.toThrow();
    }
  });
});

describe('decorForPath', () => {
  it('returns ghost word and motif for known use-case paths', () => {
    expect(decorForPath('/use-cases/beauty')).toEqual({ ghostWord: 'beauty', motif: 'mirror' });
  });

  it('returns undefined for paths without decor', () => {
    expect(decorForPath('/pricing')).toBeUndefined();
    expect(decorForPath('/use-cases/unknown')).toBeUndefined();
  });
});
