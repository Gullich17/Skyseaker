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

  if (!cat) return { title: "Catégorie non trouvée" };

  const count = yachts.filter((y) => y.categorySlug === category).length;

  return {
    title: `${cat.name} — Location yacht de luxe | Skyseaker`,
    description: `Découvrez notre sélection de ${count} ${cat.name.toLowerCase()}${count > 1 ? "s" : ""} disponibles à la location. Caractéristiques, équipages et réservation.`,
    openGraph: {
      title: `${cat.name} | Yachts Skyseaker`,
      description: `${count} ${cat.name.toLowerCase()} disponible${count > 1 ? "s" : ""} à la location.`,
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
