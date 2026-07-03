import { useSectionTracking } from '../hooks/useTracking';

interface LedgerEntry {
  time: string;
  text: string;
  /** The payoff line gets the dawn accent and full-strength text. */
  isPayoff?: boolean;
  /** Lines where Mira acts get the fern timestamp — her color, her shift. */
  isMira?: boolean;
}

const LEDGER: LedgerEntry[] = [
  { time: '9:41 PM', text: 'You close for the day. Mira stays on.' },
  { time: '11:52 PM', text: '"Do you have the denim jacket in M?"' },
  { time: '11:52 PM', text: 'Mira answers: two left in M, KES 2,400.', isMira: true },
  { time: '11:54 PM', text: 'Cart built. M-Pesa checkout link sent.', isMira: true },
  { time: '2:14 AM', text: 'Customer pays. Order marked awaiting your confirmation.', isPayoff: true },
  { time: '7:05 AM', text: 'You check the order and confirm the payment.' },
];

/**
 * The page's one dark surface: an overnight ledger told in timestamps.
 * It dramatizes the core promise (Mira handles the repeated work while the
 * owner keeps the decisions) without a single product claim: the customer
 * pays, and the owner confirms in the morning.
 */
const NightShift = () => {
  const sectionRef = useSectionTracking('night-shift', 'Night Shift Section');

  return (
    <section ref={sectionRef} className="bg-night py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-paper [text-wrap:balance]">
              Customers message at 2 AM. While Mira is on, they get an answer.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-paper/70">
              Price checks, size questions and delivery details get answered the moment they
              arrive. The decisions that need you wait for you.
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
                        : entry.isMira
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
