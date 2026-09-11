import { useCTATracking, useSectionTracking } from '../hooks/useTracking';

const APP_URL = 'https://app.sellogram.co';

const FinalCTA = () => {
  const sectionRef = useSectionTracking('final-cta', 'Final CTA');
  const { trackCTA } = useCTATracking();

  return (
    <section ref={sectionRef} className="px-5 pb-5 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-cobalt px-6 py-14 text-white sm:rounded-[2.25rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl font-display text-[clamp(2rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-tight [text-wrap:balance]">
              Put Sellogram to work in your DMs
            </h2>
          </div>

          <div className="lg:col-span-4">
            <a
              href={APP_URL}
              onClick={() =>
                trackCTA('final_cta_button', 'Start free', 'final-cta', {
                  button_location: 'final_cta',
                })
              }
              className="mt-7 inline-flex min-h-[48px] items-center rounded-full bg-white px-7 text-base font-medium text-[#123124] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start free
            </a>
            <a
              href="/contact"
              className="mt-7 ml-6 inline-flex min-h-[48px] items-center text-base text-white/85 underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
            >
              Ask us a question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
