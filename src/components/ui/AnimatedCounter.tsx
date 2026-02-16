'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, duration, motionValue, rounded]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ textAlign: 'center' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
    >
      <div
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: '48px',
          fontWeight: 300,
          color: '#C9A96E',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}
      >
        {displayValue}
        {suffix && (
          <span
            style={{
              fontSize: '36px',
              fontWeight: 300,
              marginLeft: '2px',
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#A0A0A0',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}
