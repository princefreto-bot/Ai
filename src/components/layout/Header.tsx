import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useStore } from '@/store/useStore';
import { TrendingUp, Menu, X, Crown, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { isAuthenticated, user, logout } = useStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Fonctionnalités', href: '/#features' },
    { label: 'Tarifs', href: '/pricing' },
    { label: 'Analyse perso', href: '/analysis/request' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-pink-200/30 border-b border-pink-100' 
          : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo animé */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center shadow-xl shadow-pink-300/40"
                animate={{
                  boxShadow: scrolled 
                    ? '0 25px 50px -12px rgba(236, 72, 153, 0.5)' 
                    : '0 10px 40px -10px rgba(236, 72, 153, 0.4)',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Glow pulsant */}
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl font-black text-slate-900">
                Trade
                <motion.span 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Scalp
                </motion.span>
                <span className="text-pink-500">Snip</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link 
                  to={item.href}
                  className="relative text-slate-600 hover:text-pink-500 transition-colors font-semibold group"
                >
                  {item.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div 
                  key="authenticated"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" className="font-semibold">
                        <Zap className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </motion.div>
                  </Link>

                  {user?.role === 'admin' && (
                    <Link to="/admin">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" className="font-semibold text-pink-600">
                          <Crown className="w-4 h-4 mr-2" />
                          Admin
                        </Button>
                      </motion.div>
                    </Link>
                  )}
                  
                  {user?.isSubscribed && (
                    <motion.div 
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-100/50"
                      animate={{
                        boxShadow: [
                          '0 10px 40px -10px rgba(147, 51, 234, 0.3)',
                          '0 10px 40px -10px rgba(236, 72, 153, 0.3)',
                          '0 10px 40px -10px rgba(147, 51, 234, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Crown className="w-4 h-4" />
                      </motion.div>
                      Pro
                    </motion.div>
                  )}
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="unauthenticated"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <Link to="/login">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" className="font-semibold">Connexion</Button>
                    </motion.div>
                  </Link>
                  <Link to="/register">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Button variant="glow" className="group">
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        Commencer
                      </Button>
                      
                      {/* Particules autour du bouton */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [-10, -20],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="absolute -top-1 -left-1 w-2 h-2 bg-rose-500 rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [-10, -20],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden relative w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-pink-50 transition-colors overflow-hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-pink-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-6 space-y-2 border-t border-slate-100 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.href}
                    className="block px-4 py-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {isAuthenticated ? (
                <>
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      to="/dashboard"
                      className="block px-4 py-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Zap className="w-4 h-4 inline mr-2" />
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="px-4 pt-2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                      Déconnexion
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link to="/login" className="block px-4" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Connexion</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link to="/register" className="block px-4" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="glow" className="w-full">
                        <Sparkles className="w-4 h-4" />
                        Commencer
                      </Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
