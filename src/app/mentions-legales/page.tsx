import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice for Skyseaker, luxury private aviation broker. Legal information, publisher, hosting provider and intellectual property.",
};

export default function MentionsLegalesPage() {
  const sections = [
    {
      title: "1. Website Publisher",
      content: [
        "The website skyseaker.com is published by:",
        "Skyseaker SAS",
        "Simplified Joint-Stock Company with a share capital of 50,000 euros",
        "Registered office: 8 Avenue de l'Opera, 75001 Paris, France",
        "Paris Trade Register: XXX XXX XXX",
        "EU VAT Number: FR XX XXX XXX XXX",
        "Publication Director: [Name of Director]",
        "Email: contact@skyseaker.com",
        "Phone: +33 1 00 00 00 00",
      ],
    },
    {
      title: "2. Hosting",
      content: [
        "The website is hosted by:",
        "Vercel Inc.",
        "440 N Barranca Ave #4133",
        "Covina, CA 91723, United States",
        "Website: vercel.com",
      ],
    },
    {
      title: "3. Intellectual Property",
      content: [
        "All content on the skyseaker.com website (text, images, graphics, logo, icons, videos, etc.) is protected by copyright and trademark law, in accordance with the provisions of the Intellectual Property Code.",
        "Any reproduction, representation, modification, publication or adaptation of all or part of the elements of the website, by any means or process, is prohibited without prior written authorization from Skyseaker SAS.",
        "The Skyseaker trademark, as well as all figurative or non-figurative trademarks, and more generally all other trademarks, illustrations, images and logos appearing on the website are and remain the exclusive property of Skyseaker SAS.",
      ],
    },
    {
      title: "4. Limitation of Liability",
      content: [
        "Skyseaker SAS endeavors to ensure the accuracy and updating of information published on the website to the best of its ability. However, Skyseaker SAS cannot guarantee the accuracy, precision or completeness of the information made available on the website.",
        "Skyseaker SAS disclaims all liability for any inaccuracy, error or omission relating to information available on the website.",
        "Prices displayed on the website are provided for indicative purposes only and do not constitute a contractual offer. Final rates are communicated in the personalized quote provided to the client.",
      ],
    },
    {
      title: "5. Hyperlinks",
      content: [
        "The skyseaker.com website may contain hyperlinks to other websites. Skyseaker SAS has no control over these sites and disclaims all liability regarding their content.",
        "The creation of hyperlinks to the skyseaker.com website is subject to prior approval from Skyseaker SAS.",
      ],
    },
    {
      title: "6. Cookies",
      content: [
        "The skyseaker.com website uses cookies to improve the user experience and analyze traffic. To learn more about the use of cookies, please refer to our privacy policy.",
      ],
    },
    {
      title: "7. Applicable Law",
      content: [
        "These legal notices are governed by French law. In the event of a dispute, the courts of Paris shall have sole jurisdiction.",
      ],
    },
    {
      title: "8. Contact",
      content: [
        "For any questions regarding these legal notices, you can contact us:",
        "By email: contact@skyseaker.com",
        "By phone: +33 1 00 00 00 00",
        "By mail: Skyseaker SAS, 8 Avenue de l'Opera, 75001 Paris, France",
      ],
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            LEGAL INFORMATION
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            Legal Notice
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
              See also:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/politique-confidentialite" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                Privacy Policy →
              </Link>
              <Link href="/conditions-generales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                General Terms and Conditions →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
