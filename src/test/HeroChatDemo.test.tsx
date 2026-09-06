import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroChatDemo from '../components/HeroChatDemo';

describe('HeroChatDemo', () => {
  it('renders the full cobalt stairwell photograph as the hero proof surface', () => {
    render(<HeroChatDemo />);

    const image = screen.getByRole('img', {
      name: /Nairobi fashion seller photographing a denim look against a cobalt-blue stairwell/i,
    });

    expect(image).toHaveAttribute('src', '/images/hero/cobalt-stairwell.webp');
    expect(image).toHaveAttribute('width', '1536');
    expect(image).toHaveAttribute('height', '1024');
    expect(image.className).not.toContain('object-cover');
  });

  it('shows the customer chatting with the shop, not with Sellogram', () => {
    render(<HeroChatDemo />);

    expect(screen.getByText('Nia Thrift')).toBeInTheDocument();
    expect(screen.queryByText('Sellogram replies for you')).not.toBeInTheDocument();
  });

  it('shows a natural product-to-delivery conversation', () => {
    render(<HeroChatDemo />);

    expect(screen.getByText('Hii denim set bado iko in M?')).toBeInTheDocument();
    expect(screen.getByText('Iko. Full set ni KSh 6,000.')).toBeInTheDocument();
    expect(screen.getByText('Na delivery Kilimani?')).toBeInTheDocument();
    expect(
      screen.getByText('KSh 250. Ukichukua leo rider can bring it this afternoon.')
    ).toBeInTheDocument();
    expect(screen.getByText('Patchwork denim set')).toBeInTheDocument();
    expect(screen.queryByText(/card/i)).not.toBeInTheDocument();
  });

  it('describes the shop DM scene for assistive technology', () => {
    render(<HeroChatDemo />);

    expect(screen.getByLabelText(/Example Nia Thrift Instagram DM conversation/i)).toBeInTheDocument();
  });
});
