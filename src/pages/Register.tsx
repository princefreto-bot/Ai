import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new user
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
    { icon: BarChart3, text: 'Analyses IA illimitées' },
    { icon: Zap, text: 'Signaux BUY/SELL/WAIT précis' },
    { icon: Shield, text: 'Zones d\'entrée et Stop Loss' },
    { icon: TrendingUp, text: 'Take Profit TP1, TP2, TP3' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Benefits */}
          <div className="hidden lg:block">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-6">
              Rejoignez TradeScalpSnip
            </span>
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
              Analysez vos graphiques avec la 
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> puissance de l'IA</span>
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Rejoignez des milliers de traders qui utilisent TradeScalpSnip pour des analyses ultra-rapides.
            </p>
            
            <ul className="space-y-5">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200/50">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium text-lg">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
              <p className="text-pink-700 font-semibold mb-2">💰 Offre de lancement</p>
              <p className="text-slate-600">
                Accès complet à toutes les fonctionnalités pour seulement <span className="font-bold text-slate-900">20$/mois</span>
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <Card className="p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-200/50">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Créer un compte</h1>
              <p className="text-slate-600 mt-2">Commencez en moins d'une minute</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Nom complet"
                type="text"
                placeholder="Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <Input
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-start gap-3 text-sm">
                <input 
                  type="checkbox" 
                  required
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500" 
                />
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
              </div>

              <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50" size="lg">
                Créer mon compte
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Après inscription, choisissez votre abonnement pour accéder aux analyses IA.
            </p>

            <div className="mt-6 text-center text-sm text-slate-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-pink-500 hover:text-pink-600 font-semibold">
                Se connecter
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
