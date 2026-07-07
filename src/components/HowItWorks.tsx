import { useSectionTracking } from '../hooks/useTracking';
import { STEPS } from '../content/pages';

const HowItWorks = () => {
  const sectionRef = useSectionTracking('how-it-works', 'How It Works Section');

  return (
    <section id="how-it-works" ref={sectionRef} className="border-t border-line py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="kicker text-ink-light">How it works</p>
        <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-ink [text-wrap:balance]">
          Live in an afternoon, not a quarter
        </h2>

        <ol className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-20">
          {STEPS.map((step) => (
            <li key={step.title} className="border-t border-line pt-6">
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-light">{step.description}</p>
            </li>
          ))}
        </ol>

        {/* Reassurance at the scariest step: handing over your Instagram. */}
        <p className="mt-14 font-mono text-xs text-ink-faint sm:text-sm">
          Mira reads only your shop's DMs, nothing else on your account.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
