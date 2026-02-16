'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';
import Badge from './Badge';

interface CardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  href?: string;
  className?: string;
}

export default function Card({
  image,
  title,
  subtitle,
  badge,
  children,
  href,
  className = '',
}: CardProps) {
  const cardContent = (
    <motion.div
      className={className}
      style={{
        backgroundColor: '#141414',
        border: '1px solid #1E1E1E',
        borderRadius: 0,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        cursor: href ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
          }}
        >
          <Image
            src={image}
            alt={title || ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          {badge && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 1,
              }}
            >
              <Badge>{badge}</Badge>
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '28px 24px', flex: 1 }}>
        {!image && badge && (
          <div style={{ marginBottom: '16px' }}>
            <Badge>{badge}</Badge>
          </div>
        )}

        {title && (
          <h3
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 600,
              fontSize: '22px',
              color: '#FFFFFF',
              margin: 0,
              marginBottom: subtitle || children ? '10px' : '0',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
        )}

        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '16px',
              color: '#A0A0A0',
              margin: 0,
              marginBottom: children ? '16px' : '0',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
