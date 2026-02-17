'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTitleProps {
  preTitle?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  /** Inline margin-bottom on the wrapper — use this instead of Tailwind mb-X for reliable spacing in v4 */
  mb?: string;
}

export default function SectionTitle({
  preTitle,
  title,
  subtitle,
  centered = false,
  className = '',
  mb,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ textAlign: centered ? 'center' : 'left', marginBottom: mb || undefined }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {preTitle && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#F4DDC3',
            marginBottom: '14px',
            lineHeight: 1.5,
          }}
        >
          {preTitle}
        </motion.p>
      )}

      <motion.h2
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontWeight: 600,
          color: '#FFFFFF',
          lineHeight: 1.15,
          margin: 0,
          fontSize: 'clamp(26px, 4vw, 42px)',
          marginBottom: subtitle ? '18px' : '0',
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 2.5vw, 20px)',
            color: '#A0A0A0',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: centered ? '640px' : 'none',
            marginLeft: centered ? 'auto' : '0',
            marginRight: centered ? 'auto' : '0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
