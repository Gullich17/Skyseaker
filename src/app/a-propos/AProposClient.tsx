'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Button from '@/components/ui/Button';

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
              'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1510 60%, #0A0A0A 100%)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.05]"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
        <div
          className="absolute top-2/3 left-0 right-0 h-[1px] opacity-[0.03]"
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
            color: '#C9A96E',
          }}
        >
          \u00c0 Propos
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
            color: '#F5F5F0',
            lineHeight: 1.1,
          }}
        >
          L&apos;excellence depuis le premier jour
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
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
          }}
        >
          Depuis notre cr\u00e9ation, nous red\u00e9finissons les standards de l&apos;aviation priv\u00e9e avec passion et d\u00e9termination
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
      desc: 'Cr\u00e9ation de Skyseaker \u00e0 Paris avec la vision de r\u00e9volutionner l\u2019aviation priv\u00e9e en France. Nos trois fondateurs, issus de l\u2019a\u00e9ronautique et du luxe, posent les bases d\u2019un service d\u2019exception.',
    },
    {
      year: '2017',
      title: 'Expansion europ\u00e9enne',
      desc: 'Ouverture de bureaux \u00e0 Gen\u00e8ve et Londres. Partenariats avec plus de 200 op\u00e9rateurs certifi\u00e9s \u00e0 travers l\u2019Europe.',
    },
    {
      year: '2019',
      title: 'Certification IS-BAO',
      desc: 'Obtention de la certification IS-BAO et adh\u00e9sion \u00e0 l\u2019EBAA. Lancement du programme Empty Legs et de la conciergerie de luxe.',
    },
    {
      year: '2021',
      title: 'Innovation technologique',
      desc: 'Lancement de notre plateforme de r\u00e9servation en ligne et de l\u2019application mobile. Int\u00e9gration de l\u2019IA pour l\u2019optimisation des itin\u00e9raires.',
    },
    {
      year: '2023',
      title: 'Engagement RSE',
      desc: 'Mise en place du programme de compensation carbone int\u00e9gral. Partenariat avec des acteurs du carburant durable (SAF).',
    },
    {
      year: '2025',
      title: '10\u202f000\u00e8me vol',
      desc: 'Franchissement du cap des 10\u202f000 vols. Expansion vers le Moyen-Orient et l\u2019Asie. Lancement des Exp\u00e9riences Exclusives.',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#0A0A0A' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="NOTRE HISTOIRE"
          title="Une d\u00e9cennie d\u2019excellence"
          subtitle="De Paris au reste du monde, chaque ann\u00e9e a \u00e9t\u00e9 une nouvelle \u00e9tape vers la perfection."
          centered
          className="mb-20"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px]"
            style={{ background: 'rgba(201,169,110,0.2)' }}
          />

          <div className="space-y-12 md:space-y-16">
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
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        }`}
      >
        <span
          className="text-[14px] block mb-2"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            color: '#C9A96E',
          }}
        >
          {year}
        </span>
        <h4
          className="text-[20px] mb-3"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 600,
            color: '#F5F5F0',
          }}
        >
          {title}
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
          {description}
        </p>
      </div>

      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="w-3 h-3 rounded-full"
          style={{
            background: '#C9A96E',
            boxShadow: '0 0 0 4px #0A0A0A, 0 0 0 5px rgba(201,169,110,0.3)',
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
      desc: 'Chaque d\u00e9tail compte. Nous visons la perfection dans tous les aspects de notre service, de la r\u00e9servation \u00e0 l\u2019atterrissage.',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    },
    {
      title: 'Discr\u00e9tion',
      desc: 'La confidentialit\u00e9 est au c\u0153ur de notre ADN. Vos donn\u00e9es, vos itin\u00e9raires et votre vie priv\u00e9e sont prot\u00e9g\u00e9s en toutes circonstances.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    },
    {
      title: 'Innovation',
      desc: 'Nous investissons continuellement dans la technologie pour offrir une exp\u00e9rience de r\u00e9servation fluide et un service toujours plus performant.',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    },
    {
      title: 'Engagement',
      desc: 'Responsabilit\u00e9 environnementale, s\u00e9curit\u00e9 sans compromis et satisfaction client sont les piliers de notre engagement quotidien.',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#141414' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="NOS VALEURS"
          title="Les piliers de notre excellence"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.15}>
              <div className="text-center p-8" style={{ background: '#0A0A0A', border: '1px solid #1E1E1E' }}>
                <div
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(201,169,110,0.3)',
                    background: 'rgba(201,169,110,0.05)',
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h4
                  className="text-[18px] mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#F5F5F0',
                  }}
                >
                  {v.title}
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
      bio: 'Ancien pilote de ligne et entrepreneur, Alexandre a fond\u00e9 Skyseaker avec la vision de d\u00e9mocratiser l\u2019excellence dans l\u2019aviation priv\u00e9e.',
    },
    {
      name: 'Camille Laurent',
      role: 'Directrice des Op\u00e9rations',
      bio: '15 ans d\u2019exp\u00e9rience dans l\u2019aviation d\u2019affaires. Camille supervise chaque vol pour garantir un service irr\u00e9prochable.',
    },
    {
      name: 'Nicolas Mercier',
      role: 'Directeur Commercial',
      bio: 'Sp\u00e9cialiste du luxe et de la relation client, Nicolas veille \u00e0 ce que chaque client re\u00e7oive un accompagnement sur mesure.',
    },
    {
      name: 'Sophie Archambault',
      role: 'Responsable Conciergerie',
      bio: 'Ancienne directrice d\u2019h\u00f4tel 5 \u00e9toiles, Sophie orchestre les exp\u00e9riences exclusives et la conciergerie de luxe Skyseaker.',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#0A0A0A' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="NOTRE \u00c9QUIPE"
          title="Les visages de Skyseaker"
          subtitle="Une \u00e9quipe de passionn\u00e9s d\u00e9di\u00e9s \u00e0 votre satisfaction"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="text-center">
                {/* Portrait placeholder */}
                <div
                  className="w-full aspect-[3/4] relative overflow-hidden mb-6"
                  style={{ background: '#1E1E1E' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        width="48"
                        height="48"
                        fill="none"
                        stroke="#C9A96E"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                        className="opacity-20 mx-auto mb-2"
                      >
                        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span
                        className="text-[11px] text-[#6B6B6B] uppercase tracking-[0.1em]"
                        style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}
                      >
                        [PORTRAIT]
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3"
                    style={{
                      background: 'linear-gradient(to top, #0A0A0A, transparent)',
                    }}
                  />
                </div>

                <h4
                  className="text-[18px] mb-1"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#F5F5F0',
                  }}
                >
                  {member.name}
                </h4>
                <p
                  className="text-[12px] uppercase tracking-[0.15em] mb-4"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 500,
                    color: '#C9A96E',
                  }}
                >
                  {member.role}
                </p>
                <p
                  className="text-[14px]"
                  style={{
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
    { value: 15000, suffix: '+', label: 'Vols r\u00e9alis\u00e9s' },
    { value: 120000, suffix: '+', label: 'Passagers transport\u00e9s' },
    { value: 50, suffix: '+', label: 'Destinations' },
    { value: 24, suffix: '/7', label: 'Disponibilit\u00e9' },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#141414' }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #C9A96E 0%, transparent 70%)',
          }}
        />
      </div>
      <div className="relative px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="CHIFFRES CL\u00c9S"
          title="L\u2019excellence en chiffres"
          centered
          className="mb-16"
        />

        <div className="flex flex-wrap justify-center gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                className="px-6 md:px-12"
              />
              {i < stats.length - 1 && (
                <div className="hidden md:block w-[1px] h-12 bg-[#C9A96E] opacity-30" />
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
      desc: 'Membre actif de l\u2019EBAA, garantissant les plus hauts standards de l\u2019aviation d\u2019affaires europ\u00e9enne.',
    },
    {
      name: 'IS-BAO',
      fullName: 'International Standard for Business Aircraft Operations',
      desc: 'Certification internationale assurant le respect des meilleures pratiques en mati\u00e8re de s\u00e9curit\u00e9 op\u00e9rationnelle.',
    },
    {
      name: 'Wyvern',
      fullName: 'Wyvern Wingman Certified',
      desc: 'Tous nos op\u00e9rateurs partenaires sont audit\u00e9s selon le programme Wyvern Wingman, r\u00e9f\u00e9rence en mati\u00e8re de s\u00e9curit\u00e9.',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#0A0A0A' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="CERTIFICATIONS"
          title="Des standards de s\u00e9curit\u00e9 inégal\u00e9s"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 0.15}>
              <div
                className="p-8 text-center h-full"
                style={{ background: '#141414', border: '1px solid #1E1E1E' }}
              >
                {/* Logo placeholder */}
                <div
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(201,169,110,0.2)',
                    background: 'rgba(201,169,110,0.03)',
                  }}
                >
                  <span
                    className="text-[16px]"
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 700,
                      color: '#C9A96E',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {cert.name}
                  </span>
                </div>
                <h4
                  className="text-[16px] mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    color: '#F5F5F0',
                  }}
                >
                  {cert.fullName}
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
    <section className="section-padding" style={{ background: '#141414' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <ScrollReveal>
            <div
              className="aspect-[4/3] relative overflow-hidden"
              style={{ background: '#1E1E1E' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="opacity-20 mx-auto mb-2"
                  >
                    <path d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.692-.8 1.26l.13.783c.12.725-.166 1.456-.75 1.893M12.75 3.031l-.143.033m7.83 14.003L18.868 18.5m0 0l-1.118-.775M3.888 15.903l.456 1.369" />
                  </svg>
                  <span
                    className="text-[11px] text-[#6B6B6B] uppercase tracking-[0.1em]"
                    style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}
                  >
                    [RSE-IMAGE]
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <SectionTitle
              preTitle="RESPONSABILIT\u00c9 ENVIRONNEMENTALE"
              title="Notre engagement pour la plan\u00e8te"
              className="mb-8"
            />

            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center"
                    style={{
                      border: '1px solid rgba(201,169,110,0.3)',
                      background: 'rgba(201,169,110,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="text-[16px] mb-2"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: '#F5F5F0' }}
                    >
                      Compensation carbone int\u00e9grale
                    </h4>
                    <p
                      className="text-[14px]"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, color: '#A0A0A0', lineHeight: 1.7 }}
                    >
                      100\u00a0% des \u00e9missions de CO\u2082 de chaque vol sont compens\u00e9es via des projets certifi\u00e9s de reforestation et d&apos;\u00e9nergie renouvelable.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center"
                    style={{
                      border: '1px solid rgba(201,169,110,0.3)',
                      background: 'rgba(201,169,110,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="text-[16px] mb-2"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: '#F5F5F0' }}
                    >
                      Carburant durable (SAF)
                    </h4>
                    <p
                      className="text-[14px]"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, color: '#A0A0A0', lineHeight: 1.7 }}
                    >
                      Nous proposons l&apos;option SAF (Sustainable Aviation Fuel) sur un nombre croissant de nos vols, r\u00e9duisant jusqu&apos;\u00e0 80\u00a0% les \u00e9missions nettes.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center"
                    style={{
                      border: '1px solid rgba(201,169,110,0.3)',
                      background: 'rgba(201,169,110,0.05)',
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="text-[16px] mb-2"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: '#F5F5F0' }}
                    >
                      Optimisation des itin\u00e9raires
                    </h4>
                    <p
                      className="text-[14px]"
                      style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, color: '#A0A0A0', lineHeight: 1.7 }}
                    >
                      Notre technologie d&apos;IA optimise chaque trajet pour r\u00e9duire la consommation de carburant et minimiser l&apos;empreinte environnementale.
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
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #0A0A0A 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="relative px-[5vw] text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2
            className="text-[32px] md:text-[48px] mb-6"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: '#F5F5F0',
            }}
          >
            Rejoignez l&apos;excellence Skyseaker
          </h2>
          <p
            className="text-[18px] md:text-[20px] mb-10 text-[#A0A0A0]"
            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
          >
            D\u00e9couvrez ce que signifie voyager sans compromis
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
