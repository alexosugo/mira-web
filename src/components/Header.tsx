import { useEffect, useState } from 'react';
import { useCTATracking } from '../hooks/useTracking';
import { useHeroCtaExperiment, HERO_CTA_COPY } from '../hooks/useExperiments';
import { scrollToSection } from '../utils/scrollToSection';

const APP_URL = 'https://app.withmira.co';

const NAV_ITEMS = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
];

/**
 * Floating pill header: wordmark, two nav links, one CTA. It starts
 * transparent on the mist ground and lifts into a white pill with a soft
 * shadow once the page scrolls. The CTA stays visible at every viewport,
 * so no hamburger and no separate mobile sticky bar are needed.
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { trackCTA } = useCTATracking();
  const heroCta = useHeroCtaExperiment();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTA('header_cta_button', HERO_CTA_COPY[heroCta], 'header', {
      button_location: 'top_navigation',
      button_type: 'secondary',
      experiment_variant: heroCta,
    });
    window.location.href = APP_URL;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full px-5 transition-[background-color,box-shadow,border-color] duration-300 sm:px-6 ${
          isScrolled
            ? 'border border-line bg-white/95 shadow-soft backdrop-blur-sm'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-xl font-bold tracking-tight text-slate"
        >
          Mira
        </button>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  trackCTA(`header_nav_${item.id}`, item.label, 'header');
                  scrollToSection(item.id);
                }}
                className="text-sm font-medium text-slate-light transition-colors duration-200 hover:text-slate"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={APP_URL}
            onClick={handleCTAClick}
            className="inline-flex min-h-[40px] items-center rounded-full bg-dusk px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-dusk-deep"
          >
            {HERO_CTA_COPY[heroCta]}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
