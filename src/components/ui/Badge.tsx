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
        backgroundColor: 'rgba(244, 221, 195, 0.1)',
        border: '1px solid #F4DDC3',
        color: '#F4DDC3',
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
