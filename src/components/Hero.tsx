import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { useHeroCtaExperiment, useHeroSubExperiment, HERO_CTA_COPY, HERO_SUB_COPY } from '../hooks/useExperiments';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');
  const heroCta = useHeroCtaExperiment();
  const heroSub = useHeroSubExperiment();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    trackCTA('hero_cta_button', HERO_CTA_COPY[heroCta], 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: 'Let Customers Shop Without Waiting On You',
      experiment_variant: heroCta,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-warm-50 via-white to-gray-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-32 pb-24 overflow-hidden"
    >
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-lime-500/5 to-transparent rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-navy-500/3 to-transparent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-lime-400/3 to-transparent rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Content */}
          <div className="space-y-8 text-center">
            {/* Badge */}
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2
                             bg-gradient-to-r from-lime-500/10 to-lime-500/5
                             border border-lime-500/20 rounded-full
                             text-lime-600 text-sm font-semibold
                             shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Designed for Instagram sellers
              </span>
            </div>

            {/* Headline */}
            <div className={`space-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-navy-800 dark:text-white tracking-tight leading-[1.1]">
                Let Customers <span className="relative inline-block">
                  <span className="gradient-text">Shop</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  </svg>
                </span> Without Waiting On{' '}
                <span className="relative inline-block">
                  <span className="gradient-text">You</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className={`text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto font-body ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              {HERO_SUB_COPY[heroSub]}
            </p>

            {/* CTA */}
            <div
              className={`flex items-center justify-center pt-4 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <a
                href="https://app.withmira.co"
                onClick={(e) => {
                  e.preventDefault();
                  handleCTAClick();
                  window.location.href = 'https://app.withmira.co';
                }}
                className="btn-premium group bg-lime-500 text-navy-800 px-8 py-4 rounded-2xl
                           text-base font-bold shadow-lg shadow-lime-500/20
                           flex items-center justify-center gap-2.5"
              >
                {HERO_CTA_COPY[heroCta]}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
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
