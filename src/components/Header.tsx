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
 * Minimal fixed header: wordmark, two nav links, one CTA.
 * The CTA stays visible at every viewport, so no hamburger and no
 * separate mobile sticky bar are needed.
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
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-300 border-b ${
        isScrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-2xl font-semibold tracking-tight text-ink"
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
                className="text-sm text-ink-light transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={APP_URL}
            onClick={handleCTAClick}
            className="inline-flex min-h-[40px] items-center rounded-full bg-fern px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-fern-deep"
          >
            {HERO_CTA_COPY[heroCta]}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
