import { Upload, Brain, Target, CheckCircle, Sparkles } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const steps = [
  {
    icon: Upload,
    title: 'Uploadez votre graphique',
    description: 'Prenez une capture d\'écran de votre graphique TradingView ou toute autre plateforme et uploadez-la.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500',
    shadow: 'shadow-blue-500/30',
  },
  {
    icon: Brain,
    title: 'Analyse IA instantanée',
    description: 'Notre algorithme de Computer Vision analyse les patterns, tendances, supports et résistances.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500',
    shadow: 'shadow-purple-500/30',
  },
  {
    icon: Target,
    title: 'Recevez vos signaux',
    description: 'Obtenez un signal BUY/SELL/WAIT avec zones d\'entrée, stop loss et take profits.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500',
    shadow: 'shadow-pink-500/30',
  },
  {
    icon: CheckCircle,
    title: 'Tradez en confiance',
    description: 'Utilisez les explications de l\'IA et le score de confiance pour prendre vos décisions.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500',
    shadow: 'shadow-emerald-500/30',
  },
];

// Composant de carte 3D avec effet de perspective
function Step3DCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Glow effect behind card */}
        <motion.div
          className={`absolute -inset-4 bg-gradient-to-br ${step.color} rounded-3xl opacity-0 blur-2xl`}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main card */}
        <motion.div 
          className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Step number with pulse */}
          <motion.div 
            className={`absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl ${step.shadow}`}
            style={{ transform: "translateZ(30px)" }}
            whileHover={{ scale: 1.2, rotate: 12 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>{index + 1}</span>
            {/* Orbiting particle */}
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ 
                x: 24, 
                y: 0,
                transformOrigin: "-16px 0px"
              }}
            />
          </motion.div>
          
          {/* Icon container with 3D effect */}
          <motion.div 
            className={`relative flex items-center justify-center w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl mb-8 mx-auto shadow-2xl ${step.shadow}`}
            style={{ transform: "translateZ(40px)" }}
            whileHover={{ scale: 1.1, rotateY: 180 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <step.icon className="w-12 h-12 text-white" />
            
            {/* Floating particles around icon */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  x: [0, (i - 1) * 15, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${30 + i * 20}%`,
                  bottom: '10%',
                }}
              />
            ))}
          </motion.div>
          
          {/* Title with gradient on hover */}
          <motion.h3 
            className={`text-xl font-bold mb-4 text-center transition-all duration-300 ${isHovered ? 'bg-gradient-to-r from-slate-900 via-pink-500 to-slate-900 bg-clip-text text-transparent' : 'text-slate-900'}`}
            style={{ transform: "translateZ(20px)" }}
          >
            {step.title}
          </motion.h3>
          
          <motion.p 
            className="text-slate-600 text-center leading-relaxed"
            style={{ transform: "translateZ(10px)" }}
          >
            {step.description}
          </motion.p>
          
          {/* Bottom accent line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Ligne de connexion animée
function AnimatedConnectionLine() {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px" });
  
  return (
    <div ref={lineRef} className="hidden lg:block absolute top-32 left-[10%] right-[10%] h-2">
      {/* Background line */}
      <div className="absolute inset-0 bg-slate-200 rounded-full" />
      
      {/* Animated gradient line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-emerald-500 rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      />
      
      {/* Traveling light effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full"
        animate={isInView ? { x: ['-10%', '110%'] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 2, ease: "linear" }}
      />
      
      {/* Connection dots */}
      {[0, 33, 66, 100].map((position, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
          style={{ 
            left: `${position}%`,
            background: ['#3b82f6', '#a855f7', '#ec4899', '#10b981'][i]
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.2, type: "spring" }}
        />
      ))}
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden" id="how-it-works">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              background: ['#3b82f6', '#a855f7', '#ec4899', '#10b981', '#f59e0b'][i],
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Top and bottom lines */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-200/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Processus Simple
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block">4 étapes pour des</span>
            <motion.span 
              className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              analyses pro
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un processus simple et rapide pour obtenir des analyses professionnelles
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated connection line */}
          <AnimatedConnectionLine />
          
          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <Step3DCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
        
        {/* Bottom CTA hint */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-slate-500"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Prêt à commencer ?</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}