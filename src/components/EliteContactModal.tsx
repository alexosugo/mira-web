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
  `w-full px-4 py-3 rounded-xl transition-colors duration-200 focus:outline-none
   bg-gray-50 dark:bg-white/5 text-navy-800 dark:text-white
   placeholder-gray-500 dark:placeholder-navy-300 border ${
     hasError
       ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
       : 'border-gray-300 dark:border-white/15 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20'
   }`;

const LABEL_CLASSES = 'block text-sm font-semibold text-navy-800 dark:text-white mb-1.5';

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
      <div className="absolute inset-0 bg-navy-950/80 animate-fade-in" onClick={handleBackdropClick} />

      {/* Modal: follows the page theme, same single-chrome elevation as the demo cards */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90svh] overflow-y-auto rounded-3xl animate-fade-in-up
                   bg-white dark:bg-navy-900 shadow-xl dark:shadow-none
                   dark:border dark:border-navy-700"
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-navy-300
                       hover:text-navy-800 hover:bg-navy-800/5 dark:hover:text-white dark:hover:bg-white/10
                       transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 id="modal-title" className="font-display text-2xl font-bold text-navy-800 dark:text-white">
            Get in touch
          </h2>
          <p className="text-gray-600 dark:text-navy-300 mt-2 text-sm">
            Tell us about your shop and we'll put together an Elite plan for you.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {isSuccess ? (
            <div className="py-8 text-center animate-fade-in" role="status">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lime-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-lime-600 dark:text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                ref={successHeadingRef}
                tabIndex={-1}
                className="font-display text-xl font-bold text-navy-800 dark:text-white mb-2 focus:outline-none"
              >
                Thank you
              </h3>
              <p className="text-gray-600 dark:text-navy-300 mb-6">
                We've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={resetAndClose}
                className="px-6 py-3 rounded-xl bg-navy-800 text-white font-semibold
                           hover:bg-navy-900 transition-colors duration-200
                           dark:bg-white dark:text-navy-800 dark:hover:bg-gray-100"
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
                  <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.companyName}</p>
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
                  <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="elite-phone" className={LABEL_CLASSES}>
                  Phone <span className="font-normal text-gray-600 dark:text-navy-300">(optional)</span>
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
                  <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.personName}</p>
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
                  <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
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
                    className={`w-5 h-5 border rounded transition-all duration-200 flex items-center justify-center ${
                      formData.optInUpdates
                        ? 'bg-lime-500 border-lime-500'
                        : 'border-gray-400 dark:border-white/20 bg-gray-50 dark:bg-white/5'
                    }`}
                  >
                    {formData.optInUpdates && (
                      <svg className="w-3 h-3 text-navy-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-navy-300 group-hover:text-navy-800 dark:group-hover:text-white transition-colors">
                  I'd like to receive product updates and news from Mira
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full mt-4 py-3.5 px-6 rounded-xl bg-lime-500 text-navy-800 font-bold
                           hover:bg-lime-400 transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60 focus-visible:ring-offset-2
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
