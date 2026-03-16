import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  validateEmail,
  validateUrl,
  normalizeUrl,
  validateInstagramUrl,
  validateFormData,
} from '../utils/validation';

describe('sanitizeInput', () => {
  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('removes < and > characters', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
  });

  it('leaves normal text unchanged', () => {
    expect(sanitizeInput('John Doe')).toBe('John Doe');
  });
});

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user+tag@sub.domain.org')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('no@')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validateUrl', () => {
  it('accepts http and https URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('http://example.com')).toBe(true);
  });

  it('prepends https:// when no protocol is given', () => {
    expect(validateUrl('example.com')).toBe(true);
  });

  it('rejects non-URLs', () => {
    expect(validateUrl('not a url')).toBe(false);
    expect(validateUrl('')).toBe(false);
  });
});

describe('normalizeUrl', () => {
  it('returns empty string for empty input', () => {
    expect(normalizeUrl('')).toBe('');
  });

  it('prepends https:// when missing', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com');
  });

  it('leaves existing https:// URLs untouched', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com');
  });

  it('leaves existing http:// URLs untouched', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com');
  });

  it('trims whitespace', () => {
    expect(normalizeUrl('  https://example.com  ')).toBe('https://example.com');
  });
});

describe('validateInstagramUrl', () => {
  it('returns true for empty (optional field)', () => {
    expect(validateInstagramUrl('')).toBe(true);
  });

  it('accepts instagram.com URLs', () => {
    expect(validateInstagramUrl('https://instagram.com/user')).toBe(true);
    expect(validateInstagramUrl('https://www.instagram.com/user')).toBe(true);
  });

  it('rejects non-instagram URLs', () => {
    expect(validateInstagramUrl('https://twitter.com/user')).toBe(false);
  });

  it('accepts instagram.com without protocol (normalised)', () => {
    expect(validateInstagramUrl('instagram.com/user')).toBe(true);
  });
});

describe('validateFormData', () => {
  const validData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    website: 'https://example.com',
  };

  it('returns isValid: true for fully valid data', () => {
    expect(validateFormData(validData).isValid).toBe(true);
  });

  it('requires firstName', () => {
    const result = validateFormData({ ...validData, firstName: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.firstName).toBeTruthy();
  });

  it('requires firstName to be at least 2 characters', () => {
    const result = validateFormData({ ...validData, firstName: 'J' });
    expect(result.errors.firstName).toBeTruthy();
  });

  it('requires lastName', () => {
    const result = validateFormData({ ...validData, lastName: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.lastName).toBeTruthy();
  });

  it('requires a valid email', () => {
    const result = validateFormData({ ...validData, email: 'bademail' });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it('requires a valid website URL', () => {
    const result = validateFormData({ ...validData, website: 'not a url' });
    expect(result.isValid).toBe(false);
    expect(result.errors.website).toBeTruthy();
  });

  it('validates optional instagram URL when provided', () => {
    const result = validateFormData({ ...validData, instagram: 'https://twitter.com/bad' });
    expect(result.isValid).toBe(false);
    expect(result.errors.instagram).toBeTruthy();
  });

  it('accepts valid optional instagram URL', () => {
    const result = validateFormData({ ...validData, instagram: 'https://instagram.com/user' });
    expect(result.isValid).toBe(true);
  });
});
