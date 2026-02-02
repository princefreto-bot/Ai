import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Pricing } from './pages/Pricing';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import IntroVideo from './components/ui/IntroVideo';
import Preloader from './components/ui/Preloader';

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
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
