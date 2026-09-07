import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SupportedShops from '../components/SupportedShops';
import DMSalesJourney from '../components/DMSalesJourney';
import DeliveryOutcome from '../components/DeliveryOutcome';

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
      screen.getByRole('heading', { name: /Made for the kinds of shops that sell on Instagram/i })
    ).toBeInTheDocument();

    for (const [name, href] of EXPECTED_SHOPS) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href);
    }
  });

  it('shows four different stages of the DM sale instead of repeating availability', () => {
    render(<DMSalesJourney />);

    expect(screen.getByRole('heading', { name: /Answers product questions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Shares delivery details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Receives payment confirmations/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Keeps the order moving/i })).toBeInTheDocument();

    expect(screen.getByText(/Sent to the M-Pesa number/i)).toBeInTheDocument();
    expect(screen.getByText(/Rider ametoka/i)).toBeInTheDocument();
    expect(screen.queryByText(/card payment/i)).not.toBeInTheDocument();

    const journeyImages = screen.getAllByRole('img');
    expect(journeyImages).toHaveLength(4);
    for (const image of journeyImages) {
      expect(image.getAttribute('src')).toMatch(/^\/images\/journey\//);
    }
  });

  it('finishes the story with a real delivery outcome', () => {
    render(<DeliveryOutcome />);

    expect(screen.getByRole('heading', { name: /From DM to doorstep/i })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /piki piki rider delivering a Sellogram-powered shop order/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Cocoa Rose Beauty')).toBeInTheDocument();
    expect(screen.getByText(/Payment confirmed. Your order is packed/i)).toBeInTheDocument();
    expect(screen.getByText(/Rider ametoka/i)).toBeInTheDocument();
  });
});
