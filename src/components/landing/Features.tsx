import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Card3D from '../animations/Card3D';
import { 
  Eye, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Clock, 
  Target, 
  LineChart
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Computer Vision Avancée',
    description: 'Notre IA analyse visuellement vos graphiques comme le ferait un trader professionnel.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: TrendingUp,
    title: 'Détection de Tendances',
    description: 'Identification automatique des tendances haussières, baissières et des phases de consolidation.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Supports & Résistances',
    description: 'Repérage précis des niveaux clés de support et résistance sur votre graphique.',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Détection de Cassures',
    description: 'Alertes sur les breakouts potentiels et les faux signaux de cassure.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: LineChart,
    title: 'Patterns Chartistes',
    description: 'Reconnaissance des figures : triangles, têtes-épaules, drapeaux, wedges...',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Target,
    title: 'Zones de TP/SL',
    description: 'Suggestions automatiques de Take Profit (TP1, TP2, TP3) et Stop Loss.',
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Clock,
    title: 'Analyse en 5 secondes',
    description: 'Résultats instantanés pour ne jamais rater une opportunité de trading.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Score de Confiance',
    description: 'Chaque analyse inclut un pourcentage de confiance et une note de qualité du setup.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden" 
      id="features"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4" />
            Fonctionnalités Puissantes
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Une IA conçue pour
            <motion.span 
              className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              le trading
            </motion.span>
          </h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Des fonctionnalités puissantes pour des analyses de qualité professionnelle
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card3D className="h-full group">
                <motion.div 
                  className="h-full p-8 bg-white rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  whileHover={{ y: -10 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div 
                    className="mt-4 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
