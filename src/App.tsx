import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
import BlogListingPage from './pages/BlogListingPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage from './pages/LoginPage';
import AdminPostsPage from './pages/AdminPostsPage';
import AdminPostEditorPage from './pages/AdminPostEditorPage';
import { trackPageView } from './utils/analytics';
import { useScrollTracking } from './hooks/useTracking';

function App() {
  useScrollTracking();
  
  useEffect(() => {
    // Track initial page view
    trackPageView('Landing Page', 'main');
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={
              <>
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
              </>
            } />
            
            {/* Public Blog Routes */}
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Authentication Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/posts" element={
              <ProtectedRoute>
                <AdminPostsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/:postId" element={
              <ProtectedRoute>
                <AdminPostEditorPage />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;