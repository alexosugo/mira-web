import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SupportedShops from '../components/SupportedShops';
import DMSalesJourney from '../components/DMSalesJourney';

const EXPECTED_SHOPS = [
  ['Daily-drop shops', '/use-cases/daily-drop-shops'],
  ['Fashion & thrift', '/use-cases/fashion'],
  ['Beauty', '/use-cases/beauty'],
  ['Accessories', '/use-cases/accessories'],
  ['Fragrance', '/use-cases/fragrances'],
  ['Bakeries & food', '/use-cases/home-bakeries-food-brands'],
  ['Skincare & haircare', '/use-cases/skincare-haircare-makers'],
] as const;

describe('imagery-led homepage sections', () => {
  it('promotes every supported shop type with a real use-case link', () => {
    render(<SupportedShops />);

    expect(
      screen.getByRole('heading', { name: /Whatever you sell, the questions repeat/i })
    ).toBeInTheDocument();

    for (const [name, href] of EXPECTED_SHOPS) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href);
    }
  });

  it('keeps the supported-shop grid compact and free of repeated rules', () => {
    const { container } = render(<SupportedShops />);

    const shopImages = screen.getAllByRole('img');
    for (const image of shopImages) {
      expect(image.parentElement?.className).toContain('sm:aspect-[4/3]');
    }
    expect(container.querySelectorAll('.border-t')).toHaveLength(0);
  });

  it('follows one Cocoa Rose Beauty order from stock question to delivery', () => {
    render(<DMSalesJourney />);

    expect(
      screen.getByRole('heading', { name: 'From “Is it available?” to “Rider ametoka”' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '“Hi, is shade 08 still available?”' })).toBeInTheDocument();
    expect(screen.getByTestId('journey-instagram-post')).toBeInTheDocument();
    expect(screen.getByText('Shared a post')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '“How much is delivery to Kilimani?”' })).not.toBeInTheDocument();
    expect(screen.queryByText('One customer. One order. From the first question to the delivery update.')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sellogram asks the shop owner to confirm the payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/card payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Kasa Archive')).not.toBeInTheDocument();
    expect(screen.queryByText('Mide Beauty')).not.toBeInTheDocument();
    expect(screen.queryByText('Aster Fragrance')).not.toBeInTheDocument();

    expect(screen.getAllByText('Cocoa Rose Beauty')).toHaveLength(1);
    expect(screen.queryByText('Inside the sale')).not.toBeInTheDocument();
    expect(screen.queryByText('Accra')).not.toBeInTheDocument();
  });

  it('shows one stage at a time and changes it without moving the page', () => {
    const scrollIntoView = HTMLElement.prototype.scrollIntoView;
    const scrollSpy = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollSpy;
    const { container } = render(<DMSalesJourney />);

    const firstDot = screen.getByRole('button', { name: 'Show step 1: Hi, is shade 08 still available?' });
    const finalDot = screen.getByRole('button', { name: 'Show step 5: Rider ametoka.' });
    expect(firstDot).toHaveAttribute('aria-current', 'step');

    fireEvent.click(finalDot);

    expect(firstDot).not.toHaveAttribute('aria-current');
    expect(finalDot).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('heading', { name: '“Rider ametoka.”' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '“Hi, is shade 08 still available?”' })).not.toBeInTheDocument();
    expect(container.querySelectorAll('[data-journey-frame]')).toHaveLength(1);
    expect(scrollSpy).not.toHaveBeenCalled();

    HTMLElement.prototype.scrollIntoView = scrollIntoView;
  });

  it('uses five compact progress dots with no connector', () => {
    const { container } = render(<DMSalesJourney />);

    expect(screen.getAllByRole('button', { name: /Show step/ })).toHaveLength(5);
    expect(container.querySelector('[data-journey-connector]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-journey-panel]')).toHaveClass('sticky');
  });

  it('uses the shop DM for payment details instead of a seller portrait', () => {
    render(<DMSalesJourney />);

    fireEvent.click(screen.getByRole('button', { name: /Show step 3/ }));

    expect(screen.getByTestId('journey-payment-inbox')).toBeInTheDocument();
    expect(screen.getByText(/M-Pesa Buy Goods till/)).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /shop owner/i })).not.toBeInTheDocument();
  });
});
