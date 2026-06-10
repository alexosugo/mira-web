import { useSectionTracking } from '../hooks/useTracking';

interface LedgerEntry {
  time: string;
  text: string;
  /** The payoff line gets the dawn accent and full-strength text. */
  isPayoff?: boolean;
  /** Lines where Mira acts get the dusk timestamp — her color, her shift. */
  isMira?: boolean;
}

const LEDGER: LedgerEntry[] = [
  { time: '9:41 PM', text: 'You close for the day. Mira stays on.' },
  { time: '11:52 PM', text: '"Sasa! Do you have the denim jacket in M?"' },
  { time: '11:52 PM', text: 'Mira answers: two left in M, KES 2,400.', isMira: true },
  { time: '11:54 PM', text: 'Cart built. M-Pesa checkout link sent.', isMira: true },
  { time: '2:14 AM', text: 'Paid. Order confirmed.', isPayoff: true },
  { time: '7:05 AM', text: 'You wake up to paid orders, not unread DMs.' },
];

/** Timeline dot color per entry: dawn for the payoff, dusk where Mira acts. */
const dotClass = (entry: LedgerEntry) =>
  entry.isPayoff ? 'bg-dawn-bright' : entry.isMira ? 'bg-dusk-bright' : 'bg-white/30';

/**
 * The page's one dark surface: an overnight ledger told in timestamps.
 * It dramatizes the core promise — the shop sells while the owner sleeps —
 * without a single product claim.
 */
const NightShift = () => {
  const sectionRef = useSectionTracking('night-shift', 'Night Shift Section');

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-midnight-sky rounded-3xl px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="kicker text-dusk-bright">The night shift</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                Your customers shop at 2 AM. Now someone answers.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70">
                Price checks, size questions, delivery to CBD — the conversations that used to
                wait until morning get answered the moment they arrive.
              </p>
            </div>

            {/* The ledger, told as a timeline */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ol className="relative ml-2 border-l border-midnight-line">
                {LEDGER.map((entry) => (
                  <li
                    key={`${entry.time}-${entry.text}`}
                    className="relative pb-8 pl-8 last:pb-0"
                  >
                    <span
                      className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${dotClass(entry)}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`block font-mono text-xs sm:text-sm ${
                        entry.isPayoff
                          ? 'text-dawn-bright'
                          : entry.isMira
                            ? 'text-dusk-bright'
                            : 'text-white/55'
                      }`}
                    >
                      {entry.time}
                    </span>
                    <span
                      className={`mt-1 block text-base leading-relaxed ${
                        entry.isPayoff ? 'font-semibold text-white' : 'text-white/70'
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
      </div>
    </section>
  );
};

export default NightShift;
