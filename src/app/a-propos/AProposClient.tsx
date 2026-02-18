'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Button from '@/components/ui/Button';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ============================================
   HERO
   ============================================ */

function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/fleet/falcon-8x/main.png"
          alt="Skyseaker aviation privee"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(14,32,45,0.7) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.6) 70%, rgba(14,32,45,0.9) 100%)',
        }}
      />

      {/* Decorative lines */}
      <div
        style={{
          position: 'absolute',
          top: '33%',
          left: 0,
          right: 0,
          height: '1px',
          opacity: 0.05,
          zIndex: 2,
          background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '66%',
          left: 0,
          right: 0,
          height: '1px',
          opacity: 0.03,
          zIndex: 2,
          background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '128px 5vw 80px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            marginBottom: '24px',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 500,
            color: '#F4DDC3',
          }}
        >
          &Agrave; Propos
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            marginBottom: '24px',
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}
        >
          L&apos;excellence depuis le premier jour
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
          }}
        >
          Depuis notre cr&eacute;ation, nous red&eacute;finissons les standards de l&apos;aviation priv&eacute;e avec passion et d&eacute;termination
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   HISTORY / TIMELINE
   ============================================ */

function HistorySection() {
  const milestones = [
    {
      year: '2015',
      title: 'Fondation de Skyseaker',
      desc: "Création de Skyseaker à Paris avec la vision de révolutionner l'aviation privée en France. Nos trois fondateurs, issus de l'aéronautique et du luxe, posent les bases d'un service d'exception.",
    },
    {
      year: '2017',
      title: 'Expansion européenne',
      desc: "Ouverture de bureaux à Genève et Londres. Partenariats avec plus de 200 opérateurs certifiés à travers l'Europe.",
    },
    {
      year: '2019',
      title: 'Certification IS-BAO',
      desc: "Obtention de la certification IS-BAO et adhésion à l'EBAA. Lancement du programme Empty Legs et de la conciergerie de luxe.",
    },
    {
      year: '2021',
      title: 'Innovation technologique',
      desc: "Lancement de notre plateforme de réservation en ligne et de l'application mobile. Intégration de l'IA pour l'optimisation des itinéraires.",
    },
    {
      year: '2023',
      title: 'Engagement RSE',
      desc: 'Mise en place du programme de compensation carbone intégral. Partenariat avec des acteurs du carburant durable (SAF).',
    },
    {
      year: '2025',
      title: '10 000ème vol',
      desc: "Franchissement du cap des 10 000 vols. Expansion vers le Moyen-Orient et l'Asie. Lancement des Expériences Exclusives.",
    },
  ];

  return (
    <section style={{ background: '#0E202D', padding: 'clamp(60px, 8vw, 120px) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <SectionTitle
          preTitle="NOTRE HISTOIRE"
          title="Une décennie d'excellence"
          subtitle="De Paris au reste du monde, chaque année a été une nouvelle étape vers la perfection."
          centered
          mb="80px"
        />

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line - centered on desktop */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(244,221,195,0.2)',
            }}
          />
          {/* Vertical line - left on mobile */}
          <div
            className="md:hidden"
            style={{
              position: 'absolute',
              left: '5px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(244,221,195,0.2)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 5vw, 64px)' }}>
            {milestones.map((ms, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={ms.year}
                  year={ms.year}
                  title={ms.title}
                  description={ms.desc}
                  isLeft={isLeft}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  year,
  title,
  description,
  isLeft,
  index,
}: {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div
        className={`pl-10 md:pl-0 md:w-[calc(50%-40px)] ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        }`}
      >
        <span
          style={{
            fontSize: '14px',
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            color: '#F4DDC3',
          }}
        >
          {year}
        </span>
        <h4
          style={{
            fontSize: '20px',
            marginBottom: '12px',
            fontFamily: 'var(--font-playfair)',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: '14px',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 300,
            color: '#A0A0A0',
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>

      {/* Dot */}
      <div className="absolute left-0 md:left-1/2 top-1 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#F4DDC3',
            boxShadow: '0 0 0 4px #0E202D, 0 0 0 5px rgba(244,221,195,0.3)',
          }}
        />
      </div>

      {/* Spacer for other side */}
      <div className="hidden md:block md:w-[calc(50%-40px)]" />
    </motion.div>
  );
}

/* ============================================
   VALUES
   ============================================ */

function ValuesSection() {
  const values = [
    {
      title: 'Excellence',
      desc: "Chaque détail compte. Nous visons la perfection dans tous les aspects de notre service, de la réservation à l'atterrissage.",
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    },
    {
      title: 'Discrétion',
      desc: 'La confidentialité est au cœur de notre ADN. Vos données, vos itinéraires et votre vie privée sont protégés en toutes circonstances.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    },
    {
      title: 'Innovation',
      desc: 'Nous investissons continuellement dans la technologie pour offrir une expérience de réservation fluide et un service toujours plus performant.',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    },
    {
      title: 'Engagement',
      desc: 'Responsabilité environnementale, sécurité sans compromis et satisfaction client sont les piliers de notre engagement quotidien.',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    },
  ];

  return (
    <section style={{ background: '#132A3A', padding: 'clamp(60px, 8vw, 120px) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <SectionTitle
          preTitle="NOS VALEURS"
          title="Les piliers de notre excellence"
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
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.15} style={{ height: '100%' }}>
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px',
                  background: '#0E202D',
                  border: '1px solid #1A3448',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(244,221,195,0.3)',
                    background: 'rgba(244,221,195,0.05)',
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#F4DDC3"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h4
                  style={{
                    fontSize: '18px',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {v.title}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
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
   TEAM
   ============================================ */

function TeamSection() {
  const team = [
    {
      name: 'Alexandre Dubois',
      role: 'Fondateur & CEO',
      bio: "Ancien pilote de ligne et entrepreneur, Alexandre a fondé Skyseaker avec la vision de démocratiser l'excellence dans l'aviation privée.",
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=75',
    },
    {
      name: 'Camille Laurent',
      role: 'Directrice des Opérations',
      bio: "15 ans d'expérience dans l'aviation d'affaires. Camille supervise chaque vol pour garantir un service irréprochable.",
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=75',
    },
    {
      name: 'Nicolas Mercier',
      role: 'Directeur Commercial',
      bio: 'Spécialiste du luxe et de la relation client, Nicolas veille à ce que chaque client reçoive un accompagnement sur mesure.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=75',
    },
    {
      name: 'Sophie Archambault',
      role: 'Responsable Conciergerie',
      bio: "Ancienne directrice d'hôtel 5 étoiles, Sophie orchestre les expériences exclusives et la conciergerie de luxe Skyseaker.",
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=75',
    },
  ];

  return (
    <section style={{ background: '#0E202D', padding: 'clamp(60px, 8vw, 120px) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <SectionTitle
          preTitle="NOTRE ÉQUIPE"
          title="Les visages de Skyseaker"
          subtitle="Une équipe de passionnés dédiés à votre satisfaction"
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
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                {/* Portrait image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '24px',
                    background: '#1A3448',
                  }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '33%',
                      background: 'linear-gradient(to top, #0E202D, transparent)',
                    }}
                  />
                </div>

                <h4
                  style={{
                    fontSize: '18px',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {member.name}
                </h4>
                <p
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 500,
                    color: '#F4DDC3',
                  }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {member.bio}
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
   KEY FIGURES
   ============================================ */

function KeyFiguresSection() {
  const stats = [
    { value: 15000, suffix: '+', label: 'Vols réalisés' },
    { value: 120000, suffix: '+', label: 'Passagers transportés' },
    { value: 50, suffix: '+', label: 'Destinations' },
    { value: 24, suffix: '/7', label: 'Disponibilité' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px, 8vw, 120px) 0',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: '#132A3A' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            background: 'radial-gradient(circle at 50% 50%, #F4DDC3 0%, transparent 70%)',
          }}
        />
      </div>
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <SectionTitle
          preTitle="CHIFFRES CLÉS"
          title="L'excellence en chiffres"
          centered
          mb="64px"
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                className="px-6 md:px-12"
              />
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: '1px',
                    height: '48px',
                    background: '#F4DDC3',
                    opacity: 0.3,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CERTIFICATIONS
   ============================================ */

function CertificationsSection() {
  const certifications = [
    {
      name: 'EBAA',
      fullName: 'European Business Aviation Association',
      desc: "Membre actif de l'EBAA, garantissant les plus hauts standards de l'aviation d'affaires européenne.",
    },
    {
      name: 'IS-BAO',
      fullName: 'International Standard for Business Aircraft Operations',
      desc: 'Certification internationale assurant le respect des meilleures pratiques en matière de sécurité opérationnelle.',
    },
    {
      name: 'Wyvern',
      fullName: 'Wyvern Wingman Certified',
      desc: 'Tous nos opérateurs partenaires sont audités selon le programme Wyvern Wingman, référence en matière de sécurité.',
    },
  ];

  return (
    <section style={{ background: '#0E202D', padding: 'clamp(60px, 8vw, 120px) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <SectionTitle
          preTitle="CERTIFICATIONS"
          title="Des standards de sécurité inégalés"
          centered
          mb="64px"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '32px',
          }}
        >
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 0.15}>
              <div
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  height: '100%',
                  background: '#132A3A',
                  border: '1px solid #1A3448',
                }}
              >
                {/* Logo placeholder */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(244,221,195,0.2)',
                    background: 'rgba(244,221,195,0.03)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 700,
                      color: '#F4DDC3',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {cert.name}
                  </span>
                </div>
                <h4
                  style={{
                    fontSize: '16px',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {cert.fullName}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {cert.desc}
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
   RSE / CARBON
   ============================================ */

function RSESection() {
  return (
    <section style={{ background: '#132A3A', padding: 'clamp(60px, 8vw, 120px) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Image */}
          <ScrollReveal>
            <div
              style={{
                aspectRatio: '4 / 3',
                position: 'relative',
                overflow: 'hidden',
                background: '#1A3448',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=75"
                alt="Engagement environnemental Skyseaker"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <SectionTitle
              preTitle="RESPONSABILITÉ ENVIRONNEMENTALE"
              title="Notre engagement pour la planète"
              mb="32px"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <ScrollReveal delay={0.1}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(244,221,195,0.3)',
                      background: 'rgba(244,221,195,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '16px',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      Compensation carbone int&eacute;grale
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                        color: '#A0A0A0',
                        lineHeight: 1.7,
                      }}
                    >
                      100&nbsp;% des &eacute;missions de CO&#x2082; de chaque vol sont compens&eacute;es via des projets certifi&eacute;s de reforestation et d&apos;&eacute;nergie renouvelable.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(244,221,195,0.3)',
                      background: 'rgba(244,221,195,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '16px',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      Carburant durable (SAF)
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                        color: '#A0A0A0',
                        lineHeight: 1.7,
                      }}
                    >
                      Nous proposons l&apos;option SAF (Sustainable Aviation Fuel) sur un nombre croissant de nos vols, r&eacute;duisant jusqu&apos;&agrave; 80&nbsp;% les &eacute;missions nettes.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(244,221,195,0.3)',
                      background: 'rgba(244,221,195,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '16px',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      Optimisation des itin&eacute;raires
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                        color: '#A0A0A0',
                        lineHeight: 1.7,
                      }}
                    >
                      Notre technologie d&apos;IA optimise chaque trajet pour r&eacute;duire la consommation de carburant et minimiser l&apos;empreinte environnementale.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA
   ============================================ */

function CTASection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 5vw',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              marginBottom: '24px',
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            Rejoignez l&apos;excellence Skyseaker
          </h2>
          <p
            style={{
              fontSize: 'clamp(18px, 2.2vw, 20px)',
              marginBottom: '40px',
              color: '#A0A0A0',
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
            }}
          >
            D&eacute;couvrez ce que signifie voyager sans compromis
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
   PAGE CLIENT
   ============================================ */

export default function AProposClient() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
      <KeyFiguresSection />
      <CertificationsSection />
      <RSESection />
      <CTASection />
    </>
  );
}
