import { useSectionTracking } from '../hooks/useTracking';

interface HandleItem {
  title: string;
  description: string;
}

const SOLUTION_LEAD =
  'Mira lives in your DMs and understands your products, replies to customer questions, and guides them through buying wherever they message you. When someone needs you personally, Mira passes the conversation back to you.';

/**
 * The everyday DM work Mira takes over, as an editorial index rather than a
 * feature-card grid. Consolidates the old problem/solution/features/benefits
 * sections into one list a busy seller can scan in seconds.
 */
const Handles = () => {
  const sectionRef = useSectionTracking('handles', 'What Mira Handles Section');

  const items: HandleItem[] = [
    {
      title: 'Product Expert',
      description:
        'Mira understands your catalog well enough to guide customers with clear, helpful answers',
    },
    {
      title: 'Sizes and recommendations',
      description: 'Mira helps customers pick the right item, the way you would if you were free.',
    },
    {
      title: 'Carts and checkout',
      description:
        'Adds items, totals the order, and walks the customer to an M-Pesa-ready checkout inside the DM.',
    },
    {
      title: 'Delivery questions',
      description: 'Costs, areas, and timelines answered without you reaching for your phone.',
    },
    {
      title: 'The handover',
      description:
        'Anything tricky comes straight to you, with the full conversation attached. You are always one tap away.',
    },
  ];

  return (
    <section id="handles" ref={sectionRef} className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="kicker text-ink-light">What Mira handles</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-ink [text-wrap:balance]">
                The questions you answer all day, answered for you
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-light">
                {SOLUTION_LEAD}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-line border-y border-line">
              {items.map((item, index) => (
                <li key={item.title} className="flex items-baseline gap-6 py-7">
                  <span className="w-8 shrink-0 font-mono text-sm text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-light">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Handles;
