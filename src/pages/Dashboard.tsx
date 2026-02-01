import { Header } from '@/components/layout/Header';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { AnalysisResult } from '@/components/dashboard/AnalysisResult';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { BarChart3, Clock, TrendingUp, Zap, Crown } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

export function Dashboard() {
  const { isAuthenticated, user, currentAnalysis, analyses, isAnalyzing } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900">
            Bienvenue, {user?.name} 👋
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            {user?.isSubscribed 
              ? <span className="text-green-600 font-medium">✓ Abonnement Pro actif - Analyses illimitées</span>
              : <span className="text-amber-600">Abonnez-vous pour accéder aux analyses IA</span>
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200/50">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Analyses</p>
                <p className="text-2xl font-bold text-slate-900">{analyses.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200/50">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Signaux BUY</p>
                <p className="text-2xl font-bold text-slate-900">
                  {analyses.filter(a => a.signal === 'BUY').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Dernière analyse</p>
                <p className="text-2xl font-bold text-slate-900">
                  {analyses.length > 0 ? 'Récente' : '-'}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                user?.isSubscribed 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-200/50' 
                  : 'bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-200/50'
              }`}>
                {user?.isSubscribed ? <Crown className="w-6 h-6 text-white" /> : <Zap className="w-6 h-6 text-white" />}
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Statut</p>
                <p className={`text-2xl font-bold ${user?.isSubscribed ? 'text-purple-600' : 'text-slate-400'}`}>
                  {user?.isSubscribed ? 'Pro' : 'Inactif'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="space-y-6">
            <ImageUpload />
            
            {/* Upgrade CTA for non-subscribers */}
            {!user?.isSubscribed && (
              <Card className="p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 border-none text-white shadow-xl shadow-pink-200/50">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Passez à Pro</h3>
                    <p className="text-white/90 mb-4">
                      Débloquez les analyses IA illimitées et tous les outils avancés pour seulement 20$/mois.
                    </p>
                    <Link 
                      to="/pricing"
                      className="inline-block bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
                    >
                      Voir les offres →
                    </Link>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Results */}
          <div>
            {isAnalyzing && (
              <Card className="p-10 text-center shadow-xl shadow-slate-200/50">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Analyse en cours...</h3>
                    <p className="text-slate-500 mt-2">
                      Notre IA examine votre graphique
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
            {!isAnalyzing && currentAnalysis && (
              <AnalysisResult result={currentAnalysis} />
            )}
            
            {!isAnalyzing && !currentAnalysis && (
              <Card className="p-10 text-center shadow-xl shadow-slate-200/50">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Aucune analyse
                    </h3>
                    <p className="text-slate-500 mt-2">
                      {user?.isSubscribed 
                        ? 'Uploadez un graphique pour commencer' 
                        : 'Abonnez-vous pour analyser vos graphiques'
                      }
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Analysis History */}
        {analyses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Historique des analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyses.slice(0, 6).map((analysis) => (
                <Card 
                  key={analysis.id} 
                  hover 
                  className="p-4 cursor-pointer shadow-lg shadow-slate-100/50 hover:shadow-xl transition-all duration-300"
                  onClick={() => useStore.getState().setCurrentAnalysis(analysis)}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={analysis.imageUrl} 
                      alt="Chart" 
                      className="w-20 h-20 object-cover rounded-xl bg-slate-100 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`text-2xl font-black ${
                        analysis.signal === 'BUY' ? 'text-green-500' :
                        analysis.signal === 'SELL' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {analysis.signal}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">
                        Confiance: <span className="font-semibold">{analysis.confidenceLevel}%</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(analysis.timestamp).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      analysis.setupGrade === 'A+' || analysis.setupGrade === 'A' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {analysis.setupGrade}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
