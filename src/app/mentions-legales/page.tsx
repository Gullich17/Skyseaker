import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales de Skyseaker, courtier en aviation privée de luxe. Informations juridiques, éditeur, hébergeur et propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  const sections = [
    {
      title: "1. Éditeur du site",
      content: [
        "Le site skyseaker.com est édité par :",
        "Skyseaker SAS",
        "Société par Actions Simplifiée au capital de 50 000 €",
        "Siège social : 8 Avenue de l'Opéra, 75001 Paris, France",
        "RCS Paris : XXX XXX XXX",
        "N° TVA intracommunautaire : FR XX XXX XXX XXX",
        "Directeur de la publication : [Nom du dirigeant]",
        "Email : contact@skyseaker.com",
        "Téléphone : +33 1 00 00 00 00",
      ],
    },
    {
      title: "2. Hébergement",
      content: [
        "Le site est hébergé par :",
        "Vercel Inc.",
        "440 N Barranca Ave #4133",
        "Covina, CA 91723, États-Unis",
        "Site web : vercel.com",
      ],
    },
    {
      title: "3. Propriété intellectuelle",
      content: [
        "L'ensemble du contenu du site skyseaker.com (textes, images, graphismes, logo, icônes, vidéos, etc.) est protégé par le droit d'auteur et le droit des marques, conformément aux dispositions du Code de la Propriété Intellectuelle.",
        "Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Skyseaker SAS.",
        "La marque Skyseaker, ainsi que l'ensemble des marques figuratives ou non, et plus généralement toutes les autres marques, illustrations, images et logotypes figurant sur le site sont et restent la propriété exclusive de Skyseaker SAS.",
      ],
    },
    {
      title: "4. Limitation de responsabilité",
      content: [
        "Skyseaker SAS s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, Skyseaker SAS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur le site.",
        "Skyseaker SAS décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.",
        "Les prix affichés sur le site sont donnés à titre indicatif et ne constituent pas une offre contractuelle. Les tarifs définitifs sont communiqués dans le devis personnalisé transmis au client.",
      ],
    },
    {
      title: "5. Liens hypertextes",
      content: [
        "Le site skyseaker.com peut contenir des liens hypertextes vers d'autres sites internet. Skyseaker SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
        "La création de liens hypertextes vers le site skyseaker.com est soumise à l'accord préalable de Skyseaker SAS.",
      ],
    },
    {
      title: "6. Cookies",
      content: [
        "Le site skyseaker.com utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Pour en savoir plus sur l'utilisation des cookies, consultez notre politique de confidentialité.",
      ],
    },
    {
      title: "7. Droit applicable",
      content: [
        "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux de Paris seront seuls compétents.",
      ],
    },
    {
      title: "8. Contact",
      content: [
        "Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :",
        "Par email : contact@skyseaker.com",
        "Par téléphone : +33 1 00 00 00 00",
        "Par courrier : Skyseaker SAS, 8 Avenue de l'Opéra, 75001 Paris, France",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            INFORMATIONS JURIDIQUES
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Mentions Légales
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
              <div className="space-y-3">
                {section.content.map((paragraph, j) => (
                  <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
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
              <Link href="/politique-confidentialite" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Politique de Confidentialité →
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
