import { useSectionTracking } from '../hooks/useTracking';
import { STEPS } from '../content/pages';

const HowItWorks = () => {
  const sectionRef = useSectionTracking('how-it-works', 'How It Works Section');

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-paper-raised py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.04] tracking-tight text-ink [text-wrap:balance]">
              Put Sellogram to work this afternoon.
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
            <ol className="space-y-9">
              {STEPS.map((step) => (
                <li key={step.title}>
                  <div>
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-light">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
