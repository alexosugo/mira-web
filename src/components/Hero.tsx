import { useState } from 'react';
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
    <section ref={sectionRef} className="pt-28 sm:pt-36 lg:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered copy */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="kicker rounded-full border border-line bg-white px-4 py-2 text-slate-light animate-fade-in-up">
            For Instagram sellers in Kenya
          </p>

          <h1
            className="mt-8 font-display text-[clamp(2.5rem,1.4rem+4.6vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-slate [text-wrap:balance] animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            Mira answers your DMs and <span className="text-fern">sells</span> in them
          </h1>

          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-light animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            {HERO_SUB_COPY[heroSub]}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
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
              className={`inline-flex min-h-[52px] items-center rounded-full bg-fern px-8 text-base font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-fern-deep ${
                isRedirecting ? 'pointer-events-none opacity-80' : ''
              }`}
            >
              {isRedirecting ? 'Opening Mira...' : HERO_CTA_COPY[heroCta]}
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex min-h-[52px] items-center rounded-full border border-line bg-white px-7 text-base font-medium text-slate transition-colors duration-200 hover:border-slate-faint"
            >
              See how it works
            </button>
          </div>

          {/* Quiet trust strip */}
          <p
            className="mt-8 font-mono text-xs text-slate-faint animate-fade-in-up sm:text-sm"
            style={{ animationDelay: '320ms' }}
          >
            Free to start&ensp;·&ensp;No card needed&ensp;·&ensp;M-Pesa at checkout
          </p>
        </div>

        {/* Proof: the DM doing the selling, staged on the dawn sky */}
        <div
          className="mt-14 animate-fade-in-up sm:mt-20"
          style={{ animationDelay: '300ms' }}
        >
          <div className="bg-dawn-sky flex justify-center rounded-3xl px-4 py-10 sm:py-14">
            <HeroChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
