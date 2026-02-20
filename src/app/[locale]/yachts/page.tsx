"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { yachts, yachtCategories, type Yacht } from "@/data/yachts";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const yachtImages: Record<string, string> = {
  "motor-yacht": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=75",
  "sailing-yacht": "https://images.unsplash.com/photo-1534854638093-ba35f2a8a7d7?w=600&q=75",
  "catamaran": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=75",
  "superyacht": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=75",
  "mega-yacht": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=75",
};

function getYachtImage(y: Yacht): string {
  if (y.image?.startsWith("http")) return y.image;
  return yachtImages[y.categorySlug] || yachtImages["motor-yacht"];
}

/* ============================================
   HERO
   ============================================ */
function YachtHero() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(400px, 60vh, 640px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="Luxury yacht at sea"
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
          OUR NAUTICAL FLEET
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          The world&apos;s finest
          <br />yachts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          From motor yachts to mega yachts, find the perfect vessel for every cruise
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   YACHT CARD
   ============================================ */
function YachtCard({ yacht, index }: { yacht: Yacht; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/yachts/${yacht.categorySlug}/${yacht.id}`} className="block group">
        <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
            <Image src={getYachtImage(yacht)} alt={yacht.name} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,42,58,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <Badge>{yacht.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
            <h3 className="group-hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(17px, 2vw, 20px)", marginBottom: "4px" }}>
              {yacht.name}
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px", marginBottom: "16px" }}>
              {yacht.builder}
            </p>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "Guests", value: `${yacht.guests}`, icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
                { label: "Length", value: `${yacht.length} m`, icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                { label: "Speed", value: `${yacht.maxSpeed} kts`, icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
                { label: "Cabins", value: `${yacht.cabins}`, icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
              ].map((spec) => (
                <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d={spec.icon} /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>{spec.label}</span>
                    <span style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#FFFFFF" }}>{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
              View details →
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function YachtsPage() {
  const locale = useLocale() as Locale;
  const [activeCategory, setActiveCategory] = useState("tous");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    yachtCategories.forEach((cat) => {
      counts[cat.slug] = cat.slug === "tous" ? yachts.length : yachts.filter((y) => y.categorySlug === cat.slug).length;
    });
    return counts;
  }, []);

  const filteredYachts = activeCategory === "tous" ? yachts : yachts.filter((y) => y.categorySlug === activeCategory);

  return (
    <>
      <YachtHero />

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
              {yachtCategories.map((cat) => (
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
                  {tData(cat.name, locale)}
                  <span style={{ marginLeft: "6px", fontSize: "10px", fontWeight: 400, opacity: 0.6 }}>
                    ({categoryCounts[cat.slug]})
                  </span>
                  {activeCategory === cat.slug && (
                    <motion.div
                      layoutId="activeYachtCategory"
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
                {yachtCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} style={{ background: "#132A3A" }}>
                    {tData(cat.name, locale)} ({categoryCounts[cat.slug]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredYachts.length} yacht{filteredYachts.length > 1 ? "s" : ""} available
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}
            >
              {filteredYachts.map((yacht, i) => (
                <YachtCard key={yacht.id} yacht={yacht} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "clamp(48px, 6vw, 64px)" }}>
            <Button href="/yachts/comparateur" variant="primary">Compare yachts</Button>
            <Button href="/devis?service=yacht" variant="secondary">Request a quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
