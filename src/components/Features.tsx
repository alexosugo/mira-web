import { Clock, Brain, Shield, Inbox } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';
import { useProductExpertExperiment, PRODUCT_EXPERT_COPY } from '../hooks/useExperiments';
import HandoffDemo from './HandoffDemo';

interface Feature {
  icon: LucideIcon;
  name: string;
  description: string;
  /** The lead feature carries the section's lime accent and a wider card. */
  isLead?: boolean;
}

const Features = () => {
  const trackingSectionRef = useSectionTracking('features', 'Features Section');
  const productExpert = useProductExpertExperiment();

  const features: Feature[] = [
    {
      icon: Clock,
      name: 'Answers anytime',
      description:
        'Customers get answers at 9 PM and 2 AM. You see closed sales in the morning.',
      isLead: true,
    },
    {
      icon: Inbox,
      name: 'Every DM answered',
      description:
        'Every Instagram DM gets a reply, even when twenty arrive at once. None sit unread.',
    },
    {
      icon: Brain,
      name: PRODUCT_EXPERT_COPY[productExpert].title,
      description: PRODUCT_EXPERT_COPY[productExpert].description,
    },
    {
      icon: Shield,
      name: 'Safe and private',
      description:
        'Conversations stay in your Instagram inbox. Mira never shares your customer list or your sales.',
    },
  ];

  return (
    <section
      id="features"
      className="py-24 lg:py-32 bg-white dark:bg-navy-950 font-body"
      ref={trackingSectionRef}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight leading-[1.1] [text-wrap:balance]">
            How Mira helps you run your shop
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            What Mira handles, and when it brings you in.
          </p>
        </div>

        {/* Feature grid: one lead card with the lime accent, three supporting */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-20">
          {features.map((feature) => (
            <div
              key={feature.name}
              className={`rounded-2xl border transition-colors duration-300 ${
                feature.isLead
                  ? 'md:col-span-3 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 p-7 sm:p-8 text-left bg-navy-800 dark:bg-navy-800 border-navy-700'
                  : 'p-7 text-left bg-white dark:bg-navy-900 border-gray-200 dark:border-navy-700'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  feature.isLead ? 'bg-lime-500' : 'bg-navy-800/[0.06] dark:bg-white/[0.08]'
                }`}
              >
                <feature.icon
                  className={`h-6 w-6 ${
                    feature.isLead ? 'text-navy-800' : 'text-navy-800 dark:text-navy-100'
                  }`}
                />
              </div>
              <div className={feature.isLead ? '' : 'mt-5'}>
                <h3
                  className={`font-display text-2xl font-bold mb-2 ${
                    feature.isLead ? 'text-white' : 'text-navy-800 dark:text-white'
                  }`}
                >
                  {feature.name}
                </h3>
                <p
                  className={`leading-relaxed text-base ${
                    feature.isLead ? 'text-navy-100' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The handoff: what happens when a customer needs the owner */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white mb-6 tracking-tight [text-wrap:balance]">
              A helping hand that knows its limits
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Mira keeps conversations moving by answering the questions customers ask every
              day: what's available, what something costs, how to order, or how to pay. When a
              customer needs you personally, Mira brings you in with everything already
              explained.
            </p>
          </div>

          <HandoffDemo />
        </div>
      </div>
    </section>
  );
};

export default Features;
