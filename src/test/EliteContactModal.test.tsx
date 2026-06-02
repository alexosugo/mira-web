import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EliteContactModal from '../components/EliteContactModal';

describe('EliteContactModal', () => {
  it('closes on Escape', () => {
    const onClose = vi.fn();
    render(<EliteContactModal isOpen onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps Tab focus inside the dialog (last wraps to first)', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const focusables = dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea');
    const last = focusables[focusables.length - 1];
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(focusables[0]);
  });

  it('traps Shift+Tab focus inside the dialog (first wraps to last)', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const focusables = dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea');
    focusables[0].focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(focusables[focusables.length - 1]);
  });

  it('moves focus to the confirmation heading on successful submit', async () => {
    vi.useFakeTimers();
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Shop name/), { target: { value: 'Nia Thrifts' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'nia@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Nia' } });
    fireEvent.change(screen.getByLabelText(/About your shop/), { target: { value: 'Thrift fashion' } });
    fireEvent.click(screen.getByText('Send message'));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(document.activeElement?.textContent).toBe('Thank you');
    vi.useRealTimers();
  });
});
