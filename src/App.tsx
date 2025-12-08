import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { trackPageView } from './utils/analytics';
import { useScrollTracking } from './hooks/useTracking';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useScrollTracking();
  
  useEffect(() => {
    // Track initial page view
    trackPageView('Landing Page', 'main');
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-300">
        <Header />
        <div id="hero">
          <Hero />
        </div>
        <ProblemStatement />
        <SolutionOverview />
        <Features />
        <Benefits />
        {/* <Testimonials /> */}
        <Pricing />
        {/* <FinalCTA /> */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;