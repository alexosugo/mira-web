import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

const DELIVERY_MESSAGES: readonly ShopDMMessage[] = [
  { from: 'customer', text: 'Sent to the M-Pesa number.' },
  { from: 'shop', text: 'Payment confirmed. Your order is packed.' },
  { from: 'shop', text: "Rider ametoka. He'll call when he gets to the gate." },
];

const DeliveryOutcome = () => {
  return (
    <section id="delivery-outcome" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern">The outcome</p>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,1.6rem+3.2vw,4.8rem)] font-semibold leading-[0.98] tracking-tight text-ink [text-wrap:balance]">
              From DM to doorstep
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-ink-light lg:col-span-5 lg:justify-self-end lg:text-lg">
            Sellogram helps the sale keep moving after the product question, through payment
            confirmation and delivery coordination.
          </p>
        </div>

        <figure className="relative mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-xl bg-paper-raised shadow-[0_30px_90px_rgba(14,30,23,0.12)] sm:rounded-2xl">
            <img
              src="/images/outcomes/piki-piki-delivery.webp"
              alt="Nairobi piki piki rider delivering a Sellogram-powered shop order to a customer at her gate"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1440px) 1360px, calc(100vw - 2.5rem)"
              className="block h-auto w-full"
            />
          </div>

          <div className="relative z-10 mx-4 -mt-12 sm:absolute sm:right-[4%] sm:top-[8%] sm:mx-0 sm:mt-0 sm:w-[34%] lg:w-[28%]">
            <ShopDMCard
              shopName="Cocoa Rose Beauty"
              initials="CR"
              messages={DELIVERY_MESSAGES}
            />
          </div>
        </figure>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-light">
            A product question becomes a real order, a real rider, and a customer who knows what
            happens next.
          </p>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
            Nairobi · shop DM → delivery
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryOutcome;
