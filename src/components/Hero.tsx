import React, { useEffect, useState } from 'react';
import { MessageCircle, Instagram, Zap, Bot, ArrowRight } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white pt-16 pb-20 relative overflow-hidden" style={{ fontFamily: "Funnel Sans" }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-[#C0DC2D]/5 animate-gradient"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Enhanced floating avatars with better animations */}
        <div className="relative">
          <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center transform rotate-12 hidden lg:block animate-float hover-scale">
          </div>
          <div className="absolute top-16 right-12 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center transform -rotate-12 hidden lg:block animate-float-delayed hover-scale">
          </div>
          <div className="absolute bottom-20 left-16 w-10 h-10 rounded-full bg-gradient-to-br from-[#13243E] to-blue-600 flex items-center justify-center transform rotate-45 hidden lg:block animate-float-slow hover-scale">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="absolute bottom-32 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#C0DC2D] to-green-600 flex items-center justify-center transform -rotate-45 hidden lg:block animate-float-reverse hover-scale">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          {/* Animated headline with staggered entrance */}
          <h1 
            className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 tracking-tight ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ fontFamily: "Funnel Display" }}
          >
            Turn every<br />
            <span className="text-[#C0DC2D] relative">
              visitor
              <div className="absolute -inset-1 bg-[#C0DC2D]/20 rounded-lg blur-sm animate-pulse-glow"></div>
            </span> into a{' '}
            <span className="text-[#C0DC2D] relative">
              customer
              <div className="absolute -inset-1 bg-[#C0DC2D]/20 rounded-lg blur-sm animate-pulse-glow"></div>
            </span>
          </h1>
          
          {/* Animated description */}
          <p 
            className={`text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto ${
              isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'
            }`}
          >
            AI agents that know your products, understand your customers, deliver personalized shopping experiences, and close sales 24/7 – so you can focus on growing your business
          </p>
          
          {/* Enhanced CTA button with shimmer effect */}
          <div 
            className={`flex justify-center ${
              isVisible ? 'animate-fade-in-up animate-delay-400' : 'opacity-0'
            }`}
          >
            <button 
              onClick={scrollToContactForm}
              className="bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 btn-shimmer hover-glow group"
            >
              Get Early Access
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;