import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStage {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly city: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly shopName: string;
  readonly initials: string;
  readonly messages: readonly ShopDMMessage[];
  readonly mediaLayout: string;
  readonly copyLayout: string;
  readonly chatPosition: string;
}

const STAGES: readonly JourneyStage[] = [
  {
    number: '01',
    title: 'Answers product questions',
    description: 'Product details, size, stock, shade, scent, and the small questions that decide whether someone keeps shopping.',
    city: 'Accra',
    image: '/images/journey/product-question.webp',
    imageAlt: 'Fashion seller measuring a garment before answering a customer sizing question',
    imageWidth: 1122,
    imageHeight: 1402,
    shopName: 'Kasa Archive',
    initials: 'KA',
    messages: [
      { from: 'customer', text: "Please what's the waist on the size 10?" },
      { from: 'shop', text: '30 inches. Size 10 is in stock — GH₵420.' },
    ],
    mediaLayout: 'lg:col-span-7',
    copyLayout: 'lg:col-span-4 lg:col-start-9',
    chatPosition: 'md:right-5',
  },
  {
    number: '02',
    title: 'Shares delivery details',
    description: 'Area, fee, and timing can be answered while the buyer is still ready to move.',
    city: 'Lagos',
    image: '/images/journey/delivery-details.webp',
    imageAlt: 'Beauty seller preparing products while a customer asks about delivery',
    imageWidth: 1122,
    imageHeight: 1402,
    shopName: 'Mide Beauty',
    initials: 'MB',
    messages: [
      { from: 'customer', text: 'How much delivery to Lekki Phase 1?' },
      { from: 'shop', text: '₦3,000. Rider can get there this afternoon.' },
    ],
    mediaLayout: 'lg:col-span-7 lg:col-start-6 lg:row-start-1',
    copyLayout: 'lg:col-span-4 lg:row-start-1',
    chatPosition: 'md:left-5',
  },
  {
    number: '03',
    title: 'Receives payment confirmations',
    description: 'When the customer sends payment confirmation, the conversation keeps moving instead of disappearing into the inbox.',
    city: 'Nairobi',
    image: '/images/journey/payment-confirmation.webp',
    imageAlt: 'Fragrance seller preparing an order after a customer sends payment confirmation',
    imageWidth: 1122,
    imageHeight: 1402,
    shopName: 'Aster Fragrance',
    initials: 'AF',
    messages: [
      { from: 'customer', text: 'Sent to the M-Pesa number.' },
      { from: 'shop', text: 'Payment confirmed. Your order is packed.' },
    ],
    mediaLayout: 'lg:col-span-7',
    copyLayout: 'lg:col-span-4 lg:col-start-9',
    chatPosition: 'md:right-5',
  },
  {
    number: '04',
    title: 'Keeps the order moving',
    description: 'The customer gets the next useful update without needing to chase the shop for it.',
    city: 'Nairobi',
    image: '/images/journey/order-progress.webp',
    imageAlt: 'Piki piki rider handing a beauty order to a customer at her gate',
    imageWidth: 1672,
    imageHeight: 941,
    shopName: 'Cocoa Rose Beauty',
    initials: 'CR',
    messages: [
      { from: 'shop', text: 'Rider ametoka.' },
      { from: 'customer', text: 'Sawa, thanks.' },
      { from: 'shop', text: "He'll call when he gets to the gate." },
    ],
    mediaLayout: 'lg:col-span-7 lg:col-start-6 lg:row-start-1',
    copyLayout: 'lg:col-span-4 lg:row-start-1',
    chatPosition: 'md:left-5',
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

        <ol className="mt-14 space-y-20 lg:mt-24 lg:space-y-28">
          {STAGES.map((stage) => (
            <li key={stage.number} className="grid min-w-0 gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:items-center lg:gap-7">
              <div className={`relative min-w-0 ${stage.mediaLayout}`}>
                <div className="aspect-[5/4] overflow-hidden rounded-xl bg-paper-raised sm:rounded-2xl">
                  <img
                    src={stage.image}
                    alt={stage.imageAlt}
                    width={stage.imageWidth}
                    height={stage.imageHeight}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 58vw, 100vw"
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
                    className="md:max-w-[20rem]"
                  />
                </div>
              </div>

              <div className={stage.copyLayout}>
                <span className="font-display text-6xl font-semibold leading-none text-ink/10 sm:text-7xl">
                  {stage.number}
                </span>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-3xl font-semibold leading-tight text-ink">{stage.title}</h3>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wide text-ink-faint">
                    {stage.city}
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-light sm:text-lg">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default DMSalesJourney;
