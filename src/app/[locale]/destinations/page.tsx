"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { destinations, regions, type Destination } from "@/data/destinations";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";

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
          src="/images/fleet/falcon-8x/main.png"
          alt="Private jet in flight to your destination"
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
          The World Within
          <br />Your Reach
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Explore our top destinations and fly to the most prestigious addresses around the globe
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATION CARD
   ============================================ */
function DestinationCard({ destination, index, locale }: { destination: Destination; index: number; locale: Locale }) {
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
                <Badge>Popular</Badge>
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
                {tData(destination.country, locale)}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#F4DDC3", fontSize: "12px" }}>
                    {destination.flightTimeFromParis} from Paris
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px" }}>
                  Starting from{" "}
                  <span style={{ color: "#F4DDC3", fontWeight: 500 }}>{destination.priceFrom}€</span>
                </span>
                <span
                  className="group-hover:opacity-100"
                  style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0, transition: "opacity 0.3s ease" }}
                >
                  Discover →
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
  { slug: "all", name: "All" as const },
  ...regions.map((r) => ({ slug: typeof r === "string" ? r : r.fr, name: r })),
];

/* ============================================
   MAIN PAGE
   ============================================ */
export default function DestinationsPage() {
  const locale = useLocale() as Locale;
  const [activeRegion, setActiveRegion] = useState("all");

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filterCategories.forEach((cat) => {
      counts[cat.slug] = cat.slug === "all" ? destinations.length : destinations.filter((d) => (typeof d.region === "string" ? d.region : d.region.fr) === cat.slug).length;
    });
    return counts;
  }, []);

  const filteredDestinations = activeRegion === "all" ? destinations : destinations.filter((d) => (typeof d.region === "string" ? d.region : d.region.fr) === activeRegion);

  return (
    <>
      <DestinationsHero />

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
                  {tData(cat.name, locale)}
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
                    {tData(cat.name, locale)} ({regionCounts[cat.slug]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredDestinations.length} destination{filteredDestinations.length > 1 ? "s" : ""} available
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
                <DestinationCard key={dest.id} destination={dest} index={i} locale={locale} />
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
              Destination not listed?
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "40px" }}>
              We arrange flights to over 5,000 airports worldwide
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px" }}>
              <Button href="/devis" variant="primary" size="lg">
                Request a Quote
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Call Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
