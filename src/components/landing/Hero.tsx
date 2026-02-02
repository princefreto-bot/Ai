import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, Star, CheckCircle } from 'lucide-react';
// @ts-ignore
import { animate, stagger } from 'animejs';

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Grid Animation (Anime.js style)
    if (gridRef.current) {
      const gridEl = gridRef.current;
      gridEl.innerHTML = '';
      
      const width = gridEl.offsetWidth;
      const height = gridEl.offsetHeight;
      const cellSize = 60;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const total = cols * rows;

      for (let i = 0; i < total; i++) {
        const el = document.createElement('div');
        el.style.width = `${cellSize}px`;
        el.style.height = `${cellSize}px`;
        el.style.position = 'absolute';
        el.style.left = `${(i % cols) * cellSize}px`;
        el.style.top = `${Math.floor(i / cols) * cellSize}px`;
        el.style.border = '1px solid rgba(236, 72, 153, 0.05)';
        el.style.opacity = '0';
        gridEl.appendChild(el);
      }

      animate(gridEl.children, {
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
        delay: stagger(100, { grid: [cols, rows], from: 'center' }),
        loop: true,
        duration: 2000,
        easing: 'inOutQuad'
      });
    }

    // 2. Title Letterize Animation
    if (titleRef.current) {
      // We will animate the container elements instead to preserve the gradient span
      if (leftContentRef.current?.children) {
        animate(leftContentRef.current.children, {
          translateX: [-50, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(150),
          easing: 'outExpo'
        });
      }
    }

    // 3. Right side demo float
    if (rightContentRef.current) {
      animate(rightContentRef.current, {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: 600,
        easing: 'outElastic(1, .8)'
      });
    }

  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/30 to-white py-16 lg:py-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Anime.js Grid */}
        <div ref={gridRef} className="absolute inset-0 z-0" />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 text-pink-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-200/30 border border-pink-200/50">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>IA de Scalping #1 en 2026</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-pink-400 text-pink-400" />
                ))}
              </div>
            </div>

            {/* Main heading */}
            <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Analysez vos graphiques avec 
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent block mt-2"> l'IA la plus rapide</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
              <span className="font-bold text-slate-800">TradeScalpSnip</span> analyse vos captures d'écran TradingView et génère des signaux 
              <span className="font-semibold text-pink-600"> BUY, SELL</span> ou 
              <span className="font-semibold text-amber-600"> WAIT</span> en moins de 5 secondes.
            </p>

            {/* Key benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { text: 'Zone d\'entrée précise', icon: TrendingUp },
                { text: 'Stop Loss automatique', icon: Shield },
                { text: 'TP1, TP2, TP3 calculés', icon: Zap },
                { text: 'Score de confiance IA', icon: Star },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-slate-100 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center shadow-md">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Link to="/register">
                <Button variant="glow" size="xl" className="group text-lg px-8">
                  Commencer - 20$/mois
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="group">
                  Voir les tarifs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust elements */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sans engagement
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Annulation en 1 clic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Garantie 14 jours
              </span>
            </div>
          </div>

          {/* Right Side - Demo Preview */}
          <div ref={rightContentRef} className="relative perspective-1000">
            {/* Main card */}
            <div className="relative transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12 preserve-3d">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-[2rem] blur-2xl opacity-30 animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-[2rem] p-1 shadow-2xl shadow-pink-300/30">
                <div className="bg-slate-900 rounded-[1.8rem] p-5 lg:p-6">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg px-3 py-1.5 ml-3">
                      <span className="text-slate-400 text-xs font-medium">app.tradescalpsnip.com</span>
                    </div>
                  </div>
                  
                  {/* Analysis Result Demo */}
                  <div className="space-y-4">
                    {/* Signal Header */}
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">Signal Détecté</p>
                          <p className="text-green-300 text-3xl font-black flex items-center gap-2">
                            BUY <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-xs mb-1">Confiance IA</p>
                          <p className="text-white text-2xl font-black">87%</p>
                        </div>
                      </div>
                    </div>

                    {/* Entry, SL, TP */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-xs mb-1">Entry Zone</p>
                        <p className="text-white font-bold">4,150 - 4,200</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-xs mb-1">Stop Loss</p>
                        <p className="text-red-400 font-bold">3,980</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-xs mb-1">Grade</p>
                        <p className="text-shimmer font-black text-xl">A+</p>
                      </div>
                    </div>

                    {/* Take Profits */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                      <p className="text-slate-400 text-xs mb-3">Take Profits</p>
                      <div className="flex justify-between">
                        <div className="text-center">
                          <p className="text-green-400 font-bold">TP1</p>
                          <p className="text-white text-sm">4,380</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-bold">TP2</p>
                          <p className="text-white text-sm">4,520</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-bold">TP3</p>
                          <p className="text-white text-sm">4,750</p>
                        </div>
                      </div>
                    </div>

                    {/* Patterns */}
                    <div className="flex flex-wrap gap-2">
                      {['Bull Flag', 'Breakout', 'RSI Divergence'].map((pattern, i) => (
                        <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium border border-pink-500/30">
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl shadow-slate-300/50 border border-slate-100 animate-float hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">&lt;5s</p>
                  <p className="text-xs text-slate-500">Temps d'analyse</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl shadow-slate-300/50 border border-slate-100 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">95%</p>
                  <p className="text-xs text-slate-500">Précision IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
