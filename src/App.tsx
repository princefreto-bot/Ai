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

export function App() {
  // On peut utiliser le localStorage pour ne pas montrer l'intro à chaque refresh si on veut
  // Pour l'instant on la montre à chaque chargement complet (reload)
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}
      
      {/* Le contenu principal est caché ou a une opacité réduite pendant l'intro si on veut une transition fluide */}
      <div className={`${showIntro ? 'fixed inset-0 overflow-hidden opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-1000'}`}>
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
