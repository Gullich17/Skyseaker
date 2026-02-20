"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { fleet, type Aircraft } from "@/data/fleet";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   AIRCRAFT SELECT
   ============================================ */
function AircraftSelect({ value, onChange, index }: { value: string; onChange: (id: string) => void; index: number }) {
  const t = useTranslations("fleet.comparator");
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>
        {t("aircraftLabel", { index: index + 1 })}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: value ? "#FFFFFF" : "#6B6B6B", backgroundColor: "#132A3A", border: `1px solid ${value ? "#F4DDC3" : "#1A3448"}`, borderRadius: "2px", appearance: "none", WebkitAppearance: "none", outline: "none", cursor: "pointer" }}
      >
        <option value="" style={{ background: "#132A3A" }}>{t("selectAircraft")}</option>
        {fleet.map((a) => (
          <option key={a.id} value={a.id} style={{ background: "#132A3A" }}>{a.name} — {a.category}</option>
        ))}
      </select>
    </div>
  );
}

/* ============================================
   COMPARISON ROW (desktop table)
   ============================================ */
function ComparisonRow({ label, values, unit, highlight }: { label: string; values: (string | number | null)[]; unit?: string; highlight?: "max" | "min" | "none" }) {
  const numericValues = values.map((v) => (typeof v === "number" ? v : null));
  const validNums = numericValues.filter((n): n is number => n !== null);
  const best = highlight === "max" ? Math.max(...validNums) : highlight === "min" ? Math.min(...validNums) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${values.length}, 1fr)`, alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: "1px solid rgba(26,52,72,0.8)" }}>
      <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{label}</span>
      {values.map((val, i) => {
        const isBest = best !== null && typeof val === "number" && val === best;
        return (
          <span key={i} style={{ fontSize: "15px", textAlign: "center", fontFamily: "var(--font-montserrat)", fontWeight: isBest ? 600 : 400, color: isBest ? "#F4DDC3" : val ? "#FFFFFF" : "#1A3448" }}>
            {val !== null && val !== undefined ? (
              <>{typeof val === "number" ? val.toLocaleString("en-US") : val}{unit && <span style={{ fontSize: "11px", color: "#6B6B6B", marginLeft: "4px" }}>{unit}</span>}</>
            ) : "—"}
          </span>
        );
      })}
    </div>
  );
}

/* ============================================
   SPEC ROW (mobile card)
   ============================================ */
function SpecRow({ label, value, unit, isBest }: { label: string; value: string | number | null; unit?: string; isBest?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(26,52,72,0.5)" }}>
      <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{label}</span>
      <span style={{ fontSize: "14px", fontFamily: "var(--font-montserrat)", fontWeight: isBest ? 600 : 400, color: isBest ? "#F4DDC3" : value ? "#FFFFFF" : "#1A3448" }}>
        {value !== null && value !== undefined ? (
          <>{typeof value === "number" ? value.toLocaleString("en-US") : value}{unit && <span style={{ fontSize: "11px", color: "#6B6B6B", marginLeft: "4px" }}>{unit}</span>}</>
        ) : "—"}
      </span>
    </div>
  );
}

/* ============================================
   MOBILE AIRCRAFT CARD
   ============================================ */
function MobileAircraftCard({ aircraft, allSelected }: { aircraft: Aircraft; allSelected: (Aircraft | null)[] }) {
  const t = useTranslations("fleet.comparator");
  const validAircraft = allSelected.filter((a): a is Aircraft => a !== null);

  function isBest(field: keyof Aircraft, mode: "max" | "min"): boolean {
    if (validAircraft.length < 2) return false;
    const vals = validAircraft.map((a) => a[field]).filter((v): v is number => typeof v === "number");
    if (vals.length < 2) return false;
    const target = mode === "max" ? Math.max(...vals) : Math.min(...vals);
    return aircraft[field] === target;
  }

  return (
    <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px", borderBottom: "1px solid #1A3448", textAlign: "center" }}>
        <div style={{ aspectRatio: "16/9", position: "relative", marginBottom: "12px", overflow: "hidden", borderRadius: "2px", background: "#1A3448" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" fill="none" stroke="#F4DDC3" strokeWidth="1" viewBox="0 0 24 24" style={{ opacity: 0.2 }}>
              <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
            </svg>
          </div>
        </div>
        <h3 style={{ fontSize: "20px", marginBottom: "8px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>{aircraft.name}</h3>
        <Badge>{aircraft.category}</Badge>
      </div>

      {/* Specs */}
      <div style={{ padding: "16px 20px" }}>
        <SpecRow label={t("specs.manufacturer")} value={aircraft.manufacturer} />
        <SpecRow label={t("specs.category")} value={aircraft.category} />
        <SpecRow label={t("specs.passengers")} value={aircraft.passengers} isBest={isBest("passengers", "max")} />
        <SpecRow label={t("specs.range")} value={aircraft.range} unit="km" isBest={isBest("range", "max")} />
        <SpecRow label={t("specs.speed")} value={aircraft.speed} unit="km/h" isBest={isBest("speed", "max")} />
        <SpecRow label={t("specs.cabinLength")} value={aircraft.cabinLength} unit="m" isBest={isBest("cabinLength", "max")} />
        <SpecRow label={t("specs.cabinHeight")} value={aircraft.cabinHeight} unit="m" isBest={isBest("cabinHeight", "max")} />
        <SpecRow label={t("specs.luggage")} value={aircraft.baggage} unit="m³" isBest={isBest("baggage", "max")} />
        <SpecRow label={t("specs.engines")} value={aircraft.engines} />
        <SpecRow label={t("specs.takeoffDistance")} value={aircraft.takeoffDistance} unit="m" isBest={isBest("takeoffDistance", "min")} />
        <SpecRow label={t("specs.yearIntroduced")} value={aircraft.yearIntroduced} />
      </div>
    </div>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function ComparateurPage() {
  const t = useTranslations("fleet.comparator");
  const [selections, setSelections] = useState<string[]>(["", "", ""]);
  const selectedAircraft: (Aircraft | null)[] = selections.map((id) => fleet.find((a) => a.id === id) ?? null);
  const updateSelection = (index: number, id: string) => { const n = [...selections]; n[index] = id; setSelections(n); };
  const hasSelection = selectedAircraft.some((a) => a !== null);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "clamp(360px, 50vh, 560px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #0E202D 0%, #132A3A 40%, #122838 60%, #0E202D 100%)" }} />
        <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, background: "linear-gradient(90deg, transparent, #F4DDC3, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(14,32,45,0.8) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(40px, 5vw, 64px)", textAlign: "center" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
            {t("hero.preTitle")}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}>
            {t("hero.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "600px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}>
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Comparator */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Selectors */}
          <ScrollReveal>
            <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", marginBottom: "clamp(32px, 5vw, 48px)" }}>
              <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "20px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
                {t("selectYourAircraft")}
              </p>
              <div className="selectors-row" style={{ gap: "16px" }}>
                {selections.map((sel, i) => (
                  <AircraftSelect key={i} value={sel} onChange={(id) => updateSelection(i, id)} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ===== DESKTOP: Grid comparison ===== */}
          {hasSelection && (
            <div className="comparator-desktop">
              {/* Aircraft Headers */}
              <ScrollReveal>
                <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${selectedAircraft.length}, 1fr)`, gap: "16px", marginBottom: "24px" }}>
                  <div />
                  {selectedAircraft.map((a, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      {a ? (
                        <>
                          <div style={{ aspectRatio: "16/9", position: "relative", marginBottom: "12px", overflow: "hidden", borderRadius: "2px", background: "#1A3448" }}>
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="40" height="40" fill="none" stroke="#F4DDC3" strokeWidth="1" viewBox="0 0 24 24" style={{ opacity: 0.2 }}>
                                <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
                              </svg>
                            </div>
                          </div>
                          <h3 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>{a.name}</h3>
                          <Badge>{a.category}</Badge>
                        </>
                      ) : (
                        <div style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", background: "#132A3A", border: "1px dashed #1A3448", borderRadius: "2px" }}>
                          <span style={{ fontSize: "12px", fontFamily: "var(--font-montserrat)", color: "#6B6B6B" }}>{t("notSelected")}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Comparison Table */}
              <ScrollReveal delay={0.1}>
                <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflowX: "auto" }}>
                  <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "20px", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>
                    {t("technicalSpecs")}
                  </h3>
                  <div style={{ minWidth: "600px" }}>
                    <ComparisonRow label={t("specs.manufacturer")} values={selectedAircraft.map((a) => a?.manufacturer ?? null)} />
                    <ComparisonRow label={t("specs.category")} values={selectedAircraft.map((a) => a?.category ?? null)} />
                    <ComparisonRow label={t("specs.passengers")} values={selectedAircraft.map((a) => a?.passengers ?? null)} highlight="max" />
                    <ComparisonRow label={t("specs.range")} values={selectedAircraft.map((a) => a?.range ?? null)} unit="km" highlight="max" />
                    <ComparisonRow label={t("specs.speed")} values={selectedAircraft.map((a) => a?.speed ?? null)} unit="km/h" highlight="max" />
                    <ComparisonRow label={t("specs.cabinLength")} values={selectedAircraft.map((a) => a?.cabinLength ?? null)} unit="m" highlight="max" />
                    <ComparisonRow label={t("specs.cabinHeight")} values={selectedAircraft.map((a) => a?.cabinHeight ?? null)} unit="m" highlight="max" />
                    <ComparisonRow label={t("specs.luggage")} values={selectedAircraft.map((a) => a?.baggage ?? null)} unit="m³" highlight="max" />
                    <ComparisonRow label={t("specs.engines")} values={selectedAircraft.map((a) => a?.engines ?? null)} />
                    <ComparisonRow label={t("specs.takeoffDistance")} values={selectedAircraft.map((a) => a?.takeoffDistance ?? null)} unit="m" highlight="min" />
                    <ComparisonRow label={t("specs.yearIntroduced")} values={selectedAircraft.map((a) => a?.yearIntroduced ?? null)} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* ===== MOBILE: Stacked cards ===== */}
          {hasSelection && (
            <div className="comparator-mobile">
              <ScrollReveal>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {selectedAircraft.map((a, i) =>
                    a ? (
                      <MobileAircraftCard key={i} aircraft={a} allSelected={selectedAircraft} />
                    ) : null
                  )}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Empty state */}
          {!hasSelection && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <svg width="64" height="64" fill="none" stroke="#1A3448" strokeWidth="1" viewBox="0 0 24 24" style={{ margin: "0 auto 24px" }}>
                <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              <p style={{ fontSize: "16px", fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#6B6B6B" }}>
                {t("emptyState")}
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "clamp(48px, 6vw, 64px)" }}>
            <Button href="/flotte" variant="secondary">
              {t("cta.backToFleet")}
            </Button>
            <Button href="/devis" variant="primary">
              {t("cta.requestQuote")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
