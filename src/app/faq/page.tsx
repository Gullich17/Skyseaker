"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const faqCategories = ["Tous", "Réservation", "Tarifs", "Appareils", "Sécurité", "Services", "Divers"];

const faqs = [
  { cat: "Réservation", q: "Comment réserver un jet privé ?", a: "Vous pouvez demander un devis via notre formulaire en ligne, par téléphone au +33 1 00 00 00 00 ou par WhatsApp. Notre équipe vous répondra sous 30 minutes avec une proposition personnalisée incluant plusieurs options d'appareils et de tarifs." },
  { cat: "Réservation", q: "Quel est le délai minimum pour réserver ?", a: "Nous pouvons organiser un vol en aussi peu que 2 heures en cas d'urgence. Pour un service optimal avec choix d'appareil et catering personnalisé, nous recommandons un préavis de 24 à 48 heures." },
  { cat: "Réservation", q: "Peut-on modifier ou annuler une réservation ?", a: "Les conditions d'annulation varient selon le type de réservation et le délai. En règle générale, une annulation plus de 48h avant le vol est sans frais. Contactez votre conseiller dédié pour les détails spécifiques à votre réservation." },
  { cat: "Réservation", q: "Quels documents sont nécessaires pour voyager ?", a: "Comme pour tout vol, vous aurez besoin d'une pièce d'identité ou d'un passeport valide. Pour les vols internationaux hors Schengen, un passeport en cours de validité est obligatoire. Nous gérons toutes les formalités douanières pour vous." },
  { cat: "Réservation", q: "Peut-on réserver pour quelqu'un d'autre ?", a: "Oui, vous pouvez réserver un vol pour un tiers. Il vous suffira de fournir les informations d'identité des passagers au moment de la confirmation." },
  { cat: "Tarifs", q: "Combien coûte un vol en jet privé ?", a: "Le prix varie selon la distance, le type d'appareil, la disponibilité et la saison. À titre indicatif : Paris-Nice à partir de 4 800€, Paris-Londres à partir de 5 800€, Paris-Dubaï à partir de 28 000€. Demandez un devis précis pour votre trajet." },
  { cat: "Tarifs", q: "Qu'est-ce qui est inclus dans le prix ?", a: "Le prix inclut : le vol, l'équipage, le carburant, les taxes d'aéroport, l'accès au terminal VIP, les frais de stationnement standards, et un service de boissons à bord. Le catering premium et les transferts terrestres sont en option." },
  { cat: "Tarifs", q: "Y a-t-il des frais cachés ?", a: "Non. Chez Skyseaker, la transparence est une valeur fondamentale. Votre devis détaille tous les postes de coût. Aucun supplément ne sera ajouté sans votre accord préalable." },
  { cat: "Tarifs", q: "Qu'est-ce qu'un empty leg et comment en profiter ?", a: "Un empty leg est un vol de repositionnement proposé à tarif réduit (jusqu'à -75%). Consultez notre page Empty Legs pour les offres disponibles ou créez une alerte personnalisée pour être notifié." },
  { cat: "Tarifs", q: "Proposez-vous des facilités de paiement ?", a: "Oui, nous acceptons les virements bancaires, cartes de crédit et proposons des solutions de financement pour les clients réguliers via notre programme de carte prépayée d'heures de vol." },
  { cat: "Appareils", q: "Combien d'appareils avez-vous à disposition ?", a: "Nous avons accès à plus de 8 500 appareils certifiés dans le monde entier, couvrant toutes les catégories : du very light jet au VIP airliner, en passant par les hélicoptères." },
  { cat: "Appareils", q: "Puis-je choisir mon appareil ?", a: "Absolument. Nous vous présentons plusieurs options d'appareils adaptés à votre trajet. Vous pouvez consulter notre page Flotte pour découvrir les appareils disponibles et utiliser notre comparateur." },
  { cat: "Appareils", q: "Les appareils ont-ils le Wi-Fi ?", a: "La plupart des appareils de catégorie midsize et supérieure sont équipés du Wi-Fi. Pour les light jets, la disponibilité varie. Précisez ce besoin lors de votre demande." },
  { cat: "Appareils", q: "Quelle est la différence entre les catégories de jets ?", a: "Les catégories se distinguent par la taille, l'autonomie et le confort. Un light jet convient pour 2-3h de vol (4-8 pax), un midsize pour 4-5h (8-9 pax), un heavy pour les vols intercontinentaux (10-16 pax)." },
  { cat: "Sécurité", q: "Comment garantissez-vous la sécurité des vols ?", a: "Nous travaillons exclusivement avec des opérateurs certifiés par les autorités de l'aviation civile (EASA, FAA). Chaque opérateur est audité régulièrement et répond aux standards les plus stricts de l'industrie." },
  { cat: "Sécurité", q: "Les pilotes sont-ils qualifiés ?", a: "Tous les pilotes ont des milliers d'heures de vol et les qualifications requises sur le type d'appareil opéré. Nos opérateurs partenaires suivent des programmes de formation continue rigoureux." },
  { cat: "Sécurité", q: "Que se passe-t-il en cas de mauvais temps ?", a: "La sécurité est notre priorité absolue. En cas de conditions météo défavorables, le commandant de bord peut décider de retarder le vol ou de modifier la route. Nous vous informons immédiatement et proposons des alternatives." },
  { cat: "Services", q: "Proposez-vous un service de conciergerie ?", a: "Oui, notre service de conciergerie organise l'intégralité de votre voyage : hôtels, restaurants, transferts, événements, activités. Un seul interlocuteur pour tout coordonner." },
  { cat: "Services", q: "Les animaux sont-ils acceptés à bord ?", a: "Oui, la grande majorité des appareils acceptent les animaux de compagnie en cabine, sans restriction de taille ni cage obligatoire. C'est l'un des grands avantages du vol privé." },
  { cat: "Services", q: "Proposez-vous des vols cargo / fret ?", a: "Oui, nous proposons un service de fret aérien urgent pour tous types de marchandises. Prise en charge en moins de 2 heures, livraison dans la journée en Europe." },
  { cat: "Divers", q: "Quelle est la différence entre charter et aviation privée ?", a: "Le charter (affrètement) consiste à louer un avion entier pour votre vol. C'est la forme la plus courante de vol privé. Contrairement aux vols réguliers, vous définissez les horaires et la destination." },
  { cat: "Divers", q: "Faut-il arriver longtemps avant le départ ?", a: "Non, c'est l'un des grands avantages du jet privé. Il suffit d'arriver au terminal VIP 15 minutes avant le départ. Pas de file d'attente, pas de contrôle de sécurité prolongé." },
  { cat: "Divers", q: "Peut-on fumer à bord ?", a: "Cela dépend de l'opérateur et de l'appareil. Certains opérateurs autorisent la cigarette électronique. Précisez ce besoin lors de votre demande et nous trouverons un appareil adapté." },
  { cat: "Divers", q: "Comment fonctionne votre programme de fidélité ?", a: "Notre programme propose 4 paliers (Silver, Gold, Platinum, Diamond) avec des avantages croissants : tarifs préférentiels, surclassements, accès prioritaire, conciergerie dédiée. Découvrez les détails sur notre page Programme Fidélité." },
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
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionTitle preTitle="FAQ" title="Questions fréquentes" subtitle="Trouvez rapidement les réponses à vos questions sur l'aviation privée" centered />
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Search */}
          <div className="mb-8">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une question..."
              className="w-full px-6 py-4 text-[14px] bg-transparent border text-[#FFFFFF]"
              style={{ borderColor: "#1A3448", fontFamily: "var(--font-montserrat)", fontWeight: 300 }} />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {faqCategories.map((cat) => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] border transition-all"
                style={{
                  borderColor: activeCategory === cat ? "#F4DDC3" : "#1A3448",
                  color: activeCategory === cat ? "#F4DDC3" : "#6B6B6B",
                  background: activeCategory === cat ? "rgba(244,221,195,0.1)" : "transparent",
                  fontFamily: "var(--font-montserrat)", fontWeight: 500,
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} style={{ border: "1px solid #1A3448", background: openIndex === i ? "#132A3A" : "transparent" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[15px] text-[#FFFFFF] pr-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                    {faq.q}
                  </span>
                  <motion.svg animate={{ rotate: openIndex === i ? 180 : 0 }} className="shrink-0"
                    width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="2" viewBox="0 0 24 24">
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
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="h-[1px] mb-4" style={{ background: "#1A3448" }} />
                        <p className="text-[14px] text-[#A0A0A0] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
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
            <p className="text-center text-[#6B6B6B] py-12" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Aucune question ne correspond à votre recherche.
            </p>
          )}

          {/* CTA */}
          <div className="text-center mt-16 p-10" style={{ background: "#132A3A", border: "1px solid #1A3448" }}>
            <h3 className="text-[22px] mb-3" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              Vous n&apos;avez pas trouvé votre réponse ?
            </h3>
            <p className="text-[14px] text-[#A0A0A0] mb-6" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
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
