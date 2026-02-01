import { Upload, Brain, Target, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Uploadez votre graphique',
    description: 'Prenez une capture d\'écran de votre graphique TradingView ou toute autre plateforme et uploadez-la.',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-300/50',
  },
  {
    icon: Brain,
    title: 'Analyse IA instantanée',
    description: 'Notre algorithme de Computer Vision analyse les patterns, tendances, supports et résistances.',
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-300/50',
  },
  {
    icon: Target,
    title: 'Recevez vos signaux',
    description: 'Obtenez un signal BUY/SELL/WAIT avec zones d\'entrée, stop loss et take profits.',
    color: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-300/50',
  },
  {
    icon: CheckCircle,
    title: 'Tradez en confiance',
    description: 'Utilisez les explications de l\'IA et le score de confiance pour prendre vos décisions.',
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-300/50',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-bold mb-6 shadow-lg shadow-pink-100/50">
            <Target className="w-4 h-4" />
            Processus Simple
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            4 étapes pour des
            <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"> analyses pro</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un processus simple et rapide pour obtenir des analyses professionnelles
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-32 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-emerald-400 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                  {/* Step number */}
                  <div className={`absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl ${step.shadow} transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl mb-8 mx-auto shadow-2xl ${step.shadow} transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}