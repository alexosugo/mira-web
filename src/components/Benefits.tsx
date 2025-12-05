import { useEffect, useState } from 'react';
import { Clock, Settings, TrendingUp, BarChart3 } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const Benefits = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [counters, setCounters] = useState({ response: 0, efficiency: 0, sales: 0 });
  const sectionRef = useSectionTracking('benefits', 'Benefits Section');

  const benefits = [
    {
      icon: Clock,
      title: "Faster Responses",
      description: "Customers get answers right away, even when you're busy.",
      metric: "40%"
    },
    {
      icon: Settings,
      title: "Less Repetitive Work",
      description: "Mira handles the questions you get every day, so you don't have to repeat yourself.",
      metric: "80%"
    },
    {
      icon: TrendingUp,
      title: "More Sales Opportunities",
      description: "Customers stay engaged instead of drifting away when replies take too long.",
      metric: "25%"
    },
    {
      icon: BarChart3,
      title: "Clearer Understanding of Your Customers",
      description: "See the questions they ask most and where they hesitate, so you can improve your shop.",
      metric: "100%"
    }
  ];

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
            
            setTimeout(() => {
              if (index === 0) animateCounter('response', 40);
              if (index === 1) animateCounter('efficiency', 80);
              if (index === 2) animateCounter('sales', 25);
            }, index * 150);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const observeElements = () => {
      const cards = document.querySelectorAll('.benefit-card');
      cards.forEach(card => {
        if (card) observer.observe(card);
      });
    };

    requestAnimationFrame(observeElements);
    return () => observer.disconnect();
  }, []);

  const animateCounter = (key: keyof typeof counters, target: number) => {
    let current = 0;
    const duration = 1500;
    const steps = 60;
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

  const gradientColors = [
    'from-lime-500/10 via-white to-navy-500/5 dark:from-lime-500/10 dark:via-navy-800 dark:to-navy-800',
    'from-navy-500/5 via-white to-lime-500/10 dark:from-navy-700 dark:via-navy-800 dark:to-lime-500/10',
    'from-lime-500/10 via-white to-navy-500/5 dark:from-lime-500/10 dark:via-navy-800 dark:to-navy-800',
    'from-amber-500/10 via-white to-lime-500/10 dark:from-amber-500/10 dark:via-navy-800 dark:to-lime-500/10',
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
           Here’s what you’ll notice once Mira starts handling your customer messages:
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              data-index={index}
              className={`benefit-card group relative bg-gradient-to-br ${gradientColors[index]} 
                         rounded-2xl p-8 text-center border border-gray-100 dark:border-navy-700 shadow-lg
                         hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-premium
                         ${visibleCards.includes(index) 
                           ? 'opacity-100 translate-y-0' 
                           : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon container */}
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-lime-400 rounded-2xl 
                            flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/20
                            group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-navy-800" />
              </div>
              
              {/* Animated metric */}
              <div className="font-mono text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-3">
                {index === 0 && counters.response}
                {index === 1 && counters.efficiency}
                {index === 2 && counters.sales}
                {index === 3 && "∞"}
                {index < 3 && <span className="text-lime-600">%</span>}
              </div>
              
              {/* Title */}
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-3">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {benefit.description.includes("40%") ? (
                  <>Reduce response times by up to <span className="font-mono font-medium">40%</span> with instant <span className="font-mono font-medium">24/7</span> support.</>
                ) : benefit.description.includes("80%") ? (
                  <>Automate <span className="font-mono font-medium">80%</span> of repetitive queries, freeing your team for high-value work.</>
                ) : benefit.description.includes("25%") ? (
                  <>Boost conversions by <span className="font-mono font-medium">25%</span> with always-on customer engagement.</>
                ) : (
                  benefit.description
                )}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
