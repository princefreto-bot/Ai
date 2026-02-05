import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Pricing } from './pages/Pricing';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import Articles from './pages/Articles';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import IntroVideo from './components/ui/IntroVideo';
import Preloader from './components/ui/Preloader';
import CustomAnalysis from './pages/CustomAnalysis';

export function App() {
  const [loadingState, setLoadingState] = useState<'preloading' | 'intro' | 'content'>('preloading');

  const handlePreloadComplete = () => {
    setLoadingState('intro');
  };

  const handleIntroComplete = () => {
    setLoadingState('content');
  };

  return (
    <>
      {loadingState === 'preloading' && (
        <Preloader onComplete={handlePreloadComplete} />
      )}

      {loadingState === 'intro' && (
        <IntroVideo onComplete={handleIntroComplete} />
      )}
      
      <div className={`${loadingState !== 'content' ? 'fixed inset-0 overflow-hidden opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-1000'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/analysis/request" element={<CustomAnalysis />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
