import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroChatDemo from '../components/HeroChatDemo';

describe('HeroChatDemo', () => {
  it('renders the full conversation: question, answer, cart, and outcome', () => {
    render(<HeroChatDemo />);
    expect(screen.getByText(/denim jacket in M\?/)).toBeInTheDocument();
    expect(screen.getByText(/two left in M/)).toBeInTheDocument();
    expect(screen.getByText(/1 × Denim jacket \(M\)/)).toBeInTheDocument();
    expect(screen.getByText(/Order confirmed · 2:14 AM/)).toBeInTheDocument();
  });

  it('shows the shop handle and the Mira attribution', () => {
    render(<HeroChatDemo />);
    expect(screen.getByText('@nia.thrifts')).toBeInTheDocument();
    expect(screen.getByText('Mira replies for you')).toBeInTheDocument();
  });

  it('describes the conversation for assistive technology', () => {
    render(<HeroChatDemo />);
    expect(
      screen.getByLabelText(/Example Instagram DM conversation/)
    ).toBeInTheDocument();
  });
});
