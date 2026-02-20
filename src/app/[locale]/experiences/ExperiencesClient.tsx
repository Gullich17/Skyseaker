'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

/* ============================================
   CONSTANTS & HOOKS
   ============================================ */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

/* ============================================
   DATA
   ============================================ */

interface Experience {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  destination: string;
  priceFrom: string;
  icon: string;
  gradient: string;
  image: string;
}

const experiences: Experience[] = [
  {
    id: 'gastronomie',
    name: 'Gastronomy',
    tagline: 'Flight + Michelin-starred lunch in Monaco',
    description:
      'Fly to the Principality for lunch at a triple Michelin-starred restaurant overlooking the Mediterranean. A private flight paired with an unforgettable culinary experience.',
    duration: '1 day',
    destination: 'Monaco',
    priceFrom: 'from \u20ac8,900',
    icon: 'M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 9.75l-3-3m0 0l-3 3m3-3v11.25',
    gradient: 'linear-gradient(135deg, #122838 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75',
  },
  {
    id: 'ski',
    name: 'Ski',
    tagline: 'Private jet + helicopter transfer to Courchevel',
    description:
      'From the airport runway to the snow-covered slopes in the blink of an eye. Direct helicopter transfer to the Courchevel altiport for an exceptional ski experience.',
    duration: '3 to 7 days',
    destination: 'Courchevel',
    priceFrom: 'from \u20ac15,500',
    icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
    gradient: 'linear-gradient(135deg, #101418 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=75',
  },
  {
    id: 'grand-prix',
    name: 'Grand Prix',
    tagline: 'F1 Monaco, VIP access + private flight',
    description:
      'Experience the Monaco Grand Prix like nowhere else. VIP paddock access, private terrace overlooking the circuit, and return by private jet after the race.',
    duration: '2 to 3 days',
    destination: 'Monaco',
    priceFrom: 'from \u20ac22,000',
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
    gradient: 'linear-gradient(135deg, #18100a 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=800&q=75',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    tagline: 'Wellness retreat in Ibiza by private jet',
    description:
      'A private flight to Ibiza followed by an exclusive wellness retreat: yoga, spa, holistic nutrition and meditation in a paradise setting.',
    duration: '4 to 7 days',
    destination: 'Ibiza',
    priceFrom: 'from \u20ac12,800',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    gradient: 'linear-gradient(135deg, #0f1410 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=75',
  },
  {
    id: 'safari',
    name: 'Safari',
    tagline: 'Private flight + luxury safari in Kenya',
    description:
      'Discover the African savanna in absolute comfort. Private flight to Nairobi, bush plane transfer to your luxury lodge and private safari with an expert guide.',
    duration: '7 to 10 days',
    destination: 'Kenya',
    priceFrom: 'from \u20ac35,000',
    icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
    gradient: 'linear-gradient(135deg, #141008 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=75',
  },
  {
    id: 'yacht',
    name: 'Yacht',
    tagline: 'Private jet + yacht in the Mediterranean',
    description:
      'The ultimate sea and sky experience. Arrive by private jet and board directly onto a luxury yacht for a private Mediterranean cruise.',
    duration: '5 to 14 days',
    destination: 'Mediterranean',
    priceFrom: 'from \u20ac28,000',
    icon: 'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
    gradient: 'linear-gradient(135deg, #0a1018 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=75',
  },
  {
    id: 'golf',
    name: 'Golf',
    tagline: 'Tour of Europe\'s finest courses',
    description:
      'An exclusive tour of Europe\'s most prestigious greens. Private flight between each stop, VIP green fees and luxury accommodation.',
    duration: '5 to 10 days',
    destination: 'Europe',
    priceFrom: 'from \u20ac18,500',
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    gradient: 'linear-gradient(135deg, #0e140a 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=75',
  },
  {
    id: 'fashion-week',
    name: 'Fashion Week',
    tagline: 'Paris, Milan, New York by private jet',
    description:
      'Follow the world\'s most prestigious Fashion Weeks. Private flight between each fashion capital, runway access and exclusive parties.',
    duration: '10 to 14 days',
    destination: 'Paris, Milan, New York',
    priceFrom: 'from \u20ac42,000',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    gradient: 'linear-gradient(135deg, #140a14 0%, #132A3A 100%)',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=75',
  },
];

/* ============================================
   HERO
   ============================================ */

function HeroSection() {
  const t = useTranslations('experiences');
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Luxury experience"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(14,32,45,0.7) 0%, rgba(14,32,45,0.5) 40%, rgba(14,32,45,0.85) 100%)',
        }}
      />

      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          top: '33%',
          left: 0,
          right: 0,
          height: '1px',
          opacity: 0.08,
          zIndex: 2,
          background:
            'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '160px 5vw 80px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            marginBottom: '24px',
            color: '#F4DDC3',
          }}
        >
          {t('hero.preTitle')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '24px',
            fontSize: 'clamp(36px, 6vw, 68px)',
          }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
          }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 400,
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(244,221,195,0.5)',
            }}
          >
            {t('card.discoverExperience')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '30px',
              background:
                'linear-gradient(to bottom, rgba(244,221,195,0.5), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   EXPERIENCE CARD
   ============================================ */

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const t = useTranslations('experiences');
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: experience.gradient,
        border: '1px solid #1A3448',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
          minHeight: isDesktop ? '500px' : '400px',
        }}
      >
        {/* Image side */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '300px',
            order: isDesktop && isReversed ? 2 : 1,
          }}
        >
          <Image
            src={experience.image}
            alt={experience.tagline}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: isReversed
                ? 'linear-gradient(to left, rgba(14,32,45,0.6), transparent)'
                : 'linear-gradient(to right, rgba(14,32,45,0.6), transparent)',
            }}
            animate={{ opacity: isHovered ? 0.8 : 0.4 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content side */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(32px, 4vw, 64px)',
            order: isDesktop && isReversed ? 1 : 2,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              border: '1px solid rgba(244,221,195,0.3)',
              background: 'rgba(244,221,195,0.05)',
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#F4DDC3"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d={experience.icon} />
            </svg>
          </div>

          {/* Category badge */}
          <div style={{ marginBottom: '16px' }}>
            <Badge>{experience.name}</Badge>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '12px',
              fontSize: 'clamp(24px, 3vw, 32px)',
            }}
          >
            {experience.tagline}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              color: '#A0A0A0',
              lineHeight: 1.7,
              marginBottom: '24px',
              maxWidth: '480px',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
            }}
          >
            {experience.description}
          </p>

          {/* Meta info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#F4DDC3"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {experience.duration}
              </span>
            </div>
            <span
              style={{
                width: '1px',
                height: '16px',
                background: '#1A3448',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#F4DDC3"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {experience.destination}
              </span>
            </div>
            <span
              style={{
                width: '1px',
                height: '16px',
                background: '#1A3448',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 600,
                fontSize: '14px',
                color: '#F4DDC3',
              }}
            >
              {experience.priceFrom}
            </span>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0.7, y: 5 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 5,
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Button
              href={`/experiences/${experience.id}`}
              variant="primary"
              size="sm"
            >
              {t('card.discoverExperience')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Gold border on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          border: '1px solid #F4DDC3',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
      />

    </motion.div>
  );
}

/* ============================================
   EXPERIENCES GRID
   ============================================ */

function ExperiencesGrid() {
  return (
    <section
      style={{
        background: '#0E202D',
        padding: 'clamp(60px, 8vw, 120px) 0',
      }}
    >
      <div
        style={{
          padding: '0 5vw',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <SectionTitle
          preTitle="OUR PACKAGES"
          title="Exceptional experiences"
          subtitle="Each package is tailor-made to deliver a complete and unforgettable experience, from the private flight to the exclusive activities."
          centered
          mb="80px"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   HOW IT WORKS
   ============================================ */

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose your experience',
      desc: 'Browse our packages or contact us for a fully bespoke experience.',
    },
    {
      num: '02',
      title: 'Full customisation',
      desc: 'Our experts tailor every detail to your preferences: dates, accommodation, activities.',
    },
    {
      num: '03',
      title: 'Confirmation and preparation',
      desc: 'Your dedicated advisor coordinates all logistics for a flawless experience.',
    },
    {
      num: '04',
      title: 'Experience the extraordinary',
      desc: 'Enjoy your exclusive experience with 24/7 assistance throughout your journey.',
    },
  ];

  return (
    <section
      style={{
        background: '#132A3A',
        padding: 'clamp(60px, 8vw, 120px) 0',
      }}
    >
      <div
        style={{
          padding: '0 5vw',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <SectionTitle
          preTitle="HOW IT WORKS"
          title="Your experience in 4 steps"
          centered
          mb="64px"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '32px',
          }}
        >
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '48px',
                    color: '#F4DDC3',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    margin: '0 auto 24px',
                    background: 'rgba(244,221,195,0.3)',
                  }}
                />
                <h4
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF',
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
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
   CTA SECTION
   ============================================ */

function CTASection() {
  const t = useTranslations('experiences');
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 128px) 0',
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
          padding: '0 5vw',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '24px',
              fontSize: 'clamp(32px, 5vw, 48px)',
            }}
          >
            {t('cta.title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#A0A0A0',
              marginBottom: '40px',
              fontSize: 'clamp(18px, 2.5vw, 20px)',
            }}
          >
            {t('cta.subtitle')}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <Button href="/devis" variant="primary" size="lg">
              {t('cta.primaryButton')}
            </Button>
            <Button href="tel:+33676765511" variant="secondary" size="lg">
              {t('cta.secondaryButton')}
            </Button>
          </div>
          <p
            style={{
              marginTop: '24px',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: '13px',
              color: '#6B6B6B',
            }}
          >
            Response within 2 hours &bull; Available 24/7
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   PAGE CLIENT
   ============================================ */

export default function ExperiencesClient() {
  return (
    <>
      <HeroSection />
      <ExperiencesGrid />
      <HowItWorks />
      <CTASection />
    </>
  );
}
