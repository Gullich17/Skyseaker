"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Aircraft } from "@/data/fleet";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* Fallback image based on category */
function getImage(aircraft: Aircraft): string {
  const fallbacks: Record<string, string> = {
    "very-light-jet": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
    "light-jet": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=80",
    "super-light-jet": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
    "midsize-jet": "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&q=80",
    "super-midsize-jet": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=1200&q=80",
    "heavy-jet": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=1200&q=80",
    "ultra-long-range": "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&q=80",
    "vip-airliner": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=80",
    "helicoptere": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=1200&q=80",
    "turbopropulseur": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=80",
  };
  // Use aircraft.image if it starts with http, else fallback
  if (aircraft.image?.startsWith("http")) return aircraft.image;
  return fallbacks[aircraft.categorySlug] || fallbacks["light-jet"];
}

/* ============================================
   SPEC ROW
   ============================================ */
function SpecRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0", borderBottom: "1px solid rgba(30,30,30,0.8)" }}>
      <div style={{
        width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px",
      }}>
        <svg width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d={icon} /></svg>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ fontSize: "clamp(12px, 1.5vw, 13px)", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>{label}</span>
        <span style={{ fontSize: "clamp(13px, 1.5vw, 15px)", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F5F5F0", textAlign: "right" }}>{value}</span>
      </div>
    </div>
  );
}

/* ============================================
   MAIN CLIENT COMPONENT
   ============================================ */
export default function AircraftPageClient({
  aircraft,
  similarAircraft,
}: {
  aircraft: Aircraft;
  similarAircraft: Aircraft[];
}) {
  const heroImg = getImage(aircraft);

  return (
    <>
      {/* ====== HERO ====== */}
      <section style={{ position: "relative", minHeight: "clamp(420px, 65vh, 720px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={heroImg} alt={aircraft.name} fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.6) 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 15vh, 160px) 24px clamp(32px, 5vw, 56px)" }}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
          >
            <Link href="/flotte" style={{ color: "#6B6B6B", textDecoration: "none", transition: "color 0.3s" }}>Flotte</Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <Link href={`/flotte?category=${aircraft.categorySlug}`} style={{ color: "#6B6B6B", textDecoration: "none", transition: "color 0.3s" }}>{aircraft.category}</Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <span style={{ color: "#A0A0A0" }}>{aircraft.name}</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ marginBottom: "12px" }}>
            <Badge>{aircraft.category}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.1, fontSize: "clamp(36px, 6vw, 64px)", marginBottom: "8px" }}
          >
            {aircraft.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontSize: "clamp(14px, 2vw, 16px)", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}
          >
            {aircraft.manufacturer} &middot; Depuis {aircraft.yearIntroduced}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 32px)", marginTop: "clamp(24px, 4vw, 36px)" }}
          >
            {[
              { label: "Passagers", value: `${aircraft.passengers}` },
              { label: "Autonomie", value: `${aircraft.range.toLocaleString("fr-FR")} km` },
              { label: "Vitesse max", value: `${aircraft.speed} km/h` },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{ display: "block", fontSize: "clamp(22px, 3.5vw, 28px)", fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "#C9A96E" }}>
                  {stat.value}
                </span>
                <span style={{ display: "block", fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== DESCRIPTION + SPECS ====== */}
      <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 64px)" }}>
            {/* Left - Description */}
            <div>
              <ScrollReveal>
                <SectionTitle preTitle="PRÉSENTATION" title="À propos de cet appareil" mb="clamp(24px, 4vw, 36px)" />
                <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: 1.8, fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", marginBottom: "clamp(32px, 5vw, 48px)" }}>
                  {aircraft.description}
                </p>
              </ScrollReveal>

              {/* Ideal For */}
              <ScrollReveal delay={0.1}>
                <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C9A96E", marginBottom: "16px" }}>
                  Idéal pour
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {aircraft.idealFor.map((use) => (
                    <div key={use} style={{
                      padding: "8px 16px", fontSize: "clamp(12px, 1.5vw, 13px)",
                      fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#F5F5F0",
                      background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "2px",
                    }}>
                      {use}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Specs Table */}
            <div>
              <ScrollReveal delay={0.15}>
                <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px" }}>
                  <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C9A96E", marginBottom: "16px" }}>
                    Caractéristiques techniques
                  </h3>

                  <SpecRow label="Passagers" value={`${aircraft.passengers} places`} icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  <SpecRow label="Autonomie" value={`${aircraft.range.toLocaleString("fr-FR")} km`} icon="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  <SpecRow label="Vitesse maximale" value={`${aircraft.speed} km/h`} icon="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  <SpecRow label="Longueur cabine" value={`${aircraft.cabinLength} m`} icon="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  <SpecRow label="Hauteur cabine" value={`${aircraft.cabinHeight} m`} icon="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  <SpecRow label="Volume bagages" value={`${aircraft.baggage} m³`} icon="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                  <SpecRow label="Motorisation" value={aircraft.engines} icon="M11.42 15.17l-5.1-5.1M11.42 15.17l2.15-2.16a2 2 0 012.83 0l3.07 3.07a2 2 0 010 2.83l-2.16 2.15a2 2 0 01-2.83 0l-3.07-3.07a2 2 0 010-2.83zM11.42 15.17L4.25 8a2 2 0 010-2.83L5.67 3.75a2 2 0 012.83 0l7.17 7.17" />
                  {aircraft.takeoffDistance > 0 && (
                    <SpecRow label="Distance de décollage" value={`${aircraft.takeoffDistance.toLocaleString("fr-FR")} m`} icon="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
                  )}
                  <SpecRow label="Année d'introduction" value={`${aircraft.yearIntroduced}`} icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 100px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #0A0A0A 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "clamp(28px, 4.5vw, 44px)", marginBottom: "16px", lineHeight: 1.15 }}>
              Réserver le {aircraft.name}
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 18px)", marginBottom: "clamp(32px, 5vw, 48px)", lineHeight: 1.6 }}>
              Nos experts sont disponibles 24/7 pour organiser votre vol à bord de cet appareil
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "12px" }}>
                <Button href="/devis" variant="primary" size="lg">Réserver cet appareil</Button>
                <Button href="/flotte/comparateur" variant="secondary">Comparer avec d&apos;autres</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== SIMILAR AIRCRAFT ====== */}
      {similarAircraft.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <SectionTitle preTitle="APPAREILS SIMILAIRES" title="Découvrez aussi" centered mb="clamp(40px, 5vw, 56px)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
              {similarAircraft.map((similar, i) => (
                <ScrollReveal key={similar.id} delay={i * 0.1}>
                  <Link href={`/flotte/${similar.categorySlug}/${similar.id}`} className="block group">
                    <div style={{ backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflow: "hidden", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
                      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                        <Image
                          src={getImage(similar)}
                          alt={similar.name}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                          className="group-hover:scale-105"
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 50%)" }} />
                        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                          <Badge>{similar.category}</Badge>
                        </div>
                      </div>
                      <div style={{ padding: "clamp(16px, 2.5vw, 20px)" }}>
                        <h3
                          className="group-hover:text-[#C9A96E] transition-colors"
                          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "clamp(16px, 2vw, 18px)", marginBottom: "8px" }}
                        >
                          {similar.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "clamp(10px, 1.3vw, 12px)", color: "#A0A0A0", flexWrap: "wrap" }}>
                          <span>{similar.passengers} pax</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(201,169,110,0.2)" }} />
                          <span>{similar.range.toLocaleString("fr-FR")} km</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(201,169,110,0.2)" }} />
                          <span>{similar.speed} km/h</span>
                        </div>
                        <span style={{ display: "block", marginTop: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E" }}>
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
