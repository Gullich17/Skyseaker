"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { emptyLegs } from "@/data/emptyLegs";

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  const [tripType, setTripType] = useState<"aller" | "ar" | "multi">("aller");
  const [showOptions, setShowOptions] = useState(false);
  const [legs, setLegs] = useState([{ from: "", to: "", date: "" }]);

  const tabs = [
    { id: "aller" as const, label: "Aller simple" },
    { id: "ar" as const, label: "Aller-retour" },
    { id: "multi" as const, label: "Multi-destinations" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
          alt="Jet privé en vol"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.85) 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "120px", paddingBottom: "60px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.1, fontSize: "clamp(40px, 5.5vw, 72px)", marginBottom: "48px" }}
        >
          L&apos;excellence de l&apos;aviation privée
        </motion.h1>

        {/* Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "rgba(14, 14, 14, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(201, 169, 110, 0.18)",
            borderRadius: "4px",
            padding: "28px 36px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Tabs */}
          <div style={{ display: "flex", gap: "0", marginBottom: "24px", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTripType(tab.id)}
                className="relative"
                style={{
                  padding: "12px 24px",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: tripType === tab.id ? 600 : 400,
                  color: tripType === tab.id ? "#C9A96E" : "#6B6B6B",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
              >
                {tab.label}
                {tripType === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#C9A96E" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          {tripType !== "multi" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "20px", marginBottom: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  Départ
                </label>
                <div className="relative">
                  <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12" />
                    <path d="M3 20h18" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Ville ou aéroport"
                    style={{ width: "100%", paddingLeft: "42px", paddingRight: "14px", paddingTop: "14px", paddingBottom: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none", transition: "border-color 0.3s ease" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  Destination
                </label>
                <div className="relative">
                  <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M18 12L20.73 20.87a1 1 0 01-.89 1.38L12 22l-7.84.25a1 1 0 01-.89-1.38L6 12" />
                    <path d="M3 4h18" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Ville ou aéroport"
                    style={{ width: "100%", paddingLeft: "42px", paddingRight: "14px", paddingTop: "14px", paddingBottom: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none", transition: "border-color 0.3s ease" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  {tripType === "ar" ? "Dates" : "Date"}
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="date"
                    style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                  />
                  {tripType === "ar" && (
                    <input
                      type="date"
                      style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  Passagers
                </label>
                <select
                  style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer" }}
                  defaultValue="2"
                >
                  {Array.from({ length: 19 }, (_, i) => (
                    <option key={i + 1} value={i + 1} style={{ background: "#141414" }}>
                      {i + 1} passager{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* Multi-destinations */
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {legs.map((leg, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "18px", alignItems: "end" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                        {idx === 0 ? "Départ" : `Étape ${idx + 1}`}
                      </label>
                      <input
                        type="text"
                        placeholder="Ville ou aéroport"
                        value={leg.from}
                        onChange={(e) => { const n = [...legs]; n[idx].from = e.target.value; setLegs(n); }}
                        style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                        Destination
                      </label>
                      <input
                        type="text"
                        placeholder="Ville ou aéroport"
                        value={leg.to}
                        onChange={(e) => { const n = [...legs]; n[idx].to = e.target.value; setLegs(n); }}
                        style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="date"
                        value={leg.date}
                        onChange={(e) => { const n = [...legs]; n[idx].date = e.target.value; setLegs(n); }}
                        style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "3px", color: "#F5F5F0", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                      />
                      {idx > 0 && (
                        <button
                          onClick={() => setLegs(legs.filter((_, i) => i !== idx))}
                          style={{ padding: "0 12px", color: "#8B2D2D", background: "none", border: "none", cursor: "pointer" }}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLegs([...legs, { from: "", to: "", date: "" }])}
                style={{ marginTop: "16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
              >
                + Ajouter une étape
              </button>
            </div>
          )}

          {/* Extra Options */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2"
            style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", marginBottom: "24px" }}
          >
            Options
            <motion.svg animate={{ rotate: showOptions ? 180 : 0 }} width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {showOptions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 overflow-hidden"
              style={{ gap: "18px", marginBottom: "28px" }}
            >
              {["Animaux à bord", "Bagages volumineux", "Catering spécial", "Transfert terrestre"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="flex items-center justify-center peer-checked:bg-[#C9A96E] transition-all"
                    style={{ width: "18px", height: "18px", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", flexShrink: 0 }}>
                    <svg className="opacity-0 peer-checked:opacity-100" width="12" height="12" fill="none" stroke="#0A0A0A" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="group-hover:text-[#F5F5F0] transition-colors"
                    style={{ fontSize: "12px", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                    {opt}
                  </span>
                </label>
              ))}
            </motion.div>
          )}

          {/* Submit */}
          <Link
            href="/devis"
            className="block transition-all duration-300 hover:shadow-lg"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "20px 24px",
              background: "linear-gradient(135deg, #C9A96E 0%, #D4B978 50%, #C9A96E 100%)",
              backgroundSize: "200% 200%",
              color: "#0A0A0A",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              textDecoration: "none",
              borderRadius: "3px",
              boxShadow: "0 4px 24px rgba(201,169,110,0.35)",
            }}
          >
            Estimez votre vol gratuitement
          </Link>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "#8A8A8A", fontFamily: "var(--font-montserrat)", fontWeight: 300, letterSpacing: "0.05em" }}>
            Réponse sous 30 minutes &bull; Disponible 24/7 &bull; Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   TRUST BANNER
   ============================================ */
function TrustBanner() {
  const stats = [
    { value: 15000, suffix: "+", label: "Vols réalisés" },
    { value: 120000, suffix: "+", label: "Passagers transportés" },
    { value: 8500, suffix: "+", label: "Appareils disponibles" },
    { value: 24, suffix: "/7", label: "Disponibilité" },
    { value: 4.9, suffix: "/5", label: "Satisfaction client" },
  ];

  return (
    <section style={{ background: "#111111", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 0" }}>
        <div className="hidden md:flex items-center justify-between">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center" style={{ flex: 1 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
              {i < stats.length - 1 && (
                <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.25), transparent)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
        {/* Mobile: 2 columns */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:hidden">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SERVICES SECTION
   ============================================ */
function ServicesSection() {
  const serviceCards = [
    { title: "Affrètement personnalisé", desc: "Un vol sur mesure adapté à vos moindres exigences, avec accès à plus de 8 500 appareils dans le monde.", href: "/services/affretement-jet-prive", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75" },
    { title: "Vols à vide (Empty Legs)", desc: "Profitez de repositionnements d'appareils pour voyager en jet privé à tarif réduit.", href: "/services/vols-a-vide-empty-legs", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75" },
    { title: "Voyages de groupe", desc: "Des solutions charter pour vos groupes de 10 à 50+ passagers, partout dans le monde.", href: "/services/voyage-groupe", img: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75" },
    { title: "Fret urgent", desc: "Transport aérien express de fret urgent, disponible 24h/24 et 7j/7.", href: "/services/fret-urgent", img: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75" },
    { title: "Conciergerie & Lifestyle", desc: "Un service complet : hôtels, restaurants, transferts, événements exclusifs.", href: "/services/conciergerie-lifestyle", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75" },
    { title: "Expériences exclusives", desc: "Des packages uniques alliant vol privé et expériences de luxe inoubliables.", href: "/experiences", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75" },
  ];

  return (
    <section style={{ background: "#0A0A0A", padding: "140px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <SectionTitle
          preTitle="NOS SERVICES"
          title="Des solutions adaptées à chaque besoin"
          centered
          className="mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px" }}>
          {serviceCards.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.08}>
              <Link href={svc.href} className="block group h-full">
                <div className="card-luxury overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={svc.img}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.2) 50%, transparent 100%)" }} />
                  </div>
                  <div style={{ padding: "28px 28px 32px" }} className="flex-1 flex flex-col">
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "20px", marginBottom: "12px", lineHeight: 1.3 }}
                        className="group-hover:text-[#C9A96E] transition-colors">
                      {svc.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px", flex: 1 }}>
                      {svc.desc}
                    </p>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E" }}>
                      En savoir plus →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   WHY CHOOSE US
   ============================================ */
function WhyChooseUs() {
  const points = [
    { title: "Réactivité", desc: "Votre jet prêt en moins de 2 heures, partout dans le monde", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Transparence", desc: "Aucun frais caché, devis détaillé et immédiat", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { title: "Sécurité", desc: "Opérateurs certifiés, audits réguliers et standards EASA", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
    { title: "Sur-mesure", desc: "Chaque vol est conçu selon vos exigences les plus précises", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  ];

  return (
    <section style={{ background: "#111111", padding: "140px 0" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "80px" }}>
          {/* Image */}
          <ScrollReveal>
            <div className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: "4px" }}>
              <Image
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
                alt="Intérieur jet privé luxe"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.3), rgba(10,10,10,0.1))" }} />
            </div>
          </ScrollReveal>

          {/* Points */}
          <div>
            <SectionTitle
              preTitle="POURQUOI NOUS CHOISIR"
              title="L'excellence à chaque étape"
              className="mb-12"
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {points.map((pt, i) => (
                <ScrollReveal key={pt.title} delay={i * 0.12}>
                  <div className="flex" style={{ gap: "20px" }}>
                    <div className="shrink-0 flex items-center justify-center" style={{ width: "52px", height: "52px", border: "1px solid rgba(201,169,110,0.25)", borderRadius: "4px", background: "rgba(201,169,110,0.04)" }}>
                      <svg width="22" height="22" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d={pt.icon} /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F5F5F0", fontSize: "16px", marginBottom: "6px" }}>
                        {pt.title}
                      </h4>
                      <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", lineHeight: 1.7 }}>
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div style={{ marginTop: "48px" }}>
              <Button href="/a-propos" variant="primary">
                Découvrir notre approche
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FLEET SHOWCASE
   ============================================ */
function FleetShowcase() {
  const featuredAircraft = [
    { name: "Citation XLS+", category: "Super Light Jet", pax: "9", range: "3 400 km", speed: "816 km/h", slug: "citation-xls-plus", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=500&q=75" },
    { name: "Challenger 350", category: "Super Midsize", pax: "10", range: "5 926 km", speed: "870 km/h", slug: "challenger-350", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=500&q=75" },
    { name: "Global 6000", category: "Heavy Jet", pax: "14", range: "11 112 km", speed: "950 km/h", slug: "global-6000", img: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=500&q=75" },
    { name: "Gulfstream G650ER", category: "Ultra Long Range", pax: "16", range: "13 890 km", speed: "956 km/h", slug: "gulfstream-g650er", img: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=500&q=75" },
    { name: "Phenom 300E", category: "Light Jet", pax: "8", range: "3 650 km", speed: "839 km/h", slug: "phenom-300e", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=500&q=75" },
  ];

  return (
    <section style={{ background: "#0A0A0A", padding: "140px 0" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="NOTRE FLOTTE"
          title="Accédez aux meilleurs appareils du monde"
          centered
          className="mb-20"
        />

        {/* Horizontal scrollable with scroll indicator */}
        <div className="relative">
          <div className="overflow-x-auto pb-8 scrollbar-hide" style={{ margin: "0 -10px", padding: "0 10px" }}>
            <div className="flex" style={{ gap: "28px", minWidth: "max-content" }}>
              {featuredAircraft.map((ac, i) => (
                <ScrollReveal key={ac.slug} delay={i * 0.08}>
                  <Link href={`/flotte/${ac.category.toLowerCase().replace(/ /g, "-")}/${ac.slug}`} className="block group" style={{ width: "340px" }}>
                    <div className="card-luxury overflow-hidden">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={ac.img}
                          alt={ac.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,20,0.8) 0%, transparent 60%)" }} />
                        <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                          <Badge>{ac.category}</Badge>
                        </div>
                      </div>
                      <div style={{ padding: "24px 24px 28px" }}>
                        <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "20px", marginBottom: "14px" }}
                            className="group-hover:text-[#C9A96E] transition-colors">
                          {ac.name}
                        </h3>
                        <div className="flex items-center text-[#A0A0A0]" style={{ gap: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px" }}>
                          <span>{ac.pax} pax</span>
                          <span style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.2)" }} />
                          <span>{ac.range}</span>
                          <span style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.2)" }} />
                          <span>{ac.speed}</span>
                        </div>
                        <span style={{ display: "block", marginTop: "18px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E" }}>
                          Voir la fiche →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 mt-2" style={{ color: "#6B6B6B", fontSize: "12px", fontFamily: "var(--font-montserrat)" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M8 7l4-4m0 0l4 4m-4-4v18" style={{ transform: "rotate(90deg)", transformOrigin: "center" }} /></svg>
            <span>Faites défiler pour voir plus</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-14" style={{ gap: "20px" }}>
          <Button href="/flotte" variant="primary">Explorer toute la flotte</Button>
          <Link href="/flotte/comparateur" className="hover:text-[#C9A96E] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0" }}>
            Comparer les appareils →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   EMPTY LEGS
   ============================================ */
function EmptyLegsSection() {
  const featured = emptyLegs.slice(0, 4);

  return (
    <section style={{ background: "#111111", padding: "140px 0" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="VOLS À VIDE"
          title="Voyagez en jet privé à prix réduit"
          subtitle="Profitez de nos repositionnements d'appareils pour voyager à tarif avantageux"
          centered
          className="mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
          {featured.map((el, i) => (
            <ScrollReveal key={el.id} delay={i * 0.08}>
              <div className="card-luxury overflow-hidden" style={{ padding: "28px 32px" }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between" style={{ gap: "24px" }}>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center mb-3" style={{ gap: "14px" }}>
                      <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "20px" }}>
                        {el.departure}
                      </span>
                      <svg width="22" height="22" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "20px" }}>
                        {el.arrival}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#A0A0A0" }}>
                      <span>{new Date(el.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.2)" }} />
                      <span>{el.aircraft}</span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.2)" }} />
                      <span>{el.seats} places</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge>-{el.discount}%</Badge>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "line-through", marginRight: "10px" }}>{el.originalPrice.toLocaleString("fr-FR")}€</span>
                      <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "26px", color: "#C9A96E" }}>
                        {el.emptyLegPrice.toLocaleString("fr-FR")}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center mt-14" style={{ gap: "20px" }}>
          <Button href="/empty-legs" variant="primary">Voir tous les empty legs</Button>
          <Link href="/empty-legs#alertes" className="hover:text-[#C9A96E] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0" }}>
            Créer une alerte empty leg →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATIONS
   ============================================ */
function DestinationsSection() {
  const destCards = [
    { name: "Genève", country: "Suisse", time: "55min", slug: "geneve", img: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=75" },
    { name: "Londres", country: "Royaume-Uni", time: "1h10", slug: "londres", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75" },
    { name: "Mykonos", country: "Grèce", time: "3h00", slug: "mykonos", img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=75" },
    { name: "Dubaï", country: "Émirats Arabes Unis", time: "6h30", slug: "dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75" },
    { name: "Marrakech", country: "Maroc", time: "3h15", slug: "marrakech", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=75" },
    { name: "Ibiza", country: "Espagne", time: "1h50", slug: "ibiza", img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=75" },
  ];

  return (
    <section style={{ background: "#0A0A0A", padding: "140px 0" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="DESTINATIONS"
          title="Le monde à portée de vol"
          centered
          className="mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
          {destCards.map((dest, i) => (
            <ScrollReveal key={dest.slug} delay={i * 0.08}>
              <Link href={`/destinations/${dest.slug}`} className="block group relative overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: "4px" }}>
                <Image
                  src={dest.img}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0" style={{ padding: "32px" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "30px", marginBottom: "6px", lineHeight: 1.2 }}>
                    {dest.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#B0B0B0", fontSize: "14px", marginBottom: "8px" }}>
                    {dest.country}
                  </p>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#C9A96E", fontSize: "13px" }}>
                    À partir de {dest.time} depuis Paris
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ border: "2px solid rgba(201,169,110,0.3)", borderRadius: "4px" }} />
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button href="/destinations" variant="primary">Toutes nos destinations</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TESTIMONIALS
   ============================================ */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { quote: "Un service d'exception du début à la fin. L'équipe Skyseaker a su anticiper chacun de nos besoins. Le vol vers Genève était parfait.", name: "Laurent M.", role: "CEO — Groupe Immobilier", stars: 5 },
    { quote: "Nous utilisons Skyseaker pour tous nos déplacements d'affaires depuis 2 ans. La réactivité et le professionnalisme sont incomparables.", name: "Sophie D.", role: "Directrice Générale — Tech", stars: 5 },
    { quote: "Notre voyage familial aux Maldives organisé par la conciergerie Skyseaker restera gravé dans nos mémoires. Chaque détail était parfait.", name: "Marc & Isabelle R.", role: "Clients fidèles", stars: 5 },
  ];

  return (
    <section className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      {/* BG */}
      <div className="absolute inset-0" style={{ background: "#0E0E0E" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(circle at 50% 50%, #C9A96E 0%, transparent 70%)" }} />
      </div>

      <div className="relative px-6 md:px-10 text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="TÉMOIGNAGES"
          title="Ce que disent nos clients"
          centered
          className="mb-20"
        />

        <div className="relative" style={{ minHeight: "220px" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: current === i ? 1 : 0, y: current === i ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
              style={{ pointerEvents: current === i ? "auto" : "none" }}
            >
              {/* Decorative quotes */}
              <div style={{ fontFamily: "Georgia, serif", fontSize: "140px", lineHeight: "0.8", color: "#C9A96E", opacity: 0.08, position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)" }}>
                &ldquo;
              </div>
              <blockquote style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic", color: "#F5F5F0", fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.6, marginBottom: "32px", position: "relative", zIndex: 1 }}>
                {t.quote}
              </blockquote>
              <div className="flex items-center justify-center" style={{ gap: "4px", marginBottom: "18px" }}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <svg key={si} width="18" height="18" fill="#C9A96E" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "15px", color: "#F5F5F0", marginBottom: "4px" }}>
                {t.name}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#8A8A8A" }}>
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center" style={{ gap: "12px", marginTop: "40px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: current === i ? "#C9A96E" : "rgba(201,169,110,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BLOG PREVIEW
   ============================================ */
function BlogPreview() {
  const articles = [
    { title: "Les 10 destinations les plus prisées en jet privé en 2026", cat: "Destinations", date: "12 Fév 2026", time: "5 min", slug: "top-destinations-2026", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75" },
    { title: "Guide complet : comment choisir son jet privé", cat: "Guides", date: "8 Fév 2026", time: "8 min", slug: "guide-choisir-jet-prive", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75" },
    { title: "Empty legs : tout ce qu'il faut savoir pour voyager malin", cat: "Guides", date: "3 Fév 2026", time: "6 min", slug: "empty-legs-guide-complet", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75" },
  ];

  return (
    <section style={{ background: "#111111", padding: "140px 0" }}>
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="JOURNAL"
          title="Actualités et inspirations"
          centered
          className="mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "32px" }}>
          {articles.map((art, i) => (
            <ScrollReveal key={art.slug} delay={i * 0.08}>
              <Link href={`/blog/${art.slug}`} className="block group h-full">
                <div className="card-luxury overflow-hidden h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,20,0.6) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                      <Badge>{art.cat}</Badge>
                    </div>
                  </div>
                  <div style={{ padding: "28px 28px 32px" }} className="flex-1 flex flex-col">
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0", fontSize: "18px", lineHeight: 1.45, marginBottom: "14px" }}
                        className="group-hover:text-[#C9A96E] transition-colors">
                      {art.title}
                    </h3>
                    <div className="flex items-center" style={{ gap: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: "#8A8A8A", marginBottom: "18px" }}>
                      <span>{art.date}</span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(201,169,110,0.15)" }} />
                      <span>{art.time} de lecture</span>
                    </div>
                    <span className="mt-auto" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A96E" }}>
                      Lire l&apos;article →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button href="/blog" variant="secondary">Voir tous les articles</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FINAL CTA
   ============================================ */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=75"
          alt="Jet privé ciel"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.85)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />
      </div>
      <div className="relative px-6 md:px-10 text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", fontSize: "clamp(36px, 5vw, 52px)", marginBottom: "20px", lineHeight: 1.1 }}>
            Prêt à décoller ?
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px, 2.5vw, 22px)", color: "#B0B0B0", marginBottom: "48px", lineHeight: 1.6 }}>
            Nos experts sont disponibles 24h/24, 7j/7 pour organiser votre prochain vol
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginBottom: "36px" }}>
            <Button href="/devis" variant="primary" size="lg">Demander un devis</Button>
            <Button href="tel:+33100000000" variant="secondary" size="lg">Nous appeler</Button>
          </div>
          <a href="tel:+33100000000" className="hover:text-[#D4B978] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "28px", color: "#C9A96E", letterSpacing: "0.08em" }}>
            +33 1 00 00 00 00
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   HOMEPAGE
   ============================================ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBanner />
      <ServicesSection />
      <WhyChooseUs />
      <FleetShowcase />
      <EmptyLegsSection />
      <DestinationsSection />
      <TestimonialsSection />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
