import { useEffect, useState } from 'react';
import sellogramWordmark from '../../brand/identity/wordmark/master/sellogram.svg?raw';
import { useCTATracking } from '../hooks/useTracking';

const APP_URL = 'https://app.withmira.co';
const CTA_LABEL = 'Get started';

// Global nav uses real routes so it works from any page (route-always). The
// homepage no longer smooth-scrolls from the header; in-page CTAs handle that.
const NAV_ITEMS = [
  { href: '/how-it-works', label: 'How it works', id: 'how-it-works' },
  { href: '/pricing', label: 'Pricing', id: 'pricing' },
];

/**
 * Minimal fixed header: wordmark, two nav links, one CTA.
 * The CTA stays visible at every viewport, so no hamburger and no
 * separate mobile sticky bar are needed.
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { trackCTA } = useCTATracking();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTA('header_cta_button', CTA_LABEL, 'header', {
      button_location: 'top_navigation',
      button_type: 'secondary',
    });
    window.location.href = APP_URL;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-300 border-b ${
        isScrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="/"
          aria-label="Sellogram"
          className="block w-32 sm:w-36 text-ink"
        >
          <span
            aria-hidden="true"
            className="block [&>svg]:h-auto [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: sellogramWordmark }}
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => trackCTA(`header_nav_${item.id}`, item.label, 'header')}
                className="text-sm text-ink-light transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={APP_URL}
            onClick={handleCTAClick}
            className="inline-flex min-h-[40px] items-center rounded-full bg-fern px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-fern-deep"
          >
            {CTA_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
