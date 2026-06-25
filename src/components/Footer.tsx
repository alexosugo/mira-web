import { useSectionTracking, useCTATracking } from '../hooks/useTracking';
import { trackEvent } from '../utils/analytics';
import { scrollToSection } from '../utils/scrollToSection';

const APP_URL = 'https://app.withmira.co';
const CTA_LABEL = 'Get started';

const FOOTER_LINKS = [
  { id: 'handles', label: 'What Mira handles' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
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
        <p className="kicker text-paper/60">One more thing</p>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-medium leading-[1.1] tracking-tight [text-wrap:balance]">
          Your DMs at 2 AM? <em className="font-normal italic">Mira's got it.</em>
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

      {/* Bottom matter */}
      <div className="border-t border-night-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-baseline sm:justify-between lg:px-8">
          <div>
            <p className="font-display text-xl font-semibold">Mira</p>
            <p className="mt-2 font-mono text-xs text-paper/55">
              Made in Nairobi, Kenya · © {currentYear}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  trackCTA(`footer_link_${link.id}`, link.label, 'footer');
                  scrollToSection(link.id);
                }}
                className="text-sm text-paper/60 transition-colors duration-200 hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="mailto:hello@withmira.co"
            onClick={() => handleContactClick('email')}
            className="font-mono text-sm text-paper/60 transition-colors duration-200 hover:text-paper"
          >
            hello@withmira.co
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
