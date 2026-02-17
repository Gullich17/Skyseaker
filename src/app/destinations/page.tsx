"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { destinations, regions, type Destination } from "@/data/destinations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   DESTINATION IMAGES — Unsplash fallbacks
   ============================================ */
const destinationImages: Record<string, string> = {
  "geneve": "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?w=600&q=75",
  "londres": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75",
  "mykonos": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=75",
  "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75",
  "marrakech": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=75",
  "ibiza": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=75",
  "nice": "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=600&q=75",
  "new-york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=75",
  "milan": "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=600&q=75",
  "sardaigne": "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=75",
  "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=75",
  "saint-tropez": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=75",
};

function getDestImg(dest: Destination): string {
  if (dest.image?.startsWith("http")) return dest.image;
  return destinationImages[dest.id] || "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75";
}

/* ============================================
   HERO
   ============================================ */
function DestinationsHero() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(400px, 60vh, 640px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80"
          alt="Vue aérienne de destinations de voyage"
          fill
          className="object-cover"
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.85) 100%)" }} />
      </div>

      {/* Gold accent line */}
      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, zIndex: 1, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(48px, 6vw, 80px)", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}
        >
          DESTINATIONS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          Le monde à portée
          <br />de vol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Explorez nos destinations phares et envolez-vous vers les plus belles adresses du globe
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   WORLD MAP — Desktop only
   ============================================ */
function WorldMap() {
  const mapDestination = (dest: Destination) => {
    const x = ((dest.coordinates.lng + 180) / 360) * 90 + 5;
    const y = ((90 - dest.coordinates.lat) / 180) * 90 + 5;
    return { x, y };
  };

  return (
    <section className="comparator-desktop" style={{ background: "#141414", padding: "clamp(60px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section title inline */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}>
            CARTE MONDIALE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, marginBottom: "16px" }}>
            Notre réseau de destinations
          </h2>
          <div style={{ width: "60px", height: "1px", background: "#C9A96E", opacity: 0.3, margin: "0 auto" }} />
        </div>

        <ScrollReveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2 / 1",
              overflow: "hidden",
              background: "#0A0A0A",
              border: "1px solid #1E1E1E",
            }}
          >
            {/* Grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1px",
                  top: `${((i + 1) * 100) / 8}%`,
                  background: "rgba(30, 30, 30, 0.5)",
                }}
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={`v-${i}`}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  left: `${((i + 1) * 100) / 12}%`,
                  background: "rgba(30, 30, 30, 0.5)",
                }}
              />
            ))}

            {/* Paris marker (origin) */}
            <div
              style={{
                position: "absolute",
                left: `${((2.3522 + 180) / 360) * 90 + 5}%`,
                top: `${((90 - 48.8566) / 180) * 90 + 5}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#C9A96E",
                    boxShadow: "0 0 20px rgba(201, 169, 110, 0.6)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    color: "#C9A96E",
                  }}
                >
                  Paris
                </div>
              </div>
            </div>

            {/* Destination dots */}
            {destinations.map((dest, i) => {
              const pos = mapDestination(dest);
              return (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group"
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: EASE }}
                    style={{ position: "relative" }}
                  >
                    {/* Pulse ring */}
                    <div
                      className="animate-ping"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "rgba(201, 169, 110, 0.3)",
                      }}
                    />
                    {/* Dot */}
                    <div
                      className="transition-transform group-hover:scale-150"
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: dest.popular ? "#D4B978" : "rgba(201, 169, 110, 0.5)",
                        boxShadow: "0 0 10px rgba(201, 169, 110, 0.4)",
                      }}
                    />
                    {/* Tooltip */}
                    <div
                      className="group-hover:opacity-100"
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "8px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        padding: "6px 12px",
                        background: "#141414",
                        border: "1px solid #C9A96E",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#F5F5F0",
                      }}
                    >
                      {dest.name}
                      <span style={{ color: "#6B6B6B", marginLeft: "4px" }}>
                        {dest.flightTimeFromParis}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}

            {/* Connection lines from Paris */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {destinations.map((dest, i) => {
                const parisX = ((2.3522 + 180) / 360) * 90 + 5;
                const parisY = ((90 - 48.8566) / 180) * 90 + 5;
                const pos = mapDestination(dest);
                return (
                  <motion.line
                    key={dest.id}
                    x1={`${parisX}%`}
                    y1={`${parisY}%`}
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="rgba(201, 169, 110, 0.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: EASE }}
                  />
                );
              })}
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATION CARD
   ============================================ */
function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/destinations/${destination.id}`} className="block group">
        <div style={{ backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
            <Image
              src={getDestImg(destination)}
              alt={destination.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
              className="group-hover:scale-105"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 40%, transparent 100%)" }} />

            {/* Popular badge */}
            {destination.popular && (
              <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10 }}>
                <Badge>Populaire</Badge>
              </div>
            )}

            {/* Content overlay at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px, 3vw, 24px)", zIndex: 10 }}>
              <h3
                className="group-hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "clamp(20px, 3vw, 26px)", marginBottom: "4px" }}
              >
                {destination.name}
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", marginBottom: "12px" }}>
                {destination.country}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#C9A96E", fontSize: "12px" }}>
                    {destination.flightTimeFromParis} depuis Paris
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px" }}>
                  À partir de{" "}
                  <span style={{ color: "#C9A96E", fontWeight: 500 }}>{destination.priceFrom}€</span>
                </span>
                <span
                  className="group-hover:opacity-100"
                  style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0, transition: "opacity 0.3s ease" }}
                >
                  Découvrir →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   FILTER CATEGORIES
   ============================================ */
const filterCategories = [
  { slug: "toutes", name: "Toutes" },
  ...regions.map((r) => ({ slug: r, name: r })),
];

/* ============================================
   MAIN PAGE
   ============================================ */
export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("toutes");

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filterCategories.forEach((cat) => {
      counts[cat.slug] = cat.slug === "toutes" ? destinations.length : destinations.filter((d) => d.region === cat.slug).length;
    });
    return counts;
  }, []);

  const filteredDestinations = activeRegion === "toutes" ? destinations : destinations.filter((d) => d.region === activeRegion);

  return (
    <>
      <DestinationsHero />
      <WorldMap />

      {/* Destinations grid with filters */}
      <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

          {/* Sticky filter bar */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "#0A0A0A",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginBottom: "clamp(24px, 4vw, 32px)",
            borderBottom: "1px solid rgba(201,169,110,0.08)",
          }}>
            {/* Desktop: wrapped pill row */}
            <div
              className="filter-desktop"
              style={{ flexWrap: "wrap", gap: "8px", alignItems: "center" }}
            >
              {filterCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveRegion(cat.slug)}
                  style={{
                    position: "relative",
                    padding: "10px 16px",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: activeRegion === cat.slug ? 600 : 400,
                    color: activeRegion === cat.slug ? "#C9A96E" : "#6B6B6B",
                    background: activeRegion === cat.slug ? "rgba(201,169,110,0.08)" : "transparent",
                    border: `1px solid ${activeRegion === cat.slug ? "rgba(201,169,110,0.3)" : "#1E1E1E"}`,
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {cat.name}
                  <span style={{ marginLeft: "6px", fontSize: "10px", fontWeight: 400, opacity: 0.6 }}>
                    ({regionCounts[cat.slug]})
                  </span>
                  {activeRegion === cat.slug && (
                    <motion.div
                      layoutId="activeDestRegion"
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#C9A96E" }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile: dropdown select */}
            <div className="filter-mobile">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 40px 14px 16px",
                  fontSize: "13px",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "#C9A96E",
                  background: "rgba(10,10,10,0.6)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  outline: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A96E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "12px",
                }}
              >
                {filterCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} style={{ background: "#141414" }}>
                    {cat.name} ({regionCounts[cat.slug]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredDestinations.length} destination{filteredDestinations.length > 1 ? "s" : ""} disponible{filteredDestinations.length > 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}
            >
              {filteredDestinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 120px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #0A0A0A 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "20px" }}>
              Votre destination n&apos;est pas listée ?
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "40px" }}>
              Nous organisons des vols vers plus de 5 000 aéroports dans le monde entier
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px" }}>
              <Button href="/devis" variant="primary" size="lg">
                Demander un devis
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Nous appeler
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
