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

        <figure className="mt-12 overflow-hidden rounded-[1.75rem] bg-paper-raised shadow-[0_30px_90px_rgba(14,30,23,0.12)] sm:mt-16 sm:rounded-[2.25rem]">
          <img
            src="/images/outcomes/piki-piki-delivery.webp"
            alt="Nairobi piki piki rider delivering a Sellogram-powered shop order to a customer at her gate"
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
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
