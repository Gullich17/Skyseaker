"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";
import type { Translatable } from "@/lib/i18n-data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Aircraft } from "@/data/fleet";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   IMAGE HELPERS
   ============================================ */
const categoryImages: Record<string, string> = {
  "very-light-jet": "/images/fleet/phenom-100/main.png",
  "light-jet": "/images/fleet/phenom-300/main.png",
  "super-light-jet": "/images/fleet/pilatus-pc-24/main.png",
  "midsize-jet": "/images/fleet/citation-vi/main.png",
  "super-midsize-jet": "/images/fleet/challenger-350/gallery-5.png",
  "heavy-jet": "/images/fleet/falcon-900lx/main.png",
  "ultra-long-range": "/images/fleet/gulfstream-g650er/main.png",
  "vip-airliner": "/images/fleet/global-7500/main.png",
  "helicoptere": "/images/fleet/agusta-109/gallery-1.jpg",
  "turbopropulseur": "/images/fleet/pilatus-pc-12/main.png",
};

function getAircraftImage(a: Aircraft): string {
  if (a.image?.startsWith("http")) return a.image;
  return categoryImages[a.categorySlug] || categoryImages["light-jet"];
}

/* ============================================
   AIRCRAFT CARD
   ============================================ */
function AircraftCard({ aircraft, index }: { aircraft: Aircraft; index: number }) {
  const tc = useTranslations("common");
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/flotte/${aircraft.categorySlug}/${aircraft.id}`} className="block group">
        <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
            <Image
              src={getAircraftImage(aircraft)}
              alt={aircraft.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
              className="group-hover:scale-105"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,42,58,0.7) 0%, transparent 50%)" }} />
          </div>
          {/* Content */}
          <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
            <h3
              className="group-hover:text-[#F4DDC3] transition-colors"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(18px, 2.5vw, 22px)", marginBottom: "8px" }}
            >
              {aircraft.name}
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "12px", marginBottom: "16px" }}>
              {aircraft.manufacturer}
            </p>
            {/* Specs row */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#A0A0A0", fontSize: "12px" }}>
                  {aircraft.passengers} pax
                </span>
              </div>
              <span style={{ width: "1px", height: "12px", background: "#1A3448" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#A0A0A0", fontSize: "12px" }}>
                {aircraft.range.toLocaleString("en-US")} km
              </span>
              <span style={{ width: "1px", height: "12px", background: "#1A3448" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#A0A0A0", fontSize: "12px" }}>
                {aircraft.speed} km/h
              </span>
            </div>
            <span
              className="group-hover:opacity-100"
              style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0.6, transition: "opacity 0.3s ease" }}
            >
              {tc("viewDetails")}
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   MAIN CLIENT COMPONENT
   ============================================ */
export default function FleetCategoryClient({
  category,
  aircraftList,
}: {
  category: { name: Translatable; slug: string };
  aircraftList: Aircraft[];
}) {
  const t = useTranslations("fleet.category");
  const locale = useLocale() as Locale;
  const heroImg = categoryImages[category.slug] || categoryImages["light-jet"];
  const catName = tData(category.name, locale);
  const desc = t.has(`descriptions.${category.slug}`) ? t(`descriptions.${category.slug}`) : "";

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "clamp(400px, 55vh, 560px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={heroImg} alt={catName} fill className="object-cover" priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.6) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 14vh, 160px) 24px clamp(40px, 6vw, 64px)" }}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
          >
            <Link href="/flotte" className="transition-colors" style={{ color: "#6B6B6B" }}>{t("breadcrumb.fleet")}</Link>
            <span style={{ color: "#6B6B6B" }}>/</span>
            <span style={{ color: "#A0A0A0" }}>{catName}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{ marginBottom: "16px" }}
          >
            <Badge>{t("aircraftCount", { count: aircraftList.length })}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, fontSize: "clamp(32px, 6vw, 60px)", marginBottom: "16px" }}
          >
            {catName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", maxWidth: "700px" }}
          >
            {desc}
          </motion.p>
        </div>
      </section>

      {/* Aircraft grid */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Count */}
          <p style={{ marginBottom: "32px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {t("resultsCount", { count: aircraftList.length })}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}>
            {aircraftList.map((aircraft, i) => (
              <AircraftCard key={aircraft.id} aircraft={aircraft} index={i} />
            ))}
          </div>

          {/* Back + CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "clamp(48px, 8vw, 80px)" }}>
            <Button href="/flotte" variant="secondary">
              {t("cta.backToFleet")}
            </Button>
            <Button href="/devis" variant="primary" size="lg">
              {t("cta.requestQuote")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
