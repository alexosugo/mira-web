import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';
import { prefersReducedMotion } from '../lib/motion';

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

const LAST_INDEX = STAGES.length - 1;
const EASE_OUT_QUINT = 'ease-[cubic-bezier(0.22,1,0.36,1)]';
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const hiddenUnless = (isShown: boolean) => (isShown ? {} : { 'aria-hidden': true, inert: '' });

const layerClass = (isActive: boolean) =>
  `absolute inset-0 transition-[opacity,transform] duration-500 ${EASE_OUT_QUINT} ${
    isActive ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.02] opacity-0'
  }`;

const DMSalesJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [line, setLine] = useState({ top: 0, height: 0, active: 0, next: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const isAutoplaying = !hasInteracted && !isReducedMotion && activeIndex < LAST_INDEX;

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion());
    const frame = sectionRef.current?.querySelector('[data-journey-frame]');
    if (typeof IntersectionObserver === 'undefined' || !frame) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(Boolean(entry?.isIntersecting)), { threshold: 0.5 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const measureLine = useCallback(() => {
    const list = listRef.current;
    const first = markerRefs.current[0];
    const last = markerRefs.current[LAST_INDEX];
    const active = markerRefs.current[activeIndex];
    const next = markerRefs.current[Math.min(activeIndex + 1, LAST_INDEX)];
    if (!list || !first || !last || !active || !next) return;
    const listTop = list.getBoundingClientRect().top;
    const centerOf = (marker: HTMLElement) => {
      const rect = marker.getBoundingClientRect();
      return rect.top - listTop + rect.height / 2;
    };
    const top = centerOf(first);
    setLine({ top, height: centerOf(last) - top, active: centerOf(active) - top, next: centerOf(next) - top });
  }, [activeIndex]);

  useIsomorphicLayoutEffect(() => {
    measureLine();
    if (typeof ResizeObserver === 'undefined' || !listRef.current) return;
    const observer = new ResizeObserver(measureLine);
    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [measureLine]);

  const selectStage = (index: number) => {
    setHasInteracted(true);
    setActiveIndex(index);
  };

  const advanceStage = () => setActiveIndex((index) => Math.min(index + 1, LAST_INDEX));

  const activeStage = STAGES[activeIndex] ?? STAGES[0];
  const dmStagesSoFar = STAGES.slice(0, activeIndex + 1).filter((stage): stage is DMJourneyStage => stage.visual === 'dm');
  const conversation = dmStagesSoFar.flatMap((stage) => stage.messages);
  const sharedPost = dmStagesSoFar.find((stage) => stage.sharedPost)?.sharedPost;
  const isDMActive = activeStage.visual === 'dm';

  return (
    <section
      id="dm-sales-journey"
      ref={sectionRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] rounded-xl bg-night p-6 text-ink sm:rounded-2xl sm:p-10 lg:p-16">
          <div className="grid gap-8 lg:gap-12 xl:grid-cols-12">
            <div className="contents min-w-0 xl:col-span-5 xl:block">
              <h2 className="order-1 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.04] tracking-tight [text-wrap:balance]">
                From “Is it available?” to “Rider ametoka”
              </h2>

              <div className="relative order-3 xl:mt-10">
                <div
                  data-journey-connector
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[13px] w-0.5 bg-ink/20"
                  style={{ top: line.top, height: line.height }}
                >
                  <div
                    className={`h-full w-full origin-top bg-ink ${hasInteracted ? `transition-transform duration-500 ${EASE_OUT_QUINT}` : ''}`}
                    style={{ transform: `scaleY(${line.height > 0 ? line.active / line.height : 0})` }}
                  />
                  {isAutoplaying && (
                    <div
                      key={activeIndex}
                      data-journey-timer
                      onAnimationEnd={advanceStage}
                      className="absolute left-0 w-full origin-top animate-journey-progress bg-ink"
                      style={{
                        top: line.active,
                        height: line.next - line.active,
                        animationPlayState: !isInView || isHovered || isFocused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </div>
                <ol
                  ref={listRef}
                  aria-label="Order progress"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onTransitionEnd={measureLine}
                >
                  {STAGES.map((stage, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={stage.title} aria-current={isActive ? 'step' : undefined}>
                        <button
                          type="button"
                          onClick={() => selectStage(index)}
                          className="group flex min-h-[44px] w-full items-center gap-3 rounded-md py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          <span
                            ref={(marker) => {
                              markerRefs.current[index] = marker;
                            }}
                            className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors duration-200 ${
                              isActive ? 'bg-ink text-fern' : 'border border-ink/30 bg-night text-ink group-hover:border-ink'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span
                            className={`text-base transition-colors duration-200 ${
                              isActive ? 'font-semibold text-ink' : 'text-ink/80 group-hover:text-ink'
                            }`}
                          >
                            {stage.title}
                          </span>
                        </button>
                        <div
                          {...hiddenUnless(isActive)}
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${EASE_OUT_QUINT} ${
                            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="pb-3 pl-10">
                              <p className="max-w-[31rem] text-[0.95rem] leading-relaxed text-ink/80 [text-wrap:pretty] sm:text-base">
                                {stage.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div data-journey-visual className="order-2 min-w-0 xl:order-none xl:col-span-7">
              <div data-journey-frame className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-night-raised sm:aspect-[16/10] xl:aspect-[4/3] min-[1330px]:aspect-[16/10]">
                <div data-testid="journey-dm" {...hiddenUnless(isDMActive)} className={layerClass(isDMActive)}>
                  <ShopDMCard
                    shopName="Cocoa Rose Beauty"
                    initials="CR"
                    messages={conversation}
                    sharedPost={sharedPost}
                    animateMessages
                    className="h-full rounded-none border-0 bg-white shadow-none backdrop-blur-none [&>div:last-child]:flex [&>div:last-child]:h-[calc(100%-3.5rem)] [&>div:last-child]:flex-col [&>div:last-child]:justify-end [&>div:last-child]:space-y-3 sm:[&>div:last-child]:px-8 sm:[&>div:last-child]:pb-8"
                  />
                </div>
                {STAGES.map((stage, index) => {
                  if (stage.visual !== 'photo') return null;
                  const isActive = index === activeIndex;
                  return (
                    <img
                      key={stage.image}
                      src={stage.image}
                      alt={isActive ? stage.imageAlt : ''}
                      {...hiddenUnless(isActive)}
                      width="1672"
                      height="941"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1440px) 700px, (min-width: 1280px) 55vw, calc(100vw - 5.5rem)"
                      className={`h-full w-full object-cover ${layerClass(isActive)}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DMSalesJourney;
