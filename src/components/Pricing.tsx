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
    <section id="pricing" ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-warm-50 to-white dark:from-navy-900 dark:to-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-navy-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Early Bird Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-lime-400 text-navy-800 
                         px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-lg shadow-lime-500/20 animate-badge-pulse">
            <Clock className="h-4 w-4" />
            Early Bird Pricing - Limited Time Only
          </div>
          
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            Mira pays for itself<br />
            {/* <span className="gradient-text">Pays for Itself</span> */}
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Starting at just <span className="font-mono font-bold text-navy-800 dark:text-lime-400">KES 3,999/month</span> – 
            less than hiring one part-time employee, always available, unbelievably patient.
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { text: 'Instant 24/7 customer support', stat: '24/7' },
              { text: 'Handle 10x more inquiries', stat: '10x' },
              { text: 'No technical skills required', stat: null },
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-white dark:bg-navy-800 px-5 py-3 rounded-xl shadow-md border border-gray-100 dark:border-navy-700
                                       hover:shadow-lg hover:border-lime-200 dark:hover:border-lime-500/30 transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-lime-500/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-lime-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {benefit.stat ? (
                    <>
                      {benefit.text.split(benefit.stat)[0]}
                      <span className="font-mono font-semibold">{benefit.stat}</span>
                      {benefit.text.split(benefit.stat)[1]}
                    </>
                  ) : benefit.text}
                </span>
              </div>
            ))}
          </div>
          
          {/* Value Proposition Card */}
          {/* <div className={`relative max-w-4xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-500/30 via-navy-500/20 to-lime-500/30 rounded-3xl blur-sm" />
            <div className="relative bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 lg:p-10 shadow-2xl">
              <Sparkles className="w-8 h-8 text-lime-400 mx-auto mb-4" />
              <p className="text-white text-lg lg:text-xl leading-relaxed">
                <strong className="text-lime-400">Save <span className="font-mono">KES 15,000 - 50,000</span>/month</strong> vs hiring customer service staff. 
                Mira works around the clock, never takes sick days, and gets smarter every day.
              </p>
            </div>
          </div> */}
        </div>

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
                Always pay <span className="font-mono font-semibold text-lime-400">KES 1500 per month</span>.
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

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-lime-600" /> Start using Mira right away
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-lime-600" /> Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-lime-600" /> Use Mira 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;