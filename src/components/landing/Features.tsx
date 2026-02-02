import { useEffect, useRef } from 'react';
// @ts-ignore
import { animate, stagger } from 'animejs';
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
    shadow: 'shadow-pink-300/50',
  },
  {
    icon: TrendingUp,
    title: 'Détection de Tendances',
    description: 'Identification automatique des tendances haussières, baissières et des phases de consolidation.',
    gradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-300/50',
  },
  {
    icon: BarChart3,
    title: 'Supports & Résistances',
    description: 'Repérage précis des niveaux clés de support et résistance sur votre graphique.',
    gradient: 'from-blue-500 to-purple-500',
    shadow: 'shadow-blue-300/50',
  },
  {
    icon: Zap,
    title: 'Détection de Cassures',
    description: 'Alertes sur les breakouts potentiels et les faux signaux de cassure.',
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-300/50',
  },
  {
    icon: LineChart,
    title: 'Patterns Chartistes',
    description: 'Reconnaissance des figures : triangles, têtes-épaules, drapeaux, wedges...',
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-300/50',
  },
  {
    icon: Target,
    title: 'Zones de TP/SL',
    description: 'Suggestions automatiques de Take Profit (TP1, TP2, TP3) et Stop Loss.',
    gradient: 'from-red-500 to-rose-500',
    shadow: 'shadow-red-300/50',
  },
  {
    icon: Clock,
    title: 'Analyse en 5 secondes',
    description: 'Résultats instantanés pour ne jamais rater une opportunité de trading.',
    gradient: 'from-cyan-500 to-blue-500',
    shadow: 'shadow-cyan-300/50',
  },
  {
    icon: Shield,
    title: 'Score de Confiance',
    description: 'Chaque analyse inclut un pourcentage de confiance et une note de qualité du setup.',
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-300/50',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards with stagger and spring
            // Filter null values
            const targets = cardsRef.current.filter(Boolean);
            
            if (targets.length > 0) {
              animate(targets, {
                translateY: [100, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: stagger(100),
                duration: 1200,
                easing: 'outElastic(1, .8)'
              });
            }
            
            // Unobserve after animation trigger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50">
            <Zap className="w-4 h-4" />
            Fonctionnalités Puissantes
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Une IA conçue pour
            <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"> le trading</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des fonctionnalités puissantes pour des analyses de qualité professionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 opacity-0 transform translate-y-10 hover:translate-y-[-10px] transition-all duration-300 hover:shadow-2xl cursor-default"
            >
              {/* Hover glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl ${feature.shadow} transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}