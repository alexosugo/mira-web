import { Clock, MessageSquare, Users, RefreshCw } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const PROBLEMS = [
  {
    icon: Users,
    title: 'Limited Time',
    description: "You can't be online all day, so customers end up waiting and sales slip away.",
  },
  {
    icon: MessageSquare,
    title: 'DMs Pile Up Overnight',
    description:
      'Price checks, sizes, "is this available?" Twenty DMs arrive while you sleep, and each one is a sale waiting.',
  },
  {
    icon: Clock,
    title: 'Slow Replies Hurt Sales',
    description: "A few hours' delay and customers move on. You lose the sale without even knowing.",
  },
  {
    icon: RefreshCw,
    title: 'The Same Questions, Every Day',
    description:
      '"How much?" "Do you have it?" "What colors?" Your time goes into repeating the same answers.',
  },
];

const ProblemStatement = () => {
  const sectionRef = useSectionTracking('problem_statement', 'Problem Statement Section');

  return (
    <section
      id="problem-statement"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-white to-warm-50 dark:from-navy-950 dark:to-navy-900"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight [text-wrap:balance]">
            Can't keep up with DMs?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            You're not alone. Most shops face the same problems every day.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.title}
              className="bg-white dark:bg-navy-800 p-8 rounded-2xl border border-gray-200 dark:border-navy-700"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-navy-800/[0.06] dark:bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <problem.icon className="h-6 w-6 text-navy-800 dark:text-navy-100" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2">
                    {problem.title}
                  </h3>
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
