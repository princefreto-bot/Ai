import { Link } from 'react-router-dom';
import { TrendingUp, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    },
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@tradescalpsnip.com', label: 'Email' },
  ];

  const productLinks = [
    { label: 'Fonctionnalités', href: '/#features' },
    { label: 'Tarifs', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const companyLinks = [
    { label: 'À propos', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: 'mailto:contact@tradescalpsnip.com' },
  ];

  const legalLinks = [
    { label: "Conditions d'utilisation", href: '/terms' },
    { label: 'Politique de confidentialité', href: '/privacy' },
  ];

  return (
    <footer ref={ref} className="bg-slate-900 text-white py-16 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
                whileHover={{ rotate: 10, scale: 1.1 }}
                animate={{
                  boxShadow: [
                    '0 10px 40px -10px rgba(236, 72, 153, 0.3)',
                    '0 10px 40px -10px rgba(236, 72, 153, 0.6)',
                    '0 10px 40px -10px rgba(236, 72, 153, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-black">
                Trade<span className="text-pink-400">Scalp</span><span className="text-pink-300">Snip</span>
              </span>
            </motion.div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyse IA ultra-rapide pour le scalping. Obtenez des signaux précis BUY/SELL/WAIT en quelques secondes.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors group relative overflow-hidden"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-pink-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Produit
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-purple-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              Entreprise
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-rose-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              Légal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.href}
                    className="text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="border-t border-slate-800 mt-12 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © 2025-2026 TradeScalpSnip. Tous droits réservés.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>Tous les systèmes opérationnels</span>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-slate-600 text-xs mt-4 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            ⚠️ Avertissement : Les analyses fournies sont à titre informatif uniquement et ne constituent pas des conseils financiers. 
            Le trading comporte des risques significatifs de perte en capital.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
