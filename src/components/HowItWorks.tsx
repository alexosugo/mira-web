import { Check } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';
import { DM_SCOPE_REASSURANCE, STEPS } from '../content/pages';

const LAST_STEP_INDEX = STEPS.length - 1;

const HowItWorks = () => {
  const sectionRef = useSectionTracking('how-it-works', 'How It Works Section');

  return (
    <section id="how-it-works" ref={sectionRef} className="py-6 sm:py-8 lg:py-10">
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-paper-raised px-6 py-14 sm:px-10 sm:py-16 lg:p-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <h2 className="max-w-xl font-display text-[clamp(2.25rem,1.4rem+3.2vw,4rem)] font-semibold leading-[0.98] tracking-tight text-ink [text-wrap:balance]">
                Put Sellogram to work this afternoon.
              </h2>

              <ol className="relative mt-12">
                <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-4 w-0.5 rounded-full bg-fern-deep/25" />
                {STEPS.map((step, index) => {
                  const isLaunch = index === LAST_STEP_INDEX;
                  return (
                    <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                      <span
                        aria-hidden="true"
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isLaunch ? 'bg-fern text-ink' : 'border-2 border-fern-deep bg-paper-raised text-fern-deep'
                        }`}
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </span>
                      <div className="pt-0.5">
                        <h3 className="text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
                        <p className="mt-1.5 max-w-md text-base leading-relaxed text-ink-light [text-wrap:pretty]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <figure className="relative pb-16 lg:col-span-6 lg:pb-0">
              <div className="overflow-hidden rounded-2xl bg-paper lg:rotate-1">
                <img
                  src="/images/shops/daily-drop.webp"
                  alt="Fashion sellers moving a rack of new stock through the city"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] h-auto w-full object-cover lg:aspect-[4/5]"
                />
              </div>
              <figcaption className="absolute -bottom-2 left-4 right-4 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink-light shadow-[0_24px_60px_rgba(19,30,9,0.16)] [text-wrap:pretty] sm:left-auto sm:right-6 sm:max-w-sm lg:-bottom-8 lg:-left-10 lg:right-auto">
                {DM_SCOPE_REASSURANCE} Anything it cannot answer, it hands to you.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
