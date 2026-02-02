import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
}

export default function AnimatedGradient({ className = '' }: AnimatedGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Orbe 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-rose-500/30 blur-[100px]"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '-10%', left: '-10%' }}
      />
      
      {/* Orbe 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[80px]"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ bottom: '-5%', right: '-5%' }}
      />
      
      {/* Orbe 3 - Centre */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-400/15 to-orange-400/15 blur-[60px]"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: '30%', left: '40%' }}
      />
    </div>
  );
}
