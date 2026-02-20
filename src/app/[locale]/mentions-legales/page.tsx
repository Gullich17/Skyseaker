"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const sectionKeys = [
  "publisher",
  "hosting",
  "intellectualProperty",
  "liability",
  "hyperlinks",
  "cookies",
  "applicableLaw",
  "contact",
] as const;

export default function MentionsLegalesPage() {
  const t = useTranslations("legal");

  const sections = sectionKeys.map((key) => ({
    title: t(`legalNotice.sections.${key}.title`),
    content: t.raw(`legalNotice.sections.${key}.content`) as string[],
  }));

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            {t("legalNotice.preTitle")}
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            {t("legalNotice.title")}
          </h1>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            {t("lastUpdated")}
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
                {section.content.map((paragraph: string, j: number) => (
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
              {t("seeAlso")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/politique-confidentialite" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                {t("legalNotice.relatedLinks.privacyPolicy")} &rarr;
              </Link>
              <Link href="/conditions-generales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                {t("legalNotice.relatedLinks.termsConditions")} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
