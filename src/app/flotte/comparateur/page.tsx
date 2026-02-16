"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { fleet, type Aircraft } from "@/data/fleet";

/* ============================================
   AIRCRAFT SELECT DROPDOWN
   ============================================ */
function AircraftSelect({
  value,
  onChange,
  index,
}: {
  value: string;
  onChange: (id: string) => void;
  index: number;
}) {
  return (
    <div className="flex-1">
      <label
        className="block text-[10px] uppercase tracking-[0.15em] mb-2"
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 500,
          color: "#6B6B6B",
        }}
      >
        Appareil {index + 1}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-[14px] bg-transparent border appearance-none"
        style={{
          borderColor: value ? "#C9A96E" : "#1E1E1E",
          color: value ? "#F5F5F0" : "#6B6B6B",
          fontFamily: "var(--font-montserrat)",
          fontWeight: 300,
          backgroundColor: "#141414",
        }}
      >
        <option value="" style={{ background: "#141414" }}>
          Sélectionner un appareil
        </option>
        {fleet.map((a) => (
          <option key={a.id} value={a.id} style={{ background: "#141414" }}>
            {a.name} — {a.category}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ============================================
   COMPARISON ROW
   ============================================ */
function ComparisonRow({
  label,
  values,
  unit,
  highlight,
}: {
  label: string;
  values: (string | number | null)[];
  unit?: string;
  highlight?: "max" | "min" | "none";
}) {
  const numericValues = values.map((v) =>
    typeof v === "number" ? v : null
  );
  const validNums = numericValues.filter((n): n is number => n !== null);
  const best =
    highlight === "max"
      ? Math.max(...validNums)
      : highlight === "min"
        ? Math.min(...validNums)
        : null;

  return (
    <div
      className="grid items-center gap-4 py-4 border-b"
      style={{
        gridTemplateColumns: `200px repeat(${values.length}, 1fr)`,
        borderColor: "rgba(30, 30, 30, 0.8)",
      }}
    >
      <span
        className="text-[12px] uppercase tracking-[0.1em]"
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 500,
          color: "#6B6B6B",
        }}
      >
        {label}
      </span>
      {values.map((val, i) => {
        const isBest =
          best !== null && typeof val === "number" && val === best;
        return (
          <span
            key={i}
            className="text-[15px] text-center"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: isBest ? 600 : 400,
              color: isBest ? "#C9A96E" : val ? "#F5F5F0" : "#1E1E1E",
            }}
          >
            {val !== null && val !== undefined ? (
              <>
                {typeof val === "number" ? val.toLocaleString("fr-FR") : val}
                {unit && (
                  <span className="text-[11px] text-[#6B6B6B] ml-1">
                    {unit}
                  </span>
                )}
              </>
            ) : (
              "—"
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function ComparateurPage() {
  const [selections, setSelections] = useState<string[]>(["", "", ""]);

  const selectedAircraft: (Aircraft | null)[] = selections.map(
    (id) => fleet.find((a) => a.id === id) ?? null
  );

  const updateSelection = (index: number, id: string) => {
    const newSelections = [...selections];
    newSelections[index] = id;
    setSelections(newSelections);
  };

  const hasSelection = selectedAircraft.some((a) => a !== null);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 w-full px-[5vw] pt-40 pb-16 text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            Comparateur de jets
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
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              color: "#A0A0A0",
            }}
          >
            Comparez jusqu&apos;à 3 appareils pour trouver celui qui correspond
            à votre mission
          </motion.p>
        </div>
      </section>

      {/* Comparator */}
      <section className="section-padding" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Selectors */}
          <ScrollReveal>
            <div
              className="p-6 md:p-8 mb-12"
              style={{
                backgroundColor: "#141414",
                border: "1px solid #1E1E1E",
              }}
            >
              <p
                className="text-[12px] uppercase tracking-[0.15em] mb-6"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  color: "#C9A96E",
                }}
              >
                Sélectionnez vos appareils
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                {selections.map((sel, i) => (
                  <AircraftSelect
                    key={i}
                    value={sel}
                    onChange={(id) => updateSelection(i, id)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Aircraft Headers */}
          {hasSelection && (
            <ScrollReveal>
              <div
                className="grid gap-4 mb-8"
                style={{
                  gridTemplateColumns: `200px repeat(${selectedAircraft.length}, 1fr)`,
                }}
              >
                <div />
                {selectedAircraft.map((a, i) => (
                  <div key={i} className="text-center">
                    {a ? (
                      <>
                        {/* Image placeholder */}
                        <div
                          className="aspect-[16/9] relative mb-4 overflow-hidden"
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
                        </div>
                        <h3
                          className="text-[18px] mb-2"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 600,
                            color: "#F5F5F0",
                          }}
                        >
                          {a.name}
                        </h3>
                        <Badge>{a.category}</Badge>
                      </>
                    ) : (
                      <div
                        className="aspect-[16/9] flex items-center justify-center mb-4"
                        style={{
                          background: "#141414",
                          border: "1px dashed #1E1E1E",
                        }}
                      >
                        <span
                          className="text-[12px]"
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            color: "#6B6B6B",
                          }}
                        >
                          Non sélectionné
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Comparison Table */}
          {hasSelection && (
            <ScrollReveal delay={0.1}>
              <div
                className="p-6 md:p-8 overflow-x-auto"
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

                <div style={{ minWidth: "600px" }}>
                  <ComparisonRow
                    label="Constructeur"
                    values={selectedAircraft.map((a) => a?.manufacturer ?? null)}
                  />
                  <ComparisonRow
                    label="Catégorie"
                    values={selectedAircraft.map((a) => a?.category ?? null)}
                  />
                  <ComparisonRow
                    label="Passagers"
                    values={selectedAircraft.map((a) => a?.passengers ?? null)}
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Autonomie"
                    values={selectedAircraft.map((a) => a?.range ?? null)}
                    unit="km"
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Vitesse"
                    values={selectedAircraft.map((a) => a?.speed ?? null)}
                    unit="km/h"
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Longueur cabine"
                    values={selectedAircraft.map((a) => a?.cabinLength ?? null)}
                    unit="m"
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Hauteur cabine"
                    values={selectedAircraft.map((a) => a?.cabinHeight ?? null)}
                    unit="m"
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Bagages"
                    values={selectedAircraft.map((a) => a?.baggage ?? null)}
                    unit="m³"
                    highlight="max"
                  />
                  <ComparisonRow
                    label="Moteurs"
                    values={selectedAircraft.map((a) => a?.engines ?? null)}
                  />
                  <ComparisonRow
                    label="Distance décollage"
                    values={selectedAircraft.map(
                      (a) => a?.takeoffDistance ?? null
                    )}
                    unit="m"
                    highlight="min"
                  />
                  <ComparisonRow
                    label="Année introduction"
                    values={selectedAircraft.map(
                      (a) => a?.yearIntroduced ?? null
                    )}
                  />
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* No selection state */}
          {!hasSelection && (
            <div className="text-center py-20">
              <svg
                width="64"
                height="64"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="1"
                viewBox="0 0 24 24"
                className="mx-auto mb-6"
              >
                <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              <p
                className="text-[16px] mb-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  color: "#6B6B6B",
                }}
              >
                Sélectionnez au moins un appareil pour commencer la comparaison
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
            <Button href="/flotte" variant="secondary">
              Retour à la flotte
            </Button>
            <Button href="/devis" variant="primary">
              Demander un devis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
