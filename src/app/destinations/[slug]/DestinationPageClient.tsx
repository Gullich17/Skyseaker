"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Destination } from "@/data/destinations";
import { type Aircraft } from "@/data/fleet";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   IMAGE HELPERS
   ============================================ */
const destinationImages: Record<string, string> = {
  "geneve": "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?w=1920&q=80",
  "londres": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  "mykonos": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1920&q=80",
  "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
  "marrakech": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1920&q=80",
  "ibiza": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=80",
  "nice": "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=1920&q=80",
  "new-york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80",
  "milan": "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1920&q=80",
  "sardaigne": "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1920&q=80",
  "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=80",
  "saint-tropez": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=80",
};

function getDestImage(dest: Destination): string {
  if (dest.image?.startsWith("http")) return dest.image;
  return destinationImages[dest.id] || "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80";
}

const aircraftFallbacks: Record<string, string> = {
  "very-light-jet": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75",
  "light-jet": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75",
  "super-light-jet": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75",
  "midsize-jet": "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75",
  "super-midsize-jet": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75",
  "heavy-jet": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75",
  "ultra-long-range": "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75",
  "vip-airliner": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75",
  "helicoptere": "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75",
  "turbopropulseur": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75",
};

function getAircraftImage(a: Aircraft): string {
  if (a.image?.startsWith("http")) return a.image;
  return aircraftFallbacks[a.categorySlug] || aircraftFallbacks["light-jet"];
}

/* ============================================
   FAQ ITEM
   ============================================ */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.08}>
      <div style={{ borderBottom: "1px solid rgba(30, 30, 30, 0.8)" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", textAlign: "left", cursor: "pointer", background: "none", border: "none" }}
        >
          <span
            className="group-hover:text-[#C9A96E] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F5F5F0", fontSize: "16px", paddingRight: "16px" }}
          >
            {question}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            width="20" height="20" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <p style={{ paddingBottom: "20px", fontSize: "15px", lineHeight: 1.8, fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

/* ============================================
   INFO ROW — sidebar
   ============================================ */
function InfoRow({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(30, 30, 30, 0.8)" }}>
      <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B", fontSize: "12px" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: gold ? "#C9A96E" : "#F5F5F0", fontSize: "14px" }}>
        {value}
      </span>
    </div>
  );
}

/* ============================================
   SECTION HEADER INLINE
   ============================================ */
function SectionHeader({ preTitle, title, centered }: { preTitle: string; title: string; centered?: boolean }) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "clamp(32px, 5vw, 48px)" }}>
      <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}>
        {preTitle}
      </p>
      <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "clamp(24px, 4vw, 40px)", lineHeight: 1.2, marginBottom: "16px" }}>
        {title}
      </h2>
      <div style={{ width: "60px", height: "1px", background: "#C9A96E", opacity: 0.3, margin: centered ? "0 auto" : undefined }} />
    </div>
  );
}

/* ============================================
   MAIN CLIENT COMPONENT
   ============================================ */
export default function DestinationPageClient({
  destination,
  content,
  recommendedFleet,
}: {
  destination: Destination;
  content: {
    seoText: string;
    timezone: string;
    recommendedAircraft: string[];
    priceRange: string;
    faq: { question: string; answer: string }[];
  };
  recommendedFleet: Aircraft[];
}) {
  return (
    <>
      {/* ============================================
         HERO — with destination image
         ============================================ */}
      <section style={{ position: "relative", minHeight: "clamp(500px, 70vh, 800px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={getDestImage(destination)}
            alt={`${destination.name}, ${destination.country}`}
            fill
            className="object-cover"
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.6) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 14vh, 160px) 24px clamp(40px, 6vw, 64px)" }}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
          >
            <Link href="/destinations" className="transition-colors" style={{ color: "#6B6B6B" }}>
              Destinations
            </Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <span style={{ color: "#A0A0A0" }}>{destination.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{ marginBottom: "16px" }}
          >
            <Badge>{destination.region}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.1, fontSize: "clamp(36px, 8vw, 72px)", marginBottom: "12px" }}
          >
            {destination.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "32px" }}
          >
            {destination.country}
          </motion.p>

          {/* Key Info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px, 3vw, 32px)" }}
          >
            {[
              { label: "Temps de vol depuis Paris", value: destination.flightTimeFromParis, icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Aéroports", value: `${destination.airports.length} aéroport${destination.airports.length > 1 ? "s" : ""}`, icon: "M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" },
              { label: "Fuseau horaire", value: content.timezone, icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" },
              { label: "À partir de", value: `${destination.priceFrom}€`, icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
            ].map((info) => (
              <div key={info.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(201, 169, 110, 0.05)", border: "1px solid rgba(201, 169, 110, 0.2)" }}>
                  <svg width="18" height="18" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d={info.icon} />
                  </svg>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>
                    {info.label}
                  </span>
                  <span style={{ display: "block", fontSize: "15px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F5F5F0" }}>
                    {info.value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
         SEO TEXT + INFO SIDEBAR
         ============================================ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* 2-column layout: CSS grid with sidebar on desktop, stacked on mobile */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "clamp(32px, 5vw, 64px)" }} className="sidebar-grid">
            {/* Left - SEO Text */}
            <div>
              <ScrollReveal>
                <SectionHeader
                  preTitle={`VOL PRIVÉ ${destination.name.toUpperCase()}`}
                  title={`Votre vol en jet privé vers ${destination.name}`}
                />
                <div style={{ fontSize: "15px", lineHeight: 1.9, fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                  {content.seoText.split(". ").reduce<{ paragraphs: string[]; current: string }>(
                    (acc, sentence, i, arr) => {
                      const updated = acc.current + sentence + (i < arr.length - 1 ? ". " : "");
                      if ((i + 1) % 4 === 0 || i === arr.length - 1) {
                        return { paragraphs: [...acc.paragraphs, updated], current: "" };
                      }
                      return { ...acc, current: updated };
                    },
                    { paragraphs: [], current: "" }
                  ).paragraphs.map((paragraph, i) => (
                    <p key={i} style={{ marginBottom: "24px" }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Info sidebar */}
            <div>
              <ScrollReveal delay={0.15}>
                <div style={{ padding: "clamp(20px, 3vw, 24px)", backgroundColor: "#141414", border: "1px solid #1E1E1E", position: "sticky", top: "100px" }}>
                  <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C9A96E" }}>
                    Informations clés
                  </h3>

                  <InfoRow label="Temps de vol" value={destination.flightTimeFromParis} />
                  <InfoRow label="Fuseau horaire" value={content.timezone} />
                  <InfoRow label="Fourchette de prix" value={`${content.priceRange}€`} gold />
                  <InfoRow label="Région" value={destination.region} />

                  <div style={{ marginTop: "32px" }}>
                    <Button href={`/devis?destination=${destination.id}`} variant="primary" size="sm" className="w-full">
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
         AIRPORTS
         ============================================ */}
      <section style={{ background: "#141414", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader
            preTitle="AÉROPORTS"
            title={`Aéroports desservis à ${destination.name}`}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}>
            {destination.airports.map((airport, i) => (
              <ScrollReveal key={airport.code} delay={i * 0.1}>
                <div style={{ padding: "clamp(20px, 3vw, 24px)", backgroundColor: "#0A0A0A", border: "1px solid #1E1E1E" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201, 169, 110, 0.05)", border: "1px solid rgba(201, 169, 110, 0.2)" }}>
                      <svg width="22" height="22" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
                      </svg>
                    </div>
                    <Badge>{airport.code}</Badge>
                  </div>
                  <h4 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "18px", marginBottom: "8px" }}>
                    {airport.name}
                  </h4>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px" }}>
                    Code OACI : {airport.code}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
         RECOMMENDED AIRCRAFT
         ============================================ */}
      {recommendedFleet.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <SectionHeader
              preTitle="APPAREILS RECOMMANDÉS"
              title={`Les jets idéaux pour ${destination.name}`}
              centered
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}>
              {recommendedFleet.map((aircraft, i) => (
                <ScrollReveal key={aircraft.id} delay={i * 0.1}>
                  <Link href={`/flotte/${aircraft.categorySlug}/${aircraft.id}`} className="block group">
                    <div style={{ backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
                      {/* Image */}
                      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                        <Image
                          src={getAircraftImage(aircraft)}
                          alt={aircraft.name}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                          className="group-hover:scale-105"
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 50%)" }} />
                        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                          <Badge>{aircraft.category}</Badge>
                        </div>
                      </div>
                      {/* Content */}
                      <div style={{ padding: "clamp(16px, 3vw, 20px)" }}>
                        <h4
                          className="group-hover:text-[#C9A96E] transition-colors"
                          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "18px", marginBottom: "8px" }}
                        >
                          {aircraft.name}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                          <span>{aircraft.passengers} pax</span>
                          <span style={{ width: "1px", height: "12px", background: "#1E1E1E" }} />
                          <span>{aircraft.range.toLocaleString("fr-FR")} km</span>
                          <span style={{ width: "1px", height: "12px", background: "#1E1E1E" }} />
                          <span>{aircraft.speed} km/h</span>
                        </div>
                        <span style={{ display: "block", marginTop: "16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
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

      {/* ============================================
         FAQ
         ============================================ */}
      <section style={{ background: "#141414", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader
            preTitle="QUESTIONS FRÉQUENTES"
            title={`Tout savoir sur les vols vers ${destination.name}`}
            centered
          />
          <div>
            {content.faq.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
         CTA
         ============================================ */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 120px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #0A0A0A 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "clamp(28px, 5vw, 48px)", marginBottom: "16px" }}>
              Envolez-vous vers {destination.name}
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "12px" }}>
              Paris → {destination.name} en {destination.flightTimeFromParis}
            </p>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "16px", marginBottom: "40px" }}>
              À partir de {destination.priceFrom}€ en aller simple
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px" }}>
              <Button href={`/devis?destination=${destination.id}`} variant="primary" size="lg">
                Réserver ce vol
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Nous appeler
              </Button>
            </div>
            <p style={{ marginTop: "24px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
              Réponse sous 30 minutes &bull; Disponible 24/7
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
