import { Check } from 'lucide-react';
import { PLANS } from '../content/pages';
import { useCTATracking } from '../hooks/useTracking';
import EliteModalButton from './EliteModalButton';

const appUrl = 'https://app.sellogram.co';

const PricingMatrix = () => {
  const { trackCTA } = useCTATracking();

  return (
    <div className="grid gap-6 md:grid-cols-3 md:items-stretch md:gap-0 md:py-6">
      {PLANS.map((plan) => {
        const isFeatured = Boolean(plan.isHighlighted);
        return (
          <article
            key={plan.key}
            className={`flex flex-col ${
              isFeatured
                ? 'relative z-10 rounded-2xl bg-night p-8 text-ink shadow-[0_30px_80px_rgba(68,120,12,0.28)] md:-my-6 md:p-10'
                : 'border-y border-line py-10 md:px-10 md:first:pl-0 md:last:pr-0'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold text-ink">{plan.name}</h3>
              {isFeatured && (
                <p className="rounded-full border border-dawn-bright/40 px-3 py-1 font-mono text-xs uppercase tracking-wide text-dawn-bright">
                  Recommended
                </p>
              )}
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              {plan.pricePrefix && <span className="text-sm text-ink-light">{plan.pricePrefix}</span>}
              <span className="whitespace-nowrap font-mono text-4xl tracking-tight text-ink xl:text-5xl">{plan.price}</span>
              {plan.priceNote && (
                <span className={`text-sm ${isFeatured ? 'text-ink' : 'text-ink-light'}`}>{plan.priceNote}</span>
              )}
            </div>
            <p className={`mt-4 text-base leading-relaxed [text-wrap:pretty] ${isFeatured ? 'text-ink' : 'text-ink-light'}`}>
              {plan.description}
            </p>

            <ul className={`mt-8 space-y-3 border-t pt-8 ${isFeatured ? 'border-night-line/40' : 'border-line'}`}>
              {plan.featuresLead && <li className="text-sm font-semibold text-ink">{plan.featuresLead}</li>}
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    className={`mt-1 h-4 w-4 shrink-0 ${isFeatured ? 'text-fern-bright' : 'text-fern-deep'}`}
                    aria-hidden="true"
                  />
                  <span className={`text-sm leading-relaxed ${isFeatured ? 'text-ink' : 'text-ink-light'}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 md:mt-auto md:pt-10">
              {plan.key === 'elite' ? (
                <EliteModalButton
                  label={plan.cta}
                  location="pricing_page_matrix"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-ink/25 px-6 text-base font-medium text-ink transition duration-200 hover:border-ink hover:bg-ink/5 active:scale-[0.98] motion-reduce:active:scale-100"
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
                  className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 text-base font-semibold transition duration-200 active:scale-[0.98] motion-reduce:active:scale-100 ${
                    isFeatured
                      ? 'bg-ink text-paper hover:bg-ink-light'
                      : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
              {plan.footnote && (
                <p className={`mt-3 font-body text-xs ${isFeatured ? 'text-ink' : 'text-ink-faint'}`}>{plan.footnote}</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PricingMatrix;
