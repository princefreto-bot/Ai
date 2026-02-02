import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export function LogoScroller() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: [0, -2000],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        },
      });
    }
  }, [isHovered, controls]);

  const logos = [
    {
      name: 'TradingView',
      svg: (
        <svg viewBox="0 0 200 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="tv-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2962FF"/>
              <stop offset="100%" stopColor="#1E88E5"/>
            </linearGradient>
          </defs>
          <rect x="2" y="8" width="34" height="34" rx="6" fill="url(#tv-gradient)" className="drop-shadow-lg"/>
          <path d="M10 25 L18 16 L24 24 L32 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="44" y="33" fontFamily="Trebuchet MS, sans-serif" fontSize="20" fontWeight="700" fill="#131722">TradingView</text>
        </svg>
      )
    },
    {
      name: 'Binance',
      svg: (
        <svg viewBox="0 0 170 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="binance-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0B90B"/>
              <stop offset="100%" stopColor="#FCD535"/>
            </linearGradient>
          </defs>
          <g fill="url(#binance-gradient)" className="drop-shadow-md">
            <polygon points="20,5 25,10 15,20 10,15"/>
            <polygon points="20,5 25,10 30,5 25,0"/>
            <polygon points="30,15 35,20 25,30 20,25"/>
            <polygon points="10,15 5,20 15,30 20,25"/>
            <polygon points="20,35 25,40 30,35 25,30"/>
            <polygon points="20,35 15,40 10,35 15,30"/>
            <polygon points="20,15 25,20 20,25 15,20"/>
          </g>
          <text x="50" y="32" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#F0B90B">Binance</text>
        </svg>
      )
    },
    {
      name: 'Coinbase',
      svg: (
        <svg viewBox="0 0 180 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="coinbase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0052FF"/>
              <stop offset="100%" stopColor="#0066FF"/>
            </linearGradient>
          </defs>
          <circle cx="22" cy="25" r="18" fill="url(#coinbase-gradient)" className="drop-shadow-lg"/>
          <circle cx="22" cy="25" r="8" fill="white"/>
          <text x="48" y="33" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#0052FF">Coinbase</text>
        </svg>
      )
    },
    {
      name: 'Kraken',
      svg: (
        <svg viewBox="0 0 160 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="kraken-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5741D9"/>
              <stop offset="100%" stopColor="#7B68EE"/>
            </linearGradient>
          </defs>
          <circle cx="22" cy="25" r="18" fill="url(#kraken-gradient)" className="drop-shadow-lg"/>
          <path d="M14 18 L22 25 L14 32 M22 25 L30 18 M22 25 L30 32 M22 13 L22 25 M22 25 L22 37" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <text x="48" y="33" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#5741D9">Kraken</text>
        </svg>
      )
    },
    {
      name: 'MetaTrader',
      svg: (
        <svg viewBox="0 0 190 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="mt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A6ED"/>
              <stop offset="100%" stopColor="#0090D9"/>
            </linearGradient>
          </defs>
          <rect x="2" y="8" width="34" height="34" rx="6" fill="url(#mt-gradient)" className="drop-shadow-lg"/>
          <path d="M8 35 L14 20 L20 28 L26 12 L32 25" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="44" y="32" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#00A6ED">MetaTrader</text>
        </svg>
      )
    },
    {
      name: 'Bloomberg',
      svg: (
        <svg viewBox="0 0 190 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="bloomberg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1A1A"/>
              <stop offset="100%" stopColor="#333333"/>
            </linearGradient>
          </defs>
          <rect x="2" y="8" width="34" height="34" rx="4" fill="url(#bloomberg-gradient)" className="drop-shadow-lg"/>
          <text x="8" y="34" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill="#FF6B00">B</text>
          <text x="44" y="33" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#1A1A1A">Bloomberg</text>
        </svg>
      )
    },
    {
      name: 'eToro',
      svg: (
        <svg viewBox="0 0 140 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="etoro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#49C56C"/>
              <stop offset="100%" stopColor="#3DB960"/>
            </linearGradient>
          </defs>
          <circle cx="22" cy="25" r="18" fill="url(#etoro-gradient)" className="drop-shadow-lg"/>
          <path d="M14 25 L22 17 L30 25 L22 33 Z" fill="white"/>
          <text x="48" y="33" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#49C56C">eToro</text>
        </svg>
      )
    },
    {
      name: 'Bybit',
      svg: (
        <svg viewBox="0 0 140 50" className="h-10 w-auto">
          <defs>
            <linearGradient id="bybit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7A600"/>
              <stop offset="100%" stopColor="#FFB700"/>
            </linearGradient>
          </defs>
          <rect x="2" y="8" width="34" height="34" rx="8" fill="#1A1A1A" className="drop-shadow-lg"/>
          <text x="7" y="34" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="url(#bybit-gradient)">By</text>
          <text x="44" y="33" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1A1A1A">Bybit</text>
        </svg>
      )
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 overflow-hidden border-y border-slate-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-20"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 100,
            }}
            animate={{
              y: [null, -20, null],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative">
        <motion.p 
          className="text-center text-sm font-semibold text-slate-600 mb-10 uppercase tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Compatible avec les principales plateformes de trading
        </motion.p>
        
        {/* Logo container with smooth fade */}
        <div 
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          
          <motion.div 
            className="flex gap-20 items-center py-4"
            animate={controls}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 cursor-pointer group"
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-pink-400/0 via-pink-400/30 to-pink-400/0 rounded-xl blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Shadow effect */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 rounded-full blur-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="relative"
                    whileHover={{ rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {logo.svg}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}