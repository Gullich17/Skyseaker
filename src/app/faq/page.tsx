"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const faqCategories = ["Tous", "R\u00e9servation", "Tarifs", "Appareils", "S\u00e9curit\u00e9", "Services", "Divers"];

const faqs = [
  { cat: "R\u00e9servation", q: "Comment r\u00e9server un jet priv\u00e9 ?", a: "Vous pouvez demander un devis via notre formulaire en ligne, par t\u00e9l\u00e9phone au +33 6 76 76 55 11 ou par WhatsApp. Notre \u00e9quipe vous r\u00e9pondra sous 30 minutes avec une proposition personnalis\u00e9e incluant plusieurs options d\u2019appareils et de tarifs." },
  { cat: "R\u00e9servation", q: "Quel est le d\u00e9lai minimum pour r\u00e9server ?", a: "Nous pouvons organiser un vol en aussi peu que 2 heures en cas d\u2019urgence. Pour un service optimal avec choix d\u2019appareil et catering personnalis\u00e9, nous recommandons un pr\u00e9avis de 24 \u00e0 48 heures." },
  { cat: "R\u00e9servation", q: "Peut-on modifier ou annuler une r\u00e9servation ?", a: "Les conditions d\u2019annulation varient selon le type de r\u00e9servation et le d\u00e9lai. En r\u00e8gle g\u00e9n\u00e9rale, une annulation plus de 48h avant le vol est sans frais. Contactez votre conseiller d\u00e9di\u00e9 pour les d\u00e9tails sp\u00e9cifiques \u00e0 votre r\u00e9servation." },
  { cat: "R\u00e9servation", q: "Quels documents sont n\u00e9cessaires pour voyager ?", a: "Comme pour tout vol, vous aurez besoin d\u2019une pi\u00e8ce d\u2019identit\u00e9 ou d\u2019un passeport valide. Pour les vols internationaux hors Schengen, un passeport en cours de validit\u00e9 est obligatoire. Nous g\u00e9rons toutes les formalit\u00e9s douani\u00e8res pour vous." },
  { cat: "R\u00e9servation", q: "Peut-on r\u00e9server pour quelqu\u2019un d\u2019autre ?", a: "Oui, vous pouvez r\u00e9server un vol pour un tiers. Il vous suffira de fournir les informations d\u2019identit\u00e9 des passagers au moment de la confirmation." },
  { cat: "Tarifs", q: "Combien co\u00fbte un vol en jet priv\u00e9 ?", a: "Le prix varie selon la distance, le type d\u2019appareil, la disponibilit\u00e9 et la saison. \u00c0 titre indicatif : Paris-Nice \u00e0 partir de 4 800\u20ac, Paris-Londres \u00e0 partir de 5 800\u20ac, Paris-Duba\u00ef \u00e0 partir de 28 000\u20ac. Demandez un devis pr\u00e9cis pour votre trajet." },
  { cat: "Tarifs", q: "Qu\u2019est-ce qui est inclus dans le prix ?", a: "Le prix inclut : le vol, l\u2019\u00e9quipage, le carburant, les taxes d\u2019a\u00e9roport, l\u2019acc\u00e8s au terminal VIP, les frais de stationnement standards, et un service de boissons \u00e0 bord. Le catering premium et les transferts terrestres sont en option." },
  { cat: "Tarifs", q: "Y a-t-il des frais cach\u00e9s ?", a: "Non. Chez Skyseaker, la transparence est une valeur fondamentale. Votre devis d\u00e9taille tous les postes de co\u00fbt. Aucun suppl\u00e9ment ne sera ajout\u00e9 sans votre accord pr\u00e9alable." },
  { cat: "Tarifs", q: "Qu\u2019est-ce qu\u2019un empty leg et comment en profiter ?", a: "Un empty leg est un vol de repositionnement propos\u00e9 \u00e0 tarif r\u00e9duit (jusqu\u2019\u00e0 -75%). Consultez notre page Empty Legs pour les offres disponibles ou cr\u00e9ez une alerte personnalis\u00e9e pour \u00eatre notifi\u00e9." },
  { cat: "Tarifs", q: "Proposez-vous des facilit\u00e9s de paiement ?", a: "Oui, nous acceptons les virements bancaires, cartes de cr\u00e9dit et proposons des solutions de financement pour les clients r\u00e9guliers via notre programme de carte pr\u00e9pay\u00e9e d\u2019heures de vol." },
  { cat: "Appareils", q: "Combien d\u2019appareils avez-vous \u00e0 disposition ?", a: "Nous avons acc\u00e8s \u00e0 plus de 8 500 appareils certifi\u00e9s dans le monde entier, couvrant toutes les cat\u00e9gories : du very light jet au VIP airliner, en passant par les h\u00e9licopt\u00e8res." },
  { cat: "Appareils", q: "Puis-je choisir mon appareil ?", a: "Absolument. Nous vous pr\u00e9sentons plusieurs options d\u2019appareils adapt\u00e9s \u00e0 votre trajet. Vous pouvez consulter notre page Flotte pour d\u00e9couvrir les appareils disponibles et utiliser notre comparateur." },
  { cat: "Appareils", q: "Les appareils ont-ils le Wi-Fi ?", a: "La plupart des appareils de cat\u00e9gorie midsize et sup\u00e9rieure sont \u00e9quip\u00e9s du Wi-Fi. Pour les light jets, la disponibilit\u00e9 varie. Pr\u00e9cisez ce besoin lors de votre demande." },
  { cat: "Appareils", q: "Quelle est la diff\u00e9rence entre les cat\u00e9gories de jets ?", a: "Les cat\u00e9gories se distinguent par la taille, l\u2019autonomie et le confort. Un light jet convient pour 2-3h de vol (4-8 pax), un midsize pour 4-5h (8-9 pax), un heavy pour les vols intercontinentaux (10-16 pax)." },
  { cat: "S\u00e9curit\u00e9", q: "Comment garantissez-vous la s\u00e9curit\u00e9 des vols ?", a: "Nous travaillons exclusivement avec des op\u00e9rateurs certifi\u00e9s par les autorit\u00e9s de l\u2019aviation civile (EASA, FAA). Chaque op\u00e9rateur est audit\u00e9 r\u00e9guli\u00e8rement et r\u00e9pond aux standards les plus stricts de l\u2019industrie." },
  { cat: "S\u00e9curit\u00e9", q: "Les pilotes sont-ils qualifi\u00e9s ?", a: "Tous les pilotes ont des milliers d\u2019heures de vol et les qualifications requises sur le type d\u2019appareil op\u00e9r\u00e9. Nos op\u00e9rateurs partenaires suivent des programmes de formation continue rigoureux." },
  { cat: "S\u00e9curit\u00e9", q: "Que se passe-t-il en cas de mauvais temps ?", a: "La s\u00e9curit\u00e9 est notre priorit\u00e9 absolue. En cas de conditions m\u00e9t\u00e9o d\u00e9favorables, le commandant de bord peut d\u00e9cider de retarder le vol ou de modifier la route. Nous vous informons imm\u00e9diatement et proposons des alternatives." },
  { cat: "Services", q: "Proposez-vous un service de conciergerie ?", a: "Oui, notre service de conciergerie organise l\u2019int\u00e9gralit\u00e9 de votre voyage : h\u00f4tels, restaurants, transferts, \u00e9v\u00e9nements, activit\u00e9s. Un seul interlocuteur pour tout coordonner." },
  { cat: "Services", q: "Les animaux sont-ils accept\u00e9s \u00e0 bord ?", a: "Oui, la grande majorit\u00e9 des appareils acceptent les animaux de compagnie en cabine, sans restriction de taille ni cage obligatoire. C\u2019est l\u2019un des grands avantages du vol priv\u00e9." },
  { cat: "Services", q: "Proposez-vous des vols cargo / fret ?", a: "Oui, nous proposons un service de fret a\u00e9rien urgent pour tous types de marchandises. Prise en charge en moins de 2 heures, livraison dans la journ\u00e9e en Europe." },
  { cat: "Divers", q: "Quelle est la diff\u00e9rence entre charter et aviation priv\u00e9e ?", a: "Le charter (affr\u00e8tement) consiste \u00e0 louer un avion entier pour votre vol. C\u2019est la forme la plus courante de vol priv\u00e9. Contrairement aux vols r\u00e9guliers, vous d\u00e9finissez les horaires et la destination." },
  { cat: "Divers", q: "Faut-il arriver longtemps avant le d\u00e9part ?", a: "Non, c\u2019est l\u2019un des grands avantages du jet priv\u00e9. Il suffit d\u2019arriver au terminal VIP 15 minutes avant le d\u00e9part. Pas de file d\u2019attente, pas de contr\u00f4le de s\u00e9curit\u00e9 prolong\u00e9." },
  { cat: "Divers", q: "Peut-on fumer \u00e0 bord ?", a: "Cela d\u00e9pend de l\u2019op\u00e9rateur et de l\u2019appareil. Certains op\u00e9rateurs autorisent la cigarette \u00e9lectronique. Pr\u00e9cisez ce besoin lors de votre demande et nous trouverons un appareil adapt\u00e9." },
  { cat: "Divers", q: "Comment fonctionne votre programme de fid\u00e9lit\u00e9 ?", a: "Notre programme propose 4 paliers (Silver, Gold, Platinum, Diamond) avec des avantages croissants : tarifs pr\u00e9f\u00e9rentiels, surclassements, acc\u00e8s prioritaire et conciergerie d\u00e9di\u00e9e. Contactez-nous pour en savoir plus sur les conditions d\u2019acc\u00e8s \u00e0 chaque niveau." },
  { cat: "Divers", q: "Proposez-vous la compensation carbone ?", a: "Oui, nous proposons un programme de compensation carbone pour chaque vol. Nous collaborons avec des organismes certifi\u00e9s pour investir dans des projets environnementaux qui compensent les \u00e9missions de CO2." },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "Tous" || f.cat === activeCategory;
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
            src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80"
            alt="FAQ aviation priv\u00e9e"
            fill
            priority
            style={{ objectFit: "cover" }}
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
            FAQ
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
            Questions fr\u00e9quentes
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
            Trouvez rapidement les r\u00e9ponses \u00e0 vos questions sur l&apos;aviation priv\u00e9e
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
              placeholder="Rechercher une question..."
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
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                style={{
                  padding: "8px 16px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "#F4DDC3" : "#1A3448",
                  color: activeCategory === cat ? "#F4DDC3" : "#6B6B6B",
                  background: activeCategory === cat ? "rgba(244,221,195,0.1)" : "transparent",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 300ms",
                }}
              >
                {cat}
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
              Aucune question ne correspond \u00e0 votre recherche.
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "64px", padding: "40px", background: "#132A3A", border: "1px solid #1A3448" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              Vous n&apos;avez pas trouv\u00e9 votre r\u00e9ponse ?
            </h3>
            <p style={{ fontSize: "14px", color: "#A0A0A0", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Notre \u00e9quipe est disponible 24/7 pour r\u00e9pondre \u00e0 toutes vos questions
            </p>
            <Button href="/contact" variant="primary">Contactez-nous</Button>
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
