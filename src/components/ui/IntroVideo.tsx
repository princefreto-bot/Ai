import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Animation d'entrée
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad'
    });

    // Fallback de sécurité : si la vidéo ne démarre pas ou est trop longue (max 10s)
    const timeout = setTimeout(() => {
        handleVideoEnd();
    }, 10000); 

    return () => clearTimeout(timeout);
  }, []);

  const handleVideoEnd = () => {
    // Animation de sortie avant de passer au site
    anime({
      targets: containerRef.current,
      opacity: 0,
      duration: 800,
      easing: 'easeOutQuad',
      complete: onComplete
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Overlay optionnel pour style cinématique */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
};

export default IntroVideo;
