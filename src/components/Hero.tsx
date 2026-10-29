import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { scrollToSection } from '../utils/scrollToSection';
import HeroChatDemo from './HeroChatDemo';

const HERO_HEADLINE_LEAD = 'Your inbox has one job:';
const HERO_HEADLINE_PAYOFF = 'to sell';
const HERO_HEADLINE = `${HERO_HEADLINE_LEAD} ${HERO_HEADLINE_PAYOFF}`;
const HERO_CTA_LABEL = 'Start free';
const HERO_TRUST_LINE = 'Sellogram replies from your posts and shop details. Tricky questions come to you.';
const HERO_SUBHEAD =
  'Sellogram answers product questions, takes orders and keeps customers updated in your shop’s Instagram DMs.';
const APP_URL = 'https://app.sellogram.co';

const Hero = () => {
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');

  const handleCTAClick = () => {
    trackCTA('hero_cta_button', HERO_CTA_LABEL, 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: HERO_HEADLINE,
    });
  };

  return (
    <section ref={sectionRef} className="overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <h1
          aria-label={HERO_HEADLINE}
          className="animate-fade-in-up font-display text-[clamp(3rem,1.4rem+6.4vw,7.5rem)] font-semibold leading-[0.95] tracking-tighter text-ink"
          style={{ animationDelay: '80ms' }}
        >
          <span aria-hidden="true" className="block">
            {HERO_HEADLINE_LEAD}
          </span>
          <span aria-hidden="true" className="mt-2 inline-block -rotate-1 rounded-2xl bg-fern px-4 pb-2 sm:mt-3 sm:px-6">
            {HERO_HEADLINE_PAYOFF}
          </span>
        </h1>

        <div className="mt-12 grid gap-12 sm:mt-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pt-6">
            <p
              className="max-w-md animate-fade-in-up text-lg leading-relaxed text-ink-light [text-wrap:pretty] sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              {HERO_SUBHEAD}
            </p>

            <div
              className="mt-8 flex animate-fade-in-up flex-wrap items-center gap-6"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href={APP_URL}
                onClick={handleCTAClick}
                className="inline-flex min-h-12 items-center rounded-full bg-fern px-8 text-base font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-fern-deep hover:text-paper active:translate-y-0 active:scale-[0.98]"
              >
                {HERO_CTA_LABEL}
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('dm-sales-journey')}
                className="inline-flex min-h-[44px] items-center text-base text-ink-light underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink"
              >
                See a sale happen
              </button>
            </div>

            <p
              className="mt-8 max-w-sm animate-fade-in-up rounded-2xl bg-paper-raised px-5 py-4 text-sm leading-relaxed text-ink-light [text-wrap:pretty]"
              style={{ animationDelay: '300ms' }}
            >
              {HERO_TRUST_LINE}
            </p>
          </div>

          <div className="animate-fade-in-up lg:col-span-8" style={{ animationDelay: '260ms' }}>
            <HeroChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
