import React from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { trackPageView } from './utils/analytics';
import { useScrollTracking } from './hooks/useTracking';

function App() {
  useScrollTracking();
  
  useEffect(() => {
    // Track initial page view
    trackPageView('Landing Page', 'main');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <ProblemStatement />
      <SolutionOverview />
      <Features />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;