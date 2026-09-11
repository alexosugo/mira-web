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
      { from: 'shop', text: 'Pay KSh 1,450 to M-Pesa Buy Goods till 946512.', isMilestone: true },
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

const AUTO_ADVANCE_MS = 3200;

const DMSalesJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (hasInteracted || activeIndex === STAGES.length - 1) return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        timer = setTimeout(() => setActiveIndex((i) => Math.min(i + 1, STAGES.length - 1)), AUTO_ADVANCE_MS);
      } else if (timer) {
        clearTimeout(timer);
      }
    }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [activeIndex, hasInteracted]);

  const selectStage = (index: number) => {
    setHasInteracted(true);
    setActiveIndex(index);
  };

  const activeStage = STAGES[activeIndex] ?? STAGES[0];
  const dmStagesSoFar = STAGES.slice(0, activeIndex + 1).filter((stage): stage is DMJourneyStage => stage.visual === 'dm');
  const conversation = dmStagesSoFar.flatMap((stage) => stage.messages);
  const sharedPost = dmStagesSoFar.find((stage) => stage.sharedPost)?.sharedPost;

  return (
    <section id="dm-sales-journey" ref={sectionRef} className="py-6 sm:py-8 lg:py-10">
      <div className="px-2 sm:px-3">
        <div className="rounded-xl bg-night px-5 py-16 text-ink sm:rounded-2xl sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <h2 className="max-w-4xl font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.04] tracking-tight [text-wrap:balance]">
          From “Is it available?” to “Rider ametoka”
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-8 lg:mt-14 lg:gap-12">
          <div className="min-w-0 md:col-span-5 lg:col-span-4">
            <ol className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0" aria-label="Order progress">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={stage.title} aria-current={isActive ? 'step' : undefined} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => selectStage(index)}
                      className={`flex min-h-[44px] items-center gap-3 rounded-full px-4 text-left text-sm transition-colors duration-150 md:w-full md:rounded-xl md:px-4 md:py-3 md:text-base ${
                        isActive ? 'bg-ink text-paper' : 'text-ink-light hover:bg-night-raised hover:text-ink'
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? 'text-fern' : 'text-ink-light'}`}>{index + 1}</span>
                      <span className="font-medium">{stage.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <p key={activeStage.title} className="mt-6 max-w-[31rem] animate-journey-fade text-base leading-relaxed text-ink-light sm:text-lg" aria-live="polite">
              {activeStage.description}
            </p>
          </div>

          <div key={`${activeStage.title}-visual`} data-journey-visual className="min-w-0 animate-journey-fade md:col-span-7 lg:col-span-8">
            <div data-journey-frame className="relative ml-auto aspect-[4/3] w-full max-w-[40rem] overflow-hidden rounded-2xl bg-night-raised">
              {activeStage.visual === 'dm' ? (
                <div data-testid="journey-dm" className="h-full">
                  <ShopDMCard
                    shopName="Cocoa Rose Beauty"
                    initials="CR"
                    messages={conversation}
                    sharedPost={sharedPost}
                    className="h-full rounded-none border-0 bg-white shadow-none backdrop-blur-none [&>div:last-child]:flex [&>div:last-child]:h-[calc(100%-3.5rem)] [&>div:last-child]:flex-col [&>div:last-child]:justify-end [&>div:last-child]:space-y-3 sm:[&>div:last-child]:px-8 sm:[&>div:last-child]:pb-8"
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
    </section>
  );
};

export default DMSalesJourney;
