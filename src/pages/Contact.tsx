import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulation d'envoi
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
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
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez l'Équipe</h1>
            <p className="text-xl text-gray-400">Une question sur l'algorithme ou votre abonnement ?</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm mb-8">
              <h3 className="text-2xl font-bold mb-6">Support Prioritaire</h3>
              <p className="text-gray-400 mb-8">
                Notre équipe de support est composée d'anciens traders et d'ingénieurs. Nous répondons généralement en moins de 2 heures aux membres Pro.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-500/10 rounded-xl">
                    <Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">contact@tradescalpsnip.com</p>
                    <p className="text-gray-500 text-xs mt-1">Réponse sous 24h max</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Live Chat</h4>
                    <p className="text-gray-400 text-sm">Disponible dans le Dashboard</p>
                    <p className="text-gray-500 text-xs mt-1">Pour les membres connectés</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nom</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Votre nom"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="votre@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sujet</label>
                <select 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                >
                  <option value="">Choisir un sujet...</option>
                  <option value="support">Support Technique</option>
                  <option value="billing">Facturation / Abonnement</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  status === 'success' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02]'
                }`}
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Envoi en cours...</span>
                ) : status === 'success' ? (
                  <>
                    <Check className="w-5 h-5" /> Message Envoyé !
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;