import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Globe, Clock, Brain, Zap, Shield } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<number>(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
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
    },
    {
      icon: Shield,
      name: "Enterprise-Grade Security",
      description: "Your customer data is encrypted and protected with bank-level security standards"
    }
  ] as const;

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

  return (
    <section id="features" className="py-24 lg:py-32 bg-white dark:bg-navy-950 font-body" ref={trackingSectionRef}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-navy-800/5 dark:bg-lime-500/10 text-navy-800 dark:text-lime-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            <Zap className="h-4 w-4 text-lime-600" />
            Powerful Features
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight animate-fade-in-up">
            How Mira Works for Your Business
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Designed specifically for Kenyan SMEs, Mira delivers powerful automation 
            that's simple to use and built for local market needs.
          </p>
        </div>

        {/* Core Features Grid with optimized animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card group glass-card dark:bg-navy-800/50 dark:border-navy-700 rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-premium ${
                visibleCards.includes(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0 transform translate-y-8'
              }`}
              data-index={index}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.05}s`
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500/20 to-lime-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 
                             group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lime-500/20 transition-all duration-300">
                <feature.icon className="h-8 w-8 text-lime-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-4">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {feature.description.includes("30 minutes") ? (
                  <>Get started in <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">30</span> minutes without any technical skills required</>
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
            <div className="inline-flex items-center gap-2 bg-navy-800/10 dark:bg-lime-500/10 text-navy-800 dark:text-lime-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Brain className="h-4 w-4" />
              Smart Automation
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white mb-6 tracking-tight">
              Your AI Assistant That Never Sleeps
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Mira automatically learns about your products, understands what your customers want, 
              and provides accurate answers in real-time. From product availability to pricing 
              inquiries, your customers get instant, helpful responses.
            </p>
            
            <div className="space-y-4">
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
                  <div className="w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 
                                  shadow-md shadow-lime-500/30 hover:scale-110 transition-transform">
                    <span className="text-navy-800 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Mobile-optimized chat demo */}
          <div className="animate-fade-in-right" ref={sectionRef}>
            <div className={`glass-card dark:bg-navy-800/50 dark:border-navy-700 rounded-3xl p-8 ${!isMobile ? 'hover:shadow-premium transition-shadow duration-300' : ''}`}>
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-navy-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-md ${!isMobile ? 'hover:scale-110 transition-transform' : ''}`}>
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-navy-800 dark:text-white">WhatsApp Business</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Customer Inquiry</div>
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
                          : ''
                      }`}
                    >
                      <div className={`${
                        message.type === 'customer'
                          ? 'bg-gray-100 dark:bg-navy-700 rounded-2xl rounded-bl-sm p-4 max-w-xs'
                          : 'bg-lime-500 rounded-2xl rounded-br-sm p-4 max-w-xs ml-auto shadow-md shadow-lime-500/20'
                      }`}>
                        <p className={`text-sm ${
                          message.type === 'customer' ? 'text-gray-800 dark:text-gray-200' : 'text-navy-800'
                        }`}>
                          {message.text.includes('KES 32,000') ? (
                            <>Yes! We have the Samsung Galaxy A54 in blue available for <span className="font-mono font-semibold">KES 32,000</span>. Would you like me to reserve one for you?</>
                          ) : (
                            message.text
                          )}
                        </p>
                        <div className={`text-xs mt-1 ${
                          message.type === 'customer' ? 'text-gray-600 dark:text-gray-400' : 'text-navy-800/70'
                        }`}>
                          {message.type === 'customer' ? 'Customer' : 'Mira AI'} • <span className="font-mono">2:3{4 + index}</span> PM
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator - hidden on mobile */}
                  {!isMobile && isInView && chatMessages < chatSequence.length && chatMessages > 0 && (
                    <div className="bg-lime-500 rounded-2xl rounded-br-sm p-4 max-w-xs ml-auto shadow-md shadow-lime-500/20">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-navy-800 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-navy-800 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-navy-800 rounded-full typing-dot"></div>
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