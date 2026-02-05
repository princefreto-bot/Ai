// Testimonials Page
import { motion } from 'framer-motion';
import { ArrowLeft, Star, CheckCircle, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Alexandre D.",
    role: "Trader Crypto (Débutant)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    content: "Je ne savais pas lire un graphique. L'IA me dit juste : 'Zone verte = Achète'. J'ai transformé 200$ en 1400$ en une semaine.",
    rating: 5,
    verified: true,
    gains: "+600% PNL"
  },
  {
    id: 2,
    name: "Sarah K.",
    role: "Analyste Financier",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    content: "J'étais sceptique. Une IA qui scalpe ? Mais après avoir vu les détections de 'Falling Wedge' en temps réel avant même que je ne les trace... C'est effrayant de précision.",
    rating: 5,
    verified: true,
    gains: "+$12,400 Profit"
  },
  {
    id: 3,
    name: "Michael R.",
    role: "Ex-Forex Trader",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    content: "La détection des liquidités est au niveau institutionnel. C'est comme avoir un terminal Bloomberg mais qui te dit quoi faire.",
    rating: 5,
    verified: true,
    gains: "Membre Pro"
  },
  {
    id: 4,
    name: "Thomas B.",
    role: "Étudiant",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    content: "L'abonnement à 20$ est remboursé en un seul trade. Littéralement. Mon premier trade sur ETH m'a rapporté 45$.",
    rating: 5,
    verified: true,
    gains: "+$850 Semaine 1"
  },
  {
    id: 5,
    name: "Jessica M.",
    role: "Investisseur Immo",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    content: "Je n'ai pas le temps de rester devant les écrans. Je scanne le matin, je place mes ordres TP/SL donnés par l'IA, et je reviens le soir voir les profits.",
    rating: 4,
    verified: true,
    gains: "Revenu Passif"
  },
  {
    id: 6,
    name: "David W.",
    role: "Dev Fullstack",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    content: "La tech derrière est solide. Ce n'est pas un simple RSI. On voit que c'est du Computer Vision avancé qui reconnaît les structures de prix.",
    rating: 5,
    verified: true,
    gains: "Tech Approuvée"
  },
  {
    id: 7,
    name: "Kevin P.",
    role: "Scalper",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    content: "Le mode 'Sniper' sur le 1 minute est incroyable. Il détecte les fausses cassures (fakeouts) que je prenais tout le temps avant.",
    rating: 5,
    verified: true,
    gains: "+15% Journalier"
  },
  {
    id: 8,
    name: "Emma S.",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    content: "Service client au top et l'IA s'améliore chaque semaine. J'ai arrêté mes autres groupes de signaux Telegram.",
    rating: 5,
    verified: true,
    gains: "Client Fidèle"
  }
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 animate-pulse">
              <Star className="w-4 h-4 fill-current" />
              NOTE 4.9/5 - VÉRIFIÉ SUR TRUSTPILOT
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ils ont arrêté de deviner.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Ils ont commencé à encaisser.
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Rejoignez les 12,000+ traders qui utilisent TradeScalpSnip quotidiennement pour extraire de l'argent du marché.
            </p>
          </motion.div>
        </div>

        {/* Highlight Section - Screenshot Proof */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold">Des résultats concrets, pas de promesses.</h2>
              <p className="text-gray-400">
                 Nos utilisateurs partagent quotidiennement leurs PnL (Profits and Losses) dans le groupe privé. 
                 L'IA ne fatigue jamais, n'a pas d'émotions, et ne rate aucun setup.
              </p>
              <div className="flex gap-4">
                 <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">+82%</div>
                    <div className="text-xs text-gray-500">Winrate Moyen</div>
                 </div>
                 <div className="w-px bg-white/10"></div>
                 <div className="text-center">
                    <div className="text-3xl font-bold text-white">12k+</div>
                    <div className="text-xs text-gray-500">Membres Actifs</div>
                 </div>
                 <div className="w-px bg-white/10"></div>
                 <div className="text-center">
                    <div className="text-3xl font-bold text-pink-500">24/7</div>
                    <div className="text-xs text-gray-500">Analyse Continue</div>
                 </div>
              </div>
           </div>
           
           {/* Fake Visual Cards of PnL */}
           <div className="relative h-64 w-full">
              <motion.div 
                 initial={{ rotate: -5, x: -20 }}
                 animate={{ rotate: -2, x: 0 }}
                 transition={{ repeat: Infinity, repeatType: "reverse", duration: 4 }}
                 className="absolute top-0 right-10 bg-[#1e1e1e] p-4 rounded-xl border border-gray-700 w-64 shadow-2xl z-10"
              >
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                     <span>BTC/USDT</span>
                     <span className="text-green-400">Long 50x</span>
                  </div>
                  <div className="text-4xl font-bold text-green-500 mb-1">+482%</div>
                  <div className="text-xs text-gray-400">PNL: +$2,450.00</div>
              </motion.div>

              <motion.div 
                 initial={{ rotate: 5, x: 20, y: 40 }}
                 animate={{ rotate: 8, x: 10, y: 40 }}
                 transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
                 className="absolute top-10 right-40 bg-[#1e1e1e] p-4 rounded-xl border border-gray-700 w-64 shadow-xl z-0 blur-[1px]"
              >
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                     <span>ETH/USDT</span>
                     <span className="text-green-400">Long 20x</span>
                  </div>
                  <div className="text-4xl font-bold text-green-500 mb-1">+124%</div>
                  <div className="text-xs text-gray-400">PNL: +$840.50</div>
              </motion.div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative group hover:border-pink-500/30 transition-colors flex flex-col h-full"
            >
              <div className="absolute top-6 right-6 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-pink-500 transition-colors"
                  />
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-black" title="Utilisateur Vérifié">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 italic flex-1">"{testimonial.content}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-blue-400" /> Membre Vérifié
                </div>
                <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs font-bold text-green-400">
                  {testimonial.gains}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section CTA Finale */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-pink-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à écrire votre propre Success Story ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Ne soyez plus le trader qui donne son argent aux banques. Devenez celui qui le prend.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link 
                to="/pricing"
                className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                Commencer maintenant
              </Link>
              <Link 
                to="/articles"
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold hover:bg-white/5 transition-all"
              >
                Voir les enquêtes
              </Link>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              Garantie satisfait ou remboursé 14 jours • Annulation à tout moment
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;