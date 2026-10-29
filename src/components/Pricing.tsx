import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { PLANS } from '../content/pages';
import EliteContactModal from './EliteContactModal';

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
    <section id="pricing" ref={sectionRef} className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-xl font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.04] tracking-tight text-ink [text-wrap:balance]">
          Start free. Pay when you need more.
        </h2>

        {/* Three hairline columns rather than shadowed cards. */}
        <div className="mt-16 grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line lg:mt-20">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className="flex flex-col border-b border-line py-10 last:border-b-0 md:row-span-3 md:grid md:grid-rows-[subgrid] md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <div>
                <p className={`mb-4 border border-dawn/30 px-3 py-1 font-mono text-xs uppercase tracking-wide text-dawn-deep ${plan.isHighlighted ? 'inline-flex' : 'hidden md:invisible md:inline-flex'}`} aria-hidden={!plan.isHighlighted}>
                  Recommended
                </p>
                <h3 className="font-display text-2xl font-semibold text-ink">{plan.name}</h3>

                <div className="mt-6 flex items-baseline gap-2">
                  {plan.pricePrefix && (
                    <span className="text-sm text-ink-light">{plan.pricePrefix}</span>
                  )}
                  <span className="font-mono text-3xl text-ink">{plan.price}</span>
                  {plan.priceNote && <span className="text-sm text-ink-light">{plan.priceNote}</span>}
                </div>

                <p className="mt-4 text-base leading-relaxed text-ink-light">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-3 border-t border-line pt-8">
                <li className={`text-sm font-semibold text-ink ${plan.featuresLead ? '' : 'hidden md:block md:invisible'}`} aria-hidden={!plan.featuresLead}>
                  {plan.featuresLead || 'Everything in Free, plus:'}
                </li>
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
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-ink/25 px-6 text-sm font-medium text-ink transition duration-200 hover:border-ink hover:bg-ink/5 active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href="https://app.sellogram.co"
                    onClick={() => handleCTAClick(plan.key, plan.cta)}
                  className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 text-sm font-medium transition duration-200 active:scale-[0.98] motion-reduce:active:scale-100 ${
                      plan.isHighlighted
                        ? 'bg-fern text-ink hover:bg-fern-deep hover:text-paper'
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
