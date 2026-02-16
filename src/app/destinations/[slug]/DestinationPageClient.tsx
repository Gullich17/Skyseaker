"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { type Destination } from "@/data/destinations";
import { type Aircraft } from "@/data/fleet";

/* ============================================
   FAQ ITEM
   ============================================ */
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.08}>
      <div
        className="border-b"
        style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span
            className="text-[16px] pr-4 group-hover:text-[#C9A96E] transition-colors"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#F5F5F0",
            }}
          >
            {question}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            width="20"
            height="20"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="shrink-0"
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
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="overflow-hidden"
            >
              <p
                className="pb-5 text-[15px] leading-[1.8]"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                  color: "#A0A0A0",
                }}
              >
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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1510 60%, #0A0A0A 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "#1E1E1E" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="100"
              height="100"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="0.5"
              viewBox="0 0 24 24"
              className="opacity-5"
            >
              <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.6) 100%)",
          }}
        />

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
              href="/destinations"
              className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
            >
              Destinations
            </Link>
            <span className="text-[#6B6B6B]">/</span>
            <span className="text-[#A0A0A0]">{destination.name}</span>
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
            <Badge>{destination.region}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="text-[44px] md:text-[72px] mb-3"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#F5F5F0",
              lineHeight: 1.1,
            }}
          >
            {destination.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="text-[18px] mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              color: "#A0A0A0",
            }}
          >
            {destination.country}
          </motion.p>

          {/* Key Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="flex flex-wrap gap-8"
          >
            {[
              {
                label: "Temps de vol depuis Paris",
                value: destination.flightTimeFromParis,
                icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                label: "Aéroports",
                value: `${destination.airports.length} aéroport${destination.airports.length > 1 ? "s" : ""}`,
                icon: "M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18",
              },
              {
                label: "Fuseau horaire",
                value: content.timezone,
                icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
              },
              {
                label: "À partir de",
                value: `${destination.priceFrom}€`,
                icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
              },
            ].map((info) => (
              <div key={info.label} className="flex items-center gap-3">
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
                    <path d={info.icon} />
                  </svg>
                </div>
                <div>
                  <span
                    className="block text-[10px] uppercase tracking-[0.1em]"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 400,
                      color: "#6B6B6B",
                    }}
                  >
                    {info.label}
                  </span>
                  <span
                    className="block text-[15px]"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 500,
                      color: "#F5F5F0",
                    }}
                  >
                    {info.value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Text + Info */}
      <section className="section-padding" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left - SEO Text */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <SectionTitle
                  preTitle={`VOL PRIVÉ ${destination.name.toUpperCase()}`}
                  title={`Votre vol en jet privé vers ${destination.name}`}
                  className="mb-8"
                />
                <div
                  className="text-[15px] leading-[1.9]"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 300,
                    color: "#A0A0A0",
                  }}
                >
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
                    <p key={i} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Info sidebar */}
            <div>
              <ScrollReveal delay={0.15}>
                <div
                  className="p-6 sticky top-32"
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
                    Informations clés
                  </h3>

                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
                    >
                      <span
                        className="text-[12px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 400,
                          color: "#6B6B6B",
                        }}
                      >
                        Temps de vol
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 500,
                          color: "#F5F5F0",
                        }}
                      >
                        {destination.flightTimeFromParis}
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
                    >
                      <span
                        className="text-[12px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 400,
                          color: "#6B6B6B",
                        }}
                      >
                        Fuseau horaire
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 500,
                          color: "#F5F5F0",
                        }}
                      >
                        {content.timezone}
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
                    >
                      <span
                        className="text-[12px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 400,
                          color: "#6B6B6B",
                        }}
                      >
                        Fourchette de prix
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 500,
                          color: "#C9A96E",
                        }}
                      >
                        {content.priceRange}€
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "rgba(30, 30, 30, 0.8)" }}
                    >
                      <span
                        className="text-[12px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 400,
                          color: "#6B6B6B",
                        }}
                      >
                        Région
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 500,
                          color: "#F5F5F0",
                        }}
                      >
                        {destination.region}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      href={`/devis?destination=${destination.id}`}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Airports Section */}
      <section className="section-padding" style={{ background: "#141414" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionTitle
            preTitle="AÉROPORTS"
            title={`Aéroports desservis à ${destination.name}`}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.airports.map((airport, i) => (
              <ScrollReveal key={airport.code} delay={i * 0.1}>
                <div
                  className="p-6"
                  style={{
                    backgroundColor: "#0A0A0A",
                    border: "1px solid #1E1E1E",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{
                        background: "rgba(201, 169, 110, 0.05)",
                        border: "1px solid rgba(201, 169, 110, 0.2)",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        fill="none"
                        stroke="#C9A96E"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
                      </svg>
                    </div>
                    <Badge>{airport.code}</Badge>
                  </div>
                  <h4
                    className="text-[18px] mb-2"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 600,
                      color: "#F5F5F0",
                    }}
                  >
                    {airport.name}
                  </h4>
                  <p
                    className="text-[13px]"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 300,
                      color: "#6B6B6B",
                    }}
                  >
                    Code OACI : {airport.code}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Aircraft */}
      {recommendedFleet.length > 0 && (
        <section className="section-padding" style={{ background: "#0A0A0A" }}>
          <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <SectionTitle
              preTitle="APPAREILS RECOMMANDÉS"
              title={`Les jets idéaux pour ${destination.name}`}
              centered
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedFleet.map((aircraft, i) => (
                <ScrollReveal key={aircraft.id} delay={i * 0.1}>
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
                          <Badge>{aircraft.category}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4
                          className="text-[18px] mb-2 group-hover:text-[#C9A96E] transition-colors"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 600,
                            color: "#F5F5F0",
                          }}
                        >
                          {aircraft.name}
                        </h4>
                        <div
                          className="flex items-center gap-4 text-[12px]"
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 300,
                            color: "#A0A0A0",
                          }}
                        >
                          <span>{aircraft.passengers} pax</span>
                          <span className="w-[1px] h-3 bg-[#1E1E1E]" />
                          <span>
                            {aircraft.range.toLocaleString("fr-FR")} km
                          </span>
                          <span className="w-[1px] h-3 bg-[#1E1E1E]" />
                          <span>{aircraft.speed} km/h</span>
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

      {/* FAQ Section */}
      <section className="section-padding" style={{ background: "#141414" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionTitle
            preTitle="QUESTIONS FRÉQUENTES"
            title={`Tout savoir sur les vols vers ${destination.name}`}
            centered
            className="mb-12"
          />
          <div>
            {content.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
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
              "radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative px-[5vw] text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <ScrollReveal>
            <h2
              className="text-[32px] md:text-[48px] mb-4"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                color: "#F5F5F0",
              }}
            >
              Envolez-vous vers {destination.name}
            </h2>
            <p
              className="text-[20px] mb-3"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "#A0A0A0",
              }}
            >
              Paris → {destination.name} en {destination.flightTimeFromParis}
            </p>
            <p
              className="text-[16px] mb-10"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                color: "#6B6B6B",
              }}
            >
              À partir de {destination.priceFrom}€ en aller simple
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={`/devis?destination=${destination.id}`}
                variant="primary"
                size="lg"
              >
                Réserver ce vol
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Nous appeler
              </Button>
            </div>
            <p
              className="mt-6 text-[12px]"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                color: "#6B6B6B",
              }}
            >
              Réponse sous 30 minutes &bull; Disponible 24/7
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
