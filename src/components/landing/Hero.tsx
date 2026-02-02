import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, Star, CheckCircle } from 'lucide-react';
import AnimatedGradient from '../animations/AnimatedGradient';
import TextReveal from '../animations/TextReveal';
import AnimatedCounter from '../animations/AnimatedCounter';
import Card3D from '../animations/Card3D';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const benefits = [
    { text: "Zone d'entrée précise", icon: TrendingUp },
    { text: "Stop Loss automatique", icon: Shield },
    { text: "TP1, TP2, TP3 calculés", icon: Zap },
    { text: "Score de confiance IA", icon: Star },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-pink-50/30 to-white py-16 lg:py-24"
    >
      {/* Animated Background */}
      <AnimatedGradient />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div 
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge animé */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 text-pink-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-200/30 border border-pink-200/50"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span>IA de Scalping #1 en 2026</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-3 h-3 fill-pink-400 text-pink-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Heading avec TextReveal */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextReveal delay={0.3}>
                Analysez vos graphiques avec
              </TextReveal>
              <motion.span 
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent block mt-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
              >
                l'IA la plus rapide
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="font-bold text-slate-800">TradeScalpSnip</span> analyse vos captures d'écran TradingView et génère des signaux 
              <span className="font-semibold text-pink-600"> BUY, SELL</span> ou 
              <span className="font-semibold text-amber-600"> WAIT</span> en moins de 5 secondes.
            </motion.p>

            {/* Benefits Grid avec stagger animation */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                }
              }}
            >
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -30, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 100, damping: 12 }
                    }
                  }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-slate-100 cursor-pointer"
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center shadow-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="glow" size="xl" className="group text-lg px-8">
                    Commencer - 20$/mois
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/pricing">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="group">
                    Voir les tarifs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust elements */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                "Sans engagement",
                "Annulation en 1 clic",
                "Garantie 14 jours"
              ].map((text, i) => (
                <motion.span 
                  key={i}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Demo Preview avec Card3D */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <Card3D className="group">
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-[2rem] blur-2xl opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-[2rem] p-1 shadow-2xl shadow-pink-300/30">
                <div className="bg-slate-900 rounded-[1.8rem] p-5 lg:p-6">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-1.5">
                      {['red', 'yellow', 'green'].map((color, i) => (
                        <motion.div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-${color}-500`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          style={{ backgroundColor: color === 'red' ? '#ef4444' : color === 'yellow' ? '#eab308' : '#22c55e' }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg px-3 py-1.5 ml-3">
                      <span className="text-slate-400 text-xs font-medium">app.tradescalpsnip.com</span>
                    </div>
                  </div>
                  
                  {/* Analysis Result Demo */}
                  <div className="space-y-4">
                    {/* Signal Header */}
                    <motion.div 
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">Signal Détecté</p>
                          <motion.p 
                            className="text-green-300 text-3xl font-black flex items-center gap-2"
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 1, type: "spring" }}
                          >
                            BUY <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                          </motion.p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-xs mb-1">Confiance IA</p>
                          <p className="text-white text-2xl font-black">
                            <AnimatedCounter value={87} suffix="%" />
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Entry, SL, TP */}
                    <motion.div 
                      className="grid grid-cols-3 gap-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1, delayChildren: 1 }
                        }
                      }}
                    >
                      {[
                        { label: "Entry Zone", value: "4,150 - 4,200", color: "text-white" },
                        { label: "Stop Loss", value: "3,980", color: "text-red-400" },
                        { label: "Grade", value: "A+", color: "text-shimmer", isGrade: true },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50"
                        >
                          <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                          <p className={`${item.color} font-bold ${item.isGrade ? 'text-xl' : ''}`}>
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Take Profits */}
                    <motion.div 
                      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <p className="text-slate-400 text-xs mb-3">Take Profits</p>
                      <div className="flex justify-between">
                        {[
                          { label: "TP1", value: "4,380" },
                          { label: "TP2", value: "4,520" },
                          { label: "TP3", value: "4,750" },
                        ].map((tp, i) => (
                          <motion.div 
                            key={i}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                          >
                            <p className="text-green-400 font-bold">{tp.label}</p>
                            <p className="text-white text-sm">{tp.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Patterns */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      {['Bull Flag', 'Breakout', 'RSI Divergence'].map((pattern, i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium border border-pink-500/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.6 + i * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {pattern}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Floating stats cards */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl shadow-slate-300/50 border border-slate-100 hidden lg:block"
              initial={{ opacity: 0, y: 50, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-2xl font-black text-slate-900">&lt;5s</p>
                  <p className="text-xs text-slate-500">Temps d'analyse</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl shadow-slate-300/50 border border-slate-100 hidden lg:block"
              initial={{ opacity: 0, y: -50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.4, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-2xl font-black text-slate-900">
                    <AnimatedCounter value={95} suffix="%" />
                  </p>
                  <p className="text-xs text-slate-500">Précision IA</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
