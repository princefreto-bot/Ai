import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxScroll({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
