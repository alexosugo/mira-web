import { useSectionTracking } from '../hooks/useTracking';

/** A real 3-step sequence: the numbers carry information, so they stay. */
const STEPS = [
  {
    number: 1,
    title: 'Connect Your Instagram',
    description: 'Link your Instagram Business account. Takes less than two minutes.',
  },
  {
    number: 2,
    title: 'Mira Learns Your Catalog',
    description: 'Mira reads your products and learns how to talk about them like you would.',
  },
  {
    number: 3,
    title: 'Go Live',
    description: 'Mira starts replying to DMs. You step in whenever you want.',
  },
];

const HowItWorks = () => {
  const sectionRef = useSectionTracking('how-it-works', 'How It Works Section');

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-navy-950 font-body"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white tracking-tight leading-[1.1] [text-wrap:balance]">
            How Mira works
          </h2>
        </div>

        {/* An open, connected step-flow rather than a card grid: the three
            steps are a real sequence, so a connector line makes the order
            legible and gives the section a different shape from the carded
            sections around it. */}
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connector behind the number circles (desktop only). The three
              columns are centered, so circle centers land at 1/6 and 5/6 of
              the row; each circle's bg-matched ring masks the line beneath it. */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gray-200 dark:bg-navy-700"
          />
          {STEPS.map((step) => (
            <li key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-800 dark:bg-navy-700 font-display text-2xl font-bold text-white ring-8 ring-white dark:ring-navy-950">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base max-w-xs mx-auto">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Reassurance at the scariest step: handing over your Instagram.
            Answers "what can Mira touch?" — the access question the connect
            step raises. Features separately covers "we don't share your data". */}
        <p className="mt-10 lg:mt-12 text-center text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Mira reads only your shop's DMs, nothing else on your account.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
