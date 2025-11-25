import React, { useEffect, useState } from 'react';
import { MessageCircle, Zap, ArrowRight, MessageSquare, Globe } from 'lucide-react';
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
    trackCTA('hero_cta_button', 'Get Early Access', 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: 'AI Customer Service That Drives Real Results'
    });
    scrollToContactForm();
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-white via-[#f9fafb] to-[#f3f4f6] pt-20 pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden" style={{ fontFamily: "Funnel Sans" }}>
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Animated headline */}
            <div className={`space-y-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-block">
                <span className="inline-block px-4 py-1.5 bg-lime-400/10 border border-lime-400/20 text-[#C0DC2D] text-sm font-semibold rounded-full mb-4">
                  AI-Powered Solutions for Kenya
                </span>
              </div>
              <h1 
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: "Funnel Display", fontWeight: 800 }}
              >
                AI Customer Service That Drives{' '}
                <span className="relative">
                  Real Results
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#C0DC2D]/30 to-[#C0DC2D]/0 rounded-lg blur-sm"></div>
                </span>
              </h1>
            </div>
            
            {/* Animated description */}
            <p 
              className={`text-lg text-gray-600 leading-relaxed max-w-xl ${
                isVisible ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'
              }`}
            >
              Mira automates customer service across WhatsApp, Instagram, and Facebook 24/7. Save costs, boost sales, and give your customers the instant support they deserve.
            </p>
            
            {/* Features list */}
            <div className={`space-y-3 ${isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
              {[
                { icon: MessageSquare, text: 'Multi-channel support' },
                { icon: Globe, text: 'Swahili & English ready' },
                { icon: Zap, text: '24/7 instant responses' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-400/20 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-[#C0DC2D]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div 
              className={`flex items-center gap-4 pt-2 ${
                isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
              }`}
            >
              <button 
                onClick={handleCTAClick}
                className="btn-premium bg-[#C0DC2D] text-[#13243E] px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-[#C0DC2D]/90 shadow-lg flex items-center justify-center gap-2 group"
                data-hotjar-trigger="cta_click"
                data-button-id="hero_cta_button"
                data-button-text="Get Early Access"
                data-page-section="hero"
              >
                Get Early Access
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-sm text-gray-500">Launching soon</span>
            </div>
          </div>

          {/* Right: Visual mockup */}
          <div className={`hidden lg:block relative h-96 ${isVisible ? 'animate-fade-in-right animate-delay-200' : 'opacity-0'}`}>
            {/* Phone mockup frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-96 bg-black rounded-3xl shadow-2xl p-3 transform hover:scale-105 transition-transform duration-300">
                {/* Phone screen */}
                <div className="w-full h-full bg-gradient-to-b from-[#f9fafb] to-white rounded-2xl overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="bg-[#13243E] text-white px-4 py-2 text-xs flex justify-between items-center">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <Zap className="w-3 h-3" />
                    </div>
                  </div>
                  
                  {/* Chat header */}
                  <div className="bg-[#13243E] text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C0DC2D] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#13243E]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Mira AI</p>
                      <p className="text-xs text-gray-300">Online</p>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-white">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-2xl text-xs max-w-xs rounded-tl-none">
                        Hi! Do you have airtime?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#C0DC2D] text-[#13243E] px-3 py-2 rounded-2xl text-xs max-w-xs rounded-tr-none font-medium">
                        Yes! We have all networks. Which would you like?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-2xl text-xs max-w-xs rounded-tl-none">
                        Safaricom 1000 KES
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#C0DC2D] text-[#13243E] px-3 py-2 rounded-2xl text-xs max-w-xs rounded-tr-none font-medium">
                        Perfect! That's 1000 KES. Pay via M-Pesa?
                      </div>
                    </div>
                  </div>
                  
                  {/* Input area */}
                  <div className="bg-white border-t border-gray-200 px-3 py-2 flex gap-2">
                    <input type="text" placeholder="Type here..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs outline-none" disabled />
                    <button className="w-8 h-8 rounded-full bg-[#C0DC2D] flex items-center justify-center text-[#13243E] hover:bg-lime-500 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating accent circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#C0DC2D] rounded-full opacity-10 blur-2xl animate-float"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-2xl animate-float-delayed"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;