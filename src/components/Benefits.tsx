import { useSectionTracking } from '../hooks/useTracking';

const BENEFITS = [
  {
    title: 'Faster Responses',
    description: "Customers get answers right away, even when you're busy",
  },
  {
    title: 'Less Repetitive Work',
    description: "Mira handles the questions you get every day, so you don't have to repeat yourself",
  },
  {
    title: 'More Sales Opportunities',
    description: 'Customers stay engaged instead of drifting away when replies take too long.',
  },
  {
    title: 'Clearer Understanding of Your Customers',
    description: 'See the questions they ask most and where they hesitate, so you can improve your shop.',
  },
];

/**
 * Deliberately chip-free: Problem and Features already carry the icon-card
 * device, so the outcomes render as a plain typographic two-column list. The
 * title leads and the generous column gap carries the rhythm, giving this beat
 * a different shape from the carded sections around it.
 */
const Benefits = () => {
  const sectionRef = useSectionTracking('benefits', 'Benefits Section');

  return (
    <section id="benefits" ref={sectionRef} className="py-24 lg:py-32 bg-warm-100 dark:bg-navy-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight leading-[1.1] [text-wrap:balance]">
            The results you'll see
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Here's what changes once Mira starts handling your customer messages:
          </p>
        </div>

        {/* Outcomes: a typographic list, not cards */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title}>
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2 [text-wrap:balance]">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
