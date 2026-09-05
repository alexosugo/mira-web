import { useSectionTracking } from '../hooks/useTracking';

interface LedgerEntry {
  time: string;
  text: string;
  /** The payoff line gets the dawn accent and full-strength text. */
  isPayoff?: boolean;
  /** Lines where Sellogram acts get the fern timestamp — its color, its shift. */
  isSellogram?: boolean;
}

const LEDGER: LedgerEntry[] = [
  { time: '9:41 PM', text: 'You close for the day. Sellogram stays on.' },
  { time: '11:52 PM', text: '"Sasa! Do you have the denim jacket in M?"' },
  { time: '11:52 PM', text: 'Sellogram answers: two left in M, KES 2,400.', isSellogram: true },
  { time: '11:54 PM', text: 'Cart built. M-Pesa checkout link sent.', isSellogram: true },
  { time: '2:14 AM', text: 'Paid. Order confirmed.', isPayoff: true },
  { time: '7:05 AM', text: 'You wake up to paid orders, not unread DMs.' },
];

/**
 * The page's one dark surface: an overnight ledger told in timestamps.
 * It dramatizes the core promise — the shop sells while the owner sleeps —
 * without a single product claim.
 */
const NightShift = () => {
  const sectionRef = useSectionTracking('night-shift', 'Night Shift Section');

  return (
    <section ref={sectionRef} className="bg-night py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.9rem,1.4rem+2.2vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-paper [text-wrap:balance]">
              Your customers shop at 2 AM. Now someone answers.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-paper/70">
              Price checks, size questions, delivery to CBD — the conversations that used to
              wait until morning get answered the moment they arrive.
            </p>
          </div>

          {/* The ledger */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-night-line border-y border-night-line">
              {LEDGER.map((entry) => (
                <li key={`${entry.time}-${entry.text}`} className="flex items-baseline gap-6 py-5">
                  <span
                    className={`w-20 shrink-0 text-right font-mono text-xs sm:text-sm ${
                      entry.isPayoff
                        ? 'text-dawn-bright'
                        : entry.isSellogram
                          ? 'text-fern-bright'
                          : 'text-paper/55'
                    }`}
                  >
                    {entry.time}
                  </span>
                  <span
                    className={`text-base leading-relaxed ${
                      entry.isPayoff ? 'font-medium text-paper' : 'text-paper/70'
                    }`}
                  >
                    {entry.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NightShift;
