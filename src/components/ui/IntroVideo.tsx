import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Vidéo Cyberpunk / Neural Network Abstract de haute qualité
  const videoUrl = "https://cdn.pixabay.com/video/2020/12/13/59157-495286694_large.mp4";

  useEffect(() => {
    // Animation de texte "Typing" et "Glitch" simulée
    if (textRef.current && progressRef.current) {
      
      const timeline = anime.timeline({
        easing: 'easeOutExpo',
      });

      // 1. Apparition du conteneur texte
      timeline
        .add({
          targets: textRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          delay: 500
        })
        // 2. Barre de chargement
        .add({
          targets: progressRef.current,
          width: ['0%', '100%'],
          duration: 3500, // Durée du chargement simulé
          easing: 'easeInOutQuad',
          update: () => {
            // Mettre à jour le pourcentage si on voulait l'afficher textuellement
          }
        })
        // 3. Disparition
        .add({
          targets: containerRef.current,
          opacity: 0,
          duration: 800,
          easing: 'easeInQuad',
          complete: () => {
            onComplete();
          }
        });
    }
  }, [isVideoLoaded]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fond Vidéo */}
      <video
        autoPlay
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay Grille Tech */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,18,0)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Contenu Central */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        
        {/* Logo ou Titre */}
        <div ref={textRef} className="text-center mb-8 opacity-0">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            TRADESCALP<span className="text-pink-500">SNIP</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-pink-200/80 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            Initialisation Neural Engine v4.0
          </div>
        </div>

        {/* Barre de progression style "Loader" */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 w-0 shadow-[0_0_15px_rgba(236,72,153,0.7)]"
          ></div>
        </div>
        
        <div className="mt-4 flex justify-between w-full text-[10px] text-white/40 font-mono uppercase">
          <span>Connexion Sécurisée</span>
          <span>Analyse temps réel</span>
        </div>

      </div>
    </div>
  );
};

export default IntroVideo;
