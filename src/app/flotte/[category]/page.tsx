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

  if (!cat) return { title: "Category Not Found" };

  const count = fleet.filter((a) => a.categorySlug === category).length;

  return {
    title: `${cat.name} — Private Jet Charter | Skyseaker`,
    description: `Discover our selection of ${count} ${cat.name.toLowerCase()} available for charter. Rates, specifications, and online booking.`,
    openGraph: {
      title: `${cat.name} | Skyseaker Fleet`,
      description: `${count} ${cat.name.toLowerCase()} available for charter.`,
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
