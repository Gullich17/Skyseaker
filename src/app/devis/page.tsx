"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const steps = ["Votre vol", "Vos préférences", "Vos coordonnées", "Confirmation"];

function DevisForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: "aller-simple",
    depart: "", destination: "", date: "", dateRetour: "", passagers: "2", flexibilite: false,
    categorie: "", catering: "standard", animaux: false, bagagesSpeciaux: false, transfert: "aucun", besoins: "",
    nom: "", prenom: "", email: "", telephone: "", entreprise: "", source: "",
    cgv: false,
  });

  // Pre-fill form from URL params (coming from homepage hero form)
  useEffect(() => {
    const type = searchParams.get("type");
    const depart = searchParams.get("depart");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    const dateRetour = searchParams.get("dateRetour");
    const passagers = searchParams.get("passagers");

    if (type || depart || destination || date || dateRetour || passagers) {
      setForm((prev) => ({
        ...prev,
        ...(type ? { type } : {}),
        ...(depart ? { depart } : {}),
        ...(destination ? { destination } : {}),
        ...(date ? { date } : {}),
        ...(dateRetour ? { dateRetour } : {}),
        ...(passagers ? { passagers } : {}),
      }));
    }
  }, [searchParams]);

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  const next = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else setSubmitted(true);
  };
  const prev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const inputStyle = "w-full";
  const inputCSS = {} as const;
  const labelCombinedStyle: React.CSSProperties = { display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" };

  return (
    <>
      <section className="pt-32 pb-8" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionTitle preTitle="DEVIS EN LIGNE" title="Obtenez votre devis personnalisé" subtitle="Réponse garantie sous 30 minutes, 24h/24" centered />
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center text-[13px] transition-all duration-300"
                    style={{
                      border: `1px solid ${i <= currentStep ? "#C9A96E" : "#1E1E1E"}`,
                      background: i < currentStep ? "#C9A96E" : i === currentStep ? "rgba(201,169,110,0.1)" : "transparent",
                      color: i < currentStep ? "#0A0A0A" : i === currentStep ? "#C9A96E" : "#6B6B6B",
                      fontFamily: "var(--font-montserrat)", fontWeight: 600,
                    }}>
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:block mt-2 text-[10px] uppercase tracking-[0.1em]"
                    style={{ color: i <= currentStep ? "#C9A96E" : "#6B6B6B", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[1px] mx-3" style={{ background: i < currentStep ? "#C9A96E" : "#1E1E1E" }} />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          {!submitted ? (
            <div className="glass-dark p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Your Flight */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <h3 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>Détails de votre vol</h3>
                      <div>
                        <label style={labelCombinedStyle}>Type de vol</label>
                        <div className="flex gap-3">
                          {[{ v: "aller-simple", l: "Aller simple" }, { v: "aller-retour", l: "Aller-retour" }, { v: "multi", l: "Multi-destinations" }].map((t) => (
                            <button key={t.v} onClick={() => update("type", t.v)}
                              className="transition-all"
                              style={{
                                padding: "10px 16px",
                                fontSize: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                border: `1px solid ${form.type === t.v ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                                color: form.type === t.v ? "#C9A96E" : "#6B6B6B",
                                background: form.type === t.v ? "rgba(201,169,110,0.1)" : "transparent",
                                fontFamily: "var(--font-montserrat)", fontWeight: 500,
                                cursor: "pointer", borderRadius: "2px",
                              }}>
                              {t.l}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label style={labelCombinedStyle}>Départ</label>
                          <input type="text" placeholder="Ville ou aéroport" value={form.depart} onChange={(e) => update("depart", e.target.value)} className={inputStyle} style={inputCSS} />
                        </div>
                        <div>
                          <label style={labelCombinedStyle}>Destination</label>
                          <input type="text" placeholder="Ville ou aéroport" value={form.destination} onChange={(e) => update("destination", e.target.value)} className={inputStyle} style={inputCSS} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label style={labelCombinedStyle}>Date de départ</label>
                          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputStyle} style={{ ...inputCSS, colorScheme: "dark" }} />
                        </div>
                        {form.type === "aller-retour" && (
                          <div>
                            <label style={labelCombinedStyle}>Date de retour</label>
                            <input type="date" value={form.dateRetour} onChange={(e) => update("dateRetour", e.target.value)} className={inputStyle} style={{ ...inputCSS, colorScheme: "dark" }} />
                          </div>
                        )}
                        <div>
                          <label style={labelCombinedStyle}>Passagers</label>
                          <select value={form.passagers} onChange={(e) => update("passagers", e.target.value)} className={inputStyle + " appearance-none"} style={inputCSS}>
                            {Array.from({ length: 19 }, (_, i) => (
                              <option key={i + 1} value={i + 1} style={{ background: "#141414" }}>{i + 1} passager{i > 0 ? "s" : ""}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.flexibilite} onChange={(e) => update("flexibilite", e.target.checked)} className="sr-only peer" />
                        <div className="flex items-center justify-center peer-checked:bg-[#C9A96E] transition-all" style={{ width: "18px", height: "18px", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", flexShrink: 0 }}>
                          <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-[13px] text-[#A0A0A0]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>Mes dates sont flexibles (+/- 2 jours)</span>
                      </label>
                    </div>
                  )}

                  {/* Step 2: Preferences */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>Vos préférences</h3>
                      <div>
                        <label style={labelCombinedStyle}>Catégorie d&apos;appareil souhaitée</label>
                        <select value={form.categorie} onChange={(e) => update("categorie", e.target.value)} className={inputStyle + " appearance-none"} style={inputCSS}>
                          <option value="" style={{ background: "#141414" }}>Je ne sais pas / Peu importe</option>
                          {["Very Light Jet", "Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Ultra Long Range"].map((c) => (
                            <option key={c} value={c} style={{ background: "#141414" }}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelCombinedStyle}>Catering</label>
                        <div className="flex flex-wrap gap-3">
                          {[{ v: "aucun", l: "Aucun" }, { v: "standard", l: "Standard" }, { v: "premium", l: "Premium" }, { v: "gastronomique", l: "Gastronomique" }].map((c) => (
                            <button key={c.v} onClick={() => update("catering", c.v)}
                              className="transition-all"
                              style={{
                                padding: "10px 16px",
                                fontSize: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                border: `1px solid ${form.catering === c.v ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                                color: form.catering === c.v ? "#C9A96E" : "#6B6B6B",
                                background: form.catering === c.v ? "rgba(201,169,110,0.1)" : "transparent",
                                fontFamily: "var(--font-montserrat)", fontWeight: 500,
                                cursor: "pointer", borderRadius: "2px",
                              }}>
                              {c.l}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[{ field: "animaux", label: "Animaux à bord" }, { field: "bagagesSpeciaux", label: "Bagages volumineux / spéciaux" }].map((opt) => (
                          <label key={opt.field} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={form[opt.field as keyof typeof form] as boolean} onChange={(e) => update(opt.field, e.target.checked)} className="sr-only peer" />
                            <div className="flex items-center justify-center peer-checked:bg-[#C9A96E] transition-all" style={{ width: "18px", height: "18px", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", flexShrink: 0 }}>
                              <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-[13px] text-[#A0A0A0]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      <div>
                        <label style={labelCombinedStyle}>Transfert terrestre</label>
                        <select value={form.transfert} onChange={(e) => update("transfert", e.target.value)} className={inputStyle + " appearance-none"} style={inputCSS}>
                          <option value="aucun" style={{ background: "#141414" }}>Aucun</option>
                          <option value="voiture" style={{ background: "#141414" }}>Voiture de luxe</option>
                          <option value="helicoptere" style={{ background: "#141414" }}>Hélicoptère</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelCombinedStyle}>Besoins spéciaux</label>
                        <textarea value={form.besoins} onChange={(e) => update("besoins", e.target.value)} rows={3} placeholder="Décrivez vos besoins particuliers..."
                          className={inputStyle + " resize-none"} style={inputCSS} />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>Vos coordonnées</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label style={labelCombinedStyle}>Nom</label>
                          <input type="text" value={form.nom} onChange={(e) => update("nom", e.target.value)} className={inputStyle} style={inputCSS} required />
                        </div>
                        <div>
                          <label style={labelCombinedStyle}>Prénom</label>
                          <input type="text" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} className={inputStyle} style={inputCSS} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label style={labelCombinedStyle}>Email</label>
                          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputStyle} style={inputCSS} required />
                        </div>
                        <div>
                          <label style={labelCombinedStyle}>Téléphone</label>
                          <input type="tel" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} className={inputStyle} style={inputCSS} required />
                        </div>
                      </div>
                      <div>
                        <label style={labelCombinedStyle}>Entreprise (optionnel)</label>
                        <input type="text" value={form.entreprise} onChange={(e) => update("entreprise", e.target.value)} className={inputStyle} style={inputCSS} />
                      </div>
                      <div>
                        <label style={labelCombinedStyle}>Comment nous avez-vous connu ?</label>
                        <select value={form.source} onChange={(e) => update("source", e.target.value)} className={inputStyle + " appearance-none"} style={inputCSS}>
                          <option value="" style={{ background: "#141414" }}>Sélectionnez</option>
                          <option value="google" style={{ background: "#141414" }}>Google</option>
                          <option value="recommandation" style={{ background: "#141414" }}>Recommandation</option>
                          <option value="reseaux" style={{ background: "#141414" }}>Réseaux sociaux</option>
                          <option value="presse" style={{ background: "#141414" }}>Presse</option>
                          <option value="autre" style={{ background: "#141414" }}>Autre</option>
                        </select>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.cgv} onChange={(e) => update("cgv", e.target.checked)} className="sr-only peer" />
                        <div className="flex items-center justify-center peer-checked:bg-[#C9A96E] transition-all" style={{ width: "18px", height: "18px", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", flexShrink: 0 }}>
                          <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-[12px] text-[#A0A0A0]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                          J&apos;accepte les <a href="/conditions-generales" className="text-[#C9A96E] hover:underline">conditions générales</a> et la <a href="/politique-confidentialite" className="text-[#C9A96E] hover:underline">politique de confidentialité</a>
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Step 4: Recap */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>Récapitulatif</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Type de vol", value: form.type },
                          { label: "Trajet", value: `${form.depart || "—"} → ${form.destination || "—"}` },
                          { label: "Date", value: form.date || "—" },
                          { label: "Passagers", value: form.passagers },
                          { label: "Catégorie", value: form.categorie || "À déterminer" },
                          { label: "Catering", value: form.catering },
                          { label: "Contact", value: `${form.prenom} ${form.nom}` },
                          { label: "Email", value: form.email || "—" },
                          { label: "Téléphone", value: form.telephone || "—" },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: "1px solid #1E1E1E" }}>
                            <span className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>{item.label}</span>
                            <span className="text-[14px] text-[#F5F5F0]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                {currentStep > 0 ? (
                  <button onClick={prev}
                    style={{ padding: "12px 24px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", border: "1px solid #F5F5F0", color: "#F5F5F0", background: "transparent", fontFamily: "var(--font-montserrat)", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease" }}>
                    Retour
                  </button>
                ) : <div />}
                <button onClick={next}
                  style={{
                    padding: "14px 32px",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    background: currentStep === 3 ? "linear-gradient(135deg, #C9A96E 0%, #D4B978 50%, #C9A96E 100%)" : "transparent",
                    border: currentStep === 3 ? "none" : "1px solid #C9A96E",
                    color: currentStep === 3 ? "#0A0A0A" : "#C9A96E",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: currentStep === 3 ? "0 4px 20px rgba(201,169,110,0.3)" : "none",
                    transition: "all 0.3s ease",
                  }}>
                  {currentStep === 3 ? "Envoyer ma demande" : "Suivant"}
                </button>
              </div>
            </div>
          ) : (
            /* Success */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-dark p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(45,139,111,0.1)", border: "1px solid #2D8B6F" }}>
                <svg width="32" height="32" fill="none" stroke="#2D8B6F" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-[28px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>Demande envoyée</h3>
              <p className="text-[16px] text-[#A0A0A0] mb-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
                Notre équipe vous contactera sous 30 minutes
              </p>
              <p className="text-[13px] text-[#6B6B6B] mb-8" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                Numéro de demande : #SKY-{Date.now().toString().slice(-6)}
              </p>
              <a href="tel:+33100000000" className="inline-block px-8 py-3 text-[12px] uppercase tracking-[0.2em] border transition-all hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                style={{ borderColor: "#C9A96E", color: "#C9A96E", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>
                Rappel immédiat
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export default function DevisPage() {
  return (
    <Suspense fallback={null}>
      <DevisForm />
    </Suspense>
  );
}
