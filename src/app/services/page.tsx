"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   SERVICE IMAGES — Unsplash fallbacks
   ============================================ */
const serviceImages: Record<string, string> = {
  affretement: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
  "empty-legs": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80",
  groupe: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
  "fret-urgent": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
  conciergerie: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  transferts: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80",
  gestion: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
  "achat-vente": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
};

function getServiceImg(service: (typeof services)[number]): string {
  return serviceImages[service.id] || "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80";
}

/* ============================================
   ICON MAPPING
   ============================================ */
function ServiceIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    plane: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
    tag: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    package: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    concierge: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91-.74L12 2z" />
        <path d="M2 18h20v2H2zM4 18v-4a8 8 0 0116 0v4" />
      </svg>
    ),
    car: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a1 1 0 00-.9.55l-2.2 4.4A1 1 0 002 12.3V16h3" />
        <circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    handshake: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.64l7.64-7.64.78-.77a5.4 5.4 0 000-7.65z" />
      </svg>
    ),
  };
  return <span style={{ color: "#F4DDC3" }}>{icons[icon] || icons.plane}</span>;
}

/* ============================================
   HERO
   ============================================ */
function ServicesHero() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(400px, 60vh, 640px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/fleet/falcon-8x/main.png"
          alt="Private jet in flight"
          fill
          className="object-cover"
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,32,45,0.7) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.9) 100%)" }} />
      </div>

      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, zIndex: 1, background: "linear-gradient(90deg, transparent, #F4DDC3, transparent)" }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(48px, 6vw, 80px)", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}
        >
          OUR SERVICES
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          Comprehensive solutions
          <br />for your private aviation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          From bespoke charter services to aircraft management, discover our full range of premium offerings
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   SERVICES GRID — Quick overview cards
   ============================================ */
function ServicesOverview() {
  return (
    <section style={{ background: "#132A3A", padding: "clamp(60px, 8vw, 100px) 0", borderBottom: "1px solid rgba(244,221,195,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
              8 AREAS OF EXPERTISE
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 40px)", lineHeight: 1.2, marginBottom: "16px" }}>
              A 360° Service Experience
            </h2>
            <div style={{ width: "60px", height: "1px", background: "#F4DDC3", opacity: 0.3, margin: "0 auto" }} />
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.06}>
              <Link href={`/services/${service.slug}`} className="block group">
                <div
                  style={{
                    padding: "clamp(24px, 3vw, 32px)",
                    background: "rgba(14,32,45,0.6)",
                    border: "1px solid #1A3448",
                    height: "100%",
                    transition: "all 0.4s ease",
                  }}
                  className="group-hover:!border-[rgba(244,221,195,0.3)]"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(244,221,195,0.3)"; e.currentTarget.style.background = "rgba(14,32,45,0.9)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1A3448"; e.currentTarget.style.background = "rgba(14,32,45,0.6)"; }}
                >
                  <div style={{ marginBottom: "16px", opacity: 0.8 }}>
                    <ServiceIcon icon={service.icon} size={28} />
                  </div>
                  <h3
                    className="group-hover:text-[#F4DDC3] transition-colors"
                    style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#FFFFFF", fontSize: "14px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {service.shortTitle}
                  </h3>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px", lineHeight: 1.6 }}>
                    {service.shortDescription.substring(0, 100)}...
                  </p>
                  <span
                    className="group-hover:opacity-100"
                    style={{ display: "inline-block", marginTop: "12px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0, transition: "opacity 0.3s ease" }}
                  >
                    Learn More →
                  </span>
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
   SERVICE DETAIL ROW — Alternating layout
   ============================================ */
function ServiceDetailRow({ service, index }: { service: (typeof services)[number]; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <ScrollReveal delay={0.1}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }}
        className={isReversed ? "lg:!flex-row-reverse" : "lg:!flex-row"}
      >
        {/* Image */}
        <div style={{ width: "100%", flex: "1 1 0" }}>
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", border: "1px solid #1A3448" }}>
            <Image
              src={getServiceImg(service)}
              alt={service.title}
              fill
              style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
              className="group-hover:scale-105"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(14,32,45,0.3) 0%, rgba(14,32,45,0.1) 50%, rgba(14,32,45,0.5) 100%)" }} />
            {/* Number overlay */}
            <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 48px)", color: "rgba(244,221,195,0.15)", lineHeight: 1 }}>
                0{index + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ width: "100%", flex: "1 1 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <ServiceIcon icon={service.icon} size={20} />
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#F4DDC3" }}>
              {service.shortTitle}
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.2, marginBottom: "16px" }}>
            {service.title}
          </h2>

          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            {service.shortDescription}
          </p>

          {/* Advantages */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {service.advantages.slice(0, 4).map((adv, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4DDC3", flexShrink: 0, marginTop: "6px" }} />
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, fontSize: "13px", color: "#FFFFFF", lineHeight: 1.5 }}>
                  {adv.title}
                </span>
              </div>
            ))}
          </div>

          <Button href={`/services/${service.slug}`} variant="primary">
            Discover This Service
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ============================================
   STATS BAR
   ============================================ */
function StatsBar() {
  const stats = [
    { value: "8,500+", label: "Aircraft available" },
    { value: "24/7", label: "Dedicated support" },
    { value: "5,000+", label: "Airports served" },
    { value: "15 min", label: "Guaranteed response" },
  ];

  return (
    <section style={{ background: "#132A3A", borderTop: "1px solid rgba(244,221,195,0.08)", borderBottom: "1px solid rgba(244,221,195,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px, 6vw, 64px) 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}>
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <p style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F4DDC3", fontSize: "clamp(28px, 4vw, 40px)", marginBottom: "8px" }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION
   ============================================ */
function CtaSection() {
  return (
    <section style={{ position: "relative", padding: "clamp(60px, 10vw, 120px) 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <ScrollReveal>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
            AT YOUR SERVICE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "20px" }}>
            Have a Project? A Question?
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "40px" }}>
            Our team of advisors is available 24/7 to assist with all your requests
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
  );
}

/* ============================================
   PAGE
   ============================================ */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <StatsBar />

      {/* Detailed service rows */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(80px, 12vw, 140px)" }}>
            {services.map((service, index) => (
              <ServiceDetailRow key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
