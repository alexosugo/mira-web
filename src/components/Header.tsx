import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking } from '../hooks/useTracking';
import { trackPostHogEvent } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { trackCTA } = useCTATracking();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleCTAClick = () => {
    trackCTA('header_cta_button', 'Get started', 'header', {
      button_location: 'top_navigation',
      button_type: 'primary'
    });
    scrollToContactForm();
  };

  const navItems = [
    { id: 'features', label: 'How It Works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ease-premium ${
        isScrolled 
          ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-navy-700/50 shadow-sm' 
          : 'bg-white/60 dark:bg-navy-950/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2"
          >
            <span 
              className="text-2xl font-bold text-navy-800 dark:text-white font-display tracking-tight
                         transition-all duration-300 group-hover:text-lime-500"
            >
              Mira
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="nav-link-premium px-4 py-2 text-sm font-medium rounded-lg
                           hover:bg-gray-100/80 dark:hover:bg-navy-800/80 dark:text-gray-300 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                const newTheme = isDark ? 'light' : 'dark';
                trackPostHogEvent('theme_toggle', { theme: newTheme });
                toggleTheme();
              }}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 
                         transition-all duration-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-lime-500" />
              ) : (
                <Moon className="w-5 h-5 text-navy-800" />
              )}
            </button>
            <button 
              onClick={handleCTAClick}
              className="btn-premium group bg-lime-500 text-navy-800 px-5 py-2.5 rounded-xl 
                         font-semibold text-sm shadow-md flex items-center gap-2"
            >
              Get started
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 
                         transition-all duration-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-lime-500" />
              ) : (
                <Moon className="w-5 h-5 text-navy-800" />
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-navy-800 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-navy-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-premium ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-navy-700">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-navy-800 dark:hover:text-white
                           hover:bg-gray-50 dark:hover:bg-navy-800 rounded-xl font-medium transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-navy-700">
            <button 
              onClick={handleCTAClick}
              className="btn-premium w-full bg-lime-500 text-navy-800 px-6 py-3.5 
                         rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;