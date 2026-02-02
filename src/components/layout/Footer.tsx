import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black">Trade<span className="text-pink-400">Scalp</span><span className="text-pink-300">Snip</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyse IA ultra-rapide pour le scalping. Obtenez des signaux précis BUY/SELL/WAIT en quelques secondes.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {/* Social icons */}
              {[
                { name: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { name: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 bg-slate-800 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Produit</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/#features" className="hover:text-pink-400 transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-pink-400 transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-pink-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="mailto:contact@tradescalpsnip.com" className="hover:text-pink-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Légal</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/terms" className="hover:text-pink-400 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-pink-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2025-2026 TradeScalpSnip. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Tous les systèmes opérationnels</span>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-xs mt-4 text-center md:text-left">
            ⚠️ Avertissement : Les analyses fournies sont à titre informatif uniquement et ne constituent pas des conseils financiers. 
            Le trading comporte des risques significatifs de perte en capital.
          </p>
        </div>
      </div>
    </footer>
  );
}
