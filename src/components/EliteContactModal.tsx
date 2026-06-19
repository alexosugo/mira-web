import { useEffect, useRef, useState, FormEvent, MouseEvent } from 'react';
import { X } from 'lucide-react';

interface EliteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  companyName: string;
  email: string;
  phone: string;
  personName: string;
  message: string;
  optInUpdates: boolean;
}

const EMPTY_FORM: FormData = {
  companyName: '',
  email: '',
  phone: '',
  personName: '',
  message: '',
  optInUpdates: false,
};

const INPUT_CLASSES = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg transition-colors duration-200 focus:outline-none
   bg-paper text-ink placeholder-ink-faint border ${
     hasError
       ? 'border-red-600/60 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
       : 'border-line focus:border-ink/40 focus:ring-2 focus:ring-ink/10'
   }`;

const LABEL_CLASSES = 'block text-sm font-semibold text-ink mb-1.5';

const EliteContactModal = ({ isOpen, onClose }: EliteContactModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const submissionActiveRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // The submit button unmounts on success; without this, keyboard focus drops
  // to <body> and assistive tech never hears the confirmation.
  useEffect(() => {
    if (isSuccess) successHeadingRef.current?.focus();
  }, [isSuccess]);

  // Keep keyboard focus inside the dialog: aria-modal alone doesn't enforce it
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !modalRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !modalRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, isSuccess]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetAndClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      resetAndClose();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Please enter your shop name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email needs an @ and a domain, like nia@example.com';
    }
    if (!formData.personName.trim()) {
      newErrors.personName = 'Please enter your name';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Tell us a little about your shop';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    submissionActiveRef.current = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!submissionActiveRef.current) return;

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetAndClose = () => {
    submissionActiveRef.current = false;
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-night/70" onClick={handleBackdropClick} />

      {/* Modal: single hairline elevation, matching the page's demo card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90svh] overflow-y-auto rounded-2xl animate-fade-in-up
                   bg-white border border-line"
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full text-ink-light
                       hover:text-ink hover:bg-ink/5 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 id="modal-title" className="font-display text-2xl font-medium text-ink">
            Get in touch
          </h2>
          <p className="text-ink-light mt-2 text-sm">
            Tell us about your shop and we'll put together an Elite plan for you.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {isSuccess ? (
            <div className="py-8 text-center animate-fade-in-up" role="status">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-fern/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-fern" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                ref={successHeadingRef}
                tabIndex={-1}
                className="font-display text-xl font-medium text-ink mb-2 focus:outline-none"
              >
                Thank you
              </h3>
              <p className="text-ink-light mb-6">
                We've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={resetAndClose}
                className="px-6 py-3 rounded-full bg-fern text-paper font-medium
                           hover:bg-fern-deep transition-colors duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shop name */}
              <div>
                <label htmlFor="elite-shop-name" className={LABEL_CLASSES}>
                  Shop name <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="elite-shop-name"
                  type="text"
                  placeholder="e.g. @nia.thrifts"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  aria-required="true"
                  className={INPUT_CLASSES(Boolean(errors.companyName))}
                />
                {errors.companyName && (
                  <p className="mt-1.5 text-sm text-red-700">{errors.companyName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="elite-email" className={LABEL_CLASSES}>
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="elite-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  aria-required="true"
                  className={INPUT_CLASSES(Boolean(errors.email))}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-700">{errors.email}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="elite-phone" className={LABEL_CLASSES}>
                  Phone <span className="font-normal text-ink-light">(optional)</span>
                </label>
                <input
                  id="elite-phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={INPUT_CLASSES(false)}
                />
              </div>

              {/* Your name */}
              <div>
                <label htmlFor="elite-name" className={LABEL_CLASSES}>
                  Your name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="elite-name"
                  type="text"
                  placeholder="First and last name"
                  value={formData.personName}
                  onChange={(e) => handleInputChange('personName', e.target.value)}
                  aria-required="true"
                  className={INPUT_CLASSES(Boolean(errors.personName))}
                />
                {errors.personName && (
                  <p className="mt-1.5 text-sm text-red-700">{errors.personName}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="elite-message" className={LABEL_CLASSES}>
                  About your shop <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="elite-message"
                  placeholder="What do you sell, and what should Mira handle for you?"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  aria-required="true"
                  className={`${INPUT_CLASSES(Boolean(errors.message))} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-700">{errors.message}</p>
                )}
              </div>

              {/* Opt-in checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.optInUpdates}
                    onChange={(e) => handleInputChange('optInUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-5 h-5 border rounded transition-colors duration-200 flex items-center justify-center ${
                      formData.optInUpdates ? 'bg-fern border-fern' : 'border-ink-faint bg-paper'
                    }`}
                  >
                    {formData.optInUpdates && (
                      <svg className="w-3 h-3 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-ink-light group-hover:text-ink transition-colors">
                  I'd like to receive product updates and news from Mira
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full mt-4 py-3.5 px-6 rounded-full bg-fern text-paper font-medium
                           hover:bg-fern-deep transition-colors duration-200
                           ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EliteContactModal;
