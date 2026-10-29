import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Header from '../components/Header';

vi.mock('../hooks/useTracking', () => ({
  useCTATracking: () => ({ trackCTA: vi.fn() }),
}));

afterEach(() => window.history.replaceState({}, '', '/'));

describe('header navigation', () => {
  it('opens the mobile links and closes them with Escape', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' });
    expect(within(navigation).getByRole('link', { name: 'How it works' })).toHaveAttribute('href', '/how-it-works');
    expect(within(navigation).getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('marks the current route and offers a skip link', () => {
    window.history.replaceState({}, '', '/pricing/');
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Skip to content', hidden: true })).toHaveAttribute('href', '#main-content');
  });
});
