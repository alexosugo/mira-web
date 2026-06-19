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
    <section ref={sectionRef} className="pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="kicker text-ink-light animate-fade-in-up">
              For Instagram sellers
            </p>

            <h1
              className="mt-6 font-display text-[clamp(2.5rem,1.4rem+4.6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-ink [text-wrap:balance] animate-fade-in-up"
              style={{ animationDelay: '80ms' }}
            >
              Mira answers your DMs and sells in them
            </h1>

            <p
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-light animate-fade-in-up"
              style={{ animationDelay: '160ms' }}
            >
              {HERO_SUB_COPY[heroSub]}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up"
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
                className={`inline-flex min-h-[48px] items-center rounded-full bg-fern px-7 text-base font-medium text-paper transition-colors duration-200 hover:bg-fern-deep ${
                  isRedirecting ? 'pointer-events-none opacity-80' : ''
                }`}
              >
                {isRedirecting ? 'Opening Mira...' : HERO_CTA_COPY[heroCta]}
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="text-base text-ink-light underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
              >
                See how it works
              </button>
            </div>

            {/* Quiet trust strip */}
            <p
              className="mt-14 border-t border-line pt-5 font-mono text-xs text-ink-faint animate-fade-in-up sm:text-sm"
              style={{ animationDelay: '320ms' }}
            >
              Free to start&ensp;·&ensp;No card needed&ensp;·&ensp;M-Pesa at checkout
            </p>
          </div>

          {/* Proof: the DM doing the selling */}
          <div className="lg:col-span-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <HeroChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
