import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByTestId('journey-dm')).toBeInTheDocument();
    expect(screen.queryByTestId('journey-instagram-post')).not.toBeInTheDocument();
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

  it('shows one stage at a time in one fixed visual area', () => {
    const { container } = render(<DMSalesJourney />);

    expect(container.querySelectorAll('[data-journey-frame]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-journey-visual]')).toHaveLength(1);
    expect(screen.queryByRole('img', { name: /Cocoa Rose Beauty model/i })).not.toBeInTheDocument();
  });

  it('uses five passive progress dots with no connector', () => {
    const { container } = render(<DMSalesJourney />);
    const progress = screen.getByRole('list', { name: 'Order progress' });
    const dots = within(progress).getAllByRole('listitem');

    expect(dots).toHaveLength(5);
    expect(dots[0]).toHaveAttribute('aria-current', 'step');
    expect(screen.queryByRole('button', { name: /Show step/ })).not.toBeInTheDocument();
    expect(container.querySelector('[data-journey-connector]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-journey-panel]')).toHaveClass('sticky');
  });

  it('keeps the customer inside the shop DM', () => {
    render(<DMSalesJourney />);

    expect(screen.getByText('Cocoa Rose Beauty')).toBeInTheDocument();
    expect(screen.queryByText('Sellogram')).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /shop owner/i })).not.toBeInTheDocument();
  });
});
