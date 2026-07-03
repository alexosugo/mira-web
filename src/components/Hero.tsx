import { useState } from 'react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { scrollToSection } from '../utils/scrollToSection';
import HeroChatDemo from './HeroChatDemo';

const HERO_HEADLINE = 'Mira answers customers and helps them order in your Instagram DMs';
const HERO_CTA_LABEL = 'Get started';
const HERO_SUBHEAD =
  'Mira learns about your products from the posts already on your shop. It answers common questions, helps customers choose, and asks you when it cannot confirm something.';
const APP_URL = 'https://app.withmira.co';

const Hero = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');

  const handleCTAClick = () => {
    setIsRedirecting(true);
    trackCTA('hero_cta_button', HERO_CTA_LABEL, 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: HERO_HEADLINE,
    });
  };

  return (
    <section ref={sectionRef} className="pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <h1
              className="font-display text-[clamp(2.25rem,1.3rem+4.2vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink [text-wrap:balance] animate-fade-in-up"
              style={{ animationDelay: '80ms' }}
            >
              {HERO_HEADLINE}
            </h1>

            <p
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-light animate-fade-in-up"
              style={{ animationDelay: '160ms' }}
            >
              {HERO_SUBHEAD}
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
                {isRedirecting ? 'Opening Mira...' : HERO_CTA_LABEL}
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
              For Professional Instagram accounts&ensp;·&ensp;Start free in Kenya&ensp;·&ensp;No card needed
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
