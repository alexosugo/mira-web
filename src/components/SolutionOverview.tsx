import { useSectionTracking } from '../hooks/useTracking';
import { useSolutionCopyExperiment, SOLUTION_COPY } from '../hooks/useExperiments';

const SolutionOverview = () => {
  const sectionRef = useSectionTracking('solution', 'Solution Overview');
  const solutionCopy = useSolutionCopyExperiment();

  return (
    <section
      ref={sectionRef}
      id="solution-section"
      className="py-24 lg:py-32 bg-warm-50 dark:bg-navy-900"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 dark:text-white mb-5 tracking-tight [text-wrap:balance]">
            Meet Mira: built for shop owners who do everything themselves.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Customers get what they need right away. You get your time back.
          </p>
        </div>

        {/* Solution statement: same solid navy surface as the Features lead card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-800 p-10 lg:p-14 rounded-3xl border border-navy-700">
            <p className="text-lg lg:text-xl text-navy-100 leading-relaxed text-center max-w-2xl mx-auto">
              {SOLUTION_COPY[solutionCopy]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
