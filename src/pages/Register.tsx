import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { TrendingUp, Zap, Shield, BarChart3, User, Mail, Lock, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser = {
      id: 'user-' + Date.now(),
      email: email,
      name: name,
      plan: 'none' as const,
      subscriptionStatus: 'inactive' as const,
      isSubscribed: false,
    };
    register(newUser, 'token-' + Date.now());
    navigate('/pricing');
  };

  const benefits = [
    { icon: BarChart3, text: 'Analyses IA illimitées', color: 'from-pink-500 to-rose-500' },
    { icon: Zap, text: 'Signaux BUY/SELL/WAIT précis', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, text: "Zones d'entrée et Stop Loss", color: 'from-blue-500 to-purple-500' },
    { icon: TrendingUp, text: 'Take Profit TP1, TP2, TP3', color: 'from-green-500 to-teal-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <Header />
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-40 left-20 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <main className="flex items-center justify-center py-16 px-4 relative z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Benefits */}
          <motion.div 
            className="hidden lg:block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Rejoignez TradeScalpSnip
            </motion.span>
            
            <motion.h2 
              className="text-4xl font-black text-slate-900 mb-4 leading-tight"
              variants={itemVariants}
            >
              Analysez vos graphiques avec la 
              <motion.span 
                className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              > puissance de l'IA</motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-slate-600 mb-8 text-lg"
              variants={itemVariants}
            >
              Rejoignez des milliers de traders qui utilisent TradeScalpSnip pour des analyses ultra-rapides.
            </motion.p>
            
            <motion.ul className="space-y-5" variants={containerVariants}>
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-4 group"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shadow-lg shadow-pink-200/50 relative overflow-hidden`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <benefit.icon className="w-6 h-6 text-white relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                  <span className="text-slate-700 font-medium text-lg group-hover:text-pink-600 transition-colors">
                    {benefit.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              className="mt-10 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              />
              <p className="text-pink-700 font-semibold mb-2 relative z-10">💰 Offre de lancement</p>
              <p className="text-slate-600 relative z-10">
                Accès complet à toutes les fonctionnalités pour seulement 
                <motion.span 
                  className="font-bold text-slate-900 ml-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  20$/mois
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
          >
            <Card className="p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border-slate-100 relative overflow-hidden">
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-200/50"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        '0 20px 50px -10px rgba(236, 72, 153, 0.4)',
                        '0 20px 50px -10px rgba(236, 72, 153, 0.7)',
                        '0 20px 50px -10px rgba(236, 72, 153, 0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </motion.div>
                  <h1 className="text-2xl font-black text-slate-900">Créer un compte</h1>
                  <p className="text-slate-600 mt-2">Commencez en moins d'une minute</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <AnimatePresence>
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-sm"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 mt-3" />
                      <Input
                        label="Nom complet"
                        type="text"
                        placeholder="Jean Dupont"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </motion.div>
                  
                  {/* Email field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <AnimatePresence>
                      {focusedField === 'email' && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-sm"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 mt-3" />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </motion.div>
                  
                  {/* Password field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <AnimatePresence>
                      {focusedField === 'password' && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-sm"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 mt-3" />
                      <Input
                        label="Mot de passe"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                        acceptedTerms ? 'bg-pink-500 border-pink-500' : 'border-slate-300'
                      }`}
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence>
                        {acceptedTerms && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <input type="checkbox" required className="hidden" checked={acceptedTerms} readOnly />
                    <span className="text-slate-600">
                      J'accepte les{' '}
                      <Link to="/terms" className="text-pink-500 hover:underline font-medium">
                        conditions d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link to="/privacy" className="text-pink-500 hover:underline font-medium">
                        politique de confidentialité
                      </Link>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50"
                        size="lg"
                        disabled={isLoading || !acceptedTerms}
                      >
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Création en cours...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="default"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Sparkles className="w-5 h-5" />
                              Créer mon compte
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowRight className="w-5 h-5" />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                <motion.p 
                  className="mt-6 text-center text-sm text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Après inscription, choisissez votre abonnement pour accéder aux analyses IA.
                </motion.p>

                <motion.div 
                  className="mt-6 text-center text-sm text-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Déjà un compte ?{' '}
                  <Link to="/login">
                    <motion.span 
                      className="text-pink-500 hover:text-pink-600 font-semibold inline-flex items-center gap-1"
                      whileHover={{ x: 3 }}
                    >
                      Se connecter
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
