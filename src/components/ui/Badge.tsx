'use client';

import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: 'rgba(201, 169, 110, 0.1)',
        border: '1px solid #C9A96E',
        color: '#C9A96E',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderRadius: '2px',
        padding: '4px 12px',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
