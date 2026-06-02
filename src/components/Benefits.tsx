import { Clock, Settings, TrendingUp, BarChart3 } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Faster Responses',
    description: "Customers get answers right away, even when you're busy",
  },
  {
    icon: Settings,
    title: 'Less Repetitive Work',
    description: "Mira handles the questions you get every day, so you don't have to repeat yourself",
  },
  {
    icon: TrendingUp,
    title: 'More Sales Opportunities',
    description: 'Customers stay engaged instead of drifting away when replies take too long.',
  },
  {
    icon: BarChart3,
    title: 'Clearer Understanding of Your Customers',
    description: 'See the questions they ask most and where they hesitate, so you can improve your shop.',
  },
];

/**
 * Deliberately not a card grid: ProblemStatement already uses cards, so the
 * outcomes render as a plain two-column list to vary the page's rhythm.
 */
const Benefits = () => {
  const sectionRef = useSectionTracking('benefits', 'Benefits Section');

  return (
    <section id="benefits" ref={sectionRef} className="py-24 lg:py-32 bg-white dark:bg-navy-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight [text-wrap:balance]">
            The Results You'll See
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Here's what changes once Mira starts handling your customer messages:
          </p>
        </div>

        {/* Outcomes list */}
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-navy-800/[0.06] dark:bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-navy-800 dark:text-navy-100" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2 [text-wrap:balance]">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
