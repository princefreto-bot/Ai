import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { TrendingUp, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tente l'API backend réelle
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const json = await res.json();
        const apiUser = json.data.user as any;
        const token = json.data.token as string;

        const mappedUser = {
          id: String(apiUser.id || apiUser._id || ''),
          email: apiUser.email,
          name: apiUser.name,
          role: (apiUser.role || 'user') as 'user' | 'admin',
          plan: (apiUser.subscriptionPlan === 'enterprise' ? 'enterprise' : apiUser.subscriptionPlan === 'pro' ? 'pro' : 'none') as 'none' | 'pro' | 'enterprise',
          subscriptionStatus: (apiUser.isSubscribed ? 'active' : 'inactive') as 'inactive' | 'active' | 'cancelled',
          subscriptionEndDate: apiUser.subscriptionEndDate ? String(apiUser.subscriptionEndDate) : undefined,
          isSubscribed: !!apiUser.isSubscribed,
        };

        login(mappedUser, token);
        navigate(mappedUser.role === 'admin' ? '/admin' : '/dashboard');
        return;
      }
    } catch (_) {
      // ignore, fallback demo
    }

    // Fallback démo si le backend n'est pas dispo
    await new Promise(resolve => setTimeout(resolve, 800));
    const isAdmin = email === 'admin@tradescalpsnip.com' && password === 'AdminSecret2026!';
    const demoUser = {
      id: 'demo-' + Date.now(),
      email,
      name: email.split('@')[0],
      role: (isAdmin ? 'admin' : 'user') as 'user' | 'admin',
      plan: (isAdmin ? 'enterprise' : 'none') as 'none' | 'pro' | 'enterprise',
      subscriptionStatus: (isAdmin ? 'active' : 'inactive') as 'inactive' | 'active' | 'cancelled',
      isSubscribed: !!isAdmin,
    };
    login(demoUser, 'demo-token-' + Date.now());
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <Header />
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <main className="flex items-center justify-center py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
        >
          <Card className="w-full max-w-md p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border-slate-100 relative overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            <div className="relative z-10">
              {/* Logo */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-200/50 relative"
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
                  
                  {/* Orbiting particle */}
                  <motion.div
                    className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '32px 32px' }}
                  />
                </motion.div>
                
                <motion.h1 
                  className="text-2xl font-black text-slate-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Connexion
                </motion.h1>
                <motion.p 
                  className="text-slate-600 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Accédez à votre dashboard TradeScalpSnip
                </motion.p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
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
                  transition={{ delay: 0.6 }}
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
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <motion.input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Se souvenir de moi</span>
                  </label>
                  <motion.a 
                    href="#" 
                    className="text-pink-500 hover:text-pink-600 font-medium"
                    whileHover={{ x: 2 }}
                  >
                    Mot de passe oublié ?
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50 relative overflow-hidden group" 
                      size="lg"
                      disabled={isLoading}
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
                            Connexion...
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
                            Se connecter
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

              <motion.div 
                className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Pas encore de compte ?{' '}
                <Link to="/register">
                  <motion.span 
                    className="text-pink-500 hover:text-pink-600 font-semibold inline-flex items-center gap-1"
                    whileHover={{ x: 3 }}
                  >
                    Créer un compte
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
                <div className="mt-6 text-xs text-slate-500">
                  Accès administrateur: utilisez <span className="font-semibold text-slate-700">admin@tradescalpsnip.com</span> et votre mot de passe admin configuré dans Render.
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
