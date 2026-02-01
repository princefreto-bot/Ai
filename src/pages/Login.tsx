import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { TrendingUp } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a demo user for now
    const demoUser = {
      id: 'demo-' + Date.now(),
      email: email,
      name: email.split('@')[0],
      plan: 'none' as const,
      subscriptionStatus: 'inactive' as const,
      isSubscribed: false,
    };
    login(demoUser, 'demo-token-' + Date.now());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-200/50">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Connexion</h1>
            <p className="text-slate-600 mt-2">Accédez à votre dashboard TradeScalpSnip</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500" />
                <span className="text-slate-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-pink-200/50" size="lg">
              Se connecter
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-pink-500 hover:text-pink-600 font-semibold">
              Créer un compte
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
