import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('pricing', 'Pricing Section');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('pricing');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCTAClick = (planName: string, buttonText: string) => {
    trackCTA(`pricing_${planName}_button`, buttonText, 'pricing', {
      button_location: 'pricing_section',
      plan_type: planName,
    });
  };

  const freeChannels = [
    'Instagram DMs & Comments',
    'WhatsApp (Coming Soon)',
    'TikTok (Coming Soon)',
  ];

  const proChannels = [
    'Instagram DMs & Comments',
    'WhatsApp (Coming Soon)',
    'TikTok (Coming Soon)',
  ];

  const eliteChannels = [
    'Instagram DMs & Comments',
    'WhatsApp (Coming Soon)',
    'TikTok (Coming Soon)',
    'Custom Integrations'
  ];

  const freeFeatures = [
    { bold: 'Automate conversations.', text: 'Unlimited interactions with up to 10 contacts' },
    { bold: 'Acquire new customers.', text: 'Access basic Growth Tools to drive leads to your automation' }
  ];

  const proFeatures = [
    { bold: 'Engage unlimited contacts.', text: 'Scaled pricing based on contacts' },
    { bold: 'Expand customer reach.', text: 'Unlimited Growth Tools' },
    { bold: 'Optimize performance.', text: 'Mira Analytics & Insights tools' },
    { bold: 'Make it your own.', text: 'No Mira branding' },
    { bold: 'Email support,', text: 'anytime' },
  ];

  const eliteFeatures = [
    { bold: 'Dedicated onboarding', text: 'for you and your team from our experts to get you up and running successfully' },
    { bold: 'Strategic recommendations', text: 'from your dedicated CSM' },
    { bold: 'Priority support', text: 'for technical questions' },
    { bold: 'Guided experience', text: 'to help you meet your business goals' },
    { bold: 'Access to expert crafted', text: 'automations' },
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-warm-50 to-white dark:from-navy-900 dark:to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-navy-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-8 tracking-tight">
            Choose a Mira plan that works for you
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Simple, transparent pricing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 mb-20 items-stretch transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Free Plan */}
          <div className="flex flex-col bg-white rounded-3xl p-8 border border-gray-200 dark:border-gray-300 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-h-[380px]">
            <h3 className="font-display text-2xl font-bold text-navy-800 mb-4">Free</h3>
            <p className="text-gray-600 text-sm mb-6 font-medium leading-relaxed min-h-[72px]">
              Get started with access to Mira basic features to engage up to 1,000 contacts FREE OF CHARGE:
            </p>
            <div className="mb-6 min-h-16 flex items-baseline">
              <span className="font-display text-4xl md:text-3xl lg:text-5xl font-bold text-navy-800">KES 0</span>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>
            <div className="mt-auto">
              <a
                href="https://app.withmira.co"
                onClick={() => handleCTAClick('free', 'Get started')}
                className="block w-full py-3 px-6 rounded-xl border-2 border-navy-800 text-navy-800 font-semibold hover:bg-navy-800 hover:text-white hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 mb-4 text-center"
              >
                Get started
              </a>
              <p className="text-gray-500 font-medium text-xs text-center">
                No credit card, or charge card, required!
              </p>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col bg-lime-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[380px]">
            <h3 className="font-display text-2xl font-bold text-navy-800 mb-4">Pro</h3>
            <p className="text-navy-700 text-sm mb-6 font-medium leading-relaxed min-h-[72px]">
              Grow your business with access to all advanced Pro features, starting at a cost of:
            </p>
            <div className="mb-6 min-h-16 flex items-baseline">
              <span className="font-display text-4xl md:text-3xl lg:text-5xl font-bold text-navy-800">KES 3,500</span>
              <span className="text-navy-600 ml-1">/mo</span>
            </div>
            <div className="mt-auto">
              <a
                href="https://app.withmira.co"
                onClick={() => handleCTAClick('pro', 'Become pro')}
                className="block w-full py-3 px-6 rounded-xl bg-navy-800 text-white font-semibold hover:bg-navy-900 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 mb-4 text-center"
              >
                Become pro
              </a>
              <p className="text-navy-700 font-medium text-xs text-center">
                *scales with number of contacts
              </p>
            </div>
          </div>

          {/* Elite Plan */}
          <div className="flex flex-col bg-navy-800 dark:bg-navy-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[380px]">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Elite</h3>
            <p className="text-gray-300 text-sm mb-6 font-medium leading-relaxed min-h-[72px]">
              Customize your Mira experience to meet (and exceed) your ambitious business goals.
            </p>
            <div className="mb-6 min-h-16 flex items-baseline">
              <span className="font-display text-4xl md:text-3xl lg:text-5xl font-bold text-white">Custom</span>
            </div>
            <div className="mt-auto">
              <a
                href="https://app.withmira.co"
                onClick={() => handleCTAClick('elite', "Let's chat")}
                className="block w-full py-3 px-6 rounded-xl bg-white text-navy-800 font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 mb-4 text-center"
              >
                Let's chat
              </a>
              <p className="text-gray-400 font-medium text-xs text-center">
                *customized to fit your needs
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-800 dark:text-white mb-12 text-center">
            Explore channels and features:
          </h2>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {/* Free Column */}
            <div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-navy-700">
                Free Plan — KES 0
              </h3>
              
              <div className="mb-10 min-h-[220px]">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Channel Access:
                </h4>
                <ul className="space-y-4">
                  {freeChannels.map((channel, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-800 font-medium dark:text-gray-200 text-sm">{channel}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Key features:
                </h4>
                <ul className="space-y-5">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        <span className="font-semibold text-navy-800 dark:text-white">{feature.bold}</span>{' '}
                        <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Column */}
            <div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-navy-700">
                Pro — KES 3,500
              </h3>
              
              <div className="mb-10 min-h-[220px]">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Channel Access:
                </h4>
                <ul className="space-y-4">
                  {proChannels.map((channel, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-800 dark:text-gray-200 text-sm font-medium">{channel}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Everything in Free, plus:
                </h4>
                <ul className="space-y-5">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        <span className="font-semibold text-navy-800 dark:text-white">{feature.bold}</span>{' '}
                        <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Elite Column */}
            <div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-navy-700">
                Everything in Pro, plus:
              </h3>
              
              <div className="mb-10 min-h-[220px]">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Channel Access:
                </h4>
                <ul className="space-y-4">
                  {eliteChannels.map((channel, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-800 dark:text-gray-200 text-sm font-medium">{channel}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 uppercase tracking-wide">
                  Everything in Pro, plus:
                </h4>
                <ul className="space-y-5">
                  {eliteFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        <span className="font-semibold text-navy-800 dark:text-white">{feature.bold}</span>{' '}
                        <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
