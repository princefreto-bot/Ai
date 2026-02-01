import { 
  TrendingUp, 
  Zap, 
  Target, 
  Shield, 
  Clock, 
  BarChart3,
  Brain,
  Award,
  CheckCircle
} from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: 'IA de Pointe',
    description: 'Algorithmes de Computer Vision entraînés sur des millions de graphiques pour une précision maximale.',
    stats: '95%+ précision',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Ultra Rapide',
    description: 'Analyse complète de votre graphique en moins de 5 secondes. Parfait pour le scalping.',
    stats: '<5 secondes',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'Signaux Précis',
    description: 'BUY, SELL ou WAIT avec zone d\'entrée exacte, Stop Loss et 3 niveaux de Take Profit.',
    stats: '3 TP niveaux',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Gestion du Risque',
    description: 'Stop Loss intelligent calculé automatiquement pour protéger votre capital.',
    stats: 'SL optimisé',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Patterns Reconnus',
    description: 'Détection automatique : triangles, H&S, double top/bottom, flags, wedges et plus.',
    stats: '20+ patterns',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Award,
    title: 'Grade de Qualité',
    description: 'Chaque setup reçoit un grade A+, A, B ou C basé sur la confluence des signaux.',
    stats: 'Score fiable',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const keyPoints = [
  'Aucune expérience technique requise',
  'Compatible TradingView, Binance, MT4/MT5',
  'Fonctionne sur crypto, forex, actions, indices',
  'Historique complet de vos analyses',
  'Support prioritaire 24/7',
  'Annulation à tout moment',
];

export function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden" id="benefits">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50">
            <TrendingUp className="w-4 h-4" />
            Pourquoi TradeScalpSnip ?
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Les avantages qui font
            <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"> la différence</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Une IA conçue spécialement pour le scalping et le day trading. 
            Des signaux précis, rapides et fiables pour maximiser vos opportunités.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>

                {/* Stats badge */}
                <div className="absolute top-0 right-0">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${benefit.gradient} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {benefit.stats}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Points Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Tout ce dont vous avez besoin
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyPoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
