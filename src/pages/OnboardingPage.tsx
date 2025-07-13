import React, { useState } from 'react';
import { ArrowRight, Instagram, Globe, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  const [instagramHandle, setInstagramHandle] = useState('');
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [facebookPage, setFacebookPage] = useState('');
  const [whatsappBusiness, setWhatsappBusiness] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const navigate = useNavigate();

  const platformOptions = [
    { id: 'website', label: 'Website URL', icon: Globe },
    { id: 'facebook', label: 'Facebook Page', icon: Globe },
    { id: 'whatsapp', label: 'WhatsApp Business', icon: Globe }
  ];

  const validateInstagramHandle = (handle: string): boolean => {
    // Remove @ if user includes it
    const cleanHandle = handle.replace('@', '');
    
    // Instagram username validation
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    return instagramRegex.test(cleanHandle) && cleanHandle.length >= 1;
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInstagramHandle(value);
    
    // Clear previous errors
    if (errors.instagram) {
      setErrors(prev => ({ ...prev, instagram: '' }));
    }

    // Real-time validation
    if (value && !validateInstagramHandle(value)) {
      //setErrors(prev => ({ ...prev, instagram: 'Please enter a valid Instagram handle' }));
      setErrors(prev => ({ ...prev }));
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setAdditionalPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = async () => {
    // Reset errors
    setErrors({});

    // Validate Instagram handle
    if (!instagramHandle.trim()) {
      setErrors(prev => ({ ...prev, instagram: 'Instagram handle is required' }));
      return;
    }

    if (!validateInstagramHandle(instagramHandle)) {
      setErrors(prev => ({ ...prev, instagram: 'Please enter a valid Instagram handle' }));
      return;
    }

    // Validate additional platforms if selected
    const newErrors: Record<string, string> = {};

    if (additionalPlatforms.includes('website') && !websiteUrl.trim()) {
      newErrors.website = 'Website URL is required';
    }

    if (additionalPlatforms.includes('facebook') && !facebookPage.trim()) {
      newErrors.facebook = 'Facebook page is required';
    }

    if (additionalPlatforms.includes('whatsapp') && !whatsappBusiness.trim()) {
      newErrors.whatsapp = 'WhatsApp Business number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate validation
    setIsValidating(true);
    
    try {
      // Simulate API call to validate Instagram account
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to scanning step with data
      const onboardingData = {
        instagram: instagramHandle.replace('@', ''),
        additionalPlatforms: additionalPlatforms.reduce((acc, platform) => {
          if (platform === 'website') acc.website = websiteUrl;
          if (platform === 'facebook') acc.facebook = facebookPage;
          if (platform === 'whatsapp') acc.whatsapp = whatsappBusiness;
          return acc;
        }, {} as Record<string, string>)
      };

      // Store in localStorage for next step
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      
      // Navigate to scanning step
      navigate('/onboarding/scanning');
    } catch (error) {
      setErrors({ instagram: 'Unable to verify Instagram account. Please try again.' });
    } finally {
      setIsValidating(false);
    }
  };

  const isFormValid = instagramHandle.trim() && 
                    validateInstagramHandle(instagramHandle) && 
                    Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" style={{ fontFamily: "Funnel Sans" }}>
      {/* Progress Bar */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link 
              to="/"
              className="text-sm text-gray-600 hover:text-[#C0DC2D] transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-sm text-gray-600 font-medium">Step 1 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#C0DC2D] h-2 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            Let's build your AI assistant in{' '}
            <span className="text-[#C0DC2D]" style={{ fontFamily: "Funnel Sans" }}>60 seconds</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We'll scan your social media to understand your business and create a smart assistant 
            that talks to customers like you do.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            {/* Main Instagram Input */}
            <div className="mb-8">
              <label htmlFor="instagram" className="block text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
                What's your Instagram handle?
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Instagram className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="instagram"
                  value={instagramHandle}
                  onChange={handleInstagramChange}
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.instagram 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-[#C0DC2D]'
                  }`}
                  placeholder="@yourbusiness"
                  disabled={isValidating}
                />
              </div>
              {errors.instagram && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{errors.instagram}</span>
                </div>
              )}
            </div>

            {/* Additional Platforms */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
                Any other platforms? <span className="text-gray-500 font-normal">(Optional - you can add these later)</span>
              </label>
              
              <div className="space-y-3 mb-4">
                {platformOptions.map((platform) => (
                  <div key={platform.id} className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalPlatforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                        className="w-5 h-5 text-[#C0DC2D] border-2 border-gray-300 rounded focus:ring-[#C0DC2D] focus:ring-2"
                      />
                      <platform.icon className="h-5 w-5 text-gray-400 group-hover:text-[#C0DC2D] transition-colors" />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {platform.label}
                      </span>
                    </label>
                    
                    {/* Input field directly beneath each platform option */}
                    {additionalPlatforms.includes(platform.id) && (
                      <div className="ml-8">
                        {platform.id === 'website' && (
                          <input
                            type="url"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                              errors.website 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:border-[#C0DC2D]'
                            }`}
                            placeholder="https://yourwebsite.com"
                          />
                        )}
                        
                        {platform.id === 'facebook' && (
                          <input
                            type="text"
                            value={facebookPage}
                            onChange={(e) => setFacebookPage(e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                              errors.facebook 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:border-[#C0DC2D]'
                            }`}
                            placeholder="Your Facebook Page URL"
                          />
                        )}
                        
                        {platform.id === 'whatsapp' && (
                          <input
                            type="tel"
                            value={whatsappBusiness}
                            onChange={(e) => setWhatsappBusiness(e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                              errors.whatsapp 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:border-[#C0DC2D]'
                            }`}
                            placeholder="+254 700 123 456"
                          />
                        )}
                        
                        {errors[platform.id] && (
                          <p className="text-red-600 text-sm mt-1">{errors[platform.id]}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start gap-3 mb-8 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-[#C0DC2D] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                We only read public information to understand your products and brand voice. 
                We never post to your accounts or access private data.
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!isFormValid || isValidating}
              className="w-full bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#13243E]/30 border-t-[#13243E] rounded-full animate-spin"></div>
                  Validating Account...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-[#C0DC2D]" />
                <span>Secure scanning</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-[#C0DC2D]" />
                <span>No posting access</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-[#C0DC2D]" />
                <span>Public data only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;