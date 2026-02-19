import { Metadata } from "next";
import { notFound } from "next/navigation";
import { yachts, yachtCategories } from "@/data/yachts";
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
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = yachtCategories.find((c) => c.slug === category);

  if (!cat) return { title: "Category not found" };

  const count = yachts.filter((y) => y.categorySlug === category).length;

  return {
    title: `${cat.name} — Luxury Yacht Charter | Skyseaker`,
    description: `Discover our selection of ${count} ${cat.name.toLowerCase()}${count > 1 ? "s" : ""} available for charter. Specifications, crew and booking.`,
    openGraph: {
      title: `${cat.name} | Skyseaker Yachts`,
      description: `${count} ${cat.name.toLowerCase()}${count > 1 ? "s" : ""} available for charter.`,
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function YachtCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = yachtCategories.find((c) => c.slug === category);

  if (!cat || cat.slug === "tous") {
    notFound();
  }

  const yachtList = yachts.filter((y) => y.categorySlug === category);

  return <YachtCategoryClient category={cat} yachtList={yachtList} />;
}
