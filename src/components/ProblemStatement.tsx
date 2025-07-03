import React from 'react';
import { Clock, MessageSquare, Users, RefreshCw } from 'lucide-react';

const ProblemStatement = () => {
  const problems = [
    {
      icon: Users,
      title: "Limited Resources",
      description: "Can't afford a 24/7 support team, leaving customers waiting and sales slipping away."
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel Chaos",
      description: "Managing messages on WhatsApp, Instagram, and Facebook is overwhelming and disjointed."
    },
    {
      icon: Clock,
      title: "Slow Responses",
      description: "4-6 hour delays frustrate customers and hurt your business."
    },
    {
      icon: RefreshCw,
      title: "Repetitive Queries",
      description: "60-70% of your team's time is spent answering basic questions about products and pricing."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            Struggling to Keep Up with Customer Inquiries?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            You're not alone—here's what Kenyan SMEs face every day:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C0DC2D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <problem.icon className="h-6 w-6 text-[#C0DC2D]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Funnel Display" }}>
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description.includes("60-70%") ? (
                      <>
                        <span style={{ fontFamily: "Funnel Sans" }}>60-70%</span> of your team's time is spent answering basic questions about products and pricing.
                      </>
                    ) : problem.description.includes("4-6") ? (
                      <>
                        <span style={{ fontFamily: "Funnel Sans" }}>4-6</span> hour delays frustrate customers and hurt your business.
                      </>
                    ) : problem.description.includes("24/7") ? (
                      <>
                        Can't afford a <span style={{ fontFamily: "Funnel Sans" }}>24/7</span> support team, leaving customers waiting and sales slipping away.
                      </>
                    ) : (
                      problem.description
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;