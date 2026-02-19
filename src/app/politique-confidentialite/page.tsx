import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Skyseaker privacy policy. Learn how we protect your personal data in compliance with GDPR.",
};

export default function PolitiqueConfidentialitePage() {
  const sections = [
    {
      title: "1. Data Controller",
      content: [
        "The data controller for personal data collected on the skyseaker.com website is:",
        "Skyseaker SAS, 8 Avenue de l'Opera, 75001 Paris, France.",
        "Email: dpo@skyseaker.com",
      ],
    },
    {
      title: "2. Data Collected",
      paragraphs: [
        "As part of our services, we may collect the following personal data:",
      ],
      list: [
        "Identification data: last name, first name, email address, phone number",
        "Professional data: company, position",
        "Travel data: destinations, flight dates, number of passengers, service preferences",
        "Browsing data: IP address, cookies, pages visited, visit duration",
        "Communication data: messages sent via contact forms",
      ],
    },
    {
      title: "3. Purposes of Processing",
      paragraphs: ["Your personal data is processed for the following purposes:"],
      list: [
        "Management of quote requests and flight bookings",
        "Commercial communications with your consent",
        "Improvement of our services and user experience",
        "Customer relationship management and loyalty program",
        "Compliance with our legal and regulatory obligations",
        "Website traffic statistics and analysis",
      ],
    },
    {
      title: "4. Legal Basis for Processing",
      content: [
        "The processing of your personal data is based on the following legal grounds:",
        "Performance of a contract or pre-contractual measures (quote request, booking).",
        "Your consent (newsletter, non-essential cookies).",
        "Skyseaker's legitimate interest (service improvement, statistics).",
        "Compliance with legal obligations (invoicing, archiving).",
      ],
    },
    {
      title: "5. Data Recipients",
      content: [
        "Your personal data is intended for authorized Skyseaker SAS personnel, as well as our subcontractors strictly within the scope of performing their duties:",
        "Partner air operators (in connection with flight bookings).",
        "Service providers (catering, transfers, concierge).",
        "Website hosting provider (Vercel Inc.).",
        "No personal data is sold to third parties for commercial purposes without your explicit consent.",
      ],
    },
    {
      title: "6. Data Retention Period",
      content: [
        "Your personal data is retained for a period proportionate to the purpose of processing:",
        "Client data: for the duration of the business relationship and 5 years after the last contact.",
        "Prospect data: 3 years from the last contact.",
        "Browsing data (cookies): 13 months maximum.",
        "Billing data: 10 years in accordance with accounting obligations.",
      ],
    },
    {
      title: "7. Your Rights",
      paragraphs: [
        "In accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act, you have the following rights:",
      ],
      list: [
        "Right of access: obtain confirmation that data concerning you is being processed and obtain a copy",
        "Right to rectification: request the correction of inaccurate or incomplete data",
        "Right to erasure: request the deletion of your data under the conditions provided by law",
        "Right to restriction of processing: request the restriction of processing in certain cases",
        "Right to data portability: receive your data in a structured and readable format",
        "Right to object: object to the processing of your data on legitimate grounds",
        "Right to withdraw consent: withdraw your consent at any time",
      ],
      after: "To exercise your rights, contact us at: dpo@skyseaker.com. You also have the right to file a complaint with the CNIL (French National Commission for Information Technology and Civil Liberties).",
    },
    {
      title: "8. Cookies",
      content: [
        "The skyseaker.com website uses cookies to ensure its proper functioning and to improve your browsing experience.",
      ],
      subtable: [
        { type: "Essential cookies", desc: "Necessary for the website to function (session, language preferences). Cannot be disabled.", duration: "Session" },
        { type: "Analytical cookies", desc: "Allow analysis of website usage to improve performance.", duration: "13 months" },
        { type: "Marketing cookies", desc: "Used to display relevant advertisements. Only placed with your consent.", duration: "13 months" },
      ],
    },
    {
      title: "9. Data Security",
      content: [
        "Skyseaker SAS implements appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration or disclosure.",
        "The website uses the HTTPS protocol to secure data exchanges between your browser and our servers.",
      ],
    },
    {
      title: "10. Transfers Outside the EU",
      content: [
        "Certain data may be transferred to countries located outside the European Union (notably to the United States for hosting). These transfers are governed by appropriate safeguards in accordance with the GDPR (standard contractual clauses, adequacy decisions).",
      ],
    },
    {
      title: "11. Policy Modifications",
      content: [
        "Skyseaker SAS reserves the right to modify this privacy policy at any time. Modifications take effect upon publication on the website. We invite you to regularly consult this page.",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            GDPR & PERSONAL DATA
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Privacy Policy
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
                        <th className="pb-3 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#F4DDC3" }}>Duration</th>
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
              See also:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Legal Notice →
              </Link>
              <Link href="/conditions-generales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                General Terms and Conditions of Sale →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
