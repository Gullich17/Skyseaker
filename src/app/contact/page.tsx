"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "", sujet: "devis", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const bureaux = [
    { city: "Paris", address: "Avenue des Champs-Élysées, 75008 Paris", phone: "+33 1 00 00 00 00" },
    { city: "Monaco", address: "Boulevard des Moulins, 98000 Monaco", phone: "+377 00 00 00 00" },
    { city: "Genève", address: "Rue du Rhône, 1204 Genève", phone: "+41 00 000 00 00" },
    { city: "Dubaï", address: "DIFC, Sheikh Zayed Road, Dubai", phone: "+971 0 000 0000" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionTitle preTitle="CONTACT" title="Parlons de votre prochain vol" subtitle="Notre équipe est à votre disposition 24h/24 pour répondre à toutes vos questions" centered />
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding" style={{ background: "#141414" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <ScrollReveal className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Nom</label>
                    <input type="text" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required
                      className="w-full" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Prénom</label>
                    <input type="text" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} required
                      className="w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                      className="w-full" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Téléphone</label>
                    <input type="tel" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full" />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Sujet</label>
                  <select value={formData.sujet} onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    className="w-full">
                    <option value="devis" style={{ background: "#141414" }}>Demande de devis</option>
                    <option value="partenariat" style={{ background: "#141414" }}>Partenariat</option>
                    <option value="presse" style={{ background: "#141414" }}>Presse</option>
                    <option value="recrutement" style={{ background: "#141414" }}>Recrutement</option>
                    <option value="autre" style={{ background: "#141414" }}>Autre</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A0A0A0", fontFamily: "var(--font-montserrat)", fontWeight: 500, marginBottom: "8px" }}>Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={6} required
                    className="w-full" style={{ resize: "none" }} />
                </div>
                <button type="submit"
                  className="w-full transition-all duration-300 hover:opacity-90"
                  style={{
                    padding: "18px",
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B978 50%, #C9A96E 100%)",
                    color: "#0A0A0A",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(201,169,110,0.3)",
                  }}>
                  Envoyer
                </button>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal className="lg:col-span-2" delay={0.2}>
              <div className="space-y-10">
                {/* Direct Contact */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>Contact direct</h3>
                  <div className="space-y-4">
                    <a href="tel:+33100000000" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#C9A96E] transition-colors">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                      <span className="text-[14px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>+33 1 00 00 00 00</span>
                    </a>
                    <a href="mailto:contact@skyseaker.com" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#C9A96E] transition-colors">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                      <span className="text-[14px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>contact@skyseaker.com</span>
                    </a>
                    <a href="https://wa.me/33100000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#25D366] hover:opacity-80 transition-opacity">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <span className="text-[14px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>WhatsApp</span>
                    </a>
                  </div>
                  <p className="text-[12px] text-[#6B6B6B] mt-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                    Disponible 24h/24, 7j/7
                  </p>
                </div>

                {/* Offices */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>Nos bureaux</h3>
                  <div className="space-y-6">
                    {bureaux.map((b) => (
                      <div key={b.city}>
                        <h4 className="text-[15px] text-[#F5F5F0] mb-1" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>{b.city}</h4>
                        <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{b.address}</p>
                        <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{b.phone}</a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="aspect-[4/3] relative" style={{ background: "#1E1E1E", border: "1px solid #1E1E1E" }}>
                  <div className="absolute inset-0 flex items-center justify-center text-[#6B6B6B] text-sm">
                    [Google Maps — Style sombre]
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
