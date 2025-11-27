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
    trackCTA('testimonials_cta_button', 'Get Early Access', 'testimonials', {
      button_location: 'testimonials_section',
      button_type: 'primary',
      section_headline: 'How Mira Will Change Your Business'
    });
    scrollToContactForm();
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in-up" style={{ fontFamily: "Funnel Display" }}>
            How Mira Will Change Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            See what Kenyan SMEs like yours can expect when Mira launches
          </p>
        </div>

        {/* Testimonials Grid with optimized animations */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`animate-on-scroll bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-500 hover-lift ${
                visibleElements.includes(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0 transform translate-y-8'
              }`}
              data-index={index}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Funnel Display" }}>
                  {testimonial.businessName}
                </h3>
                <p className="text-gray-600 font-medium">{testimonial.owner}, {testimonial.location}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Funnel Display" }}>Challenge:</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {testimonial.challenge.includes("30 seconds") ? (
                      <>Grace was losing customers because she couldn't respond to WhatsApp inquiries fast enough while managing her physical store.</>
                    ) : testimonial.challenge.includes("24/7") ? (
                      <>Mira takes orders <span style={{ fontFamily: "Funnel Sans" }}>24/7</span>, answers questions about ingredients and allergens, provides delivery estimates, and sends orders directly to her kitchen staff.</>
                    ) : (
                      testimonial.challenge
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Funnel Display" }}>Mira Solution:</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {testimonial.solution.includes("85%") ? (
                      <>Mira now handles <span style={{ fontFamily: "Funnel Sans" }}>85%</span> of product inquiries automatically, responds in under <span style={{ fontFamily: "Funnel Sans" }}>30</span> seconds, and increased her conversion rate by <span style={{ fontFamily: "Funnel Sans" }}>40%</span>.</>
                    ) : testimonial.solution.includes("24/7") ? (
                      <>Mira takes orders <span style={{ fontFamily: "Funnel Sans" }}>24/7</span>, answers questions about ingredients and allergens, provides delivery estimates, and sends orders directly to her kitchen staff.</>
                    ) : testimonial.solution.includes("70%") ? (
                      <>Mira handles appointment bookings, explains spa packages, manages cancellations, and sends automated reminders to reduce no-shows by <span style={{ fontFamily: "Funnel Sans" }}>70%</span>.</>
                    ) : (
                      testimonial.solution
                    )}
                  </p>
                </div>
              </div>
              
              <div className="bg-[#C0DC2D]/10 rounded-xl p-4 mt-6 hover-scale">
                <div className="flex items-center gap-2 text-[#C0DC2D] mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Projected Outcome:</span>
                </div>
                <p className="text-sm text-[#13243E] font-semibold">
                  {testimonial.outcome.includes("40%") ? (
                    <><span style={{ fontFamily: "Funnel Sans" }}>40%</span> more sales, <span style={{ fontFamily: "Funnel Sans" }}>24/7</span> customer support</>
                  ) : testimonial.outcome.includes("60%") ? (
                    <><span style={{ fontFamily: "Funnel Sans" }}>60%</span> time savings, unified customer communication</>
                  ) : testimonial.outcome.includes("50%") ? (
                    <><span style={{ fontFamily: "Funnel Sans" }}>50%</span> more orders, zero missed inquiries</>
                  ) : testimonial.outcome.includes("70%") ? (
                    <><span style={{ fontFamily: "Funnel Sans" }}>70%</span> fewer no-shows, automated appointment management</>
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
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight animate-fade-in-up" style={{ fontFamily: "Funnel Display" }}>
              Why Kenyan Businesses Need Mira
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
              The numbers speak for themselves – your customers are waiting for better service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`animate-on-scroll bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg hover:border-[#C0DC2D]/30 transition-all duration-500 transform hover:-translate-y-1 hover-glow ${
                  visibleElements.includes(index + 10) ? 'animate-scale-in opacity-100' : 'opacity-0 transform scale-95'
                }`}
                data-index={index + 10}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-5xl lg:text-6xl font-bold text-[#C0DC2D] mb-4 animate-count-up" style={{ fontFamily: "Funnel Sans" }}>
                  {stat.percentage}
                </div>
                <p className="text-gray-700 leading-relaxed">
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
            className="bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 btn-shimmer hover-glow group animate-fade-in-up"
            data-hotjar-trigger="cta_click"
            data-button-id="testimonials_cta_button"
            data-button-text="Get Early Access"
            data-page-section="testimonials"
          >
            Get Early Access
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-gray-600 mt-4 animate-fade-in-up animate-delay-200">
            Get early access and <span style={{ fontFamily: "Funnel Sans" }}>14</span>-day free trial when we launch
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;