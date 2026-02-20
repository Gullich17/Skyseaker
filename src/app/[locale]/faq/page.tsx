"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const faqCategoryKeys = ["all", "booking", "pricing", "aircraft", "safety", "services", "general"] as const;

const faqItems = [
  { cat: "booking", key: "1" },
  { cat: "booking", key: "2" },
  { cat: "booking", key: "3" },
  { cat: "booking", key: "4" },
  { cat: "booking", key: "5" },
  { cat: "pricing", key: "6" },
  { cat: "pricing", key: "7" },
  { cat: "pricing", key: "8" },
  { cat: "pricing", key: "9" },
  { cat: "pricing", key: "10" },
  { cat: "aircraft", key: "11" },
  { cat: "aircraft", key: "12" },
  { cat: "aircraft", key: "13" },
  { cat: "aircraft", key: "14" },
  { cat: "safety", key: "15" },
  { cat: "safety", key: "16" },
  { cat: "safety", key: "17" },
  { cat: "services", key: "18" },
  { cat: "services", key: "19" },
  { cat: "services", key: "20" },
  { cat: "general", key: "21" },
  { cat: "general", key: "22" },
  { cat: "general", key: "23" },
  { cat: "general", key: "24" },
  { cat: "general", key: "25" },
];

export default function FAQPage() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = faqItems.map((item) => ({
    cat: item.cat,
    q: t(`items.${item.key}.q`),
    a: t(`items.${item.key}.a`),
  }));

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.cat === activeCategory;
    const matchSearch = search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "50vh", paddingTop: "128px", paddingBottom: "48px" }}
      >
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/images/fleet/global-7500/main.png"
            alt="Private aviation FAQ"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(14,32,45,0.9) 0%, rgba(19,42,58,0.8) 40%, rgba(18,40,56,0.85) 60%, rgba(14,32,45,0.95) 100%)",
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: "linear-gradient(to top, rgba(14,32,45,0.9) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)",
          }}
        />
        <div className="relative text-center" style={{ zIndex: 10, padding: "0 5vw", maxWidth: "1400px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              marginBottom: "16px",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#F4DDC3",
            }}
          >
            {t("hero.preTitle")}
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              marginBottom: "16px",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            {t("hero.title")}
          </h1>
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              color: "#A0A0A0",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 5vw" }}>
          {/* Search */}
          <div style={{ marginBottom: "32px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              style={{
                width: "100%",
                padding: "16px 24px",
                fontSize: "14px",
                background: "transparent",
                border: "1px solid #1A3448",
                color: "#FFFFFF",
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                outline: "none",
              }}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "48px" }}>
            {faqCategoryKeys.map((catKey) => (
              <button
                key={catKey}
                onClick={() => { setActiveCategory(catKey); setOpenIndex(null); }}
                style={{
                  padding: "8px 16px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  border: "1px solid",
                  borderColor: activeCategory === catKey ? "#F4DDC3" : "#1A3448",
                  color: activeCategory === catKey ? "#F4DDC3" : "#6B6B6B",
                  background: activeCategory === catKey ? "rgba(244,221,195,0.1)" : "transparent",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 300ms",
                }}
              >
                {t(`categories.${catKey}`)}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((faq, i) => (
              <div key={i} style={{ border: "1px solid #1A3448", background: openIndex === i ? "#132A3A" : "transparent" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "15px", color: "#FFFFFF", paddingRight: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                    {faq.q}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    style={{ flexShrink: 0 }}
                    width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 20px 24px" }}>
                        <div style={{ height: "1px", marginBottom: "16px", background: "#1A3448" }} />
                        <p style={{ fontSize: "14px", color: "#A0A0A0", lineHeight: 1.7, fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#6B6B6B", padding: "48px 0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              {t("noResults")}
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "64px", padding: "40px", background: "#132A3A", border: "1px solid #1A3448" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              {t("cta.title")}
            </h3>
            <p style={{ fontSize: "14px", color: "#A0A0A0", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              {t("cta.subtitle")}
            </p>
            <Button href="/contact" variant="primary">{t("cta.button")}</Button>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />
    </>
  );
}
