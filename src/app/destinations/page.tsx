"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { destinations, regions, type Destination } from "@/data/destinations";

/* ============================================
   HERO
   ============================================ */
function DestinationsHero() {
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
          background:
            "linear-gradient(90deg, transparent, #C9A96E, transparent)",
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
          DESTINATIONS
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
          Le monde à portée de vol
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
          Explorez nos destinations phares et envolez-vous vers les plus belles
          adresses du globe
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   WORLD MAP
   ============================================ */
function WorldMap() {
  // Map coordinates to viewport positions (simple Mercator-like projection)
  const mapDestination = (dest: Destination) => {
    // Map lng (-180 to 180) to x (5% to 95%)
    const x = ((dest.coordinates.lng + 180) / 360) * 90 + 5;
    // Map lat (90 to -90) to y (5% to 95%) - inverted because y goes down
    const y = ((90 - dest.coordinates.lat) / 180) * 90 + 5;
    return { x, y };
  };

  return (
    <section className="section-padding" style={{ background: "#141414" }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionTitle
          preTitle="CARTE MONDIALE"
          title="Notre réseau de destinations"
          centered
          className="mb-12"
        />
        <ScrollReveal>
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "2 / 1",
              background: "#0A0A0A",
              border: "1px solid #1E1E1E",
            }}
          >
            {/* Grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  top: `${((i + 1) * 100) / 8}%`,
                  background: "rgba(30, 30, 30, 0.5)",
                }}
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-[1px]"
                style={{
                  left: `${((i + 1) * 100) / 12}%`,
                  background: "rgba(30, 30, 30, 0.5)",
                }}
              />
            ))}

            {/* Paris marker (origin) */}
            <div
              className="absolute"
              style={{
                left: `${((2.3522 + 180) / 360) * 90 + 5}%`,
                top: `${((90 - 48.8566) / 180) * 90 + 5}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: "#C9A96E",
                    boxShadow: "0 0 20px rgba(201, 169, 110, 0.6)",
                  }}
                />
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px]"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    color: "#C9A96E",
                  }}
                >
                  Paris
                </div>
              </div>
            </div>

            {/* Destination dots */}
            {destinations.map((dest, i) => {
              const pos = mapDestination(dest);
              return (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="absolute group"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    }}
                    className="relative"
                  >
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                      style={{
                        background: "rgba(201, 169, 110, 0.3)",
                      }}
                    />
                    {/* Dot */}
                    <div
                      className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{
                        background: dest.popular
                          ? "#D4B978"
                          : "rgba(201, 169, 110, 0.5)",
                        boxShadow: "0 0 10px rgba(201, 169, 110, 0.4)",
                      }}
                    />
                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap px-3 py-1.5"
                      style={{
                        background: "#141414",
                        border: "1px solid #C9A96E",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#F5F5F0",
                      }}
                    >
                      {dest.name}
                      <span className="text-[#6B6B6B] ml-1">
                        {dest.flightTimeFromParis}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}

            {/* Connection lines from Paris */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {destinations.map((dest, i) => {
                const parisX = ((2.3522 + 180) / 360) * 90 + 5;
                const parisY = ((90 - 48.8566) / 180) * 90 + 5;
                const pos = mapDestination(dest);
                return (
                  <motion.line
                    key={dest.id}
                    x1={`${parisX}%`}
                    y1={`${parisY}%`}
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="rgba(201, 169, 110, 0.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      delay: 1 + i * 0.1,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATION CARD
   ============================================ */
function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link
        href={`/destinations/${destination.id}`}
        className="block group relative overflow-hidden aspect-[4/5]"
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: "#1E1E1E" }}
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="0.5"
              viewBox="0 0 24 24"
              className="opacity-10"
            >
              <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
          }}
        />

        {/* Popular badge */}
        {destination.popular && (
          <div className="absolute top-4 right-4 z-10">
            <Badge>Populaire</Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3
            className="text-[26px] mb-1"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#F5F5F0",
            }}
          >
            {destination.name}
          </h3>
          <p
            className="text-[14px] mb-3"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              color: "#A0A0A0",
            }}
          >
            {destination.country}
          </p>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span
                className="text-[12px]"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 400,
                  color: "#C9A96E",
                }}
              >
                {destination.flightTimeFromParis} depuis Paris
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[13px]"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                color: "#6B6B6B",
              }}
            >
              À partir de{" "}
              <span className="text-[#C9A96E] font-medium">
                {destination.priceFrom}€
              </span>
            </span>
            <span
              className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}
            >
              Découvrir →
            </span>
          </div>
        </div>

        <div className="absolute inset-0 border border-[#C9A96E] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <WorldMap />

      {/* Destinations by Region */}
      {regions.map((region) => {
        const regionDestinations = destinations.filter(
          (d) => d.region === region
        );
        if (regionDestinations.length === 0) return null;

        return (
          <section
            key={region}
            className="section-padding"
            style={{
              background:
                regions.indexOf(region) % 2 === 0 ? "#0A0A0A" : "#141414",
            }}
          >
            <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <SectionTitle
                preTitle={region.toUpperCase()}
                title={`Nos destinations en ${region}`}
                className="mb-12"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionDestinations.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
              Votre destination n&apos;est pas listée ?
            </h2>
            <p
              className="text-[18px] mb-10"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "#A0A0A0",
              }}
            >
              Nous organisons des vols vers plus de 5 000 aéroports dans le
              monde entier
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/devis" variant="primary" size="lg">
                Demander un devis
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Nous appeler
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
