import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Fonction pour gérer l'entrée sur le site
  const handleEnter = () => {
    // Animation de sortie
    anime({
      targets: containerRef.current,
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: () => {
        onComplete();
      }
    });
  };

  useEffect(() => {
    // Animation d'entrée du contenu (bouton, texte)
    anime({
      targets: contentRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1500,
      delay: 500,
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      >
        {/* Le fichier doit être placé dans public/intro.mp4 */}
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenu Central */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center opacity-0">
        
        {/* Bouton Entrer */}
        <button 
          onClick={handleEnter}
          className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-none overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-3">
            Entrer sur TradeScalpSnip
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          
          {/* Effet de brillance au survol */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>
        </button>

      </div>
    </div>
  );
};

export default IntroVideo;
