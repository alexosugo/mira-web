import { useEffect, useState, useRef } from 'react';
import { Clock, MessageSquare, Users, RefreshCw } from 'lucide-react';

const ProblemStatement = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const problems = [
    {
      icon: Users,
      title: "Limited Time",
      description: "You can't be online all day, so customers end up waiting and sales slip away."
    },
    {
      icon: MessageSquare,
      title: "Too Many Channels",
      description: "WhatsApp here, Instagram there… keeping up with messages everywhere is overwhelming."
    },
    {
      icon: Clock,
      title: "Slow Replies Hurt Sales",
      description: "A few hours’ delay and customers move on. You lose the sale without even knowing."
    },
    {
      icon: RefreshCw,
      title: "The Same Questions, Every Day",
      description: "“How much?” “Do you have it?” “What colors?” Your time goes into repeating the same answers."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => prev.includes(index) ? prev : [...prev, index]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.problem-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-white to-warm-50 dark:from-navy-950 dark:to-navy-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            Can't keep up with DMs?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
           You’re not alone. Most shops face the same problems every day.
          </p>
        </div>
        
        {/* Problem cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              data-index={index}
              className={`problem-card group relative bg-white dark:bg-navy-800 p-8 rounded-2xl border border-gray-100 dark:border-navy-700
                         shadow-lg hover:shadow-xl dark:shadow-navy-900/50 transition-all duration-500 ease-premium
                         hover:-translate-y-1 ${
                           visibleCards.includes(index) 
                             ? 'opacity-100 translate-y-0' 
                             : 'opacity-0 translate-y-8'
                         }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Accent border on left */}
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-lime-500 to-lime-400 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-500/15 to-lime-500/5 
                               flex items-center justify-center flex-shrink-0
                               group-hover:from-lime-500/25 group-hover:to-lime-500/10 transition-all duration-300">
                  <problem.icon className="h-7 w-7 text-lime-600" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {problem.description}
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
