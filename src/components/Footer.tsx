import { useSectionTracking, useCTATracking } from '../hooks/useTracking';
import { trackEvent } from '../utils/analytics';

const APP_URL = 'https://app.withmira.co';
const CTA_LABEL = 'Get started';

// Grouped footer links. Real routes so navigation works from any page
// (route-always). /customers is intentionally absent (deferred until proof).
const FOOTER_GROUPS: { heading: string; links: { href: string; label: string; id: string }[] }[] = [
  {
    heading: 'Product',
    links: [
      { href: '/pricing', label: 'Pricing', id: 'pricing' },
      { href: '/how-it-works', label: 'How it works', id: 'how-it-works' },
      { href: '/integrations/instagram', label: 'Instagram integration', id: 'instagram-integration' },
    ],
  },
  {
    heading: 'Features',
    links: [
      { href: '/features/product-answers', label: 'Product answers', id: 'product-answers' },
      { href: '/features/orders-and-checkout', label: 'Orders and checkout', id: 'orders-and-checkout' },
      { href: '/features/human-handoff', label: 'Human handoff', id: 'human-handoff' },
    ],
  },
  {
    heading: 'Use cases',
    links: [
      { href: '/use-cases/daily-drop-shops', label: 'Daily-drop shops', id: 'daily-drop-shops' },
      { href: '/use-cases/fashion', label: 'Fashion and thrift', id: 'fashion' },
      { href: '/use-cases/beauty', label: 'Beauty shops', id: 'beauty' },
      { href: '/use-cases/accessories', label: 'Accessories shops', id: 'accessories' },
      { href: '/use-cases/fragrances', label: 'Fragrance shops', id: 'fragrances' },
      { href: '/use-cases/home-bakeries-food-brands', label: 'Bakeries and food', id: 'home-bakeries-food-brands' },
      { href: '/use-cases/skincare-haircare-makers', label: 'Skincare and haircare', id: 'skincare-haircare-makers' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About', id: 'about' },
      { href: '/contact', label: 'Contact', id: 'contact' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { href: '/security', label: 'Security', id: 'security' },
      { href: '/privacy', label: 'Privacy', id: 'privacy' },
      { href: '/terms', label: 'Terms', id: 'terms' },
      { href: '/data-deletion', label: 'Data deletion', id: 'data-deletion' },
      { href: '/help', label: 'Help', id: 'help' },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useSectionTracking('footer', 'Footer');
  const { trackCTA } = useCTATracking();

  const handleContactClick = (type: string) => {
    trackEvent('contact_link_clicked', { contact_type: type, location: 'footer' });
  };

  return (
    <footer ref={sectionRef} className="bg-night text-paper">
      {/* Closing CTA */}
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="max-w-2xl font-display text-[clamp(1.9rem,1.4rem+2.4vw,2.875rem)] font-semibold leading-[1.1] tracking-tight [text-wrap:balance]">
          Your DMs at 2 AM? <em className="font-normal italic">Sellogram's got it.</em>
        </h2>
        <a
          href={APP_URL}
          onClick={(e) => {
            e.preventDefault();
            trackCTA('footer_cta_button', CTA_LABEL, 'footer', {
              button_location: 'footer_closing',
            });
            window.location.href = APP_URL;
          }}
          className="mt-10 inline-flex min-h-[48px] items-center rounded-full bg-paper px-7 text-base font-medium text-ink transition-colors duration-200 hover:bg-paper-raised"
        >
          {CTA_LABEL}
        </a>
      </div>

      {/* Grouped links + bottom matter */}
      <div className="border-t border-night-line">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-xs uppercase tracking-wide text-paper/60">{group.heading}</p>
                <ul className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => trackCTA(`footer_link_${link.id}`, link.label, 'footer')}
                        className="text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-8 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold">Sellogram</p>
              <p className="mt-2 font-mono text-xs text-paper/55">
                Made in Nairobi, Kenya · © {currentYear}
              </p>
            </div>

            <a
              href="mailto:hello@sellogram.co"
              onClick={() => handleContactClick('email')}
              className="font-mono text-sm text-paper/60 transition-colors duration-200 hover:text-paper"
            >
              hello@sellogram.co
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
