import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlassButton from '../components/common/GlassButton';

describe('GlassButton', () => {
  it('renders children', () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<GlassButton onClick={onClick}>Click</GlassButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and shows spinner when loading', () => {
    render(<GlassButton loading>Loading</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // spinner SVG should be in the DOM
    expect(button.querySelector('svg')).toBeTruthy();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<GlassButton disabled onClick={onClick}>Disabled</GlassButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with type="submit" when specified', () => {
    render(<GlassButton type="submit">Submit</GlassButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies className prop', () => {
    render(<GlassButton className="extra-class">Styled</GlassButton>);
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  it('renders arrow when showArrow is true', () => {
    const { container } = render(<GlassButton showArrow>Go</GlassButton>);
    // ArrowRight from lucide renders an svg
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders icon when provided', () => {
    render(<GlassButton icon={<span data-testid="icon">★</span>}>With icon</GlassButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
