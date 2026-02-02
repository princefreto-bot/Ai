import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('complete');
          setTimeout(onComplete, 800);
          return 100;
        }
        const increment = prev > 90 ? 1 : prev > 70 ? 2 : 4;
        return prev + increment;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Textes qui défilent pendant le chargement
  const loadingTexts = [
    { text: "Initialisation IA", threshold: 0 },
    { text: "Chargement des modèles", threshold: 25 },
    { text: "Analyse des patterns", threshold: 50 },
    { text: "Préparation du dashboard", threshold: 75 },
    { text: "Prêt !", threshold: 95 },
  ];

  const currentText = [...loadingTexts].reverse().find(t => progress >= t.threshold)?.text || "";

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Orbes animés */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo central animé */}
          <div className="relative mb-12">
            {/* Anneaux rotatifs */}
            <motion.div
              className="absolute inset-0 w-32 h-32 -m-4"
              style={{
                border: '2px solid transparent',
                borderTopColor: 'rgb(236, 72, 153)',
                borderRadius: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 w-28 h-28 -m-2"
              style={{
                border: '2px solid transparent',
                borderRightColor: 'rgb(168, 85, 247)',
                borderRadius: '50%',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 w-24 h-24"
              style={{
                border: '1px solid transparent',
                borderBottomColor: 'rgb(99, 102, 241)',
                borderRadius: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo central */}
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/30"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(236, 72, 153, 0.3)',
                  '0 0 60px rgba(236, 72, 153, 0.5)',
                  '0 0 30px rgba(236, 72, 153, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span 
                className="text-white font-bold text-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TS
              </motion.span>
            </motion.div>
          </div>

          {/* Barre de progression principale */}
          <div className="w-80 md:w-96 mb-6">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 blur-sm"
                style={{ width: `${progress}%` }}
              />
              {/* Barre principale */}
              <motion.div
                className="relative h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Pourcentage */}
          <motion.div 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4"
            key={progress}
          >
            {progress}%
          </motion.div>

          {/* Texte de statut */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 text-sm tracking-widest uppercase"
            >
              {currentText}
            </motion.p>
          </AnimatePresence>

          {/* Particules flottantes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Barre fine en haut (backup visuel) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
