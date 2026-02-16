"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Affrètement personnalisé", href: "/services/affretement-jet-prive", desc: "Vol sur mesure, 8 500+ appareils" },
  { name: "Vols à vide (Empty Legs)", href: "/services/vols-a-vide-empty-legs", desc: "Jusqu'à -75% sur votre jet" },
  { name: "Voyages de groupe", href: "/services/voyage-groupe", desc: "De 10 à 50+ passagers" },
  { name: "Fret urgent", href: "/services/fret-urgent", desc: "Livraison express mondiale" },
  { name: "Conciergerie & Lifestyle", href: "/services/conciergerie-lifestyle", desc: "Expériences sur mesure" },
  { name: "Transferts VIP", href: "/services/transferts-vip", desc: "Berlines, SUV, hélicoptères" },
  { name: "Gestion d'appareil", href: "/services/gestion-appareil", desc: "Optimisez votre investissement" },
  { name: "Achat/Vente de jet", href: "/services/achat-vente-jet", desc: "Acquisition & cession" },
];

const fleetCategories = [
  { name: "Very Light Jet", href: "/flotte/very-light-jet" },
  { name: "Light Jet", href: "/flotte/light-jet" },
  { name: "Super Light Jet", href: "/flotte/super-light-jet" },
  { name: "Midsize Jet", href: "/flotte/midsize-jet" },
  { name: "Super Midsize Jet", href: "/flotte/super-midsize-jet" },
  { name: "Heavy Jet", href: "/flotte/heavy-jet" },
  { name: "Ultra Long Range", href: "/flotte/ultra-long-range" },
  { name: "VIP Airliner", href: "/flotte/vip-airliner" },
  { name: "Hélicoptère", href: "/flotte/helicoptere" },
  { name: "Turbopropulseur", href: "/flotte/turbopropulseur" },
];

const yachtNavCategories = [
  { name: "Motor Yacht", href: "/yachts/motor-yacht" },
  { name: "Sailing Yacht", href: "/yachts/sailing-yacht" },
  { name: "Catamaran", href: "/yachts/catamaran" },
  { name: "Superyacht", href: "/yachts/superyacht" },
  { name: "Mega Yacht", href: "/yachts/mega-yacht" },
];

const navLinks = [
  { name: "Services", href: "/services", hasMega: "services" },
  { name: "Flotte", href: "/flotte", hasMega: "fleet" },
  { name: "Yachts", href: "/yachts", hasMega: "yachts" },
  { name: "Destinations", href: "/destinations" },
  { name: "Expériences", href: "/experiences" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      // Prevent body scroll on iOS + Android
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Bar — hidden on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 text-xs hidden md:block"
        style={{ background: "#0A0A0A", borderBottom: "1px solid #1E1E1E" }}>
        <div className="flex items-center justify-between h-full px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="flex items-center gap-6">
          <a href="tel:+33100000000" className="flex items-center gap-2 text-[#A0A0A0] hover:text-[#C9A96E] transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
            +33 1 00 00 00 00
          </a>
          <a href="mailto:contact@skyseaker.com" className="hidden sm:flex items-center gap-2 text-[#A0A0A0] hover:text-[#C9A96E] transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            contact@skyseaker.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#A0A0A0]">
            <button className="hover:text-[#C9A96E] transition-colors font-medium text-[#F5F5F0]">FR</button>
            <span className="text-[#1E1E1E]">|</span>
            <button className="hover:text-[#C9A96E] transition-colors">EN</button>
            <span className="text-[#1E1E1E]">|</span>
            <button className="hover:text-[#C9A96E] transition-colors">AR</button>
          </div>
          <div className="hidden sm:flex items-center gap-3 ml-4">
            <a href="#" className="text-[#A0A0A0] hover:text-[#C9A96E] transition-colors" aria-label="Instagram">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="text-[#A0A0A0] hover:text-[#C9A96E] transition-colors" aria-label="LinkedIn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className="fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: activeMega ? "rgba(10,10,10,1)" : scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: (scrolled || activeMega) ? "blur(20px)" : "none",
          WebkitBackdropFilter: (scrolled || activeMega) ? "blur(20px)" : "none",
          borderBottom: (scrolled || activeMega) ? "1px solid rgba(30,30,30,0.8)" : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between h-[70px] px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
                <path d="M12 20H28M20 14L28 20L20 26" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "#F5F5F0" }}>
                Sky<span style={{ color: "#C9A96E" }}>seaker</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center" style={{ gap: "clamp(16px, 2.5vw, 40px)" }}>
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMega && setActiveMega(link.hasMega)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  href={link.href}
                  className="uppercase text-[#F5F5F0] hover:text-[#C9A96E] transition-colors duration-300 flex items-center gap-1"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "11.5px", letterSpacing: "0.12em", whiteSpace: "nowrap" }}
                >
                  {link.name}
                  {link.hasMega && (
                    <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop CTA + Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+33100000000" className="text-[#F5F5F0] hover:text-[#C9A96E] transition-colors" aria-label="Appeler">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
            </a>
            <a href="https://wa.me/33100000000" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <Link
              href="/devis"
              className="transition-all duration-300"
              style={{
                marginLeft: "8px",
                padding: "10px 24px",
                border: "1px solid #C9A96E",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#C9A96E",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#0A0A0A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-[#C9A96E]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1.5px] bg-[#C9A96E]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-[#C9A96E]"
            />
          </button>
        </nav>

        {/* Mega Menu backdrop */}
        {activeMega && (
          <div className="absolute top-full left-0 right-0 hidden lg:block" style={{ height: "400px", background: "#0D0D0D", zIndex: -1 }} />
        )}

        {/* Mega Menus */}
        <AnimatePresence mode="wait">
          {activeMega === "services" && (
            <motion.div
              key="mega-services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full left-0 right-0 hidden lg:block"
              style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(201,169,110,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
              onMouseEnter={() => setActiveMega("services")}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="grid grid-cols-4" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 5vw", gap: "12px" }}>
                {services.map((s) => (
                  <Link key={s.name} href={s.href} className="group transition-colors" style={{ padding: "20px 24px", borderRadius: "4px", background: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1E1E1E")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <h4 className="text-[14px] text-[#F5F5F0] group-hover:text-[#C9A96E] transition-colors mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                      {s.name}
                    </h4>
                    <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, lineHeight: 1.5 }}>
                      {s.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {activeMega === "fleet" && (
            <motion.div
              key="mega-fleet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full left-0 right-0 hidden lg:block"
              style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(201,169,110,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
              onMouseEnter={() => setActiveMega("fleet")}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="flex" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 5vw", gap: "60px" }}>
                {/* Categories */}
                <div style={{ flex: "1 1 0" }}>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                    Catégories
                  </h4>
                  <div className="grid grid-cols-2" style={{ gap: "6px 40px" }}>
                    {fleetCategories.map((c) => (
                      <Link key={c.name} href={c.href} className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div style={{ width: "1px", background: "rgba(201,169,110,0.15)", flexShrink: 0 }} />

                {/* Outils */}
                <div style={{ minWidth: "220px" }}>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                    Outils
                  </h4>
                  <div className="flex flex-col" style={{ gap: "4px" }}>
                    <Link href="/flotte" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Voir toute la flotte →
                    </Link>
                    <Link href="/flotte/comparateur" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Comparateur de jets →
                    </Link>
                    <Link href="/empty-legs" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Vols à vide disponibles →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeMega === "yachts" && (
            <motion.div
              key="mega-yachts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full left-0 right-0 hidden lg:block"
              style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(201,169,110,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
              onMouseEnter={() => setActiveMega("yachts")}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="flex" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 5vw", gap: "60px" }}>
                <div style={{ flex: "1 1 0" }}>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                    Catégories
                  </h4>
                  <div className="flex flex-col" style={{ gap: "6px" }}>
                    {yachtNavCategories.map((c) => (
                      <Link key={c.name} href={c.href} className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div style={{ width: "1px", background: "rgba(201,169,110,0.15)", flexShrink: 0 }} />
                <div style={{ minWidth: "220px" }}>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                    Outils
                  </h4>
                  <div className="flex flex-col" style={{ gap: "4px" }}>
                    <Link href="/yachts" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Voir tous les yachts →
                    </Link>
                    <Link href="/yachts/comparateur" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Comparateur de yachts →
                    </Link>
                    <Link href="/devis" className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, padding: "8px 0" }}>
                      Demander un devis →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "#0A0A0A", overscrollBehavior: "contain" }}
          >
            {/* Spacer for nav */}
            <div style={{ height: "70px" }} />

            <div className="flex flex-col" style={{ height: "calc(100% - 70px)", overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", padding: "0 28px 40px" }}>
              {/* Navigation Links */}
              <div style={{ flex: 1 }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    {link.hasMega ? (
                      <div style={{ borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
                        <button
                          onClick={() => setMobileAccordion(mobileAccordion === link.hasMega ? null : link.hasMega!)}
                          className="flex items-center justify-between w-full"
                          style={{
                            padding: "18px 0",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: "15px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: mobileAccordion === link.hasMega ? "#C9A96E" : "#F5F5F0",
                            transition: "color 0.2s ease",
                          }}
                        >
                          {link.name}
                          <motion.svg
                            animate={{ rotate: mobileAccordion === link.hasMega ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="14" height="14" fill="none" stroke="#C9A96E" strokeWidth="2" viewBox="0 0 24 24"
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === link.hasMega && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div style={{ paddingBottom: "16px", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px" }}>
                                {(link.hasMega === "services" ? services : link.hasMega === "fleet" ? fleetCategories : yachtNavCategories).map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                      display: "block",
                                      padding: "10px 0",
                                      fontSize: "13px",
                                      color: "#8A8A8A",
                                      fontFamily: "'Montserrat', sans-serif",
                                      fontWeight: 400,
                                      transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "block",
                          padding: "18px 0",
                          fontSize: "15px",
                          color: "#F5F5F0",
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          borderBottom: "1px solid rgba(201,169,110,0.08)",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#F5F5F0")}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section: CTA + Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ marginTop: "32px" }}
              >
                {/* CTA Button */}
                <Link
                  href="/devis"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center"
                  style={{
                    padding: "16px",
                    background: "#C9A96E",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#0A0A0A",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Demander un devis
                </Link>

                {/* Contact Row */}
                <div className="flex items-center justify-between" style={{ marginTop: "24px", padding: "0 4px" }}>
                  <a href="tel:+33100000000" className="flex items-center gap-2" style={{ color: "#8A8A8A", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                    <svg width="14" height="14" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                    +33 1 00 00 00 00
                  </a>
                  <a href="https://wa.me/33100000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: "#25D366", fontSize: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                    <svg width="14" height="14" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-5" style={{ marginTop: "24px" }}>
                  <a href="#" style={{ color: "#6B6B6B", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")} aria-label="Instagram">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" style={{ color: "#6B6B6B", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")} aria-label="LinkedIn">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
