import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente de Skyseaker. Modalités de réservation, d'annulation, de paiement et responsabilités pour vos vols en jet privé.",
};

export default function ConditionsGeneralesPage() {
  const sections = [
    {
      title: "1. Objet",
      content: [
        "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Skyseaker SAS (ci-après « Skyseaker ») et toute personne physique ou morale (ci-après « le Client ») souhaitant bénéficier des services de courtage en aviation privée proposés par Skyseaker.",
        "Skyseaker agit en qualité de courtier aérien et met en relation le Client avec des opérateurs aériens détenteurs d'un AOC (Air Operator Certificate) en vigueur.",
      ],
    },
    {
      title: "2. Services proposés",
      content: [
        "Skyseaker propose les services suivants :",
      ],
      list: [
        "Affrètement de jets privés et hélicoptères",
        "Commercialisation de vols à vide (empty legs)",
        "Organisation de voyages de groupe",
        "Service de fret aérien urgent",
        "Conciergerie et services lifestyle",
        "Transferts VIP",
        "Gestion d'appareils",
        "Conseil en achat et vente d'avions",
      ],
    },
    {
      title: "3. Demande de devis et réservation",
      content: [
        "Le Client peut soumettre une demande de devis via le formulaire en ligne, par téléphone ou par email. Le devis est fourni à titre informatif et n'engage Skyseaker qu'après confirmation écrite.",
        "La réservation est considérée comme ferme et définitive après :",
        "1. Acceptation écrite du devis par le Client (email, signature électronique ou manuscrite).",
        "2. Réception du paiement de l'acompte selon les conditions spécifiées dans le devis.",
        "Skyseaker se réserve le droit de refuser une réservation sans avoir à justifier sa décision.",
      ],
    },
    {
      title: "4. Tarifs et paiement",
      content: [
        "Les prix indiqués dans les devis sont en euros, toutes taxes comprises, sauf mention contraire. Ils incluent les éléments spécifiés dans le devis (heures de vol, taxes aéroportuaires, positionnement, etc.).",
        "Les tarifs affichés sur le site sont donnés à titre indicatif et peuvent varier en fonction de la disponibilité, de la saison et des conditions du marché.",
        "Le paiement s'effectue par virement bancaire. Les modalités de paiement sont les suivantes :",
        "Acompte de 100% du montant total à la réservation pour les vols de moins de 30 000 €.",
        "Acompte de 50% à la réservation et solde 72 heures avant le vol pour les vols de plus de 30 000 €.",
        "Les frais supplémentaires non prévus au devis initial (attente prolongée, modification d'itinéraire, catering supplémentaire, etc.) seront facturés séparément.",
      ],
    },
    {
      title: "5. Annulation et modification",
      content: [
        "En cas d'annulation par le Client, les conditions suivantes s'appliquent :",
      ],
      list: [
        "Annulation plus de 72 heures avant le départ : remboursement intégral moins les frais administratifs (5% du montant total, plafonnés à 2 000 €)",
        "Annulation entre 24 et 72 heures avant le départ : retenue de 50% du montant total",
        "Annulation moins de 24 heures avant le départ : aucun remboursement",
        "No-show (absence sans annulation préalable) : aucun remboursement",
      ],
      after: "Les modifications d'itinéraire, d'horaires ou de nombre de passagers sont possibles sous réserve de disponibilité et pourront entraîner un ajustement tarifaire.",
    },
    {
      title: "6. Annulation par Skyseaker ou l'opérateur",
      content: [
        "En cas d'annulation par Skyseaker ou l'opérateur pour raisons techniques, météorologiques ou de sécurité, Skyseaker s'engage à proposer une solution alternative (avion de remplacement, report du vol) ou à procéder au remboursement intégral des sommes versées.",
        "Skyseaker ne pourra être tenue responsable des conséquences indirectes de l'annulation (frais d'hôtel, événements manqués, etc.).",
      ],
    },
    {
      title: "7. Responsabilité",
      content: [
        "Skyseaker agit en qualité de courtier aérien et n'est pas un transporteur aérien. La responsabilité du transport incombe exclusivement à l'opérateur aérien.",
        "Skyseaker s'engage à sélectionner des opérateurs disposant de toutes les certifications requises (AOC, assurances) et respectant les normes de sécurité les plus strictes.",
        "La responsabilité de Skyseaker est limitée au montant des commissions perçues au titre de la prestation concernée, sauf faute lourde ou intentionnelle.",
      ],
    },
    {
      title: "8. Assurance",
      content: [
        "L'ensemble des vols organisés par Skyseaker sont couverts par l'assurance responsabilité civile de l'opérateur aérien, conformément aux exigences réglementaires en vigueur.",
        "Skyseaker recommande au Client de souscrire une assurance voyage complémentaire couvrant les risques d'annulation, de perte de bagages et de responsabilité civile personnelle.",
      ],
    },
    {
      title: "9. Documents de voyage",
      content: [
        "Le Client est responsable de la validité de ses documents de voyage (passeport, visa, carte d'identité) ainsi que du respect des formalités d'entrée et de sortie du territoire des pays concernés.",
        "Skyseaker peut assister le Client dans ses démarches administratives (overflight permits, slots aéroportuaires) mais ne saurait être tenue responsable en cas de refus d'embarquement ou d'entrée sur un territoire.",
      ],
    },
    {
      title: "10. Bagages",
      content: [
        "La capacité bagages varie selon le type d'appareil et est précisée dans le devis. Le Client s'engage à respecter les limitations de poids et de volume indiquées.",
        "Le transport de matières dangereuses, d'armes et de substances illicites est strictement interdit.",
      ],
    },
    {
      title: "11. Force majeure",
      content: [
        "Skyseaker ne pourra être tenue responsable de l'inexécution totale ou partielle de ses obligations si cette inexécution résulte d'un cas de force majeure au sens de l'article 1218 du Code civil.",
        "Sont notamment considérés comme cas de force majeure : les conditions météorologiques extrêmes, les fermetures d'espace aérien, les grèves, les conflits armés, les épidémies, les actes de terrorisme et les décisions des autorités publiques.",
      ],
    },
    {
      title: "12. Réclamations",
      content: [
        "Toute réclamation doit être adressée par écrit à Skyseaker dans un délai de 30 jours suivant la date du vol concerné.",
        "Email : reclamations@skyseaker.com",
        "Courrier : Skyseaker SAS, Service Réclamations, 8 Avenue de l'Opéra, 75001 Paris, France.",
      ],
    },
    {
      title: "13. Médiation",
      content: [
        "En cas de litige non résolu à l'amiable, le Client peut recourir gratuitement au service de médiation de la consommation. Le médiateur compétent est le Médiateur du Tourisme et du Voyage (MTV).",
        "Site web : www.mtv.travel",
      ],
    },
    {
      title: "14. Droit applicable et juridiction compétente",
      content: [
        "Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux de Paris, France.",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#C9A96E] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            CONDITIONS CONTRACTUELLES
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#F5F5F0" }}>
            Conditions Générales de Vente
          </h1>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            Dernière mise à jour : février 2026
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0A0A0A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {sections.map((section, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-[22px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F5F5F0" }}>
                {section.title}
              </h2>

              {section.content && (
                <div className="space-y-3">
                  {section.content.map((p, j) => (
                    <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {"list" in section && section.list && (
                <ul className="space-y-2 ml-4 mt-3">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
                      <span className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {"after" in section && section.after && (
                <p className="text-[14px] leading-relaxed mt-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                  {section.after}
                </p>
              )}

              {i < sections.length - 1 && (
                <div className="mt-12 mx-auto" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)" }} />
              )}
            </div>
          ))}

          <div className="mt-16 p-8" style={{ background: "#141414", border: "1px solid #1E1E1E" }}>
            <p className="text-[14px] text-[#A0A0A0] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Voir aussi :
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-[13px] text-[#C9A96E] hover:text-[#D4B978] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Mentions Légales →
              </Link>
              <Link href="/politique-confidentialite" className="text-[13px] text-[#C9A96E] hover:text-[#D4B978] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Politique de Confidentialité →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
