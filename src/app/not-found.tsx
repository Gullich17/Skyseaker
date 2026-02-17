"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0E202D",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(244,221,195,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: "33%",
          left: 0,
          right: 0,
          height: "1px",
          opacity: 0.04,
          background:
            "linear-gradient(90deg, transparent, #F4DDC3, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "66%",
          left: 0,
          right: 0,
          height: "1px",
          opacity: 0.04,
          background:
            "linear-gradient(90deg, transparent, #F4DDC3, transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{ marginBottom: "24px" }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(100px, 20vw, 180px)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(244,221,195,0.3)",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(24px, 5vw, 40px)",
            marginBottom: "16px",
          }}
        >
          Destination introuvable
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            color: "#A0A0A0",
            fontSize: "clamp(16px, 3vw, 20px)",
            marginBottom: "12px",
          }}
        >
          La page que vous recherchez semble avoir pris son envol
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            color: "#6B6B6B",
            fontSize: "14px",
            marginBottom: "40px",
          }}
        >
          Vérifiez l&apos;URL ou laissez-nous vous guider vers votre prochaine
          destination.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          style={{
            width: "80px",
            height: "1px",
            margin: "0 auto 40px",
            background:
              "linear-gradient(90deg, transparent, #F4DDC3, transparent)",
          }}
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "14px 32px",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              border: "1px solid #F4DDC3",
              color: "#F4DDC3",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F4DDC3";
              e.currentTarget.style.color = "#0E202D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#F4DDC3";
            }}
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/devis"
            style={{
              padding: "14px 32px",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              border: "1px solid #FFFFFF",
              color: "#FFFFFF",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.color = "#0E202D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            Demander un devis
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ marginTop: "64px" }}
        >
          <p
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "24px",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#6B6B6B",
            }}
          >
            Pages populaires
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px 24px",
            }}
          >
            {[
              { label: "Nos Services", href: "/services" },
              { label: "Notre Flotte", href: "/flotte" },
              { label: "Yachts", href: "/yachts" },
              { label: "Destinations", href: "/destinations" },
              { label: "Empty Legs", href: "/empty-legs" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  fontSize: "13px",
                  color: "#A0A0A0",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#F4DDC3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#A0A0A0")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
