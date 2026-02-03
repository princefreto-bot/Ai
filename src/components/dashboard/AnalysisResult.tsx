import { AnalysisResult as AnalysisResultType } from '@/types';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  result: AnalysisResultType;
}

// Animated counter component
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count}</span>;
}

// Animated progress circle
function ProgressCircle({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-slate-100"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          className={color}
          initial={{ strokeDasharray: "0 251" }}
          animate={{ strokeDasharray: `${value * 2.51} 251` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <span className={cn('text-2xl font-bold', color)}>
          <AnimatedCounter value={value} />%
        </span>
      </motion.div>
    </div>
  );
}

export function AnalysisResult({ result }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getSignalConfig = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return {
          icon: TrendingUp,
          color: 'text-green-500',
          bg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
          border: 'border-green-500',
          glow: 'shadow-green-500/20',
          label: 'BUY',
          emoji: '📈',
        };
      case 'SELL':
        return {
          icon: TrendingDown,
          color: 'text-red-500',
          bg: 'bg-gradient-to-br from-red-500/10 to-rose-500/10',
          border: 'border-red-500',
          glow: 'shadow-red-500/20',
          label: 'SELL',
          emoji: '📉',
        };
      default:
        return {
          icon: Minus,
          color: 'text-yellow-500',
          bg: 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10',
          border: 'border-yellow-500',
          glow: 'shadow-yellow-500/20',
          label: 'WAIT',
          emoji: '⏸️',
        };
    }
  };

  const getGradeConfig = (grade: string) => {
    switch (grade) {
      case 'A+':
        return { color: 'text-green-500', bg: 'bg-green-100', ring: 'ring-green-500' };
      case 'A':
        return { color: 'text-green-600', bg: 'bg-green-50', ring: 'ring-green-400' };
      case 'B':
        return { color: 'text-yellow-600', bg: 'bg-yellow-50', ring: 'ring-yellow-400' };
      default:
        return { color: 'text-orange-600', bg: 'bg-orange-50', ring: 'ring-orange-400' };
    }
  };

  const signalConfig = getSignalConfig(result.signal);
  const gradeConfig = getGradeConfig(result.setupGrade);
  const SignalIcon = signalConfig.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Signal Card */}
      <motion.div variants={itemVariants}>
        <Card className={cn(
          'relative p-6 border-2 overflow-hidden',
          signalConfig.border
        )}>
          {/* Animated background gradient */}
          <motion.div
            className={cn('absolute inset-0 opacity-30', signalConfig.bg)}
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Activity className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900">Signal Principal</h3>
              </motion.div>
              
              <motion.span 
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-bold ring-2',
                  gradeConfig.bg,
                  gradeConfig.color,
                  gradeConfig.ring
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                Grade {result.setupGrade}
              </motion.span>
            </div>
            
            <motion.div 
              className={cn(
                'flex items-center gap-6 p-6 rounded-2xl',
                signalConfig.bg
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {/* Signal icon with animation */}
              <motion.div 
                className={cn(
                  'relative w-20 h-20 rounded-2xl flex items-center justify-center',
                  signalConfig.bg
                )}
                animate={{ 
                  boxShadow: [
                    `0 0 0 0 ${result.signal === 'BUY' ? 'rgba(34, 197, 94, 0.4)' : result.signal === 'SELL' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
                    `0 0 0 20px ${result.signal === 'BUY' ? 'rgba(34, 197, 94, 0)' : result.signal === 'SELL' ? 'rgba(239, 68, 68, 0)' : 'rgba(234, 179, 8, 0)'}`,
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  animate={{ 
                    y: result.signal === 'BUY' ? [0, -5, 0] : result.signal === 'SELL' ? [0, 5, 0] : [0, 0, 0],
                    rotate: result.signal === 'WAIT' ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <SignalIcon className={cn('w-12 h-12', signalConfig.color)} />
                </motion.div>
              </motion.div>
              
              {/* Signal text */}
              <div className="flex-1">
                <motion.div 
                  className={cn('text-4xl font-black flex items-center gap-3', signalConfig.color)}
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <span>{signalConfig.label}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {signalConfig.emoji}
                  </motion.span>
                </motion.div>
                <motion.div 
                  className="text-slate-600 mt-1 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Zap className="w-4 h-4" />
                  Confiance: <span className="font-bold">{result.confidenceLevel}%</span>
                </motion.div>
              </div>
              
              {/* Progress circle */}
              <ProgressCircle value={result.confidenceLevel} color={signalConfig.color} />
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Entry Zone, SL, TP */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Entry Zone */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-5 h-full relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Target className="w-6 h-6 text-blue-600" />
                      </motion.div>
                      <h4 className="font-bold text-slate-900">Zone d'entrée</h4>
                    </div>
                    <motion.div 
                      className="text-2xl font-black text-slate-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {result.entryZone.min} - {result.entryZone.max}
                    </motion.div>
                    <p className="text-sm text-slate-500 mt-1">Entry Zone</p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Stop Loss */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-5 h-full relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center"
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Shield className="w-6 h-6 text-red-600" />
                      </motion.div>
                      <h4 className="font-bold text-slate-900">Stop Loss</h4>
                    </div>
                    <motion.div 
                      className="text-2xl font-black text-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {result.stopLoss}
                    </motion.div>
                    <p className="text-sm text-slate-500 mt-1">Protection du capital</p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Take Profit */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-5 h-full relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </motion.div>
                      <h4 className="font-bold text-slate-900">Take Profit</h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'TP1', value: result.takeProfit.tp1, delay: 0.3 },
                        { label: 'TP2', value: result.takeProfit.tp2, delay: 0.4 },
                        { label: 'TP3', value: result.takeProfit.tp3, delay: 0.5 },
                      ].map((tp) => (
                        <motion.div 
                          key={tp.label}
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: tp.delay }}
                        >
                          <span className="text-sm text-slate-600 font-medium">{tp.label}:</span>
                          <motion.span 
                            className="font-bold text-green-600 text-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tp.value}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patterns Detected */}
      <motion.div variants={itemVariants}>
        <Card className="p-5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </motion.div>
            <h4 className="font-bold text-slate-900 text-lg">Patterns Détectés</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.detectedPatterns.map((pattern, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full text-sm font-medium border border-slate-200 cursor-default"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: '#fce7f3',
                  borderColor: '#ec4899'
                }}
              >
                {pattern}
              </motion.span>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Explanation */}
      <motion.div variants={itemVariants}>
        <Card className="p-5 relative overflow-hidden">
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(90deg, #ec4899, #f43f5e, #ec4899)',
              backgroundSize: '200% 100%',
              padding: '2px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
            }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 20px rgba(236, 72, 153, 0.3)', '0 0 40px rgba(236, 72, 153, 0.5)', '0 0 20px rgba(236, 72, 153, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Info className="w-6 h-6 text-white" />
              </motion.div>
              <h4 className="font-bold text-slate-900 text-lg">Explication IA</h4>
            </div>
            <motion.p 
              className="text-slate-700 leading-relaxed text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {result.explanation}
            </motion.p>
          </div>
        </Card>
      </motion.div>

      {/* Disclaimer */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
        </motion.div>
        <p className="text-sm text-yellow-800">
          <strong>Avertissement :</strong> Cette analyse est fournie à titre informatif uniquement 
          et ne constitue pas un conseil financier. Tradez toujours de manière responsable.
        </p>
      </motion.div>
    </motion.div>
  );
}
