import { Metadata } from "next";
import { notFound } from "next/navigation";
import { yachts, yachtCategories } from "@/data/yachts";
import { t as tData } from "@/lib/i18n-data";
import type { Locale } from "@/i18n/routing";
import YachtCategoryClient from "./YachtCategoryClient";

/* ============================================
   STATIC PARAMS
   ============================================ */
export function generateStaticParams() {
  return yachtCategories
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
  const cat = yachtCategories.find((c) => c.slug === category);

  if (!cat) return { title: "Category not found" };

  const count = yachts.filter((y) => y.categorySlug === category).length;
  const catName = tData(cat.name, locale as Locale);

  return {
    title: `${catName} — Luxury Yacht Charter | Skyseaker`,
    description: `Discover our selection of ${count} ${catName.toLowerCase()}${count > 1 ? "s" : ""} available for charter. Specifications, crew and booking.`,
    openGraph: {
      title: `${catName} | Skyseaker Yachts`,
      description: `${count} ${catName.toLowerCase()}${count > 1 ? "s" : ""} available for charter.`,
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function YachtCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const cat = yachtCategories.find((c) => c.slug === category);

  if (!cat || cat.slug === "tous") {
    notFound();
  }

  const yachtList = yachts.filter((y) => y.categorySlug === category);
  const resolvedCategory = { name: tData(cat.name, locale as Locale), slug: cat.slug };

  return <YachtCategoryClient category={resolvedCategory} yachtList={yachtList} />;
}
