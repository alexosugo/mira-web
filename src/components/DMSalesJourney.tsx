import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

interface JourneyStage {
  readonly title: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly shopName: string;
  readonly initials: string;
  readonly messages: readonly ShopDMMessage[];
  readonly isOutcome?: boolean;
}

const STAGES: readonly JourneyStage[] = [
  {
    title: 'Size 10 is in stock.',
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
  },
  {
    title: 'Delivery to Lekki is ₦3,000.',
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
  },
  {
    title: 'Payment confirmed. Your order is packed.',
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
  },
  {
    title: 'Rider ametoka.',
    image: '/images/journey/order-progress.webp',
    imageAlt: 'Piki piki rider delivering a Sellogram-powered shop order at a customer’s gate',
    imageWidth: 1672,
    imageHeight: 941,
    shopName: 'Cocoa Rose Beauty',
    initials: 'CR',
    messages: [
      { from: 'shop', text: 'Rider ametoka.' },
      { from: 'customer', text: 'Sawa, thanks.' },
      { from: 'shop', text: "He'll call when he gets to the gate." },
    ],
    isOutcome: true,
  },
];

const DMSalesJourney = () => {
  return (
    <section id="dm-sales-journey" className="border-y border-line bg-white/35 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-5xl font-display text-[clamp(2.2rem,1.5rem+3vw,4.4rem)] font-semibold leading-[1] tracking-tight text-ink [text-wrap:balance]">
          From “Is it available?” to “Rider ametoka.”
        </h2>

        <ol className="mt-14 space-y-16 lg:mt-20 lg:space-y-20">
          {STAGES.map((stage, index) => (
            <li
              key={stage.title}
              className={`min-w-0 border-t border-line pt-7 ${
                stage.isOutcome
                  ? ''
                  : 'grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-8'
              }`}
            >
              <div
                className={`relative min-w-0 ${
                  stage.isOutcome
                    ? ''
                    : index % 2 === 0
                      ? 'lg:col-span-8'
                      : 'lg:col-span-8 lg:col-start-5 lg:row-start-1'
                }`}
              >
                <div className={`${stage.isOutcome ? 'aspect-[16/9]' : 'aspect-[5/4]'} overflow-hidden rounded-xl bg-paper-raised sm:rounded-2xl`}>
                  <img
                    src={stage.image}
                    alt={stage.imageAlt}
                    width={stage.imageWidth}
                    height={stage.imageHeight}
                    loading="lazy"
                    decoding="async"
                    sizes={stage.isOutcome ? '(min-width: 1440px) 1360px, calc(100vw - 2rem)' : '(min-width: 1024px) 66vw, 100vw'}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`relative z-10 mx-4 -mt-16 md:absolute md:bottom-5 md:mx-0 md:mt-0 ${
                    stage.isOutcome
                      ? 'md:right-5 md:w-[32%]'
                      : index % 2 === 0
                        ? 'md:right-5 md:w-[48%]'
                        : 'md:left-5 md:w-[48%]'
                  }`}
                >
                  <ShopDMCard
                    shopName={stage.shopName}
                    initials={stage.initials}
                    messages={stage.messages}
                    className={stage.isOutcome ? 'md:max-w-[22rem]' : 'md:max-w-[20rem]'}
                  />
                </div>
              </div>

              <h3
                className={`font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl ${
                  stage.isOutcome
                    ? 'mt-7 max-w-xl'
                    : index % 2 === 0
                      ? 'lg:col-span-4'
                      : 'lg:col-span-4 lg:row-start-1'
                }`}
              >
                {stage.title}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default DMSalesJourney;
