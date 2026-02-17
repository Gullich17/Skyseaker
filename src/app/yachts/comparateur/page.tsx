"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { yachts, type Yacht } from "@/data/yachts";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fallbacks: Record<string, string> = {
  "motor-yacht": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=75",
  "sailing-yacht": "https://images.unsplash.com/photo-1534854638093-ba35f2a8a7d7?w=600&q=75",
  "catamaran": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=75",
  "superyacht": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=75",
  "mega-yacht": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=75",
};

function getImg(y: Yacht): string {
  if (y.image?.startsWith("http")) return y.image;
  return fallbacks[y.categorySlug] || fallbacks["motor-yacht"];
}

/* ============================================
   YACHT SELECT
   ============================================ */
function YachtSelect({ value, onChange, index }: { value: string; onChange: (id: string) => void; index: number }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>
        Yacht {index + 1}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: value ? "#F5F5F0" : "#6B6B6B", backgroundColor: "#141414", border: `1px solid ${value ? "#C9A96E" : "#1E1E1E"}`, borderRadius: "2px", appearance: "none", WebkitAppearance: "none", outline: "none", cursor: "pointer" }}
      >
        <option value="" style={{ background: "#141414" }}>Sélectionner un yacht</option>
        {yachts.map((y) => (
          <option key={y.id} value={y.id} style={{ background: "#141414" }}>{y.name} — {y.category}</option>
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
    <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${values.length}, 1fr)`, alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: "1px solid rgba(30,30,30,0.8)" }}>
      <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{label}</span>
      {values.map((val, i) => {
        const isBest = best !== null && typeof val === "number" && val === best;
        return (
          <span key={i} style={{ fontSize: "15px", textAlign: "center", fontFamily: "var(--font-montserrat)", fontWeight: isBest ? 600 : 400, color: isBest ? "#C9A96E" : val ? "#F5F5F0" : "#1E1E1E" }}>
            {val !== null && val !== undefined ? (
              <>{typeof val === "number" ? val.toLocaleString("fr-FR") : val}{unit && <span style={{ fontSize: "11px", color: "#6B6B6B", marginLeft: "4px" }}>{unit}</span>}</>
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(30,30,30,0.5)" }}>
      <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#6B6B6B" }}>{label}</span>
      <span style={{ fontSize: "14px", fontFamily: "var(--font-montserrat)", fontWeight: isBest ? 600 : 400, color: isBest ? "#C9A96E" : value ? "#F5F5F0" : "#1E1E1E" }}>
        {value !== null && value !== undefined ? (
          <>{typeof value === "number" ? value.toLocaleString("fr-FR") : value}{unit && <span style={{ fontSize: "11px", color: "#6B6B6B", marginLeft: "4px" }}>{unit}</span>}</>
        ) : "—"}
      </span>
    </div>
  );
}

/* ============================================
   MOBILE YACHT CARD
   ============================================ */
function MobileYachtCard({ yacht, allSelected }: { yacht: Yacht; allSelected: (Yacht | null)[] }) {
  const validYachts = allSelected.filter((y): y is Yacht => y !== null);

  function isBest(field: keyof Yacht, mode: "max" | "min"): boolean {
    if (validYachts.length < 2) return false;
    const vals = validYachts.map((y) => y[field]).filter((v): v is number => typeof v === "number");
    if (vals.length < 2) return false;
    const target = mode === "max" ? Math.max(...vals) : Math.min(...vals);
    return yacht[field] === target;
  }

  return (
    <div style={{ backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px", borderBottom: "1px solid #1E1E1E", textAlign: "center" }}>
        <div style={{ aspectRatio: "16/9", position: "relative", marginBottom: "12px", overflow: "hidden", borderRadius: "2px" }}>
          <Image src={getImg(yacht)} alt={yacht.name} fill style={{ objectFit: "cover" }} />
        </div>
        <h3 style={{ fontSize: "20px", marginBottom: "8px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>{yacht.name}</h3>
        <Badge>{yacht.category}</Badge>
      </div>

      {/* Specs */}
      <div style={{ padding: "16px 20px" }}>
        <SpecRow label="Constructeur" value={yacht.builder} />
        <SpecRow label="Catégorie" value={yacht.category} />
        <SpecRow label="Invités" value={yacht.guests} isBest={isBest("guests", "max")} />
        <SpecRow label="Cabines" value={yacht.cabins} isBest={isBest("cabins", "max")} />
        <SpecRow label="Équipage" value={yacht.crew} isBest={isBest("crew", "max")} />
        <SpecRow label="Longueur" value={yacht.length} unit="m" isBest={isBest("length", "max")} />
        <SpecRow label="Largeur" value={yacht.beam} unit="m" isBest={isBest("beam", "max")} />
        <SpecRow label="Tirant d'eau" value={yacht.draft} unit="m" isBest={isBest("draft", "min")} />
        <SpecRow label="Vitesse croisière" value={yacht.cruisingSpeed} unit="nds" isBest={isBest("cruisingSpeed", "max")} />
        <SpecRow label="Vitesse max" value={yacht.maxSpeed} unit="nds" isBest={isBest("maxSpeed", "max")} />
        <SpecRow label="Autonomie" value={yacht.range} unit="nm" isBest={isBest("range", "max")} />
        <SpecRow label="Motorisation" value={yacht.engines} />
        <SpecRow label="Année" value={yacht.yearBuilt} />
      </div>
    </div>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function YachtComparateurPage() {
  const [selections, setSelections] = useState<string[]>(["", "", ""]);
  const selectedYachts: (Yacht | null)[] = selections.map((id) => yachts.find((y) => y.id === id) ?? null);
  const updateSelection = (index: number, id: string) => { const n = [...selections]; n[index] = id; setSelections(n); };
  const hasSelection = selectedYachts.some((y) => y !== null);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "clamp(360px, 50vh, 560px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #0d1218 60%, #0A0A0A 100%)" }} />
        <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(40px, 5vw, 64px)", textAlign: "center" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}>
            NOTRE FLOTTE NAUTIQUE
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}>
            Comparateur de yachts
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "600px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}>
            Comparez jusqu&apos;à 3 yachts pour trouver celui qui correspond à votre croisière
          </motion.p>
        </div>
      </section>

      {/* Comparator */}
      <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Selectors */}
          <ScrollReveal>
            <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", marginBottom: "clamp(32px, 5vw, 48px)" }}>
              <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "20px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C9A96E" }}>
                Sélectionnez vos yachts
              </p>
              <div className="selectors-row" style={{ gap: "16px" }}>
                {selections.map((sel, i) => (
                  <YachtSelect key={i} value={sel} onChange={(id) => updateSelection(i, id)} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ===== DESKTOP: Grid comparison ===== */}
          {hasSelection && (
            <div className="comparator-desktop">
              {/* Yacht Headers */}
              <ScrollReveal>
                <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${selectedYachts.length}, 1fr)`, gap: "16px", marginBottom: "24px" }}>
                  <div />
                  {selectedYachts.map((y, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      {y ? (
                        <>
                          <div style={{ aspectRatio: "16/9", position: "relative", marginBottom: "12px", overflow: "hidden", borderRadius: "2px" }}>
                            <Image src={getImg(y)} alt={y.name} fill style={{ objectFit: "cover" }} />
                          </div>
                          <h3 style={{ fontSize: "18px", marginBottom: "8px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>{y.name}</h3>
                          <Badge>{y.category}</Badge>
                        </>
                      ) : (
                        <div style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", background: "#141414", border: "1px dashed #1E1E1E", borderRadius: "2px" }}>
                          <span style={{ fontSize: "12px", fontFamily: "var(--font-montserrat)", color: "#6B6B6B" }}>Non sélectionné</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Comparison Table */}
              <ScrollReveal delay={0.1}>
                <div style={{ padding: "clamp(20px, 3vw, 32px)", backgroundColor: "#141414", border: "1px solid #1E1E1E", borderRadius: "2px", overflowX: "auto" }}>
                  <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "20px", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C9A96E" }}>
                    Caractéristiques techniques
                  </h3>
                  <div style={{ minWidth: "600px" }}>
                    <ComparisonRow label="Constructeur" values={selectedYachts.map((y) => y?.builder ?? null)} />
                    <ComparisonRow label="Catégorie" values={selectedYachts.map((y) => y?.category ?? null)} />
                    <ComparisonRow label="Invités" values={selectedYachts.map((y) => y?.guests ?? null)} highlight="max" />
                    <ComparisonRow label="Cabines" values={selectedYachts.map((y) => y?.cabins ?? null)} highlight="max" />
                    <ComparisonRow label="Équipage" values={selectedYachts.map((y) => y?.crew ?? null)} highlight="max" />
                    <ComparisonRow label="Longueur" values={selectedYachts.map((y) => y?.length ?? null)} unit="m" highlight="max" />
                    <ComparisonRow label="Largeur" values={selectedYachts.map((y) => y?.beam ?? null)} unit="m" highlight="max" />
                    <ComparisonRow label="Tirant d'eau" values={selectedYachts.map((y) => y?.draft ?? null)} unit="m" highlight="min" />
                    <ComparisonRow label="Vitesse croisière" values={selectedYachts.map((y) => y?.cruisingSpeed ?? null)} unit="nds" highlight="max" />
                    <ComparisonRow label="Vitesse max" values={selectedYachts.map((y) => y?.maxSpeed ?? null)} unit="nds" highlight="max" />
                    <ComparisonRow label="Autonomie" values={selectedYachts.map((y) => y?.range ?? null)} unit="nm" highlight="max" />
                    <ComparisonRow label="Motorisation" values={selectedYachts.map((y) => y?.engines ?? null)} />
                    <ComparisonRow label="Année" values={selectedYachts.map((y) => y?.yearBuilt ?? null)} />
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
                  {selectedYachts.map((y, i) =>
                    y ? (
                      <MobileYachtCard key={i} yacht={y} allSelected={selectedYachts} />
                    ) : null
                  )}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Empty state */}
          {!hasSelection && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <svg width="64" height="64" fill="none" stroke="#1E1E1E" strokeWidth="1" viewBox="0 0 24 24" style={{ margin: "0 auto 24px" }}>
                <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              <p style={{ fontSize: "16px", fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#6B6B6B" }}>
                Sélectionnez au moins un yacht pour commencer la comparaison
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "clamp(48px, 6vw, 64px)" }}>
            <Button href="/yachts" variant="secondary">Retour aux yachts</Button>
            <Button href="/devis" variant="primary">Demander un devis</Button>
          </div>
        </div>
      </section>
    </>
  );
}
