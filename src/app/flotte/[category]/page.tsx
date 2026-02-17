import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleet, categories } from "@/data/fleet";
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
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat) return { title: "Catégorie non trouvée" };

  const count = fleet.filter((a) => a.categorySlug === category).length;

  return {
    title: `${cat.name} — Location jet privé | Skyseaker`,
    description: `Découvrez notre sélection de ${count} ${cat.name.toLowerCase()}${count > 1 ? "s" : ""} disponibles en location. Tarifs, caractéristiques et réservation en ligne.`,
    openGraph: {
      title: `${cat.name} | Flotte Skyseaker`,
      description: `${count} ${cat.name.toLowerCase()} disponible${count > 1 ? "s" : ""} à la location.`,
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
