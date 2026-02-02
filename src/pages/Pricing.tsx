import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ExternalLink
} from 'lucide-react';
import { useStore } from '../store/useStore';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />
      
      <main className="py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50">
            <Star className="w-4 h-4" />
            Choisissez votre plan
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Tarification{' '}
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Simple
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Payez en crypto-monnaie via NowPayments. Bitcoin, Ethereum, USDT et +300 cryptos.
          </p>
        </div>

        {/* Plans */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = user?.plan === plan.id && user?.subscriptionStatus === 'active';
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] ${
                    plan.popular 
                      ? `ring-2 ring-pink-500 shadow-2xl ${plan.shadowColor}` 
                      : 'shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Plus populaire
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4 shadow-xl`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-500">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-black text-slate-900">${plan.price}</span>
                      <span className="text-slate-500 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isCurrentPlan
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : plan.popular
                          ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl hover:scale-[1.02] ${plan.shadowColor}`
                          : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl'
                    }`}
                  >
                    {isCurrentPlan ? (
                      <>
                        <Check className="w-5 h-5" />
                        Plan actuel
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5" />
                        Payer en Crypto
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Trust badges - Crypto */}
          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-6">+300 cryptos acceptées via NowPayments</p>
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              {cryptoLogos.map((crypto) => (
                <div 
                  key={crypto.name}
                  className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-lg border border-slate-100 hover:scale-105 transition-transform"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: crypto.color }}
                  >
                    {crypto.icon}
                  </div>
                  <span className="text-slate-700 font-semibold">{crypto.name}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>Blockchain vérifié</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Confirmation rapide</span>
              </div>
            </div>

            {/* NowPayments Badge */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 rounded-2xl shadow-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xs">NP</span>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Powered by NowPayments</p>
                  <p className="text-slate-400 text-xs">Paiements crypto sécurisés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Payment Modal with NowPayments Widget */}
      {showPaymentModal && selectedPlanDetails && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          {/* Bouton fermer VISIBLE EN HAUT À DROITE (Desktop uniquement) */}
          <button
            onClick={handleCloseModal}
            className="hidden md:flex fixed top-6 right-6 z-[60] items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 px-5 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 border-2 border-white/30 hover:border-white shadow-2xl backdrop-blur-xl group"
          >
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
            <span className="text-sm">Fermer</span>
          </button>

          <div 
            className="bg-white rounded-3xl max-w-[480px] w-full shadow-2xl animate-in flex flex-col max-h-[90vh] md:max-h-none overflow-hidden"
            style={{ 
              transform: 'perspective(1000px)',
              animation: 'slideUp 0.4s ease-out'
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;
