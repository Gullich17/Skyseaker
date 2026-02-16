'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { type Service } from '@/data/services';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

/* ============================================
   ICON COMPONENTS
   ============================================ */
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A96E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 flex-shrink-0"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 flex-shrink-0"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection({ service }: { service: Service }) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '55vh' }}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1510 60%, #0A0A0A 100%)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.05]"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      <div className="relative z-10 w-full px-[5vw] pt-40 pb-16 text-center" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="mb-8"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 transition-colors"
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#A0A0A0',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft />
            Tous nos services
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#C9A96E',
            marginBottom: '16px',
          }}
        >
          {service.shortTitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-[32px] md:text-[52px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 700,
            color: '#F5F5F0',
            lineHeight: 1.15,
          }}
        >
          {service.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-[17px] md:text-[20px]"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            color: '#A0A0A0',
            lineHeight: 1.6,
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          {service.shortDescription}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="mx-auto mt-8"
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
      </div>
    </section>
  );
}

/* ============================================
   DETAILED DESCRIPTION SECTION
   ============================================ */
function DescriptionSection({ service }: { service: Service }) {
  return (
    <section className="section-padding" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container-luxury">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
              {/* Left: visual accent */}
              <div className="flex flex-col items-start">
                <div
                  style={{
                    width: '1px',
                    height: '60px',
                    backgroundColor: '#C9A96E',
                    opacity: 0.4,
                    marginBottom: '24px',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#C9A96E',
                  }}
                >
                  Presentation
                </p>
              </div>

              {/* Right: description text */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#A0A0A0',
                    lineHeight: 1.9,
                  }}
                >
                  {service.description}
                </p>
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
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#141414',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      <div className="container-luxury">
        <SectionTitle
          preTitle="Pourquoi nous choisir"
          title="Les avantages"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {service.advantages.map((adv, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #1E1E1E',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(201,169,110,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1E1E1E';
                }}
              >
                {/* Gold icon */}
                <div className="mb-6">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '1px solid rgba(201,169,110,0.3)',
                      borderRadius: '50%',
                    }}
                  >
                    <CheckIcon />
                  </div>
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#F5F5F0',
                    lineHeight: 1.3,
                  }}
                >
                  {adv.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {adv.description}
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
  return (
    <section className="section-padding" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container-luxury">
        <SectionTitle
          preTitle="Comment ca fonctionne"
          title="Le processus"
          centered
        />

        <div className="mt-16" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {service.steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="flex gap-6 md:gap-10 mb-12 last:mb-0">
                {/* Timeline column */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Number circle */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      border: '1px solid #C9A96E',
                      borderRadius: '50%',
                      fontFamily:
                        'var(--font-cormorant), "Cormorant Garamond", serif',
                      fontWeight: 600,
                      fontSize: '24px',
                      color: '#C9A96E',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {/* Vertical line */}
                  {i < service.steps.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        minHeight: '40px',
                        background:
                          'linear-gradient(to bottom, rgba(201,169,110,0.4), rgba(201,169,110,0.05))',
                        marginTop: '8px',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-3 pb-4">
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily:
                        'var(--font-playfair), "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: '20px',
                      color: '#F5F5F0',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily:
                        'var(--font-montserrat), Montserrat, sans-serif',
                      fontWeight: 300,
                      fontSize: '15px',
                      color: '#A0A0A0',
                      lineHeight: 1.8,
                    }}
                  >
                    {step.description}
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
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
        style={{ background: 'none', border: 'none' }}
        aria-expanded={isOpen}
      >
        <h3
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 500,
            fontSize: '18px',
            color: isOpen ? '#C9A96E' : '#F5F5F0',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {question}
        </h3>
        <ChevronDown isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              },
              opacity: { duration: 0.25 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-6"
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 300,
                fontSize: '15px',
                color: '#A0A0A0',
                lineHeight: 1.8,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection({ service }: { service: Service }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!service.faq || service.faq.length === 0) return null;

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#141414',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      <div className="container-luxury">
        <SectionTitle
          preTitle="Questions frequentes"
          title="FAQ"
          centered
        />

        <div className="mt-12" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            {service.faq.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION
   ============================================ */
function CtaSection({ service }: { service: Service }) {
  return (
    <section className="section-padding" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container-luxury text-center">
        <ScrollReveal>
          <SectionTitle
            preTitle={service.shortTitle}
            title="Pret a decoller ?"
            subtitle="Contactez-nous pour obtenir un devis personnalise sous 30 minutes. Disponible 24h/24 et 7j/7."
            centered
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/devis" size="lg">
              Demander un devis
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Nous contacter
            </Button>
          </div>
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
