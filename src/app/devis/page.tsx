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
function QuoteForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Service type
    serviceType: "aviation" as "aviation" | "yacht",
    // Aviation
    type: "one-way",
    departure: "",
    destination: "",
    date: "",
    returnDate: "",
    passengers: "2",
    flexibility: false,
    // Yacht
    navigationZone: "",
    embarkationDate: "",
    disembarkationDate: "",
    numberOfGuests: "6",
    durationDays: "",
    // Preferences Aviation
    category: "",
    catering: "standard",
    pets: false,
    specialLuggage: false,
    transfer: "none",
    specialNeeds: "",
    // Preferences Yacht
    yachtCategory: "",
    desiredCabins: "",
    crew: "with",
    waterActivities: [] as string[],
    yachtCatering: "standard",
    yachtSpecialNeeds: "",
    // Contact
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    terms: false,
  });

  // URL params prefill
  useEffect(() => {
    const service = searchParams.get("service");
    const type = searchParams.get("type");
    const departure = searchParams.get("depart");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    const returnDate = searchParams.get("dateRetour");
    const passengers = searchParams.get("passagers");
    const zone = searchParams.get("zone");

    if (service || type || departure || destination || date || returnDate || passengers || zone) {
      setForm((prev) => ({
        ...prev,
        ...(service === "yacht" ? { serviceType: "yacht" as const } : {}),
        ...(service === "aviation" ? { serviceType: "aviation" as const } : {}),
        ...(type ? { type } : {}),
        ...(departure ? { departure } : {}),
        ...(destination ? { destination } : {}),
        ...(date ? { date } : {}),
        ...(returnDate ? { returnDate } : {}),
        ...(passengers ? { passengers } : {}),
        ...(zone ? { navigationZone: zone } : {}),
      }));
    }
  }, [searchParams]);

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  const toggleActivity = (activity: string) => {
    setForm((prev) => ({
      ...prev,
      waterActivities: prev.waterActivities.includes(activity)
        ? prev.waterActivities.filter((a) => a !== activity)
        : [...prev.waterActivities, activity],
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteRef, setQuoteRef] = useState("");
  const [waUrl, setWaUrl] = useState("");

  /* Build WhatsApp message client-side (avoids popup blocker) */
  function buildWhatsAppUrl(): string {
    const WHATSAPP_NUMBER = "33676765511";
    const ref = `SKY-${Date.now().toString().slice(-6)}`;
    const lines: string[] = [];

    lines.push("*NEW QUOTE REQUEST*");
    lines.push(`Ref: #${ref}`);
    lines.push("");

    if (form.serviceType === "yacht") {
      lines.push("*YACHT CHARTER*");
      lines.push("");
      if (form.navigationZone) lines.push(`Zone: ${form.navigationZone}`);
      if (form.embarkationDate) lines.push(`Embarkation: ${form.embarkationDate}`);
      if (form.disembarkationDate) lines.push(`Disembarkation: ${form.disembarkationDate}`);
      if (form.numberOfGuests) lines.push(`Guests: ${form.numberOfGuests}`);
      if (form.durationDays) lines.push(`Duration: ${form.durationDays} days`);
      if (form.yachtCategory) lines.push(`Category: ${form.yachtCategory}`);
      if (form.crew) lines.push(`Crew: ${form.crew}`);
      if (form.waterActivities.length > 0) lines.push(`Activities: ${form.waterActivities.join(", ")}`);
      if (form.yachtCatering && form.yachtCatering !== "without") lines.push(`Catering: ${form.yachtCatering}`);
      if (form.yachtSpecialNeeds) lines.push(`Notes: ${form.yachtSpecialNeeds}`);
    } else {
      lines.push("*PRIVATE AVIATION*");
      lines.push("");
      if (form.type) lines.push(`Type: ${form.type}`);
      if (form.departure || form.destination) lines.push(`Route: ${form.departure || "—"} → ${form.destination || "—"}`);
      if (form.date) {
        if (form.type === "round-trip" && form.returnDate) {
          lines.push(`Dates: ${form.date} → ${form.returnDate}`);
        } else {
          lines.push(`Date: ${form.date}`);
        }
      }
      if (form.passengers) lines.push(`Passengers: ${form.passengers}`);
      if (form.flexibility) lines.push("Flexible dates: Yes");
      if (form.category) lines.push(`Category: ${form.category}`);
      if (form.catering && form.catering !== "none") lines.push(`Catering: ${form.catering}`);
      if (form.pets) lines.push("Pets: Yes");
      if (form.specialLuggage) lines.push("Special luggage: Yes");
      if (form.transfer && form.transfer !== "none") lines.push(`Transfer: ${form.transfer}`);
      if (form.specialNeeds) lines.push(`Notes: ${form.specialNeeds}`);
    }

    lines.push("");
    lines.push("*CONTACT*");
    const fullName = `${form.firstName || ""} ${form.lastName || ""}`.trim();
    if (fullName) lines.push(`Name: ${fullName}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    if (form.company) lines.push(`Company: ${form.company}`);

    setQuoteRef(ref);
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
  const stepsAviation = ["Your Flight", "Your Preferences", "Your Details", "Confirmation"];
  const stepsYacht = ["Your Cruise", "Your Preferences", "Your Details", "Confirmation"];
  const steps = isYacht ? stepsYacht : stepsAviation;

  const fleetCats = categories.filter((c) => c.slug !== "tous");
  const yachtCats = yachtCategories.filter((c) => c.slug !== "tous");

  /* ============================================
     ZONE OPTIONS
     ============================================ */
  const zones = [
    { v: "mediterranean", l: "Mediterranean" },
    { v: "caribbean", l: "Caribbean" },
    { v: "asia-pacific", l: "Asia & Pacific" },
    { v: "northern-europe", l: "Northern Europe" },
    { v: "indian-ocean", l: "Indian Ocean" },
    { v: "other", l: "Other" },
  ];

  const durations = [
    { v: "1", l: "1 day" },
    { v: "2", l: "2 days" },
    { v: "3", l: "3 days" },
    { v: "7", l: "1 week" },
    { v: "14", l: "2 weeks" },
    { v: "21", l: "3 weeks" },
    { v: "30", l: "1 month" },
    { v: "custom", l: "Custom" },
  ];

  const activities = ["Jet-ski", "Scuba Diving", "Paddleboard", "Snorkeling", "Sport Fishing", "Wakeboard"];

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: "clamp(100px, 15vh, 128px)", paddingBottom: "32px", background: "#0E202D" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionTitle
            preTitle="ONLINE QUOTE"
            title="Get your personalized quote"
            subtitle="Guaranteed response within 30 minutes, 24/7"
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
                Private Aviation
              </span>
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: !isYacht ? "#A0A0A0" : "#4A4A4A", transition: "color 0.3s ease" }}>
                Jets, helicopters, turboprops
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
                Yacht Charter
              </span>
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: isYacht ? "#A0A0A0" : "#4A4A4A", transition: "color 0.3s ease" }}>
                Yachts, sailboats, catamarans
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
                      <h3 style={stepTitleCSS}>Your flight details</h3>

                      {/* Flight type */}
                      <div>
                        <label style={labelCSS}>Flight Type</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "one-way", l: "One Way" }, { v: "round-trip", l: "Round Trip" }, { v: "multi", l: "Multi-City" }].map((t) => (
                            <button key={t.v} onClick={() => update("type", t.v)} style={optionBtn(form.type === t.v)}>
                              {t.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Departure / Destination */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Departure</label>
                          <input type="text" placeholder="City or airport" value={form.departure} onChange={(e) => update("departure", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Destination</label>
                          <input type="text" placeholder="City or airport" value={form.destination} onChange={(e) => update("destination", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      {/* Dates + Passengers */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>{form.type === "round-trip" ? "Departure Date" : "Departure Date"}</label>
                          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} style={dateCSS} />
                        </div>
                        {form.type === "round-trip" && (
                          <div>
                            <label style={labelCSS}>Return Date</label>
                            <input type="date" value={form.returnDate} onChange={(e) => update("returnDate", e.target.value)} style={dateCSS} />
                          </div>
                        )}
                        <div>
                          <label style={labelCSS}>Passengers</label>
                          <select value={form.passengers} onChange={(e) => update("passengers", e.target.value)} style={selectCSS}>
                            {Array.from({ length: 19 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} passenger{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <CheckboxField checked={form.flexibility} onChange={(v) => update("flexibility", v)} label="My dates are flexible (+/- 2 days)" />
                    </div>
                  )}

                  {currentStep === 0 && isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Your cruise details</h3>

                      {/* Navigation zone */}
                      <div>
                        <label style={labelCSS}>Navigation Zone</label>
                        <select value={form.navigationZone} onChange={(e) => update("navigationZone", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Select a zone</option>
                          {zones.map((z) => (
                            <option key={z.v} value={z.v} style={{ background: "#132A3A" }}>{z.l}</option>
                          ))}
                        </select>
                      </div>

                      {/* Dates */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Embarkation Date</label>
                          <input type="date" value={form.embarkationDate} onChange={(e) => update("embarkationDate", e.target.value)} style={dateCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Disembarkation Date</label>
                          <input type="date" value={form.disembarkationDate} onChange={(e) => update("disembarkationDate", e.target.value)} style={dateCSS} />
                        </div>
                      </div>

                      {/* Guests + Duration */}
                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Number of Guests</label>
                          <select value={form.numberOfGuests} onChange={(e) => update("numberOfGuests", e.target.value)} style={selectCSS}>
                            {Array.from({ length: 30 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} guest{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelCSS}>Desired Duration</label>
                          <select value={form.durationDays} onChange={(e) => update("durationDays", e.target.value)} style={selectCSS}>
                            <option value="" style={{ background: "#132A3A" }}>Select</option>
                            {durations.map((d) => (
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
                      <h3 style={stepTitleCSS}>Your preferences</h3>

                      <div>
                        <label style={labelCSS}>Preferred Aircraft Category</label>
                        <select value={form.category} onChange={(e) => update("category", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Not sure / No preference</option>
                          {fleetCats.map((c) => (
                            <option key={c.slug} value={c.name} style={{ background: "#132A3A" }}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={labelCSS}>Catering</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "none", l: "None" }, { v: "standard", l: "Standard" }, { v: "premium", l: "Premium" }, { v: "gourmet", l: "Gourmet" }].map((c) => (
                            <button key={c.v} onClick={() => update("catering", c.v)} style={optionBtn(form.catering === c.v)}>
                              {c.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={colFlex("12px")}>
                        <CheckboxField checked={form.pets} onChange={(v) => update("pets", v)} label="Pets on board" />
                        <CheckboxField checked={form.specialLuggage} onChange={(v) => update("specialLuggage", v)} label="Oversized / special luggage" />
                      </div>

                      <div>
                        <label style={labelCSS}>Ground Transfer</label>
                        <select value={form.transfer} onChange={(e) => update("transfer", e.target.value)} style={selectCSS}>
                          <option value="none" style={{ background: "#132A3A" }}>None</option>
                          <option value="luxury-car" style={{ background: "#132A3A" }}>Luxury Car</option>
                          <option value="helicopter" style={{ background: "#132A3A" }}>Helicopter</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelCSS}>Special Requirements</label>
                        <textarea value={form.specialNeeds} onChange={(e) => update("specialNeeds", e.target.value)} rows={3} placeholder="Describe your specific requirements..." style={textareaCSS} />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && isYacht && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Your preferences</h3>

                      <div>
                        <label style={labelCSS}>Yacht Category</label>
                        <select value={form.yachtCategory} onChange={(e) => update("yachtCategory", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>No preference</option>
                          {yachtCats.map((c) => (
                            <option key={c.slug} value={c.name} style={{ background: "#132A3A" }}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Desired Cabins</label>
                          <select value={form.desiredCabins} onChange={(e) => update("desiredCabins", e.target.value)} style={selectCSS}>
                            <option value="" style={{ background: "#132A3A" }}>No preference</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                                {i + 1} cabin{i > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelCSS}>Crew</label>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <button onClick={() => update("crew", "with")} style={optionBtn(form.crew === "with")}>With crew</button>
                            <button onClick={() => update("crew", "without")} style={optionBtn(form.crew === "without")}>Without (bareboat)</button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Desired Water Activities</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {activities.map((a) => (
                            <CheckboxField key={a} checked={form.waterActivities.includes(a)} onChange={() => toggleActivity(a)} label={a} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Catering / Onboard Chef</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {[{ v: "without", l: "Without" }, { v: "standard", l: "Standard" }, { v: "private-chef", l: "Private Chef" }, { v: "gourmet", l: "Gourmet" }].map((c) => (
                            <button key={c.v} onClick={() => update("yachtCatering", c.v)} style={optionBtn(form.yachtCatering === c.v)}>
                              {c.l}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Special Requirements</label>
                        <textarea value={form.yachtSpecialNeeds} onChange={(e) => update("yachtSpecialNeeds", e.target.value)} rows={3} placeholder="Describe your specific requirements..." style={textareaCSS} />
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 2 — CONTACT ====== */}
                  {currentStep === 2 && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Your contact details</h3>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Last Name</label>
                          <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>First Name</label>
                          <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      <div style={gridTwoCol}>
                        <div>
                          <label style={labelCSS}>Email</label>
                          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCSS}>Phone</label>
                          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} style={inputCSS} />
                        </div>
                      </div>

                      <div>
                        <label style={labelCSS}>Company (optional)</label>
                        <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} style={inputCSS} />
                      </div>

                      <div>
                        <label style={labelCSS}>How did you hear about us?</label>
                        <select value={form.source} onChange={(e) => update("source", e.target.value)} style={selectCSS}>
                          <option value="" style={{ background: "#132A3A" }}>Select</option>
                          <option value="google" style={{ background: "#132A3A" }}>Google</option>
                          <option value="referral" style={{ background: "#132A3A" }}>Referral</option>
                          <option value="social-media" style={{ background: "#132A3A" }}>Social Media</option>
                          <option value="press" style={{ background: "#132A3A" }}>Press</option>
                          <option value="other" style={{ background: "#132A3A" }}>Other</option>
                        </select>
                      </div>

                      <CheckboxField
                        checked={form.terms}
                        onChange={(v) => update("terms", v)}
                        label=""
                      />
                      {/* Terms label with links — rendered separately for proper HTML */}
                      <div style={{ marginTop: "-16px", paddingLeft: "30px" }}>
                        <span style={{ fontSize: "12px", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                          I accept the{" "}
                          <a href="/conditions-generales" style={{ color: "#F4DDC3", textDecoration: "none" }}>terms and conditions</a>
                          {" "}and the{" "}
                          <a href="/politique-confidentialite" style={{ color: "#F4DDC3", textDecoration: "none" }}>privacy policy</a>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 3 — RECAP ====== */}
                  {currentStep === 3 && (
                    <div style={colFlex()}>
                      <h3 style={stepTitleCSS}>Summary</h3>

                      <div style={colFlex("0px")}>
                        {(isYacht
                          ? [
                              { label: "Service", value: "Yacht Charter" },
                              { label: "Zone", value: zones.find((z) => z.v === form.navigationZone)?.l || "—" },
                              { label: "Embarkation", value: form.embarkationDate || "—" },
                              { label: "Disembarkation", value: form.disembarkationDate || "—" },
                              { label: "Guests", value: form.numberOfGuests },
                              { label: "Duration", value: durations.find((d) => d.v === form.durationDays)?.l || "—" },
                              { label: "Category", value: form.yachtCategory || "To be determined" },
                              { label: "Crew", value: form.crew === "with" ? "With crew" : "Without (bareboat)" },
                              { label: "Activities", value: form.waterActivities.length > 0 ? form.waterActivities.join(", ") : "None" },
                              { label: "Catering", value: form.yachtCatering },
                              { label: "Contact", value: `${form.firstName} ${form.lastName}`.trim() || "—" },
                              { label: "Email", value: form.email || "—" },
                              { label: "Phone", value: form.phone || "—" },
                            ]
                          : [
                              { label: "Service", value: "Private Aviation" },
                              { label: "Flight Type", value: form.type },
                              { label: "Route", value: `${form.departure || "—"} → ${form.destination || "—"}` },
                              { label: "Date", value: form.date ? (form.type === "round-trip" ? `${form.date} → ${form.returnDate || "—"}` : form.date) : "—" },
                              { label: "Passengers", value: form.passengers },
                              { label: "Category", value: form.category || "To be determined" },
                              { label: "Catering", value: form.catering },
                              { label: "Contact", value: `${form.firstName} ${form.lastName}`.trim() || "—" },
                              { label: "Email", value: form.email || "—" },
                              { label: "Phone", value: form.phone || "—" },
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
                    Back
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
                  {currentStep === 3 ? (isSubmitting ? "Sending..." : "Submit my request") : "Next"}
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
                Request Sent
              </h3>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(16px, 2.5vw, 18px)", color: "#A0A0A0", marginBottom: "8px" }}>
                Our team will contact you within 30 minutes
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#6B6B6B", marginBottom: "24px" }}>
                Request number: #{quoteRef || `SKY-${Date.now().toString().slice(-6)}`}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#A0A0A0", marginBottom: "32px" }}>
                Your request has been sent via WhatsApp.
                <br />If the window did not open,{" "}
                <a
                  href={waUrl || `https://wa.me/33676765511?text=${encodeURIComponent(`Hello, I submitted a quote request #${quoteRef || "SKY"}. Please get back to me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366", textDecoration: "underline" }}
                >
                  click here to send via WhatsApp
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
                Immediate Callback
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
export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteForm />
    </Suspense>
  );
}
