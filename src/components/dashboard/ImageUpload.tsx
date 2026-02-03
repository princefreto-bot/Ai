import { useState, useCallback } from 'react';
import { Upload, Image, X, Loader2, Lock, Sparkles, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useStore } from '@/store/useStore';
import { analyzeChart } from '@/services/aiAnalysis';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

export function ImageUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isAnalyzing, setIsAnalyzing, addAnalysis, user } = useStore();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !user?.isSubscribed) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeChart(selectedImage);
      addAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const isSubscribed = user?.isSubscribed;

  // Particles flottantes
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative p-6 shadow-xl shadow-slate-200/50 border-slate-100 overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-pink-400 to-rose-400 opacity-20"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                bottom: -10,
              }}
              animate={{
                y: [-10, -200],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-4 relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-slate-900">Analyser un graphique</h3>
          </div>
          {isSubscribed && (
            <motion.span 
              className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full flex items-center gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Abonnement actif
            </motion.span>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.div 
              key="locked"
              className="text-center py-12 relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {/* Lock animation */}
              <motion.div 
                className="relative w-24 h-24 mx-auto mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl blur-xl opacity-40"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="relative w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lock className="w-12 h-12 text-pink-500" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.h4 
                className="text-xl font-bold text-slate-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Abonnement requis
              </motion.h4>
              <motion.p 
                className="text-slate-600 mb-6 max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Souscrivez à un abonnement Pro pour accéder aux analyses IA illimitées.
              </motion.p>
              
              <Link to="/pricing">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="shadow-lg shadow-pink-200/50 relative overflow-hidden group">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Voir les tarifs - 20$/mois
                    </span>
                  </Button>
                </motion.div>
              </Link>

              {/* Features mini */}
              <motion.div 
                className="flex justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: Sparkles, text: "Analyses illimitées" },
                  { icon: Zap, text: "Résultats instant" },
                  { icon: Shield, text: "100% sécurisé" },
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-500"
                    whileHover={{ scale: 1.05, color: '#ec4899' }}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : !selectedImage ? (
            <motion.div
              key="upload"
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 z-10',
                dragActive 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-slate-300 hover:border-pink-400 hover:bg-pink-50/30'
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: dragActive 
                    ? 'linear-gradient(90deg, #ec4899, #f43f5e, #ec4899)' 
                    : 'transparent',
                  backgroundSize: '200% 100%',
                  padding: '2px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                }}
                animate={dragActive ? { backgroundPosition: ['0% 0%', '200% 0%'] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />

              <div className="flex flex-col items-center gap-4">
                <motion.div 
                  className="relative"
                  animate={dragActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: dragActive ? Infinity : 0 }}
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl blur-xl opacity-30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-200/50">
                    <motion.div
                      animate={{ y: dragActive ? [-5, 5, -5] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Upload className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <div>
                  <motion.p 
                    className="text-xl font-bold text-slate-900"
                    animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {dragActive ? 'Déposez votre image !' : 'Glissez votre image ici'}
                  </motion.p>
                  <p className="text-slate-500 mt-2">
                    ou cliquez pour sélectionner un fichier
                  </p>
                </div>
                
                <motion.p 
                  className="text-sm text-slate-400 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Image className="w-4 h-4" />
                  PNG, JPG, WEBP jusqu'à 10MB
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              className="space-y-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Image preview */}
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src={selectedImage}
                  alt="Chart to analyze"
                  className="w-full h-72 object-contain bg-slate-100 rounded-2xl border border-slate-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                />
                
                {/* Close button */}
                <motion.button
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-slate-600" />
                </motion.button>
                
                {/* Overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl flex items-end justify-center pb-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    Cliquez sur X pour changer d'image
                  </span>
                </motion.div>
              </motion.div>

              {/* Status bar */}
              <motion.div 
                className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Image className="w-5 h-5 text-green-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Image prête pour l'analyse</p>
                  <p className="text-sm text-slate-500">Notre IA va détecter les patterns et signaux</p>
                </div>
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Analyze button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
                  whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
                >
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50 relative overflow-hidden"
                    size="lg"
                  >
                    {/* Shimmer effect */}
                    {!isAnalyzing && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    
                    <span className="relative flex items-center justify-center gap-2">
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="w-5 h-5" />
                          </motion.div>
                          <span>Analyse en cours...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Lancer l'analyse IA</span>
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Processing indicator */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100"
                  >
                    <div className="flex items-center gap-4">
                      {['Détection patterns', 'Analyse tendances', 'Génération signal'].map((step, i) => (
                        <motion.div
                          key={step}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.5, delay: i * 0.5, repeat: Infinity }}
                          />
                          <span className="text-sm text-slate-600">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
