import { useEffect, useRef, useState } from 'react';
import InstagramPostCard from './InstagramPostCard';
import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStage {
  readonly title: string;
  readonly visual: 'post' | 'image' | 'inbox';
  readonly image?: string;
  readonly imageAlt?: string;
  readonly sharedPost?: {
    readonly image: string;
    readonly imageAlt: string;
    readonly title: string;
  };
  readonly messages: readonly ShopDMMessage[];
}

const STAGES: readonly JourneyStage[] = [
  {
    title: '“Hi, is shade 08 still available?”',
    visual: 'post',
    image: '/images/journey/cocoa-rose-post-clean.webp',
    imageAlt: 'Cocoa Rose Beauty model applying shade 08 lip gloss in a Nairobi rooftop shoot',
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
    visual: 'image',
    image: '/images/journey/cocoa-rose-customer-clean.webp',
    imageAlt: 'Customer messaging Cocoa Rose Beauty from her Nairobi apartment',
    messages: [
      { from: 'customer', text: 'How much is delivery to Kilimani?' },
      { from: 'shop', text: 'Delivery to Kilimani is KSh 250.' },
    ],
  },
  {
    title: '“I’ll take it. Send me the payment details.”',
    visual: 'inbox',
    messages: [
      { from: 'customer', text: 'How much is delivery to Kilimani?' },
      { from: 'shop', text: 'Delivery to Kilimani is KSh 250.' },
      { from: 'customer', text: 'I’ll take it. Send me the payment details.' },
      { from: 'shop', text: 'Pay KSh 1,450 to M-Pesa Buy Goods till 946512.' },
    ],
  },
  {
    title: '“I’ve paid. Here’s the M-Pesa message.”',
    visual: 'image',
    image: '/images/journey/cocoa-rose-packing-v3.webp',
    imageAlt: 'Cocoa Rose Beauty owner packing the paid lip gloss order',
    messages: [
      { from: 'customer', text: 'I’ve paid. Here’s the M-Pesa message.' },
      { from: 'shop', text: 'Payment confirmed. We’re packing your order now.' },
    ],
  },
  {
    title: '“Rider ametoka.”',
    visual: 'image',
    image: '/images/journey/cocoa-rose-delivery-clean.webp',
    imageAlt: 'Piki piki rider delivering the beauty order at a Nairobi apartment gate',
    messages: [
      { from: 'shop', text: 'Rider ametoka. He’ll call when he gets to the gate.' },
      { from: 'customer', text: 'Sawa, thanks.' },
    ],
  },
];

const stageLabel = (stage: JourneyStage) => stage.title.slice(1, -1);

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
    <section id="dm-sales-journey" className="bg-cobalt text-paper">
      <div className="relative h-[500svh]">
        <div
          data-journey-panel
          className="sticky top-20 z-10 flex h-[calc(100svh-5rem)] min-h-[31rem] overflow-hidden"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 py-4 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h2 className="max-w-5xl shrink-0 font-display text-[clamp(1.65rem,1.35rem+1.3vw,3rem)] font-semibold leading-[1.02] tracking-tight [text-wrap:balance]">
              From “Is it available?” to “Rider ametoka”
            </h2>

            <div
              key={activeStage.title}
              className="animate-journey-fade my-auto grid min-h-0 grid-cols-1 items-center gap-3 pr-6 sm:gap-7 lg:grid-cols-12 lg:gap-12 lg:pr-8"
              aria-live="polite"
            >
              <div className="lg:col-span-5">
                <h3 className="max-w-[15ch] font-display text-[clamp(1.35rem,1.2rem+0.75vw,2.25rem)] font-semibold leading-[1.05] tracking-tight">
                  {activeStage.title}
                </h3>
                {activeStage.visual !== 'inbox' && (
                  <ShopDMCard
                    shopName="Cocoa Rose Beauty"
                    initials="CR"
                    messages={activeStage.messages}
                    sharedPost={activeStage.sharedPost}
                    className="mt-4 max-w-[22rem] sm:mt-5"
                    compact
                  />
                )}
              </div>

              <div className="lg:col-span-7">
                {activeStage.visual === 'post' && activeStage.image && activeStage.imageAlt && (
                  <InstagramPostCard image={activeStage.image} imageAlt={activeStage.imageAlt} />
                )}

                {activeStage.visual === 'inbox' && (
                  <div data-testid="journey-payment-inbox" className="mx-auto max-w-[32rem]">
                    <ShopDMCard
                      shopName="Cocoa Rose Beauty"
                      initials="CR"
                      messages={activeStage.messages}
                      className="shadow-[0_24px_80px_rgba(5,23,90,0.32)]"
                    />
                  </div>
                )}

                {activeStage.visual === 'image' && activeStage.image && activeStage.imageAlt && (
                  <div
                    data-journey-frame
                    className="h-[clamp(12rem,28svh,18rem)] overflow-hidden rounded-2xl bg-cobalt-deep lg:h-[min(54vh,31rem)]"
                  >
                    <img
                      src={activeStage.image}
                      alt={activeStage.imageAlt}
                      width="1672"
                      height="941"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1440px) 720px, (min-width: 1024px) 52vw, calc(100vw - 4.5rem)"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div
              className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1 sm:right-5 lg:right-8"
              aria-label="Order progress"
            >
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={stage.title}
                    type="button"
                    aria-label={`Show step ${index + 1}: ${stageLabel(stage)}`}
                    aria-current={isActive ? 'step' : undefined}
                    onClick={() => setActiveIndex(index)}
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                  >
                    <span
                      className={`block rounded-full border border-paper transition-[width,height,background-color] duration-150 ${
                        isActive ? 'h-3 w-3 bg-paper' : 'h-2 w-2 bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
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
