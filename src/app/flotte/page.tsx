"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { fleet, categories, type Aircraft } from "@/data/fleet";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   HERO
   ============================================ */
function FleetHero() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(400px, 60vh, 640px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
          alt="Jet privé en vol"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}
        >
          NOTRE FLOTTE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          Plus de 8 500 appareils
          <br />à votre disposition
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Des very light jets aux VIP airliners, trouvez l&apos;appareil parfait
          pour chaque mission
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   AIRCRAFT CARD
   ============================================ */
function AircraftCard({ aircraft, index }: { aircraft: Aircraft; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/flotte/${aircraft.categorySlug}/${aircraft.id}`} className="block group">
        <motion.div
          className="overflow-hidden"
          style={{
            backgroundColor: "#132A3A",
            border: "1px solid #1A3448",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Image */}
          <div className="aspect-[16/9] relative overflow-hidden" style={{ background: "#1A3448" }}>
            {aircraft.image && (
              <Image
                src={aircraft.image}
                alt={aircraft.name}
                fill
                style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                className="group-hover:scale-105"
              />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,42,58,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <Badge>{aircraft.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
            <h3
              className="group-hover:text-[#F4DDC3] transition-colors"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(17px, 2vw, 20px)", marginBottom: "4px" }}
            >
              {aircraft.name}
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px", marginBottom: "16px" }}>
              {aircraft.manufacturer}
            </p>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "Passagers", value: `${aircraft.passengers}`, icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
                { label: "Autonomie", value: `${aircraft.range.toLocaleString("fr-FR")} km`, icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" },
                { label: "Vitesse", value: `${aircraft.speed} km/h`, icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
                { label: "Bagages", value: `${aircraft.baggage} m³`, icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" },
              ].map((spec) => (
                <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d={spec.icon} />
                  </svg>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>
                      {spec.label}
                    </span>
                    <span style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#FFFFFF" }}>
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
              Voir la fiche →
            </span>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function FlottePage() {
  const [activeCategory, setActiveCategory] = useState("tous");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.slug] = cat.slug === "tous" ? fleet.length : fleet.filter((a) => a.categorySlug === cat.slug).length;
    });
    return counts;
  }, []);

  const filteredFleet =
    activeCategory === "tous"
      ? fleet
      : fleet.filter((a) => a.categorySlug === activeCategory);

  return (
    <>
      <FleetHero />

      {/* Filter + Grid */}
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
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    position: "relative",
                    padding: "10px 16px",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: activeCategory === cat.slug ? 600 : 400,
                    color: activeCategory === cat.slug ? "#F4DDC3" : "#6B6B6B",
                    background: activeCategory === cat.slug ? "rgba(244,221,195,0.08)" : "transparent",
                    border: `1px solid ${activeCategory === cat.slug ? "rgba(244,221,195,0.3)" : "#1A3448"}`,
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {cat.name}
                  <span style={{ marginLeft: "6px", fontSize: "10px", fontWeight: 400, opacity: 0.6 }}>
                    ({categoryCounts[cat.slug]})
                  </span>
                  {activeCategory === cat.slug && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
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
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
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
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} style={{ background: "#132A3A" }}>
                    {cat.name} ({categoryCounts[cat.slug]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredFleet.length} appareil{filteredFleet.length > 1 ? "s" : ""}{" "}
            disponible{filteredFleet.length > 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}
            >
              {filteredFleet.map((aircraft, i) => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "clamp(48px, 6vw, 64px)" }}>
            <Button href="/flotte/comparateur" variant="primary">
              Comparer les appareils
            </Button>
            <Button href="/devis" variant="secondary">
              Demander un devis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
