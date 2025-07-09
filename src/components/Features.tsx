import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Globe, Clock, Brain, Zap, ArrowRight } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<number>(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { trackCTA } = useCTATracking();
  const trackingSectionRef = useSectionTracking('features', 'Features Section');

  const features = [
    {
      icon: MessageSquare,
      name: "Multi-Platform Integration",
      description: "Connect WhatsApp, Instagram, Telegram, and Facebook in one dashboard"
    },
    {
      icon: Globe,
      name: "Local Language Support",
      description: "Communicate fluently in English, Swahili, and other Kenyan languages"
    },
    {
      icon: Clock,
      name: "24/7 Instant Responses",
      description: "Never miss a customer inquiry, even when you're sleeping"
    },
    {
      icon: Brain,
      name: "Smart Product Knowledge",
      description: "AI learns your inventory, prices, and policies automatically"
    },
    {
      icon: Zap,
      name: "No-Code Setup",
      description: "Get started in 30 minutes without any technical skills required"
    }
  ];

  const chatSequence = [
    { type: 'customer', text: 'Hi! Do you have Samsung Galaxy A54 in blue?', delay: 1000 },
    { type: 'bot', text: 'Yes! We have the Samsung Galaxy A54 in blue available for KES 32,000. Would you like me to reserve one for you?', delay: 2000 },
    { type: 'customer', text: 'Perfect! Can I pay via M-Pesa?', delay: 1500 },
    { type: 'bot', text: 'Absolutely! We accept M-Pesa. I\'ll connect you with our sales team to complete your order. They\'ll be with you shortly!', delay: 2000 }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized intersection observer for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const observeCards = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach(card => {
        if (card) observer.observe(card);
      });
    };

    requestAnimationFrame(observeCards);

    return () => observer.disconnect();
  }, []);

  // Chat demo intersection observer - disabled on mobile
  useEffect(() => {
    if (isMobile) {
      // On mobile, show all messages immediately without animation
      setChatMessages(chatSequence.length);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            // Reset and start chat sequence
            setChatMessages(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, isMobile]);

  // Chat message timing with proper cleanup - disabled on mobile
  useEffect(() => {
    if (isMobile) return; // Skip animation timing on mobile

    if (isInView && chatMessages < chatSequence.length) {
      const timer = setTimeout(() => {
        setChatMessages(prev => prev + 1);
      }, chatSequence[chatMessages]?.delay || 1000);

      return () => clearTimeout(timer);
    }
  }, [chatMessages, chatSequence, isInView, isMobile]);

  const handleCTAClick = () => {
    trackCTA('features_cta_button', 'Get Early Access', 'features', {
      button_location: 'features_section',
      button_type: 'primary',
      section_headline: 'How Mira Works for Your Business'
    });
    scrollToContactForm();
  };

  return (
    <section id="features" className="py-20 bg-white" style={{ fontFamily: "Funnel Sans" }} ref={trackingSectionRef}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in-up" style={{ fontFamily: "Funnel Display" }}>
            How Mira Works for Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Designed specifically for Kenyan SMEs, Mira delivers powerful automation 
            that's simple to use and built for local market needs.
          </p>
        </div>

        {/* Core Features Grid with optimized animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-all duration-500 hover-lift ${
                visibleCards.includes(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0 transform translate-y-8'
              }`}
              data-index={index}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.05}s`
              }}
            >
              <div className="w-16 h-16 bg-[#C0DC2D]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale">
                <feature.icon className="h-8 w-8 text-[#C0DC2D]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description.includes("30 minutes") ? (
                  <>Get started in <span style={{ fontFamily: "Funnel Sans" }}>30</span> minutes without any technical skills required</>
                ) : feature.description.includes("24/7") ? (
                  <>Never miss a customer inquiry, even when you're sleeping</>
                ) : (
                  feature.description
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Feature Showcase with mobile-optimized chat demo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Feature details */}
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-[#13243E]/10 text-[#13243E] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Smart Automation
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
              Your AI Assistant That Never Sleeps
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mira automatically learns about your products, understands what your customers want, 
              and provides accurate answers in real-time. From product availability to pricing 
              inquiries, your customers get instant, helpful responses.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Handles product inquiries, stock checks, and price quotes",
                "Escalates complex issues to your team with full context",
                "Works seamlessly across all your social media channels"
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 animate-fade-in-left`}
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <div className="w-6 h-6 bg-[#C0DC2D] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hover-scale">
                    <span className="text-[#13243E] text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleCTAClick}
              className="bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 btn-shimmer group"
              data-hotjar-trigger="cta_click"
              data-button-id="features_cta_button"
              data-button-text="Get Early Access"
              data-page-section="features"
            >
              Get Early Access
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right side - Mobile-optimized chat demo */}
          <div className="animate-fade-in-right" ref={sectionRef}>
            <div className={`bg-gray-50 rounded-3xl p-8 ${!isMobile ? 'hover-lift' : ''}`}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center ${!isMobile ? 'hover-scale' : ''}`}>
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">WhatsApp Business</div>
                    <div className="text-sm text-gray-500">Customer Inquiry</div>
                  </div>
                </div>
                
                <div className="space-y-4 min-h-[300px]">
                  {chatSequence.slice(0, chatMessages).map((message, index) => (
                    <div 
                      key={index}
                      className={`${
                        !isMobile && message.type === 'customer' 
                          ? 'message-slide-in-left' 
                          : !isMobile && message.type === 'bot'
                          ? 'message-slide-in-right'
                          : '' // No animation classes on mobile
                      }`}
                    >
                      <div className={`${
                        message.type === 'customer'
                          ? 'bg-gray-100 rounded-2xl rounded-bl-sm p-4 max-w-xs'
                          : 'bg-[#C0DC2D] rounded-2xl rounded-br-sm p-4 max-w-xs ml-auto'
                      }`}>
                        <p className={`text-sm ${
                          message.type === 'customer' ? 'text-gray-800' : 'text-[#13243E]'
                        }`}>
                          {message.text.includes('KES 32,000') ? (
                            <>Yes! We have the Samsung Galaxy A54 in blue available for <span style={{ fontFamily: "Funnel Sans" }}>KES 32,000</span>. Would you like me to reserve one for you?</>
                          ) : (
                            message.text
                          )}
                        </p>
                        <div className={`text-xs mt-1 ${
                          message.type === 'customer' ? 'text-gray-500' : 'text-[#13243E]/70'
                        }`}>
                          {message.type === 'customer' ? 'Customer' : 'Mira AI'} • <span style={{ fontFamily: "Funnel Sans" }}>2:3{4 + index}</span> PM
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator - hidden on mobile */}
                  {!isMobile && isInView && chatMessages < chatSequence.length && chatMessages > 0 && (
                    <div className="bg-[#C0DC2D] rounded-2xl rounded-br-sm p-4 max-w-xs ml-auto">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#13243E] rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-[#13243E] rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-[#13243E] rounded-full typing-dot"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;