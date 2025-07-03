import React, { useEffect, useState } from 'react';
import { Clock, Settings, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';

const Benefits = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [counters, setCounters] = useState({ response: 0, efficiency: 0, sales: 0 });

  const benefits = [
    {
      icon: Clock,
      title: "Faster Responses",
      description: "Reduce response times by up to 40% with instant 24/7 support.",
      metric: "40%"
    },
    {
      icon: Settings,
      title: "More Efficiency",
      description: "Automate 80% of repetitive queries, freeing your team for high-value work.",
      metric: "80%"
    },
    {
      icon: TrendingUp,
      title: "Higher Sales",
      description: "Boost conversions by 25% with always-on customer engagement.",
      metric: "25%"
    },
    {
      icon: BarChart3,
      title: "Better Insights",
      description: "Gain data on query patterns and customer satisfaction to improve your business.",
      metric: "100%"
    }
  ];

  useEffect(() => {
    // Optimized intersection observer with proper configuration
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            
            // Prevent duplicate additions
            setVisibleCards(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
            
            // Trigger counter animations with proper timing
            setTimeout(() => {
              if (index === 0) animateCounter('response', 40);
              if (index === 1) animateCounter('efficiency', 80);
              if (index === 2) animateCounter('sales', 25);
            }, index * 150); // Staggered timing
          }
        });
      },
      { 
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
      }
    );

    // Use requestAnimationFrame for better performance
    const observeElements = () => {
      const cards = document.querySelectorAll('.benefit-card');
      cards.forEach(card => {
        if (card) observer.observe(card);
      });
    };

    // Delay observation to ensure DOM is ready
    requestAnimationFrame(observeElements);

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateCounter = (key: keyof typeof counters, target: number) => {
    let current = 0;
    const duration = 1500; // 1.5 seconds
    const steps = 60; // 60fps
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
    }, stepDuration);
  };

  return (
    <section id="benefits" className="py-20 bg-gray-50" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in-up" style={{ fontFamily: "Funnel Display" }}>
            Transform Your Business with Mira
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Here's what Mira can do for you:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`benefit-card bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-500 hover-lift ${
                  visibleCards.includes(index) ? 'animate-scale-in opacity-100' : 'opacity-0 transform translate-y-8'
                }`}
                data-index={index}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="w-16 h-16 bg-[#C0DC2D]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale">
                  <benefit.icon className="h-8 w-8 text-[#C0DC2D]" />
                </div>
                
                {/* Animated metric with smooth counting */}
                <div className="text-3xl font-bold text-[#C0DC2D] mb-2 animate-count-up" style={{ fontFamily: "Funnel Sans" }}>
                  {index === 0 && counters.response}
                  {index === 1 && counters.efficiency}
                  {index === 2 && counters.sales}
                  {index === 3 && "∞"}
                  {index < 3 && "%"}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description.includes("40%") ? (
                    <>Reduce response times by up to <span style={{ fontFamily: "Funnel Sans" }}>40%</span> with instant <span style={{ fontFamily: "Funnel Sans" }}>24/7</span> support.</>
                  ) : benefit.description.includes("80%") ? (
                    <>Automate <span style={{ fontFamily: "Funnel Sans" }}>80%</span> of repetitive queries, freeing your team for high-value work.</>
                  ) : benefit.description.includes("25%") ? (
                    <>Boost conversions by <span style={{ fontFamily: "Funnel Sans" }}>25%</span> with always-on customer engagement.</>
                  ) : (
                    benefit.description
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={scrollToContactForm}
              className="bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 btn-shimmer hover-glow group animate-fade-in-up animate-delay-600"
            >
              Get Early Access
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;