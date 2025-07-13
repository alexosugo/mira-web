import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking } from '../hooks/useTracking';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { trackCTA } = useCTATracking();
  const { isAuthenticated, signOut, loading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const handleCTAClick = () => {
    trackCTA('header_cta_button', 'Get Early Access', 'header', {
      button_location: 'top_navigation',
      button_type: 'primary'
    });
    scrollToContactForm();
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xl font-semibold text-gray-900 hover:text-[#C0DC2D] transition-colors" 
              style={{ fontFamily: "Lexend" }}
            >
              Mira
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Blog
            </Link>
            {location.pathname === '/' && (
              <>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('benefits')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Impact
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Pricing
            </button>
              </>
            )}
            {/* Admin Links for Authenticated Users */}
            {isAuthenticated && (
              <Link
                to="/admin/posts"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : (
            <button 
              onClick={handleCTAClick}
              className="bg-[#C0DC2D] text-[#13243E] px-4 py-2 rounded-lg hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 font-medium text-sm"
              data-hotjar-trigger="cta_click"
              data-button-id="header_cta_button"
              data-button-text="Get Early Access"
              data-page-section="header"
            >
              Get Early Access
            </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
              {location.pathname === '/' && (
                <>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Impact
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </button>
                </>
              )}
              <div className="border-t border-gray-100 pt-2">
                {/* Admin Links for Authenticated Users */}
                {isAuthenticated && (
                  <Link
                    to="/admin/posts"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                
                {isAuthenticated ? (
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                <button 
                  onClick={handleCTAClick}
                  className="block w-full text-left px-3 py-2 bg-[#C0DC2D] text-[#13243E] rounded-lg hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105"
                  data-hotjar-trigger="cta_click"
                  data-button-id="header_mobile_cta_button"
                  data-button-text="Get Early Access"
                  data-page-section="header_mobile"
                >
                  Get Early Access
                </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;