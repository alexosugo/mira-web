import { Instagram, Sparkles, Zap } from 'lucide-react';
import { useSectionTracking } from '../hooks/useTracking';

const steps = [
  {
    icon: Instagram,
    number: 1,
    title: 'Connect Your Instagram',
    description: 'Link your Instagram Business account. Takes less than two minutes.',
  },
  {
    icon: Sparkles,
    number: 2,
    title: 'Mira Learns Your Catalog',
    description: 'Mira reads your products and learns how to talk about them like you would.',
  },
  {
    icon: Zap,
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-600 dark:text-lime-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
            3 Simple Steps
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            How Mira Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass-card dark:bg-navy-800/50 dark:border-navy-700 rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-premium"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-lime-500 text-navy-800 font-bold rounded-full flex items-center justify-center text-xl">
                  {step.number}
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500/20 to-lime-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-8 w-8 text-lime-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
