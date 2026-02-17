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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,32,45,0.65) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.85) 100%)" }} />
      </div>

      {/* Gold accent line */}
      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, zIndex: 1, background: "linear-gradient(90deg, transparent, #F4DDC3, transparent)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(48px, 6vw, 80px)", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}
        >
          DESTINATIONS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
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
    <section className="comparator-desktop" style={{ background: "#132A3A", padding: "clamp(60px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section title inline */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
            CARTE MONDIALE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, marginBottom: "16px" }}>
            Notre réseau de destinations
          </h2>
          <div style={{ width: "60px", height: "1px", background: "#F4DDC3", opacity: 0.3, margin: "0 auto" }} />
        </div>

        <ScrollReveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2 / 1",
              overflow: "hidden",
              background: "#0E202D",
              border: "1px solid #1A3448",
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
                  background: "rgba(26, 52, 72, 0.5)",
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
                  background: "rgba(26, 52, 72, 0.5)",
                }}
              />
            ))}

            {/* Continent outlines */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            >
              {/* North America */}
              <path
                d="M15,18 L17,16 L19,15 L22,14 L24,15 L26,14 L28,16 L29,18 L28,20 L27,22 L26,24 L25,26 L24,28 L23,30 L22,32 L21,33 L20,34 L19,35 L18,36 L17,37 L16,36 L15,34 L14,32 L13,30 L12,28 L12,26 L13,24 L14,22 L14,20 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Central America & Caribbean */}
              <path
                d="M19,35 L20,36 L21,37 L22,38 L23,38 L24,39 L23,40 L22,40 L21,39 L20,38 L19,37 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* South America */}
              <path
                d="M24,40 L26,39 L28,40 L30,42 L31,44 L32,46 L32,48 L33,50 L33,52 L34,54 L34,56 L33,58 L32,60 L31,62 L30,64 L29,65 L28,66 L27,65 L26,63 L25,60 L24,57 L23,54 L22,51 L22,48 L23,45 L23,43 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Europe */}
              <path
                d="M47,18 L48,17 L49,16 L50,16 L51,17 L52,17 L53,18 L54,19 L55,20 L54,21 L53,22 L52,23 L51,24 L50,25 L49,25 L48,24 L47,23 L46,22 L46,20 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Scandinavian peninsula */}
              <path
                d="M50,12 L51,13 L52,14 L52,16 L51,17 L50,16 L49,14 L49,13 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* UK & Ireland */}
              <path
                d="M46,18 L47,17 L47,19 L46,20 Z M45,18 L45,20 L44.5,19 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Africa */}
              <path
                d="M47,28 L48,27 L50,27 L52,28 L54,28 L55,30 L56,32 L56,34 L57,36 L57,38 L56,40 L55,42 L54,44 L53,46 L52,48 L51,50 L50,52 L49,53 L48,52 L47,50 L46,48 L45,46 L44,44 L44,42 L44,40 L44,38 L45,36 L45,34 L45,32 L46,30 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Madagascar */}
              <path
                d="M57,48 L58,47 L58,50 L57,51 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Asia (Russia + Central + East) */}
              <path
                d="M55,10 L58,9 L62,9 L66,10 L70,11 L74,10 L78,10 L82,11 L85,12 L87,14 L88,16 L87,18 L85,19 L82,18 L78,18 L75,19 L72,20 L70,22 L68,23 L66,22 L64,21 L62,20 L60,20 L58,20 L56,19 L55,18 L54,16 L54,14 L54,12 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Middle East & India */}
              <path
                d="M56,24 L58,23 L60,22 L62,23 L64,24 L65,26 L66,28 L68,28 L70,27 L72,28 L73,30 L72,32 L71,34 L70,36 L68,37 L66,36 L64,34 L62,32 L60,30 L58,28 L57,26 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Southeast Asia */}
              <path
                d="M74,28 L76,27 L78,28 L79,30 L78,32 L76,33 L74,32 L73,30 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Japan */}
              <path
                d="M84,20 L85,19 L86,20 L86,22 L85,24 L84,23 L83,22 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Indonesia / Maritime SE Asia */}
              <path
                d="M76,36 L78,35 L80,36 L82,36 L84,37 L83,38 L81,38 L79,38 L77,37 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Australia */}
              <path
                d="M78,46 L80,44 L82,43 L84,43 L86,44 L88,45 L89,47 L89,49 L88,51 L87,53 L85,54 L83,54 L81,53 L79,52 L78,50 L77,48 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* New Zealand */}
              <path
                d="M91,52 L92,51 L92,54 L91,55 Z M91,56 L92,55 L92,57 L91,58 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Greenland */}
              <path
                d="M35,10 L37,9 L39,9 L40,10 L40,12 L39,14 L37,14 L36,13 L35,12 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Iceland */}
              <path
                d="M43,14 L44,13.5 L45,14 L44.5,15 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Italian peninsula */}
              <path
                d="M49.5,23 L50,24 L50.5,25 L51,26.5 L50.5,27 L50,26.5 L49.5,25 L49,24 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
              {/* Iberian Peninsula */}
              <path
                d="M45,23 L46,22 L47,22.5 L48,23 L48,25 L47,25.5 L46,25 L45,24 Z"
                fill="rgba(26, 52, 72, 0.45)"
                stroke="rgba(244, 221, 195, 0.1)"
                strokeWidth="0.2"
              />
            </svg>

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
                    background: "#F4DDC3",
                    boxShadow: "0 0 20px rgba(244, 221, 195, 0.6)",
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
                    color: "#F4DDC3",
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
                        background: "rgba(244, 221, 195, 0.3)",
                      }}
                    />
                    {/* Dot */}
                    <div
                      className="transition-transform group-hover:scale-150"
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: dest.popular ? "#F4DDC3" : "rgba(244, 221, 195, 0.5)",
                        boxShadow: "0 0 10px rgba(244, 221, 195, 0.4)",
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
                        background: "#132A3A",
                        border: "1px solid #F4DDC3",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#FFFFFF",
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
                    stroke="rgba(244, 221, 195, 0.08)"
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
        <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
            <Image
              src={getDestImg(destination)}
              alt={destination.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
              className="group-hover:scale-105"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.9) 0%, rgba(14,32,45,0.2) 40%, transparent 100%)" }} />

            {/* Popular badge */}
            {destination.popular && (
              <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10 }}>
                <Badge>Populaire</Badge>
              </div>
            )}

            {/* Content overlay at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px, 3vw, 24px)", zIndex: 10 }}>
              <h3
                className="group-hover:text-[#F4DDC3] transition-colors"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(20px, 3vw, 26px)", marginBottom: "4px" }}
              >
                {destination.name}
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", marginBottom: "12px" }}>
                {destination.country}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#F4DDC3", fontSize: "12px" }}>
                    {destination.flightTimeFromParis} depuis Paris
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px" }}>
                  À partir de{" "}
                  <span style={{ color: "#F4DDC3", fontWeight: 500 }}>{destination.priceFrom}€</span>
                </span>
                <span
                  className="group-hover:opacity-100"
                  style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0, transition: "opacity 0.3s ease" }}
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
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

          {/* Sticky filter bar */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "#0E202D",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginBottom: "clamp(24px, 4vw, 32px)",
            borderBottom: "1px solid rgba(244,221,195,0.08)",
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
                    color: activeRegion === cat.slug ? "#F4DDC3" : "#6B6B6B",
                    background: activeRegion === cat.slug ? "rgba(244,221,195,0.08)" : "transparent",
                    border: `1px solid ${activeRegion === cat.slug ? "rgba(244,221,195,0.3)" : "#1A3448"}`,
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
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#F4DDC3" }}
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
                  color: "#F4DDC3",
                  background: "rgba(14,32,45,0.6)",
                  border: "1px solid rgba(244,221,195,0.3)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  outline: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4DDC3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "12px",
                }}
              >
                {filterCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} style={{ background: "#132A3A" }}>
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "20px" }}>
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
