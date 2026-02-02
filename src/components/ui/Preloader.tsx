import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation fluide de la barre de 0% à 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200); // Petite pause à 100% avant de couper
          return 100;
        }
        // Vitesse variable pour simuler un chargement réaliste
        // Plus rapide au début, un peu plus lent vers la fin
        const increment = prev > 80 ? 2 : 5; 
        return prev + increment;
      });
    }, 30); // ~1.5 secondes total pour 100%

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-start items-center">
      {/* Barre de chargement fine tout en haut */}
      <div className="w-full h-1 bg-gray-900 absolute top-0 left-0">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(236,72,153,0.7)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optionnel: Petit logo ou texte discret au centre pendant le chargement de la barre */}
      <div className="flex-1 flex items-center justify-center opacity-0 animate-pulse-slow">
         {/* Vide pour l'instant pour rester minimaliste comme demandé */}
      </div>
    </div>
  );
};

export default Preloader;
