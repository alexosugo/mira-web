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
    <section id="how-it-works" ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-fern">How it works</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-slate [text-wrap:balance]">
            Live in an afternoon, not a quarter
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative rounded-3xl bg-white p-7 shadow-soft sm:p-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fern font-mono text-sm text-white">
                  {step.number}
                </span>
                {/* Connector to the next step; hidden on the last card and on mobile */}
                {index < STEPS.length - 1 && (
                  <span
                    className="hidden h-px flex-1 bg-line sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-light">{step.description}</p>
            </li>
          ))}
        </ol>

        {/* Reassurance at the scariest step: handing over your Instagram. */}
        <p className="mt-10 text-center font-mono text-xs text-slate-faint sm:text-sm">
          Mira reads only your shop's DMs, nothing else on your account.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
