import { Header } from '@/components/layout/Header';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { AnalysisResult } from '@/components/dashboard/AnalysisResult';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { BarChart3, Clock, Crown, Activity, Target, ArrowUpRight, ArrowDownRight, Minus, Sparkles, TrendingUp, Zap, Shield } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

// Floating Particles Background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-500/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Stat Card Component with 3D Hover
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  badge,
  delay 
}: { 
  icon: React.ElementType;
  label: string;
  value: number;
  color: 'pink' | 'green' | 'red' | 'yellow';
  badge: string;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    pink: {
      gradient: 'from-pink-500 to-rose-600',
      shadow: 'shadow-pink-500/30',
      border: 'hover:border-pink-500/50',
      glow: 'hover:shadow-pink-500/20',
      bg: 'from-pink-500/10',
      text: 'text-white'
    },
    green: {
      gradient: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/30',
      border: 'hover:border-green-500/50',
      glow: 'hover:shadow-green-500/20',
      bg: 'from-green-500/10',
      text: 'text-green-400'
    },
    red: {
      gradient: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-500/30',
      border: 'hover:border-red-500/50',
      glow: 'hover:shadow-red-500/20',
      bg: 'from-red-500/10',
      text: 'text-red-400'
    },
    yellow: {
      gradient: 'from-yellow-500 to-amber-600',
      shadow: 'shadow-yellow-500/30',
      border: 'hover:border-yellow-500/50',
      glow: 'hover:shadow-yellow-500/20',
      bg: 'from-yellow-500/10',
      text: 'text-yellow-400'
    }
  };

  const c = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        rotateX: 5,
        rotateY: 5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6 ${c.border} transition-all duration-500 hover:shadow-2xl ${c.glow} cursor-pointer`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${c.bg} to-transparent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`w-12 h-12 bg-gradient-to-br ${c.gradient} rounded-xl flex items-center justify-center shadow-lg ${c.shadow}`}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div 
            className={`text-xs ${color === 'pink' ? 'text-slate-500 bg-slate-800' : `text-${color}-400 bg-${color}-500/20`} px-2 py-1 rounded-full font-semibold`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            {badge}
          </motion.div>
        </div>
        <p className="text-sm text-slate-400 font-medium mb-1">{label}</p>
        <p className={`text-4xl font-black ${c.text}`}>
          <AnimatedCounter value={value} duration={1.5} />
        </p>
      </div>
    </motion.div>
  );
}

// History Card Component
function HistoryCard({ 
  analysis, 
  index, 
  onClick 
}: { 
  analysis: any;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.15)"
      }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 p-4 cursor-pointer hover:border-pink-500/50 transition-all duration-300"
    >
      {/* Hover gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative">
          <motion.img 
            src={analysis.imageUrl} 
            alt="Chart" 
            className="w-20 h-20 object-cover rounded-xl bg-slate-800 border border-slate-700"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div 
            className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
              analysis.signal === 'BUY' ? 'bg-green-500 shadow-green-500/50' :
              analysis.signal === 'SELL' ? 'bg-red-500 shadow-red-500/50' : 'bg-yellow-500 shadow-yellow-500/50'
            }`}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {analysis.signal === 'BUY' ? '↑' : analysis.signal === 'SELL' ? '↓' : '—'}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <motion.div 
            className={`text-2xl font-black ${
              analysis.signal === 'BUY' ? 'text-green-400' :
              analysis.signal === 'SELL' ? 'text-red-400' : 'text-yellow-400'
            }`}
            initial={{ x: -10 }}
            animate={{ x: 0 }}
          >
            {analysis.signal}
          </motion.div>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-sm text-slate-400">
              Confiance: <span className="font-semibold text-white">{analysis.confidenceLevel}%</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {new Date(analysis.timestamp).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        
        <motion.div 
          className={`px-3 py-1.5 rounded-xl text-sm font-bold ${
            analysis.setupGrade === 'A+' || analysis.setupGrade === 'A' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : analysis.setupGrade === 'B'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-slate-700 text-slate-400 border border-slate-600'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {analysis.setupGrade}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Loading Spinner Component
function AnalyzingLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-lg"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <Card className="relative p-10 text-center bg-slate-900/90 backdrop-blur-sm border-slate-700/50">
        <div className="flex flex-col items-center gap-6">
          {/* Animated DNA/Neural loader */}
          <div className="relative w-28 h-28">
            {/* Outer ring */}
            <motion.div 
              className="absolute inset-0 border-4 border-pink-500/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle ring */}
            <motion.div 
              className="absolute inset-2 border-4 border-transparent border-t-pink-500 border-r-purple-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner ring */}
            <motion.div 
              className="absolute inset-4 border-4 border-transparent border-b-rose-500 border-l-pink-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Center pulse */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/50" />
            </motion.div>
            
            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: -6,
                  marginLeft: -6,
                }}
                animate={{
                  x: [0, 40, 0, -40, 0],
                  y: [-40, 0, 40, 0, -40],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div>
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Analyse en cours...
            </motion.h3>
            <p className="text-slate-400">
              Notre IA examine votre graphique avec précision
            </p>
            
            {/* Progress indicators */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {['Détection', 'Patterns', 'Signaux'].map((step, i) => (
                <motion.div
                  key={step}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.8, duration: 0.5 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-pink-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: i * 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="text-xs text-slate-500">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Dashboard() {
  const { isAuthenticated, user, currentAnalysis, analyses, isAnalyzing } = useStore();

  // Analyse prioritaire après paiement (2h)
  const [priorityUntil, setPriorityUntil] = useState<number | null>(null);
  useEffect(() => {
    const ts = localStorage.getItem('priority_until');
    if (ts) setPriorityUntil(parseInt(ts, 10));
  }, []);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // priority banner helper values computed inline in render

  // Calcul des vraies stats
  const stats = {
    analyses: analyses.length,
    buy: analyses.filter(a => a.signal === 'BUY').length,
    sell: analyses.filter(a => a.signal === 'SELL').length,
    wait: analyses.filter(a => a.signal === 'WAIT').length,
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingParticles />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <Header />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <motion.h1 
              className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bienvenue, {user?.name}
            </motion.h1>
            <motion.span 
              className="text-4xl"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              👋
            </motion.span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {user?.isSubscribed ? (
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
              >
                <Crown className="w-5 h-5" />
                <span className="font-medium">Abonnement Pro actif - Analyses illimitées</span>
                <Sparkles className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400"
                animate={{ boxShadow: ["0 0 0px rgba(245, 158, 11, 0)", "0 0 15px rgba(245, 158, 11, 0.3)", "0 0 0px rgba(245, 158, 11, 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-5 h-5" />
                <span>Abonnez-vous pour accéder aux analyses IA</span>
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Priority banner */}
        {priorityUntil && now < priorityUntil && (
          <motion.div 
            className="mb-6 p-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 text-pink-200 flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5" />
              <span className="font-bold">Analyse prioritaire active</span>
            </div>
            <div className="text-sm">
              Se termine dans {Math.floor((Math.max(0, priorityUntil - now) / 1000) / 60)}m {Math.floor((Math.max(0, priorityUntil - now) / 1000) % 60)}s
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          <StatCard
            icon={BarChart3}
            label="Analyses"
            value={stats.analyses}
            color="pink"
            badge="Total"
            delay={0.1}
          />
          <StatCard
            icon={ArrowUpRight}
            label="Signaux BUY"
            value={stats.buy}
            color="green"
            badge="BUY"
            delay={0.2}
          />
          <StatCard
            icon={ArrowDownRight}
            label="Signaux SELL"
            value={stats.sell}
            color="red"
            badge="SELL"
            delay={0.3}
          />
          <StatCard
            icon={Minus}
            label="Signaux WAIT"
            value={stats.wait}
            color="yellow"
            badge="WAIT"
            delay={0.4}
          />
        </div>

        {/* Subscription Status Bar */}
        <motion.div 
          className={`mb-3 p-4 rounded-2xl border backdrop-blur-sm ${user?.isSubscribed 
            ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-pink-500/30' 
            : 'bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  user?.isSubscribed 
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30' 
                    : 'bg-slate-700'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {user?.isSubscribed ? <Crown className="w-7 h-7 text-white" /> : <Target className="w-7 h-7 text-slate-400" />}
              </motion.div>
              <div>
                <p className="font-bold text-lg text-white flex items-center gap-2">
                  {user?.isSubscribed ? 'Plan Pro Actif' : 'Plan Gratuit'}
                  {user?.isSubscribed && (
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-pink-400" />
                    </motion.span>
                  )}
                </p>
                <p className="text-slate-400 text-sm">
                  {user?.isSubscribed 
                    ? 'Accès illimité à toutes les fonctionnalités' 
                    : 'Passez à Pro pour débloquer les analyses IA'
                  }
                </p>
              </div>
            </div>
            {!user?.isSubscribed && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/pricing"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-bold text-white overflow-hidden transition-transform"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Crown className="w-5 h-5" />
                  <span>Passer à Pro</span>
                  <Zap className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-lg opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-pink-500/30 transition-colors duration-300">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.span 
                    className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <TrendingUp className="w-4 h-4 text-white" />
                  </motion.span>
                  Analyser un graphique
                </h2>
                <ImageUpload />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <AnalyzingLoader key="loader" />
              ) : currentAnalysis ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <AnalysisResult result={currentAnalysis} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full min-h-[300px]"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-3xl blur-lg" />
                  <Card className="relative h-full p-10 text-center bg-slate-900/80 backdrop-blur-sm border-slate-700/50 flex flex-col items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mb-6"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <BarChart3 className="w-10 h-10 text-slate-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Aucune analyse
                    </h3>
                    <p className="text-slate-400 max-w-xs">
                      {user?.isSubscribed 
                        ? 'Uploadez un graphique pour commencer votre analyse IA' 
                        : 'Abonnez-vous pour analyser vos graphiques de trading'
                      }
                    </p>
                    {!user?.isSubscribed && (
                      <motion.div
                        className="mt-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link 
                          to="/pricing"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 text-sm font-medium hover:bg-pink-500/30 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Débloquer l'accès
                        </Link>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Analysis History */}
        <AnimatePresence>
          {analyses.length > 0 && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-6 h-6 text-pink-500" />
                  </motion.div>
                  Historique des analyses
                </h2>
                <motion.span 
                  className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  {analyses.length} analyse{analyses.length > 1 ? 's' : ''}
                </motion.span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyses.slice(0, 6).map((analysis, index) => (
                  <HistoryCard
                    key={analysis.id}
                    analysis={analysis}
                    index={index}
                    onClick={() => useStore.getState().setCurrentAnalysis(analysis)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
