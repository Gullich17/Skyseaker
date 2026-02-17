"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Yacht } from "@/data/yachts";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fallbacks: Record<string, string> = {
  "motor-yacht": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80",
  "sailing-yacht": "https://images.unsplash.com/photo-1534854638093-ba35f2a8a7d7?w=1200&q=80",
  "catamaran": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
  "superyacht": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80",
  "mega-yacht": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80",
};

function getImage(y: Yacht): string {
  if (y.image?.startsWith("http")) return y.image;
  return fallbacks[y.categorySlug] || fallbacks["motor-yacht"];
}

function SpecRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0", borderBottom: "1px solid rgba(26,52,72,0.8)" }}>
      <div style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(244,221,195,0.05)", border: "1px solid rgba(244,221,195,0.2)", borderRadius: "2px" }}>
        <svg width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24"><path d={icon} /></svg>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ fontSize: "clamp(12px, 1.5vw, 13px)", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>{label}</span>
        <span style={{ fontSize: "clamp(13px, 1.5vw, 15px)", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#FFFFFF", textAlign: "right" }}>{value}</span>
      </div>
    </div>
  );
}

export default function YachtPageClient({ yacht, similarYachts }: { yacht: Yacht; similarYachts: Yacht[] }) {
  const heroImg = getImage(yacht);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "clamp(420px, 65vh, 720px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={heroImg} alt={yacht.name} fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.6) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 15vh, 160px) 24px clamp(32px, 5vw, 56px)" }}>
          <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            <Link href="/yachts" style={{ color: "#6B6B6B", textDecoration: "none" }}>Yachts</Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <Link href={`/yachts?category=${yacht.categorySlug}`} style={{ color: "#6B6B6B", textDecoration: "none" }}>{yacht.category}</Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <span style={{ color: "#A0A0A0" }}>{yacht.name}</span>
          </motion.nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ marginBottom: "12px" }}>
            <Badge>{yacht.category}</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, fontSize: "clamp(36px, 6vw, 64px)", marginBottom: "8px" }}>
            {yacht.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontSize: "clamp(14px, 2vw, 16px)", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
            {yacht.builder} &middot; Depuis {yacht.yearBuilt}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 32px)", marginTop: "clamp(24px, 4vw, 36px)" }}>
            {[
              { label: "Invités", value: `${yacht.guests}` },
              { label: "Longueur", value: `${yacht.length} m` },
              { label: "Vitesse max", value: `${yacht.maxSpeed} nœuds` },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{ display: "block", fontSize: "clamp(22px, 3.5vw, 28px)", fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "#F4DDC3" }}>{stat.value}</span>
                <span style={{ display: "block", fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DESCRIPTION + SPECS */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 64px)" }}>
            <div>
              <ScrollReveal>
                <SectionTitle preTitle="PRÉSENTATION" title="À propos de ce yacht" mb="clamp(24px, 4vw, 36px)" />
                <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: 1.8, fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", marginBottom: "clamp(32px, 5vw, 48px)" }}>
                  {yacht.description}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3", marginBottom: "16px" }}>
                  Idéal pour
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {yacht.idealFor.map((use) => (
                    <div key={use} style={{ padding: "8px 16px", fontSize: "clamp(12px, 1.5vw, 13px)", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#FFFFFF", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.15)", borderRadius: "2px" }}>
                      {use}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.15}>
                <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px" }}>
                  <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3", marginBottom: "16px" }}>
                    Caractéristiques techniques
                  </h3>
                  <SpecRow label="Invités" value={`${yacht.guests} personnes`} icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  <SpecRow label="Cabines" value={`${yacht.cabins}`} icon="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  <SpecRow label="Équipage" value={`${yacht.crew} membres`} icon="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  <SpecRow label="Longueur" value={`${yacht.length} m`} icon="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  <SpecRow label="Largeur" value={`${yacht.beam} m`} icon="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  <SpecRow label="Tirant d'eau" value={`${yacht.draft} m`} icon="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  <SpecRow label="Vitesse de croisière" value={`${yacht.cruisingSpeed} nœuds`} icon="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <SpecRow label="Vitesse maximale" value={`${yacht.maxSpeed} nœuds`} icon="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  <SpecRow label="Autonomie" value={`${yacht.range.toLocaleString("fr-FR")} nm`} icon="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  <SpecRow label="Motorisation" value={yacht.engines} icon="M11.42 15.17l-5.1-5.1M11.42 15.17l2.15-2.16a2 2 0 012.83 0l3.07 3.07a2 2 0 010 2.83l-2.16 2.15a2 2 0 01-2.83 0l-3.07-3.07a2 2 0 010-2.83zM11.42 15.17L4.25 8a2 2 0 010-2.83L5.67 3.75a2 2 0 012.83 0l7.17 7.17" />
                  <SpecRow label="Constructeur" value={yacht.builder} icon="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  <SpecRow label="Année de construction" value={`${yacht.yearBuilt}`} icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 100px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0E202D 0%, #0d1218 50%, #0E202D 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 4.5vw, 44px)", marginBottom: "16px", lineHeight: 1.15 }}>
              Réserver le {yacht.name}
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 18px)", marginBottom: "clamp(32px, 5vw, 48px)", lineHeight: 1.6 }}>
              Nos experts sont disponibles 24/7 pour organiser votre croisière à bord de ce yacht
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "12px" }}>
              <Button href="/devis" variant="primary" size="lg">Réserver ce yacht</Button>
              <Button href="/yachts/comparateur" variant="secondary">Comparer avec d&apos;autres</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SIMILAR YACHTS */}
      {similarYachts.length > 0 && (
        <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <SectionTitle preTitle="YACHTS SIMILAIRES" title="Découvrez aussi" centered mb="clamp(40px, 5vw, 56px)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
              {similarYachts.map((similar, i) => (
                <ScrollReveal key={similar.id} delay={i * 0.1}>
                  <Link href={`/yachts/${similar.categorySlug}/${similar.id}`} className="block group">
                    <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
                      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                        <Image src={getImage(similar)} alt={similar.name} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,42,58,0.7) 0%, transparent 50%)" }} />
                        <div style={{ position: "absolute", top: "12px", left: "12px" }}><Badge>{similar.category}</Badge></div>
                      </div>
                      <div style={{ padding: "clamp(16px, 2.5vw, 20px)" }}>
                        <h3 className="group-hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(16px, 2vw, 18px)", marginBottom: "8px" }}>
                          {similar.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "clamp(10px, 1.3vw, 12px)", color: "#A0A0A0", flexWrap: "wrap" }}>
                          <span>{similar.guests} invités</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                          <span>{similar.length} m</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                          <span>{similar.maxSpeed} nds</span>
                        </div>
                        <span style={{ display: "block", marginTop: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                          Voir la fiche →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
