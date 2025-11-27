import React, { useEffect, useState } from 'react';
import { MessageCircle, Zap, ArrowRight, MessageSquare, Globe, Sparkles } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    trackCTA('hero_cta_button', 'Join the Waitlist', 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: 'AI Customer Service That Drives Real Results'
    });
    scrollToContactForm();
  };

  const features = [
    { icon: MessageSquare, text: 'Multi-channel support' },
    { icon: Globe, text: 'Swahili & English ready' },
    { icon: Zap, text: '24/7 instant responses' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-warm-50 via-white to-gray-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden"
    >
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-lime-500/8 to-transparent rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-navy-500/5 to-transparent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-lime-400/5 to-transparent rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 
                             bg-gradient-to-r from-lime-500/10 to-lime-500/5 
                             border border-lime-500/20 rounded-full
                             text-lime-600 text-sm font-semibold
                             shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                AI-Powered Solutions for Kenya
              </span>
            </div>

            {/* Headline */}
            <div className={`space-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-navy-800 dark:text-white tracking-tight leading-[0.95]">
                AI Customer Service That Drives{' '}
                <span className="relative inline-block">
                  <span className="gradient-text">Real Results</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  </svg>
                </span>
              </h1>
            </div>
            
            {/* Description */}
            <p 
              className={`text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl font-body ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              Mira automates customer service across WhatsApp, Instagram, and Facebook 24/7. Save costs, boost sales, and give your customers the instant support they deserve.
            </p>
            
            {/* Features list */}
            <div className={`flex flex-wrap gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 px-4 py-2.5 
                             bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-100 dark:border-navy-700
                             hover:shadow-md hover:border-lime-200 dark:hover:border-lime-500/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500/20 to-lime-500/10 
                                  flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-lime-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div 
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <button 
                onClick={handleCTAClick}
                className="btn-premium group bg-lime-500 text-navy-800 px-8 py-4 rounded-2xl 
                           text-base font-bold shadow-lg shadow-lime-500/20
                           flex items-center justify-center gap-2.5"
                data-hotjar-trigger="cta_click"
                data-button-id="hero_cta_button"
                data-button-text="Join the Waitlist"
                data-page-section="hero"
              >
                Join the Waitlist
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                <span>Launching soon</span>
              </div>
            </div>

            {/* Mobile Chat Preview - Shows only on mobile */}
            <div className={`lg:hidden mt-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
              <div className="glass-card dark:bg-navy-800/50 dark:border-navy-700 rounded-2xl p-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-400 
                                  flex items-center justify-center shadow-md">
                    <MessageCircle className="w-5 h-5 text-navy-800" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Mira AI</p>
                    <p className="text-xs text-lime-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                      Always online
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-100 dark:bg-navy-700 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-gray-700 dark:text-gray-300 max-w-[85%]">
                    Do you have airtime?
                  </div>
                  <div className="bg-lime-500 rounded-xl rounded-tr-sm px-3 py-2 text-sm text-navy-800 font-medium max-w-[85%] ml-auto">
                    Yes! All networks available 24/7 ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup - Desktop only */}
          <div className={`hidden lg:flex justify-center items-center relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            {/* Phone container with shadow */}
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute -inset-8 bg-gradient-to-br from-lime-500/20 via-transparent to-navy-500/10 rounded-[60px] blur-2xl opacity-60" />
              
              {/* Phone frame */}
              <div className="relative w-80 bg-navy-900 rounded-[3rem] p-3 shadow-2xl shadow-navy-900/30 animate-float-gentle">
                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-navy-900 rounded-b-2xl z-20" />
                
                {/* Phone screen */}
                <div className="w-full aspect-[9/19] bg-white rounded-[2.2rem] overflow-hidden flex flex-col">
                  {/* WhatsApp-style header */}
                  <div className="bg-navy-800 dark:bg-navy-900 text-white px-5 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 
                                    flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-5 h-5 text-navy-800" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Mira AI</p>
                      <p className="text-xs text-lime-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                        Online
                      </p>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div className="flex-1 overflow-hidden px-4 py-5 space-y-3 bg-gradient-to-b from-gray-50 to-white">
                    {/* Customer message */}
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-md 
                                      text-sm max-w-[80%] shadow-sm border border-gray-100">
                        Hi! Do you have airtime?
                      </div>
                    </div>
                    
                    {/* Mira response */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-lime-500 to-lime-400 text-navy-800 
                                      px-4 py-2.5 rounded-2xl rounded-tr-md text-sm max-w-[80%] 
                                      font-medium shadow-sm">
                        Yes! We have all networks. Which would you like?
                      </div>
                    </div>
                    
                    {/* Customer message */}
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-md 
                                      text-sm max-w-[80%] shadow-sm border border-gray-100">
                        <span className="font-mono">Safaricom 1000 KES</span>
                      </div>
                    </div>
                    
                    {/* Mira response */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-lime-500 to-lime-400 text-navy-800 
                                      px-4 py-2.5 rounded-2xl rounded-tr-md text-sm max-w-[80%] 
                                      font-medium shadow-sm">
                        Perfect! That's <span className="font-mono">1000 KES</span>. Pay via M-Pesa?
                      </div>
                    </div>
                  </div>
                  
                  {/* Input area */}
                  <div className="bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none
                                 focus:bg-gray-50 focus:ring-2 focus:ring-lime-500/20 transition-all" 
                      disabled 
                    />
                    <button className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center 
                                       text-navy-800 shadow-md hover:bg-lime-400 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;