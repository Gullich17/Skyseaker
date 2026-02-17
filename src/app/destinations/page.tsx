"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { destinations, regions, type Destination } from "@/data/destinations";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* ============================================
   DESTINATION IMAGES — Unsplash fallbacks
   ============================================ */
const destinationImages: Record<string, string> = {
  "geneve": "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?w=600&q=75",
  "londres": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75",
  "mykonos": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=75",
  "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75",
  "marrakech": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=75",
  "ibiza": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=75",
  "nice": "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=600&q=75",
  "new-york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=75",
  "milan": "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=600&q=75",
  "sardaigne": "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=75",
  "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=75",
  "saint-tropez": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=75",
};

function getDestImg(dest: Destination): string {
  if (dest.image?.startsWith("http")) return dest.image;
  return destinationImages[dest.id] || "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=75";
}

/* ============================================
   HERO
   ============================================ */
function DestinationsHero() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(400px, 60vh, 640px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80"
          alt="Vue aérienne de destinations de voyage"
          fill
          className="object-cover"
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,32,45,0.65) 0%, rgba(14,32,45,0.4) 40%, rgba(14,32,45,0.85) 100%)" }} />
      </div>

      {/* Gold accent line */}
      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", opacity: 0.05, zIndex: 1, background: "linear-gradient(90deg, transparent, #F4DDC3, transparent)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 18vh, 160px) 24px clamp(48px, 6vw, 80px)", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}
        >
          DESTINATIONS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "20px" }}
        >
          Le monde à portée
          <br />de vol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "700px", margin: "0 auto", fontSize: "clamp(16px, 2.5vw, 22px)" }}
        >
          Explorez nos destinations phares et envolez-vous vers les plus belles adresses du globe
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   WORLD MAP — Desktop only
   ============================================ */
function WorldMap() {
  const mapDestination = (dest: Destination) => {
    const x = ((dest.coordinates.lng + 180) / 360) * 90 + 5;
    const y = ((90 - dest.coordinates.lat) / 180) * 90 + 5;
    return { x, y };
  };

  return (
    <section className="comparator-desktop" style={{ background: "#132A3A", padding: "clamp(60px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section title inline */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#F4DDC3" }}>
            CARTE MONDIALE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, marginBottom: "16px" }}>
            Notre réseau de destinations
          </h2>
          <div style={{ width: "60px", height: "1px", background: "#F4DDC3", opacity: 0.3, margin: "0 auto" }} />
        </div>

        <ScrollReveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2 / 1",
              overflow: "hidden",
              background: "#0E202D",
              border: "1px solid #1A3448",
            }}
          >
            {/* Grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1px",
                  top: `${((i + 1) * 100) / 8}%`,
                  background: "rgba(26, 52, 72, 0.5)",
                }}
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={`v-${i}`}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  left: `${((i + 1) * 100) / 12}%`,
                  background: "rgba(26, 52, 72, 0.5)",
                }}
              />
            ))}

            {/* Continent outlines — detailed */}
            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            >
              <defs>
                <linearGradient id="landFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(26, 52, 72, 0.5)" />
                  <stop offset="100%" stopColor="rgba(20, 44, 62, 0.35)" />
                </linearGradient>
              </defs>
              {/* North America */}
              <path
                d="M7,6 C7.5,5.5 8,5.2 9,5 C10,4.8 11.5,5 12.5,4.5 C13.5,4 14,3.8 15,4 C16,4.2 16.5,5 17,5.5 C17.5,6 18.5,5.8 19.5,6 C20.5,6.2 21,6.8 22,7 C22.5,7.2 23.5,6.5 24.5,7 C25.2,7.3 25.5,7.8 25,8.5 C24.5,9.2 24.8,9.5 25,10 C24.5,10.5 23.5,10.8 23,11 C22,11.5 21.8,12 21.5,12.5 C21.5,12.5 22,13 22.5,13 C23,13 23.5,12.5 24,13 C24.5,13.5 24,14 23.5,14.5 C23,15 22,14.8 21,15 C20.5,15.2 20.2,15.5 20,16 C19.5,16.5 19,16.8 18.5,17 L17.5,18 C17,18.5 16.5,18.2 16,18 C15.5,17.8 15.2,17.2 14.5,17 C14,16.8 13,17 12.5,17.5 C12,18 11,18 10.5,17.8 C10,17.5 10,17 10.5,16.5 C10.8,16 10.5,15.5 10,15.2 C9.5,15 9,15.5 8.5,15.5 C8,15.5 7.5,15 7,14.5 C6.5,14 6.2,13 6,12 C5.8,11 6,10 6.5,9 C7,8 7,7 7,6 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Alaska */}
              <path
                d="M5.5,7 C6,6.5 6.5,6.5 7,6.8 C7,7.2 6.5,7.5 6,8 C5.5,8.5 5,8.5 4.5,8 C4.5,7.5 5,7.5 5.5,7 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Central America */}
              <path
                d="M16,18 C16.5,18.5 17,19 17.5,19.5 C18,20 18.5,20.5 19,20.8 C19.5,21 20,21.5 20.5,22 C20.2,22.3 19.5,22.5 19,22.2 C18.5,22 18,22 17.5,22 C17,22 16.5,21.5 16.5,21 C16.5,20.5 16,20 15.8,19.5 C15.5,19 15.8,18.5 16,18 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* South America */}
              <path
                d="M21,22 C22,21.5 23,21.8 24,22 C25,22.2 26,22.5 27,23 C27.5,23.5 28,24 28.5,24.8 C29,25.5 29.5,26.5 30,27.5 C30.2,28.5 30,29.5 30,30.5 C30,31.5 30.2,32.5 30.5,33 C30.8,33.5 31,34 31,35 C30.5,36 30,36.8 29.5,37 C29,37.5 28.5,38 28,38 C27.5,38 27,37.5 26.5,37 C26,36.5 25.5,35.5 25,34.5 C24.5,33.5 24,32 24,31 C23.8,30 23.5,29 23.2,28 C23,27 22.5,26 22,25 C21.5,24 21,23 21,22 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Greenland */}
              <path
                d="M33,5 C34,4.5 35,4 36.5,4 C37.5,4 38.5,4.5 39,5 C39.5,5.5 39.5,6.5 39,7.5 C38.5,8 37.5,8.5 36.5,8.5 C35.5,8.5 34.5,8 34,7.5 C33.5,7 33,6 33,5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Iceland */}
              <path
                d="M42.5,8 C43,7.5 43.8,7.5 44.2,8 C44.5,8.5 44,9 43.5,9 C43,9 42.2,8.5 42.5,8 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* UK & Ireland */}
              <path
                d="M45,10 C45.3,9.5 45.8,9.5 46,9.8 C46.2,10.2 46.3,10.8 46,11.2 C45.5,11.5 45,11.2 44.8,10.8 C44.6,10.5 44.8,10.2 45,10 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              <path
                d="M45.8,9.5 C46,9.2 46.5,9 46.8,9.2 C47.2,9.5 47.3,10 47.2,10.5 C47,11 46.8,11.5 46.5,11.8 C46.2,12 45.8,11.5 46,11 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Europe mainland */}
              <path
                d="M46,11.5 C46.5,11 47,10.5 47.5,10 C48,9.8 48.8,9.5 49.5,9 C50.2,8.5 51,8.2 52,8 C53,8 54,8.5 54.5,9 C55,9.5 55,10 54.8,10.5 C54.5,11 54,11.2 53.5,11.5 C53.2,11.8 53,12.2 52.5,12.5 C52,12.8 51.5,13 51,13.2 C50.8,13.5 51,14 50.5,14.2 C50,14.5 49.5,14.5 49,14.2 C48.5,14 48,13.5 47.8,13 C47.5,12.8 47.2,13 47,12.5 C46.5,12.2 46.2,12 46,11.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Scandinavia */}
              <path
                d="M49.5,7 C50,6.5 50.5,6 51,6.2 C51.5,6.5 52,7 52.2,7.5 C52.5,8 52.5,8.5 52.2,9 C52,9.5 51.5,9.8 51,9.5 C50.5,9.2 50,9 49.8,8.5 C49.5,8 49.2,7.5 49.5,7 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Iberian Peninsula */}
              <path
                d="M44.5,12.5 C45,12 46,11.8 46.5,12 C47,12.2 47.5,12.5 47.5,13 C47.5,13.5 47.2,14 46.8,14.5 C46.5,14.8 46,15 45.5,14.8 C45,14.5 44.5,14 44.5,13.5 C44.5,13 44.2,12.8 44.5,12.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Italian Peninsula */}
              <path
                d="M49.2,13 C49.5,13.2 49.8,13.5 50,14 C50.2,14.5 50,15 49.8,15.5 C49.5,15.8 49.2,15.5 49,15 C48.8,14.5 48.8,14 49,13.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Africa */}
              <path
                d="M45,15 C46,14.8 47,14.5 48,14.5 C49,14.5 50.5,14.8 51.5,15 C52.5,15.2 53.5,15.5 54.5,16 C55,16.5 55.5,17 56,17.5 C56.5,18 56.8,19 57,20 C57,21 56.8,22 56.5,23 C56,24 55.5,25 55,26 C54.5,27 53.5,28 52.5,28.5 C51.5,29 50.5,29.5 49.5,29.5 C48.8,29.5 48.2,29 48,28.5 C47.5,28 47,27 46.8,26 C46.5,25 46.2,24 46,23 C45.8,22 45.5,21 45,20 C44.8,19 44.5,18 44.5,17 C44.5,16 44.5,15.5 45,15 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Madagascar */}
              <path
                d="M57.5,26 C58,25.5 58.5,25.8 58.5,26.5 C58.5,27.2 58.2,28 57.8,28.5 C57.5,28.8 57,28.5 57,27.8 C57,27 57,26.5 57.5,26 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Russia & Northern Asia */}
              <path
                d="M55,8 C56,7.5 58,7 60,6.5 C62,6 64,5.8 66,6 C68,6.2 70,6.5 72,6.5 C74,6.5 76,6 78,6 C80,6 82,6.5 83.5,7 C85,7.5 86,8 87,8.8 C88,9.5 88.5,10 88.5,10.8 C88.5,11.5 88,12 87,12.5 C86,13 84.5,12.8 83,12.5 C81.5,12.2 80,12 78.5,12 C77,12 75.5,12.2 74,12.5 C72.5,12.8 71,13 69.5,13.2 C68,13.5 66.5,13 65,12.5 C63.5,12 62,12 60.5,12 C59,12 57.5,11.5 56.5,11 C55.5,10.5 55,10 55,9.5 C55,9 54.5,8.5 55,8 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Middle East */}
              <path
                d="M55,13.5 C56,13 57,12.8 58,13 C59,13.2 59.5,13.8 60,14.5 C60.2,15 60,15.5 59.5,16 C59,16.5 58.5,16.2 58,16 C57.5,15.8 57,16 56.5,15.5 C56,15 55.5,14.5 55.2,14 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Arabian Peninsula */}
              <path
                d="M56,15.5 C56.5,15 57.5,15 58.5,15.5 C59,16 59,16.5 58.5,17 C58,17.5 57.5,18 57,18 C56.5,18 56,17.5 55.8,17 C55.5,16.5 55.5,16 56,15.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* India */}
              <path
                d="M64,14 C65,13.5 66,13.5 67,14 C67.5,14.5 68,15 68,16 C68,17 67.5,18 67,19 C66.5,19.8 66,20 65.5,20.2 C65,20.5 64.5,20 64.2,19.5 C64,19 63.5,18 63.5,17 C63.5,16 63.5,15 64,14 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* China / East Asia */}
              <path
                d="M68,12 C69,11.5 70.5,11.5 72,12 C73.5,12.5 74.5,13 75.5,13.5 C76.5,14 77.5,14.2 78,14.8 C78.5,15.5 78.5,16 78,16.5 C77.5,17 76.5,16.8 75.5,16.5 C74.5,16.2 73.5,16 72.5,16 C71.5,16 70.5,16 69.5,15.5 C68.5,15 68,14.5 67.5,14 C67,13.5 67.2,12.5 68,12 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Southeast Asia peninsula */}
              <path
                d="M72,16.5 C72.5,16 73.5,16 74,16.5 C74.5,17 74.5,18 74,18.8 C73.5,19.5 73,20 72.5,20 C72,20 71.5,19.5 71.5,19 C71.5,18.5 71.5,17 72,16.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Japan */}
              <path
                d="M83,11.5 C83.5,11 84,11 84.5,11.5 C85,12 85,12.8 84.5,13.5 C84,14 83.5,13.5 83.2,13 C83,12.5 82.5,12 83,11.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Korean Peninsula */}
              <path
                d="M80.5,12.5 C81,12 81.5,12.2 81.5,13 C81.5,13.5 81,14 80.5,13.8 C80,13.5 80,13 80.5,12.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Philippines */}
              <path
                d="M78,17 C78.5,16.5 79,17 79,17.5 C79,18 78.5,18.5 78,18.5 C77.5,18.5 77.5,17.5 78,17 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Indonesia — Sumatra */}
              <path
                d="M73.5,21 C74.5,20.5 75.5,20.5 76,21 C76.5,21.5 76,22 75.5,22.5 C75,22.8 74,22.5 73.5,22 C73,21.5 73,21.2 73.5,21 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Indonesia — Java & Borneo */}
              <path
                d="M76,21 C77,20.5 78,20.5 79,21 C79.5,21.5 79.5,22 79,22.5 C78.5,22.8 77.5,22.5 77,22 C76.5,21.8 76,21.5 76,21 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Indonesia — Sulawesi & Papua */}
              <path
                d="M80,20.5 C81,20 82,20 83,20.5 C83.5,21 83.5,21.5 83,22 C82.5,22.5 81.5,22.5 80.5,22 C80,21.5 79.5,21 80,20.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Australia */}
              <path
                d="M78,27 C79,26 80.5,25.5 82,25 C83.5,24.8 85,25 86.5,25.5 C88,26 89,27 89.5,28 C90,29 90,30 89.5,31 C89,32 88,33 87,33.5 C86,34 84.5,34.2 83,34 C81.5,33.8 80,33.5 79,33 C78,32.5 77.5,31.5 77.2,30.5 C77,29.5 77,28 78,27 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* New Zealand — North Island */}
              <path
                d="M92,31 C92.5,30.5 93,31 93,31.5 C93,32 92.5,32.5 92,32.5 C91.5,32.5 91.5,31.5 92,31 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* New Zealand — South Island */}
              <path
                d="M91.5,33 C92,32.5 92.5,32.8 92.5,33.5 C92.5,34 92,34.5 91.5,34.5 C91,34.5 91,33.5 91.5,33 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Sri Lanka */}
              <path
                d="M66.5,20.5 C67,20.2 67.2,20.5 67,21 C66.8,21.5 66.5,21.5 66.2,21 C66,20.8 66.2,20.8 66.5,20.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
              {/* Taiwan */}
              <path
                d="M79.5,15 C80,14.8 80.2,15.2 80,15.8 C79.8,16.2 79.5,16 79.2,15.5 Z"
                fill="url(#landFill)"
                stroke="rgba(244, 221, 195, 0.12)"
                strokeWidth="0.15"
              />
            </svg>

            {/* Paris marker (origin) */}
            <div
              style={{
                position: "absolute",
                left: `${((2.3522 + 180) / 360) * 90 + 5}%`,
                top: `${((90 - 48.8566) / 180) * 90 + 5}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#F4DDC3",
                    boxShadow: "0 0 20px rgba(244, 221, 195, 0.6)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    color: "#F4DDC3",
                  }}
                >
                  Paris
                </div>
              </div>
            </div>

            {/* Destination dots */}
            {destinations.map((dest, i) => {
              const pos = mapDestination(dest);
              return (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group"
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: EASE }}
                    style={{ position: "relative" }}
                  >
                    {/* Pulse ring */}
                    <div
                      className="animate-ping"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "rgba(244, 221, 195, 0.3)",
                      }}
                    />
                    {/* Dot */}
                    <div
                      className="transition-transform group-hover:scale-150"
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: dest.popular ? "#F4DDC3" : "rgba(244, 221, 195, 0.5)",
                        boxShadow: "0 0 10px rgba(244, 221, 195, 0.4)",
                      }}
                    />
                    {/* Tooltip */}
                    <div
                      className="group-hover:opacity-100"
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: "8px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        padding: "6px 12px",
                        background: "#132A3A",
                        border: "1px solid #F4DDC3",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#FFFFFF",
                      }}
                    >
                      {dest.name}
                      <span style={{ color: "#6B6B6B", marginLeft: "4px" }}>
                        {dest.flightTimeFromParis}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}

            {/* Connection lines from Paris */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {destinations.map((dest, i) => {
                const parisX = ((2.3522 + 180) / 360) * 90 + 5;
                const parisY = ((90 - 48.8566) / 180) * 90 + 5;
                const pos = mapDestination(dest);
                return (
                  <motion.line
                    key={dest.id}
                    x1={`${parisX}%`}
                    y1={`${parisY}%`}
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="rgba(244, 221, 195, 0.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: EASE }}
                  />
                );
              })}
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   DESTINATION CARD
   ============================================ */
function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/destinations/${destination.id}`} className="block group">
        <div style={{ backgroundColor: "#132A3A", border: "1px solid #1A3448", borderRadius: "2px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
          {/* Image */}
          <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
            <Image
              src={getDestImg(destination)}
              alt={destination.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
              className="group-hover:scale-105"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,32,45,0.9) 0%, rgba(14,32,45,0.2) 40%, transparent 100%)" }} />

            {/* Popular badge */}
            {destination.popular && (
              <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10 }}>
                <Badge>Populaire</Badge>
              </div>
            )}

            {/* Content overlay at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px, 3vw, 24px)", zIndex: 10 }}>
              <h3
                className="group-hover:text-[#F4DDC3] transition-colors"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(20px, 3vw, 26px)", marginBottom: "4px" }}
              >
                {destination.name}
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0", fontSize: "14px", marginBottom: "12px" }}>
                {destination.country}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#F4DDC3", fontSize: "12px" }}>
                    {destination.flightTimeFromParis} depuis Paris
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B", fontSize: "13px" }}>
                  À partir de{" "}
                  <span style={{ color: "#F4DDC3", fontWeight: 500 }}>{destination.priceFrom}€</span>
                </span>
                <span
                  className="group-hover:opacity-100"
                  style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500, opacity: 0, transition: "opacity 0.3s ease" }}
                >
                  Découvrir →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   FILTER CATEGORIES
   ============================================ */
const filterCategories = [
  { slug: "toutes", name: "Toutes" },
  ...regions.map((r) => ({ slug: r, name: r })),
];

/* ============================================
   MAIN PAGE
   ============================================ */
export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("toutes");

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filterCategories.forEach((cat) => {
      counts[cat.slug] = cat.slug === "toutes" ? destinations.length : destinations.filter((d) => d.region === cat.slug).length;
    });
    return counts;
  }, []);

  const filteredDestinations = activeRegion === "toutes" ? destinations : destinations.filter((d) => d.region === activeRegion);

  return (
    <>
      <DestinationsHero />
      <WorldMap />

      {/* Destinations grid with filters */}
      <section style={{ background: "#0E202D", padding: "clamp(60px, 10vw, 120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

          {/* Sticky filter bar */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "#0E202D",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginBottom: "clamp(24px, 4vw, 32px)",
            borderBottom: "1px solid rgba(244,221,195,0.08)",
          }}>
            {/* Desktop: wrapped pill row */}
            <div
              className="filter-desktop"
              style={{ flexWrap: "wrap", gap: "8px", alignItems: "center" }}
            >
              {filterCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveRegion(cat.slug)}
                  style={{
                    position: "relative",
                    padding: "10px 16px",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: activeRegion === cat.slug ? 600 : 400,
                    color: activeRegion === cat.slug ? "#F4DDC3" : "#6B6B6B",
                    background: activeRegion === cat.slug ? "rgba(244,221,195,0.08)" : "transparent",
                    border: `1px solid ${activeRegion === cat.slug ? "rgba(244,221,195,0.3)" : "#1A3448"}`,
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {cat.name}
                  <span style={{ marginLeft: "6px", fontSize: "10px", fontWeight: 400, opacity: 0.6 }}>
                    ({regionCounts[cat.slug]})
                  </span>
                  {activeRegion === cat.slug && (
                    <motion.div
                      layoutId="activeDestRegion"
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "#F4DDC3" }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile: dropdown select */}
            <div className="filter-mobile">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 40px 14px 16px",
                  fontSize: "13px",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "#F4DDC3",
                  background: "rgba(14,32,45,0.6)",
                  border: "1px solid rgba(244,221,195,0.3)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  outline: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4DDC3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "12px",
                }}
              >
                {filterCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} style={{ background: "#132A3A" }}>
                    {cat.name} ({regionCounts[cat.slug]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p style={{ marginBottom: "24px", fontSize: "13px", fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#6B6B6B" }}>
            {filteredDestinations.length} destination{filteredDestinations.length > 1 ? "s" : ""} disponible{filteredDestinations.length > 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}
            >
              {filteredDestinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "clamp(60px, 10vw, 120px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(244,221,195,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "20px" }}>
              Votre destination n&apos;est pas listée ?
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", fontSize: "clamp(16px, 2.5vw, 20px)", marginBottom: "40px" }}>
              Nous organisons des vols vers plus de 5 000 aéroports dans le monde entier
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px" }}>
              <Button href="/devis" variant="primary" size="lg">
                Demander un devis
              </Button>
              <Button href="tel:+33100000000" variant="secondary">
                Nous appeler
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
