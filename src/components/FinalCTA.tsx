import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const APP_URL = 'https://app.sellogram.co';

interface FinalCTAProps {
  readonly note?: string;
  readonly trackingSection?: string;
}

const FinalCTA = ({ note, trackingSection = 'final-cta' }: FinalCTAProps) => {
  const sectionRef = useSectionTracking('final-cta', 'Final CTA');
  const { trackCTA } = useCTATracking();

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 lg:py-10">
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-2xl bg-cobalt text-white lg:grid-cols-12">
          <div className="px-6 py-12 sm:px-10 sm:py-14 lg:col-span-7 lg:p-20">
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-semibold leading-[0.98] tracking-tight [text-wrap:balance]">
              Put Sellogram to work in your DMs
            </h2>
            {note && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 [text-wrap:pretty]">{note}</p>}

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={APP_URL}
                onClick={() =>
                  trackCTA('final_cta_button', 'Start free', trackingSection, {
                    button_location: 'final_cta',
                  })
                }
                className="inline-flex min-h-12 items-center rounded-full bg-fern px-8 text-base font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Start free
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-[44px] items-center text-base text-white/85 underline decoration-white/40 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Ask us a question
              </a>
            </div>
          </div>

          <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-[22rem]">
            <img
              src="/images/outcomes/piki-piki-delivery.webp"
              alt="Rider handing a delivery to a customer at her apartment gate"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
