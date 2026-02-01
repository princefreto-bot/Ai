import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, CheckCircle, Zap } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600">
        {/* Animated orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 noise" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card with glassmorphism */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 lg:p-20 border border-white/20 shadow-2xl">
          <div className="text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-10 shadow-xl animate-bounce-soft">
              <Sparkles className="w-5 h-5" />
              <span>Offre de lancement • Économisez 50%</span>
              <Zap className="w-5 h-5" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Prêt à révolutionner
              <span className="block text-white/90">votre trading ?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Rejoignez des milliers de traders qui utilisent TradeScalpSnip pour prendre de 
              <span className="font-bold text-white"> meilleures décisions</span>.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { text: 'Analyses illimitées', icon: '📊' },
                { text: 'Signaux précis', icon: '🎯' },
                { text: 'Support prioritaire', icon: '⚡' },
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 transform hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <div className="flex items-center justify-center gap-2 text-white font-semibold">
                    <CheckCircle className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    <span>{benefit.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="bg-white text-pink-600 hover:bg-white/90 text-xl px-12 shadow-2xl shadow-black/20 group"
                >
                  Commencer à 20$/mois
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              {/* Trust elements */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Annulation à tout moment
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Garantie 14 jours
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Paiement sécurisé
                </span>
              </div>
            </div>

            {/* Payment methods - Crypto Only via NowPayments */}
            <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
              {/* Bitcoin */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-xl">
                <div className="w-8 h-8 bg-[#F7931A] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-black">₿</span>
                </div>
                <span className="text-white text-sm font-bold">Bitcoin</span>
              </div>
              {/* Ethereum */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-xl">
                <div className="w-8 h-8 bg-[#627EEA] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-black">Ξ</span>
                </div>
                <span className="text-white text-sm font-bold">Ethereum</span>
              </div>
              {/* USDT */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-xl">
                <div className="w-8 h-8 bg-[#26A17B] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-black">₮</span>
                </div>
                <span className="text-white text-sm font-bold">USDT</span>
              </div>
              {/* Solana */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-xl">
                <div className="w-8 h-8 bg-[#9945FF] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-black">◎</span>
                </div>
                <span className="text-white text-sm font-bold">Solana</span>
              </div>
              {/* NowPayments branding */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/20">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-black">NP</span>
                </div>
                <span className="text-white/70 text-xs">Powered by</span>
                <span className="text-white text-sm font-bold">NowPayments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}