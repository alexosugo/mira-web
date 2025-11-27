import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Clock, Shield, CheckCircle, AlertCircle, User, Mail, Globe, Instagram, Check } from 'lucide-react';
import { submitToWaitlist, type WaitlistFormData } from '../services/waitlistService';
import { useFormTracking, useSectionTracking } from '../hooks/useTracking';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  website?: string;
  instagram?: string;
}

const STEPS = [
  { id: 1, label: 'Name', fields: ['firstName', 'lastName'] },
  { id: 2, label: 'Contact', fields: ['email'] },
  { id: 3, label: 'Business', fields: ['website', 'instagram'] },
];

const FinalCTA = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
        // eslint-disable-next-line no-case-declarations
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlPattern.test(value.trim())) return 'Please enter a valid website URL';
        break;
      case 'instagram':
        if (value.trim() && value.trim().length > 255) return 'Instagram URL is too long';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    trackFieldInteraction(name, name, 'change', value);
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    trackFieldInteraction(fieldName, fieldName, 'focus');
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    trackFieldInteraction(fieldName, fieldName, 'blur', value);
    const error = validateField(fieldName, value);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentFields = STEPS[currentStep].fields;
    const newErrors: FormErrors = {};
    let isValid = true;

    currentFields.forEach(field => {
      const error = validateField(field, formData[field as keyof WaitlistFormData]);
      if (error && field !== 'instagram') {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    trackSubmission('waitlist_form', 'Waitlist Form', formData, 'attempt');
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitToWaitlist(formData);
      if (result.success) {
        trackSubmission('waitlist_form', 'Waitlist Form', formData, 'success');
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setFormData({ firstName: '', lastName: '', email: '', website: '', instagram: '' });
      } else {
        trackSubmission('waitlist_form', 'Waitlist Form', formData, 'error');
        setSubmitStatus('error');
        setSubmitMessage(result.message);
        if (result.error === 'Email already exists') {
          setErrors({ email: 'This email is already registered' });
          setCurrentStep(1);
        }
      }
    } catch (error) {
      trackSubmission('waitlist_form', 'Waitlist Form', formData, 'error');
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-lime-500/5 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="w-20 h-20 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <CheckCircle className="h-10 w-10 text-lime-400" />
          </div>
          
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            You're All Set!
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {submitMessage}
          </p>
          
          <div className="glass-card-dark rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-gray-200 mb-6 font-medium">What happens next:</p>
            <div className="space-y-4 text-left">
              {[
                'Confirmation email sent to your inbox',
                'Exclusive launch updates and early bird pricing',
                'Priority access when Mira launches'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-500/20">
                    <span className="text-navy-800 text-sm font-bold font-mono">{idx + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => { setSubmitStatus('idle'); setCurrentStep(0); }}
            className="mt-10 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Submit another response
          </button>
        </div>
      </section>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name <span className="text-lime-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text" id="firstName" name="firstName"
                    value={formData.firstName} onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('firstName')}
                    onBlur={() => handleFieldBlur('firstName', formData.firstName)}
                    maxLength={50}
                    className={`glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 ${
                      errors.firstName ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="text-red-400 text-sm mt-1.5">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name <span className="text-lime-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text" id="lastName" name="lastName"
                    value={formData.lastName} onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('lastName')}
                    onBlur={() => handleFieldBlur('lastName', formData.lastName)}
                    maxLength={50}
                    className={`glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 ${
                      errors.lastName ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="text-red-400 text-sm mt-1.5">{errors.lastName}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-lime-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('email')}
                  onBlur={() => handleFieldBlur('email', formData.email)}
                  maxLength={255}
                  className={`glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="john@company.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                Website URL <span className="text-lime-400">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="url" id="website" name="website"
                  value={formData.website} onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('website')}
                  onBlur={() => handleFieldBlur('website', formData.website)}
                  maxLength={255}
                  className={`glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 ${
                    errors.website ? 'border-red-500/50 focus:border-red-500' : ''
                  }`}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              {errors.website && <p className="text-red-400 text-sm mt-1.5">{errors.website}</p>}
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-2">
                Instagram <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="url" id="instagram" name="instagram"
                  value={formData.instagram} onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('instagram')}
                  onBlur={() => handleFieldBlur('instagram', formData.instagram)}
                  maxLength={255}
                  className="glass-input w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500"
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact-form" ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-lime-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-lime-500/15 border border-lime-500/30 text-lime-400 
                       px-5 py-2.5 rounded-full text-sm font-semibold mb-8 animate-badge-pulse">
          <Clock className="h-4 w-4" />
          Limited Time: Early Bird Pricing Available
        </div>
        
        {/* Headline */}
        <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
          Don't Miss Out on<br />
          <span className="gradient-text">Mira's Launch</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          Be Among the First Kenyan Businesses to Transform Your Customer Support
        </p>
        
        {/* Form Card */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-lime-500/20 via-transparent to-lime-500/20 rounded-3xl blur-sm" />
          
          <div className="relative glass-card-dark rounded-2xl p-8 lg:p-10">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-10">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-400 ${
                    idx < currentStep 
                      ? 'bg-lime-500/20 border-2 border-lime-500 text-lime-400' 
                      : idx === currentStep 
                        ? 'bg-lime-500 border-2 border-lime-500 text-navy-800 shadow-glow' 
                        : 'bg-white/5 border-2 border-white/20 text-white/50'
                  }`}>
                    {idx < currentStep ? <Check className="w-5 h-5" /> : <span className="font-mono">{idx + 1}</span>}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="w-16 h-0.5 mx-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${
                        idx < currentStep ? 'bg-lime-500' : 'bg-white/10'
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step label */}
            <p className="text-lime-400 text-sm font-medium mb-6">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
            </p>

            {submitStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {renderStepContent()}

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-4 rounded-xl font-semibold text-white bg-white/5 border border-white/10
                               hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                )}
                
                {currentStep < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 btn-premium bg-lime-500 text-navy-800 px-6 py-4 rounded-xl font-bold
                               shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-premium bg-lime-500 text-navy-800 px-6 py-4 rounded-xl font-bold
                               shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy-800/30 border-t-navy-800 rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                {['Early bird pricing', 'Priority access', '14-day free trial', 'Launch updates'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-lime-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-navy-800" />
                    </div>
                    <span className="text-gray-400 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Shield className="h-4 w-4 text-lime-500" />
            Secure signup
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Check className="h-4 w-4 text-lime-500" />
            No spam, ever
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
