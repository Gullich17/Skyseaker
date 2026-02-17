import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programme de Fidélité",
  description: "Rejoignez le programme de fidélité Skyseaker : avantages exclusifs, tarifs préférentiels et services premium selon votre palier Silver, Gold, Platinum ou Diamond.",
};

const tiers = [
  {
    name: "Silver",
    condition: "Dès le 1er vol",
    benefits: ["Conseiller dédié", "Accès prioritaire aux empty legs", "Newsletter exclusive", "Invitation événements"],
  },
  {
    name: "Gold",
    condition: "5+ vols ou 25h",
    benefits: ["Tous les avantages Silver", "Tarifs préférentiels (-5%)", "Surclassement prioritaire", "Catering premium offert", "Transfert berline inclus"],
  },
  {
    name: "Platinum",
    condition: "15+ vols ou 75h",
    benefits: ["Tous les avantages Gold", "Tarifs préférentiels (-10%)", "Conciergerie dédiée 24/7", "Accès salons VIP partenaires", "Expériences exclusives offertes", "Annulation flexible"],
  },
  {
    name: "Diamond",
    condition: "30+ vols ou 150h",
    benefits: ["Tous les avantages Platinum", "Tarifs préférentiels (-15%)", "Jet dédié garanti", "Service sur mesure illimité", "Événements privés Skyseaker", "Partenariats luxe exclusifs", "Ligne directe fondateur"],
  },
];

const cardePrepayee = [
  { heures: "5h", prix: "Sur devis", economie: "5%" },
  { heures: "10h", prix: "Sur devis", economie: "8%" },
  { heures: "25h", prix: "Sur devis", economie: "12%" },
  { heures: "50h", prix: "Sur devis", economie: "15%" },
];

export default function ProgrammeFidelitePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>PROGRAMME DE FIDÉLITÉ</p>
          <h1 className="text-[36px] md:text-[48px] mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Votre fidélité récompensée
          </h1>
          <p className="text-[18px] md:text-[20px]" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#A0A0A0", maxWidth: "640px", margin: "0 auto" }}>
            Quatre paliers d&apos;avantages exclusifs pour nos clients les plus fidèles
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding" style={{ background: "#132A3A" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div key={tier.name} className="p-6 relative" style={{ background: "#0E202D", border: i === 3 ? "1px solid #F4DDC3" : "1px solid #1A3448" }}>
                {i === 3 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] uppercase tracking-[0.15em]"
                    style={{ background: "#F4DDC3", color: "#0E202D", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>
                    Exclusif
                  </div>
                )}
                <h3 className="text-[24px] mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: i === 3 ? "#F4DDC3" : "#FFFFFF" }}>
                  {tier.name}
                </h3>
                <p className="text-[12px] text-[#6B6B6B] mb-6" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                  {tier.condition}
                </p>
                <ul className="space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-[#A0A0A0]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                      <svg className="shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="#F4DDC3" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prepaid Cards */}
      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="text-center mb-12">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>CARTE PRÉPAYÉE</p>
            <h2 className="text-[28px] md:text-[36px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              Blocs d&apos;heures de vol
            </h2>
            <p className="text-[16px] text-[#A0A0A0]" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
              Achetez des heures de vol à l&apos;avance et bénéficiez de tarifs préférentiels
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cardePrepayee.map((c) => (
              <div key={c.heures} className="text-center p-6" style={{ background: "#132A3A", border: "1px solid #1A3448" }}>
                <p className="text-[36px] text-[#F4DDC3] mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>{c.heures}</p>
                <p className="text-[12px] text-[#6B6B6B] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>{c.prix}</p>
                <span className="inline-block px-3 py-1 text-[10px] uppercase" style={{ background: "rgba(244,221,195,0.1)", border: "1px solid #F4DDC3", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>
                  -{c.economie}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#132A3A" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="text-[28px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
            Rejoignez le programme
          </h2>
          <p className="text-[14px] text-[#A0A0A0] mb-8" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            Votre inscription est automatique dès votre premier vol. Contactez-nous pour en savoir plus.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 border text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#F4DDC3] hover:text-[#0E202D]"
            style={{ borderColor: "#F4DDC3", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
