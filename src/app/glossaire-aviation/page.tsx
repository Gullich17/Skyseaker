import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossaire de l'Aviation d'Affaires",
  description: "Découvrez tous les termes de l'aviation d'affaires : FBO, empty leg, OACI, AOC et plus de 80 définitions pour comprendre le monde du jet privé.",
};

const glossary = [
  { term: "Affrètement", def: "Location d'un avion complet avec son équipage pour un vol privé. Contrairement à l'achat de billets sur un vol régulier, l'affrètement offre une flexibilité totale sur les horaires, la route et les services à bord.", links: ["/services/affretement-jet-prive"] },
  { term: "AOC", def: "Air Operator Certificate — Certificat de transport aérien délivré par l'autorité de l'aviation civile, attestant qu'un opérateur répond à toutes les exigences de sécurité et de réglementation pour exploiter des vols commerciaux." },
  { term: "APU", def: "Auxiliary Power Unit — Unité de puissance auxiliaire permettant d'alimenter les systèmes de l'avion (climatisation, électricité) au sol sans démarrer les moteurs principaux." },
  { term: "Autonomie", def: "Distance maximale qu'un avion peut parcourir sans ravitaillement en carburant. L'autonomie varie selon le type d'appareil, de 2 000 km pour un very light jet à plus de 14 000 km pour un ultra long range.", links: ["/flotte"] },
  { term: "Avionique", def: "Ensemble des systèmes électroniques embarqués dans un avion : instruments de navigation, communication, pilotage automatique, radar météo, etc." },
  { term: "Bizjet", def: "Abréviation de Business Jet — terme anglais désignant un avion d'affaires, par opposition aux avions de ligne commerciaux." },
  { term: "Cabin crew", def: "Personnel navigant commercial (hôtesses de l'air / stewards) assurant le service en cabine. Sur les vols privés, le cabin crew est facultatif sur les petits appareils mais obligatoire sur les gros porteurs." },
  { term: "Catering", def: "Service de restauration à bord. En aviation privée, le catering peut aller d'un simple service de boissons à un menu gastronomique préparé par un chef étoilé.", links: ["/services/conciergerie-lifestyle"] },
  { term: "Charter", def: "Synonyme d'affrètement en anglais. Vol charter = vol affrété, où l'avion entier est réservé pour un client ou un groupe." },
  { term: "Code OACI", def: "Code de 4 lettres attribué par l'Organisation de l'Aviation Civile Internationale à chaque aéroport (ex: LFPG pour Paris-Charles de Gaulle, LSGG pour Genève)." },
  { term: "Code IATA", def: "Code de 3 lettres attribué par l'Association Internationale du Transport Aérien aux aéroports (ex: CDG pour Paris-Charles de Gaulle, GVA pour Genève)." },
  { term: "Corridors aériens", def: "Routes prédéfinies dans l'espace aérien que les avions doivent suivre. L'aviation privée offre parfois plus de flexibilité dans le choix des routes." },
  { term: "Dead leg", def: "Synonyme d'empty leg — vol à vide de repositionnement d'un avion.", links: ["/empty-legs"] },
  { term: "EASA", def: "European Aviation Safety Agency — Agence européenne de la sécurité aérienne, responsable de la réglementation et de la certification de l'aviation civile en Europe." },
  { term: "EBAA", def: "European Business Aviation Association — Association européenne de l'aviation d'affaires, principal organisme professionnel du secteur." },
  { term: "Empty leg", def: "Vol de repositionnement d'un avion qui vole à vide pour rejoindre sa prochaine mission ou sa base. Ces vols sont commercialisés à tarif réduit (jusqu'à -75%).", links: ["/empty-legs", "/services/vols-a-vide-empty-legs"] },
  { term: "FAA", def: "Federal Aviation Administration — Autorité de l'aviation civile des États-Unis, équivalent américain de l'EASA européen." },
  { term: "FBO", def: "Fixed Base Operator — Terminal d'aviation privée dans un aéroport, offrant des services dédiés : salon VIP, hangar, ravitaillement, handling, douanes rapides." },
  { term: "Flat floor", def: "Cabine à plancher plat, sans marche entre les zones. Caractéristique des appareils super midsize et heavy jets, offrant un confort de déplacement supérieur." },
  { term: "Flight time", def: "Durée du vol entre le décollage et l'atterrissage, sans compter les temps de roulage au sol." },
  { term: "Fuel stop", def: "Escale technique pour ravitaillement en carburant sur les longs trajets dépassant l'autonomie de l'appareil." },
  { term: "GAT", def: "General Aviation Terminal — Terminal dédié à l'aviation générale et d'affaires dans un aéroport, distinct du terminal commercial." },
  { term: "GPU", def: "Ground Power Unit — Groupe électrogène au sol fournissant l'alimentation électrique à l'avion pendant les opérations de maintenance ou d'embarquement." },
  { term: "Handling", def: "Ensemble des services d'assistance au sol : accueil des passagers, chargement des bagages, ravitaillement, dégivrage, etc." },
  { term: "Hangar", def: "Bâtiment fermé permettant d'abriter un avion pour le protéger des intempéries et effectuer la maintenance." },
  { term: "Heavy jet", def: "Catégorie d'avion d'affaires de grande taille (10-16 passagers) capable de vols intercontinentaux sans escale. Exemples : Global 6000, Falcon 7X.", links: ["/flotte/heavy-jet"] },
  { term: "Hélisurface", def: "Zone d'atterrissage et de décollage d'hélicoptères, non permanente, pouvant être aménagée temporairement." },
  { term: "IFR", def: "Instrument Flight Rules — Règles de vol aux instruments, utilisées dans la plupart des vols d'affaires, permettant de voler dans des conditions météo dégradées." },
  { term: "IS-BAO", def: "International Standard for Business Aircraft Operations — Standard international pour les opérations d'avions d'affaires, certification volontaire attestant des meilleures pratiques de sécurité." },
  { term: "Jet card", def: "Carte prépayée d'heures de vol permettant d'accéder à un jet privé sur simple appel, avec des tarifs garantis et une disponibilité prioritaire.", links: ["/programme-fidelite"] },
  { term: "Knot", def: "Nœud — unité de vitesse en aviation, équivalant à 1 mille nautique par heure (environ 1,852 km/h)." },
  { term: "Landing fees", def: "Taxes d'atterrissage perçues par l'aéroport à chaque arrivée d'un avion, calculées selon le poids de l'appareil." },
  { term: "Light jet", def: "Catégorie d'avion d'affaires compact (4-8 passagers) idéal pour les vols courts à moyens (2-3h). Exemples : Phenom 300E, Citation CJ3+.", links: ["/flotte/light-jet"] },
  { term: "MEL", def: "Minimum Equipment List — Liste des équipements minimum requis pour qu'un avion soit autorisé à voler." },
  { term: "Midsize jet", def: "Catégorie d'avion d'affaires de taille moyenne (8-9 passagers) offrant un excellent compromis entre confort et autonomie. Exemples : Praetor 500, Citation Latitude.", links: ["/flotte/midsize-jet"] },
  { term: "NBAA", def: "National Business Aviation Association — Association américaine de l'aviation d'affaires, la plus grande organisation du secteur au monde." },
  { term: "Opérateur", def: "Compagnie aérienne exploitant les avions et les équipages. En affrètement, le courtier (broker) met en relation le client avec l'opérateur le plus adapté." },
  { term: "PAX", def: "Abréviation de passagers en jargon aéronautique." },
  { term: "Permit to fly", def: "Autorisation de survol d'un espace aérien national, requise pour certains pays et organisée par le courtier ou l'opérateur." },
  { term: "Positioning", def: "Vol de positionnement — déplacement d'un avion vers un aéroport spécifique pour prendre en charge des passagers. Le coût de positionnement est généralement inclus dans le devis." },
  { term: "Ramp", def: "Zone de stationnement des avions sur un aéroport, également appelée tarmac." },
  { term: "Slot", def: "Créneau horaire attribué à un avion pour décoller ou atterrir à un aéroport. Les aéroports très fréquentés ont une gestion stricte des slots." },
  { term: "Super midsize jet", def: "Catégorie intermédiaire entre midsize et heavy jet (9-12 passagers) avec une cabine spacieuse et une autonomie transcontinentale. Exemples : Challenger 350, Praetor 600.", links: ["/flotte/super-midsize-jet"] },
  { term: "Tail number", def: "Immatriculation de l'avion, composée de lettres et chiffres peints sur la queue (empennage) de l'appareil." },
  { term: "Tarmac", def: "Surface bétonnée ou asphaltée de l'aéroport où stationnent et circulent les avions." },
  { term: "Turbopropulseur", def: "Avion équipé de moteurs à turbine entraînant des hélices. Plus lent qu'un jet mais plus économique et capable d'atterrir sur des pistes courtes. Exemple : Pilatus PC-12.", links: ["/flotte/turbopropulseur"] },
  { term: "Ultra long range", def: "Catégorie d'avions d'affaires les plus performants, capables de relier n'importe quel point du globe sans escale (12 000+ km). Exemples : Gulfstream G650ER, Global 7500.", links: ["/flotte/ultra-long-range"] },
  { term: "VFR", def: "Visual Flight Rules — Règles de vol à vue, nécessitant des conditions météo favorables avec une visibilité suffisante." },
  { term: "VIP airliner", def: "Avion de ligne converti en configuration VIP luxueuse (20-50+ passagers). Exemples : Boeing BBJ 737, Airbus ACJ. Idéal pour les grands groupes.", links: ["/flotte/vip-airliner"] },
  { term: "Very light jet", def: "Plus petite catégorie de jet privé (2-4 passagers), idéal pour les courts trajets. Exemples : Citation Mustang, Phenom 100EV.", links: ["/flotte/very-light-jet"] },
  { term: "Wyvern", def: "Wyvern Wingman — Programme d'audit et de certification des opérateurs d'aviation d'affaires, considéré comme la référence mondiale en matière de sécurité." },
];

const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

export default function GlossairePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>GLOSSAIRE</p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Glossaire de l&apos;aviation d&apos;affaires
          </h1>
          <p className="text-[18px] text-[#A0A0A0]" style={{ maxWidth: "640px", margin: "0 auto", fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
            Tous les termes essentiels pour comprendre le monde du jet privé
          </p>
        </div>
      </section>

      {/* Index */}
      <section className="py-8 sticky top-[110px] z-30" style={{ background: "rgba(14,32,45,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #1A3448" }}>
        <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="flex flex-wrap justify-center gap-2">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center text-[13px] hover:bg-[#F4DDC3] hover:text-[#0E202D] transition-all"
                style={{ border: "1px solid #1A3448", color: "#F4DDC3", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12">
              <h2 className="text-[36px] mb-6 pb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#F4DDC3", borderBottom: "1px solid rgba(244,221,195,0.2)" }}>
                {letter}
              </h2>
              <div className="space-y-6">
                {glossary.filter((g) => g.term[0].toUpperCase() === letter).map((g) => (
                  <div key={g.term} id={g.term.toLowerCase().replace(/\s/g, "-")}>
                    <h3 className="text-[18px] mb-2" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#FFFFFF" }}>
                      {g.term}
                    </h3>
                    <p className="text-[14px] text-[#A0A0A0] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                      {g.def}
                    </p>
                    {g.links && (
                      <div className="flex gap-3 mt-2">
                        {g.links.map((l) => (
                          <Link key={l} href={l} className="text-[12px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors"
                            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                            En savoir plus →
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
