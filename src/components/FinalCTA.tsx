import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const APP_URL = 'https://app.sellogram.co';

const FinalCTA = () => {
  const sectionRef = useSectionTracking('final-cta', 'Final CTA');
  const { trackCTA } = useCTATracking();

  return (
    <section ref={sectionRef} className="px-5 pb-5 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-cobalt px-6 py-16 text-white sm:rounded-[2.25rem] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl font-display text-[clamp(2.3rem,1.6rem+3vw,4.5rem)] font-semibold leading-[0.98] tracking-tight [text-wrap:balance]">
              Put Sellogram to work in your DMs.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-md text-base leading-relaxed text-white/80">
              Connect your Instagram. Let your inbox get back to selling.
            </p>
            <a
              href={APP_URL}
              onClick={() =>
                trackCTA('final_cta_button', 'Put Sellogram to work', 'final-cta', {
                  button_location: 'final_cta',
                })
              }
              className="mt-7 inline-flex min-h-[48px] items-center rounded-full bg-white px-7 text-base font-medium text-[#123124] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Put Sellogram to work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
