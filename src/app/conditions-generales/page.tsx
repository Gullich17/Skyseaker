import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "General Terms and Conditions of Sale",
  description: "General terms and conditions of sale for Skyseaker. Booking, cancellation, payment terms and liability for your private jet flights.",
};

export default function ConditionsGeneralesPage() {
  const sections = [
    {
      title: "1. Purpose",
      content: [
        "These General Terms and Conditions of Sale (GTC) govern the contractual relationship between Skyseaker SAS (hereinafter \"Skyseaker\") and any individual or legal entity (hereinafter \"the Client\") wishing to use the private aviation brokerage services offered by Skyseaker.",
        "Skyseaker acts as an air charter broker and connects the Client with air operators holding a valid AOC (Air Operator Certificate).",
      ],
    },
    {
      title: "2. Services Offered",
      content: [
        "Skyseaker offers the following services:",
      ],
      list: [
        "Chartering of private jets and helicopters",
        "Sale of empty leg flights",
        "Group travel organization",
        "Urgent air freight service",
        "Concierge and lifestyle services",
        "VIP transfers",
        "Aircraft management",
        "Aircraft acquisition and sales consulting",
      ],
    },
    {
      title: "3. Quote Request and Booking",
      content: [
        "The Client may submit a quote request via the online form, by phone or by email. The quote is provided for informational purposes and is only binding on Skyseaker after written confirmation.",
        "The booking is considered firm and final after:",
        "1. Written acceptance of the quote by the Client (email, electronic or handwritten signature).",
        "2. Receipt of the deposit payment as specified in the quote.",
        "Skyseaker reserves the right to refuse a booking without having to justify its decision.",
      ],
    },
    {
      title: "4. Pricing and Payment",
      content: [
        "Prices stated in quotes are in euros, all taxes included, unless otherwise specified. They include the elements specified in the quote (flight hours, airport taxes, positioning, etc.).",
        "Prices displayed on the website are provided for indicative purposes and may vary depending on availability, season and market conditions.",
        "Payment is made by bank transfer. Payment terms are as follows:",
        "100% deposit of the total amount at booking for flights under 30,000 euros.",
        "50% deposit at booking and balance due 72 hours before the flight for flights over 30,000 euros.",
        "Additional charges not included in the initial quote (extended waiting time, itinerary changes, additional catering, etc.) will be invoiced separately.",
      ],
    },
    {
      title: "5. Cancellation and Modification",
      content: [
        "In the event of cancellation by the Client, the following conditions apply:",
      ],
      list: [
        "Cancellation more than 72 hours before departure: full refund minus administrative fees (5% of total amount, capped at 2,000 euros)",
        "Cancellation between 24 and 72 hours before departure: 50% of total amount retained",
        "Cancellation less than 24 hours before departure: no refund",
        "No-show (absence without prior cancellation): no refund",
      ],
      after: "Itinerary, schedule or passenger number modifications are possible subject to availability and may result in a price adjustment.",
    },
    {
      title: "6. Cancellation by Skyseaker or the Operator",
      content: [
        "In the event of cancellation by Skyseaker or the operator for technical, meteorological or safety reasons, Skyseaker commits to offering an alternative solution (replacement aircraft, flight rescheduling) or to providing a full refund of all amounts paid.",
        "Skyseaker cannot be held liable for indirect consequences of the cancellation (hotel costs, missed events, etc.).",
      ],
    },
    {
      title: "7. Liability",
      content: [
        "Skyseaker acts as an air charter broker and is not an air carrier. Liability for transportation lies exclusively with the air operator.",
        "Skyseaker commits to selecting operators that hold all required certifications (AOC, insurance) and comply with the strictest safety standards.",
        "Skyseaker's liability is limited to the amount of commissions received for the service in question, except in cases of gross negligence or willful misconduct.",
      ],
    },
    {
      title: "8. Insurance",
      content: [
        "All flights organized by Skyseaker are covered by the air operator's civil liability insurance, in accordance with applicable regulatory requirements.",
        "Skyseaker recommends that the Client take out supplementary travel insurance covering cancellation risks, lost luggage and personal civil liability.",
      ],
    },
    {
      title: "9. Travel Documents",
      content: [
        "The Client is responsible for the validity of their travel documents (passport, visa, identity card) as well as compliance with entry and exit formalities for the countries concerned.",
        "Skyseaker may assist the Client with administrative procedures (overflight permits, airport slots) but cannot be held liable in the event of denied boarding or entry to a territory.",
      ],
    },
    {
      title: "10. Luggage",
      content: [
        "Luggage capacity varies depending on the type of aircraft and is specified in the quote. The Client agrees to comply with the weight and volume limitations indicated.",
        "The transport of hazardous materials, weapons and illicit substances is strictly prohibited.",
      ],
    },
    {
      title: "11. Force Majeure",
      content: [
        "Skyseaker cannot be held liable for total or partial failure to fulfill its obligations if such failure results from a force majeure event as defined by Article 1218 of the French Civil Code.",
        "Force majeure events include, but are not limited to: extreme weather conditions, airspace closures, strikes, armed conflicts, epidemics, acts of terrorism and decisions by public authorities.",
      ],
    },
    {
      title: "12. Complaints",
      content: [
        "Any complaint must be submitted in writing to Skyseaker within 30 days following the date of the flight in question.",
        "Email: reclamations@skyseaker.com",
        "Mail: Skyseaker SAS, Complaints Department, 8 Avenue de l'Opera, 75001 Paris, France.",
      ],
    },
    {
      title: "13. Mediation",
      content: [
        "In the event of a dispute that cannot be resolved amicably, the Client may use the consumer mediation service free of charge. The competent mediator is the Tourism and Travel Mediator (MTV).",
        "Website: www.mtv.travel",
      ],
    },
    {
      title: "14. Applicable Law and Jurisdiction",
      content: [
        "These GTC are governed by French law. Any dispute relating to their interpretation or execution falls under the exclusive jurisdiction of the courts of Paris, France.",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            CONTRACTUAL TERMS
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            General Terms and Conditions of Sale
          </h1>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            Last updated: February 2026
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

              {"list" in section && section.list && (
                <ul className="space-y-2 ml-4 mt-3">
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

              {i < sections.length - 1 && (
                <div className="mt-12 mx-auto" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(244,221,195,0.3), transparent)" }} />
              )}
            </div>
          ))}

          <div className="mt-16 p-8" style={{ background: "#132A3A", border: "1px solid #1A3448" }}>
            <p className="text-[14px] text-[#A0A0A0] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              See also:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Legal Notice →
              </Link>
              <Link href="/politique-confidentialite" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
