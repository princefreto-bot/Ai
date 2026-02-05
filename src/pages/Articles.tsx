// Articles Page
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ArrowRight, TrendingUp, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "EXPOSÉ: BlackRock utilise Aladdin IA pour manipuler les marchés",
    excerpt: "Le système Aladdin gère 21 trilliards de $. Notre équipe a rétro-ingénieré l'algorithme de 'Liquidity Grab' qu'ils utilisent pour piéger les retails.",
    author: "Marc S., Ex-Quant London",
    date: "12 Jan 2026",
    readTime: "7 min",
    category: "Investigation",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Goldman Sachs : 'L'IA visuelle rend l'analyse technique obsolète'",
    excerpt: "Une note interne fuite : les banques ne regardent plus les RSI/MACD. Elles utilisent la Vision par Ordinateur pour voir où sont VOS stop-loss.",
    author: "Insider WallSt",
    date: "08 Jan 2026",
    readTime: "4 min",
    category: "Leak",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Cas Client : De 500$ à 12,400$ en 14 jours sur SOL/USDT",
    excerpt: "Thomas n'a fait que suivre les signaux 'Strong Buy' de TradeScalpSnip. Preuves de retraits et historique complet des trades inclus.",
    author: "Équipe Validation",
    date: "05 Jan 2026",
    readTime: "5 min",
    category: "Résultats Vérifiés",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "La faille dans le trading Haute Fréquence (HFT)",
    excerpt: "Comment notre IA détecte les 'Iceberg Orders' des institutions 3 secondes avant l'impact sur le prix. Une fenêtre de tir invisible à l'œil nu.",
    author: "Dr. K. Chen, PhD AI",
    date: "01 Jan 2026",
    readTime: "6 min",
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    title: "Comparatif : ChatGPT vs TradeScalpSnip sur le Bitcoin",
    excerpt: "Pourquoi les LLM généralistes échouent en trading, alors que nos CNN (Réseaux de Neurones Convolutifs) spécialisés surperforment de 400%.",
    author: "Tech Review",
    date: "28 Dec 2025",
    readTime: "3 min",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    title: "URGENT : Binance commence à bannir les bots... sauf les nôtres",
    excerpt: "Notre IA simule un comportement humain pour éviter la détection, tout en exécutant avec une précision machine. Lisez le rapport.",
    author: "Security Ops",
    date: "20 Dec 2025",
    readTime: "2 min",
    category: "Sécurité",
    image: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&q=80&w=1000"
  }
];

const Articles = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-4 animate-pulse">
              <Lock className="w-3 h-3" />
              RAPPORTS CONFIDENTIELS & INTELLIGENCE
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Ce que les Banques ne veulent pas <br />
              que vous sachiez.
            </h1>
            <p className="text-xl text-gray-400 border-l-4 border-pink-500 pl-6">
              "Le trading n'est pas un jeu de hasard, c'est une guerre d'information. 
              Nous armons les particuliers avec les mêmes missiles nucléaires que Wall Street."
            </p>
          </motion.div>
        </div>

        {/* Featured Article - BlackRock */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16 relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative bg-gray-900 border border-white/10 rounded-3xl overflow-hidden md:flex">
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="BlackRock Building" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4">
                 <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase">
                   Dossier Spécial
                 </span>
              </div>
            </div>
            <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-pink-400 text-sm font-bold mb-3">
                <TrendingUp className="w-4 h-4" />
                ANALYSE INSTITUTIONNELLE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-pink-400 transition-colors">
                Aladdin : Le Cerveau Artificiel à 21 Trilliards de dollars
              </h2>
              <p className="text-gray-400 mb-6 text-lg">
                BlackRock ne prend aucune décision humaine. Tout passe par Aladdin. 
                Nous avons découvert que 85% de ses décisions court-terme sont basées sur des 
                <span className="text-white font-bold"> patterns visuels de liquidité</span>. 
                TradeScalpSnip utilise exactement la même architecture de réseau neuronal.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="text-white font-medium">Marc S.</div>
                    <div className="text-xs text-gray-500">Ex-Quant @ London Hedge Fund</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 12 min lecture
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 backdrop-blur-md border rounded-full text-xs font-medium ${
                    article.category === 'Résultats Vérifiés' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                      : 'bg-black/60 border-white/10 text-pink-400'
                  }`}>
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-400 truncate max-w-[120px]">{article.author}</span>
                  </div>
                  <button className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 text-sm font-bold">
                    Lire
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Section Preuve de Performance */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6">
                <TrendingUp className="w-3 h-3" />
                PERFORMANCE VÉRIFIÉE PAR TIERCE PARTIE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ne nous croyez pas sur parole.<br />
                Regardez les chiffres.
              </h2>
              <p className="text-gray-400 mb-6 text-lg">
                Nos modèles IA ont été audités sur 12 mois de données historiques et 3 mois de trading live. 
                Le résultat est sans appel : l'IA bat l'humain 9 fois sur 10 en scalping.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold text-white mb-1">87.4%</div>
                  <div className="text-sm text-gray-500">Win Rate (BTC/ETH)</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold text-green-400 mb-1">+412%</div>
                  <div className="text-sm text-gray-500">ROI Moyen Mensuel (Pro)</div>
                </div>
              </div>

              <Link 
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-black rounded-xl font-bold hover:bg-green-400 transition-all transform hover:scale-105"
              >
                Voir les preuves en direct
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex-1 w-full max-w-md">
               {/* Fausse carte de PnL style Binance */}
               <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-800 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-[#2b2b2b] px-4 py-3 flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-mono">PNL CARD • BINANCE</span>
                    <span className="text-xs text-gray-500">2026-01-15</span>
                  </div>
                  <div className="p-8 text-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90 relative">
                     <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>
                     <div className="text-gray-400 text-sm mb-2">ROI (Return on Investment)</div>
                     <div className="text-6xl font-black text-green-500 mb-2 font-mono">+4,230%</div>
                     <div className="text-white font-bold text-xl mb-6">TOTAL PNL: $12,450.00</div>
                     
                     <div className="flex justify-center gap-4 text-xs text-gray-400 font-mono">
                        <div>SOL/USDT</div>
                        <div>LEVERAGE 20X</div>
                        <div>LONG</div>
                     </div>
                  </div>
                  <div className="bg-[#2b2b2b] px-4 py-3 flex justify-between items-center border-t border-gray-700">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="text-xs text-green-400">Vérifié par TradeScalpSnip</span>
                    </div>
                    <img src="/qr-code-placeholder" className="w-8 h-8 opacity-20" alt="QR" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;