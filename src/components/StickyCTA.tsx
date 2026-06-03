import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCTATracking } from '../hooks/useTracking';
import { useHeroCtaExperiment, HERO_CTA_COPY } from '../hooks/useExperiments';

const APP_URL = 'https://app.withmira.co';

/**
 * Mobile-only persistent CTA.
 *
 * The desktop header keeps its CTA visible at all times, so a desktop sticky
 * bar would be a redundant SaaS nag. On mobile the header CTA is collapsed
 * inside the hamburger and disappears for the whole scroll, so the conversion
 * action is gone between the hero and pricing. This bar fills that gap: it
 * fades in once the hero leaves the viewport and fades out again as pricing
 * arrives, so its lime never competes with the hero CTA or Pro's lime button
 * (the One Signal Rule stays intact, one lime CTA on screen at a time).
 */
const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const heroCta = useHeroCtaExperiment();

  useEffect(() => {
    const hero = document.getElementById('hero');
    const pricing = document.getElementById('pricing');
    if (!hero || !pricing) return;

    const state = { heroVisible: true, pricingVisible: false };
    const sync = () => setVisible(!state.heroVisible && !state.pricingVisible);

    // Account for the fixed header when deciding the hero has left.
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        state.heroVisible = entry.isIntersecting;
        sync();
      },
      { rootMargin: '-72px 0px 0px 0px' }
    );
    // Reveal pricing a little early so the bar is gone before Pro's lime button.
    const pricingObserver = new IntersectionObserver(
      ([entry]) => {
        state.pricingVisible = entry.isIntersecting;
        sync();
      },
      { rootMargin: '0px 0px -25% 0px' }
    );

    heroObserver.observe(hero);
    pricingObserver.observe(pricing);
    return () => {
      heroObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    trackCTA('sticky_cta_button', HERO_CTA_COPY[heroCta], 'sticky_mobile', {
      button_location: 'sticky_bottom',
    });
    window.location.href = APP_URL;
  };

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]
                  bg-gradient-to-t from-white via-white/90 to-transparent
                  dark:from-navy-950 dark:via-navy-950/90
                  transition-opacity duration-300 motion-reduce:transition-none ${
                    visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
    >
      <button
        type="button"
        onClick={handleClick}
        tabIndex={visible ? 0 : -1}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-lime-500
                   px-6 py-3.5 min-h-[52px] font-semibold text-navy-800 shadow-lg
                   hover:bg-lime-400 transition-colors duration-200 motion-reduce:transition-none
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-800/40"
      >
        {HERO_CTA_COPY[heroCta]}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </button>
    </div>
  );
};

export default StickyCTA;
