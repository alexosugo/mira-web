import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingLabelInput from '../components/common/FloatingLabelInput';

describe('FloatingLabelInput', () => {
  it('renders label text', () => {
    render(<FloatingLabelInput label="Email" value="" onChange={vi.fn()} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<FloatingLabelInput label="Email" value="" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is set', () => {
    render(<FloatingLabelInput label="Email" required value="" onChange={vi.fn()} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when required is not set', () => {
    render(<FloatingLabelInput label="Email" value="" onChange={vi.fn()} />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(<FloatingLabelInput label="Email" error="Invalid email" value="" onChange={vi.fn()} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('does not render error message when error is absent', () => {
    render(<FloatingLabelInput label="Email" value="" onChange={vi.fn()} />);
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const onChange = vi.fn();
    render(<FloatingLabelInput label="Name" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Jane' } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('renders icon when provided', () => {
    render(
      <FloatingLabelInput
        label="Name"
        value=""
        onChange={vi.fn()}
        icon={<span data-testid="field-icon">@</span>}
      />
    );
    expect(screen.getByTestId('field-icon')).toBeInTheDocument();
  });

  it('reflects value from prop', () => {
    render(<FloatingLabelInput label="Name" value="Jane" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('Jane');
  });
});
