import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import EliteContactModal from './EliteContactModal';

interface Plan {
  key: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  featuresLead?: string;
  cta: string;
  footnote?: string;
  /** The highlighted tier carries the section's lime accent. */
  isHighlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    key: 'free',
    name: 'Free',
    price: 'KES 0',
    priceNote: '/mo',
    description: 'Try Mira on your own shop. No card needed.',
    features: [
      'Mira answers your Instagram DMs and comments',
      'Carts and checkout guidance inside the DM',
      'Up to 10 customer conversations a month',
    ],
    cta: 'Get started',
    footnote: 'No card details asked, ever.',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 'KES 3,500',
    priceNote: '/mo',
    description: 'For shops with steady DM traffic. Every message answered, day and night.',
    featuresLead: 'Everything in Free, plus:',
    features: [
      'Unlimited customer conversations',
      'Replies without Mira branding',
      'See what customers ask most',
      'Email support from the Mira team',
    ],
    cta: 'Become pro',
    footnote: '*price scales with how many customers you serve',
    isHighlighted: true,
  },
  {
    key: 'elite',
    name: 'Elite',
    price: 'Custom',
    description: 'For bigger shops and teams. A plan shaped around how you sell.',
    featuresLead: 'Everything in Pro, plus:',
    features: [
      'Onboarding for you and your team',
      'A dedicated contact who knows your shop',
      'Priority help with technical questions',
      'Custom integrations',
    ],
    cta: "Let's chat",
    footnote: '*priced to fit your shop',
  },
];

const Pricing = () => {
  const [isEliteModalOpen, setIsEliteModalOpen] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('pricing', 'Pricing Section');

  const handleCTAClick = (planName: string, buttonText: string) => {
    trackCTA(`pricing_${planName}_button`, buttonText, 'pricing', {
      button_location: 'pricing_section',
      plan_type: planName,
    });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-warm-50 to-white dark:from-navy-900 dark:to-navy-950"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight [text-wrap:balance]">
            Choose a Mira plan that works for you
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Start free, upgrade when the DMs do.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.isHighlighted
                  ? 'bg-navy-800 border-2 border-lime-500'
                  : 'bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700'
              }`}
            >
              {plan.isHighlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-lime-500 text-navy-800 text-xs font-bold">
                  Most popular
                </span>
              )}
              <h3
                className={`font-display text-2xl font-bold mb-2 ${
                  plan.isHighlighted ? 'text-white' : 'text-navy-800 dark:text-white'
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 leading-relaxed ${
                  plan.isHighlighted ? 'text-navy-100' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {plan.description}
              </p>
              <div className="mb-6 flex items-baseline">
                {/* Numeric prices render in mono (the data font); "Custom" is a word, stays display */}
                <span
                  className={`text-4xl lg:text-5xl ${
                    plan.price.startsWith('KES') ? 'stat-number' : 'font-display font-bold'
                  } ${plan.isHighlighted ? 'text-white' : 'text-navy-800 dark:text-white'}`}
                >
                  {plan.price}
                </span>
                {plan.priceNote && (
                  <span className={plan.isHighlighted ? 'text-navy-100 ml-1' : 'text-gray-600 dark:text-gray-400 ml-1'}>
                    {plan.priceNote}
                  </span>
                )}
              </div>

              {/* Features */}
              {plan.featuresLead && (
                <p
                  className={`text-sm font-semibold mb-3 ${
                    plan.isHighlighted ? 'text-navy-100' : 'text-navy-800 dark:text-white'
                  }`}
                >
                  {plan.featuresLead}
                </p>
              )}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        plan.isHighlighted ? 'text-lime-500' : 'text-navy-800 dark:text-navy-100'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        plan.isHighlighted ? 'text-navy-100' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {plan.key === 'elite' ? (
                  <button
                    onClick={() => {
                      handleCTAClick('elite', plan.cta);
                      setIsEliteModalOpen(true);
                    }}
                    className="block w-full py-3 px-6 rounded-xl bg-navy-800 text-white font-semibold
                               hover:bg-navy-900 transition-colors duration-200 mb-3 text-center
                               dark:bg-white dark:text-navy-800 dark:hover:bg-gray-100"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href="https://app.withmira.co"
                    onClick={() => handleCTAClick(plan.key, plan.cta)}
                    className={`block w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200 mb-3 text-center ${
                      plan.isHighlighted
                        ? 'bg-lime-500 text-navy-800 hover:bg-lime-400'
                        : 'border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-navy-800'
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
                {plan.footnote && (
                  <p
                    className={`text-xs text-center ${
                      plan.isHighlighted ? 'text-navy-100' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {plan.footnote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      <EliteContactModal
        isOpen={isEliteModalOpen}
        onClose={() => setIsEliteModalOpen(false)}
      />
    </section>
  );
};

export default Pricing;
