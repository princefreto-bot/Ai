import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, CheckCircle, Zap, Shield, Clock, Headphones } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Composant de particules flottantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Composant de grille animée
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Composant de badge animé
function AnimatedBadge() {
  return (
    <motion.div 
      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-10 shadow-xl border border-white/30"
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
      <span>Offre de lancement • Économisez 50%</span>
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Zap className="w-5 h-5 text-yellow-300" />
      </motion.div>
    </motion.div>
  );
}

// Composant de carte bénéfice avec 3D
function BenefitCard({ benefit, index }: { benefit: { text: string; icon: string; description: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 overflow-hidden h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -5 }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Glow */}
        <motion.div
          className="absolute -inset-2 bg-white/10 blur-xl rounded-full"
          animate={{ opacity: isHovered ? 0.5 : 0 }}
        />
        
        <motion.div 
          className="text-4xl mb-4"
          style={{ transform: "translateZ(30px)" }}
          animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {benefit.icon}
        </motion.div>
        
        <div className="flex items-center gap-2 text-white font-bold text-lg mb-2" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="w-5 h-5 text-green-300" />
          </motion.div>
          <span>{benefit.text}</span>
        </div>
        
        <p className="text-white/70 text-sm" style={{ transform: "translateZ(10px)" }}>
          {benefit.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Composant de crypto badge animé
function CryptoBadge({ crypto, delay }: { crypto: { symbol: string; name: string; color: string }; delay: number }) {
  return (
    <motion.div 
      className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-xl"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay }}
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <motion.div 
        className={`w-8 h-8 ${crypto.color} rounded-lg flex items-center justify-center shadow-lg`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white text-sm font-black">{crypto.symbol}</span>
      </motion.div>
      <span className="text-white text-sm font-bold">{crypto.name}</span>
    </motion.div>
  );
}

// Compteur animé
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function CTA() {
  const sectionRef = useRef(null);
  useInView(sectionRef, { once: true, margin: "-100px" });
  
  const benefits = [
    { text: 'Analyses illimitées', icon: '📊', description: 'Aucune limite sur le nombre d\'analyses par jour' },
    { text: 'Signaux précis', icon: '🎯', description: 'Algorithmes IA entraînés sur des millions de données' },
    { text: 'Support prioritaire', icon: '⚡', description: 'Réponse garantie en moins de 24h' },
  ];
  
  const cryptos = [
    { symbol: '₿', name: 'Bitcoin', color: 'bg-[#F7931A]' },
    { symbol: 'Ξ', name: 'Ethereum', color: 'bg-[#627EEA]' },
    { symbol: '₮', name: 'USDT', color: 'bg-[#26A17B]' },
    { symbol: '◎', name: 'Solana', color: 'bg-[#9945FF]' },
  ];
  
  const trustElements = [
    { icon: Shield, text: 'Annulation à tout moment' },
    { icon: Clock, text: 'Garantie 14 jours' },
    { icon: Headphones, text: 'Support 24/7' },
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #db2777 100%)',
            'linear-gradient(135deg, #db2777 0%, #ec4899 50%, #f43f5e 100%)',
            'linear-gradient(135deg, #f43f5e 0%, #db2777 50%, #ec4899 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0], 
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Animated grid */}
      <AnimatedGrid />
      
      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card with glassmorphism */}
        <motion.div 
          className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 lg:p-20 border border-white/20 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="text-center relative">
            {/* Stats bar */}
            <motion.div
              className="flex justify-center gap-8 mb-10 flex-wrap"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                { value: 15000, label: 'Traders actifs', suffix: '+' },
                { value: 98, label: 'Satisfaction', suffix: '%' },
                { value: 2, label: 'Temps d\'analyse', suffix: 's' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-2xl lg:text-3xl font-black text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Floating badge */}
            <AnimatedBadge />
            
            {/* Title with animated gradient */}
            <motion.h2 
              className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 40px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Prêt à révolutionner
              </motion.span>
              <span className="block text-white/90">votre trading ?</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Rejoignez des milliers de traders qui utilisent TradeScalpSnip pour prendre de 
              <motion.span 
                className="font-bold text-white"
                animate={{ 
                  textShadow: ['0 0 10px #fff', '0 0 20px #fff', '0 0 10px #fff']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {' '}meilleures décisions
              </motion.span>.
            </motion.p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} />
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div 
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-white text-pink-600 hover:bg-white/90 text-xl px-12 shadow-2xl shadow-black/20 group relative overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Commencer à 20$/mois
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>

              {/* Trust elements */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                {trustElements.map((item, i) => (
                  <motion.span 
                    key={i}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1, color: '#fff' }}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.text}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Payment methods - Crypto Only via NowPayments */}
            <motion.div 
              className="mt-12 flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {cryptos.map((crypto, i) => (
                <CryptoBadge key={i} crypto={crypto} delay={0.9 + i * 0.1} />
              ))}
              
              {/* NowPayments branding */}
              <motion.div 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/20"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-white text-[8px] font-black">NP</span>
                </motion.div>
                <span className="text-white/70 text-xs">Powered by</span>
                <span className="text-white text-sm font-bold">NowPayments</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}