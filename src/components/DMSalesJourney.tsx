import { useEffect, useRef, useState } from 'react';
import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStageBase {
  readonly title: string;
  readonly description: string;
}

interface DMJourneyStage extends JourneyStageBase {
  readonly visual: 'dm';
  readonly sharedPost?: {
    readonly image: string;
    readonly imageAlt: string;
    readonly title: string;
  };
  readonly messages: readonly ShopDMMessage[];
}

interface PhotoJourneyStage extends JourneyStageBase {
  readonly visual: 'photo';
  readonly image: string;
  readonly imageAlt: string;
}

type JourneyStage = DMJourneyStage | PhotoJourneyStage;

const STAGES: readonly JourneyStage[] = [
  {
    title: '“Hi, is shade 08 still available?”',
    description: 'A customer shares your post to your DMs. Your shop confirms the stock and price.',
    visual: 'dm',
    sharedPost: {
      image: '/images/journey/cocoa-rose-post-clean.webp',
      imageAlt: '',
      title: 'Shade 08 lip gloss',
    },
    messages: [
      { from: 'customer', text: 'Hi, is shade 08 still available?' },
      { from: 'shop', text: 'Yes. Shade 08 is in stock. It’s KSh 1,200.' },
    ],
  },
  {
    title: '“How much is delivery to Kilimani?”',
    description: 'Your shop sends the delivery fee in the same chat.',
    visual: 'dm',
    messages: [
      { from: 'customer', text: 'How much is delivery to Kilimani?' },
      { from: 'shop', text: 'Delivery to Kilimani is KSh 250.' },
    ],
  },
  {
    title: '“I’ll take it. Send me the payment details.”',
    description: 'Your shop sends its M-Pesa Buy Goods number.',
    visual: 'dm',
    messages: [
      { from: 'customer', text: 'I’ll take it. Send me the payment details.' },
      { from: 'shop', text: 'Pay KSh 1,450 to M-Pesa Buy Goods till 946512.' },
    ],
  },
  {
    title: '“Paid.”',
    description: 'You mark the payment as confirmed and pack the order.',
    visual: 'photo',
    image: '/images/journey/cocoa-rose-packing-v3.webp',
    imageAlt: 'Cocoa Rose Beauty owner packing the paid lip gloss order',
  },
  {
    title: '“Rider ametoka.”',
    description: 'Your customer gets the dispatch update from your shop.',
    visual: 'photo',
    image: '/images/journey/cocoa-rose-delivery-clean.webp',
    imageAlt: 'Piki piki rider delivering the beauty order at a Nairobi apartment gate',
  },
];

const DMSalesJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const triggerIndices = new Map<Element, number>();
    for (const [index, trigger] of triggerRefs.current.entries()) {
      if (trigger) triggerIndices.set(trigger, index);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = triggerIndices.get(entry.target);
          if (index !== undefined) setActiveIndex(index);
        }
      },
      { rootMargin: '-49% 0px -49%', threshold: 0 }
    );

    for (const trigger of triggerIndices.keys()) observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  const activeStage = STAGES[activeIndex] ?? STAGES[0];

  return (
    <section id="dm-sales-journey" className="bg-night text-paper">
      <div className="relative h-[500svh]">
        <div
          data-journey-panel
          className="sticky top-20 z-10 flex h-[calc(100svh-5rem)] min-h-[36rem] overflow-hidden"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <h2 className="max-w-4xl shrink-0 font-display text-[clamp(1.6rem,1.35rem+1vw,2.5rem)] font-semibold leading-[1.05] tracking-tight [text-wrap:balance]">
              From “Is it available?” to “Rider ametoka”
            </h2>

            <div className="my-auto grid min-h-0 flex-1 grid-cols-1 items-center gap-6 py-6 md:grid-cols-12 md:gap-8 lg:gap-12">
              <div className="flex flex-col gap-6 md:col-span-5 md:flex-row md:items-center lg:col-span-4">
                <ol
                  className="flex shrink-0 gap-3 md:flex-col"
                  aria-label="Order progress"
                >
                  {STAGES.map((stage, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li
                        key={stage.title}
                        aria-current={isActive ? 'step' : undefined}
                        className="flex h-3 w-3 items-center justify-center"
                      >
                        <span
                          className={`block h-2 w-2 rounded-full transition-colors duration-150 ${
                            isActive ? 'bg-paper ring-1 ring-paper/60' : 'bg-paper/30'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="sr-only">Step {index + 1} of {STAGES.length}</span>
                      </li>
                    );
                  })}
                </ol>

                <div key={activeStage.title} className="animate-journey-fade" aria-live="polite">
                  <h3 className="max-w-[17ch] font-display text-[clamp(1.35rem,1.15rem+0.65vw,2rem)] font-semibold leading-[1.08] tracking-tight">
                    {activeStage.title}
                  </h3>
                  <p className="mt-4 max-w-[31rem] text-base leading-relaxed text-paper/75 sm:text-lg md:max-w-[24rem]">
                    {activeStage.description}
                  </p>
                </div>
              </div>

              <div
                key={`${activeStage.title}-visual`}
                data-journey-visual
                className="animate-journey-fade md:col-span-7 lg:col-span-8"
              >
                <div
                  data-journey-frame
                  className="relative ml-auto aspect-[4/3] w-full max-w-[40rem] overflow-hidden rounded-2xl bg-night-raised"
                >
                  {activeStage.visual === 'dm' ? (
                    <div data-testid="journey-dm" className="h-full">
                      <ShopDMCard
                        shopName="Cocoa Rose Beauty"
                        initials="CR"
                        messages={activeStage.messages}
                        sharedPost={activeStage.sharedPost}
                        className="h-full rounded-none border-0 bg-white shadow-none backdrop-blur-none [&>div:last-child]:flex [&>div:last-child]:h-[calc(100%-3.5rem)] [&>div:last-child]:flex-col [&>div:last-child]:justify-center [&>div:last-child]:space-y-3 sm:[&>div:last-child]:px-8"
                      />
                    </div>
                  ) : (
                    <img
                      src={activeStage.image}
                      alt={activeStage.imageAlt}
                      width="1672"
                      height="941"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1440px) 640px, (min-width: 768px) 58vw, calc(100vw - 2.5rem)"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0" aria-hidden="true">
          {STAGES.map((stage, index) => (
            <div
              key={stage.title}
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              className="h-svh"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DMSalesJourney;
