import React from 'react';
import { Clock, Settings, TrendingUp, BarChart3 } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const Benefits = () => {
  const sectionRef = useSectionTracking('benefits', 'Benefits Section');

  const benefits = [
    {
      icon: Clock,
      title: "Faster Responses",
      description: "Customers get answers right away, even when you're busy"
    },
    {
      icon: Settings,
      title: "Less Repetitive Work",
      description: "Mira handles the questions you get every day, so you don't have to repeat yourself"
    },
    {
      icon: TrendingUp,
      title: "More Sales Opportunities",
      description: "Customers stay engaged instead of drifting away when replies take too long."
    },
    {
      icon: BarChart3,
      title: "Clearer Understanding of Your Customers",
      description: "See the questions they ask most and where they hesitate, so you can improve your shop."
    }
  ];

  const gradientColors = [
    'from-lime-500/10 via-white to-navy-500/5 dark:from-lime-500/10 dark:via-navy-800 dark:to-navy-800',
    'from-navy-500/5 via-white to-lime-500/10 dark:from-navy-700 dark:via-navy-800 dark:to-lime-500/10',
    'from-lime-500/10 via-white to-navy-500/5 dark:from-lime-500/10 dark:via-navy-800 dark:to-navy-800',
    'from-navy-500/5 via-white to-lime-500/10 dark:from-navy-700 dark:via-navy-800 dark:to-lime-500/10',
  ];

  return (
    <section id="benefits" ref={sectionRef} className="py-24 lg:py-32 bg-white dark:bg-navy-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            How Mira Makes Your Shop Run Smoother
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
           Here's what you'll notice once Mira starts handling your customer messages:
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${gradientColors[index]}
                         rounded-2xl p-8 text-center border border-gray-100 dark:border-navy-700 shadow-lg
                         hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-premium`}
            >
              {/* Icon container */}
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-lime-400 rounded-2xl 
                            flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/20
                            group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-navy-800" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-3">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
