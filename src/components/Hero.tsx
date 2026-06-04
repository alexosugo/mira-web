import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { useHeroCtaExperiment, useHeroSubExperiment, HERO_CTA_COPY, HERO_SUB_COPY } from '../hooks/useExperiments';
import { scrollToSection } from '../utils/scrollToSection';
import HeroChatDemo from './HeroChatDemo';

const HERO_HEADLINE = 'Mira answers your DMs and sells in them';
const APP_URL = 'https://app.withmira.co';

const Hero = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');
  const heroCta = useHeroCtaExperiment();
  const heroSub = useHeroSubExperiment();

  const handleCTAClick = () => {
    setIsRedirecting(true);
    trackCTA('hero_cta_button', HERO_CTA_COPY[heroCta], 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: HERO_HEADLINE,
      experiment_variant: heroCta,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90svh] flex items-center bg-gradient-to-br from-warm-50 via-white to-gray-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Headline */}
            <div className="animate-fade-in-up">
              <h1 className="font-display text-[clamp(2rem,1.1rem+3.8vw,3.75rem)] font-bold text-navy-800 dark:text-white tracking-tight leading-[1.1] [text-wrap:balance]">
                Mira answers your DMs and{' '}
                <span className="relative inline-block">
                  sells
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                    <path d="M2 8C50 2 150 2 198 8" pathLength="1" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  </svg>
                </span>{' '}
                in them
              </h1>
            </div>

            {/* Description. The lead-in is static (not part of the HERO_SUB_COPY
                experiment) so the qualifier survives the cut eyebrow badge without
                touching live variant payloads. */}
            <p
              className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <span className="font-semibold text-navy-700 dark:text-navy-100">
                Built for Instagram sellers.
              </span>{' '}
              {HERO_SUB_COPY[heroSub]}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 lg:pt-4 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <a
                href={APP_URL}
                onClick={(e) => {
                  e.preventDefault();
                  if (isRedirecting) return;
                  handleCTAClick();
                  window.location.href = APP_URL;
                }}
                aria-busy={isRedirecting}
                className={`btn-premium group bg-lime-500 text-navy-800 px-8 py-4 rounded-2xl
                           text-base font-bold shadow-md
                           flex items-center justify-center gap-2.5
                           ${isRedirecting ? 'opacity-80 pointer-events-none' : ''}`}
              >
                {isRedirecting ? 'Opening Mira...' : HERO_CTA_COPY[heroCta]}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-3 sm:py-4 text-base font-semibold text-navy-700 dark:text-navy-100
                           rounded-2xl transition-colors duration-300
                           hover:text-navy-800 hover:bg-navy-800/5
                           dark:hover:text-white dark:hover:bg-white/5
                           focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:ring-offset-2"
              >
                See how Mira works
              </button>
            </div>
          </div>

          {/* Proof: the DM doing the selling */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <HeroChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
