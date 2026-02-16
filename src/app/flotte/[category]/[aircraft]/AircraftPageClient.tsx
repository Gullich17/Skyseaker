"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Aircraft } from "@/data/fleet";

/* ============================================
   SPEC ROW
   ============================================ */
function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div
      className="flex items-center gap-4 py-4 border-b"
      style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0"
        style={{
          background: "rgba(201, 169, 110, 0.05)",
          border: "1px solid rgba(201, 169, 110, 0.2)",
        }}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="#C9A96E"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d={icon} />
        </svg>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span
          className="text-[13px]"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 400,
            color: "#6B6B6B",
          }}
        >
          {label}
        </span>
        <span
          className="text-[15px]"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 500,
            color: "#F5F5F0",
          }}
        >
          {value}
        </span>
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
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
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
            background:
              "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)",
          }}
        />

        {/* Image placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "#1E1E1E" }}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="0.5"
            viewBox="0 0 24 24"
            className="opacity-10"
          >
            <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
          </svg>
        </div>

        <div className="relative z-10 w-full px-[5vw] pb-16 pt-40" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="flex items-center gap-2 mb-6 text-[12px]"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
            }}
          >
            <Link
              href="/flotte"
              className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
            >
              Flotte
            </Link>
            <span className="text-[#6B6B6B]">/</span>
            <Link
              href={`/flotte?category=${aircraft.categorySlug}`}
              className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
            >
              {aircraft.category}
            </Link>
            <span className="text-[#6B6B6B]">/</span>
            <span className="text-[#A0A0A0]">{aircraft.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="mb-4"
          >
            <Badge>{aircraft.category}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="text-[40px] md:text-[64px] mb-3"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#F5F5F0",
              lineHeight: 1.1,
            }}
          >
            {aircraft.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="text-[16px]"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              color: "#A0A0A0",
            }}
          >
            {aircraft.manufacturer} &middot; Depuis {aircraft.yearIntroduced}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="flex flex-wrap gap-6 mt-8"
          >
            {[
              { label: "Passagers", value: `${aircraft.passengers}` },
              {
                label: "Autonomie",
                value: `${aircraft.range.toLocaleString("fr-FR")} km`,
              },
              { label: "Vitesse max", value: `${aircraft.speed} km/h` },
            ].map((stat) => (
              <div key={stat.label}>
                <span
                  className="block text-[28px]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    color: "#C9A96E",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="block text-[11px] uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 500,
                    color: "#6B6B6B",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Description + Specs */}
      <section className="section-padding" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Description */}
            <div>
              <ScrollReveal>
                <SectionTitle
                  preTitle="PRÉSENTATION"
                  title="À propos de cet appareil"
                  className="mb-8"
                />
                <p
                  className="text-[16px] leading-[1.8] mb-10"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 300,
                    color: "#A0A0A0",
                  }}
                >
                  {aircraft.description}
                </p>
              </ScrollReveal>

              {/* Ideal For */}
              <ScrollReveal delay={0.1}>
                <h3
                  className="text-[14px] uppercase tracking-[0.15em] mb-5"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    color: "#C9A96E",
                  }}
                >
                  Idéal pour
                </h3>
                <div className="flex flex-wrap gap-3">
                  {aircraft.idealFor.map((use) => (
                    <div
                      key={use}
                      className="px-4 py-2 text-[13px]"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 400,
                        color: "#F5F5F0",
                        background: "rgba(201, 169, 110, 0.06)",
                        border: "1px solid rgba(201, 169, 110, 0.15)",
                      }}
                    >
                      {use}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Specs Table */}
            <div>
              <ScrollReveal delay={0.15}>
                <div
                  className="p-6 md:p-8"
                  style={{
                    backgroundColor: "#141414",
                    border: "1px solid #1E1E1E",
                  }}
                >
                  <h3
                    className="text-[14px] uppercase tracking-[0.15em] mb-6"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 600,
                      color: "#C9A96E",
                    }}
                  >
                    Caractéristiques techniques
                  </h3>

                  <SpecRow
                    label="Passagers"
                    value={`${aircraft.passengers} places`}
                    icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                  <SpecRow
                    label="Autonomie"
                    value={`${aircraft.range.toLocaleString("fr-FR")} km`}
                    icon="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                  <SpecRow
                    label="Vitesse maximale"
                    value={`${aircraft.speed} km/h`}
                    icon="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                  <SpecRow
                    label="Longueur cabine"
                    value={`${aircraft.cabinLength} m`}
                    icon="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                  <SpecRow
                    label="Hauteur cabine"
                    value={`${aircraft.cabinHeight} m`}
                    icon="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                  <SpecRow
                    label="Volume bagages"
                    value={`${aircraft.baggage} m³`}
                    icon="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                  <SpecRow
                    label="Motorisation"
                    value={aircraft.engines}
                    icon="M11.42 15.17l-5.1-5.1M11.42 15.17l2.15-2.16a2 2 0 012.83 0l3.07 3.07a2 2 0 010 2.83l-2.16 2.15a2 2 0 01-2.83 0l-3.07-3.07a2 2 0 010-2.83zM11.42 15.17L4.25 8a2 2 0 010-2.83L5.67 3.75a2 2 0 012.83 0l7.17 7.17"
                  />
                  {aircraft.takeoffDistance > 0 && (
                    <SpecRow
                      label="Distance de décollage"
                      value={`${aircraft.takeoffDistance.toLocaleString("fr-FR")} m`}
                      icon="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18"
                    />
                  )}
                  <SpecRow
                    label="Année d'introduction"
                    value={`${aircraft.yearIntroduced}`}
                    icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #0A0A0A 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative px-[5vw] text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <ScrollReveal>
            <h2
              className="text-[32px] md:text-[44px] mb-6"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                color: "#F5F5F0",
              }}
            >
              Réserver le {aircraft.name}
            </h2>
            <p
              className="text-[18px] mb-10"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "#A0A0A0",
              }}
            >
              Nos experts sont disponibles 24/7 pour organiser votre vol à bord
              de cet appareil
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/devis" variant="primary" size="lg">
                Réserver cet appareil
              </Button>
              <Button href="/flotte/comparateur" variant="secondary">
                Comparer avec d&apos;autres
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Similar Aircraft */}
      {similarAircraft.length > 0 && (
        <section className="section-padding" style={{ background: "#0A0A0A" }}>
          <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <SectionTitle
              preTitle="APPAREILS SIMILAIRES"
              title="Découvrez aussi"
              centered
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarAircraft.map((similar, i) => (
                <ScrollReveal key={similar.id} delay={i * 0.1}>
                  <Link
                    href={`/flotte/${similar.categorySlug}/${similar.id}`}
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
                      <div
                        className="aspect-[16/9] relative"
                        style={{ background: "#1E1E1E" }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            width="40"
                            height="40"
                            fill="none"
                            stroke="#C9A96E"
                            strokeWidth="1"
                            viewBox="0 0 24 24"
                            className="opacity-20"
                          >
                            <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
                          </svg>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge>{similar.category}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3
                          className="text-[18px] mb-2 group-hover:text-[#C9A96E] transition-colors"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 600,
                            color: "#F5F5F0",
                          }}
                        >
                          {similar.name}
                        </h3>
                        <div
                          className="flex items-center gap-4 text-[12px]"
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 300,
                            color: "#A0A0A0",
                          }}
                        >
                          <span>{similar.passengers} pax</span>
                          <span className="w-[1px] h-3 bg-[#1E1E1E]" />
                          <span>
                            {similar.range.toLocaleString("fr-FR")} km
                          </span>
                          <span className="w-[1px] h-3 bg-[#1E1E1E]" />
                          <span>{similar.speed} km/h</span>
                        </div>
                        <span
                          className="block mt-4 text-[12px] uppercase tracking-[0.15em] text-[#C9A96E]"
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 500,
                          }}
                        >
                          Voir la fiche →
                        </span>
                      </div>
                    </motion.div>
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
