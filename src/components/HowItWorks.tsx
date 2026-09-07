import { useSectionTracking } from '../hooks/useTracking';
import { STEPS } from '../content/pages';

const HowItWorks = () => {
  const sectionRef = useSectionTracking('how-it-works', 'How It Works Section');

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern">Set up once</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,1.5rem+2.6vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-ink [text-wrap:balance]">
              Live in an afternoon, not a quarter
            </h2>

            <div className="mt-9 overflow-hidden rounded-[1.5rem] bg-paper-raised">
              <img
                src="/images/shops/daily-drop.webp"
                alt="Fashion sellers moving a rack of new stock through the city"
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <ol className="divide-y divide-line border-y border-line">
              {STEPS.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-7 sm:grid-cols-[3rem_1fr]">
                  <span className="pt-1 font-mono text-xs text-fern">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-light">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 font-mono text-xs leading-relaxed text-ink-faint sm:text-sm">
              Sellogram reads only your shop's DMs, nothing else on your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
