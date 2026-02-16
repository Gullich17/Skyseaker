'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { emptyLegs, type EmptyLeg } from '@/data/emptyLegs';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

/* ============================================
   ICONS
   ============================================ */
function PlaneIcon() {
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
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </svg>
  );
}

function ArrowRightIcon() {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CalendarIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UsersIcon() {
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
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A96E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

/* ============================================
   SHARED STYLES
   ============================================ */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#0A0A0A',
  border: '1px solid #1E1E1E',
  color: '#F5F5F0',
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 500,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#A0A0A0',
  marginBottom: '8px',
  display: 'block',
};

/* ============================================
   PRICE FORMATTER
   ============================================ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/* ============================================
   UNIQUE CATEGORIES
   ============================================ */
const categories = Array.from(
  new Set(emptyLegs.map((el) => el.category))
).sort();

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '60vh' }}
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
            background:
              'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
        <div
          className="absolute top-2/3 left-0 right-0 h-[1px] opacity-[0.03]"
          style={{
            background:
              'linear-gradient(90deg, transparent, #C9A96E, transparent)',
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

      <div className="relative z-10 w-full px-[5vw] pt-40 pb-20 text-center" style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
          Skyseaker
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-[36px] md:text-[56px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 700,
            color: '#F5F5F0',
            lineHeight: 1.15,
          }}
        >
          VOLS A VIDE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-[22px] md:text-[28px] mb-4"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            color: '#D4B978',
            lineHeight: 1.4,
          }}
        >
          Jusqu&apos;a -75% sur votre jet prive
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-[16px] md:text-[18px]"
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 300,
            color: '#A0A0A0',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Profitez des repositionnements d&apos;appareils pour voyager en jet prive
          a des tarifs exceptionnels.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="mx-auto mt-8"
          style={{
            width: '80px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
      </div>
    </section>
  );
}

/* ============================================
   EXPLANATION SECTION
   ============================================ */
function ExplanationSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container-luxury">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
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
                    fontFamily:
                      'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#C9A96E',
                  }}
                >
                  Qu&apos;est-ce qu&apos;un empty leg ?
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily:
                      'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#A0A0A0',
                    lineHeight: 1.9,
                    marginBottom: '20px',
                  }}
                >
                  Un empty leg, ou vol a vide, correspond au repositionnement
                  d&apos;un jet prive qui doit rejoindre sa prochaine mission ou
                  retourner a sa base sans passager a bord. Plutot que de laisser
                  cet appareil voler a vide, nous vous proposons d&apos;en profiter
                  a un tarif considerablement reduit.
                </p>
                <p
                  style={{
                    fontFamily:
                      'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#A0A0A0',
                    lineHeight: 1.9,
                  }}
                >
                  Vous beneficiez exactement du meme niveau de service, de confort
                  et de securite qu&apos;un affretement classique, avec des economies
                  pouvant atteindre 75%. Les dates et horaires sont generalement
                  fixes, mais la qualite de l&apos;experience reste identique.
                  C&apos;est l&apos;opportunite ideale pour decouvrir l&apos;aviation privee
                  ou voyager regulierement a moindre cout.
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
   FILTER SECTION + LISTING
   ============================================ */
function FilterAndListingSection() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const filteredLegs = useMemo(() => {
    return emptyLegs.filter((leg) => {
      if (
        departure &&
        !leg.departure.toLowerCase().includes(departure.toLowerCase())
      ) {
        return false;
      }
      if (
        arrival &&
        !leg.arrival.toLowerCase().includes(arrival.toLowerCase())
      ) {
        return false;
      }
      if (dateFrom && leg.date < dateFrom) {
        return false;
      }
      if (dateTo && leg.date > dateTo) {
        return false;
      }
      if (category && leg.category !== category) {
        return false;
      }
      if (maxBudget && leg.emptyLegPrice > Number(maxBudget)) {
        return false;
      }
      return true;
    });
  }, [departure, arrival, dateFrom, dateTo, category, maxBudget]);

  const resetFilters = () => {
    setDeparture('');
    setArrival('');
    setDateFrom('');
    setDateTo('');
    setCategory('');
    setMaxBudget('');
  };

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
          preTitle="Offres disponibles"
          title="Trouvez votre vol a vide"
          subtitle="Filtrez parmi nos empty legs disponibles et reservez au meilleur prix."
          centered
        />

        {/* Filters */}
        <ScrollReveal>
          <div
            className="mt-12 p-6 md:p-8"
            style={{
              backgroundColor: '#0A0A0A',
              border: '1px solid #1E1E1E',
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FilterIcon />
              <p
                style={{
                  fontFamily:
                    'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#C9A96E',
                }}
              >
                Filtrer les resultats
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Departure */}
              <div>
                <label style={labelStyle}>Depart</label>
                <input
                  type="text"
                  placeholder="Ville de depart"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                />
              </div>

              {/* Arrival */}
              <div>
                <label style={labelStyle}>Arrivee</label>
                <input
                  type="text"
                  placeholder="Ville d'arrivee"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                />
              </div>

              {/* Date from */}
              <div>
                <label style={labelStyle}>Date debut</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                />
              </div>

              {/* Date to */}
              <div>
                <label style={labelStyle}>Date fin</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Categorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A0A0A0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                >
                  <option value="">Toutes</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max budget */}
              <div>
                <label style={labelStyle}>Budget max</label>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  style={inputStyle}
                  min={0}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C9A96E';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1E1E1E';
                  }}
                />
              </div>
            </div>

            {/* Reset */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="cursor-pointer"
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily:
                    'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  color: '#6B6B6B',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Reinitialiser les filtres
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="mt-8 mb-6">
          <p
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#6B6B6B',
            }}
          >
            {filteredLegs.length} vol{filteredLegs.length !== 1 ? 's' : ''}{' '}
            disponible{filteredLegs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Empty legs listing */}
        <div className="space-y-4">
          {filteredLegs.length === 0 ? (
            <ScrollReveal>
              <div
                className="py-20 text-center"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #1E1E1E',
                }}
              >
                <SearchIcon />
                <p
                  className="mt-4"
                  style={{
                    fontFamily:
                      'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 500,
                    fontSize: '20px',
                    color: '#F5F5F0',
                  }}
                >
                  Aucun vol disponible
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily:
                      'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#6B6B6B',
                  }}
                >
                  Modifiez vos criteres de recherche ou creez une alerte pour
                  etre notifie.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            filteredLegs.map((leg, index) => (
              <ScrollReveal key={leg.id} delay={index * 0.05}>
                <EmptyLegCard leg={leg} />
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   EMPTY LEG CARD
   ============================================ */
function EmptyLegCard({ leg }: { leg: EmptyLeg }) {
  return (
    <motion.div
      className="p-6 md:p-8"
      style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1E1E1E',
        transition: 'border-color 0.3s ease',
      }}
      whileHover={{
        scale: 1.005,
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          'rgba(201,169,110,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#1E1E1E';
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        {/* Route */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div>
              <p
                style={{
                  fontFamily:
                    'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#F5F5F0',
                  lineHeight: 1.2,
                }}
              >
                {leg.departure}
              </p>
              <p
                style={{
                  fontFamily:
                    'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.1em',
                }}
              >
                {leg.departureCode}
              </p>
            </div>

            <ArrowRightIcon />

            <div>
              <p
                style={{
                  fontFamily:
                    'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#F5F5F0',
                  lineHeight: 1.2,
                }}
              >
                {leg.arrival}
              </p>
              <p
                style={{
                  fontFamily:
                    'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.1em',
                }}
              >
                {leg.arrivalCode}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: '#A0A0A0',
              }}
            >
              {formatDate(leg.date)}
            </span>
          </div>

          {/* Aircraft */}
          <div className="flex items-center gap-2">
            <PlaneIcon />
            <span
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: '#A0A0A0',
              }}
            >
              {leg.aircraft}
            </span>
          </div>

          {/* Seats */}
          <div className="flex items-center gap-2">
            <UsersIcon />
            <span
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: '#A0A0A0',
              }}
            >
              {leg.seats} places
            </span>
          </div>
        </div>

        {/* Category badge + discount */}
        <div className="flex items-center gap-3">
          <Badge>{leg.category}</Badge>
          <Badge>-{leg.discount}%</Badge>
        </div>

        {/* Pricing + CTA */}
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="text-right">
            <p
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: '#6B6B6B',
                textDecoration: 'line-through',
                lineHeight: 1.3,
              }}
            >
              {formatPrice(leg.originalPrice)}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                fontWeight: 600,
                fontSize: '28px',
                color: '#C9A96E',
                lineHeight: 1.1,
              }}
            >
              {formatPrice(leg.emptyLegPrice)}
            </p>
          </div>

          <Button href="/devis" size="sm">
            Reserver
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   ALERT SIGNUP SECTION
   ============================================ */
function AlertSignupSection() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [routes, setRoutes] = useState('');
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the data to an API
    setSubmitted(true);
  };

  return (
    <section
      id="alertes"
      className="section-padding"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="container-luxury">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '64px',
                    height: '64px',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '50%',
                  }}
                >
                  <BellIcon />
                </div>
              </div>

              <SectionTitle
                preTitle="Ne manquez aucune opportunite"
                title="Creer une alerte"
                subtitle="Recevez une notification des qu'un vol a vide correspond a vos criteres de recherche."
                centered
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="text-center py-12 px-8"
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid rgba(201,169,110,0.3)',
                }}
              >
                <div
                  className="flex justify-center mb-4"
                  style={{ color: '#C9A96E' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily:
                      'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#F5F5F0',
                  }}
                >
                  Alerte creee avec succes
                </h3>
                <p
                  style={{
                    fontFamily:
                      'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: '#A0A0A0',
                  }}
                >
                  Vous serez notifie des qu&apos;un vol correspondant a vos criteres
                  sera disponible.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8"
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #1E1E1E',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      Email <span style={{ color: '#C9A96E' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C9A96E';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#1E1E1E';
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>
                      Telephone{' '}
                      <span
                        style={{
                          fontWeight: 300,
                          textTransform: 'none',
                          letterSpacing: '0',
                        }}
                      >
                        (optionnel)
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C9A96E';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#1E1E1E';
                      }}
                    />
                  </div>
                </div>

                {/* Routes */}
                <div className="mt-6">
                  <label style={labelStyle}>
                    Trajets souhaites{' '}
                    <span style={{ color: '#C9A96E' }}>*</span>
                  </label>
                  <textarea
                    placeholder="Ex: Paris - Nice, Geneve - Londres, Paris - Ibiza..."
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                    required
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#C9A96E';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#1E1E1E';
                    }}
                  />
                </div>

                {/* Flexible dates toggle */}
                <div className="mt-6">
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    style={{ userSelect: 'none' }}
                  >
                    <div
                      onClick={() => setFlexibleDates(!flexibleDates)}
                      className="flex-shrink-0 flex items-center justify-center cursor-pointer"
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: flexibleDates
                          ? '#C9A96E'
                          : '#1E1E1E',
                        transition: 'background-color 0.3s ease',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: flexibleDates
                            ? '#0A0A0A'
                            : '#6B6B6B',
                          position: 'absolute',
                          left: flexibleDates ? '23px' : '3px',
                          transition: 'left 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#A0A0A0',
                      }}
                    >
                      Dates flexibles (je suis ouvert a differentes dates)
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="mt-8 text-center">
                  <Button type="submit" size="lg">
                    Creer mon alerte
                  </Button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BOTTOM CTA SECTION
   ============================================ */
function BottomCtaSection() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#141414',
        borderTop: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      <div className="container-luxury text-center">
        <ScrollReveal>
          <SectionTitle
            preTitle="Besoin d'un vol sur mesure ?"
            title="L'empty leg ne correspond pas a vos besoins ?"
            subtitle="Demandez un devis personnalise pour un affretement classique. Notre equipe vous repond sous 30 minutes, 24h/24."
            centered
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/devis" size="lg">
              Demander un devis
            </Button>
            <Button href="/services/affretement-jet-prive" variant="secondary" size="lg">
              En savoir plus
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
export default function EmptyLegsPage() {
  return (
    <>
      <HeroSection />
      <ExplanationSection />
      <FilterAndListingSection />
      <AlertSignupSection />
      <BottomCtaSection />
    </>
  );
}
