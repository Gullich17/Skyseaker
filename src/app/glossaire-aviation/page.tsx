import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossaire de l'Aviation d'Affaires",
  description: "D\u00e9couvrez tous les termes de l'aviation d'affaires : FBO, empty leg, OACI, AOC et plus de 80 d\u00e9finitions pour comprendre le monde du jet priv\u00e9.",
};

const glossary = [
  { term: "Affr\u00e8tement", def: "Location d'un avion complet avec son \u00e9quipage pour un vol priv\u00e9. Contrairement \u00e0 l'achat de billets sur un vol r\u00e9gulier, l'affr\u00e8tement offre une flexibilit\u00e9 totale sur les horaires, la route et les services \u00e0 bord.", links: ["/services/affretement-jet-prive"] },
  { term: "AOC", def: "Air Operator Certificate \u2014 Certificat de transport a\u00e9rien d\u00e9livr\u00e9 par l'autorit\u00e9 de l'aviation civile, attestant qu'un op\u00e9rateur r\u00e9pond \u00e0 toutes les exigences de s\u00e9curit\u00e9 et de r\u00e9glementation pour exploiter des vols commerciaux." },
  { term: "APU", def: "Auxiliary Power Unit \u2014 Unit\u00e9 de puissance auxiliaire permettant d'alimenter les syst\u00e8mes de l'avion (climatisation, \u00e9lectricit\u00e9) au sol sans d\u00e9marrer les moteurs principaux." },
  { term: "Autonomie", def: "Distance maximale qu'un avion peut parcourir sans ravitaillement en carburant. L'autonomie varie selon le type d'appareil, de 2 000 km pour un very light jet \u00e0 plus de 14 000 km pour un ultra long range.", links: ["/flotte"] },
  { term: "Avionique", def: "Ensemble des syst\u00e8mes \u00e9lectroniques embarqu\u00e9s dans un avion : instruments de navigation, communication, pilotage automatique, radar m\u00e9t\u00e9o, etc." },
  { term: "Bizjet", def: "Abr\u00e9viation de Business Jet \u2014 terme anglais d\u00e9signant un avion d'affaires, par opposition aux avions de ligne commerciaux." },
  { term: "Cabin crew", def: "Personnel navigant commercial (h\u00f4tesses de l'air / stewards) assurant le service en cabine. Sur les vols priv\u00e9s, le cabin crew est facultatif sur les petits appareils mais obligatoire sur les gros porteurs." },
  { term: "Catering", def: "Service de restauration \u00e0 bord. En aviation priv\u00e9e, le catering peut aller d'un simple service de boissons \u00e0 un menu gastronomique pr\u00e9par\u00e9 par un chef \u00e9toil\u00e9.", links: ["/services/conciergerie-lifestyle"] },
  { term: "Charter", def: "Synonyme d'affr\u00e8tement en anglais. Vol charter = vol affr\u00e9t\u00e9, o\u00f9 l'avion entier est r\u00e9serv\u00e9 pour un client ou un groupe." },
  { term: "Code OACI", def: "Code de 4 lettres attribu\u00e9 par l'Organisation de l'Aviation Civile Internationale \u00e0 chaque a\u00e9roport (ex: LFPG pour Paris-Charles de Gaulle, LSGG pour Gen\u00e8ve)." },
  { term: "Code IATA", def: "Code de 3 lettres attribu\u00e9 par l'Association Internationale du Transport A\u00e9rien aux a\u00e9roports (ex: CDG pour Paris-Charles de Gaulle, GVA pour Gen\u00e8ve)." },
  { term: "Corridors a\u00e9riens", def: "Routes pr\u00e9d\u00e9finies dans l'espace a\u00e9rien que les avions doivent suivre. L'aviation priv\u00e9e offre parfois plus de flexibilit\u00e9 dans le choix des routes." },
  { term: "Dead leg", def: "Synonyme d'empty leg \u2014 vol \u00e0 vide de repositionnement d'un avion.", links: ["/empty-legs"] },
  { term: "EASA", def: "European Aviation Safety Agency \u2014 Agence europ\u00e9enne de la s\u00e9curit\u00e9 a\u00e9rienne, responsable de la r\u00e9glementation et de la certification de l'aviation civile en Europe." },
  { term: "EBAA", def: "European Business Aviation Association \u2014 Association europ\u00e9enne de l'aviation d'affaires, principal organisme professionnel du secteur." },
  { term: "Empty leg", def: "Vol de repositionnement d'un avion qui vole \u00e0 vide pour rejoindre sa prochaine mission ou sa base. Ces vols sont commercialis\u00e9s \u00e0 tarif r\u00e9duit (jusqu'\u00e0 -75%).", links: ["/empty-legs", "/services/vols-a-vide-empty-legs"] },
  { term: "FAA", def: "Federal Aviation Administration \u2014 Autorit\u00e9 de l'aviation civile des \u00c9tats-Unis, \u00e9quivalent am\u00e9ricain de l'EASA europ\u00e9en." },
  { term: "FBO", def: "Fixed Base Operator \u2014 Terminal d'aviation priv\u00e9e dans un a\u00e9roport, offrant des services d\u00e9di\u00e9s : salon VIP, hangar, ravitaillement, handling, douanes rapides." },
  { term: "Flat floor", def: "Cabine \u00e0 plancher plat, sans marche entre les zones. Caract\u00e9ristique des appareils super midsize et heavy jets, offrant un confort de d\u00e9placement sup\u00e9rieur." },
  { term: "Flight time", def: "Dur\u00e9e du vol entre le d\u00e9collage et l'atterrissage, sans compter les temps de roulage au sol." },
  { term: "Fuel stop", def: "Escale technique pour ravitaillement en carburant sur les longs trajets d\u00e9passant l'autonomie de l'appareil." },
  { term: "GAT", def: "General Aviation Terminal \u2014 Terminal d\u00e9di\u00e9 \u00e0 l'aviation g\u00e9n\u00e9rale et d'affaires dans un a\u00e9roport, distinct du terminal commercial." },
  { term: "GPU", def: "Ground Power Unit \u2014 Groupe \u00e9lectrog\u00e8ne au sol fournissant l'alimentation \u00e9lectrique \u00e0 l'avion pendant les op\u00e9rations de maintenance ou d'embarquement." },
  { term: "Handling", def: "Ensemble des services d'assistance au sol : accueil des passagers, chargement des bagages, ravitaillement, d\u00e9givrage, etc." },
  { term: "Hangar", def: "B\u00e2timent ferm\u00e9 permettant d'abriter un avion pour le prot\u00e9ger des intemp\u00e9ries et effectuer la maintenance." },
  { term: "Heavy jet", def: "Cat\u00e9gorie d'avion d'affaires de grande taille (10-16 passagers) capable de vols intercontinentaux sans escale. Exemples : Global 6000, Falcon 7X.", links: ["/flotte/heavy-jet"] },
  { term: "H\u00e9lisurface", def: "Zone d'atterrissage et de d\u00e9collage d'h\u00e9licopt\u00e8res, non permanente, pouvant \u00eatre am\u00e9nag\u00e9e temporairement." },
  { term: "IFR", def: "Instrument Flight Rules \u2014 R\u00e8gles de vol aux instruments, utilis\u00e9es dans la plupart des vols d'affaires, permettant de voler dans des conditions m\u00e9t\u00e9o d\u00e9grad\u00e9es." },
  { term: "IS-BAO", def: "International Standard for Business Aircraft Operations \u2014 Standard international pour les op\u00e9rations d'avions d'affaires, certification volontaire attestant des meilleures pratiques de s\u00e9curit\u00e9." },
  { term: "Jet card", def: "Carte pr\u00e9pay\u00e9e d'heures de vol permettant d'acc\u00e9der \u00e0 un jet priv\u00e9 sur simple appel, avec des tarifs garantis et une disponibilit\u00e9 prioritaire.", links: ["/contact"] },
  { term: "Knot", def: "N\u0153ud \u2014 unit\u00e9 de vitesse en aviation, \u00e9quivalant \u00e0 1 mille nautique par heure (environ 1,852 km/h)." },
  { term: "Landing fees", def: "Taxes d'atterrissage per\u00e7ues par l'a\u00e9roport \u00e0 chaque arriv\u00e9e d'un avion, calcul\u00e9es selon le poids de l'appareil." },
  { term: "Light jet", def: "Cat\u00e9gorie d'avion d'affaires compact (4-8 passagers) id\u00e9al pour les vols courts \u00e0 moyens (2-3h). Exemples : Phenom 300E, Citation CJ3+.", links: ["/flotte/light-jet"] },
  { term: "MEL", def: "Minimum Equipment List \u2014 Liste des \u00e9quipements minimum requis pour qu'un avion soit autoris\u00e9 \u00e0 voler." },
  { term: "Midsize jet", def: "Cat\u00e9gorie d'avion d'affaires de taille moyenne (8-9 passagers) offrant un excellent compromis entre confort et autonomie. Exemples : Praetor 500, Citation Latitude.", links: ["/flotte/midsize-jet"] },
  { term: "NBAA", def: "National Business Aviation Association \u2014 Association am\u00e9ricaine de l'aviation d'affaires, la plus grande organisation du secteur au monde." },
  { term: "Op\u00e9rateur", def: "Compagnie a\u00e9rienne exploitant les avions et les \u00e9quipages. En affr\u00e8tement, le courtier (broker) met en relation le client avec l'op\u00e9rateur le plus adapt\u00e9." },
  { term: "PAX", def: "Abr\u00e9viation de passagers en jargon a\u00e9ronautique." },
  { term: "Permit to fly", def: "Autorisation de survol d'un espace a\u00e9rien national, requise pour certains pays et organis\u00e9e par le courtier ou l'op\u00e9rateur." },
  { term: "Positioning", def: "Vol de positionnement \u2014 d\u00e9placement d'un avion vers un a\u00e9roport sp\u00e9cifique pour prendre en charge des passagers. Le co\u00fbt de positionnement est g\u00e9n\u00e9ralement inclus dans le devis." },
  { term: "Ramp", def: "Zone de stationnement des avions sur un a\u00e9roport, \u00e9galement appel\u00e9e tarmac." },
  { term: "Slot", def: "Cr\u00e9neau horaire attribu\u00e9 \u00e0 un avion pour d\u00e9coller ou atterrir \u00e0 un a\u00e9roport. Les a\u00e9roports tr\u00e8s fr\u00e9quent\u00e9s ont une gestion stricte des slots." },
  { term: "Super midsize jet", def: "Cat\u00e9gorie interm\u00e9diaire entre midsize et heavy jet (9-12 passagers) avec une cabine spacieuse et une autonomie transcontinentale. Exemples : Challenger 350, Praetor 600.", links: ["/flotte/super-midsize-jet"] },
  { term: "Tail number", def: "Immatriculation de l'avion, compos\u00e9e de lettres et chiffres peints sur la queue (empennage) de l'appareil." },
  { term: "Tarmac", def: "Surface b\u00e9tonn\u00e9e ou asphalt\u00e9e de l'a\u00e9roport o\u00f9 stationnent et circulent les avions." },
  { term: "Turbopropulseur", def: "Avion \u00e9quip\u00e9 de moteurs \u00e0 turbine entra\u00eenant des h\u00e9lices. Plus lent qu'un jet mais plus \u00e9conomique et capable d'atterrir sur des pistes courtes. Exemple : Pilatus PC-12.", links: ["/flotte/turbopropulseur"] },
  { term: "Ultra long range", def: "Cat\u00e9gorie d'avions d'affaires les plus performants, capables de relier n'importe quel point du globe sans escale (12 000+ km). Exemples : Gulfstream G650ER, Global 7500.", links: ["/flotte/ultra-long-range"] },
  { term: "VFR", def: "Visual Flight Rules \u2014 R\u00e8gles de vol \u00e0 vue, n\u00e9cessitant des conditions m\u00e9t\u00e9o favorables avec une visibilit\u00e9 suffisante." },
  { term: "VIP airliner", def: "Avion de ligne converti en configuration VIP luxueuse (20-50+ passagers). Exemples : Boeing BBJ 737, Airbus ACJ. Id\u00e9al pour les grands groupes.", links: ["/flotte/vip-airliner"] },
  { term: "Very light jet", def: "Plus petite cat\u00e9gorie de jet priv\u00e9 (2-4 passagers), id\u00e9al pour les courts trajets. Exemples : Citation Mustang, Phenom 100EV.", links: ["/flotte/very-light-jet"] },
  { term: "Wyvern", def: "Wyvern Wingman \u2014 Programme d'audit et de certification des op\u00e9rateurs d'aviation d'affaires, consid\u00e9r\u00e9 comme la r\u00e9f\u00e9rence mondiale en mati\u00e8re de s\u00e9curit\u00e9." },
];

const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

export default function GlossairePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "50vh", paddingTop: "128px", paddingBottom: "48px" }}
      >
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80"
            alt="Glossaire aviation d'affaires"
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
              letterSpacing: "0.2em",
              marginBottom: "16px",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#F4DDC3",
            }}
          >
            GLOSSAIRE
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 48px)",
              marginBottom: "16px",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Glossaire de l&apos;aviation d&apos;affaires
          </h1>
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              color: "#A0A0A0",
              maxWidth: "640px",
              margin: "0 auto",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
            }}
          >
            Tous les termes essentiels pour comprendre le monde du jet priv\u00e9
          </p>
        </div>
      </section>

      {/* Index */}
      <section
        className="sticky z-30"
        style={{
          top: "110px",
          padding: "32px 0",
          background: "rgba(14,32,45,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #1A3448",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5vw" }}>
          <div className="flex flex-wrap justify-center" style={{ gap: "8px" }}>
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="flex items-center justify-center hover:bg-[#F4DDC3] hover:text-[#0E202D] transition-all"
                style={{
                  width: "32px",
                  height: "32px",
                  fontSize: "13px",
                  border: "1px solid #1A3448",
                  color: "#F4DDC3",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 5vw" }}>
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: "36px",
                  marginBottom: "24px",
                  paddingBottom: "8px",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 600,
                  color: "#F4DDC3",
                  borderBottom: "1px solid rgba(244,221,195,0.2)",
                }}
              >
                {letter}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {glossary.filter((g) => g.term[0].toUpperCase() === letter).map((g) => (
                  <div key={g.term} id={g.term.toLowerCase().replace(/\s/g, "-")}>
                    <h3
                      style={{
                        fontSize: "18px",
                        marginBottom: "8px",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {g.term}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#A0A0A0",
                        lineHeight: 1.7,
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 300,
                      }}
                    >
                      {g.def}
                    </p>
                    {g.links && (
                      <div className="flex" style={{ gap: "12px", marginTop: "8px" }}>
                        {g.links.map((l) => (
                          <Link
                            key={l}
                            href={l}
                            className="transition-colors"
                            style={{
                              fontSize: "12px",
                              color: "#F4DDC3",
                              fontFamily: "var(--font-montserrat)",
                              fontWeight: 400,
                            }}
                          >
                            En savoir plus &rarr;
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
