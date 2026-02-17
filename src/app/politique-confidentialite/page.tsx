import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de Skyseaker. Découvrez comment nous protégeons vos données personnelles conformément au RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  const sections = [
    {
      title: "1. Responsable du traitement",
      content: [
        "Le responsable du traitement des données personnelles collectées sur le site skyseaker.com est :",
        "Skyseaker SAS, 8 Avenue de l'Opéra, 75001 Paris, France.",
        "Email : dpo@skyseaker.com",
      ],
    },
    {
      title: "2. Données collectées",
      paragraphs: [
        "Dans le cadre de nos services, nous sommes amenés à collecter les données personnelles suivantes :",
      ],
      list: [
        "Données d'identification : nom, prénom, adresse email, numéro de téléphone",
        "Données professionnelles : société, fonction",
        "Données de voyage : destinations, dates de vol, nombre de passagers, préférences de service",
        "Données de navigation : adresse IP, cookies, pages visitées, durée de visite",
        "Données de communication : messages envoyés via les formulaires de contact",
      ],
    },
    {
      title: "3. Finalités du traitement",
      paragraphs: ["Vos données personnelles sont traitées pour les finalités suivantes :"],
      list: [
        "Gestion des demandes de devis et réservations de vols",
        "Communication commerciale avec votre consentement",
        "Amélioration de nos services et de l'expérience utilisateur",
        "Gestion de la relation client et du programme de fidélité",
        "Respect de nos obligations légales et réglementaires",
        "Statistiques et analyses de fréquentation du site",
      ],
    },
    {
      title: "4. Base légale du traitement",
      content: [
        "Le traitement de vos données personnelles repose sur les bases légales suivantes :",
        "L'exécution d'un contrat ou de mesures précontractuelles (demande de devis, réservation).",
        "Votre consentement (newsletter, cookies non essentiels).",
        "L'intérêt légitime de Skyseaker (amélioration des services, statistiques).",
        "Le respect d'obligations légales (facturation, archivage).",
      ],
    },
    {
      title: "5. Destinataires des données",
      content: [
        "Vos données personnelles sont destinées au personnel habilité de Skyseaker SAS, ainsi qu'à nos sous-traitants dans le strict cadre de l'exécution de leurs missions :",
        "Opérateurs aériens partenaires (dans le cadre de la réservation de vols).",
        "Prestataires de services (catering, transferts, conciergerie).",
        "Hébergeur du site web (Vercel Inc.).",
        "Aucune donnée personnelle n'est cédée à des tiers à des fins commerciales sans votre consentement explicite.",
      ],
    },
    {
      title: "6. Durée de conservation",
      content: [
        "Vos données personnelles sont conservées pour une durée proportionnée à la finalité du traitement :",
        "Données clients : pendant la durée de la relation commerciale et 5 ans après le dernier contact.",
        "Données de prospects : 3 ans à compter du dernier contact.",
        "Données de navigation (cookies) : 13 mois maximum.",
        "Données de facturation : 10 ans conformément aux obligations comptables.",
      ],
    },
    {
      title: "7. Vos droits",
      paragraphs: [
        "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :",
      ],
      list: [
        "Droit d'accès : obtenir la confirmation que des données vous concernant sont traitées et en obtenir une copie",
        "Droit de rectification : demander la correction de données inexactes ou incomplètes",
        "Droit à l'effacement : demander la suppression de vos données dans les conditions prévues par la loi",
        "Droit à la limitation du traitement : demander la limitation du traitement dans certains cas",
        "Droit à la portabilité : recevoir vos données dans un format structuré et lisible",
        "Droit d'opposition : vous opposer au traitement de vos données pour des motifs légitimes",
        "Droit de retirer votre consentement : retirer votre consentement à tout moment",
      ],
      after: "Pour exercer vos droits, contactez-nous à : dpo@skyseaker.com. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).",
    },
    {
      title: "8. Cookies",
      content: [
        "Le site skyseaker.com utilise des cookies pour assurer son bon fonctionnement et améliorer votre expérience de navigation.",
      ],
      subtable: [
        { type: "Cookies essentiels", desc: "Nécessaires au fonctionnement du site (session, préférences de langue). Ne peuvent être désactivés.", duration: "Session" },
        { type: "Cookies analytiques", desc: "Permettent d'analyser l'utilisation du site pour en améliorer les performances.", duration: "13 mois" },
        { type: "Cookies marketing", desc: "Utilisés pour afficher des publicités pertinentes. Déposés avec votre consentement uniquement.", duration: "13 mois" },
      ],
    },
    {
      title: "9. Sécurité des données",
      content: [
        "Skyseaker SAS met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, altération ou divulgation.",
        "Le site utilise le protocole HTTPS pour sécuriser les échanges de données entre votre navigateur et nos serveurs.",
      ],
    },
    {
      title: "10. Transferts hors UE",
      content: [
        "Certaines données peuvent être transférées vers des pays situés hors de l'Union Européenne (notamment vers les États-Unis pour l'hébergement). Ces transferts sont encadrés par les garanties appropriées conformément au RGPD (clauses contractuelles types, décisions d'adéquation).",
      ],
    },
    {
      title: "11. Modification de la politique",
      content: [
        "Skyseaker SAS se réserve le droit de modifier la présente politique de confidentialité à tout moment. Les modifications prennent effet dès leur publication sur le site. Nous vous invitons à consulter régulièrement cette page.",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            RGPD & DONNÉES PERSONNELLES
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Politique de Confidentialité
          </h1>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            Dernière mise à jour : février 2026
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {sections.map((section, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-[22px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
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

              {section.paragraphs && (
                <div className="space-y-3 mb-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {section.list && (
                <ul className="space-y-2 ml-4">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F4DDC3] shrink-0" />
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

              {"subtable" in section && section.subtable && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #1A3448" }}>
                        <th className="pb-3 pr-4 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>Type</th>
                        <th className="pb-3 pr-4 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>Description</th>
                        <th className="pb-3 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>Durée</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.subtable.map((row, j) => (
                        <tr key={j} style={{ borderBottom: "1px solid rgba(26,52,72,0.5)" }}>
                          <td className="py-3 pr-4 text-[13px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#FFFFFF" }}>{row.type}</td>
                          <td className="py-3 pr-4 text-[13px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>{row.desc}</td>
                          <td className="py-3 text-[13px]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {i < sections.length - 1 && (
                <div className="mt-12 mx-auto" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(244,221,195,0.3), transparent)" }} />
              )}
            </div>
          ))}

          <div className="mt-16 p-8" style={{ background: "#132A3A", border: "1px solid #1A3448" }}>
            <p className="text-[14px] text-[#A0A0A0] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Voir aussi :
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Mentions Légales →
              </Link>
              <Link href="/conditions-generales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Conditions Générales de Vente →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
