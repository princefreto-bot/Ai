import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useStore } from '@/store/useStore';
import { TrendingUp, Menu, X, Crown, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { isAuthenticated, user, logout } = useStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center shadow-xl shadow-pink-300/40 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">
                Trade<span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Scalp</span><span className="text-pink-500">Snip</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/#features" 
              className="text-slate-600 hover:text-pink-500 transition-colors font-semibold"
            >
              Fonctionnalités
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-600 hover:text-pink-500 transition-colors font-semibold"
            >
              Tarifs
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="font-semibold">
                    Dashboard
                  </Button>
                </Link>
                {user?.isSubscribed && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-100/50">
                    <Crown className="w-4 h-4" />
                    Pro
                  </div>
                )}
                <Button variant="outline" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost" className="font-semibold">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button variant="glow" className="group">
                    <Sparkles className="w-4 h-4" />
                    Commencer
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-pink-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-slate-100 animate-in">
            <Link 
              to="/#features" 
              className="block px-4 py-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link 
              to="/pricing" 
              className="block px-4 py-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-4 pt-2">
                  <Button variant="outline" onClick={handleLogout} className="w-full">
                    Déconnexion
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Connexion</Button>
                </Link>
                <Link to="/register" className="block px-4" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glow" className="w-full">
                    <Sparkles className="w-4 h-4" />
                    Commencer
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}