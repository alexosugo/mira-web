import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NightShift from './components/NightShift';
import Handles from './components/Handles';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
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
    <div className="min-h-screen bg-mist">
      <Header />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <NightShift />
        <Handles />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
