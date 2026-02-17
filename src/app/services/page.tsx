import type { Metadata } from 'next';
import { services } from '@/data/services';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    'Skyseaker propose des solutions completes pour votre aviation privee : affretement, vols a vide, voyages de groupe, fret urgent, conciergerie, transferts VIP, gestion d\'appareil et achat-vente de jets.',
  openGraph: {
    title: 'Nos Services — Skyseaker Aviation Privee',
    description:
      'Des solutions completes pour votre aviation privee. Decouvrez nos 8 services premium.',
    url: 'https://skyseaker.com/services',
  },
  alternates: {
    canonical: 'https://skyseaker.com/services',
  },
};

/* ============================================
   ICON MAPPING
   ============================================ */
function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    plane: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
    tag: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    package: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    concierge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91-.74L12 2z" />
        <path d="M2 18h20v2H2z" />
        <path d="M4 18v-4a8 8 0 0116 0v4" />
      </svg>
    ),
    car: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a1 1 0 00-.9.55l-2.2 4.4A1 1 0 002 12.3V16h3" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    handshake: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.64l7.64-7.64.78-.77a5.4 5.4 0 000-7.65z" />
      </svg>
    ),
  };

  return iconMap[icon] || iconMap.plane;
}

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      {/* Background */}
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
            background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
        <div
          className="absolute top-2/3 left-0 right-0 h-[1px] opacity-[0.03]"
          style={{
            background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(14,32,45,0.8) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-[5vw] pt-40 pb-20 text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#F4DDC3',
          }}
        >
          Skyseaker
        </p>
        <h1
          className="text-[36px] md:text-[56px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
          }}
        >
          NOS SERVICES
        </h1>
        <p
          className="text-[18px] md:text-[22px]"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            color: '#A0A0A0',
            lineHeight: 1.6,
          }}
        >
          Des solutions completes pour votre aviation privee
        </p>

        {/* Decorative line */}
        <div
          className="mx-auto mt-8"
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
      </div>
    </section>
  );
}

/* ============================================
   SERVICE ROW
   ============================================ */
function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <ScrollReveal delay={0.1}>
      <div
        className={`flex flex-col ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } gap-8 lg:gap-16 items-center`}
      >
        {/* Image placeholder */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '16 / 10',
              backgroundColor: '#132A3A',
              border: '1px solid #1A3448',
            }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(244,221,195,0.08) 0%, transparent 50%, rgba(14,32,45,0.4) 100%)',
              }}
            />
            {/* Icon centered */}
            <div className="absolute inset-0 flex items-center justify-center z-[2]">
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  border: '1px solid rgba(244,221,195,0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F4DDC3',
                }}
              >
                <ServiceIcon
                  icon={service.icon}
                  className="w-10 h-10"
                />
              </div>
            </div>
            {/* Decorative corner lines */}
            <div
              className="absolute top-4 left-4 w-8 h-8 z-[2]"
              style={{
                borderTop: '1px solid rgba(244,221,195,0.3)',
                borderLeft: '1px solid rgba(244,221,195,0.3)',
              }}
            />
            <div
              className="absolute bottom-4 right-4 w-8 h-8 z-[2]"
              style={{
                borderBottom: '1px solid rgba(244,221,195,0.3)',
                borderRight: '1px solid rgba(244,221,195,0.3)',
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2">
          {/* Number badge */}
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#F4DDC3',
            }}
          >
            0{index + 1} &mdash; {service.shortTitle}
          </p>

          <h2
            className="text-[24px] md:text-[34px] mb-4"
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            {service.title}
          </h2>

          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              color: '#A0A0A0',
              lineHeight: 1.8,
            }}
          >
            {service.shortDescription}
          </p>

          {/* Advantages preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {service.advantages.slice(0, 4).map((adv, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="mt-1 flex-shrink-0"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#F4DDC3',
                    borderRadius: '50%',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#FFFFFF',
                    lineHeight: 1.5,
                  }}
                >
                  {adv.title}
                </span>
              </div>
            ))}
          </div>

          <Button href={`/services/${service.slug}`} size="md">
            En savoir plus
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ============================================
   SERVICES LISTING SECTION
   ============================================ */
function ServicesListingSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#0E202D' }}>
      <div className="container-luxury">
        <div className="space-y-24 lg:space-y-32">
          {services.map((service, index) => (
            <div key={service.id}>
              <ServiceRow service={service} index={index} />
              {index < services.length - 1 && (
                <div
                  className="mt-24 lg:mt-32 mx-auto"
                  style={{
                    width: '200px',
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent, rgba(244,221,195,0.3), transparent)',
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
   CTA SECTION
   ============================================ */
function CtaSection() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#132A3A',
        borderTop: '1px solid rgba(244,221,195,0.1)',
        borderBottom: '1px solid rgba(244,221,195,0.1)',
      }}
    >
      <div className="container-luxury text-center">
        <ScrollReveal>
          <SectionTitle
            preTitle="A votre service"
            title="Un projet ? Une question ?"
            subtitle="Notre equipe de conseillers est disponible 24h/24 et 7j/7 pour repondre a toutes vos demandes."
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
   PAGE EXPORT
   ============================================ */
export default function ServicesPage() {
  return (
    <>
      <HeroSection />
      <ServicesListingSection />
      <CtaSection />
    </>
  );
}
