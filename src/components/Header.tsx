import { useEffect, useRef, useState } from 'react';
import sellogramWordmark from '../../brand/identity/wordmark/master/sellogram.svg?raw';
import { useCTATracking } from '../hooks/useTracking';

const APP_URL = 'https://app.sellogram.co';
const CTA_LABEL = 'Start free';

const NAV_ITEMS = [
  { href: '/how-it-works', label: 'How it works', id: 'how-it-works' },
  { href: '/pricing', label: 'Pricing', id: 'pricing' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { trackCTA } = useCTATracking();

  useEffect(() => {
    setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const handleCTAClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackCTA('header_cta_button', CTA_LABEL, 'header', {
      button_location: 'top_navigation',
      button_type: 'secondary',
    });
    window.location.href = APP_URL;
  };

  const navLinks = NAV_ITEMS.map((item) => (
    <a
      key={item.id}
      href={item.href}
      aria-current={currentPath === item.href ? 'page' : undefined}
      onClick={() => trackCTA(`header_nav_${item.id}`, item.label, 'header')}
      className="inline-flex min-h-[44px] items-center text-sm text-ink-light transition-colors duration-300 hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4"
    >
      {item.label}
    </a>
  ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <a href="#main-content" className="sr-only min-h-[44px] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:items-center focus:rounded-md focus:bg-ink focus:px-4 focus:text-paper">
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="/" aria-label="Sellogram" className="flex min-h-[44px] w-32 items-center text-ink sm:w-36">
          <span aria-hidden="true" className="[&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: sellogramWordmark }} />
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main navigation" className="hidden items-center gap-6 sm:flex">{navLinks}</nav>
          <a href={APP_URL} onClick={handleCTAClick} className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-fern px-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-fern-deep hover:text-paper active:scale-[0.98] sm:px-5">
            {CTA_LABEL}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-paper-raised sm:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-line bg-paper px-5 pb-4 sm:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col">{navLinks}</div>
        </nav>
      )}
    </header>
  );
};

export default Header;
