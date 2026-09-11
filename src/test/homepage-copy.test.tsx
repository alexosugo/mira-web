import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { DM_SCOPE_REASSURANCE, STEPS } from '../content/pages';

vi.mock('../hooks/useTracking', () => ({
  useSectionTracking: () => ({ current: null }),
  useCTATracking: () => ({ trackCTA: vi.fn() }),
}));

describe('homepage voice', () => {
  it('opens with the Instagram bio promise and no marketing kicker', () => {
    const { container } = render(<Hero />);

    const heading = screen.getByRole('heading', { name: 'Your inbox has one job: to sell' });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('5.5rem');
    expect(container.querySelector('.border-t')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start free' })).toBeInTheDocument();
    expect(screen.getByText(/Tricky questions come to you/)).toBeInTheDocument();
    expect(screen.queryByText('Start free. No card.')).not.toBeInTheDocument();
    expect(screen.queryByText(/Instagram commerce/i)).not.toBeInTheDocument();
  });

  it('states what Sellogram reads and removes numbered setup labels', () => {
    render(<HowItWorks />);

    expect(screen.getByRole('heading', { name: 'Put Sellogram to work this afternoon.' })).toBeInTheDocument();
    expect(STEPS).toHaveLength(4);
    expect(DM_SCOPE_REASSURANCE).toMatch(/posts and DMs/i);
    expect(DM_SCOPE_REASSURANCE).not.toMatch(/only your shop's DMs/i);
    expect(screen.getByText(/hands to you/)).toBeInTheDocument();
    expect(screen.queryByText('Set up once')).not.toBeInTheDocument();
    expect(screen.queryByText('01')).not.toBeInTheDocument();
  });

  it('keeps the pricing and final call to action plain', () => {
    const { unmount } = render(<Pricing />);
    expect(screen.getByRole('heading', { name: 'Start free. Pay when you need more.' })).toBeInTheDocument();
    unmount();

    render(<FinalCTA />);
    const finalHeading = screen.getByRole('heading', { name: 'Put Sellogram to work in your DMs' });
    expect(finalHeading).toBeInTheDocument();
    expect(finalHeading.className).toContain('3.5rem');
    expect(screen.getByRole('link', { name: 'Start free' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ask us a question' })).toHaveAttribute('href', '/contact');
    expect(screen.queryByText(/Less inbox duty/i)).not.toBeInTheDocument();
  });

  it('gives homepage navigation and text actions a 44px touch target', () => {
    const { unmount } = render(<Header />);
    for (const link of screen.getAllByRole('link')) {
      expect(link.className).toContain('min-h-[44px]');
    }
    fireEvent.scroll(window);
    const headerPricingLink = screen.getByRole('link', { name: 'Pricing' });
    headerPricingLink.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(headerPricingLink);
    unmount();

    const hero = render(<Hero />);
    expect(screen.getByRole('button', { name: 'See a sale happen' }).className).toContain('min-h-[44px]');
    hero.unmount();

    render(<Footer />);
    for (const link of screen.getAllByRole('link')) {
      expect(link.className).toContain('min-h-[44px]');
      expect(link.className).toContain('min-w-[44px]');
    }
    const footerPricingLink = screen.getByRole('link', { name: 'Pricing' });
    const emailLink = screen.getByRole('link', { name: 'hello@sellogram.co' });
    footerPricingLink.addEventListener('click', (event) => event.preventDefault());
    emailLink.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(footerPricingLink);
    fireEvent.click(emailLink);
  });
});
