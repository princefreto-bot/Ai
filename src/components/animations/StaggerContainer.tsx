import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function StaggerContainer({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0.1
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
