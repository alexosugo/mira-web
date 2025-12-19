import { MessageCircle, Mail, MapPin, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSectionTracking, useCTATracking } from '../hooks/useTracking';
import { trackPostHogEvent } from '../utils/analytics';

const SECTION_MAP: Record<string, string> = {
  'how-it-works': 'features',
  'benefits': 'benefits',
  'pricing': 'pricing'
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useSectionTracking('footer', 'Footer');
  const { trackCTA } = useCTATracking();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const handleSocialClick = (label: string) => {
    trackPostHogEvent('social_link_click', {
      platform: label,
      location: 'footer'
    });
  };

  const handleContactClick = (type: string) => {
    trackPostHogEvent('contact_link_click', {
      contact_type: type,
      location: 'footer'
    });
  };

  return (
    <footer ref={sectionRef} className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Mira</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Mira helps social-first shops serve customers quickly and easily, no matter how busy the day gets.
            </p>
            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lime-500/10 border border-lime-500/20 rounded-full text-lime-400">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                Made in Kenya
              </span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  onClick={() => handleSocialClick(social.label)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 
                             flex items-center justify-center text-gray-400
                             hover:bg-lime-500/20 hover:border-lime-500/30 hover:text-lime-400
                             transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
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
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
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
                <button 
                  onClick={() => handleContactClick('whatsapp')}
                  className="flex items-center gap-3 hover:text-lime-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-lime-500" />
                  WhatsApp Support
                </button>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © <span className="font-mono">{currentYear}</span> Mira. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button 
                onClick={() => trackPostHogEvent('legal_link_click', { link: 'privacy', location: 'footer' })}
                className="hover:text-lime-400 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => trackPostHogEvent('legal_link_click', { link: 'terms', location: 'footer' })}
                className="hover:text-lime-400 transition-colors duration-200"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;