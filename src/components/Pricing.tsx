import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import EliteContactModal from './EliteContactModal';

interface Plan {
  key: string;
  name: string;
  /** Small qualifier rendered before the price, e.g. "from". */
  pricePrefix?: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  featuresLead?: string;
  cta: string;
  footnote?: string;
  /** The highlighted tier gets the filled button and the dawn tag. */
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
    pricePrefix: 'from',
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
    footnote: 'Scales with your shop as you grow.',
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
    footnote: 'Priced to fit your shop.',
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
    <section id="pricing" ref={sectionRef} className="border-t border-line py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="kicker text-ink-light">Pricing</p>
        <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-ink [text-wrap:balance]">
          Start free, upgrade when the DMs do
        </h2>

        {/* Three hairline columns rather than shadowed cards. */}
        <div className="mt-16 grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line lg:mt-20">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className="flex flex-col border-b border-line py-10 last:border-b-0 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="font-display text-2xl font-medium text-ink">{plan.name}</h3>

              <div className="mt-6 flex items-baseline gap-2">
                {plan.pricePrefix && (
                  <span className="text-sm text-ink-light">{plan.pricePrefix}</span>
                )}
                <span className="font-mono text-3xl text-ink">{plan.price}</span>
                {plan.priceNote && <span className="text-sm text-ink-light">{plan.priceNote}</span>}
              </div>

              <p className="mt-4 text-base leading-relaxed text-ink-light">{plan.description}</p>

              <ul className="mt-8 space-y-3">
                {plan.featuresLead && (
                  <li className="text-sm font-semibold text-ink">{plan.featuresLead}</li>
                )}
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 md:mt-auto md:pt-10">
                {plan.key === 'elite' ? (
                  <button
                    onClick={() => {
                      handleCTAClick('elite', plan.cta);
                      setIsEliteModalOpen(true);
                    }}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-ink/25 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href="https://app.withmira.co"
                    onClick={() => handleCTAClick(plan.key, plan.cta)}
                    className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 text-sm font-medium transition-colors duration-200 ${
                      plan.isHighlighted
                        ? 'bg-fern text-paper hover:bg-fern-deep'
                        : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5'
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
                {plan.footnote && (
                  <p className="mt-3 font-mono text-xs text-ink-faint">{plan.footnote}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EliteContactModal isOpen={isEliteModalOpen} onClose={() => setIsEliteModalOpen(false)} />
    </section>
  );
};

export default Pricing;
