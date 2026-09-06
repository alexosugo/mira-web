import { useSectionTracking } from '../hooks/useTracking';

interface LedgerEntry {
  time: string;
  text: string;
  isPayoff?: boolean;
  isSellogram?: boolean;
}

const LEDGER: LedgerEntry[] = [
  { time: '9:41 PM', text: 'You close for the day. Sellogram stays on.' },
  { time: '11:52 PM', text: '"Hii denim set bado iko in M?"' },
  { time: '11:52 PM', text: 'The shop replies: M is in stock, KSh 6,000.', isSellogram: true },
  { time: '12:07 AM', text: '"Na delivery Kilimani?"' },
  { time: '12:07 AM', text: 'KSh 250. Rider can bring it tomorrow morning.', isSellogram: true },
  { time: '2:14 AM', text: '"Sent to the M-Pesa number."', isPayoff: true },
  { time: '2:15 AM', text: 'Payment confirmed. Order moves forward.', isSellogram: true },
  { time: '7:05 AM', text: 'You wake up to an order, not a cold DM.' },
];

const NightShift = () => {
  const sectionRef = useSectionTracking('night-shift', 'Night Shift Section');

  return (
    <section ref={sectionRef} className="bg-night py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern-bright">
              After hours
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] font-semibold leading-[1.04] tracking-tight text-paper [text-wrap:balance]">
              Your customers shop late. Sellogram keeps answering.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">
              Product questions, delivery details, and order updates keep moving in your shop DM
              while you are away from the phone.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-night-line border-y border-night-line">
              {LEDGER.map((entry) => (
                <li key={`${entry.time}-${entry.text}`} className="flex items-baseline gap-5 py-4 sm:gap-6 sm:py-5">
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
                    className={`text-sm leading-relaxed sm:text-base ${
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
