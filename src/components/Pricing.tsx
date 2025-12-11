import React, { useEffect, useState } from 'react';
import { Check, Star, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('pricing', 'Pricing Section');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const section = document.getElementById('pricing');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    trackCTA('pricing_cta_button', 'Claim Early Bird Pricing', 'pricing', {
      button_location: 'pricing_section',
      button_type: 'primary',
      section_headline: 'Affordable Automation That Pays for Itself'
    });
    scrollToContactForm();
  };

  return (
    <section id="pricing" ref={sectionRef} className="pt-12 pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-warm-50 to-white dark:from-navy-900 dark:to-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-navy-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Urgency CTA Section */}
        <div className={`relative transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Animated border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 via-navy-600 to-lime-500 rounded-[28px] opacity-30 blur-sm animate-gradient-border"
               style={{ backgroundSize: '200% 200%' }} />
          
          <div className="relative bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 rounded-3xl p-10 lg:p-14 text-center text-white shadow-2xl overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-500/5 rounded-full blur-3xl" />
            
            <div className="relative max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-lime-500/15 border border-lime-500/30 text-lime-400 
                             px-5 py-2.5 rounded-full text-sm font-semibold mb-8">
                <Star className="h-4 w-4" />
                Exclusive Launch Offer
              </div>
              
              <h3 className="font-display text-3xl lg:text-5xl font-bold mb-6 tracking-tight">
                Lock in Early Bird Pricing
              </h3>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Sign up now and secure the early bird pricing for lifetime use. 
                Always pay <span className="font-semibold text-lime-400">KES 1,500 per month</span>.
              </p>
              
              <button 
                onClick={handleCTAClick}
                className="btn-premium group bg-lime-500 text-navy-800 px-10 py-5 rounded-2xl text-lg font-bold 
                           shadow-lg shadow-lime-500/30 inline-flex items-center gap-3"
                data-hotjar-trigger="cta_click"
                data-button-id="pricing_cta_button"
                data-button-text="Claim Early Bird Pricing"
                data-page-section="pricing"
              >
                Claim Early Bird Pricing
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;