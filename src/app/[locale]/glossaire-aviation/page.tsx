"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const glossary = [
  { term: "Chartering", def: "Rental of an entire aircraft with its crew for a private flight. Unlike purchasing tickets on a scheduled flight, chartering offers complete flexibility over schedules, routes and onboard services.", links: ["/services/affretement-jet-prive"] },
  { term: "AOC", def: "Air Operator Certificate -- Certificate issued by the civil aviation authority, attesting that an operator meets all safety and regulatory requirements to operate commercial flights." },
  { term: "APU", def: "Auxiliary Power Unit -- An auxiliary power unit that supplies the aircraft's systems (air conditioning, electricity) on the ground without starting the main engines." },
  { term: "Range", def: "Maximum distance an aircraft can travel without refueling. Range varies by aircraft type, from 2,000 km for a very light jet to over 14,000 km for an ultra long range.", links: ["/flotte"] },
  { term: "Avionics", def: "All electronic systems onboard an aircraft: navigation instruments, communications, autopilot, weather radar, etc." },
  { term: "Bizjet", def: "Abbreviation for Business Jet -- a term referring to a business aircraft, as opposed to commercial airliners." },
  { term: "Cabin crew", def: "Flight attendants providing cabin service. On private flights, cabin crew is optional on small aircraft but mandatory on large aircraft." },
  { term: "Catering", def: "Onboard food and beverage service. In private aviation, catering can range from a simple drinks service to a gourmet menu prepared by a Michelin-starred chef.", links: ["/services/conciergerie-lifestyle"] },
  { term: "Charter", def: "The chartering of an aircraft, where the entire plane is reserved for a client or group." },
  { term: "ICAO Code", def: "4-letter code assigned by the International Civil Aviation Organization to each airport (e.g., LFPG for Paris-Charles de Gaulle, LSGG for Geneva)." },
  { term: "IATA Code", def: "3-letter code assigned by the International Air Transport Association to airports (e.g., CDG for Paris-Charles de Gaulle, GVA for Geneva)." },
  { term: "Air corridors", def: "Predefined routes in airspace that aircraft must follow. Private aviation sometimes offers greater flexibility in route selection." },
  { term: "Dead leg", def: "Synonym for empty leg -- a repositioning flight where the aircraft flies empty.", links: ["/empty-legs"] },
  { term: "EASA", def: "European Aviation Safety Agency -- The European agency responsible for the regulation and certification of civil aviation in Europe." },
  { term: "EBAA", def: "European Business Aviation Association -- The main professional organization for the business aviation sector in Europe." },
  { term: "Empty leg", def: "A repositioning flight where an aircraft flies empty to reach its next mission or home base. These flights are sold at reduced rates (up to -75%).", links: ["/empty-legs", "/services/vols-a-vide-empty-legs"] },
  { term: "FAA", def: "Federal Aviation Administration -- The United States civil aviation authority, the American equivalent of the European EASA." },
  { term: "FBO", def: "Fixed Base Operator -- A private aviation terminal at an airport, offering dedicated services: VIP lounge, hangar, fueling, handling, fast customs." },
  { term: "Flat floor", def: "A cabin with a flat floor, without steps between zones. A feature of super midsize and heavy jets, offering superior comfort of movement." },
  { term: "Flight time", def: "Duration of the flight between takeoff and landing, excluding ground taxiing time." },
  { term: "Fuel stop", def: "A technical stop for refueling on long trips exceeding the aircraft's range." },
  { term: "GAT", def: "General Aviation Terminal -- A terminal dedicated to general and business aviation at an airport, separate from the commercial terminal." },
  { term: "GPU", def: "Ground Power Unit -- A ground generator providing electrical power to the aircraft during maintenance or boarding operations." },
  { term: "Handling", def: "All ground assistance services: passenger reception, luggage loading, fueling, de-icing, etc." },
  { term: "Hangar", def: "An enclosed building used to shelter an aircraft from the elements and perform maintenance." },
  { term: "Heavy jet", def: "Category of large business aircraft (10-16 passengers) capable of intercontinental flights without stops. Examples: Global 6000, Falcon 7X.", links: ["/flotte/heavy-jet"] },
  { term: "Helipad", def: "A non-permanent helicopter landing and takeoff area that can be temporarily set up." },
  { term: "IFR", def: "Instrument Flight Rules -- Flight rules used in most business flights, allowing flight in degraded weather conditions." },
  { term: "IS-BAO", def: "International Standard for Business Aircraft Operations -- An international standard for business aircraft operations, a voluntary certification attesting to best safety practices." },
  { term: "Jet card", def: "A prepaid flight hours card providing access to a private jet with a simple call, with guaranteed rates and priority availability.", links: ["/contact"] },
  { term: "Knot", def: "A unit of speed in aviation, equivalent to 1 nautical mile per hour (approximately 1.852 km/h)." },
  { term: "Landing fees", def: "Landing taxes charged by the airport for each aircraft arrival, calculated based on the weight of the aircraft." },
  { term: "Light jet", def: "Category of compact business aircraft (4-8 passengers) ideal for short to medium flights (2-3 hours). Examples: Phenom 300E, Citation CJ3+.", links: ["/flotte/light-jet"] },
  { term: "MEL", def: "Minimum Equipment List -- The list of minimum equipment required for an aircraft to be authorized to fly." },
  { term: "Midsize jet", def: "Category of medium-sized business aircraft (8-9 passengers) offering an excellent balance between comfort and range. Examples: Praetor 500, Citation Latitude.", links: ["/flotte/midsize-jet"] },
  { term: "NBAA", def: "National Business Aviation Association -- The American business aviation association, the largest organization in the sector worldwide." },
  { term: "Operator", def: "An airline operating the aircraft and crews. In chartering, the broker connects the client with the most suitable operator." },
  { term: "PAX", def: "Abbreviation for passengers in aeronautical jargon." },
  { term: "Permit to fly", def: "Authorization to overfly a national airspace, required for certain countries and organized by the broker or operator." },
  { term: "Positioning", def: "Positioning flight -- movement of an aircraft to a specific airport to pick up passengers. The positioning cost is generally included in the quote." },
  { term: "Ramp", def: "Aircraft parking area at an airport, also called the tarmac." },
  { term: "Slot", def: "Time slot assigned to an aircraft for takeoff or landing at an airport. Busy airports have strict slot management." },
  { term: "Super midsize jet", def: "An intermediate category between midsize and heavy jet (9-12 passengers) with a spacious cabin and transcontinental range. Examples: Challenger 350, Praetor 600.", links: ["/flotte/super-midsize-jet"] },
  { term: "Tail number", def: "The aircraft registration, composed of letters and numbers painted on the tail (empennage) of the aircraft." },
  { term: "Tarmac", def: "The concrete or asphalt surface at the airport where aircraft park and taxi." },
  { term: "Turboprop", def: "An aircraft equipped with turbine engines driving propellers. Slower than a jet but more economical and capable of landing on short runways. Example: Pilatus PC-12.", links: ["/flotte/turbopropulseur"] },
  { term: "Ultra long range", def: "Category of the highest-performing business aircraft, capable of connecting any point on the globe without stops (12,000+ km). Examples: Gulfstream G650ER, Global 7500.", links: ["/flotte/ultra-long-range"] },
  { term: "VFR", def: "Visual Flight Rules -- Rules requiring favorable weather conditions with sufficient visibility." },
  { term: "VIP airliner", def: "A commercial airliner converted into a luxury VIP configuration (20-50+ passengers). Examples: Boeing BBJ 737, Airbus ACJ. Ideal for large groups.", links: ["/flotte/vip-airliner"] },
  { term: "Very light jet", def: "The smallest category of private jet (2-4 passengers), ideal for short trips. Examples: Citation Mustang, Phenom 100EV.", links: ["/flotte/very-light-jet"] },
  { term: "Wyvern", def: "Wyvern Wingman -- An audit and certification program for business aviation operators, considered the global benchmark for safety." },
];

const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

export default function GlossairePage() {
  const t = useTranslations("glossary");

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "50vh", paddingTop: "128px", paddingBottom: "48px" }}
      >
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/images/fleet/challenger-605/main.png"
            alt="Business aviation glossary"
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
            {t("hero.preTitle")}
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
            {t("hero.title")}
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
            {t("hero.subtitle")}
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
                            {t("learnMore")} &rarr;
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
