import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../components/Header';
import Hero from '../components/Hero';

const trackCTA = vi.fn();
vi.mock('../hooks/useTracking', () => ({
  useCTATracking: () => ({ trackCTA }),
  useSectionTracking: () => ({ current: null }),
}));

describe('Start free navigation', () => {
  it.each([['header', Header], ['hero', Hero]] as const)(
    'preserves modified link clicks in the %s while tracking them',
    (_name, Component) => {
      trackCTA.mockClear();
      render(<Component />);
      const link = screen.getByRole('link', { name: 'Start free' });
      const click = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
      fireEvent(link, click);
      expect(click.defaultPrevented).toBe(false);
      expect(link).toHaveAttribute('href', 'https://app.sellogram.co');
      expect(trackCTA).toHaveBeenCalledOnce();
      expect(link).not.toHaveAttribute('aria-busy');
    },
  );
});
