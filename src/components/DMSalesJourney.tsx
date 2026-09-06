import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStage {
  number: string;
  title: string;
  description: string;
  city: string;
  image: string;
  imageAlt: string;
  shopName: string;
  initials: string;
  messages: ShopDMMessage[];
  chatPosition: string;
}

const STAGES: JourneyStage[] = [
  {
    number: '01',
    title: 'Answers product questions',
    description: 'Product details, size, stock, shade, scent, and the small questions that decide whether someone keeps shopping.',
    city: 'Accra',
    image: '/images/shops/fashion-thrift.webp',
    imageAlt: 'Fashion seller measuring a garment before answering a customer sizing question',
    shopName: 'Kasa Archive',
    initials: 'KA',
    messages: [
      { from: 'customer', text: 'Do you have this in a 10?' },
      { from: 'shop', text: 'Yes. Size 10 is still in stock — GH₵420.' },
    ],
    chatPosition: 'md:left-5',
  },
  {
    number: '02',
    title: 'Shares delivery details',
    description: 'Area, fee, and timing can be answered while the buyer is still ready to move.',
    city: 'Lagos',
    image: '/images/shops/beauty.webp',
    imageAlt: 'Beauty seller preparing products while a customer asks about delivery',
    shopName: 'Mide Beauty',
    initials: 'MB',
    messages: [
      { from: 'customer', text: 'How much delivery to Lekki Phase 1?' },
      { from: 'shop', text: '₦3,000. Rider can get there this afternoon.' },
    ],
    chatPosition: 'md:right-5',
  },
  {
    number: '03',
    title: 'Receives payment confirmations',
    description: 'When the customer sends payment confirmation, the conversation keeps moving instead of disappearing into the inbox.',
    city: 'Nairobi',
    image: '/images/shops/fragrance.webp',
    imageAlt: 'Fragrance seller preparing an order after a customer sends payment confirmation',
    shopName: 'Aster Fragrance',
    initials: 'AF',
    messages: [
      { from: 'customer', text: 'Sent to the M-Pesa number.' },
      { from: 'shop', text: 'Seen, thank you. Got it.' },
    ],
    chatPosition: 'md:left-5',
  },
  {
    number: '04',
    title: 'Keeps the order moving',
    description: 'The customer gets the next useful update without needing to chase the shop for it.',
    city: 'Nairobi',
    image: '/images/outcomes/piki-piki-delivery.webp',
    imageAlt: 'Piki piki rider handing a beauty order to a customer at her gate',
    shopName: 'Cocoa Rose Beauty',
    initials: 'CR',
    messages: [
      { from: 'shop', text: 'Rider ametoka.' },
      { from: 'customer', text: 'Sawa, thanks.' },
      { from: 'shop', text: "He'll call when he gets to the gate." },
    ],
    chatPosition: 'md:right-5',
  },
];

const DMSalesJourney = () => {
  return (
    <section id="dm-sales-journey" className="border-y border-line bg-white/35 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern">Inside the sale</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,1.5rem+3vw,4.4rem)] font-semibold leading-[1] tracking-tight text-ink [text-wrap:balance]">
              Sellogram helps at every stage of the DM sale
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-light lg:col-span-4 lg:justify-self-end">
            A sale has more steps than “is this available?” Sellogram handles the useful questions
            and updates in between, from the shop information the customer needs at that moment.
          </p>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 lg:mt-20 lg:grid-cols-2">
          {STAGES.map((stage) => (
            <article key={stage.number} className="min-w-0">
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-paper-raised">
                  <img
                    src={stage.image}
                    alt={stage.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`relative z-10 mx-4 -mt-16 md:absolute md:bottom-5 md:mx-0 md:mt-0 md:w-[48%] ${stage.chatPosition}`}
                >
                  <ShopDMCard
                    shopName={stage.shopName}
                    initials={stage.initials}
                    messages={stage.messages}
                    compact
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[auto_1fr] gap-4 md:mt-7">
                <span className="font-mono text-xs text-fern">{stage.number}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-semibold text-ink">{stage.title}</h3>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wide text-ink-faint">
                      {stage.city}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-light">
                    {stage.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DMSalesJourney;
