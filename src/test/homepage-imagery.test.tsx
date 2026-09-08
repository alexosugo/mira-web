import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
    const { container } = render(<DMSalesJourney />);

    expect(
      screen.getByRole('heading', { name: 'From “Is it available?” to “Rider ametoka”' })
    ).toBeInTheDocument();
    expect(screen.getByText('One customer. One order. From the first question to the delivery update.')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: '“Hi, is shade 08 still available?”' })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { name: '“How much is delivery to Kilimani?”' })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { name: '“Sent to the M-Pesa number.”' })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { name: '“Rider ametoka.”' })).toHaveLength(2);

    expect(screen.getAllByText(/Sellogram asks the shop owner to confirm the payment/i)).toHaveLength(2);
    expect(screen.queryByText(/card payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Kasa Archive')).not.toBeInTheDocument();
    expect(screen.queryByText('Mide Beauty')).not.toBeInTheDocument();
    expect(screen.queryByText('Aster Fragrance')).not.toBeInTheDocument();

    const mobileStory = container.querySelector('[data-testid="journey-mobile-story"]');
    expect(mobileStory).not.toBeNull();
    const journeyImages = within(mobileStory as HTMLElement).getAllByRole('img');
    expect(journeyImages).toHaveLength(4);
    for (const image of journeyImages) {
      expect(image.getAttribute('src')).toMatch(/^\/images\/journey\//);
    }
    expect(
      within(mobileStory as HTMLElement).getByRole('img', { name: /piki piki rider delivering a Cocoa Rose Beauty order/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Cocoa Rose Beauty')).toHaveLength(5);
    expect(screen.queryByText('Inside the sale')).not.toBeInTheDocument();
    expect(screen.queryByText('Accra')).not.toBeInTheDocument();
  });

  it('changes the desktop visual when a progress dot is selected', () => {
    render(<DMSalesJourney />);

    const firstDot = screen.getByRole('button', { name: 'Show step 1: Hi, is shade 08 still available?' });
    const finalDot = screen.getByRole('button', { name: 'Show step 4: Rider ametoka.' });
    expect(firstDot).toHaveAttribute('aria-current', 'step');

    fireEvent.click(finalDot);

    expect(firstDot).not.toHaveAttribute('aria-current');
    expect(finalDot).toHaveAttribute('aria-current', 'step');
    expect(screen.getByTestId('journey-desktop-visual').querySelector('img')).toHaveAttribute(
      'src',
      '/images/journey/cocoa-rose-delivery.webp'
    );
  });

  it('uses one compact image frame and no stage rules', () => {
    const { container } = render(<DMSalesJourney />);

    const section = container.querySelector('#dm-sales-journey');
    expect(section?.className).not.toContain('border-y');
    expect(container.querySelectorAll('li.border-t')).toHaveLength(0);

    const mobileStory = container.querySelector('[data-testid="journey-mobile-story"]');
    const frames = mobileStory?.querySelectorAll('[data-journey-frame]');
    expect(frames).toHaveLength(4);
    for (const frame of frames ?? []) {
      expect(frame.className).toContain('aspect-[4/3]');
    }
  });
});
