"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Yacht } from "@/data/yachts";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

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
  const t = useTranslations("yachts.yachtDetail");
  const locale = useLocale() as Locale;
  const heroImg = yacht.image;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = [heroImg, ...yacht.gallery];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* ====== LIGHTBOX ====== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              style={{ position: "absolute", top: "20px", right: "20px", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", cursor: "pointer", zIndex: 10 }}
            >
              <svg width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length); }}
              style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", cursor: "pointer", zIndex: 10 }}
            >
              <svg width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allImages.length); }}
              style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", cursor: "pointer", zIndex: 10 }}
            >
              <svg width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Image */}
            <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", width: "100%", aspectRatio: "16/10" }}>
              <Image
                src={allImages[lightboxIndex]}
                alt={`${yacht.name} - Photo ${lightboxIndex + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
              />
            </div>

            {/* Counter */}
            <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#6B6B6B" }}>
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== HERO ====== */}
      <section style={{ position: "relative", minHeight: "clamp(420px, 65vh, 720px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={heroImg} alt={yacht.name} fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.6) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 15vh, 160px) 24px clamp(32px, 5vw, 56px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} style={{ marginBottom: "12px" }}>
            <Badge>{yacht.category}</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, fontSize: "clamp(36px, 6vw, 64px)", marginBottom: "8px" }}>
            {yacht.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontSize: "clamp(14px, 2vw, 16px)", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
            {yacht.builder} &middot; {t("since", { year: yacht.yearBuilt })}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 32px)", marginTop: "clamp(24px, 4vw, 36px)" }}>
            {[
              { label: t("specs.guests"), value: `${yacht.guests}` },
              { label: t("specs.length"), value: `${yacht.length} m` },
              { label: t("specs.maximumSpeed"), value: yacht.maxSpeed ? `${yacht.maxSpeed} kts` : "-" },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{ display: "block", fontSize: "clamp(22px, 3.5vw, 28px)", fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "#F4DDC3" }}>{stat.value}</span>
                <span style={{ display: "block", fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== BREADCRUMB ====== */}
      <nav style={{ background: "#0E202D", borderBottom: "1px solid rgba(26,52,72,0.6)", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px", fontSize: "clamp(11px, 1.4vw, 13px)", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
          <Link href="/yachts" style={{ color: "#6B6B6B", textDecoration: "none" }}>Yachts</Link>
          <span style={{ color: "rgba(107,107,107,0.5)" }}>/</span>
          <Link href={`/yachts/${yacht.categorySlug}`} style={{ color: "#6B6B6B", textDecoration: "none" }}>{yacht.category}</Link>
          <span style={{ color: "rgba(107,107,107,0.5)" }}>/</span>
          <span style={{ color: "#A0A0A0" }}>{yacht.name}</span>
        </div>
      </nav>

      {/* ====== DESCRIPTION + SPECS ====== */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 64px)" }}>
            <div>
              <ScrollReveal>
                <SectionTitle preTitle={t("overview")} title={t("aboutThisYacht")} mb="clamp(24px, 4vw, 36px)" />
                <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: 1.8, fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", marginBottom: "clamp(32px, 5vw, 48px)" }}>
                  {tData(yacht.description, locale)}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3", marginBottom: "16px" }}>
                  {t("idealFor")}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {yacht.idealFor.map((use, idx) => (
                    <div key={idx} style={{ padding: "8px 16px", fontSize: "clamp(12px, 1.5vw, 13px)", fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#FFFFFF", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.15)", borderRadius: "2px" }}>
                      {tData(use, locale)}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.15}>
                <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px" }}>
                  <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3", marginBottom: "16px" }}>
                    {t("technicalSpecifications")}
                  </h3>
                  <SpecRow label={t("specs.guests")} value={`${yacht.guests}`} icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  <SpecRow label={t("specs.cabins")} value={`${yacht.cabins}`} icon="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  <SpecRow label={t("specs.crew")} value={`${yacht.crew}`} icon="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  <SpecRow label={t("specs.length")} value={`${yacht.length} m`} icon="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  <SpecRow label={t("specs.beam")} value={`${yacht.beam} m`} icon="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  <SpecRow label={t("specs.cruisingSpeed")} value={`${yacht.cruisingSpeed} kts`} icon="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <SpecRow label={t("specs.maximumSpeed")} value={yacht.maxSpeed ? `${yacht.maxSpeed} kts` : "-"} icon="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  <SpecRow label={t("specs.engines")} value={yacht.engines} icon="M11.42 15.17l-5.1-5.1M11.42 15.17l2.15-2.16a2 2 0 012.83 0l3.07 3.07a2 2 0 010 2.83l-2.16 2.15a2 2 0 01-2.83 0l-3.07-3.07a2 2 0 010-2.83zM11.42 15.17L4.25 8a2 2 0 010-2.83L5.67 3.75a2 2 0 012.83 0l7.17 7.17" />
                  <SpecRow label={t("specs.builder")} value={yacht.builder} icon="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  <SpecRow label={t("specs.yearBuilt")} value={`${yacht.yearBuilt}`} icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PHOTO GALLERY ====== */}
      {yacht.gallery.length > 0 && (
        <section style={{ background: "#132A3A", padding: "clamp(60px, 10vw, 100px) 0", borderTop: "1px solid rgba(244,221,195,0.08)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <ScrollReveal>
              <SectionTitle preTitle={t("gallery.preTitle")} title={t("gallery.title")} centered mb="clamp(32px, 5vw, 48px)" />
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {yacht.gallery.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div
                    onClick={() => openLightbox(i + 1)}
                    className="group"
                    style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", border: "1px solid #1A3448", cursor: "pointer" }}
                  >
                    <Image
                      src={img}
                      alt={`${yacht.name} - Photo ${i + 1}`}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                      className="group-hover:scale-105"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.3) 0%, transparent 50%)" }} />
                    <div
                      className="group-hover:opacity-100"
                      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(244,221,195,0.15)", border: "1px solid rgba(244,221,195,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== CTA ====== */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 100px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0E202D 0%, #0d1218 50%, #0E202D 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 4.5vw, 44px)", marginBottom: "16px", lineHeight: 1.15 }}>
              {t("cta.title", { name: yacht.name })}
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 18px)", marginBottom: "clamp(32px, 5vw, 48px)", lineHeight: 1.6 }}>
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "12px" }}>
              <Button href="/devis" variant="primary" size="lg">{t("cta.bookThisYacht")}</Button>
              <Button href="/yachts/comparateur" variant="secondary">{t("cta.compareWithOthers")}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== SIMILAR YACHTS ====== */}
      {similarYachts.length > 0 && (
        <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <SectionTitle preTitle={t("similar.preTitle")} title={t("similar.title")} centered mb="clamp(40px, 5vw, 56px)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
              {similarYachts.map((similar, i) => (
                <ScrollReveal key={similar.id} delay={i * 0.1}>
                  <Link href={`/yachts/${similar.categorySlug}/${similar.id}`} className="block group">
                    <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
                      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                        <Image src={similar.image} alt={similar.name} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} className="group-hover:scale-105" />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,42,58,0.7) 0%, transparent 50%)" }} />
                        <div style={{ position: "absolute", top: "12px", left: "12px" }}><Badge>{similar.category}</Badge></div>
                      </div>
                      <div style={{ padding: "clamp(16px, 2.5vw, 20px)" }}>
                        <h3 className="group-hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(16px, 2vw, 18px)", marginBottom: "8px" }}>
                          {similar.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "clamp(10px, 1.3vw, 12px)", color: "#A0A0A0", flexWrap: "wrap" }}>
                          <span>{similar.guests} {t("specs.guests").toLowerCase()}</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                          <span>{similar.length} m</span>
                          <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                          <span>{similar.maxSpeed ?? "-"} kts</span>
                        </div>
                        <span style={{ display: "block", marginTop: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                          View details &rarr;
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
