import { useEffect, useRef, useState } from 'react';
import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStage {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly objectPosition?: string;
  readonly messages: readonly ShopDMMessage[];
}

const STAGES: readonly JourneyStage[] = [
  {
    title: '“Hi, is shade 08 still available?”',
    description:
      'Sellogram checks Cocoa Rose Beauty’s product details and replies with the shade, price and stock.',
    image: '/images/journey/cocoa-rose-product.webp',
    imageAlt: 'Cocoa Rose Beauty owner arranging lip gloss shades in her studio',
    imageWidth: 1122,
    imageHeight: 1402,
    messages: [
      { from: 'customer', text: 'Hi, is shade 08 still available?' },
      { from: 'shop', text: 'Yes, it is. The gloss is KSh 1,200.' },
    ],
  },
  {
    title: '“How much is delivery to Kilimani?”',
    description:
      'The customer shares her location. Sellogram replies with the delivery fee and when the rider can come.',
    image: '/images/journey/cocoa-rose-location.webp',
    imageAlt: 'Cocoa Rose Beauty team photographing a beauty product on a Nairobi balcony',
    imageWidth: 1536,
    imageHeight: 1024,
    messages: [
      { from: 'customer', text: 'How much is delivery to Kilimani?' },
      { from: 'shop', text: 'KSh 250. Rider can come this afternoon.' },
    ],
  },
  {
    title: '“Sent to the M-Pesa number.”',
    description:
      'Sellogram asks the shop owner to confirm the payment. Once confirmed, the customer gets the next update in the DM.',
    image: '/images/journey/cocoa-rose-packing.webp',
    imageAlt: 'Cocoa Rose Beauty owner packing a customer order in her studio',
    imageWidth: 1122,
    imageHeight: 1402,
    messages: [
      { from: 'customer', text: 'Sent to the M-Pesa number.' },
      { from: 'shop', text: 'Payment confirmed. We’re packing your order now.' },
    ],
  },
  {
    title: '“Rider ametoka.”',
    description:
      'The rider leaves with the order. Sellogram sends the update from Cocoa Rose Beauty’s account.',
    image: '/images/journey/cocoa-rose-delivery.webp',
    imageAlt: 'Piki piki rider delivering a Cocoa Rose Beauty order at a customer’s gate',
    imageWidth: 1672,
    imageHeight: 941,
    objectPosition: '34% center',
    messages: [
      { from: 'shop', text: 'Rider ametoka. He’ll call when he gets to the gate.' },
      { from: 'customer', text: 'Sawa, thanks.' },
    ],
  },
];

const JourneyVisual = ({ stage, compact = false }: { stage: JourneyStage; compact?: boolean }) => (
  <div className="relative min-w-0">
    <div
      data-journey-frame
      className="aspect-[4/3] overflow-hidden rounded-xl bg-paper-raised sm:rounded-2xl"
    >
      <img
        src={stage.image}
        alt={stage.imageAlt}
        width={stage.imageWidth}
        height={stage.imageHeight}
        loading="lazy"
        decoding="async"
        sizes={compact ? '(min-width: 768px) 704px, calc(100vw - 2.5rem)' : '(min-width: 1440px) 720px, 52vw'}
        className="h-full w-full object-cover"
        style={{ objectPosition: stage.objectPosition }}
      />
    </div>
    <div className="relative z-10 mx-3 -mt-12 sm:mx-5 sm:-mt-20 lg:absolute lg:bottom-5 lg:right-5 lg:mx-0 lg:mt-0 lg:w-[48%]">
      <ShopDMCard
        shopName="Cocoa Rose Beauty"
        initials="CR"
        messages={stage.messages}
        className="ml-auto max-w-[21rem]"
        compact={compact}
      />
    </div>
  </div>
);

const DMSalesJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry) return;

        const nextIndex = Number((visibleEntry.target as HTMLElement).dataset.stepIndex);
        if (Number.isInteger(nextIndex)) setActiveIndex(nextIndex);
      },
      { rootMargin: '-42% 0px -42%', threshold: 0 }
    );

    for (const step of stepRefs.current) {
      if (step) observer.observe(step);
    }

    return () => observer.disconnect();
  }, []);

  const showStage = (index: number) => {
    setActiveIndex(index);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    stepRefs.current[index]?.scrollIntoView?.({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  const activeStage = STAGES[activeIndex] ?? STAGES[0];

  return (
    <section id="dm-sales-journey" className="bg-white/35 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-5xl font-display text-[clamp(2rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-ink [text-wrap:balance]">
          From “Is it available?” to “Rider ametoka”
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          One customer. One order. From the first question to the delivery update.
        </p>

        <div className="mt-12 hidden grid-cols-12 gap-10 lg:grid xl:gap-16">
          <ol className="col-span-5">
            {STAGES.map((stage, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={stage.title}
                  ref={(node) => { stepRefs.current[index] = node; }}
                  data-step-index={index}
                  className="relative flex min-h-[52vh] gap-5 pb-16 last:min-h-[46vh] last:pb-0"
                >
                  {index < STAGES.length - 1 && (
                    <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-ink/15" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    aria-label={`Show step ${index + 1}: ${stage.title.slice(1, -1)}`}
                    aria-current={isActive ? 'step' : undefined}
                    onClick={() => showStage(index)}
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  >
                    <span
                      className={`block rounded-full transition-all ${isActive ? 'h-4 w-4 bg-cobalt' : 'h-2.5 w-2.5 bg-ink/30'}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div className={`pt-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-45'}`}>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                      {stage.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="col-span-7 self-start lg:sticky lg:top-24">
            <div key={activeStage.image} data-testid="journey-desktop-visual" className="ml-auto max-w-[720px] animate-fade-in-up">
              <JourneyVisual stage={activeStage} />
            </div>
          </div>
        </div>

        <ol data-testid="journey-mobile-story" className="mt-12 space-y-14 lg:hidden">
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="relative pl-8">
              {index < STAGES.length - 1 && (
                <span className="absolute left-[5px] top-4 h-[calc(100%+3.5rem)] w-px bg-ink/15" aria-hidden="true" />
              )}
              <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-cobalt" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                {stage.description}
              </p>
              <div className="mt-6">
                <JourneyVisual stage={stage} compact />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default DMSalesJourney;
