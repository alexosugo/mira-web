import { useSectionTracking } from '../hooks/useTracking';

/** A real 3-step sequence: the numbers carry information, so they stay. */
const STEPS = [
  {
    number: '01',
    title: 'Connect your Instagram',
    description: 'Link your Instagram Business account. Takes less than two minutes.',
  },
  {
    number: '02',
    title: 'Mira learns your catalog',
    description: 'Mira reads your products and learns how to talk about them like you would.',
  },
  {
    number: '03',
    title: 'Go live',
    description: 'Mira starts replying to DMs. You step in whenever you want.',
  },
];

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
            <li key={step.number} className="border-t border-line pt-6">
              <span className="font-mono text-sm text-ink-faint">{step.number}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
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
