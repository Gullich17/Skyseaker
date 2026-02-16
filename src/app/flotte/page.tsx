"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { fleet, categories, type Aircraft } from "@/data/fleet";

/* ============================================
   HERO
   ============================================ */
function FleetHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1510 60%, #0A0A0A 100%)",
        }}
      />
      <div
        className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.05]"
        style={{
          background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)",
        }}
      />
      <div className="relative z-10 w-full px-[5vw] pt-40 pb-20 text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[12px] uppercase tracking-[0.2em] mb-4"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 500,
            color: "#C9A96E",
          }}
        >
          NOTRE FLOTTE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[36px] md:text-[56px] mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            color: "#F5F5F0",
            lineHeight: 1.15,
          }}
        >
          Plus de 8 500 appareils
          <br />à votre disposition
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[18px] md:text-[22px]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            color: "#A0A0A0",
            maxWidth: "700px",
            margin: "0 auto",
          }}
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
      <Link
        href={`/flotte/${aircraft.categorySlug}/${aircraft.id}`}
        className="block group"
      >
        <motion.div
          className="overflow-hidden"
          style={{
            backgroundColor: "#141414",
            border: "1px solid #1E1E1E",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        >
          {/* Image Placeholder */}
          <div
            className="aspect-[16/9] relative overflow-hidden"
            style={{ background: "#1E1E1E" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="48"
                height="48"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="1"
                viewBox="0 0 24 24"
                className="opacity-20"
              >
                <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-60" />
            <div className="absolute top-3 left-3">
              <Badge>{aircraft.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3
              className="text-[20px] mb-1 group-hover:text-[#C9A96E] transition-colors"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                color: "#F5F5F0",
              }}
            >
              {aircraft.name}
            </h3>
            <p
              className="text-[13px] mb-4"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                color: "#6B6B6B",
              }}
            >
              {aircraft.manufacturer}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                {
                  label: "Passagers",
                  value: `${aircraft.passengers}`,
                  icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                },
                {
                  label: "Autonomie",
                  value: `${aircraft.range.toLocaleString("fr-FR")} km`,
                  icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
                },
                {
                  label: "Vitesse",
                  value: `${aircraft.speed} km/h`,
                  icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
                },
                {
                  label: "Bagages",
                  value: `${aircraft.baggage} m³`,
                  icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
                },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="shrink-0"
                  >
                    <path d={spec.icon} />
                  </svg>
                  <div>
                    <span
                      className="block text-[10px] uppercase tracking-[0.1em]"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 400,
                        color: "#6B6B6B",
                      }}
                    >
                      {spec.label}
                    </span>
                    <span
                      className="block text-[13px]"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 500,
                        color: "#F5F5F0",
                      }}
                    >
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <span
              className="text-[12px] uppercase tracking-[0.15em] text-[#C9A96E] group-hover:text-[#D4B978] transition-colors"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}
            >
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

  const filteredFleet =
    activeCategory === "tous"
      ? fleet
      : fleet.filter((a) => a.categorySlug === activeCategory);

  return (
    <>
      <FleetHero />

      {/* Filter + Grid */}
      <section
        className="section-padding"
        style={{ background: "#0A0A0A" }}
      >
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Category Tabs */}
          <div className="mb-12 overflow-x-auto pb-4 -mx-[5vw] px-[5vw] scrollbar-hide">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className="relative px-5 py-3 text-[12px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: activeCategory === cat.slug ? 600 : 400,
                    color:
                      activeCategory === cat.slug ? "#C9A96E" : "#6B6B6B",
                    background:
                      activeCategory === cat.slug
                        ? "rgba(201, 169, 110, 0.08)"
                        : "transparent",
                    border: `1px solid ${
                      activeCategory === cat.slug
                        ? "rgba(201, 169, 110, 0.3)"
                        : "#1E1E1E"
                    }`,
                  }}
                >
                  {cat.name}
                  {activeCategory === cat.slug && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: "#C9A96E" }}
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p
            className="mb-8 text-[13px]"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              color: "#6B6B6B",
            }}
          >
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
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFleet.map((aircraft, i) => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
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
