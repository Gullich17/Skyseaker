"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Decorative lines */}
      <div
        className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />
      <div
        className="absolute top-2/3 left-0 right-0 h-[1px] opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />

      <div className="relative z-10 text-center px-[5vw]" style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="mb-6"
        >
          <span
            className="text-[120px] md:text-[180px] leading-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1px rgba(201,169,110,0.3)",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[28px] md:text-[40px] mb-4"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            color: "#F5F5F0",
          }}
        >
          Destination introuvable
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[18px] md:text-[20px] mb-3"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            color: "#A0A0A0",
          }}
        >
          La page que vous recherchez semble avoir pris son envol
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[14px] mb-10"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            color: "#6B6B6B",
          }}
        >
          Vérifiez l&apos;URL ou laissez-nous vous guider vers votre prochaine destination.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="mx-auto mb-10"
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] border transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
            style={{
              borderColor: "#C9A96E",
              color: "#C9A96E",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
            }}
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/devis"
            className="px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] border transition-all duration-300 hover:bg-[#F5F5F0] hover:text-[#0A0A0A]"
            style={{
              borderColor: "#F5F5F0",
              color: "#F5F5F0",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
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
          className="mt-16"
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#6B6B6B",
            }}
          >
            Pages populaires
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {[
              { label: "Nos Services", href: "/services" },
              { label: "Notre Flotte", href: "/flotte" },
              { label: "Destinations", href: "/destinations" },
              { label: "Empty Legs", href: "/empty-legs" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#A0A0A0] hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
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
