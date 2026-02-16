"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { yachts, yachtCategories, type Yacht } from "@/data/yachts";

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
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #0d1218 60%, #0A0A0A 100%)" }} />
      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)" }} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(48px, 6vw, 80px)", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}
        >
          NOTRE FLOTTE NAUTIQUE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          Les plus beaux yachts
          <br />du monde
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Des motor yachts aux mega yachts, trouvez le navire parfait pour chaque croisière
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
        <div style={{ backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
            <Image src={getYachtImage(yacht)} alt={yacht.name} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <Badge>{yacht.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
            <h3 className="group-hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "clamp(17px, 2vw, 20px)", marginBottom: "4px" }}>
              {yacht.name}
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px", marginBottom: "16px" }}>
              {yacht.builder}
            </p>

            {/* Specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "Invités", value: `${yacht.guests}`, icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
                { label: "Longueur", value: `${yacht.length} m`, icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
                { label: "Vitesse", value: `${yacht.maxSpeed} nds`, icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
                { label: "Cabines", value: `${yacht.cabins}`, icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
              ].map((spec) => (
                <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d={spec.icon} /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>{spec.label}</span>
                    <span style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F5F5F0" }}>{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
              Voir la fiche →
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
  const [activeCategory, setActiveCategory] = useState("tous");

  const filteredYachts = activeCategory === "tous" ? yachts : yachts.filter((y) => y.categorySlug === activeCategory);

  return (
    <>
      <YachtHero />

      <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Category Tabs */}
          <div style={{ marginBottom: "clamp(32px, 5vw, 48px)", overflowX: "auto", paddingBottom: "16px" }} className="scrollbar-hide">
            <div style={{ display: "flex", gap: "8px", minWidth: "max-content" }}>
              {yachtCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    position: "relative", padding: "12px 20px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap", cursor: "pointer",
                    fontFamily: "var(--font-montserrat)", fontWeight: activeCategory === cat.slug ? 600 : 400,
                    color: activeCategory === cat.slug ? "#C9A96E" : "#6B6B6B",
                    background: activeCategory === cat.slug ? "rgba(201,169,110,0.08)" : "transparent",
                    border: `1px solid ${activeCategory === cat.slug ? "rgba(201,169,110,0.3)" : "#1E1E1E"}`,
                    borderRadius: "2px", transition: "all 0.3s ease",
                  }}
                >
                  {cat.name}
                  {activeCategory === cat.slug && (
                    <motion.div layoutId="activeYachtCategory" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#C9A96E" }} transition={{ duration: 0.3, ease: EASE }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredYachts.length} yacht{filteredYachts.length > 1 ? "s" : ""} disponible{filteredYachts.length > 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}
            >
              {filteredYachts.map((yacht, i) => (
                <YachtCard key={yacht.id} yacht={yacht} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginTop: "clamp(48px, 6vw, 64px)" }}>
            <Button href="/yachts/comparateur" variant="primary">Comparer les yachts</Button>
            <Button href="/devis" variant="secondary">Demander un devis</Button>
          </div>
        </div>
      </section>
    </>
  );
}
