import React, { useEffect, useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const Testimonials = () => {
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [animatedCounters, setAnimatedCounters] = useState<number[]>([]);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('testimonials', 'Testimonials Section');

  const testimonials = [
    {
      businessName: "Wanjiku's Beauty Supplies",
      owner: "Grace Wanjiku",
      location: "Nairobi",
      challenge: "Grace was losing customers because she couldn't respond to WhatsApp inquiries fast enough while managing her physical store.",
      solution: "Mira now handles 85% of product inquiries automatically, responds in under 30 seconds, and increased her conversion rate by 40%.",
      outcome: "40% more sales, 24/7 customer support"
    },
    {
      businessName: "Kimani Electronics",
      owner: "James Kimani",
      location: "Mombasa",
      challenge: "James struggled to manage customer inquiries across WhatsApp, Instagram, and Facebook while running his electronics shop.",
      solution: "Mira unified all his channels, automatically answers technical questions about phones and laptops, and handles price comparisons in both English and Swahili.",
      outcome: "60% time savings, unified customer communication"
    },
    {
      businessName: "Mama Njeri's Kitchen",
      owner: "Anne Njeri",
      location: "Kisumu",
      challenge: "Anne's restaurant was missing orders because customers couldn't reach her during busy lunch hours to ask about menu items and delivery.",
      solution: "Mira takes orders 24/7, answers questions about ingredients and allergens, provides delivery estimates, and sends orders directly to her kitchen staff.",
      outcome: "50% more orders, zero missed inquiries"
    },
    {
      businessName: "Otieno Wellness Spa",
      owner: "Peter Otieno",
      location: "Eldoret",
      challenge: "Peter's spa clients often called after hours to book appointments, ask about services, or reschedule, but he couldn't always answer.",
      solution: "Mira handles appointment bookings, explains spa packages, manages cancellations, and sends automated reminders to reduce no-shows by 70%.",
      outcome: "70% fewer no-shows, automated appointment management"
    }
  ];

  const stats = [
    {
      percentage: "89%",
      description: "of Kenyans use WhatsApp daily – Mira puts you where your customers are"
    },
    {
      percentage: "78%",
      description: "of SMEs struggle with customer service – Mira's automation is the answer"
    },
    {
      percentage: "65%",
      description: "of queries are repetitive – Mira handles them effortlessly"
    }
  ];

  // Optimized intersection observer with better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleElements: number[] = [];
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            newVisibleElements.push(index);
          }
        });

        if (newVisibleElements.length > 0) {
          setVisibleElements(prev => {
            const combined = [...prev, ...newVisibleElements];
            return [...new Set(combined)]; // Remove duplicates
          });
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Use requestAnimationFrame for better performance
    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        if (element) observer.observe(element);
      });
    };

    requestAnimationFrame(observeElements);

    return () => observer.disconnect();
  }, []);

  // Separate effect for counter animations to prevent conflicts
  useEffect(() => {
    visibleElements.forEach(index => {
      if (index >= 10 && !animatedCounters.includes(index)) {
        setAnimatedCounters(prev => [...prev, index]);
      }
    });
  }, [visibleElements, animatedCounters]);

  const handleCTAClick = () => {
    trackCTA('testimonials_cta_button', 'Reserve Your Spot', 'testimonials', {
      button_location: 'testimonials_section',
      button_type: 'primary',
      section_headline: 'How Mira Will Change Your Business'
    });
    scrollToContactForm();
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-navy-950 dark:to-navy-900 font-body">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-700 dark:text-lime-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            <TrendingUp className="h-4 w-4" />
            Success Stories
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight animate-fade-in-up">
            How Mira Will Change Your Business
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            See what Kenyan SMEs like yours can expect when Mira launches
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-fade-in-up animate-delay-300">
            *Based on similar AI implementations in customer service
          </p>
        </div>

        {/* Testimonials Grid with optimized animations */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`animate-on-scroll glass-card dark:bg-navy-800/50 dark:border-navy-700 rounded-2xl p-8 hover:shadow-premium transition-all duration-500 ${
                visibleElements.includes(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0 transform translate-y-8'
              }`}
              data-index={index}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-lime-400 
                               flex items-center justify-center text-navy-800 font-bold text-sm flex-shrink-0
                               shadow-md shadow-lime-500/20">
                  {testimonial.owner.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-1">
                    {testimonial.businessName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{testimonial.owner}, {testimonial.location}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-display font-semibold text-navy-800 dark:text-white mb-2">Challenge:</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {testimonial.challenge.includes("30 seconds") ? (
                      <>Grace was losing customers because she couldn't respond to WhatsApp inquiries fast enough while managing her physical store.</>
                    ) : testimonial.challenge.includes("24/7") ? (
                      <>Mira takes orders <span className="font-mono font-semibold text-navy-700">24/7</span>, answers questions about ingredients and allergens, provides delivery estimates, and sends orders directly to her kitchen staff.</>
                    ) : (
                      testimonial.challenge
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-display font-semibold text-navy-800 dark:text-white mb-2">Mira Solution:</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {testimonial.solution.includes("85%") ? (
                      <>Mira now handles <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">85%</span> of product inquiries automatically, responds in under <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">30</span> seconds, and increased her conversion rate by <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">40%</span>.</>
                    ) : testimonial.solution.includes("24/7") ? (
                      <>Mira takes orders <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">24/7</span>, answers questions about ingredients and allergens, provides delivery estimates, and sends orders directly to her kitchen staff.</>
                    ) : testimonial.solution.includes("70%") ? (
                      <>Mira handles appointment bookings, explains spa packages, manages cancellations, and sends automated reminders to reduce no-shows by <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">70%</span>.</>
                    ) : (
                      testimonial.solution
                    )}
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-lime-500/15 to-lime-600/5 dark:from-lime-500/10 dark:to-lime-600/5 rounded-xl p-4 mt-6 border border-lime-500/20 
                             hover:from-lime-500/20 hover:to-lime-600/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-lime-700 dark:text-lime-400 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">Expected Results:</span>
                </div>
                <p className="text-sm text-navy-800 dark:text-white font-semibold">
                  {testimonial.outcome.includes("40%") ? (
                    <><span className="font-mono">40%</span> more sales, <span className="font-mono">24/7</span> customer support</>
                  ) : testimonial.outcome.includes("60%") ? (
                    <><span className="font-mono">60%</span> time savings, unified customer communication</>
                  ) : testimonial.outcome.includes("50%") ? (
                    <><span className="font-mono">50%</span> more orders, zero missed inquiries</>
                  ) : testimonial.outcome.includes("70%") ? (
                    <><span className="font-mono">70%</span> fewer no-shows, automated appointment management</>
                  ) : (
                    testimonial.outcome
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics Section with optimized animations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white mb-4 tracking-tight animate-fade-in-up">
              Why Kenyan Businesses Need Mira
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
              The numbers speak for themselves – your customers are waiting for better service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`animate-on-scroll glass-card dark:bg-navy-800/50 border border-gray-100 dark:border-navy-700 rounded-2xl p-8 text-center 
                           hover:shadow-premium hover:border-lime-500/30 transition-all duration-500 transform hover:-translate-y-1 ${
                  visibleElements.includes(index + 10) ? 'animate-scale-in opacity-100' : 'opacity-0 transform scale-95'
                }`}
                data-index={index + 10}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="font-mono text-5xl lg:text-6xl font-bold text-lime-600 mb-4 animate-count-up">
                  {stat.percentage}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Final CTA */}
        <div className="text-center">
          <button 
            onClick={handleCTAClick}
            className="btn-premium bg-lime-500 text-navy-800 px-8 py-4 rounded-xl text-lg font-bold 
                       hover:shadow-xl shadow-lg shadow-lime-500/20 inline-flex items-center gap-2 
                       group animate-fade-in-up transition-all"
            data-hotjar-trigger="cta_click"
            data-button-id="testimonials_cta_button"
            data-button-text="Reserve Your Spot"
            data-page-section="testimonials"
          >
            Reserve Your Spot
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-gray-600 dark:text-gray-400 mt-4 animate-fade-in-up animate-delay-200">
            Get early access and <span className="font-mono font-semibold text-navy-700 dark:text-lime-400">14</span>-day free trial when we launch
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;