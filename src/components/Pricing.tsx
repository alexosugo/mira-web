import React from 'react';
import { Check, MessageCircle, Star, Zap, ArrowRight, Clock } from 'lucide-react';
import { scrollToContactForm } from '../utils/scrollToForm';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "KES 2,999",
      originalPrice: "KES 4,999",
      period: "/month",
      description: "Perfect for small businesses just getting started",
      popular: false,
      features: [
        "Up to 500 messages/month",
        "WhatsApp integration",
        "English & Swahili support",
        "Basic analytics",
        "Email support",
        "14-day free trial"
      ],
      cta: "Get Early Access"
    },
    {
      name: "Professional",
      price: "KES 5,999",
      originalPrice: "KES 8,999",
      period: "/month",
      description: "Most popular for growing SMEs",
      popular: true,
      features: [
        "Up to 2,000 messages/month",
        "WhatsApp + Instagram + Facebook",
        "All local languages",
        "Advanced analytics & insights",
        "Priority WhatsApp support",
        "Custom business training",
        "14-day free trial"
      ],
      cta: "Get Early Access"
    },
    {
      name: "Enterprise",
      price: "KES 12,999",
      originalPrice: "KES 18,999",
      period: "/month",
      description: "For established businesses with high volume",
      popular: false,
      features: [
        "Unlimited messages",
        "All social media platforms",
        "Multi-location support",
        "Advanced AI customization",
        "Dedicated account manager",
        "Phone & WhatsApp support",
        "Custom integrations",
        "14-day free trial"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" style={{ fontFamily: "Funnel Sans" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0DC2D]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#13243E]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Early Bird Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0DC2D] to-[#A8C426] text-[#13243E] px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse">
            <Clock className="h-4 w-4" />
            Early Bird Pricing - Limited Time Only
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            Affordable Automation<br />
            <span className="text-[#C0DC2D]">That Pays for Itself</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Starting at just <span className="font-bold text-[#13243E]" style={{ fontFamily: "Funnel Sans" }}>KES 2,999/month</span> – 
            less than hiring one part-time employee, but with <span style={{ fontFamily: "Funnel Sans" }}>24/7</span> availability and unlimited patience.
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Check className="h-4 w-4 text-[#C0DC2D]" />
              <span className="text-sm font-medium text-gray-700">Instant <span style={{ fontFamily: "Funnel Sans" }}>24/7</span> customer support</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Check className="h-4 w-4 text-[#C0DC2D]" />
              <span className="text-sm font-medium text-gray-700">Handle <span style={{ fontFamily: "Funnel Sans" }}>10x</span> more inquiries</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Check className="h-4 w-4 text-[#C0DC2D]" />
              <span className="text-sm font-medium text-gray-700">No technical skills required</span>
            </div>
          </div>
          
          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-[#13243E] to-[#1a2f4a] rounded-2xl p-8 max-w-4xl mx-auto mb-12 shadow-xl">
            <p className="text-white text-lg leading-relaxed">
              <strong>Save <span style={{ fontFamily: "Funnel Sans" }}>KES 15,000 - 50,000</span>/month</strong> vs hiring customer service staff. 
              Mira works around the clock, never takes sick days, and gets smarter every day.
            </p>
          </div>
        </div>

        {/* Urgency CTA Section */}
        <div className="bg-gradient-to-r from-[#13243E] via-[#1a2f4a] to-[#13243E] rounded-3xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#C0DC2D]/20 text-[#C0DC2D] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Exclusive Launch Offer
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
              Lock in Early Bird Pricing
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join our waitlist now and secure these special launch prices for life. 
              Plus get exclusive early access and a <span style={{ fontFamily: "Funnel Sans" }}>14</span>-day free trial when we launch.
            </p>
            
            <div className="flex justify-center">
              <button 
                onClick={scrollToContactForm}
                className="bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#C0DC2D]/90 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 btn-shimmer hover-glow group"
              >
                Get Early Access
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ✓ No setup fees ✓ Cancel anytime ✓ <span style={{ fontFamily: "Funnel Sans" }}>30</span>-day money-back guarantee
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <MessageCircle className="h-4 w-4" />
            <span>Questions? WhatsApp us at <span style={{ fontFamily: "Funnel Sans" }}>+254 700 123 456</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;