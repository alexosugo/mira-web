import { useState } from 'react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { scrollToSection } from '../utils/scrollToSection';
import HeroChatDemo from './HeroChatDemo';

const HERO_HEADLINE = 'Your inbox has one job: to sell';
const HERO_CTA_LABEL = 'Start free';
const HERO_TRUST_LINE = 'Sellogram replies from your posts and shop details. Tricky questions come to you.';
const HERO_SUBHEAD =
  'Sellogram answers product questions, takes orders and keeps customers updated in your shop’s Instagram DMs.';
const APP_URL = 'https://app.sellogram.co';

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
    <section ref={sectionRef} className="overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1
              className="max-w-[12ch] animate-fade-in-up font-display text-[clamp(2.75rem,1.8rem+4.2vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-ink [text-wrap:balance]"
              style={{ animationDelay: '80ms' }}
            >
              {HERO_HEADLINE}
            </h1>

          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p
              className="max-w-lg animate-fade-in-up text-lg leading-relaxed text-ink-light sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              {HERO_SUBHEAD}
            </p>

            <div
              className="mt-9 flex animate-fade-in-up flex-wrap items-center gap-6"
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
                className={`inline-flex min-h-[50px] items-center rounded-full bg-fern px-8 text-base font-medium text-ink transition-colors duration-200 hover:bg-fern-deep hover:text-paper ${
                  isRedirecting ? 'pointer-events-none opacity-80' : ''
                }`}
              >
                {isRedirecting ? 'Opening Sellogram...' : HERO_CTA_LABEL}
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('dm-sales-journey')}
                className="inline-flex min-h-[44px] items-center text-base text-ink-light underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
              >
                See a sale happen
              </button>
            </div>

            <p className="mt-5 max-w-lg animate-fade-in-up text-sm leading-relaxed text-ink-light" style={{ animationDelay: '300ms' }}>
              {HERO_TRUST_LINE}
            </p>

          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-8 max-w-[1240px] animate-fade-in-up px-3 sm:mt-10 sm:px-5 lg:px-8"
        style={{ animationDelay: '260ms' }}
      >
        <HeroChatDemo />
      </div>
    </section>
  );
};

export default Hero;
