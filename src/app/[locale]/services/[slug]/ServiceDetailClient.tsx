'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { t as tData } from '@/lib/i18n-data';
import type { Locale } from '@/i18n/routing';
import { type Service } from '@/data/services';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   SERVICE IMAGES — Unsplash
   ============================================ */
const serviceImages: Record<string, string> = {
  'affretement-jet-prive':
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
  'vols-a-vide-empty-legs':
    'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80',
  'voyage-groupe':
    'https://images.unsplash.com/photo-1559628233-100c798642d4?w=1920&q=80',
  'fret-urgent':
    'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80',
  'conciergerie-lifestyle':
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
  'transferts-vip':
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0aca?w=1920&q=80',
  'gestion-appareil':
    'https://images.unsplash.com/photo-1583396082374-5ac19e1f63d0?w=1920&q=80',
  'achat-vente-jet':
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
};

const serviceSecondaryImages: Record<string, string> = {
  'affretement-jet-prive':
    'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=75',
  'vols-a-vide-empty-legs':
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=75',
  'voyage-groupe':
    'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=75',
  'fret-urgent':
    'https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=75',
  'conciergerie-lifestyle':
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=75',
  'transferts-vip':
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=75',
  'gestion-appareil':
    'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=75',
  'achat-vente-jet':
    'https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=75',
};

function getHeroImage(slug: string): string {
  return (
    serviceImages[slug] ||
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80'
  );
}

function getSecondaryImage(slug: string): string {
  return (
    serviceSecondaryImages[slug] ||
    'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=75'
  );
}

/* ============================================
   HERO SECTION — with background image
   ============================================ */
function HeroSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'clamp(500px, 70vh, 800px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={getHeroImage(service.slug)}
          alt={tData(service.title, locale)}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.6) 100%)',
          }}
        />
      </div>

      {/* Gold accent line */}
      <div
        style={{
          position: 'absolute',
          top: '33%',
          left: 0,
          right: 0,
          height: '1px',
          opacity: 0.05,
          zIndex: 1,
          background:
            'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding:
            'clamp(100px, 14vh, 160px) 24px clamp(40px, 6vw, 64px)',
        }}
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            fontSize: '12px',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 300,
          }}
        >
          <Link
            href="/services"
            className="transition-colors hover:text-[#F4DDC3]"
            style={{ color: '#6B6B6B', textDecoration: 'none' }}
          >
            Services
          </Link>
          <span style={{ color: '#6B6B6B' }}>/</span>
          <span style={{ color: '#A0A0A0' }}>{tData(service.shortTitle, locale)}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ marginBottom: '16px' }}
        >
          <Badge>{tData(service.shortTitle, locale)}</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            fontSize: 'clamp(36px, 8vw, 64px)',
            marginBottom: '20px',
          }}
        >
          {tData(service.title, locale)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            maxWidth: '650px',
          }}
        >
          {tData(service.shortDescription, locale)}
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   DESCRIPTION SECTION — with image
   ============================================ */
function DescriptionSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  return (
    <section
      style={{
        background: '#0E202D',
        padding: 'clamp(60px, 10vw, 120px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(32px, 5vw, 64px)',
          }}
          className="sidebar-grid"
        >
          {/* Text content */}
          <ScrollReveal>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 'clamp(32px, 5vw, 48px)',
                }}
                className="desc-grid"
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/7',
                    overflow: 'hidden',
                    border: '1px solid #1A3448',
                  }}
                >
                  <Image
                    src={getSecondaryImage(service.slug)}
                    alt={tData(service.shortTitle, locale)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(min-width: 1024px) 900px, 100vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(14,32,45,0.5) 0%, transparent 50%)',
                    }}
                  />
                </div>

                {/* Text */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 500,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: '#F4DDC3',
                      marginBottom: '16px',
                    }}
                  >
                    Overview
                  </p>
                  <div
                    style={{
                      width: '60px',
                      height: '1px',
                      background: '#F4DDC3',
                      opacity: 0.3,
                      marginBottom: '24px',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 300,
                      fontSize: '16px',
                      color: '#A0A0A0',
                      lineHeight: 1.9,
                    }}
                  >
                    {tData(service.description, locale)}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ADVANTAGES SECTION
   ============================================ */
function AdvantagesSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  return (
    <section
      style={{
        background: '#132A3A',
        padding: 'clamp(60px, 10vw, 120px) 0',
        borderTop: '1px solid rgba(244,221,195,0.08)',
        borderBottom: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <SectionTitle
          preTitle="Why Choose Us"
          title="Advantages"
          centered
          mb="64px"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '24px',
          }}
        >
          {service.advantages.map((adv, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: 'clamp(24px, 3vw, 32px)',
                  height: '100%',
                  backgroundColor: '#0E202D',
                  border: '1px solid #1A3448',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(244,221,195,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    '#1A3448';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    background: 'rgba(244,221,195,0.05)',
                    border: '1px solid rgba(244,221,195,0.2)',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4DDC3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    marginBottom: '8px',
                  }}
                >
                  {tData(adv.title, locale)}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {tData(adv.description, locale)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROCESS / TIMELINE SECTION
   ============================================ */
function ProcessSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  return (
    <section
      style={{
        background: '#0E202D',
        padding: 'clamp(60px, 10vw, 120px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <SectionTitle
          preTitle="How It Works"
          title="The Process"
          centered
          mb="64px"
        />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {service.steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div
                style={{
                  display: 'flex',
                  gap: 'clamp(16px, 3vw, 40px)',
                  marginBottom: i < service.steps.length - 1 ? '40px' : 0,
                }}
              >
                {/* Timeline column */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* Number */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #F4DDC3',
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 600,
                      fontSize: '24px',
                      color: '#F4DDC3',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Vertical line */}
                  {i < service.steps.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        minHeight: '40px',
                        background:
                          'linear-gradient(to bottom, rgba(244,221,195,0.4), rgba(244,221,195,0.05))',
                        marginTop: '8px',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '12px', paddingBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 600,
                      fontSize: '20px',
                      color: '#FFFFFF',
                      lineHeight: 1.3,
                      marginBottom: '8px',
                    }}
                  >
                    {tData(step.title, locale)}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 300,
                      fontSize: '15px',
                      color: '#A0A0A0',
                      lineHeight: 1.8,
                    }}
                  >
                    {tData(step.description, locale)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <div style={{ borderBottom: '1px solid rgba(26, 52, 72, 0.8)' }}>
        <button
          onClick={onToggle}
          className="group"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            textAlign: 'left',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
          aria-expanded={isOpen}
        >
          <span
            className="group-hover:text-[#F4DDC3] transition-colors"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 500,
              color: isOpen ? '#F4DDC3' : '#FFFFFF',
              fontSize: '16px',
              paddingRight: '16px',
              transition: 'color 0.3s ease',
            }}
          >
            {question}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            width="20"
            height="20"
            fill="none"
            stroke="#F4DDC3"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ overflow: 'hidden' }}
            >
              <p
                style={{
                  paddingBottom: '20px',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                  color: '#A0A0A0',
                }}
              >
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

function FaqSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!service.faq || service.faq.length === 0) return null;

  return (
    <section
      style={{
        background: '#132A3A',
        padding: 'clamp(60px, 10vw, 120px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <SectionTitle
          preTitle="Frequently Asked Questions"
          title="FAQ"
          centered
          mb="48px"
        />

        <div>
          {service.faq.map((item, i) => (
            <FaqItem
              key={i}
              question={tData(item.question, locale)}
              answer={tData(item.answer, locale)}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION — with radial gradient
   ============================================ */
function CtaSection({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 500,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#F4DDC3',
              marginBottom: '16px',
            }}
          >
            {tData(service.shortTitle, locale)}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: 'clamp(28px, 5vw, 48px)',
              marginBottom: '16px',
            }}
          >
            Ready for Takeoff?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#A0A0A0',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              marginBottom: '40px',
            }}
          >
            Contact us for a personalized quote within 30
            minutes. Available 24/7.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Button href="/devis" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href="tel:+33676765511" variant="secondary" size="lg">
              Call Us
            </Button>
          </div>
          <p
            style={{
              marginTop: '24px',
              fontSize: '12px',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              color: '#6B6B6B',
            }}
          >
            Response within 30 minutes &bull; Available 24/7
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   MAIN CLIENT COMPONENT
   ============================================ */
export default function ServiceDetailClient({
  service,
}: {
  service: Service;
}) {
  return (
    <>
      <HeroSection service={service} />
      <DescriptionSection service={service} />
      <AdvantagesSection service={service} />
      <ProcessSection service={service} />
      <FaqSection service={service} />
      <CtaSection service={service} />
    </>
  );
}
