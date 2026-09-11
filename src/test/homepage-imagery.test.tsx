import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import SupportedShops from '../components/SupportedShops';
import DMSalesJourney from '../components/DMSalesJourney';

const EXPECTED_SHOPS = [
  ['Fashion & thrift', '/use-cases/fashion'],
  ['Beauty', '/use-cases/beauty'],
  ['Accessories', '/use-cases/accessories'],
  ['Bakeries & food', '/use-cases/home-bakeries-food-brands'],
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
    expect(screen.getAllByRole('link')).toHaveLength(EXPECTED_SHOPS.length);
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
    expect(screen.getByRole('button', { name: /Hi, is shade 08 still available\?/ })).toBeInTheDocument();
    expect(screen.getByTestId('journey-dm')).toBeInTheDocument();
    expect(screen.queryByTestId('journey-instagram-post')).not.toBeInTheDocument();
    expect(screen.getByText('Shared a post')).toBeInTheDocument();
    expect(screen.queryByText('Delivery to Kilimani is KSh 250.')).not.toBeInTheDocument();
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

  it('lets the reader pick any of the five steps without scroll locking', () => {
    const { container } = render(<DMSalesJourney />);
    const progress = screen.getByRole('list', { name: 'Order progress' });
    const steps = within(progress).getAllByRole('listitem');

    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveAttribute('aria-current', 'step');
    expect(container.querySelector('.sticky')).not.toBeInTheDocument();
    expect(container.querySelector('[data-journey-connector]')).not.toBeInTheDocument();

    fireEvent.click(within(progress).getByRole('button', { name: /Send me the payment details/ }));
    expect(steps[2]).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('Hi, is shade 08 still available?')).toBeInTheDocument();
    expect(screen.getByText(/Buy Goods till 946512/).className).toContain('bg-dawn-bright');

    fireEvent.click(within(progress).getByRole('button', { name: /Rider ametoka/ }));
    expect(screen.getByRole('img', { name: /Piki piki rider/ })).toBeInTheDocument();
  });

  it('keeps the customer inside the shop DM', () => {
    render(<DMSalesJourney />);

    expect(screen.getByText('Cocoa Rose Beauty')).toBeInTheDocument();
    expect(screen.queryByText('Sellogram')).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /shop owner/i })).not.toBeInTheDocument();
  });
});
