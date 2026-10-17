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
    <section ref={sectionRef} className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-xl bg-cobalt px-6 py-9 text-white sm:rounded-2xl sm:px-10 sm:py-10 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl font-display text-[clamp(1.6rem,1.25rem+1.4vw,2.25rem)] font-semibold leading-[1.08] tracking-tight [text-wrap:balance]">
              Put Sellogram to work in your DMs
            </h2>
            {note && <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85">{note}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-4 lg:justify-end">
            <a
              href={APP_URL}
              onClick={() =>
                trackCTA('final_cta_button', 'Start free', trackingSection, {
                  button_location: 'final_cta',
                })
              }
              className="inline-flex min-h-[48px] items-center rounded-full bg-white px-7 text-base font-medium text-[#123124] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start free
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-[48px] items-center text-base text-white/85 underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
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
