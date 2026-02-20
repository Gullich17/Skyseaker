import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleet, categories } from "@/data/fleet";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";
import FleetCategoryClient from "./FleetCategoryClient";

/* ============================================
   STATIC PARAMS — pre-render all category slugs
   ============================================ */
export function generateStaticParams() {
  return categories
    .filter((c) => c.slug !== "tous")
    .map((c) => ({ category: c.slug }));
}

/* ============================================
   METADATA
   ============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat) return { title: "Category Not Found" };

  const count = fleet.filter((a) => a.categorySlug === category).length;
  const catName = tData(cat.name, locale as Locale);

  return {
    title: `${catName} — Private Jet Charter | Skyseaker`,
    description: `Discover our selection of ${count} ${catName.toLowerCase()} available for charter. Rates, specifications, and online booking.`,
    openGraph: {
      title: `${catName} | Skyseaker Fleet`,
      description: `${count} ${catName.toLowerCase()} available for charter.`,
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function FleetCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat || cat.slug === "tous") {
    notFound();
  }

  const aircraftList = fleet.filter((a) => a.categorySlug === category);

  return <FleetCategoryClient category={cat} aircraftList={aircraftList} />;
}
