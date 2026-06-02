import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

/** Stagger start for the first message; each subsequent message lands 250ms later,
    so the full conversation (including the 2:14 AM payoff) completes within ~2s. */
const MESSAGE_BASE_DELAY_MS = 400;
const MESSAGE_STEP_MS = 250;

interface ChatMessage {
  from: 'customer' | 'mira';
  text: ReactNode;
}

const MESSAGES: ChatMessage[] = [
  { from: 'customer', text: 'Sasa! Do you have the denim jacket in M?' },
  {
    from: 'mira',
    text: (
      <>
        Yes, two left in M. <span className="font-mono text-[0.9em]">KES 2,400</span>. Want me to
        add one to your cart?
      </>
    ),
  },
  { from: 'customer', text: 'Add it. Can you deliver to CBD tomorrow?' },
  {
    from: 'mira',
    text: (
      <>
        Done. Delivery is <span className="font-mono text-[0.9em]">KES 200</span>, arrives
        tomorrow. You can pay with M-Pesa at checkout.
      </>
    ),
  },
];

const messageDelay = (index: number) => `${MESSAGE_BASE_DELAY_MS + index * MESSAGE_STEP_MS}ms`;

/**
 * The hero's proof surface: a believable Instagram DM thread where Mira
 * answers a stock question, builds a cart, and closes the sale overnight.
 * Messages stagger in with CSS-only delays (no JS gating); reduced motion
 * shows everything instantly via the global override in index.css.
 */
const HeroChatDemo = () => {
  return (
    <div
      aria-label="Example Instagram DM conversation: Mira answers a customer's stock question, adds a jacket to their cart, and confirms the order at 2:14 AM"
      className="w-full max-w-sm mx-auto rounded-3xl bg-white dark:bg-navy-900
                 border border-gray-200 dark:border-navy-700 shadow-xl overflow-hidden"
    >
      {/* Thread header */}
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
          <p className="text-xs text-gray-600 dark:text-navy-300">Mira replies for you</p>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-5 space-y-3">
        {MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex animate-fade-in-up ${message.from === 'mira' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: messageDelay(index) }}
          >
            <p
              className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                message.from === 'mira'
                  ? 'bg-navy-800 dark:bg-navy-700 text-white rounded-2xl rounded-br-md'
                  : 'bg-warm-100 dark:bg-navy-800 text-navy-800 dark:text-navy-100 rounded-2xl rounded-bl-md'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}

        {/* Cart confirmation: the one lime signal in the thread */}
        <div
          className="flex justify-end animate-fade-in-up"
          style={{ animationDelay: messageDelay(MESSAGES.length) }}
        >
          <p
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-br-md
                       bg-lime-500/15 border border-lime-500/30
                       text-navy-800 dark:text-lime-300 text-sm font-mono"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            1 × Denim jacket (M) · KES 2,400
          </p>
        </div>

        {/* Outcome */}
        <p
          className="pt-2 text-center text-xs text-gray-600 dark:text-navy-300 animate-fade-in-up"
          style={{ animationDelay: messageDelay(MESSAGES.length + 1) }}
        >
          Order confirmed · 2:14 AM
        </p>
      </div>
    </div>
  );
};

export default HeroChatDemo;
