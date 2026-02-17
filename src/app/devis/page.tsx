"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { categories } from "@/data/fleet";
import { yachtCategories } from "@/data/yachts";

/* ============================================
   STYLE CONSTANTS
   ============================================ */
const inputCSS: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  fontSize: "13px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(244,221,195,0.2)",
  borderRadius: "3px",
  color: "#FFFFFF",
  fontFamily: "var(--font-montserrat)",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 0.3s ease",
};

const selectCSS: React.CSSProperties = {
  ...inputCSS,
  WebkitAppearance: "none",
  appearance: "none" as const,
  cursor: "pointer",
};

const dateCSS: React.CSSProperties = {
  ...inputCSS,
  colorScheme: "dark",
};

const textareaCSS: React.CSSProperties = {
  ...inputCSS,
  resize: "none" as const,
};

const labelCSS: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#A0A0A0",
  fontFamily: "var(--font-montserrat)",
  fontWeight: 500,
  marginBottom: "8px",
};

const stepTitleCSS: React.CSSProperties = {
  fontFamily: "var(--font-playfair)",
  fontWeight: 600,
  color: "#FFFFFF",
  fontSize: "clamp(20px, 3vw, 24px)",
  marginBottom: "28px",
};

const optionBtn = (active: boolean): React.CSSProperties => ({
  padding: "10px 16px",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  border: `1px solid ${active ? "#F4DDC3" : "rgba(244,221,195,0.15)"}`,
  color: active ? "#F4DDC3" : "#6B6B6B",
  background: active ? "rgba(244,221,195,0.08)" : "transparent",
  fontFamily: "var(--font-montserrat)",
  fontWeight: 500,
  cursor: "pointer",
  borderRadius: "2px",
  transition: "all 0.3s ease",
});

const serviceCard = (active: boolean): React.CSSProperties => ({
  flex: "1 1 200px",
  padding: "clamp(24px, 4vw, 40px) clamp(16px, 3vw, 32px)",
  background: active ? "rgba(244,221,195,0.06)" : "rgba(19,42,58,0.6)",
  border: `1px solid ${active ? "#F4DDC3" : "rgba(244,221,195,0.1)"}`,
  borderRadius: "4px",
  cursor: "pointer",
  textAlign: "center" as const,
  transition: "all 0.4s ease",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "12px",
});

const gridTwoCol: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const colFlex = (gap = "24px"): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  gap,
});

/* ============================================
   CHECKBOX HELPER
   ============================================ */
function CheckboxField({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div
        className="peer-checked:bg-[#F4DDC3] transition-all"
        style={{ width: "18px", height: "18px", border: "1px solid rgba(244,221,195,0.3)", borderRadius: "2px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="#0E202D" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <span style={{ fontSize: "13px", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{label}</span>
    </label>
  );
}

/* ============================================
   MAIN FORM COMPONENT
   ============================================ */
function DevisForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Service type
    serviceType: "aviation" as "aviation" | "yacht",
    // Aviation
    type: "aller-simple",
    depart: "",
    destination: "",
    date: "",
    dateRetour: "",
    passagers: "2",
    flexibilite: false,
    // Yacht
    zoneNavigation: "",
    dateEmbarquement: "",
    dateDebarquement: "",
    nombreInvites: "6",
    dureeJours: "",
    // Preferences Aviation
    categorie: "",
    catering: "standard",
    animaux: false,
    bagagesSpeciaux: false,
    transfert: "aucun",
    besoins: "",
    // Preferences Yacht
    categorieYacht: "",
    cabinesSouhaitees: "",
    equipage: "avec",
    activitesNautiques: [] as string[],
    cateringYacht: "standard",
    besoinsYacht: "",
    // Contact
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: "",
    source: "",
    cgv: false,
  });

  // URL params prefill
  useEffect(() => {
    const service = searchParams.get("service");
    const type = searchParams.get("type");
    const depart = searchParams.get("depart");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    const dateRetour = searchParams.get("dateRetour");
    const passagers = searchParams.get("passagers");
    const zone = searchParams.get("zone");

    if (service || type || depart || destination || date || dateRetour || passagers || zone) {
      setForm((prev) => ({
        ...prev,
        ...(service === "yacht" ? { serviceType: "yacht" as const } : {}),
        ...(service === "aviation" ? { serviceType: "aviation" as const } : {}),
        ...(type ? { type } : {}),
        ...(depart ? { depart } : {}),
        ...(destination ? { destination } : {}),
        ...(date ? { date } : {}),
        ...(dateRetour ? { dateRetour } : {}),
        ...(passagers ? { passagers } : {}),
        ...(zone ? { zoneNavigation: zone } : {}),
      }));
    }
  }, [searchParams]);

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  const toggleActivity = (activity: string) => {
    setForm((prev) => ({
      ...prev,
      activitesNautiques: prev.activitesNautiques.includes(activity)
        ? prev.activitesNautiques.filter((a) => a !== activity)
        : [...prev.activitesNautiques, activity],
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devisRef, setDevisRef] = useState("");
  const [waUrl, setWaUrl] = useState("");

  /* Build WhatsApp message client-side (avoids popup blocker) */
  function buildWhatsAppUrl(): string {
    const WHATSAPP_NUMBER = "33676765511";
    const ref = `SKY-${Date.now().toString().slice(-6)}`;
    const lines: string[] = [];

    lines.push("🔔 *NOUVELLE DEMANDE DE DEVIS*");
    lines.push(`📋 Réf: #${ref}`);
    lines.push("");

    if (form.serviceType === "yacht") {
      lines.push("🛥️ *CHARTER NAUTIQUE*");
      lines.push("");
      if (form.zoneNavigation) lines.push(`📍 Zone: ${form.zoneNavigation}`);
      if (form.dateEmbarquement) lines.push(`📅 Embarquement: ${form.dateEmbarquement}`);
      if (form.dateDebarquement) lines.push(`📅 Débarquement: ${form.dateDebarquement}`);
      if (form.nombreInvites) lines.push(`👥 Invités: ${form.nombreInvites}`);
      if (form.dureeJours) lines.push(`⏱️ Durée: ${form.dureeJours} jours`);
      if (form.categorieYacht) lines.push(`🚢 Catégorie: ${form.categorieYacht}`);
      if (form.equipage) lines.push(`👨‍✈️ Équipage: ${form.equipage}`);
      if (form.activitesNautiques.length > 0) lines.push(`🏄 Activités: ${form.activitesNautiques.join(", ")}`);
      if (form.cateringYacht && form.cateringYacht !== "sans") lines.push(`🍽️ Catering: ${form.cateringYacht}`);
      if (form.besoinsYacht) lines.push(`📝 Notes: ${form.besoinsYacht}`);
    } else {
      lines.push("✈️ *AVIATION PRIVÉE*");
      lines.push("");
      if (form.type) lines.push(`🔄 Type: ${form.type}`);
      if (form.depart || form.destination) lines.push(`📍 Trajet: ${form.depart || "—"} → ${form.destination || "—"}`);
      if (form.date) {
        if (form.type === "aller-retour" && form.dateRetour) {
          lines.push(`📅 Dates: ${form.date} → ${form.dateRetour}`);
        } else {
          lines.push(`📅 Date: ${form.date}`);
        }
      }
      if (form.passagers) lines.push(`👥 Passagers: ${form.passagers}`);
      if (form.flexibilite) lines.push("📆 Dates flexibles: Oui");
      if (form.categorie) lines.push(`🛩️ Catégorie: ${form.categorie}`);
      if (form.catering && form.catering !== "aucun") lines.push(`🍽️ Catering: ${form.catering}`);
      if (form.animaux) lines.push("🐾 Animaux: Oui");
      if (form.bagagesSpeciaux) lines.push("🧳 Bagages spéciaux: Oui");
      if (form.transfert && form.transfert !== "aucun") lines.push(`🚗 Transfert: ${form.transfert}`);
      if (form.besoins) lines.push(`📝 Notes: ${form.besoins}`);
    }

    lines.push("");
    lines.push("👤 *CONTACT*");
    const fullName = `${form.prenom || ""} ${form.nom || ""}`.trim();
    if (fullName) lines.push(`Nom: ${fullName}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.telephone) lines.push(`Tél: ${form.telephone}`);
    if (form.entreprise) lines.push(`Entreprise: ${form.entreprise}`);

    setDevisRef(ref);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaUrl(url);
    return url;
  }

  const next = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Step 3 → Build WhatsApp URL client-side + redirect (no popup blocker)
    setIsSubmitting(true);
    const url = buildWhatsAppUrl();

    // Open WhatsApp directly — synchronous so no popup blocker
    window.open(url, "_blank");

    // Also fire API call in background for logging/future use
    fetch("/api/devis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});

    setIsSubmitting(false);
    setSubmitted(true);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isYacht = form.serviceType === "yacht";
  const stepsAviation = ["Votre vol", "Vos préférences", "Vos coordonnées", "Confirmation"];
  const stepsYacht = ["Votre croisière", "Vos préférences", "Vos coordonnées", "Confirmation"];
  const steps = isYacht ? stepsYacht : stepsAviation;

  const fleetCats = categories.filter((c) => c.slug !== "tous");
  const yachtCats = yachtCategories.filter((c) => c.slug !== "tous");

  /* ============================================
     ZONE OPTIONS
     ============================================ */
  const zones = [
    { v: "mediterranee", l: "Méditerranée" },
    { v: "caraibes", l: "Caraïbes" },
    { v: "asie-pacifique", l: "Asie & Pacifique" },
    { v: "nord-europe", l: "Europe du Nord" },
    { v: "ocean-indien", l: "Océan Indien" },
    { v: "autre", l: "Autre" },
  ];

  const durees = [
    { v: "1", l: "1 jour" },
    { v: "2", l: "2 jours" },
    { v: "3", l: "3 jours" },
    { v: "7", l: "1 semaine" },
    { v: "14", l: "2 semaines" },
    { v: "21", l: "3 semaines" },
    { v: "30", l: "1 mois" },
    { v: "custom", l: "Sur mesure" },
  ];

  const activites = ["Jet-ski", "Plongée sous-marine", "Paddle", "Snorkeling", "Pêche sportive", "Wakeboard"];

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: "clamp(100px, 15vh, 128px)", paddingBottom: "32px", background: "#0E202D" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionTitle
            preTitle="DEVIS EN LIGNE"
            title="Obtenez votre devis personnalisé"
            subtitle="Réponse garantie sous 30 minutes, 24h/24"
            centered
          />
        </div>
      </section>

      {/* FORM */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 0 clamp(80px, 10vw, 120px)", background: "#0E202D" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

          {/* SERVICE TYPE SELECTOR */}
          <div style={{ display: "flex", gap: "clamp(12px, 2vw, 20px)", marginBottom: "clamp(36px, 5vw, 56px)", flexWrap: "wrap" }}>
            <button onClick={() => setForm({ ...form, serviceType: "aviation" })} style={serviceCard(!isYacht)}>
              <svg width="40" height="40" fill="none" stroke={!isYacht ? "#F4DDC3" : "#6B6B6B"} strokeWidth="1.5" viewBox="0 0 24 24" style={{ transition: "stroke 0.3s ease" }}>
                <path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12M3 20h18" />
              </svg>
              <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(16px, 2.5vw, 20px)", color: !isYacht ? "#FFFFFF" : "#6B6B6B", transition: "color 0.3s ease" }}>
                Aviation Privée
              </span>
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: !isYacht ? "#A0A0A0" : "#4A4A4A", transition: "color 0.3s ease" }}>
                Jets, hélicoptères, turboprops
              </span>
            </button>

            <button onClick={() => setForm({ ...form, serviceType: "yacht" })} style={serviceCard(isYacht)}>
              <svg width="40" height="40" fill="none" stroke={isYacht ? "#F4DDC3" : "#6B6B6B"} strokeWidth="1.5" viewBox="0 0 24 24" style={{ transition: "stroke 0.3s ease" }}>
                <path d="M2 20c2 0 3.5-1.5 5-1.5S9.5 20 12 20s3.5-1.5 5-1.5 3 1.5 5 1.5" />
                <path d="M4 18l1.5-9h13L20 18" />
                <path d="M12 3v6" />
                <path d="M8 9h8" />
              </svg>
              <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(16px, 2.5vw, 20px)", color: isYacht ? "#FFFFFF" : "#6B6B6B", transition: "color 0.3s ease" }}>
                Charter Nautique
              </span>
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: isYacht ? "#A0A0A0" : "#4A4A4A", transition: "color 0.3s ease" }}>
                Yachts, voiliers, catamarans
              </span>
            </button>
          </div>

          {/* PROGRESS BAR */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
            {steps.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    border: `1px solid ${i <= currentStep ? "#F4DDC3" : "#1A3448"}`,
                    background: i < currentStep ? "#F4DDC3" : i === currentStep ? "rgba(244,221,195,0.1)" : "transparent",
                    color: i < currentStep ? "#0E202D" : i === currentStep ? "#F4DDC3" : "#6B6B6B",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                  }}>
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span style={{
                    marginTop: "8px",
                    fontSize: "clamp(8px, 1.2vw, 10px)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: i <= currentStep ? "#F4DDC3" : "#6B6B6B",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: "1px", margin: "0 12px", background: i < currentStep ? "#F4DDC3" : "#1A3448", transition: "background 0.3s ease" }} />
                )}
              </div>
            ))}
          </div>

          {/* FORM STEPS */}
          {!submitted ? (
            <div className="glass-dark" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${form.serviceType}-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ====== STEP 0 — DETAILS ====== */}
                  {currentStep === 0 && !isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Détails de votre vol</h3>

                      {/* Type de vol */}
                      <div>
                        <label style={labelCSS}>Type de vol</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "aller-simple", l: "Aller simple" }, { v: "aller-retour", l: "Aller-retour" }, { v: "multi", l: "Multi-destinations" }].map((t) => (
                            <button key={t.v} onClick={() => update("type", t.v)} style={optionBtn(form.type === t.v)}>
                              {t.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Départ / Destination */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Départ</label>
                          <input type="text" placeholder="Ville ou aéroport" value={form.depart} onChange={(e) => update("depart", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Destination</label>
                          <input type="text" placeholder="Ville ou aéroport" value={form.destination} onChange={(e) => update("destination", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      {/* Dates + Passagers */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>{form.type === "aller-retour" ? "Date aller" : "Date de départ"}</label>
                          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} style={dateCSS} />
                        </div>
                        {form.type === "aller-retour" && (
                          <div>
                            <label style={labelCSS}>Date retour</label>
                            <input type="date" value={form.dateRetour} onChange={(e) => update("dateRetour", e.target.value)} style={dateCSS} />
                          </div>
                        )}
                        <div>
                          <label style={labelCSS}>Passagers</label>
                          <select value={form.passagers} onChange={(e) => update("passagers", e.target.value)} style={selectCSS}>
                            {Array.from({ length: 19 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} passager{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <CheckboxField checked={form.flexibilite} onChange={(v) => update("flexibilite", v)} label="Mes dates sont flexibles (+/- 2 jours)" />
                    </div>
                  )}

                  {currentStep === 0 && isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Détails de votre croisière</h3>

                      {/* Zone de navigation */}
                      <div>
                        <label style={labelCSS}>Zone de navigation</label>
                        <select value={form.zoneNavigation} onChange={(e) => update("zoneNavigation", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Sélectionnez une zone</option>
                          {zones.map((z) => (
                            <option key={z.v} value={z.v} style={{ background: "#132A3A" }}>{z.l}</option>
                          ))}
                        </select>
                      </div>

                      {/* Dates */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Date d&apos;embarquement</label>
                          <input type="date" value={form.dateEmbarquement} onChange={(e) => update("dateEmbarquement", e.target.value)} style={dateCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Date de débarquement</label>
                          <input type="date" value={form.dateDebarquement} onChange={(e) => update("dateDebarquement", e.target.value)} style={dateCSS} />
                        </div>
                      </div>

                      {/* Invités + Durée */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Nombre d&apos;invités</label>
                          <select value={form.nombreInvites} onChange={(e) => update("nombreInvites", e.target.value)} style={selectCSS}>
                            {Array.from({ length: 30 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} invité{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelCSS}>Durée souhaitée</label>
                          <select value={form.dureeJours} onChange={(e) => update("dureeJours", e.target.value)} style={selectCSS}>
                            <option value="" style={{ background: "#132A3A" }}>Sélectionnez</option>
                            {durees.map((d) => (
                              <option key={d.v} value={d.v} style={{ background: "#132A3A" }}>{d.l}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 1 — PREFERENCES ====== */}
                  {currentStep === 1 && !isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Vos préférences</h3>

                      <div>
                        <label style={labelCSS}>Catégorie d&apos;appareil souhaitée</label>
                        <select value={form.categorie} onChange={(e) => update("categorie", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Je ne sais pas / Peu importe</option>
                          {fleetCats.map((c) => (
                            <option key={c.slug} value={c.name} style={{ background: "#132A3A" }}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={labelCSS}>Catering</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "aucun", l: "Aucun" }, { v: "standard", l: "Standard" }, { v: "premium", l: "Premium" }, { v: "gastronomique", l: "Gastronomique" }].map((c) => (
                            <button key={c.v} onClick={() => update("catering", c.v)} style={optionBtn(form.catering === c.v)}>
                              {c.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={colFlex("12px")}>
                        <CheckboxField checked={form.animaux} onChange={(v) => update("animaux", v)} label="Animaux à bord" />
                        <CheckboxField checked={form.bagagesSpeciaux} onChange={(v) => update("bagagesSpeciaux", v)} label="Bagages volumineux / spéciaux" />
                      </div>

                      <div>
                        <label style={labelCSS}>Transfert terrestre</label>
                        <select value={form.transfert} onChange={(e) => update("transfert", e.target.value)} style={selectCSS}>
                          <option value="aucun" style={{ background: "#132A3A" }}>Aucun</option>
                          <option value="voiture" style={{ background: "#132A3A" }}>Voiture de luxe</option>
                          <option value="helicoptere" style={{ background: "#132A3A" }}>Hélicoptère</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelCSS}>Besoins spéciaux</label>
                        <textarea value={form.besoins} onChange={(e) => update("besoins", e.target.value)} rows={3} placeholder="Décrivez vos besoins particuliers..." style={textareaCSS} />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Vos préférences</h3>

                      <div>
                        <label style={labelCSS}>Catégorie de yacht</label>
                        <select value={form.categorieYacht} onChange={(e) => update("categorieYacht", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Peu importe</option>
                          {yachtCats.map((c) => (
                            <option key={c.slug} value={c.name} style={{ background: "#132A3A" }}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Cabines souhaitées</label>
                          <select value={form.cabinesSouhaitees} onChange={(e) => update("cabinesSouhaitees", e.target.value)} style={selectCSS}>
                            <option value="" style={{ background: "#132A3A" }}>Peu importe</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} cabine{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelCSS}>Équipage</label>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <button onClick={() => update("equipage", "avec")} style={optionBtn(form.equipage === "avec")}>Avec équipage</button>
                            <button onClick={() => update("equipage", "sans")} style={optionBtn(form.equipage === "sans")}>Sans (bareboat)</button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Activités nautiques souhaitées</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {activites.map((a) => (
                            <CheckboxField key={a} checked={form.activitesNautiques.includes(a)} onChange={() => toggleActivity(a)} label={a} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Catering / Chef à bord</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "sans", l: "Sans" }, { v: "standard", l: "Standard" }, { v: "chef-prive", l: "Chef privé" }, { v: "gastronomique", l: "Gastronomique" }].map((c) => (
                            <button key={c.v} onClick={() => update("cateringYacht", c.v)} style={optionBtn(form.cateringYacht === c.v)}>
                              {c.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Besoins spéciaux</label>
                        <textarea value={form.besoinsYacht} onChange={(e) => update("besoinsYacht", e.target.value)} rows={3} placeholder="Décrivez vos besoins particuliers..." style={textareaCSS} />
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 2 — CONTACT ====== */}
                  {currentStep === 2 && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Vos coordonnées</h3>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Nom</label>
                          <input type="text" value={form.nom} onChange={(e) => update("nom", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Prénom</label>
                          <input type="text" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Email</label>
                          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Téléphone</label>
                          <input type="tel" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Entreprise (optionnel)</label>
                        <input type="text" value={form.entreprise} onChange={(e) => update("entreprise", e.target.value)} style={inputCSS} />
                      </div>

                      <div>
                        <label style={labelCSS}>Comment nous avez-vous connu ?</label>
                        <select value={form.source} onChange={(e) => update("source", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Sélectionnez</option>
                          <option value="google" style={{ background: "#132A3A" }}>Google</option>
                          <option value="recommandation" style={{ background: "#132A3A" }}>Recommandation</option>
                          <option value="reseaux" style={{ background: "#132A3A" }}>Réseaux sociaux</option>
                          <option value="presse" style={{ background: "#132A3A" }}>Presse</option>
                          <option value="autre" style={{ background: "#132A3A" }}>Autre</option>
                        </select>
                      </div>

                      <CheckboxField
                        checked={form.cgv}
                        onChange={(v) => update("cgv", v)}
                        label=""
                      />
                      {/* CGV label with links — rendered separately for proper HTML */}
                      <div style={{ marginTop: "-16px", paddingLeft: "30px" }}>
                        <span style={{ fontSize: "12px", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                          J&apos;accepte les{" "}
                          <a href="/conditions-generales" style={{ color: "#F4DDC3", textDecoration: "none" }}>conditions générales</a>
                          {" "}et la{" "}
                          <a href="/politique-confidentialite" style={{ color: "#F4DDC3", textDecoration: "none" }}>politique de confidentialité</a>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 3 — RECAP ====== */}
                  {currentStep === 3 && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Récapitulatif</h3>

                      <div style={colFlex("0px")}>
                        {(isYacht
                          ? [
                              { label: "Service", value: "Charter Nautique" },
                              { label: "Zone", value: zones.find((z) => z.v === form.zoneNavigation)?.l || "—" },
                              { label: "Embarquement", value: form.dateEmbarquement || "—" },
                              { label: "Débarquement", value: form.dateDebarquement || "—" },
                              { label: "Invités", value: form.nombreInvites },
                              { label: "Durée", value: durees.find((d) => d.v === form.dureeJours)?.l || "—" },
                              { label: "Catégorie", value: form.categorieYacht || "À déterminer" },
                              { label: "Équipage", value: form.equipage === "avec" ? "Avec équipage" : "Sans (bareboat)" },
                              { label: "Activités", value: form.activitesNautiques.length > 0 ? form.activitesNautiques.join(", ") : "Aucune" },
                              { label: "Catering", value: form.cateringYacht },
                              { label: "Contact", value: `${form.prenom} ${form.nom}`.trim() || "—" },
                              { label: "Email", value: form.email || "—" },
                              { label: "Téléphone", value: form.telephone || "—" },
                            ]
                          : [
                              { label: "Service", value: "Aviation Privée" },
                              { label: "Type de vol", value: form.type },
                              { label: "Trajet", value: `${form.depart || "—"} → ${form.destination || "—"}` },
                              { label: "Date", value: form.date ? (form.type === "aller-retour" ? `${form.date} → ${form.dateRetour || "—"}` : form.date) : "—" },
                              { label: "Passagers", value: form.passagers },
                              { label: "Catégorie", value: form.categorie || "À déterminer" },
                              { label: "Catering", value: form.catering },
                              { label: "Contact", value: `${form.prenom} ${form.nom}`.trim() || "—" },
                              { label: "Email", value: form.email || "—" },
                              { label: "Téléphone", value: form.telephone || "—" },
                            ]
                        ).map((item) => (
                          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1A3448" }}>
                            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B6B6B", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
                              {item.label}
                            </span>
                            <span style={{ fontSize: "14px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, textAlign: "right", maxWidth: "60%" }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* NAVIGATION */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                {currentStep > 0 ? (
                  <button
                    onClick={prev}
                    style={{
                      padding: "12px 24px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      border: "1px solid rgba(245,245,240,0.3)",
                      color: "#FFFFFF",
                      background: "transparent",
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      borderRadius: "2px",
                    }}
                  >
                    Retour
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={next}
                  style={{
                    padding: "14px 32px",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    background: currentStep === 3 ? "linear-gradient(135deg, #F4DDC3 0%, #F4DDC3 50%, #F4DDC3 100%)" : "transparent",
                    border: currentStep === 3 ? "none" : "1px solid #F4DDC3",
                    color: currentStep === 3 ? "#0E202D" : "#F4DDC3",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: currentStep === 3 ? "0 4px 20px rgba(244,221,195,0.3)" : "none",
                    transition: "all 0.3s ease",
                    borderRadius: "2px",
                  }}
                >
                  {currentStep === 3 ? (isSubmitting ? "Envoi en cours..." : "Envoyer ma demande") : "Suivant"}
                </button>
              </div>
            </div>
          ) : (
            /* SUCCESS */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark"
              style={{ padding: "clamp(32px, 5vw, 56px)", textAlign: "center" }}
            >
              <div style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(45,139,111,0.1)",
                border: "1px solid #2D8B6F",
                borderRadius: "4px",
              }}>
                <svg width="32" height="32" fill="none" stroke="#2D8B6F" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 32px)", marginBottom: "16px" }}>
                Demande envoyée
              </h3>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(16px, 2.5vw, 18px)", color: "#A0A0A0", marginBottom: "8px" }}>
                Notre équipe vous contactera sous 30 minutes
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#6B6B6B", marginBottom: "24px" }}>
                Numéro de demande : #{devisRef || `SKY-${Date.now().toString().slice(-6)}`}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#A0A0A0", marginBottom: "32px" }}>
                Votre demande a été envoyée via WhatsApp.
                <br />Si la fenêtre ne s&apos;est pas ouverte,{" "}
                <a
                  href={waUrl || `https://wa.me/33676765511?text=${encodeURIComponent(`Bonjour, j'ai soumis une demande de devis #${devisRef || "SKY"}. Merci de me recontacter.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366", textDecoration: "underline" }}
                >
                  cliquez ici pour envoyer via WhatsApp
                </a>
              </p>
              <a
                href="tel:+33676765511"
                style={{
                  display: "inline-block",
                  padding: "14px 32px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  border: "1px solid #F4DDC3",
                  color: "#F4DDC3",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  borderRadius: "2px",
                }}
              >
                Rappel immédiat
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

/* ============================================
   PAGE EXPORT
   ============================================ */
export default function DevisPage() {
  return (
    <Suspense fallback={null}>
      <DevisForm />
    </Suspense>
  );
}
