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
      className="py-24 lg:py-32 bg-white dark:bg-navy-950 font-body"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white tracking-tight [text-wrap:balance]">
            How Mira works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-2xl p-8 text-left"
            >
              <div className="w-12 h-12 bg-navy-800 dark:bg-navy-700 text-white font-bold rounded-full flex items-center justify-center text-xl mb-6 font-display">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>

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
