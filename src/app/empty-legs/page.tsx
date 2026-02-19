'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { emptyLegs, type EmptyLeg } from '@/data/emptyLegs';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import CityAutocomplete from '@/components/ui/CityAutocomplete';

/* ============================================
   ICONS
   ============================================ */
function PlaneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </svg>
  );
}

function PlaneTakeoffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 20, height: 20 }}
    >
      <path d="M2 22h20" />
      <path d="M6.36 17.4L4 17l-2-4 1.1-.55a2 2 0 011.8 0l.17.1a2 2 0 001.8 0L8 12 5 6l1.1-.55a2 2 0 011.8 0l.17.1a2 2 0 001.8 0L12 4l5 6 3.5-2a2 2 0 012.5 1v.5a2 2 0 01-1.1 1.8l-16 8" />
    </svg>
  );
}

function ArrowRightLongIcon() {
  return (
    <svg
      viewBox="0 0 40 12"
      fill="none"
      style={{ width: 40, height: 12, flexShrink: 0 }}
    >
      <line x1="0" y1="6" x2="34" y2="6" stroke="#F4DDC3" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M32 2 L38 6 L32 10" stroke="#F4DDC3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
      style={{ width: 15, height: 15 }}
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
      style={{ width: 15, height: 15 }}
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
      stroke="#F4DDC3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 28, height: 28 }}
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
      style={{ width: 40, height: 40 }}
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
      style={{ width: 16, height: 16 }}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ============================================
   SHARED STYLES
   ============================================ */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'rgba(14, 32, 45, 0.6)',
  border: '1px solid rgba(244, 221, 195, 0.12)',
  color: '#FFFFFF',
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  borderRadius: '2px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 500,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: '#F4DDC3',
  marginBottom: '10px',
  display: 'block',
};

/* ============================================
   PRICE FORMATTER
   ============================================ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

/* ============================================
   SEAT OPTIONS
   ============================================ */
const seatOptions = [2, 4, 6, 8, 10, 12];

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'clamp(500px, 70vh, 700px)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
          alt="Private jet"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,32,45,0.75) 0%, rgba(14,32,45,0.55) 40%, rgba(14,32,45,0.9) 100%)',
          }}
        />
      </div>

      {/* Decorative gold lines */}
      <div
        className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.06]"
        style={{
          background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full text-center"
        style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 18vh, 180px) 24px clamp(60px, 10vh, 100px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="flex justify-center mb-8"
        >
          <div
            style={{
              width: 72,
              height: 72,
              border: '1px solid rgba(244,221,195,0.25)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4DDC3',
            }}
          >
            <PlaneTakeoffIcon />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#F4DDC3',
            marginBottom: '20px',
          }}
        >
          Empty Legs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            marginBottom: '24px',
          }}
        >
          EMPTY LEGS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#F4DDC3',
            lineHeight: 1.4,
            marginBottom: '20px',
          }}
        >
          Up to 75% off your private jet
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: '#A0A0A0',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          Take advantage of aircraft repositioning flights to travel by private jet
          at exceptional rates.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="mx-auto mt-10"
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
   STATS SECTION
   ============================================ */
function StatsSection() {
  const stats = [
    { value: 75, suffix: '%', label: 'maximum savings' },
    { value: emptyLegs.length, suffix: '+', label: 'flights available' },
    { value: 30, suffix: 'min', label: 'response time' },
    { value: 24, suffix: 'h/24', label: 'availability' },
  ];

  return (
    <section
      style={{
        backgroundColor: '#132A3A',
        borderTop: '1px solid rgba(244,221,195,0.08)',
        borderBottom: '1px solid rgba(244,221,195,0.08)',
        padding: 'clamp(40px, 6vw, 60px) 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 'clamp(20px, 3vw, 40px)' }}
        >
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ADVANTAGES SECTION
   ============================================ */
function AdvantagesSection() {
  const advantages = [
    {
      icon: <TagIcon />,
      title: 'Reduced Prices',
      description: 'Save up to 75% compared to a standard charter. Same aircraft, same service, exceptional rate.',
    },
    {
      icon: <ShieldIcon />,
      title: 'Same Service',
      description: 'You enjoy exactly the same level of comfort, safety, and service as a standard private flight.',
    },
    {
      icon: <ClockIcon />,
      title: 'Immediate Availability',
      description: 'The aircraft are already scheduled to fly. Confirm your seat and board without delay.',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#0E202D' }}>
      <div className="container-luxury">
        <SectionTitle
          preTitle="How it works"
          title="What is an Empty Leg?"
          subtitle="An empty leg is the repositioning of a private jet to its next mission. Rather than flying without passengers, take advantage of it at a reduced price."
          centered
        />

        <div
          className="grid grid-cols-1 md:grid-cols-3 mt-16"
          style={{ gap: 'clamp(24px, 3vw, 40px)' }}
        >
          {advantages.map((adv, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div
                className="text-center"
                style={{
                  padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)',
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.08)',
                  transition: 'border-color 0.4s ease, transform 0.4s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,221,195,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,221,195,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-6"
                  style={{
                    width: 64,
                    height: 64,
                    border: '1px solid rgba(244,221,195,0.2)',
                    borderRadius: '50%',
                    color: '#F4DDC3',
                  }}
                >
                  {adv.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    color: '#FFFFFF',
                    marginBottom: '14px',
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
                    lineHeight: 1.8,
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
   FILTER SECTION + LISTING
   ============================================ */
function FilterAndListingSection() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minSeats, setMinSeats] = useState('');
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
      if (minSeats && leg.seats < Number(minSeats)) {
        return false;
      }
      if (maxBudget && leg.emptyLegPrice > Number(maxBudget)) {
        return false;
      }
      return true;
    });
  }, [departure, arrival, dateFrom, dateTo, minSeats, maxBudget]);

  const resetFilters = () => {
    setDeparture('');
    setArrival('');
    setDateFrom('');
    setDateTo('');
    setMinSeats('');
    setMaxBudget('');
  };

  const hasFilters = departure || arrival || dateFrom || dateTo || minSeats || maxBudget;

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#132A3A',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      <div className="container-luxury">
        <SectionTitle
          preTitle="Available offers"
          title="Find Your Empty Leg"
          subtitle="Filter through our available empty legs and book at the best price."
          centered
        />

        {/* Filters */}
        <ScrollReveal>
          <div
            className="mt-14"
            style={{
              backgroundColor: 'rgba(14, 32, 45, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(244,221,195,0.1)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div style={{ color: '#F4DDC3' }}>
                <FilterIcon />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#F4DDC3',
                }}
              >
                Filter Results
              </p>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="cursor-pointer ml-auto"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    color: '#6B6B6B',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F4DDC3'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B6B6B'; }}
                >
                  Reset
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
              {/* Departure */}
              <CityAutocomplete
                value={departure}
                onChange={setDeparture}
                placeholder="Departure city"
                label="Departure"
              />

              {/* Arrival */}
              <CityAutocomplete
                value={arrival}
                onChange={setArrival}
                placeholder="Arrival city"
                label="Arrival"
              />

              {/* Date from */}
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>

              {/* Date to */}
              <div>
                <label style={labelStyle}>End Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>

              {/* Min seats */}
              <div>
                <label style={labelStyle}>Minimum Seats</label>
                <select
                  value={minSeats}
                  onChange={(e) => setMinSeats(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4DDC3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                >
                  <option value="">All</option>
                  {seatOptions.map((n) => (
                    <option key={n} value={n}>{n}+ seats</option>
                  ))}
                </select>
              </div>

              {/* Max budget */}
              <div>
                <label style={labelStyle}>Max Budget (€)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  style={inputStyle}
                  min={0}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="mt-10 mb-8 flex items-center justify-between">
          <p
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#6B6B6B',
            }}
          >
            <span style={{ color: '#F4DDC3', fontWeight: 600 }}>{filteredLegs.length}</span>{' '}
            flight{filteredLegs.length !== 1 ? 's' : ''} available
          </p>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'rgba(244,221,195,0.08)',
              marginLeft: '20px',
            }}
          />
        </div>

        {/* Empty legs listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode="popLayout">
            {filteredLegs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="py-20 text-center"
                  style={{
                    backgroundColor: 'rgba(14, 32, 45, 0.6)',
                    border: '1px solid rgba(244,221,195,0.08)',
                  }}
                >
                  <div className="flex justify-center mb-4" style={{ color: '#6B6B6B' }}>
                    <SearchIcon />
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: '22px',
                      color: '#FFFFFF',
                    }}
                  >
                    No flights available
                  </p>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      color: '#6B6B6B',
                      maxWidth: '400px',
                      margin: '12px auto 0',
                    }}
                  >
                    Adjust your search criteria or create an alert to be notified.
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredLegs.map((leg, index) => (
                <motion.div
                  key={leg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <EmptyLegCard leg={leg} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
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
    <div
      style={{
        backgroundColor: 'rgba(14, 32, 45, 0.6)',
        border: '1px solid rgba(244,221,195,0.08)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(244,221,195,0.2)';
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(244,221,195,0.08)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="flex flex-col lg:flex-row"
        style={{ minHeight: '100%' }}
      >
        {/* Left: Route visual */}
        <div
          className="flex-1"
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Route */}
          <div className="flex items-center gap-4 mb-5">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {leg.departure}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.12em',
                  marginTop: '2px',
                }}
              >
                {leg.departureCode}
              </p>
            </div>

            <ArrowRightLongIcon />

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {leg.arrival}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.12em',
                  marginTop: '2px',
                }}
              >
                {leg.arrivalCode}
              </p>
            </div>
          </div>

          {/* Details row */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
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

            <div
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(244,221,195,0.15)',
              }}
            />

            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
              <PlaneIcon size={15} />
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

            <div
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(244,221,195,0.15)',
              }}
            />

            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
              <UsersIcon />
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {leg.seats} seats
              </span>
            </div>
          </div>
        </div>

        {/* Vertical separator (desktop) */}
        <div
          className="hidden lg:block"
          style={{
            width: '1px',
            alignSelf: 'stretch',
            backgroundColor: 'rgba(244,221,195,0.08)',
            margin: '20px 0',
          }}
        />

        {/* Horizontal separator (mobile) */}
        <div
          className="block lg:hidden"
          style={{
            height: '1px',
            backgroundColor: 'rgba(244,221,195,0.08)',
            margin: '0 clamp(24px, 3vw, 36px)',
          }}
        />

        {/* Right: Pricing & CTA */}
        <div
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            minWidth: '260px',
          }}
        >
          {/* Badges */}
          <div className="flex items-center gap-2">
            <Badge>{leg.category}</Badge>
          </div>

          {/* Pricing */}
          <div className="text-center">
            <p
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6B6B6B',
                textDecoration: 'line-through',
                lineHeight: 1.3,
              }}
            >
              {formatPrice(leg.originalPrice)}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                color: '#F4DDC3',
                lineHeight: 1.1,
                marginTop: '2px',
              }}
            >
              {formatPrice(leg.emptyLegPrice)}
            </p>
            <div
              className="mt-2 inline-flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(45, 139, 111, 0.15)',
                border: '1px solid rgba(45, 139, 111, 0.3)',
                borderRadius: '2px',
                padding: '3px 10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  color: '#2D8B6F',
                  letterSpacing: '0.05em',
                }}
              >
                -{leg.discount}%
              </span>
            </div>
          </div>

          {/* CTA */}
          <Button href="/devis" size="sm">
            Book
          </Button>
        </div>
      </div>
    </div>
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
    setSubmitted(true);
  };

  return (
    <section
      id="alertes"
      className="section-padding"
      style={{
        backgroundColor: '#0E202D',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      <div className="container-luxury">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '72px',
                    height: '72px',
                    border: '1px solid rgba(244,221,195,0.2)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(244,221,195,0.06) 0%, transparent 100%)',
                  }}
                >
                  <BellIcon />
                </div>
              </div>

              <SectionTitle
                preTitle="Don't miss any opportunity"
                title="Create an Alert"
                subtitle="Receive a notification as soon as an empty leg matches your search criteria."
                centered
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="text-center py-16 px-8"
                style={{
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.2)',
                }}
              >
                <div className="flex justify-center mb-6" style={{ color: '#2D8B6F' }}>
                  <CheckCircleIcon />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Alert created successfully
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: '#A0A0A0',
                    maxWidth: '400px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                  }}
                >
                  You will be notified as soon as a flight matching your criteria becomes available.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.1)',
                  padding: 'clamp(28px, 4vw, 48px)',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      Email <span style={{ color: '#F4DDC3' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>
                      Phone{' '}
                      <span
                        style={{
                          fontWeight: 300,
                          textTransform: 'none',
                          letterSpacing: '0',
                          color: '#6B6B6B',
                        }}
                      >
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                    />
                  </div>
                </div>

                {/* Routes */}
                <div className="mt-6">
                  <label style={labelStyle}>
                    Desired Routes <span style={{ color: '#F4DDC3' }}>*</span>
                  </label>
                  <textarea
                    placeholder="e.g. Paris → Nice, Geneva → London, Paris → Ibiza..."
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                    required
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
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
                      className="flex-shrink-0 cursor-pointer"
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: flexibleDates ? '#F4DDC3' : 'rgba(26, 52, 72, 0.8)',
                        transition: 'background-color 0.3s ease',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: flexibleDates ? '#0E202D' : '#6B6B6B',
                          position: 'absolute',
                          top: '3px',
                          left: flexibleDates ? '23px' : '3px',
                          transition: 'left 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#A0A0A0',
                      }}
                    >
                      Flexible dates (I am open to different dates)
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="mt-10 text-center">
                  <Button type="submit" size="lg">
                    Create My Alert
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
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(80px, 12vw, 140px) 0',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=75"
          alt="Private jet interior"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(14,32,45,0.92) 0%, rgba(14,32,45,0.85) 50%, rgba(14,32,45,0.95) 100%)',
          }}
        />
      </div>

      <div className="container-luxury text-center relative z-10">
        <ScrollReveal>
          <SectionTitle
            preTitle="Need a custom flight?"
            title="The empty leg doesn't meet your needs?"
            subtitle="Request a personalized quote for a standard charter. Our team responds within 30 minutes, 24/7."
            centered
          />
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/devis" size="lg">
              Request a Quote
            </Button>
            <Button href="/services/affretement-jet-prive" variant="secondary" size="lg">
              Learn More
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
      <StatsSection />
      <AdvantagesSection />
      <FilterAndListingSection />
      <AlertSignupSection />
      <BottomCtaSection />
    </>
  );
}
