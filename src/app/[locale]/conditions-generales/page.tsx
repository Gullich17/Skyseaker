"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type SectionConfig = {
  key: string;
  type: "content" | "contentWithList" | "contentWithListAndAfter";
};

const sectionConfigs: SectionConfig[] = [
  { key: "purpose", type: "content" },
  { key: "services", type: "contentWithList" },
  { key: "booking", type: "content" },
  { key: "pricing", type: "content" },
  { key: "cancellation", type: "contentWithListAndAfter" },
  { key: "cancellationByOperator", type: "content" },
  { key: "liability", type: "content" },
  { key: "insurance", type: "content" },
  { key: "travelDocuments", type: "content" },
  { key: "luggage", type: "content" },
  { key: "forceMajeure", type: "content" },
  { key: "complaints", type: "content" },
  { key: "mediation", type: "content" },
  { key: "jurisdiction", type: "content" },
];

export default function ConditionsGeneralesPage() {
  const t = useTranslations("legal");

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: "#0E202D" }}>
        <div className="px-[5vw] text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#F4DDC3] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>
            {t("termsConditions.preTitle")}
          </p>
          <h1 className="text-[36px] md:text-[48px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}>
            {t("termsConditions.title")}
          </h1>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div className="px-[5vw]" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {sectionConfigs.map((config, i) => {
            const base = `termsConditions.sections.${config.key}`;

            return (
              <div key={config.key} className="mb-12">
                <h2 className="text-[22px] mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
                  {t(`${base}.title`)}
                </h2>

                {/* Content paragraphs only */}
                {config.type === "content" && (
                  <div className="space-y-3">
                    {(t.raw(`${base}.content`) as string[]).map((p: string, j: number) => (
                      <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Content + list */}
                {config.type === "contentWithList" && (
                  <>
                    <div className="space-y-3">
                      {(t.raw(`${base}.content`) as string[]).map((p: string, j: number) => (
                        <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                          {p}
                        </p>
                      ))}
                    </div>
                    <ul className="space-y-2 ml-4 mt-3">
                      {(t.raw(`${base}.list`) as string[]).map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F4DDC3] shrink-0" />
                          <span className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Content + list + after */}
                {config.type === "contentWithListAndAfter" && (
                  <>
                    <div className="space-y-3">
                      {(t.raw(`${base}.content`) as string[]).map((p: string, j: number) => (
                        <p key={j} className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                          {p}
                        </p>
                      ))}
                    </div>
                    <ul className="space-y-2 ml-4 mt-3">
                      {(t.raw(`${base}.list`) as string[]).map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F4DDC3] shrink-0" />
                          <span className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[14px] leading-relaxed mt-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, color: "#A0A0A0" }}>
                      {t(`${base}.after`)}
                    </p>
                  </>
                )}

                {i < sectionConfigs.length - 1 && (
                  <div className="mt-12 mx-auto" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(244,221,195,0.3), transparent)" }} />
                )}
              </div>
            );
          })}

          <div className="mt-16 p-8" style={{ background: "#132A3A", border: "1px solid #1A3448" }}>
            <p className="text-[14px] text-[#A0A0A0] mb-4" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              {t("seeAlso")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                {t("termsConditions.relatedLinks.legalNotice")} &rarr;
              </Link>
              <Link href="/politique-confidentialite" className="text-[13px] text-[#F4DDC3] hover:text-[#F4DDC3] transition-colors" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                {t("termsConditions.relatedLinks.privacyPolicy")} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
