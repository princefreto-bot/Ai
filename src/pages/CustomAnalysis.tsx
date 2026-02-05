import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Wallet, Check, X, Loader2, Sparkles, Shield, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CustomAnalysis() {
  const { isAuthenticated } = useStore();
  const [image, setImage] = useState<string | null>(null);
  const [params, setParams] = useState({
    asset: '',
    timeframe: '1m',
    risk: 'medium',
    style: 'scalping',
  });
  const [showPay, setShowPay] = useState(false);
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);
  const [widgetError, setWidgetError] = useState(false);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  useEffect(() => {
    if (!paymentRef) return;
    const id = setInterval(() => {
      fetch(`/api/payment/status/${paymentRef}`, { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } })
        .then(r => r.ok ? r.json() : null)
        .then(json => {
          if (json && (json.data?.payment?.status === 'finished' || json.data?.payment?.status === 'confirmed')) {
            setShowPay(false);
            clearInterval(id);
            // Priorité pendant 2h
            const until = Date.now() + 2 * 60 * 60 * 1000;
            localStorage.setItem('priority_until', String(until));
            alert('Paiement confirmé. Analyse prioritaire activée pendant 2h.');
          }
        })
        .catch(() => {});
    }, 5000);
    return () => clearInterval(id);
  }, [paymentRef]);

  useEffect(() => {
    if (showPay) {
      setIsWidgetLoading(true);
      setWidgetError(false);
      const t = setTimeout(() => setIsWidgetLoading(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showPay]);

  const onFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  const canPay = !!image && params.asset.trim().length > 0 && isAuthenticated;
  const widgetId = '5896698183'; // NowPayments widget pour commande personnalisée (configurable)


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          className="text-3xl md:text-5xl font-black text-slate-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Analyse personnalisée payante
        </motion.h1>
        <p className="text-slate-600 mb-8">Décrivez votre actif, timeframe et style. Téléversez le graphique. Payez en crypto pour lancer l'analyse prioritaire.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Actif</label>
                <input 
                  className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Ex: BTC/USDT, EURUSD, SPX..."
                  value={params.asset}
                  onChange={(e) => setParams({ ...params, asset: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Timeframe</label>
                  <select 
                    className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={params.timeframe}
                    onChange={(e) => setParams({ ...params, timeframe: e.target.value })}
                  >
                    {['1m','3m','5m','15m','1h'].map(tf => <option key={tf} value={tf}>{tf}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Risque</label>
                  <select 
                    className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={params.risk}
                    onChange={(e) => setParams({ ...params, risk: e.target.value })}
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyen</option>
                    <option value="high">Élevé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Style</label>
                <select 
                  className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={params.style}
                  onChange={(e) => setParams({ ...params, style: e.target.value })}
                >
                  <option value="scalping">Scalping</option>
                  <option value="daytrading">Day Trading</option>
                  <option value="swing">Swing</option>
                </select>
              </div>

              {/* Upload */}
              <div>
                <label className="text-sm font-medium text-slate-700">Graphique (image)</label>
                {!image ? (
                  <label className="mt-2 group block border-2 border-dashed border-slate-300 hover:border-pink-400 rounded-2xl p-8 text-center cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={onInput} />
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                      <Upload className="w-8 h-8" />
                      Déposez votre image ou cliquez pour choisir
                    </div>
                  </label>
                ) : (
                  <div className="mt-2 relative">
                    <img src={image} alt="preview" className="w-full h-56 object-contain bg-slate-100 rounded-2xl border" />
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center" onClick={() => setImage(null)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-xl p-3 text-sm">
                  Connectez-vous pour commander une analyse personnalisée.
                </div>
              )}

              <button 
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${canPay ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
                disabled={!canPay}
                onClick={async () => {
                  // Créer un paiement côté serveur (tracking)
                  try {
                    const res = await fetch('/api/payment/create', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
                      body: JSON.stringify({ plan: 'custom', cryptoCurrency: 'BTC' })
                    });
                    if (res.ok) {
                      const json = await res.json();
                      setPaymentRef(json.data.payment.paymentId);
                    }
                  } catch {}
                  setShowPay(true);
                }}
              >
                <Wallet className="w-5 h-5" />
                Payer l'analyse (Crypto)
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Paiement sécurisé par NowPayments
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-bold">Ce que vous recevez</h3>
            </div>
            <ul className="space-y-3 text-slate-600">
              {[
                'Signal BUY/SELL/WAIT',
                "Zone d\'entrée, SL, TP1/TP2/TP3",
                'Score de confiance et grade',
                'Explication IA concise',
                'Livraison prioritaire',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {t}</li>
              ))}
            </ul>

            <div className="mt-6 text-sm text-slate-500">
              Après paiement, l\'analyse démarre automatiquement. Vous recevrez la réponse dans votre Dashboard.
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl border text-sm flex items-start gap-3">
              <ImageIcon className="w-4 h-4 text-slate-500 mt-0.5" />
              Astuce: exportez vos graphiques en PNG haute résolution pour de meilleurs résultats.
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal Paiement */}
      <AnimatePresence>
        {showPay && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.currentTarget === e.target && setShowPay(false)}
          >
            <motion.div 
              className="bg-white rounded-3xl max-w-[480px] w-full shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
            >
              <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-sm">Analyse personnalisée</div>
                  <div className="text-2xl font-black">$9.00</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-pink-500 flex items-center justify-center" onClick={() => setShowPay(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-50 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                {isWidgetLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                    <p className="text-slate-600">Chargement du paiement...</p>
                  </div>
                )}
                <div className={`bg-white rounded-2xl overflow-hidden border ${isWidgetLoading ? 'invisible absolute' : ''}`}>
                  <iframe
                    src={`https://nowpayments.io/embeds/payment-widget?iid=${widgetId}`}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    scrolling="yes"
                    style={{ overflowY: 'auto', display: 'block', borderRadius: 16, minHeight: 600 }}
                    onLoad={() => setIsWidgetLoading(false)}
                    onError={() => { setIsWidgetLoading(false); setWidgetError(true); }}
                    title="Paiement NowPayments"
                  >
                    Impossible de charger le widget
                  </iframe>
                </div>
                {!isWidgetLoading && widgetError && (
                  <div className="text-center py-6">
                    <p className="text-slate-600 mb-3">Le widget ne s'est pas chargé. Ouvrez dans un nouvel onglet :</p>
                    <a 
                      href={`https://nowpayments.io/embeds/payment-widget?iid=${widgetId}`}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-xl"
                    >
                      Ouvrir NowPayments
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
