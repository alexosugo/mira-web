import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HandoffDemo from '../components/HandoffDemo';

describe('HandoffDemo', () => {
  it('renders the full handoff: request, escalation, chip, and owner reply', () => {
    render(<HandoffDemo />);
    expect(screen.getByText(/KES 4,500 for two\?/)).toBeInTheDocument();
    expect(screen.getByText(/let me bring in Nia/)).toBeInTheDocument();
    expect(screen.getByText(/Passed to you · full context attached/)).toBeInTheDocument();
    expect(screen.getByText(/What letters do you want on it\?/)).toBeInTheDocument();
  });

  it('labels the owner reply and the outcome', () => {
    render(<HandoffDemo />);
    expect(screen.getByText("Nia, that's you")).toBeInTheDocument();
    expect(screen.getByText(/You stepped in once\. The sale kept moving\./)).toBeInTheDocument();
  });

  it('describes the conversation for assistive technology', () => {
    render(<HandoffDemo />);
    expect(
      screen.getByLabelText(/hands the thread to the shop owner/)
    ).toBeInTheDocument();
  });
});
