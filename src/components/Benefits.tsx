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
 * The one dark beat in the light flow: a full navy section breaks the run of
 * warm/white sections, kills the near-invisible features->benefits seam, and
 * gives the page a mid-scroll gear-change before pricing. Chip-free still: the
 * outcomes are a left-aligned typographic two-column list, so it reads as its
 * own editorial moment rather than another carded grid (or the centered
 * Solution slab). Light text in both themes since the surface is navy either way.
 */
const Benefits = () => {
  const sectionRef = useSectionTracking('benefits', 'Benefits Section');

  return (
    <section id="benefits" ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-navy-800 dark:bg-navy-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header — left-aligned editorial, the second deliberate break
            in the centered-header cadence (paired with ProblemStatement). */}
        <div className="mb-14 lg:mb-16 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1] [text-wrap:balance]">
            The results you'll see
          </h2>
          <p className="text-lg lg:text-xl text-navy-100 leading-relaxed">
            Here's what changes once Mira starts handling your customer messages:
          </p>
        </div>

        {/* Outcomes: a typographic list, not cards */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title}>
              <h3 className="font-display text-2xl font-bold text-white mb-2 [text-wrap:balance]">
                {benefit.title}
              </h3>
              <p className="text-navy-100 leading-relaxed">
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
