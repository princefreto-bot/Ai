import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Check, 
  Zap, 
  Crown, 
  Shield, 
  ArrowRight, 
  Star, 
  Lock,
  X,
  Wallet,
  Loader2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';

// Composant 3D Card avec effet de perspective
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Composant pour les particules flottantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, -100, null],
            x: [null, Math.random() * 100 - 50, null],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export function Pricing() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise' | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);
  const [widgetError, setWidgetError] = useState(false);

  // Reset loading state when modal opens
  useEffect(() => {
    if (showPaymentModal) {
      setIsWidgetLoading(true);
      setWidgetError(false);
      
      // Timeout pour détecter si le widget ne charge pas
      const timeout = setTimeout(() => {
        setIsWidgetLoading(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [showPaymentModal]);

  const plans = [
    {
      id: 'pro' as const,
      name: 'Pro',
      price: 20,
      period: '/mois',
      description: 'Parfait pour les traders actifs',
      icon: Zap,
      color: 'from-pink-500 to-rose-500',
      shadowColor: 'shadow-pink-500/25',
      widgetId: '6221919011', // Widget ID NowPayments pour le plan Pro
      features: [
        '100 analyses par mois',
        'Signaux IA précis (BUY/SELL/WAIT)',
        'Zones d\'entrée optimales',
        'Stop Loss calculé',
        'Take Profit TP1, TP2, TP3',
        'Détection de patterns',
        'Score de confiance IA',
        'Support par email',
      ],
      popular: true,
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: 99,
      period: '/mois',
      description: 'Pour les traders professionnels',
      icon: Crown,
      color: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-500/25',
      widgetId: '5896698183', // Widget ID NowPayments pour le plan Enterprise
      features: [
        'Analyses illimitées',
        'Tout le plan Pro inclus',
        'Traitement IA prioritaire',
        'Reconnaissance avancée des patterns',
        'Accès API',
        'Support dédié 24/7',
        'Intégrations personnalisées',
        'Analyses multi-timeframes',
      ],
      popular: false,
    },
  ];

  const cryptoLogos = [
    { name: 'Bitcoin', icon: '₿', color: '#F7931A' },
    { name: 'Ethereum', icon: 'Ξ', color: '#627EEA' },
    { name: 'USDT', icon: '₮', color: '#26A17B' },
    { name: 'Litecoin', icon: 'Ł', color: '#BFBBBB' },
    { name: 'Solana', icon: '◎', color: '#9945FF' },
  ];

  const handleSelectPlan = (planId: 'pro' | 'enterprise') => {
    if (!user) {
      navigate('/register');
      return;
    }
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setIsWidgetLoading(true);
    setWidgetError(false);
  };

  const handleWidgetLoad = () => {
    setIsWidgetLoading(false);
    setWidgetError(false);
  };

  const handleWidgetError = () => {
    setIsWidgetLoading(false);
    setWidgetError(true);
  };

  const handleOpenInNewTab = () => {
    if (selectedPlanDetails) {
      window.open(`https://nowpayments.io/embeds/payment-widget?iid=${selectedPlanDetails.widgetId}`, '_blank');
    }
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <Header />
      
      {/* Background Elements */}
      <FloatingParticles />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="py-20 relative z-10" ref={sectionRef}>
        {/* Header */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4" />
            </motion.div>
            Choisissez votre plan
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tarification{' '}
            <motion.span 
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Simple
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Payez en crypto-monnaie via NowPayments. Bitcoin, Ethereum, USDT et +300 cryptos.
          </motion.p>
        </motion.div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isCurrentPlan = user?.plan === plan.id && user?.subscriptionStatus === 'active';
              
              return (
                <Card3D key={plan.id} className="perspective-1000">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -10 }}
                    className={`relative bg-white rounded-3xl p-8 transition-all duration-500 ${
                      plan.popular 
                        ? `ring-2 ring-pink-500 shadow-2xl ${plan.shadowColor}` 
                        : 'shadow-xl hover:shadow-2xl'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(236, 72, 153, 0.1) 45%, rgba(236, 72, 153, 0.2) 50%, rgba(236, 72, 153, 0.1) 55%, transparent 60%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mr-1"
                        >
                          ⭐
                        </motion.span>
                        Plus populaire
                      </motion.div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-8 relative" style={{ transform: 'translateZ(20px)' }}>
                      <motion.div 
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4 shadow-xl relative`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Glow effect behind icon */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.color} blur-xl opacity-50`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Icon className="w-8 h-8 relative z-10" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-500">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8" style={{ transform: 'translateZ(30px)' }}>
                      <motion.div 
                        className="flex items-baseline justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <motion.span 
                          className="text-5xl font-black text-slate-900"
                          whileHover={{ scale: 1.1 }}
                        >
                          ${plan.price}
                        </motion.span>
                        <span className="text-slate-500 ml-2">{plan.period}</span>
                      </motion.div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8" style={{ transform: 'translateZ(15px)' }}>
                      {plan.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mt-0.5`}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                          <span className="text-slate-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={isCurrentPlan}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                        isCurrentPlan
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : plan.popular
                            ? `bg-gradient-to-r ${plan.color} text-white shadow-xl ${plan.shadowColor}`
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                      whileHover={!isCurrentPlan ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isCurrentPlan ? { scale: 0.98 } : {}}
                      style={{ transform: 'translateZ(25px)' }}
                    >
                      {/* Shimmer on button */}
                      {!isCurrentPlan && (
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                            backgroundSize: '200% 100%',
                          }}
                          animate={{
                            backgroundPosition: ['200% 0', '-200% 0'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      )}
                      {isCurrentPlan ? (
                        <>
                          <Check className="w-5 h-5" />
                          Plan actuel
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5" />
                          Payer en Crypto
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </Card3D>
              );
            })}
          </div>

          {/* Trust badges - Crypto */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.p 
              className="text-slate-500 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Sparkles className="w-4 h-4 inline mr-2 text-pink-500" />
              +300 cryptos acceptées via NowPayments
            </motion.p>
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              {cryptoLogos.map((crypto, index) => (
                <motion.div 
                  key={crypto.name}
                  className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-lg border border-slate-100 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: `0 20px 40px -10px ${crypto.color}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: crypto.color }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {crypto.icon}
                  </motion.div>
                  <span className="text-slate-700 font-semibold">{crypto.name}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 mt-8 text-slate-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { icon: Shield, text: 'Paiement sécurisé' },
                { icon: Lock, text: 'Blockchain vérifié' },
                { icon: Zap, text: 'Confirmation rapide' },
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1, color: '#ec4899' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* NowPayments Badge */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 rounded-2xl shadow-xl cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-white font-black text-xs">NP</span>
                </motion.div>
                <div className="text-left relative z-10">
                  <p className="text-white font-bold text-sm">Powered by NowPayments</p>
                  <p className="text-slate-400 text-xs">Paiements crypto sécurisés</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Payment Modal with NowPayments Widget */}
      <AnimatePresence>
        {showPaymentModal && selectedPlanDetails && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bouton fermer VISIBLE EN HAUT À DROITE (Desktop uniquement) */}
            <motion.button
              onClick={handleCloseModal}
              className="hidden md:flex fixed top-6 right-6 z-[60] items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 px-5 py-3 rounded-full font-bold transition-all duration-300 border-2 border-white/30 hover:border-white shadow-2xl backdrop-blur-xl group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
              <span className="text-sm">Fermer</span>
            </motion.button>

            <motion.div 
              className="bg-white rounded-3xl max-w-[480px] w-full shadow-2xl flex flex-col max-h-[90vh] md:max-h-none overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ 
                transformStyle: 'preserve-3d',
              }}
            >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedPlanDetails.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Abonnement mensuel</p>
                  <h3 className="text-2xl font-bold">Plan {selectedPlanDetails.name}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black">${selectedPlanDetails.price}</span>
                    <span className="text-white/80 text-sm">/mois</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white hover:text-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* NowPayments Widget Container Scrollable */}
            <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-50 overflow-y-auto custom-scrollbar">
              {/* Loading State */}
              {isWidgetLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                  <p className="text-slate-600 font-medium">Chargement du paiement...</p>
                  <p className="text-slate-400 text-sm mt-1">Veuillez patienter</p>
                </div>
              )}

              {/* Error State */}
              {widgetError && !isWidgetLoading && (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Erreur de chargement</h4>
                  <p className="text-slate-500 text-center text-sm mb-6">
                    Le widget de paiement n'a pas pu être chargé. Vous pouvez continuer sur NowPayments directement.
                  </p>
                  <button
                    onClick={handleOpenInNewTab}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ouvrir NowPayments
                  </button>
                </div>
              )}

              {/* Widget Container */}
              <div className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 ${isWidgetLoading ? 'absolute opacity-0 pointer-events-none' : ''}`}>
                <div className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
                  <iframe 
                    src={`https://nowpayments.io/embeds/payment-widget?iid=${selectedPlanDetails.widgetId}`}
                    width="100%" 
                    height="700"
                    frameBorder="0" 
                    scrolling="yes" 
                    style={{ 
                      overflowY: 'auto',
                      display: 'block',
                      borderRadius: '16px',
                      minHeight: '600px'
                    }}
                    title="NowPayments Payment Widget"
                    allow="payment"
                    onLoad={handleWidgetLoad}
                    onError={handleWidgetError}
                  >
                    Impossible de charger le widget de paiement. Veuillez réessayer.
                  </iframe>
                </div>
              </div>
              
              {/* Security Note */}
              <div className="mt-5 flex flex-col items-center gap-4">
                <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Crypté</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Instantané</span>
                  </div>
                </div>
                
                {/* Open in new tab option */}
                <button
                  onClick={handleOpenInNewTab}
                  className="flex items-center gap-2 text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ouvrir dans un nouvel onglet
                </button>

                {/* Bouton Annuler bien visible */}
                <button
                  onClick={handleCloseModal}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-transparent hover:border-red-200 group"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                  Annuler le paiement
                </button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Pricing;
