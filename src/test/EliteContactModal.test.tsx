import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EliteContactModal from '../components/EliteContactModal';

const submitEliteInquiry = vi.fn();
vi.mock('../lib/elite-inquiry', () => ({
  submitEliteInquiry: (...args: unknown[]) => submitEliteInquiry(...args),
}));

const trackFormSubmission = vi.fn();
const trackLeadCaptured = vi.fn();
vi.mock('../utils/analytics', () => ({
  trackFormSubmission: (...args: unknown[]) => trackFormSubmission(...args),
  trackLeadCaptured: (...args: unknown[]) => trackLeadCaptured(...args),
}));

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/Shop name/), { target: { value: 'Nia Thrifts' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'nia@example.com' } });
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Nia' } });
  fireEvent.change(screen.getByLabelText(/About your shop/), { target: { value: 'Thrift fashion' } });
}

describe('EliteContactModal', () => {
  beforeEach(() => {
    submitEliteInquiry.mockReset();
    trackFormSubmission.mockReset();
    trackLeadCaptured.mockReset();
  });

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

  it('submits the inquiry and moves focus to the confirmation heading on success', async () => {
    submitEliteInquiry.mockResolvedValue(undefined);
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.click(screen.getByText('Send message'));

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(document.activeElement?.textContent).toBe('Thank you');
    expect(submitEliteInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ shop_name: 'Nia Thrifts', email: 'nia@example.com', contact_name: 'Nia' })
    );
  });

  it('fires lead_captured on success and form_submitted only as attempt mechanics', async () => {
    submitEliteInquiry.mockResolvedValue(undefined);
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.click(screen.getByText('Send message'));

    await screen.findByRole('status');
    expect(trackFormSubmission).toHaveBeenCalledWith(
      'elite_contact_form',
      'Elite Contact',
      expect.objectContaining({ plan_type: 'elite' }),
      'attempt'
    );
    // No form_submitted 'success' — the success path is the lead_captured value moment.
    expect(trackFormSubmission).not.toHaveBeenCalledWith(
      expect.anything(), expect.anything(), expect.anything(), 'success'
    );
    expect(trackLeadCaptured).toHaveBeenCalledWith(
      expect.objectContaining({ lead_type: 'elite', email: 'nia@example.com', shop_name: 'Nia Thrifts' })
    );
  });

  it('reports an error event (not a lead) when persistence fails', async () => {
    submitEliteInquiry.mockRejectedValue(new Error('insert failed'));
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.click(screen.getByText('Send message'));

    await screen.findByRole('alert');
    expect(trackFormSubmission).toHaveBeenCalledWith('elite_contact_form', 'Elite Contact', expect.anything(), 'error');
    expect(trackLeadCaptured).not.toHaveBeenCalled();
  });

  it('shows a recoverable error when persistence fails', async () => {
    submitEliteInquiry.mockRejectedValue(new Error('insert failed'));
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.click(screen.getByText('Send message'));

    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not submit when required fields are empty', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fireEvent.click(screen.getByText('Send message'));
    expect(submitEliteInquiry).not.toHaveBeenCalled();
    expect(screen.getByText('Please enter your shop name')).toBeInTheDocument();
  });

  it('rejects shop name shorter than 2 characters', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Shop name/), { target: { value: 'A' } });
    fireEvent.click(screen.getByText('Send message'));
    expect(screen.getByText('Shop name must be at least 2 characters')).toBeInTheDocument();
    expect(submitEliteInquiry).not.toHaveBeenCalled();
  });

  it('rejects person name shorter than 2 characters', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Shop name/), { target: { value: 'Nia Thrifts' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'nia@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'N' } });
    fireEvent.change(screen.getByLabelText(/About your shop/), { target: { value: 'Thrift fashion' } });
    fireEvent.click(screen.getByText('Send message'));
    expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    expect(submitEliteInquiry).not.toHaveBeenCalled();
  });

  it('rejects an invalid phone number when one is entered', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: '+25471234' } });
    fireEvent.click(screen.getByText('Send message'));
    expect(screen.getByText(/valid Kenyan number/i)).toBeInTheDocument();
    expect(submitEliteInquiry).not.toHaveBeenCalled();
  });

  it('strips leading 0 from phone and enforces the +254 prefix', () => {
    render(<EliteContactModal isOpen onClose={() => {}} />);
    const phoneInput = screen.getByLabelText(/Phone/) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: '0712345678' } });
    expect(phoneInput.value).toBe('+254712345678');
  });

  it('submits null phone when only the prefix is present', async () => {
    submitEliteInquiry.mockResolvedValue(undefined);
    render(<EliteContactModal isOpen onClose={() => {}} />);
    fillValidForm();
    fireEvent.click(screen.getByText('Send message'));
    await screen.findByRole('status');
    expect(submitEliteInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ phone: null })
    );
  });
});
