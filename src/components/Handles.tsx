import { useSectionTracking } from '../hooks/useTracking';
import {
  useSolutionCopyExperiment,
  useProductExpertExperiment,
  SOLUTION_COPY,
  PRODUCT_EXPERT_COPY,
} from '../hooks/useExperiments';

interface HandleItem {
  title: string;
  description: string;
}

/**
 * The everyday DM work Mira takes over, as a bento of soft cards a busy
 * seller can scan in seconds. The first card (the catalog expertise that
 * everything else builds on) gets the wide span.
 */
const Handles = () => {
  const sectionRef = useSectionTracking('handles', 'What Mira Handles Section');
  const solutionVariant = useSolutionCopyExperiment();
  const productExpertVariant = useProductExpertExperiment();
  const productExpert = PRODUCT_EXPERT_COPY[productExpertVariant];

  const items: HandleItem[] = [
    {
      title: productExpert.title,
      description: productExpert.description,
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
    <section id="handles" ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-dusk">What Mira handles</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,1.3rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-slate [text-wrap:balance]">
            The questions you answer all day, answered for you
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-light">
            {SOLUTION_COPY[solutionVariant]}
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`rounded-3xl bg-white p-7 shadow-soft sm:p-8 ${
                index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-dusk-tint font-mono text-sm text-dusk-deep">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-light">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Handles;
