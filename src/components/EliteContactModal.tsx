import { useEffect, useRef, useState, FormEvent, MouseEvent } from 'react';
import { X, Building2, Mail, Phone, User, MessageSquare } from 'lucide-react';
import GlassButton from './common/GlassButton';

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

const EliteContactModal = ({ isOpen, onClose }: EliteContactModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    phone: '',
    personName: '',
    message: '',
    optInUpdates: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setFormData({ companyName: '', email: '', phone: '', personName: '', message: '', optInUpdates: false });
        setErrors({});
        setIsSuccess(false);
        onClose();
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
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.personName.trim()) {
      newErrors.personName = 'Your name is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Elite Contact Form Submission:', formData);
    
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
    setFormData({
      companyName: '',
      email: '',
      phone: '',
      personName: '',
      message: '',
      optInUpdates: false,
    });
    setErrors({});
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
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-fade-in" onClick={handleBackdropClick} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl shadow-2xl border border-white/10 animate-scale-in overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 id="modal-title" className="font-display text-2xl font-bold text-white">
            Get in touch
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Tell us about your business and we'll craft a custom Elite plan for you.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {isSuccess ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lime-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Thank you!
              </h3>
              <p className="text-gray-400 mb-6">
                We've received your message and will get back to you within 24 hours.
              </p>
              <GlassButton variant="primary" onClick={resetAndClose}>
                Close
              </GlassButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input
                    ref={firstInputRef}
                    type="text"
                    placeholder="Company Name *"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white/8 ${
                      errors.companyName 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-white/15 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20'
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.companyName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white/8 ${
                      errors.email 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-white/15 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20"
                  />
                </div>
              </div>

              {/* Person Name */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.personName}
                    onChange={(e) => handleInputChange('personName', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white/8 ${
                      errors.personName 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-white/15 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20'
                    }`}
                  />
                </div>
                {errors.personName && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.personName}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-500 pointer-events-none">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    placeholder="Tell us about your business goals *"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white/8 resize-none ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-white/15 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20'
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Opt-in Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.optInUpdates}
                    onChange={(e) => handleInputChange('optInUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-white/20 rounded bg-white/5 peer-checked:bg-lime-500 peer-checked:border-lime-500 transition-all duration-200 flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 text-navy-800 opacity-0 peer-checked:opacity-100 transition-opacity" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-5 h-5 border border-white/20 rounded bg-white/5 peer-checked:bg-lime-500 peer-checked:border-lime-500 transition-all duration-200 flex items-center justify-center">
                    {formData.optInUpdates && (
                      <svg className="w-3 h-3 text-navy-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  I'd like to receive product updates and news from Mira
                </span>
              </label>

              {/* Submit Button */}
              <GlassButton
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full mt-6"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </GlassButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EliteContactModal;
