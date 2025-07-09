import React from 'react';
import { ArrowRight, Bot, Zap, Globe } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const SolutionOverview = () => {
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('solution', 'Solution Overview');

  const handleCTAClick = () => {
    trackCTA('solution_cta_button', 'Get Early Access', 'solution', {
      button_location: 'solution_section',
      button_type: 'primary',
      section_headline: 'Meet Mira: Your Intelligent Customer Experience Partner'
    });
    scrollToContactForm();
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            Meet Mira: Your Intelligent Customer Experience Partner
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Automate routine tasks, engage customers across channels, and grow your business with ease.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#13243E] p-8 lg:p-12 rounded-3xl shadow-lg">
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-[#C0DC2D]/20 px-4 py-2 rounded-full">
                <Bot className="h-4 w-4 text-[#C0DC2D]" />
                <span className="text-sm font-medium text-[#C0DC2D]">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 bg-[#C0DC2D]/20 px-4 py-2 rounded-full">
                <Globe className="h-4 w-4 text-[#C0DC2D]" />
                <span className="text-sm font-medium text-[#C0DC2D]">Multi-Language</span>
              </div>
              <div className="flex items-center gap-2 bg-[#C0DC2D]/20 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-[#C0DC2D]" />
                <span className="text-sm font-medium text-[#C0DC2D]">Instant Setup</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed text-center">
             Mira learns your business and answers customers instantly on WhatsApp, Instagram, and more—in English or Swahili. When customers need you personally, Mira hands the conversation over to you.
            </p>
            
            <div className="text-center">
              <button 
                onClick={handleCTAClick}
                className="bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 btn-shimmer hover-glow group"
                data-hotjar-trigger="cta_click"
                data-button-id="solution_cta_button"
                data-button-text="Get Early Access"
                data-page-section="solution"
              >
                Get Early Access
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;