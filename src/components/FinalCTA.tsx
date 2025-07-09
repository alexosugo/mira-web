import React, { useState } from 'react';
import { ArrowRight, Clock, Star, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToWaitlist, type WaitlistFormData } from '../services/waitlistService';
import { useFormTracking, useSectionTracking } from '../hooks/useTracking';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  website?: string;
  instagram?: string;
}

const FinalCTA = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    instagram: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { trackSubmission, trackFieldInteraction } = useFormTracking();
  const sectionRef = useSectionTracking('final-cta', 'Final CTA Section');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (value.trim().length > 50) return 'First name must be less than 50 characters';
        break;
      
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (value.trim().length > 50) return 'Last name must be less than 50 characters';
        break;
      
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        if (value.trim().length > 255) return 'Email address is too long';
        break;
      
      case 'website':
        if (!value.trim()) return 'Website URL is required';
        if (value.trim().length > 255) return 'Website URL is too long';
        // Basic URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(value.trim())) return 'Please enter a valid website URL';
        break;
      
      case 'instagram':
        if (value.trim() && value.trim().length > 255) return 'Instagram URL is too long';
        if (value.trim()) {
          try {
            const url = value.startsWith('http') ? value : `https://${value}`;
            const urlObj = new URL(url);
            if (!['instagram.com', 'www.instagram.com'].includes(urlObj.hostname)) {
              return 'Please enter a valid Instagram URL';
            }
          } catch {
            return 'Please enter a valid Instagram URL';
          }
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Track field interaction
    trackFieldInteraction(name, name, 'change', value);
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    trackFieldInteraction(fieldName, fieldName, 'focus');
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    trackFieldInteraction(fieldName, fieldName, 'blur', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackSubmission('waitlist_form', 'Waitlist Form', formData, 'attempt');
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        const result = await submitToWaitlist(formData);
        
        if (result.success) {
          // Track successful submission
          trackSubmission('waitlist_form', 'Waitlist Form', formData, 'success');
          setSubmitStatus('success');
          setSubmitMessage(result.message);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            website: '',
            instagram: ''
          });
        } else {
          // Track failed submission
          trackSubmission('waitlist_form', 'Waitlist Form', formData, 'error');
          setSubmitStatus('error');
          setSubmitMessage(result.message);
          
          // If it's an email already exists error, highlight the email field
          if (result.error === 'Email already exists') {
            setErrors({ email: 'This email is already registered' });
          }
        }
      } catch (error) {
        // Track error submission
        trackSubmission('waitlist_form', 'Waitlist Form', formData, 'error');
        setSubmitStatus('error');
        setSubmitMessage('An unexpected error occurred. Please try again.');
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
        
        // Reset status after 5 seconds for error state
        if (submitStatus === 'error') {
          setTimeout(() => {
            setSubmitStatus('idle');
            setSubmitMessage('');
          }, 5000);
        }
      }
    }
  };

  if (submitStatus === 'success') {
    return (
      <section className="py-20 bg-gradient-to-br from-[#13243E] via-[#1a2f4a] to-[#13243E] relative overflow-hidden" style={{ fontFamily: "Funnel Sans" }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0DC2D]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C0DC2D]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="bg-[#C0DC2D]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-[#C0DC2D]" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            You're All Set!
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            {submitMessage}
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-gray-200 mb-4">What happens next:</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">1</span>
                </div>
                <span className="text-gray-200 text-sm">Confirmation email sent to your inbox</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">2</span>
                </div>
                <span className="text-gray-200 text-sm">Exclusive launch updates and early bird pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">3</span>
                </div>
                <span className="text-gray-200 text-sm">Priority access when Mira launches</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setSubmitStatus('idle');
              setSubmitMessage('');
            }}
            className="mt-8 text-gray-300 hover:text-white transition-colors underline"
          >
            Back to form
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" ref={sectionRef} className="py-20 bg-gradient-to-br from-[#13243E] via-[#1a2f4a] to-[#13243E] relative overflow-hidden" style={{ fontFamily: "Funnel Sans" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0DC2D]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C0DC2D]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 bg-[#C0DC2D]/20 text-[#C0DC2D] px-6 py-3 rounded-full text-sm font-bold mb-8 animate-pulse">
          <Clock className="h-4 w-4" />
          Limited Time: Early Bird Pricing Available
        </div>
        
        {/* Main Headline */}
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: "Funnel Display" }}>
          Don't Miss Out on<br />
          <span className="text-[#C0DC2D]">Mira's Launch</span>
        </h2>
        
        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
          Be Among the First Kenyan Businesses to Transform Your Customer Support
        </p>
        
        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
          <div className="text-left mb-6">
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Funnel Display" }}>
              Get Early Access
            </h3>
            <p className="text-gray-300">
              Join the exclusive group of forward-thinking businesses getting priority access to Mira.
            </p>
          </div>

          {submitStatus === 'error' && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-200 text-sm">
                {submitMessage}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* First Name and Last Name Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
                  First Name <span className="text-[#C0DC2D]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('firstName')}
                  onBlur={() => handleFieldBlur('firstName', formData.firstName)}
                  maxLength={50}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors ${
                    errors.firstName ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Enter your first name"
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  data-hotjar-trigger="form_field"
                  data-field-name="firstName"
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
                  Last Name <span className="text-[#C0DC2D]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('lastName')}
                  onBlur={() => handleFieldBlur('lastName', formData.lastName)}
                  maxLength={50}
                  className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors ${
                    errors.lastName ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Enter your last name"
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  data-hotjar-trigger="form_field"
                  data-field-name="lastName"
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address <span className="text-[#C0DC2D]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('email')}
                onBlur={() => handleFieldBlur('email', formData.email)}
                maxLength={255}
                className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="your.email@company.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                data-hotjar-trigger="form_field"
                data-field-name="email"
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-200 mb-2">
                Website URL <span className="text-[#C0DC2D]">*</span>
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('website')}
                onBlur={() => handleFieldBlur('website', formData.website)}
                maxLength={255}
                className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors ${
                  errors.website ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="https://yourwebsite.com"
                aria-describedby={errors.website ? 'website-error' : undefined}
                data-hotjar-trigger="form_field"
                data-field-name="website"
              />
              {errors.website && (
                <p id="website-error" className="text-red-400 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            {/* Instagram Profile URL */}
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-200 mb-2">
                Instagram Profile URL <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('instagram')}
                onBlur={() => handleFieldBlur('instagram', formData.instagram)}
                maxLength={255}
                className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors ${
                  errors.instagram ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="https://instagram.com/yourbusiness"
                aria-describedby={errors.instagram ? 'instagram-error' : undefined}
                data-hotjar-trigger="form_field"
                data-field-name="instagram"
              />
              {errors.instagram && (
                <p id="instagram-error" className="text-red-400 text-sm mt-1">{errors.instagram}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-hotjar-trigger="form_submit"
              data-button-id="waitlist_form_submit"
              data-button-text="Get Early Access"
              data-page-section="final-cta"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#13243E]/30 border-t-[#13243E] rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Get Early Access
                  <ArrowRight className="h-6 w-6" />
                </>
              )}
            </button>
          </form>

          {/* Benefits List */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-300 text-sm mb-4">
              By joining, you'll get:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-sm">Early bird pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-sm">Priority access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-sm"><span style={{ fontFamily: "Funnel Sans" }}>14</span>-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#13243E] text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-sm">Launch updates</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Shield className="h-5 w-5 text-[#C0DC2D]" />
            <span className="text-sm">Secure signup</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Star className="h-5 w-5 text-[#C0DC2D]" />
            <span className="text-sm">Early adopter perks</span>
          </div>
        </div>
        
        {/* Additional Trust Elements */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            ✓ No spam, ever ✓ Unsubscribe anytime ✓
          </p>
          <p className="text-gray-500 text-xs">
            Join the revolution in customer service automation for Kenyan businesses
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;