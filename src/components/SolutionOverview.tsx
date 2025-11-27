import React, { useEffect, useState } from 'react';
import { Bot, Zap, Globe, Sparkles } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const SolutionOverview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useSectionTracking('solution', 'Solution Overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    const section = document.getElementById('solution-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Bot, label: 'AI-Powered' },
    { icon: Globe, label: 'Multi-Language' },
    { icon: Zap, label: 'Instant Setup' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="solution-section"
      className="py-24 lg:py-32 bg-warm-50 dark:bg-navy-900"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800/5 dark:bg-lime-500/10 rounded-full text-navy-700 dark:text-lime-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The Solution
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            Meet Mira: Your Intelligent<br className="hidden lg:block" /> Customer Experience Partner
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Automate routine tasks, engage customers across channels, and grow your business with ease.
          </p>
        </div>
        
        {/* Main card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative">
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 via-navy-500 to-lime-500 rounded-[28px] opacity-20 blur-sm animate-gradient-border" 
                 style={{ backgroundSize: '200% 200%' }} />
            
            {/* Card content */}
            <div className="relative bg-gradient-to-br from-navy-800 to-navy-900 p-10 lg:p-14 rounded-3xl shadow-2xl overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-500/5 rounded-full blur-3xl" />
              
              {/* Feature badges */}
              <div className="relative flex flex-wrap justify-center gap-4 mb-10">
                {features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2.5 px-5 py-2.5 
                               bg-lime-500/10 border border-lime-500/20 rounded-full
                               hover:bg-lime-500/15 hover:border-lime-500/30 
                               transition-all duration-300 cursor-default"
                  >
                    <feature.icon className="h-4 w-4 text-lime-400" />
                    <span className="text-sm font-semibold text-lime-400">{feature.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Description */}
              <p className="relative text-lg lg:text-xl text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                Mira learns your business and answers customers instantly on WhatsApp, Instagram, and more—in English or Swahili. When customers need you personally, Mira hands the conversation over to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;