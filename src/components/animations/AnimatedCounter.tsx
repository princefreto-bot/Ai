import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2,
  className = '',
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (val) => Math.round(val));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, springValue, hasAnimated]);

  return (
    <motion.span 
      ref={ref} 
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring" as const, stiffness: 100, damping: 10 }}
    >
      {prefix}{display.toLocaleString()}{suffix}
    </motion.span>
  );
}
