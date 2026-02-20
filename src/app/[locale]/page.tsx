"use client";

import { useState, useRef, useCallback } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { emptyLegs } from "@/data/emptyLegs";
import { yachts } from "@/data/yachts";
import { fleet } from "@/data/fleet";
import CityAutocomplete from "@/components/ui/CityAutocomplete";

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  const t = useTranslations("home");
  const router = useRouter();
  const [heroMode, setHeroMode] = useState<"aviation" | "yacht">("aviation");
  const [tripType, setTripType] = useState<"aller" | "ar" | "multi">("aller");
  const [showOptions, setShowOptions] = useState(false);
  const [legs, setLegs] = useState([{ from: "", to: "", date: "" }]);
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [dateRetour, setDateRetour] = useState("");
  const [passagers, setPassagers] = useState("2");
  // Yacht fields
  const [yachtZone, setYachtZone] = useState("");
  const [yachtDateStart, setYachtDateStart] = useState("");
  const [yachtDateEnd, setYachtDateEnd] = useState("");
  const [yachtGuests, setYachtGuests] = useState("6");

  const handleSubmit = () => {
    if (heroMode === "yacht") {
      const params = new URLSearchParams();
      params.set("service", "yacht");
      if (yachtZone) params.set("zone", yachtZone);
      if (yachtDateStart) params.set("date", yachtDateStart);
      if (yachtGuests) params.set("passagers", yachtGuests);
      router.push(`/devis?${params.toString()}`);
      return;
    }
    const typeMap = { aller: "aller-simple", ar: "aller-retour", multi: "multi" };
    const params = new URLSearchParams();
    params.set("type", typeMap[tripType]);
    if (tripType !== "multi") {
      if (depart) params.set("depart", depart);
      if (destination) params.set("destination", destination);
      if (date) params.set("date", date);
      if (tripType === "ar" && dateRetour) params.set("dateRetour", dateRetour);
      params.set("passagers", passagers);
    } else {
      if (legs[0]?.from) params.set("depart", legs[0].from);
      if (legs[0]?.to) params.set("destination", legs[0].to);
      if (legs[0]?.date) params.set("date", legs[0].date);
      params.set("passagers", passagers);
    }
    router.push(`/devis?${params.toString()}`);
  };

  const tabs = [
    { id: "aller" as const, label: t("hero.tripTypes.oneWay") },
    { id: "ar" as const, label: t("hero.tripTypes.roundTrip") },
    { id: "multi" as const, label: t("hero.tripTypes.multiCity") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fleet/falcon-8x/main.png"
          alt="Private jet in flight"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,32,45,0.7) 0%, rgba(14,32,45,0.5) 40%, rgba(14,32,45,0.85) 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full" style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px, 15vh, 120px) 24px clamp(40px, 6vh, 60px)" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, fontSize: "clamp(40px, 5.5vw, 72px)", marginBottom: "48px" }}
        >
          {t("hero.title1")} {t("hero.title2")}
        </motion.h1>

        {/* Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "linear-gradient(145deg, rgba(15, 37, 53, 0.97) 0%, rgba(14, 32, 45, 0.95) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(244, 221, 195, 0.22)",
            borderRadius: "6px",
            padding: "clamp(24px, 3.5vw, 32px) clamp(20px, 4vw, 40px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(244,221,195,0.08)",
          }}
        >
          {/* Mode Toggle — Aviation / Yacht */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
            <button
              onClick={() => setHeroMode("aviation")}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 20px",
                fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                fontFamily: "var(--font-montserrat)", fontWeight: heroMode === "aviation" ? 600 : 400,
                color: heroMode === "aviation" ? "#0E202D" : "#8A8A8A",
                background: heroMode === "aviation" ? "#F4DDC3" : "rgba(244,221,195,0.06)",
                border: heroMode === "aviation" ? "1px solid #F4DDC3" : "1px solid rgba(244,221,195,0.15)",
                borderRadius: "4px", cursor: "pointer", transition: "all 0.3s ease",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              {t("hero.tabs.flight")}
            </button>
            <button
              onClick={() => setHeroMode("yacht")}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 20px",
                fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                fontFamily: "var(--font-montserrat)", fontWeight: heroMode === "yacht" ? 600 : 400,
                color: heroMode === "yacht" ? "#0E202D" : "#8A8A8A",
                background: heroMode === "yacht" ? "#F4DDC3" : "rgba(244,221,195,0.06)",
                border: heroMode === "yacht" ? "1px solid #F4DDC3" : "1px solid rgba(244,221,195,0.15)",
                borderRadius: "4px", cursor: "pointer", transition: "all 0.3s ease",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M2 20s2 2 5 2 5-2 5-2 2 2 5 2 5-2 5-2" />
                <path d="M4 18l1.2-5.6a2 2 0 012-1.4h9.6a2 2 0 012 1.4L20 18" />
                <path d="M12 11V4" />
                <path d="M12 4l6 7" />
              </svg>
              {t("hero.tabs.yacht")}
            </button>
          </div>

          {/* Aviation Tabs — only shown in aviation mode */}
          {heroMode === "aviation" && (
            <div style={{ display: "flex", gap: "0", marginBottom: "24px", borderBottom: "1px solid rgba(244,221,195,0.15)", overflowX: "auto" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTripType(tab.id)}
                  className="relative"
                  style={{
                    padding: "12px clamp(12px, 2.5vw, 24px)",
                    fontSize: "clamp(10px, 1.2vw, 11px)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: tripType === tab.id ? 600 : 400,
                    color: tripType === tab.id ? "#F4DDC3" : "#8A8A8A",
                    background: tripType === tab.id ? "rgba(244,221,195,0.06)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {tab.label}
                  {tripType === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#F4DDC3" }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Yacht subtitle — only shown in yacht mode */}
          {heroMode === "yacht" && (
            <div style={{ marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid rgba(244,221,195,0.12)" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>
                {t("hero.yachtForm.title")}
              </span>
            </div>
          )}

          {/* Form Fields */}
          {heroMode === "aviation" ? (
            <>
              {tripType !== "multi" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                  <CityAutocomplete
                    value={depart}
                    onChange={setDepart}
                    placeholder={t("hero.form.cityOrAirport")}
                    label={t("hero.form.departure")}
                    labelStyle={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}
                    inputStyle={{ width: "100%", paddingLeft: "42px", paddingRight: "14px", paddingTop: "14px", paddingBottom: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none", transition: "border-color 0.3s ease" }}
                    icon={<svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 12L3.27 3.13a1 1 0 01.89-1.38L12 2l7.84-.25a1 1 0 01.89 1.38L18 12" /><path d="M3 20h18" /></svg>}
                  />
                  <CityAutocomplete
                    value={destination}
                    onChange={setDestination}
                    placeholder={t("hero.form.cityOrAirport")}
                    label={t("hero.form.destination")}
                    labelStyle={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}
                    inputStyle={{ width: "100%", paddingLeft: "42px", paddingRight: "14px", paddingTop: "14px", paddingBottom: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none", transition: "border-color 0.3s ease" }}
                    icon={<svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 12L20.73 20.87a1 1 0 01-.89 1.38L12 22l-7.84.25a1 1 0 01-.89-1.38L6 12" /><path d="M3 4h18" /></svg>}
                  />
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                      {tripType === "ar" ? t("hero.form.dates") : t("hero.form.date")}
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                      />
                      {tripType === "ar" && (
                        <input
                          type="date"
                          value={dateRetour}
                          onChange={(e) => setDateRetour(e.target.value)}
                          style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                      {t("hero.form.passengers")}
                    </label>
                    <select
                      style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer" }}
                      value={passagers}
                      onChange={(e) => setPassagers(e.target.value)}
                    >
                      {Array.from({ length: 19 }, (_, i) => (
                        <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                          {i + 1} passenger{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                /* Multi-destinations */
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {legs.map((leg, idx) => (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "18px", alignItems: "end" }}>
                        <CityAutocomplete
                          value={leg.from}
                          onChange={(v) => { const n = [...legs]; n[idx].from = v; setLegs(n); }}
                          placeholder={t("hero.form.cityOrAirport")}
                          label={idx === 0 ? t("hero.form.departure") : `Leg ${idx + 1}`}
                          labelStyle={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}
                          inputStyle={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none" }}
                        />
                        <CityAutocomplete
                          value={leg.to}
                          onChange={(v) => { const n = [...legs]; n[idx].to = v; setLegs(n); }}
                          placeholder={t("hero.form.cityOrAirport")}
                          label={t("hero.form.destination")}
                          labelStyle={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}
                          inputStyle={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, outline: "none" }}
                        />
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input
                            type="date"
                            value={leg.date}
                            onChange={(e) => { const n = [...legs]; n[idx].date = e.target.value; setLegs(n); }}
                            style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                          />
                          {idx > 0 && (
                            <button
                              onClick={() => setLegs(legs.filter((_, i) => i !== idx))}
                              style={{ padding: "0 12px", color: "#8B2D2D", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setLegs([...legs, { from: "", to: "", date: "" }])}
                    style={{ marginTop: "16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                  >
                    + Add a leg
                  </button>
                </div>
              )}

              {/* Extra Options */}
              <button
                onClick={() => setShowOptions(!showOptions)}
                style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(244,221,195,0.7)", fontFamily: "var(--font-montserrat)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", marginBottom: "24px", transition: "color 0.3s ease" }}
              >
                Options
                <motion.svg animate={{ rotate: showOptions ? 180 : 0 }} width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {showOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "18px", marginBottom: "28px", overflow: "hidden" }}
                >
                  {[t("hero.options.petsOnBoard"), t("hero.options.oversizedLuggage"), t("hero.options.specialCatering"), t("hero.options.groundTransfer")].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="flex items-center justify-center peer-checked:bg-[#F4DDC3] transition-all"
                        style={{ width: "18px", height: "18px", border: "1px solid rgba(244,221,195,0.3)", borderRadius: "2px", flexShrink: 0 }}>
                        <svg className="opacity-0 peer-checked:opacity-100" width="12" height="12" fill="none" stroke="#0E202D" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="group-hover:text-[#FFFFFF] transition-colors"
                        style={{ fontSize: "12px", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            /* ===== YACHT FORM FIELDS ===== */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  {t("hero.yachtForm.cruisingArea")}
                </label>
                <select
                  value={yachtZone}
                  onChange={(e) => setYachtZone(e.target.value)}
                  style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(244,221,195,0.2)", borderRadius: "3px", color: yachtZone ? "#FFFFFF" : "#6B6B6B", fontFamily: "var(--font-montserrat)", fontWeight: 300, WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer" }}
                >
                  <option value="" style={{ background: "#132A3A" }}>Select</option>
                  <option value="mediterranee" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.mediterranean")}</option>
                  <option value="caraibes" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.caribbean")}</option>
                  <option value="asie-pacifique" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.asiaPacific")}</option>
                  <option value="europe-nord" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.northernEurope")}</option>
                  <option value="ocean-indien" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.indianOcean")}</option>
                  <option value="autre" style={{ background: "#132A3A" }}>{t("hero.yachtForm.zones.other")}</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  {t("hero.yachtForm.embarkation")}
                </label>
                <input
                  type="date"
                  value={yachtDateStart}
                  onChange={(e) => setYachtDateStart(e.target.value)}
                  style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  {t("hero.yachtForm.disembarkation")}
                </label>
                <input
                  type="date"
                  value={yachtDateEnd}
                  onChange={(e) => setYachtDateEnd(e.target.value)}
                  style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, colorScheme: "dark", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600, marginBottom: "10px" }}>
                  {t("hero.yachtForm.guests")}
                </label>
                <select
                  value={yachtGuests}
                  onChange={(e) => setYachtGuests(e.target.value)}
                  style={{ width: "100%", padding: "14px", fontSize: "13px", background: "rgba(244,221,195,0.06)", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", color: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontWeight: 300, WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer" }}
                >
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i + 1} value={i + 1} style={{ background: "#132A3A" }}>
                      {i + 1} guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "20px 24px",
              background: "linear-gradient(135deg, #F4DDC3 0%, #e8ccac 100%)",
              color: "#0E202D",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 6px 30px rgba(244,221,195,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {heroMode === "yacht" ? t("hero.form.submitYacht") : t("hero.form.submitFlight")}
          </button>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(244,221,195,0.5)", fontFamily: "var(--font-montserrat)", fontWeight: 300, letterSpacing: "0.05em" }}>
            {t("hero.form.disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   TRUST BANNER
   ============================================ */
function TrustBanner() {
  const t = useTranslations("home");
  const stats = [
    { value: 15000, suffix: "+", label: t("trust.flightsCompleted") },
    { value: 120000, suffix: "+", label: t("trust.passengersCarried") },
    { value: 8500, suffix: "+", label: t("trust.aircraftAvailable") },
    { value: 24, suffix: "/7", label: t("trust.availability") },
    { value: 4.9, suffix: "/5", label: t("trust.clientSatisfaction") },
  ];

  return (
    <section style={{ background: "#112130", borderTop: "1px solid rgba(244,221,195,0.12)", borderBottom: "1px solid rgba(244,221,195,0.12)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(28px, 5vw, 56px) 0" }}>
        <div
          className="scrollbar-hide"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0 24px",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", flexShrink: 0, minWidth: "max-content" }}>
              <div style={{ textAlign: "center", padding: "0 clamp(12px, 2vw, 24px)", whiteSpace: "nowrap" }}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
              {i < stats.length - 1 && (
                <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, rgba(244,221,195,0.25), transparent)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SERVICES SECTION
   ============================================ */
function ServicesSection() {
  const t = useTranslations("home");
  const serviceCards = [
    { title: t("services.cards.bespokeCharter.title"), desc: t("services.cards.bespokeCharter.description"), href: "/services/affretement-jet-prive", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75" },
    { title: t("services.cards.emptyLegs.title"), desc: t("services.cards.emptyLegs.description"), href: "/services/vols-a-vide-empty-legs", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75" },
    { title: t("services.cards.groupTravel.title"), desc: t("services.cards.groupTravel.description"), href: "/services/voyage-groupe", img: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75" },
    { title: t("services.cards.urgentCargo.title"), desc: t("services.cards.urgentCargo.description"), href: "/services/fret-urgent", img: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75" },
    { title: t("services.cards.concierge.title"), desc: t("services.cards.concierge.description"), href: "/services/conciergerie-lifestyle", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75" },
    { title: t("services.cards.exclusiveExperiences.title"), desc: t("services.cards.exclusiveExperiences.description"), href: "/experiences", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75" },
  ];

  return (
    <section style={{ background: "#0E202D", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("services.preTitle")}
          title={t("services.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 40px)" }}>
          {serviceCards.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.08}>
              <Link href={svc.href} className="block group h-full">
                <div className="card-luxury overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={svc.img}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,42,58,1) 0%, rgba(19,42,58,0.2) 50%, transparent 100%)" }} />
                  </div>
                  <div style={{ padding: "clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px) clamp(24px, 3vw, 32px)" }} className="flex-1 flex flex-col">
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(17px, 2.5vw, 20px)", marginBottom: "10px", lineHeight: 1.3 }}
                        className="group-hover:text-[#F4DDC3] transition-colors">
                      {svc.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "clamp(13px, 1.5vw, 14px)", lineHeight: 1.7, marginBottom: "16px", flex: 1 }}>
                      {svc.desc}
                    </p>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                      {t("services.viewAllCta")}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   WHY CHOOSE US
   ============================================ */
function WhyChooseUs() {
  const t = useTranslations("home");
  const points = [
    { title: t("whyChooseUs.points.responsiveness.title"), desc: t("whyChooseUs.points.responsiveness.description"), icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: t("whyChooseUs.points.transparency.title"), desc: t("whyChooseUs.points.transparency.description"), icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { title: t("whyChooseUs.points.safety.title"), desc: t("whyChooseUs.points.safety.description"), icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
    { title: t("whyChooseUs.points.bespoke.title"), desc: t("whyChooseUs.points.bespoke.description"), icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  ];

  return (
    <section style={{ background: "#112130", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(48px, 6vw, 80px)" }}>
          {/* Image */}
          <ScrollReveal>
            <div className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: "4px" }}>
              <Image
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
                alt="Luxury private jet interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(14,32,45,0.3), rgba(14,32,45,0.1))" }} />
            </div>
          </ScrollReveal>

          {/* Points */}
          <div>
            <SectionTitle
              preTitle={t("whyChooseUs.preTitle")}
              title={t("whyChooseUs.title")}
              mb="clamp(40px, 5vw, 56px)"
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {points.map((pt, i) => (
                <ScrollReveal key={pt.title} delay={i * 0.12}>
                  <div className="flex" style={{ gap: "20px" }}>
                    <div className="shrink-0 flex items-center justify-center" style={{ width: "52px", height: "52px", border: "1px solid rgba(244,221,195,0.25)", borderRadius: "4px", background: "rgba(244,221,195,0.04)" }}>
                      <svg width="22" height="22" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24"><path d={pt.icon} /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#FFFFFF", fontSize: "16px", marginBottom: "6px" }}>
                        {pt.title}
                      </h4>
                      <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", lineHeight: 1.7 }}>
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div style={{ marginTop: "48px" }}>
              <Button href="/a-propos" variant="primary">
                {t("whyChooseUs.cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FLEET SHOWCASE
   ============================================ */
function FleetShowcase() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    // Only hijack if there's horizontal overflow
    const hasOverflow = el.scrollWidth > el.clientWidth;
    if (!hasOverflow) return;
    // Prevent page scroll, convert vertical wheel to horizontal
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    // Allow page scroll if already at carousel edge and scrolling further
    if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  const featuredSlugs = [
    "embraer-phenom-300",
    "cessna-citation-latitude",
    "challenger-350",
    "bombardier-global-6500",
    "gulfstream-g650",
    "dassault-falcon-8x",
    "bombardier-global-7500",
  ];
  const featuredAircraft = featuredSlugs
    .map((slug) => fleet.find((a) => a.id === slug))
    .filter(Boolean)
    .map((a) => ({
      name: a!.name,
      category: a!.category,
      categorySlug: a!.categorySlug,
      pax: `${a!.passengers} pax`,
      range: `${a!.range.toLocaleString("en-US")} km`,
      speed: `${a!.speed} km/h`,
      slug: a!.id,
      img: a!.image,
    }));

  return (
    <section style={{ background: "#0E202D", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("fleetShowcase.preTitle")}
          title={t("fleetShowcase.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />

        {/* Horizontal scrollable with scroll indicator */}
        <ScrollReveal>
        <div className="relative">
          <div ref={scrollRef} onWheel={handleWheel} className="overflow-x-auto pb-8 scrollbar-hide" style={{ margin: "0 -10px", padding: "0 10px", overscrollBehavior: "contain" }}>
            <div className="flex" style={{ gap: "20px", minWidth: "max-content" }}>
              {featuredAircraft.map((ac) => (
                <Link key={ac.slug} href={`/flotte/${ac.categorySlug}/${ac.slug}`} className="block group" style={{ width: "clamp(280px, 40vw, 340px)" }}>
                  <div className="card-luxury overflow-hidden">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={ac.img}
                        alt={ac.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,42,58,0.8) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                        <Badge>{ac.category}</Badge>
                      </div>
                    </div>
                    <div style={{ padding: "20px 20px 24px" }}>
                      <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "18px", marginBottom: "10px" }}
                          className="group-hover:text-[#F4DDC3] transition-colors">
                        {ac.name}
                      </h3>
                      <div className="flex items-center text-[#A0A0A0]" style={{ gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "11px" }}>
                        <span>{ac.pax} pax</span>
                        <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                        <span>{ac.range}</span>
                        <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                        <span>{ac.speed}</span>
                      </div>
                      <span style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                        {tc("viewDetails")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 mt-2" style={{ color: "#6B6B6B", fontSize: "11px", fontFamily: "var(--font-montserrat)" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M8 7l4-4m0 0l4 4m-4-4v18" style={{ transform: "rotate(90deg)", transformOrigin: "center" }} /></svg>
            <span>{t("fleetShowcase.scrollHint")}</span>
          </div>
        </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginTop: "clamp(32px, 5vw, 56px)" }}>
          <Button href="/flotte" variant="primary">{t("fleetShowcase.exploreFull")}</Button>
          <Link href="/flotte/comparateur" className="hover:text-[#F4DDC3] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0" }}>
            {t("fleetShowcase.compareAircraft")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   YACHT SHOWCASE
   ============================================ */
function YachtShowcase() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const yachtScrollRef = useRef<HTMLDivElement>(null);

  const handleYachtWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = yachtScrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    if (!hasOverflow) return;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  const yachtFallbacks: Record<string, string> = {
    "motor-yacht": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&q=75",
    "sailing-yacht": "https://images.unsplash.com/photo-1534854638093-ba35f2a8a7d7?w=500&q=75",
    "catamaran": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=75",
    "superyacht": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=500&q=75",
    "mega-yacht": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=500&q=75",
  };

  const featuredYachts = yachts.slice(0, 5).map((y) => ({
    name: y.name,
    category: y.category,
    guests: `${y.guests} guests`,
    length: `${y.length} m`,
    speed: `${y.maxSpeed ?? '-'} nds`,
    slug: y.id,
    categorySlug: y.categorySlug,
    img: y.image?.startsWith("http") ? y.image : yachtFallbacks[y.categorySlug] || yachtFallbacks["motor-yacht"],
  }));

  return (
    <section style={{ background: "#112130", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("yachtShowcase.preTitle")}
          title={t("yachtShowcase.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />

        {/* Horizontal scrollable */}
        <ScrollReveal>
        <div className="relative">
          <div ref={yachtScrollRef} onWheel={handleYachtWheel} className="overflow-x-auto pb-8 scrollbar-hide" style={{ margin: "0 -10px", padding: "0 10px", overscrollBehavior: "contain" }}>
            <div className="flex" style={{ gap: "20px", minWidth: "max-content" }}>
              {featuredYachts.map((yacht) => (
                <Link key={yacht.slug} href={`/yachts/${yacht.categorySlug}/${yacht.slug}`} className="block group" style={{ width: "clamp(280px, 40vw, 340px)" }}>
                  <div className="card-luxury overflow-hidden">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={yacht.img}
                        alt={yacht.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,42,58,0.8) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                        <Badge>{yacht.category}</Badge>
                      </div>
                    </div>
                    <div style={{ padding: "20px 20px 24px" }}>
                      <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "18px", marginBottom: "10px" }}
                          className="group-hover:text-[#F4DDC3] transition-colors">
                        {yacht.name}
                      </h3>
                      <div className="flex items-center text-[#A0A0A0]" style={{ gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "11px" }}>
                        <span>{yacht.guests}</span>
                        <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                        <span>{yacht.length}</span>
                        <span style={{ width: "1px", height: "10px", background: "rgba(244,221,195,0.2)" }} />
                        <span>{yacht.speed}</span>
                      </div>
                      <span style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                        {tc("viewDetails")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 mt-2" style={{ color: "#6B6B6B", fontSize: "11px", fontFamily: "var(--font-montserrat)" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M8 7l4-4m0 0l4 4m-4-4v18" style={{ transform: "rotate(90deg)", transformOrigin: "center" }} /></svg>
            <span>{t("fleetShowcase.scrollHint")}</span>
          </div>
        </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginTop: "clamp(32px, 5vw, 56px)" }}>
          <Button href="/yachts" variant="primary">{t("yachtShowcase.exploreAll")}</Button>
          <Link href="/yachts/comparateur" className="hover:text-[#F4DDC3] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0" }}>
            {t("yachtShowcase.compareYachts")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   EMPTY LEGS
   ============================================ */
function EmptyLegsSection() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const featured = emptyLegs.slice(0, 4);

  return (
    <section style={{ background: "#112130", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("emptyLegs.preTitle")}
          title={t("emptyLegs.title")}
          subtitle={t("emptyLegs.subtitle")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {featured.map((el, i) => (
            <ScrollReveal key={el.id} delay={i * 0.08}>
              <div className="card-luxury overflow-hidden" style={{ padding: "clamp(20px, 3vw, 28px) clamp(20px, 3vw, 32px)" }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between" style={{ gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center mb-3 flex-wrap" style={{ gap: "10px" }}>
                      <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(17px, 2.5vw, 20px)" }}>
                        {el.departure}
                      </span>
                      <svg width="20" height="20" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(17px, 2.5vw, 20px)" }}>
                        {el.arrival}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap" style={{ gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "12px", color: "#A0A0A0" }}>
                      <span>{new Date(el.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="hidden sm:inline-block" style={{ width: "1px", height: "12px", background: "rgba(244,221,195,0.2)" }} />
                      <span>{el.aircraft}</span>
                      <span className="hidden sm:inline-block" style={{ width: "1px", height: "12px", background: "rgba(244,221,195,0.2)" }} />
                      <span>{el.seats} {tc("seats")}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 sm:text-right text-left w-full sm:w-auto">
                    <Badge>-{el.discount}%</Badge>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "line-through", marginRight: "10px" }}>{el.originalPrice.toLocaleString("en-US")}€</span>
                      <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "26px", color: "#F4DDC3" }}>
                        {el.emptyLegPrice.toLocaleString("en-US")}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginTop: "clamp(32px, 5vw, 56px)" }}>
          <Button href="/empty-legs" variant="primary">{t("emptyLegs.viewAll")}</Button>
          <Link href="/empty-legs#alertes" className="hover:text-[#F4DDC3] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0" }}>
            {t("emptyLegs.setAlert")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATIONS
   ============================================ */
function DestinationsSection() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const destKeys = ["geneva", "london", "mykonos", "dubai", "marrakech", "ibiza"] as const;
  const destSlugs: Record<string, string> = { geneva: "geneve", london: "londres", mykonos: "mykonos", dubai: "dubai", marrakech: "marrakech", ibiza: "ibiza" };
  const destImgs: Record<string, string> = { geneva: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=75", london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75", mykonos: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=75", dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75", marrakech: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=75", ibiza: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=75" };
  const destCards = destKeys.map((key) => ({
    name: t(`destinations.cards.${key}.name`),
    country: t(`destinations.cards.${key}.country`),
    time: t(`destinations.cards.${key}.time`),
    slug: destSlugs[key],
    img: destImgs[key],
  }));

  return (
    <section style={{ background: "#0E202D", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("destinations.preTitle")}
          title={t("destinations.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />
        <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(12px, 2vw, 24px)" }}>
          {destCards.map((dest, i) => (
            <ScrollReveal key={dest.slug} delay={i * 0.08}>
              <Link href={`/destinations/${dest.slug}`} className="block group relative overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: "4px" }}>
                <Image
                  src={dest.img}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,32,45,0.9) 0%, rgba(14,32,45,0.2) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0" style={{ padding: "clamp(16px, 3vw, 32px)" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(20px, 3vw, 30px)", marginBottom: "4px", lineHeight: 1.2 }}>
                    {dest.name}
                  </h3>
                  <p className="hidden sm:block" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#B0B0B0", fontSize: "13px", marginBottom: "6px" }}>
                    {dest.country}
                  </p>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#F4DDC3", fontSize: "clamp(11px, 1.5vw, 13px)" }}>
                    {dest.time} {tc("fromParis")}
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ border: "2px solid rgba(244,221,195,0.3)", borderRadius: "4px" }} />
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
          <Button href="/destinations" variant="primary">{t("destinations.viewAll")}</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TESTIMONIALS
   ============================================ */
function TestimonialsSection() {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { quote: t("testimonials.items.1.quote"), name: t("testimonials.items.1.name"), role: t("testimonials.items.1.role"), stars: 5 },
    { quote: t("testimonials.items.2.quote"), name: t("testimonials.items.2.name"), role: t("testimonials.items.2.role"), stars: 5 },
    { quote: t("testimonials.items.3.quote"), name: t("testimonials.items.3.name"), role: t("testimonials.items.3.role"), stars: 5 },
  ];

  return (
    <section className="relative overflow-hidden" style={{ padding: "clamp(80px, 12vw, 140px) 0" }}>
      {/* BG */}
      <div className="absolute inset-0" style={{ background: "#0E202D" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(circle at 50% 50%, #F4DDC3 0%, transparent 70%)" }} />
      </div>

      <div className="relative text-center" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("testimonials.preTitle")}
          title={t("testimonials.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />

        <div className="relative" style={{ minHeight: "220px" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: current === i ? 1 : 0, y: current === i ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
              style={{ pointerEvents: current === i ? "auto" : "none" }}
            >
              {/* Decorative quotes */}
              <div style={{ fontFamily: "Georgia, serif", fontSize: "140px", lineHeight: "0.8", color: "#F4DDC3", opacity: 0.08, position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)" }}>
                &ldquo;
              </div>
              <blockquote style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic", color: "#FFFFFF", fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.6, marginBottom: "32px", position: "relative", zIndex: 1 }}>
                {t.quote}
              </blockquote>
              <div className="flex items-center justify-center" style={{ gap: "4px", marginBottom: "18px" }}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <svg key={si} width="18" height="18" fill="#F4DDC3" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "15px", color: "#FFFFFF", marginBottom: "4px" }}>
                {t.name}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "13px", color: "#8A8A8A" }}>
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center" style={{ gap: "12px", marginTop: "40px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: current === i ? "#F4DDC3" : "rgba(244,221,195,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BLOG PREVIEW
   ============================================ */
function BlogPreview() {
  const t = useTranslations("home");
  const articles = [
    { title: "The 10 Most Popular Private Jet Destinations in 2026", cat: "Destinations", date: "Feb 12, 2026", time: "5 min", slug: "top-destinations-2026", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75" },
    { title: "Complete Guide: How to Choose Your Private Jet", cat: "Guides", date: "Feb 8, 2026", time: "8 min", slug: "guide-choisir-jet-prive", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75" },
    { title: "Empty Legs: Everything You Need to Know to Fly Smart", cat: "Guides", date: "Feb 3, 2026", time: "6 min", slug: "empty-legs-guide-complet", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75" },
  ];

  return (
    <section style={{ background: "#112130", padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          preTitle={t("blogPreview.preTitle")}
          title={t("blogPreview.title")}
          centered
          mb="clamp(48px, 6vw, 64px)"
        />
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(20px, 3vw, 32px)" }}>
          {articles.map((art, i) => (
            <ScrollReveal key={art.slug} delay={i * 0.08}>
              <Link href={`/blog/${art.slug}`} className="block group h-full">
                <div className="card-luxury overflow-hidden h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,42,58,0.6) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                      <Badge>{art.cat}</Badge>
                    </div>
                  </div>
                  <div style={{ padding: "clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px) clamp(24px, 3vw, 32px)" }} className="flex-1 flex flex-col">
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.45, marginBottom: "12px" }}
                        className="group-hover:text-[#F4DDC3] transition-colors">
                      {art.title}
                    </h3>
                    <div className="flex items-center" style={{ gap: "10px", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "11px", color: "#8A8A8A", marginBottom: "14px" }}>
                      <span>{art.date}</span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(244,221,195,0.15)" }} />
                      <span>{art.time} read</span>
                    </div>
                    <span className="mt-auto" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3" }}>
                      {t("blogPreview.readArticle")}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
          <Button href="/blog" variant="secondary">{t("blogPreview.viewAllArticles")}</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FINAL CTA
   ============================================ */
function FinalCTA() {
  const t = useTranslations("home");
  return (
    <section className="relative overflow-hidden" style={{ padding: "clamp(80px, 12vw, 140px) 0" }}>
      <div className="absolute inset-0">
        <Image
          src="/images/fleet/gulfstream-g650er/main.png"
          alt="Private jet in flight"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(14,32,45,0.85)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(244,221,195,0.06) 0%, transparent 70%)" }} />
      </div>
      <div className="relative text-center" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(30px, 5vw, 52px)", marginBottom: "16px", lineHeight: 1.1 }}>
            {t("finalCta.title")}
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(17px, 2.5vw, 22px)", color: "#B0B0B0", marginBottom: "clamp(32px, 5vw, 48px)", lineHeight: 1.6 }}>
            {t("finalCta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "16px", marginBottom: "clamp(24px, 4vw, 36px)" }}>
            <Button href="/devis" variant="primary" size="lg">{t("finalCta.requestQuote")}</Button>
            <Button href="tel:+33100000000" variant="secondary" size="lg">{t("finalCta.callUs")}</Button>
          </div>
          <a href="tel:+33100000000" className="hover:text-[#F4DDC3] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(22px, 3vw, 28px)", color: "#F4DDC3", letterSpacing: "0.08em" }}>
            +33 1 00 00 00 00
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   HOMEPAGE
   ============================================ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBanner />
      <ServicesSection />
      <WhyChooseUs />
      <FleetShowcase />
      <YachtShowcase />
      <EmptyLegsSection />
      <DestinationsSection />
      <TestimonialsSection />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
