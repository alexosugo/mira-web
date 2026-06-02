import { useEffect, useRef, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

/** Stagger timing for the handoff conversation, matching HeroChatDemo's pace. */
const MESSAGE_BASE_DELAY_MS = 200;
const MESSAGE_STEP_MS = 300;

interface ThreadItem {
  kind: 'customer' | 'mira' | 'handoff' | 'owner';
  text: string;
}

const THREAD: ThreadItem[] = [
  { kind: 'customer', text: 'Can you do KES 4,500 for two? And I want one monogrammed.' },
  {
    kind: 'mira',
    text: 'Two is doable. For the monogram, let me bring in Nia. She has this whole conversation already.',
  },
  { kind: 'handoff', text: 'Passed to you · full context attached' },
  { kind: 'owner', text: 'Sasa! Yes, KES 4,500 for two works. What letters do you want on it?' },
];

const itemDelay = (index: number) => `${MESSAGE_BASE_DELAY_MS + index * MESSAGE_STEP_MS}ms`;

/**
 * The Features section's proof surface: the same @nia.thrifts DM thread as the
 * hero, later in the conversation, showing the handoff. Mira answers what it
 * can, then brings the owner in with full context. Content is visible by
 * default (works without JS); an IntersectionObserver only adds the entrance
 * animation when the demo scrolls into view. Reduced motion shows everything
 * instantly via the global override in index.css.
 */
const HandoffDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    // No observer support (old browsers, test environments): skip the
    // entrance animation entirely; content is already visible.
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reveal = (index: number) =>
    isPlaying ? { className: 'animate-fade-in-up', style: { animationDelay: itemDelay(index) } } : {};

  return (
    <div
      ref={containerRef}
      aria-label="Example Instagram DM conversation: a customer asks for a custom order, Mira hands the thread to the shop owner with full context, and the owner closes the sale"
      className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto rounded-3xl bg-white dark:bg-navy-900
                 border border-gray-200 dark:border-navy-700 shadow-xl overflow-hidden"
    >
      {/* Thread header: same shop as the hero demo, later that night */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-navy-800">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-navy-800 dark:bg-navy-700 flex items-center justify-center text-white text-sm font-bold font-display">
            NT
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-white dark:border-navy-900"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-navy-800 dark:text-white truncate">@nia.thrifts</p>
          <p className="text-xs text-gray-600 dark:text-navy-300">Mira brings you in when it matters</p>
        </div>
      </div>

      {/* Conversation */}
      <div className="px-4 py-5 space-y-3">
        {THREAD.map((item, index) => {
          if (item.kind === 'handoff') {
            return (
              <div key={index} className={`flex justify-center ${reveal(index).className ?? ''}`} style={reveal(index).style}>
                <p
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             bg-lime-500/15 border border-lime-500/30
                             text-navy-800 dark:text-lime-300 text-xs font-mono"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {item.text}
                </p>
              </div>
            );
          }

          const isShopSide = item.kind === 'mira' || item.kind === 'owner';
          return (
            <div
              key={index}
              className={`flex flex-col ${isShopSide ? 'items-end' : 'items-start'} ${reveal(index).className ?? ''}`}
              style={reveal(index).style}
            >
              {item.kind === 'owner' && (
                <p className="text-[11px] text-gray-600 dark:text-navy-300 mb-1 pr-1">Nia, that's you</p>
              )}
              <p
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  isShopSide
                    ? 'bg-navy-800 dark:bg-navy-700 text-white rounded-2xl rounded-br-md'
                    : 'bg-warm-100 dark:bg-navy-800 text-navy-800 dark:text-navy-100 rounded-2xl rounded-bl-md'
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}

        {/* Outcome */}
        <p
          className={`pt-2 text-center text-xs text-gray-600 dark:text-navy-300 ${reveal(THREAD.length).className ?? ''}`}
          style={reveal(THREAD.length).style}
        >
          You stepped in once. The sale kept moving.
        </p>
      </div>
    </div>
  );
};

export default HandoffDemo;
