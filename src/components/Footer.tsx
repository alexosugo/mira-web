import { Mail, MapPin } from 'lucide-react';
import { useSectionTracking, useCTATracking } from '../hooks/useTracking';
import { trackEvent } from '../utils/analytics';
import { scrollToSection } from '../utils/scrollToSection';

const SECTION_MAP: Record<string, string> = {
  'how-it-works': 'how-it-works',
  'benefits': 'benefits',
  'pricing': 'pricing'
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useSectionTracking('footer', 'Footer');
  const { trackCTA } = useCTATracking();

  const handleContactClick = (type: string) => {
    trackEvent('contact_link_click', {
      contact_type: type,
      location: 'footer'
    });
  };

  return (
    <footer ref={sectionRef} className="bg-navy-900 text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Mira</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Mira helps social-first shops serve customers quickly and easily, no matter how busy the day gets.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lime-500/10 border border-lime-500/20 rounded-full text-lime-400">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400" aria-hidden="true" />
                Made in Kenya
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['How It Works', 'Benefits', 'Pricing'].map((link) => {
                const linkKey = link.toLowerCase().replace(/\s+/g, '-');
                const targetId = SECTION_MAP[linkKey] || linkKey;
                
                return (
                  <li key={link}>
                    <a
                      href={`#${targetId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        trackCTA(`footer_link_${linkKey}`, link, 'footer');
                        scrollToSection(targetId);
                      }}
                      className="text-gray-400 hover:text-lime-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <a 
                  href="mailto:hello@withmira.co" 
                  onClick={() => handleContactClick('email')}
                  className="flex items-center gap-3 hover:text-lime-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-lime-500" />
                  hello@withmira.co
                </a>
              </li>

              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-lime-500" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          {/* Privacy/Terms links return here once the legal pages exist;
              fake destinations erode the trust this page is asking for. */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            © <span className="font-mono">{currentYear}</span> Mira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;