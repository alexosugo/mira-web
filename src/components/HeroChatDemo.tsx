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
        Yes, two left in M. <span className="font-mono text-[0.85em]">KES 2,400</span>. Want me
        to add one to your cart?
      </>
    ),
  },
  { from: 'customer', text: 'Add it. Can you deliver to CBD tomorrow?' },
  {
    from: 'mira',
    text: (
      <>
        Done. Delivery is <span className="font-mono text-[0.85em]">KES 200</span>, arrives
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
      className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lifted"
    >
      {/* Thread header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dusk font-display text-sm font-semibold text-white">
            NT
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-dusk-bright"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate">@nia.thrifts</p>
          <p className="font-mono text-xs text-dusk">Mira replies for you</p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 px-4 py-5">
        {MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex animate-fade-in-up ${message.from === 'mira' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: messageDelay(index) }}
          >
            <p
              className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                message.from === 'mira'
                  ? 'rounded-2xl rounded-br-md bg-dusk text-white'
                  : 'rounded-2xl rounded-bl-md bg-mist text-slate'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}

        {/* Cart confirmation: the page's one dawn signal above the fold */}
        <div
          className="flex justify-end animate-fade-in-up"
          style={{ animationDelay: messageDelay(MESSAGES.length) }}
        >
          <p className="inline-flex items-center gap-2 rounded-2xl rounded-br-md bg-dawn-tint px-4 py-2.5 font-mono text-xs text-dawn sm:text-sm">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            1 × Denim jacket (M) · KES 2,400
          </p>
        </div>

        {/* Outcome */}
        <p
          className="pt-2 text-center font-mono text-xs text-slate-faint animate-fade-in-up"
          style={{ animationDelay: messageDelay(MESSAGES.length + 1) }}
        >
          Order confirmed · 2:14 AM
        </p>
      </div>
    </div>
  );
};

export default HeroChatDemo;
