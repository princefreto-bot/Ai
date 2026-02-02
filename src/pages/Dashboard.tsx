import { Header } from '@/components/layout/Header';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { AnalysisResult } from '@/components/dashboard/AnalysisResult';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { BarChart3, Clock, Crown, Activity, Target, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export function Dashboard() {
  const { isAuthenticated, user, currentAnalysis, analyses, isAnalyzing } = useStore();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ analyses: 0, buy: 0, sell: 0, wait: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Calcul des vraies stats
  const realStats = {
    analyses: analyses.length,
    buy: analyses.filter(a => a.signal === 'BUY').length,
    sell: analyses.filter(a => a.signal === 'SELL').length,
    wait: analyses.filter(a => a.signal === 'WAIT').length,
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Animation d'entrée du dashboard
    setTimeout(() => {
      setIsLoaded(true);
      
      // Animation des cartes stats avec stagger
      if (statsRef.current) {
        anime({
          targets: statsRef.current.querySelectorAll('.stat-card'),
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.9, 1],
          delay: anime.stagger(100),
          duration: 800,
          easing: 'easeOutElastic(1, .8)'
        });
      }

      // Animation des compteurs
      const duration = 2000;
      const startTime = Date.now();
      
      const animateCounters = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        
        setCounters({
          analyses: Math.round(realStats.analyses * easeProgress),
          buy: Math.round(realStats.buy * easeProgress),
          sell: Math.round(realStats.sell * easeProgress),
          wait: Math.round(realStats.wait * easeProgress),
        });
        
        if (progress < 1) {
          requestAnimationFrame(animateCounters);
        }
      };
      
      requestAnimationFrame(animateCounters);

      // Animation du contenu principal
      if (dashboardRef.current) {
        anime({
          targets: dashboardRef.current.querySelectorAll('.animate-section'),
          opacity: [0, 1],
          translateY: [60, 0],
          delay: anime.stagger(150, { start: 400 }),
          duration: 1000,
          easing: 'easeOutExpo'
        });
      }
    }, 100);
  }, [isAuthenticated, realStats.analyses, realStats.buy, realStats.sell, realStats.wait]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <Header />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
              Bienvenue, {user?.name}
            </h1>
            <span className="text-4xl animate-bounce">👋</span>
          </div>
          <p className="text-slate-400 text-lg flex items-center gap-2">
            {user?.isSubscribed 
              ? (
                <>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400">
                    <Crown className="w-5 h-5" />
                    <span className="font-medium">Abonnement Pro actif - Analyses illimitées</span>
                  </span>
                </>
              )
              : (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400">
                  <Activity className="w-5 h-5" />
                  <span>Abonnez-vous pour accéder aux analyses IA</span>
                </span>
              )
            }
          </p>
        </div>

        {/* Stats Cards - New Design */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {/* Total Analyses */}
          <div className="stat-card opacity-0 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6 hover:border-pink-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">Total</div>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-1">Analyses</p>
              <p className="text-4xl font-black text-white">{counters.analyses}</p>
            </div>
          </div>
          
          {/* Signaux BUY */}
          <div className="stat-card opacity-0 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6 hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full font-semibold">BUY</div>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-1">Signaux BUY</p>
              <p className="text-4xl font-black text-green-400">{counters.buy}</p>
            </div>
          </div>
          
          {/* Signaux SELL */}
          <div className="stat-card opacity-0 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-500">
                  <ArrowDownRight className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded-full font-semibold">SELL</div>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-1">Signaux SELL</p>
              <p className="text-4xl font-black text-red-400">{counters.sell}</p>
            </div>
          </div>
          
          {/* Signaux WAIT */}
          <div className="stat-card opacity-0 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6 hover:border-yellow-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Minus className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full font-semibold">WAIT</div>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-1">Signaux WAIT</p>
              <p className="text-4xl font-black text-yellow-400">{counters.wait}</p>
            </div>
          </div>
        </div>

        {/* Subscription Status Bar */}
        <div className={`animate-section opacity-0 mb-8 p-4 rounded-2xl border ${user?.isSubscribed 
          ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-pink-500/30' 
          : 'bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                user?.isSubscribed 
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30' 
                  : 'bg-slate-700'
              }`}>
                {user?.isSubscribed ? <Crown className="w-7 h-7 text-white" /> : <Target className="w-7 h-7 text-slate-400" />}
              </div>
              <div>
                <p className="font-bold text-lg text-white">
                  {user?.isSubscribed ? 'Plan Pro Actif' : 'Plan Gratuit'}
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
              <Link 
                to="/pricing"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-bold text-white overflow-hidden transition-transform hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Crown className="w-5 h-5" />
                <span>Passer à Pro</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="animate-section opacity-0 space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-lg opacity-30" />
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </span>
                  Analyser un graphique
                </h2>
                <ImageUpload />
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="animate-section opacity-0">
            {isAnalyzing && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-lg opacity-50 animate-pulse" />
                <Card className="relative p-10 text-center bg-slate-900/80 backdrop-blur-sm border-slate-700/50">
                  <div className="flex flex-col items-center gap-6">
                    {/* Animated loader */}
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" />
                      <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                      <div className="absolute inset-4 border-4 border-transparent border-t-rose-500 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Analyse en cours...</h3>
                      <p className="text-slate-400">
                        Notre IA examine votre graphique avec précision
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-4">
                        {[0, 1, 2].map((i) => (
                          <div 
                            key={i}
                            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {!isAnalyzing && currentAnalysis && (
              <AnalysisResult result={currentAnalysis} />
            )}
            
            {!isAnalyzing && !currentAnalysis && (
              <div className="relative h-full min-h-[300px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-3xl blur-lg" />
                <Card className="relative h-full p-10 text-center bg-slate-900/80 backdrop-blur-sm border-slate-700/50 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mb-6">
                    <BarChart3 className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Aucune analyse
                  </h3>
                  <p className="text-slate-400 max-w-xs">
                    {user?.isSubscribed 
                      ? 'Uploadez un graphique pour commencer votre analyse IA' 
                      : 'Abonnez-vous pour analyser vos graphiques de trading'
                    }
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Analysis History */}
        {analyses.length > 0 && (
          <div className="animate-section opacity-0 mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock className="w-6 h-6 text-pink-500" />
                Historique des analyses
              </h2>
              <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                {analyses.length} analyse{analyses.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyses.slice(0, 6).map((analysis, index) => (
                <div 
                  key={analysis.id}
                  className="group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 p-4 cursor-pointer hover:border-pink-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10"
                  onClick={() => useStore.getState().setCurrentAnalysis(analysis)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={analysis.imageUrl} 
                        alt="Chart" 
                        className="w-20 h-20 object-cover rounded-xl bg-slate-800 border border-slate-700"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        analysis.signal === 'BUY' ? 'bg-green-500' :
                        analysis.signal === 'SELL' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}>
                        {analysis.signal === 'BUY' ? '↑' : analysis.signal === 'SELL' ? '↓' : '—'}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`text-2xl font-black ${
                        analysis.signal === 'BUY' ? 'text-green-400' :
                        analysis.signal === 'SELL' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {analysis.signal}
                      </div>
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
                    
                    <div className={`px-3 py-1.5 rounded-xl text-sm font-bold ${
                      analysis.setupGrade === 'A+' || analysis.setupGrade === 'A' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : analysis.setupGrade === 'B'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                    }`}>
                      {analysis.setupGrade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
