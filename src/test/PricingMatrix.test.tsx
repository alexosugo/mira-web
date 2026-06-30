import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PricingMatrix from '../components/PricingMatrix';
import EliteModalButton from '../components/EliteModalButton';

vi.mock('../utils/analytics', () => ({
  trackCTAClick: vi.fn(),
  trackFormSubmission: vi.fn(),
  trackLeadCaptured: vi.fn(),
}));

describe('Pricing page interactive pricing components', () => {
  it('renders the full homepage pricing matrix', () => {
    render(<PricingMatrix />);

    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Elite')).toBeInTheDocument();
    expect(screen.getByText('Up to 10 customer conversations a month')).toBeInTheDocument();
    expect(screen.getByText('Unlimited customer conversations')).toBeInTheDocument();
    expect(screen.getByText('Custom integrations')).toBeInTheDocument();
  });

  it('opens the existing Elite modal from the pricing matrix', () => {
    render(<PricingMatrix />);

    fireEvent.click(screen.getByRole('button', { name: "Let's chat" }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument();
  });

  it('opens the existing Elite modal from the hero ask button', () => {
    render(<EliteModalButton label="Ask about Elite" location="Pricing Page hero" />);

    fireEvent.click(screen.getByRole('button', { name: 'Ask about Elite' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument();
  });
});
