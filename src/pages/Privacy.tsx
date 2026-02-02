import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Shield, Eye, Database, Lock, Clock, Share2, Key, Cookie, Globe, RefreshCw, Mail, User } from 'lucide-react';
import { useRef } from 'react';

const sections = [
  { id: 'introduction', icon: Shield, title: '1. Introduction' },
  { id: 'responsable', icon: User, title: '2. Responsable du Traitement' },
  { id: 'donnees', icon: Database, title: '3. Données Collectées' },
  { id: 'finalites', icon: Eye, title: '4. Finalités du Traitement' },
  { id: 'base-legale', icon: Lock, title: '5. Base Légale' },
  { id: 'duree', icon: Clock, title: '6. Durée de Conservation' },
  { id: 'partage', icon: Share2, title: '7. Partage des Données' },
  { id: 'securite', icon: Key, title: '8. Sécurité des Données' },
  { id: 'droits', icon: Shield, title: '9. Vos Droits (RGPD)' },
  { id: 'cookies', icon: Cookie, title: '10. Cookies' },
  { id: 'transferts', icon: Globe, title: '11. Transferts Internationaux' },
  { id: 'modifications', icon: RefreshCw, title: '12. Modifications' },
  { id: 'contact', icon: Mail, title: '13. Contact' },
];

export function Privacy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <Header />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-5 h-5 text-emerald-600" />
              </motion.div>
              <span className="text-emerald-700 font-medium">Protection des Données</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Politique de{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Confidentialité
              </span>
            </h1>
            <p className="text-slate-600">Dernière mise à jour : Janvier 2026</p>
          </motion.div>

          {/* RGPD Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 flex items-center gap-4"
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-slate-900">Conforme RGPD</h3>
              <p className="text-sm text-slate-600">Vos données sont protégées selon les normes européennes</p>
            </div>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 p-6 bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-2xl border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Navigation rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-md transition-all text-sm text-slate-600 hover:text-emerald-600"
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
            <Section id="introduction" index={0} color="emerald">
              <SectionTitle icon={Shield}>1. Introduction</SectionTitle>
              <p className="text-slate-700">
                TradeScalpSnip (ci-après "nous", "notre" ou "le Service") s'engage à protéger votre vie privée.
                Cette Politique de Confidentialité explique comment nous collectons, utilisons, stockons et protégeons 
                vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) 
                et aux lois applicables.
              </p>
            </Section>

            <Section id="responsable" index={1} color="emerald">
              <SectionTitle icon={User}>2. Responsable du Traitement</SectionTitle>
              <p className="text-slate-700 mb-2">
                Le responsable du traitement des données personnelles est TradeScalpSnip SAS, 
                dont le siège social est situé à Paris, France.
              </p>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Contact DPO : privacy@tradescalpsnip.com</span>
              </motion.div>
            </Section>

            <Section id="donnees" index={2} color="emerald">
              <SectionTitle icon={Database}>3. Données Collectées</SectionTitle>
              <p className="text-slate-700 mb-6">
                Nous collectons les types de données suivants :
              </p>
              
              <div className="space-y-6">
                <DataCategory 
                  title="3.1 Données d'identification" 
                  items={["Nom et prénom", "Adresse email", "Mot de passe (hashé et chiffré)"]} 
                  color="blue"
                />
                <DataCategory 
                  title="3.2 Données d'utilisation" 
                  items={[
                    "Images de graphiques uploadées pour analyse",
                    "Historique des analyses effectuées",
                    "Préférences utilisateur",
                    "Logs de connexion"
                  ]} 
                  color="purple"
                />
                <DataCategory 
                  title="3.3 Données de paiement" 
                  items={[
                    "Informations de facturation (traitées par NowPayments)",
                    "Historique des transactions"
                  ]} 
                  color="green"
                />
              </div>
            </Section>

            <Section id="finalites" index={3} color="emerald">
              <SectionTitle icon={Eye}>4. Finalités du Traitement</SectionTitle>
              <p className="text-slate-700 mb-4">
                Vos données sont traitées pour les finalités suivantes :
              </p>
              <ul className="space-y-2">
                {[
                  "Fourniture et amélioration du Service",
                  "Gestion de votre compte utilisateur",
                  "Traitement des paiements et facturation",
                  "Communication relative au Service (mises à jour, notifications)",
                  "Analyse statistique anonymisée pour améliorer nos algorithmes",
                  "Respect de nos obligations légales"
                ].map((item, i) => (
                  <ListItem key={i} index={i} color="emerald">{item}</ListItem>
                ))}
              </ul>
            </Section>

            <Section id="base-legale" index={4} color="emerald">
              <SectionTitle icon={Lock}>5. Base Légale du Traitement</SectionTitle>
              <p className="text-slate-700 mb-4">
                Nos traitements de données reposent sur les bases légales suivantes :
              </p>
              <div className="grid gap-3">
                {[
                  { label: "Exécution du contrat", desc: "fourniture du Service" },
                  { label: "Consentement", desc: "communications marketing" },
                  { label: "Intérêt légitime", desc: "amélioration du Service, sécurité" },
                  { label: "Obligation légale", desc: "conservation des données de facturation" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, backgroundColor: '#ecfdf5' }}
                  >
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">{item.label}</span>
                    <span className="text-slate-600">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section id="duree" index={5} color="emerald">
              <SectionTitle icon={Clock}>6. Durée de Conservation</SectionTitle>
              <p className="text-slate-700 mb-4">
                Nous conservons vos données selon les durées suivantes :
              </p>
              <div className="grid gap-3">
                {[
                  { data: "Données de compte", duration: "durée de l'abonnement + 3 ans" },
                  { data: "Images analysées", duration: "30 jours après l'analyse" },
                  { data: "Données de facturation", duration: "10 ans (obligation légale)" },
                  { data: "Logs de connexion", duration: "1 an" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium text-slate-700">{item.data}</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">{item.duration}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section id="partage" index={6} color="emerald">
              <SectionTitle icon={Share2}>7. Partage des Données</SectionTitle>
              <p className="text-slate-700 mb-4">
                Nous pouvons partager vos données avec :
              </p>
              <div className="grid gap-3 mb-4">
                {[
                  { partner: "NowPayments", purpose: "traitement des paiements en crypto-monnaies" },
                  { partner: "Hébergeurs (Render, AWS)", purpose: "serveurs sécurisés" },
                  { partner: "Autorités", purpose: "sur demande légale uniquement" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-bold text-emerald-600">{item.partner} :</span>
                    <span className="text-slate-600">{item.purpose}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="p-4 bg-green-50 border border-green-200 rounded-xl"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-green-700 font-medium">
                  ✅ Nous ne vendons jamais vos données personnelles à des tiers.
                </p>
              </motion.div>
            </Section>

            <Section id="securite" index={7} color="emerald">
              <SectionTitle icon={Key}>8. Sécurité des Données</SectionTitle>
              <p className="text-slate-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées :
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { icon: "🔒", text: "Chiffrement SSL/TLS" },
                  { icon: "🔑", text: "Hashage bcrypt" },
                  { icon: "👁️", text: "Accès restreint" },
                  { icon: "🛡️", text: "Détection d'intrusion" },
                  { icon: "💾", text: "Sauvegardes chiffrées" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-lg border border-slate-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section id="droits" index={8} color="emerald">
              <SectionTitle icon={Shield}>9. Vos Droits (RGPD)</SectionTitle>
              <p className="text-slate-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {[
                  { right: "Accès", desc: "obtenir une copie de vos données" },
                  { right: "Rectification", desc: "corriger des données inexactes" },
                  { right: "Effacement", desc: "demander la suppression de vos données" },
                  { right: "Limitation", desc: "restreindre le traitement" },
                  { right: "Portabilité", desc: "recevoir vos données dans un format standard" },
                  { right: "Opposition", desc: "vous opposer à certains traitements" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  >
                    <h4 className="font-bold text-emerald-600 mb-1">{item.right}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="mailto:privacy@tradescalpsnip.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/25"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                Exercer mes droits
              </motion.a>
            </Section>

            <Section id="cookies" index={9} color="emerald">
              <SectionTitle icon={Cookie}>10. Cookies</SectionTitle>
              <p className="text-slate-700 mb-4">
                Nous utilisons des cookies essentiels pour le fonctionnement du Service :
              </p>
              <ul className="space-y-2">
                {[
                  "Cookies de session (authentification)",
                  "Cookies de préférences",
                  "Cookies analytiques (avec votre consentement)"
                ].map((item, i) => (
                  <ListItem key={i} index={i} color="amber">{item}</ListItem>
                ))}
              </ul>
            </Section>

            <Section id="transferts" index={10} color="emerald">
              <SectionTitle icon={Globe}>11. Transferts Internationaux</SectionTitle>
              <p className="text-slate-700">
                Vos données sont hébergées dans l'Union Européenne. En cas de transfert hors UE, 
                nous nous assurons que des garanties appropriées sont en place (clauses contractuelles types).
              </p>
            </Section>

            <Section id="modifications" index={11} color="emerald">
              <SectionTitle icon={RefreshCw}>12. Modifications</SectionTitle>
              <p className="text-slate-700">
                Nous pouvons mettre à jour cette politique. Les modifications significatives vous seront 
                notifiées par email. La date de dernière mise à jour est indiquée en haut de ce document.
              </p>
            </Section>

            <Section id="contact" index={12} color="emerald">
              <SectionTitle icon={Mail}>13. Contact</SectionTitle>
              <p className="text-slate-700 mb-4">
                Pour toute question relative à cette politique :
              </p>
              <div className="space-y-3">
                <motion.a
                  href="mailto:privacy@tradescalpsnip.com"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Mail className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">privacy@tradescalpsnip.com</span>
                </motion.a>
                <p className="text-slate-600 text-sm">
                  Vous pouvez également déposer une réclamation auprès de la CNIL.
                </p>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ id, index, color, children }: { id: string; index: number; color: string; children: React.ReactNode }) {
  return (
    <motion.section 
      id={id}
      className="scroll-mt-24 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Shimmer effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}-100/50 to-transparent opacity-0 group-hover:opacity-100`}
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

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.h2 
      className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4"
      whileHover={{ x: 5 }}
    >
      <motion.span 
        className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-5 h-5" />
      </motion.span>
      {children}
    </motion.h2>
  );
}

function DataCategory({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colorClasses: Record<string, { bg: string; border: string; dot: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-400' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', dot: 'bg-purple-400' },
    green: { bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-400' },
  };
  const classes = colorClasses[color] || colorClasses.blue;
  
  return (
    <motion.div 
      className={`p-4 ${classes.bg} rounded-xl border ${classes.border}`}
      whileHover={{ scale: 1.01 }}
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li 
            key={i}
            className="flex items-center gap-2 text-slate-700"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <span className={`w-2 h-2 rounded-full ${classes.dot}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ListItem({ children, index, color }: { children: React.ReactNode; index: number; color: string }) {
  const dotColor = color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400';
  
  return (
    <motion.li 
      className="flex items-center gap-2 text-slate-700"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {children}
    </motion.li>
  );
}
