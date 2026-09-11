import { useSectionTracking, useCTATracking } from '../hooks/useTracking';
import { trackEvent } from '../utils/analytics';

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
      {
        href: '/use-cases/home-bakeries-food-brands',
        label: 'Bakeries and food',
        id: 'home-bakeries-food-brands',
      },
      {
        href: '/use-cases/skincare-haircare-makers',
        label: 'Skincare and haircare',
        id: 'skincare-haircare-makers',
      },
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
    <footer ref={sectionRef} className="bg-night text-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {FOOTER_GROUPS.map((group) => (
            <div key={group.heading}>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-light">
                {group.heading}
              </p>
              <ul className="mt-3">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={() => trackCTA(`footer_link_${link.id}`, link.label, 'footer')}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-ink-light transition-colors duration-200 hover:text-ink"
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
            <p className="mt-2 font-mono text-xs text-ink-light">
              Made in Nairobi, Kenya · © {currentYear}
            </p>
          </div>

          <a
            href="mailto:hello@sellogram.co"
            onClick={() => handleContactClick('email')}
            className="inline-flex min-h-[44px] min-w-[44px] items-center font-mono text-sm text-ink-light transition-colors duration-200 hover:text-ink"
          >
            hello@sellogram.co
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
