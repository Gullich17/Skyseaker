'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

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
}

const experiences: Experience[] = [
  {
    id: 'gastronomie',
    name: 'Gastronomie',
    tagline: 'Vol + d\u00e9jeuner \u00e9toil\u00e9 \u00e0 Monaco',
    description:
      'Envolez-vous vers la Principaut\u00e9 pour un d\u00e9jeuner dans un restaurant triple \u00e9toil\u00e9 avec vue sur la M\u00e9diterran\u00e9e. Un vol priv\u00e9 conjugu\u00e9 \u00e0 une exp\u00e9rience culinaire inoubliable.',
    duration: '1 journ\u00e9e',
    destination: 'Monaco',
    priceFrom: '\u00e0 partir de 8\u202f900\u00a0\u20ac',
    icon: 'M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 9.75l-3-3m0 0l-3 3m3-3v11.25',
    gradient: 'linear-gradient(135deg, #122838 0%, #132A3A 100%)',
  },
  {
    id: 'ski',
    name: 'Ski',
    tagline: 'Jet priv\u00e9 + transfert h\u00e9lico vers Courchevel',
    description:
      'De la piste de l\u2019a\u00e9roport aux pistes enneig\u00e9es en un clin d\u2019\u0153il. Transfert h\u00e9licopt\u00e8re direct vers l\u2019altiport de Courchevel pour une exp\u00e9rience ski d\u2019exception.',
    duration: '3 \u00e0 7 jours',
    destination: 'Courchevel',
    priceFrom: '\u00e0 partir de 15\u202f500\u00a0\u20ac',
    icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
    gradient: 'linear-gradient(135deg, #101418 0%, #132A3A 100%)',
  },
  {
    id: 'grand-prix',
    name: 'Grand Prix',
    tagline: 'F1 Monaco, acc\u00e8s VIP + vol priv\u00e9',
    description:
      'Vivez le Grand Prix de Monaco comme nulle part ailleurs. Acc\u00e8s paddock VIP, terrasse priv\u00e9e avec vue sur le circuit, et retour en jet priv\u00e9 apr\u00e8s la course.',
    duration: '2 \u00e0 3 jours',
    destination: 'Monaco',
    priceFrom: '\u00e0 partir de 22\u202f000\u00a0\u20ac',
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
    gradient: 'linear-gradient(135deg, #18100a 0%, #132A3A 100%)',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    tagline: 'Retraite bien-\u00eatre \u00e0 Ibiza en jet priv\u00e9',
    description:
      'Un vol priv\u00e9 vers Ibiza suivi d\u2019une retraite bien-\u00eatre exclusive\u00a0: yoga, spa, nutrition holistique et m\u00e9ditation dans un cadre paradisiaque.',
    duration: '4 \u00e0 7 jours',
    destination: 'Ibiza',
    priceFrom: '\u00e0 partir de 12\u202f800\u00a0\u20ac',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    gradient: 'linear-gradient(135deg, #0f1410 0%, #132A3A 100%)',
  },
  {
    id: 'safari',
    name: 'Safari',
    tagline: 'Vol priv\u00e9 + safari de luxe au Kenya',
    description:
      'D\u00e9couvrez la savane africaine dans un confort absolu. Vol priv\u00e9 vers Nairobi, transfert en avion-taxi vers votre lodge de luxe et safari priv\u00e9 avec guide expert.',
    duration: '7 \u00e0 10 jours',
    destination: 'Kenya',
    priceFrom: '\u00e0 partir de 35\u202f000\u00a0\u20ac',
    icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
    gradient: 'linear-gradient(135deg, #141008 0%, #132A3A 100%)',
  },
  {
    id: 'yacht',
    name: 'Yacht',
    tagline: 'Jet priv\u00e9 + yacht en M\u00e9diterran\u00e9e',
    description:
      'L\u2019ultime exp\u00e9rience mer et ciel. Arrivez en jet priv\u00e9 et embarquez directement sur un yacht de luxe pour une croisi\u00e8re priv\u00e9e en M\u00e9diterran\u00e9e.',
    duration: '5 \u00e0 14 jours',
    destination: 'M\u00e9diterran\u00e9e',
    priceFrom: '\u00e0 partir de 28\u202f000\u00a0\u20ac',
    icon: 'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
    gradient: 'linear-gradient(135deg, #0a1018 0%, #132A3A 100%)',
  },
  {
    id: 'golf',
    name: 'Golf',
    tagline: 'Tourn\u00e9e des plus beaux parcours d\u2019Europe',
    description:
      'Un circuit exclusif des greens les plus prestigieux d\u2019Europe. Vol priv\u00e9 entre chaque \u00e9tape, green fees VIP et h\u00e9bergement de luxe.',
    duration: '5 \u00e0 10 jours',
    destination: 'Europe',
    priceFrom: '\u00e0 partir de 18\u202f500\u00a0\u20ac',
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    gradient: 'linear-gradient(135deg, #0e140a 0%, #132A3A 100%)',
  },
  {
    id: 'fashion-week',
    name: 'Fashion Week',
    tagline: 'Paris, Milan, New York en jet priv\u00e9',
    description:
      'Suivez les Fashion Weeks les plus prestigieuses du monde. Vol priv\u00e9 entre chaque capitale de la mode, acc\u00e8s d\u00e9fil\u00e9s et soir\u00e9es exclusives.',
    duration: '10 \u00e0 14 jours',
    destination: 'Paris, Milan, New York',
    priceFrom: '\u00e0 partir de 42\u202f000\u00a0\u20ac',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    gradient: 'linear-gradient(135deg, #140a14 0%, #132A3A 100%)',
  },
];

/* ============================================
   HERO
   ============================================ */

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0E202D 0%, #132A3A 40%, #122838 60%, #0E202D 100%)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.05]"
          style={{
            background:
              'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(14,32,45,0.8) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-[5vw] pt-32 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[12px] uppercase tracking-[0.3em] mb-6"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 500,
            color: '#F4DDC3',
          }}
        >
          Exp\u00e9riences
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[36px] md:text-[56px] lg:text-[68px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}
        >
          Vivez l&apos;extraordinaire
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[18px] md:text-[22px]"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          Des packages exclusifs qui allient vol en jet priv\u00e9 et exp\u00e9riences de
          luxe uniques \u00e0 travers le monde
        </motion.p>
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
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="relative w-full overflow-hidden"
      style={{
        background: experience.gradient,
        border: '1px solid #1A3448',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
        {/* Image side */}
        <div
          className={`relative overflow-hidden ${
            isReversed ? 'lg:order-2' : 'lg:order-1'
          }`}
          style={{ minHeight: '300px' }}
        >
          <div className="absolute inset-0" style={{ background: '#1A3448' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  width="60"
                  height="60"
                  fill="none"
                  stroke="#F4DDC3"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  className="opacity-20 mx-auto mb-3"
                >
                  <path d={experience.icon} />
                </svg>
                <span
                  className="text-[12px] text-[#6B6B6B] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 400,
                  }}
                >
                  [EXP-{experience.id}]
                </span>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                isReversed
                  ? 'linear-gradient(to left, rgba(14,32,45,0.6), transparent)'
                  : 'linear-gradient(to right, rgba(14,32,45,0.6), transparent)',
            }}
            animate={{ opacity: isHovered ? 0.8 : 0.4 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content side */}
        <div
          className={`relative flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
            isReversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center mb-6"
            style={{
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
          <div className="mb-4">
            <Badge>{experience.name}</Badge>
          </div>

          {/* Title */}
          <h3
            className="text-[24px] md:text-[32px] mb-3"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            {experience.tagline}
          </h3>

          {/* Description */}
          <p
            className="text-[15px] md:text-[16px] mb-6 max-w-[480px]"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              color: '#A0A0A0',
              lineHeight: 1.7,
            }}
          >
            {experience.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
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
                className="text-[13px] text-[#A0A0A0]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 400,
                }}
              >
                {experience.duration}
              </span>
            </div>
            <span className="w-[1px] h-4 bg-[#1A3448]" />
            <div className="flex items-center gap-2">
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
                className="text-[13px] text-[#A0A0A0]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 400,
                }}
              >
                {experience.destination}
              </span>
            </div>
            <span className="w-[1px] h-4 bg-[#1A3448]" />
            <span
              className="text-[14px]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 600,
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
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] as [
                number,
                number,
                number,
                number,
              ],
            }}
          >
            <Button
              href={`/experiences/${experience.id}`}
              variant="primary"
              size="sm"
            >
              D\u00e9couvrir
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Gold border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ border: '1px solid #F4DDC3' }}
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
    <section className="section-padding" style={{ background: '#0E202D' }}>
      <div className="px-[5vw]" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle
          preTitle="NOS PACKAGES"
          title="Des exp\u00e9riences d\u2019exception"
          subtitle="Chaque package est con\u00e7u sur mesure pour offrir une exp\u00e9rience compl\u00e8te et inoubliable, du vol priv\u00e9 aux activit\u00e9s exclusives."
          centered
          className="mb-20"
        />

        <div className="space-y-6">
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
      title: 'Choisissez votre exp\u00e9rience',
      desc: 'Parcourez nos packages ou contactez-nous pour une exp\u00e9rience 100\u00a0% sur mesure.',
    },
    {
      num: '02',
      title: 'Personnalisation compl\u00e8te',
      desc: 'Nos experts adaptent chaque d\u00e9tail selon vos pr\u00e9f\u00e9rences\u00a0: dates, h\u00e9bergement, activit\u00e9s.',
    },
    {
      num: '03',
      title: 'Validation et pr\u00e9paration',
      desc: 'Votre conseiller d\u00e9di\u00e9 coordonne l\u2019ensemble de la logistique pour une exp\u00e9rience parfaite.',
    },
    {
      num: '04',
      title: 'Vivez l\u2019extraordinaire',
      desc: 'Profitez de votre exp\u00e9rience exclusive avec une assistance 24/7 tout au long du voyage.',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#132A3A' }}>
      <div className="px-[5vw]" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle
          preTitle="COMMENT \u00c7A MARCHE"
          title="Votre exp\u00e9rience en 4 \u00e9tapes"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="text-center">
                <div
                  className="text-[48px] mb-4"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    color: '#F4DDC3',
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="w-[40px] h-[1px] mx-auto mb-6"
                  style={{ background: 'rgba(244,221,195,0.3)' }}
                />
                <h4
                  className="text-[16px] mb-3"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-[14px]"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
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
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="relative px-[5vw] text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal>
          <h2
            className="text-[32px] md:text-[48px] mb-6"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            Une exp\u00e9rience sur mesure\u00a0?
          </h2>
          <p
            className="text-[18px] md:text-[20px] mb-10 text-[#A0A0A0]"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
            }}
          >
            Nos experts concierges composent l&apos;exp\u00e9rience de vos r\u00eaves,
            sans aucune limite
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/devis" variant="primary" size="lg">
              Cr\u00e9er mon exp\u00e9rience
            </Button>
            <Button href="tel:+33100000000" variant="secondary" size="lg">
              Nous appeler
            </Button>
          </div>
          <p
            className="mt-6 text-[13px] text-[#6B6B6B]"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
            }}
          >
            R\u00e9ponse sous 2 heures &bull; Disponible 24/7
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
