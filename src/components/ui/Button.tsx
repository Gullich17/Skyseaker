'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const sizeStyles: Record<ButtonSize, { padding: string; fontSize: string; minWidth: string }> = {
  sm: { padding: '10px 28px', fontSize: '11px', minWidth: '160px' },
  md: { padding: '16px 40px', fontSize: '12px', minWidth: '200px' },
  lg: { padding: '20px 52px', fontSize: '13px', minWidth: '240px' },
};

const variantColors: Record<ButtonVariant, {
  border: string;
  color: string;
  hoverBg: string;
  hoverColor: string;
}> = {
  primary: {
    border: '#C9A96E',
    color: '#C9A96E',
    hoverBg: '#C9A96E',
    hoverColor: '#0A0A0A',
  },
  secondary: {
    border: '#F5F5F0',
    color: '#F5F5F0',
    hoverBg: '#F5F5F0',
    hoverColor: '#0A0A0A',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const v = variantColors[variant];
  const s = sizeStyles[size];

  const style: React.CSSProperties = {
    border: `1px solid ${v.border}`,
    backgroundColor: 'transparent',
    color: v.color,
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: s.fontSize,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    padding: s.padding,
    minWidth: s.minWidth,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    lineHeight: 1,
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          style={style}
          className={className}
          whileHover={{
            backgroundColor: v.hoverBg,
            color: v.hoverColor,
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      style={style}
      className={className}
      onClick={onClick}
      whileHover={{
        backgroundColor: v.hoverBg,
        color: v.hoverColor,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}
