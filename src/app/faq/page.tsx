"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const faqCategories = ["Tous", "Réservation", "Tarifs", "Appareils", "Sécurité", "Services", "Divers"];

const faqs = [
  { cat: "Réservation", q: "Comment réserver un jet privé ?", a: "Vous pouvez demander un devis via notre formulaire en ligne, par téléphone au +33 6 76 76 55 11 ou par WhatsApp. Notre équipe vous répondra sous 30 minutes avec une proposition personnalisée incluant plusieurs options d\u2019appareils et de tarifs." },
  { cat: "Réservation", q: "Quel est le délai minimum pour réserver ?", a: "Nous pouvons organiser un vol en aussi peu que 2 heures en cas d\u2019urgence. Pour un service optimal avec choix d\u2019appareil et catering personnalisé, nous recommandons un préavis de 24 à 48 heures." },
  { cat: "Réservation", q: "Peut-on modifier ou annuler une réservation ?", a: "Les conditions d\u2019annulation varient selon le type de réservation et le délai. En règle générale, une annulation plus de 48h avant le vol est sans frais. Contactez votre conseiller dédié pour les détails spécifiques à votre réservation." },
  { cat: "Réservation", q: "Quels documents sont nécessaires pour voyager ?", a: "Comme pour tout vol, vous aurez besoin d\u2019une pièce d\u2019identité ou d\u2019un passeport valide. Pour les vols internationaux hors Schengen, un passeport en cours de validité est obligatoire. Nous gérons toutes les formalités douanières pour vous." },
  { cat: "Réservation", q: "Peut-on réserver pour quelqu\u2019un d\u2019autre ?", a: "Oui, vous pouvez réserver un vol pour un tiers. Il vous suffira de fournir les informations d\u2019identité des passagers au moment de la confirmation." },
  { cat: "Tarifs", q: "Combien coûte un vol en jet privé ?", a: "Le prix varie selon la distance, le type d\u2019appareil, la disponibilité et la saison. À titre indicatif : Paris-Nice à partir de 4 800€, Paris-Londres à partir de 5 800€, Paris-Dubaï à partir de 28 000€. Demandez un devis précis pour votre trajet." },
  { cat: "Tarifs", q: "Qu\u2019est-ce qui est inclus dans le prix ?", a: "Le prix inclut : le vol, l\u2019équipage, le carburant, les taxes d\u2019aéroport, l\u2019accès au terminal VIP, les frais de stationnement standards, et un service de boissons à bord. Le catering premium et les transferts terrestres sont en option." },
  { cat: "Tarifs", q: "Y a-t-il des frais cachés ?", a: "Non. Chez Skyseaker, la transparence est une valeur fondamentale. Votre devis détaille tous les postes de coût. Aucun supplément ne sera ajouté sans votre accord préalable." },
  { cat: "Tarifs", q: "Qu\u2019est-ce qu\u2019un empty leg et comment en profiter ?", a: "Un empty leg est un vol de repositionnement proposé à tarif réduit (jusqu\u2019à -75%). Consultez notre page Empty Legs pour les offres disponibles ou créez une alerte personnalisée pour être notifié." },
  { cat: "Tarifs", q: "Proposez-vous des facilités de paiement ?", a: "Oui, nous acceptons les virements bancaires, cartes de crédit et proposons des solutions de financement pour les clients réguliers via notre programme de carte prépayée d\u2019heures de vol." },
  { cat: "Appareils", q: "Combien d\u2019appareils avez-vous à disposition ?", a: "Nous avons accès à plus de 8 500 appareils certifiés dans le monde entier, couvrant toutes les catégories : du very light jet au VIP airliner, en passant par les hélicoptères." },
  { cat: "Appareils", q: "Puis-je choisir mon appareil ?", a: "Absolument. Nous vous présentons plusieurs options d\u2019appareils adaptés à votre trajet. Vous pouvez consulter notre page Flotte pour découvrir les appareils disponibles et utiliser notre comparateur." },
  { cat: "Appareils", q: "Les appareils ont-ils le Wi-Fi ?", a: "La plupart des appareils de catégorie midsize et supérieure sont équipés du Wi-Fi. Pour les light jets, la disponibilité varie. Précisez ce besoin lors de votre demande." },
  { cat: "Appareils", q: "Quelle est la différence entre les catégories de jets ?", a: "Les catégories se distinguent par la taille, l\u2019autonomie et le confort. Un light jet convient pour 2-3h de vol (4-8 pax), un midsize pour 4-5h (8-9 pax), un heavy pour les vols intercontinentaux (10-16 pax)." },
  { cat: "Sécurité", q: "Comment garantissez-vous la sécurité des vols ?", a: "Nous travaillons exclusivement avec des opérateurs certifiés par les autorités de l\u2019aviation civile (EASA, FAA). Chaque opérateur est audité régulièrement et répond aux standards les plus stricts de l\u2019industrie." },
  { cat: "Sécurité", q: "Les pilotes sont-ils qualifiés ?", a: "Tous les pilotes ont des milliers d\u2019heures de vol et les qualifications requises sur le type d\u2019appareil opéré. Nos opérateurs partenaires suivent des programmes de formation continue rigoureux." },
  { cat: "Sécurité", q: "Que se passe-t-il en cas de mauvais temps ?", a: "La sécurité est notre priorité absolue. En cas de conditions météo défavorables, le commandant de bord peut décider de retarder le vol ou de modifier la route. Nous vous informons immédiatement et proposons des alternatives." },
  { cat: "Services", q: "Proposez-vous un service de conciergerie ?", a: "Oui, notre service de conciergerie organise l\u2019intégralité de votre voyage : hôtels, restaurants, transferts, événements, activités. Un seul interlocuteur pour tout coordonner." },
  { cat: "Services", q: "Les animaux sont-ils acceptés à bord ?", a: "Oui, la grande majorité des appareils acceptent les animaux de compagnie en cabine, sans restriction de taille ni cage obligatoire. C\u2019est l\u2019un des grands avantages du vol privé." },
  { cat: "Services", q: "Proposez-vous des vols cargo / fret ?", a: "Oui, nous proposons un service de fret aérien urgent pour tous types de marchandises. Prise en charge en moins de 2 heures, livraison dans la journée en Europe." },
  { cat: "Divers", q: "Quelle est la différence entre charter et aviation privée ?", a: "Le charter (affrètement) consiste à louer un avion entier pour votre vol. C\u2019est la forme la plus courante de vol privé. Contrairement aux vols réguliers, vous définissez les horaires et la destination." },
  { cat: "Divers", q: "Faut-il arriver longtemps avant le départ ?", a: "Non, c\u2019est l\u2019un des grands avantages du jet privé. Il suffit d\u2019arriver au terminal VIP 15 minutes avant le départ. Pas de file d\u2019attente, pas de contrôle de sécurité prolongé." },
  { cat: "Divers", q: "Peut-on fumer à bord ?", a: "Cela dépend de l\u2019opérateur et de l\u2019appareil. Certains opérateurs autorisent la cigarette électronique. Précisez ce besoin lors de votre demande et nous trouverons un appareil adapté." },
  { cat: "Divers", q: "Comment fonctionne votre programme de fidélité ?", a: "Notre programme propose 4 paliers (Silver, Gold, Platinum, Diamond) avec des avantages croissants : tarifs préférentiels, surclassements, accès prioritaire et conciergerie dédiée. Contactez-nous pour en savoir plus sur les conditions d\u2019accès à chaque niveau." },
  { cat: "Divers", q: "Proposez-vous la compensation carbone ?", a: "Oui, nous proposons un programme de compensation carbone pour chaque vol. Nous collaborons avec des organismes certifiés pour investir dans des projets environnementaux qui compensent les émissions de CO2." },
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
            src="/images/fleet/global-7500/main.png"
            alt="FAQ aviation privée"
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
            Questions fréquentes
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
            Trouvez rapidement les réponses à vos questions sur l&apos;aviation privée
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
              Aucune question ne correspond à votre recherche.
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "64px", padding: "40px", background: "#132A3A", border: "1px solid #1A3448" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              Vous n&apos;avez pas trouvé votre réponse ?
            </h3>
            <p style={{ fontSize: "14px", color: "#A0A0A0", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Notre équipe est disponible 24/7 pour répondre à toutes vos questions
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
