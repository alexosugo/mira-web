import { Check } from 'lucide-react';
import { PLANS } from '../content/pages';
import { useCTATracking } from '../hooks/useTracking';
import EliteModalButton from './EliteModalButton';

const appUrl = 'https://app.withmira.co';

const PricingMatrix = () => {
  const { trackCTA } = useCTATracking();

  return (
    <div className="border-y border-line">
      <div className="grid md:grid-cols-3 md:divide-x md:divide-line">
        {PLANS.map((plan) => (
          <article
            key={plan.key}
            className="flex flex-col border-b border-line py-10 last:border-b-0 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0"
          >
            <div className="min-h-[11rem]">
              {plan.isHighlighted && (
                <p className="mb-4 inline-flex border border-clay/25 px-3 py-1 font-mono text-xs uppercase tracking-wide text-clay">
                  Most picked
                </p>
              )}
              <h3 className="font-display text-2xl font-medium text-ink">{plan.name}</h3>
              <div className="mt-6 flex items-baseline gap-2">
                {plan.pricePrefix && <span className="text-sm text-ink-light">{plan.pricePrefix}</span>}
                <span className="font-mono text-3xl text-ink">{plan.price}</span>
                {plan.priceNote && <span className="text-sm text-ink-light">{plan.priceNote}</span>}
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-light">{plan.description}</p>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              {plan.featuresLead && <p className="mb-4 text-sm font-semibold text-ink">{plan.featuresLead}</p>}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 md:mt-auto md:pt-10">
              {plan.key === 'elite' ? (
                <EliteModalButton
                  label={plan.cta}
                  location="pricing_page_matrix"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-ink/25 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5"
                />
              ) : (
                <a
                  href={appUrl}
                  onClick={() =>
                    trackCTA(`pricing_${plan.key}_button`, plan.cta, 'pricing_page_matrix', {
                      button_location: 'pricing_page_matrix',
                      plan_type: plan.key,
                    })
                  }
                  className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 text-sm font-medium transition-colors duration-200 ${
                    plan.isHighlighted
                      ? 'bg-ink text-paper hover:bg-ink-light'
                      : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
              {plan.footnote && <p className="mt-3 font-mono text-xs text-ink-faint">{plan.footnote}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PricingMatrix;
