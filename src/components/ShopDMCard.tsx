import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export interface ShopDMMessage {
  readonly from: 'customer' | 'shop';
  readonly text: string;
  readonly isMilestone?: boolean;
}

interface ShopDMCardProps {
  readonly shopName: string;
  readonly initials: string;
  readonly messages: readonly ShopDMMessage[];
  readonly sharedPost?: {
    readonly image: string;
    readonly imageAlt: string;
    readonly title: string;
  };
  readonly className?: string;
  readonly compact?: boolean;
  readonly animateMessages?: boolean;
}

const MESSAGE_LAND_MS = 320;
const TYPING_MS = 700;

const countThroughCustomerMessages = (messages: readonly ShopDMMessage[], start: number) => {
  let count = start;
  while (count < messages.length && messages[count]?.from === 'customer') count += 1;
  return count;
};

const ShopDMCard = ({
  shopName,
  initials,
  messages,
  sharedPost,
  className = '',
  compact = false,
  animateMessages = false,
}: ShopDMCardProps) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const visibleCount = animateMessages
    ? countThroughCustomerMessages(messages, Math.min(revealedCount, messages.length))
    : messages.length;
  const isTyping = visibleCount < messages.length;

  useEffect(() => {
    if (!animateMessages) return;
    if (revealedCount > messages.length || prefersReducedMotion()) {
      setRevealedCount(messages.length);
      return;
    }
    if (visibleCount >= messages.length) return;
    const timer = setTimeout(() => setRevealedCount(visibleCount + 1), MESSAGE_LAND_MS + TYPING_MS);
    return () => clearTimeout(timer);
  }, [animateMessages, messages.length, revealedCount, visibleCount]);

  const bubbleText = compact ? 'text-[0.68rem]' : 'text-[0.72rem] sm:text-xs';

  return (
    <div
      className={`overflow-hidden rounded-[1.15rem] border border-white/75 bg-white/95 shadow-[0_18px_60px_rgba(19,30,9,0.18)] backdrop-blur-md ${className}`}
    >
      <div className={`flex items-center gap-3 border-b border-line ${compact ? 'px-3 py-2.5' : 'px-4 py-3'}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-paper ${
            compact ? 'h-7 w-7 text-[0.62rem]' : 'h-8 w-8 text-xs'
          }`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className={`truncate font-semibold text-ink ${compact ? 'text-xs' : 'text-sm'}`}>{shopName}</p>
          <p className={`text-ink-faint ${compact ? 'text-[0.62rem]' : 'text-[0.7rem]'}`}>Instagram</p>
        </div>
      </div>

      <div className={compact ? 'space-y-2 px-3 py-3' : 'space-y-2.5 px-3 py-3 sm:px-4 sm:py-4'}>
        {sharedPost && (
          <div className="flex overflow-hidden rounded-xl border border-line bg-white">
            <img
              src={sharedPost.image}
              alt={sharedPost.imageAlt}
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              className="h-14 w-20 shrink-0 object-cover"
            />
            <div className="min-w-0 px-2.5 py-2">
              <p className="text-[0.6rem] text-ink-faint">Shared a post</p>
              <p className="mt-0.5 truncate text-[0.68rem] font-semibold text-ink">{sharedPost.title}</p>
            </div>
          </div>
        )}
        {messages.slice(0, visibleCount).map((message, index) => (
          <div
            key={`${message.from}-${index}-${message.text}`}
            className={`flex ${animateMessages ? 'animate-journey-message' : ''} ${message.from === 'shop' ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`max-w-[88%] rounded-2xl px-3 py-2 leading-snug ${bubbleText} ${
                message.isMilestone
                  ? 'rounded-br-md bg-dawn-bright/25 font-medium text-ink'
                  : message.from === 'shop'
                    ? 'rounded-br-md bg-fern/10 text-ink'
                    : 'rounded-bl-md bg-paper text-ink'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
        {isTyping && (
          <div data-testid="dm-typing" aria-hidden="true" className="flex animate-journey-message justify-end [animation-delay:320ms]">
            <p className={`flex items-center gap-1 rounded-2xl rounded-br-md bg-fern/10 px-3 py-2 leading-snug ${bubbleText}`}>
              {[0, 160, 320].map((delay) => (
                <span
                  key={delay}
                  className="block h-1.5 w-1.5 animate-typing-dot rounded-full bg-ink/50"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
              <span className="invisible w-0">.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDMCard;
