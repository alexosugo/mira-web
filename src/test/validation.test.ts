import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  validateEmail,
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

