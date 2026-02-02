import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FileText, AlertTriangle, User, CreditCard, Shield, Scale, Copyright, Mail, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const sections = [
  { id: 'presentation', icon: FileText, title: '1. Présentation du Service' },
  { id: 'acceptation', icon: ChevronRight, title: '2. Acceptation des Conditions' },
  { id: 'description', icon: FileText, title: '3. Description du Service' },
  { id: 'risques', icon: AlertTriangle, title: '4. Avertissement sur les Risques' },
  { id: 'compte', icon: User, title: '5. Compte Utilisateur' },
  { id: 'abonnement', icon: CreditCard, title: '6. Abonnement et Paiement' },
  { id: 'responsabilite', icon: Shield, title: '7. Limitation de Responsabilité' },
  { id: 'propriete', icon: Copyright, title: '8. Propriété Intellectuelle' },
  { id: 'droit', icon: Scale, title: '9. Droit Applicable' },
  { id: 'contact', icon: Mail, title: '10. Contact' },
];

export function Terms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <Header />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <main className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <FileText className="w-5 h-5 text-pink-600" />
              </motion.div>
              <span className="text-pink-700 font-medium">Document Légal</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Conditions Générales{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                d'Utilisation
              </span>
            </h1>
            <p className="text-slate-600">Dernière mise à jour : Janvier 2026</p>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-6 bg-gradient-to-br from-slate-50 to-pink-50/50 rounded-2xl border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Navigation rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-md transition-all text-sm text-slate-600 hover:text-pink-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="truncate">{section.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <Section id="presentation" index={0}>
              <SectionTitle icon={FileText} number={1}>Présentation du Service</SectionTitle>
              <p className="text-slate-700 mb-4">
                TradeScalpSnip (ci-après "le Service") est une plateforme d'analyse technique basée sur l'intelligence artificielle. 
                Le Service utilise des algorithmes de Computer Vision pour analyser des images de graphiques de trading 
                et fournir des indications techniques sous forme de signaux (BUY, SELL, WAIT), zones d'entrée, 
                stop loss et take profit suggérés.
              </p>
              <p className="text-slate-700">
                Le Service est édité par TradeScalpSnip SAS, société immatriculée au Registre du Commerce et des Sociétés.
              </p>
            </Section>

            <Section id="acceptation" index={1}>
              <SectionTitle icon={ChevronRight} number={2}>Acceptation des Conditions</SectionTitle>
              <p className="text-slate-700 mb-4">
                En accédant ou en utilisant le Service, vous acceptez d'être lié par ces Conditions Générales d'Utilisation.
                Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Service.
              </p>
              <p className="text-slate-700">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur 
                dès leur publication sur le site. Il vous appartient de consulter régulièrement ces conditions.
              </p>
            </Section>

            <Section id="description" index={2}>
              <SectionTitle icon={FileText} number={3}>Description du Service</SectionTitle>
              <p className="text-slate-700 mb-4">
                TradeScalpSnip propose les fonctionnalités suivantes :
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  "Upload d'images de graphiques de trading",
                  "Analyse automatisée par intelligence artificielle",
                  "Génération de signaux de trading (BUY, SELL, WAIT)",
                  "Suggestion de zones d'entrée, stop loss et take profit",
                  "Score de confiance et grade de qualité du setup",
                  "Explication textuelle de l'analyse"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-3 text-slate-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="risques" index={3}>
              <SectionTitle icon={AlertTriangle} number={4}>Avertissement sur les Risques</SectionTitle>
              <motion.div 
                className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 mb-4 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </motion.div>
                    <p className="text-yellow-800 font-semibold">AVERTISSEMENT IMPORTANT</p>
                  </div>
                  <p className="text-yellow-800">
                    Le trading de produits financiers comporte des risques significatifs et peut entraîner la perte 
                    totale de votre capital investi. Les performances passées ne garantissent pas les résultats futurs.
                  </p>
                </div>
              </motion.div>
              <p className="text-slate-700 mb-4">
                Les analyses et signaux fournis par TradeScalpSnip sont générés par des algorithmes d'intelligence artificielle 
                et sont fournis à titre informatif uniquement. Ils ne constituent en aucun cas :
              </p>
              <ul className="space-y-2">
                {[
                  "Un conseil en investissement",
                  "Une recommandation d'achat ou de vente",
                  "Une incitation à trader",
                  "Une garantie de résultat"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2 text-slate-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="compte" index={4}>
              <SectionTitle icon={User} number={5}>Compte Utilisateur</SectionTitle>
              <p className="text-slate-700 mb-4">
                Pour utiliser le Service, vous devez créer un compte utilisateur. Vous êtes responsable de :
              </p>
              <ul className="space-y-2">
                {[
                  "Maintenir la confidentialité de vos identifiants de connexion",
                  "Toutes les activités effectuées sous votre compte",
                  "Nous informer immédiatement de toute utilisation non autorisée"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2 text-slate-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="abonnement" index={5}>
              <SectionTitle icon={CreditCard} number={6}>Abonnement et Paiement</SectionTitle>
              <p className="text-slate-700 mb-4">
                Le Service propose différentes formules d'abonnement. Les paiements sont traités de manière sécurisée 
                via NowPayments (paiement en crypto-monnaies). En souscrivant à un abonnement payant :
              </p>
              <ul className="space-y-2">
                {[
                  "Vous autorisez le prélèvement automatique mensuel",
                  "L'abonnement est renouvelé automatiquement sauf annulation",
                  "Vous pouvez annuler à tout moment depuis votre compte",
                  "Les remboursements sont possibles dans les 14 jours suivant le premier paiement"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2 text-slate-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="responsabilite" index={6}>
              <SectionTitle icon={Shield} number={7}>Limitation de Responsabilité</SectionTitle>
              <p className="text-slate-700 mb-4">
                Dans les limites autorisées par la loi applicable, TradeScalpSnip ne pourra être tenu responsable 
                de tout dommage direct, indirect, accessoire, spécial ou consécutif résultant de :
              </p>
              <ul className="space-y-2">
                {[
                  "L'utilisation ou l'impossibilité d'utiliser le Service",
                  "Toute décision de trading prise sur la base des analyses fournies",
                  "Toute perte financière liée au trading",
                  "Toute interruption ou erreur du Service"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2 text-slate-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="propriete" index={7}>
              <SectionTitle icon={Copyright} number={8}>Propriété Intellectuelle</SectionTitle>
              <p className="text-slate-700">
                Tous les contenus du Service (algorithmes, design, textes, logos) sont la propriété exclusive 
                de TradeScalpSnip et sont protégés par les lois sur la propriété intellectuelle. 
                Toute reproduction non autorisée est strictement interdite.
              </p>
            </Section>

            <Section id="droit" index={8}>
              <SectionTitle icon={Scale} number={9}>Droit Applicable</SectionTitle>
              <p className="text-slate-700">
                Les présentes Conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux français.
              </p>
            </Section>

            <Section id="contact" index={9}>
              <SectionTitle icon={Mail} number={10}>Contact</SectionTitle>
              <p className="text-slate-700 mb-4">
                Pour toute question concernant ces Conditions, contactez-nous à :
              </p>
              <motion.a
                href="mailto:legal@tradescalpsnip.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg shadow-pink-500/25"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(236, 72, 153, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                legal@tradescalpsnip.com
              </motion.a>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ id, index, children }: { id: string; index: number; children: React.ReactNode }) {
  return (
    <motion.section 
      id={id}
      className="scroll-mt-24 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
      <div className="relative">
        {children}
      </div>
    </motion.section>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; number?: number; children: React.ReactNode }) {
  return (
    <motion.h2 
      className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4"
      whileHover={{ x: 5 }}
    >
      <motion.span 
        className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/25"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-5 h-5" />
      </motion.span>
      {children}
    </motion.h2>
  );
}
