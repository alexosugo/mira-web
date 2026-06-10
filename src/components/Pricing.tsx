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
  /** The highlighted tier gets the lifted card, the fern ring, and the dawn tag. */
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
    <section id="pricing" ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-fern">Pricing</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-slate [text-wrap:balance]">
            Start free, upgrade when the DMs do
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`flex flex-col rounded-3xl bg-white p-7 sm:p-8 ${
                plan.isHighlighted
                  ? 'shadow-lifted ring-2 ring-fern'
                  : 'shadow-soft'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold text-slate">{plan.name}</h3>
                {plan.isHighlighted && (
                  <span className="rounded-full bg-dawn-tint px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-dawn">
                    Most popular
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                {plan.pricePrefix && (
                  <span className="text-sm text-slate-light">{plan.pricePrefix}</span>
                )}
                <span className="font-mono text-3xl text-slate">{plan.price}</span>
                {plan.priceNote && <span className="text-sm text-slate-light">{plan.priceNote}</span>}
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-light">{plan.description}</p>

              <ul className="mt-8 space-y-3">
                {plan.featuresLead && (
                  <li className="text-sm font-semibold text-slate">{plan.featuresLead}</li>
                )}
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-fern" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-slate-light">{feature}</span>
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
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-line px-6 text-sm font-semibold text-slate transition-colors duration-200 hover:border-slate-faint hover:bg-mist"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href="https://app.withmira.co"
                    onClick={() => handleCTAClick(plan.key, plan.cta)}
                    className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors duration-200 ${
                      plan.isHighlighted
                        ? 'bg-fern text-white hover:bg-fern-deep'
                        : 'border border-line text-slate hover:border-slate-faint hover:bg-mist'
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
                {plan.footnote && (
                  <p className="mt-3 font-mono text-xs text-slate-faint">{plan.footnote}</p>
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
