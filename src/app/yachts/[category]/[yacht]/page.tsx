import { Metadata } from "next";
import { notFound } from "next/navigation";
import { yachts, yachtCategories } from "@/data/yachts";
import YachtPageClient from "./YachtPageClient";

/* ============================================
   STATIC PARAMS
   ============================================ */
export function generateStaticParams() {
  return yachts.map((yacht) => ({
    category: yacht.categorySlug,
    yacht: yacht.id,
  }));
}

/* ============================================
   METADATA
   ============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; yacht: string }>;
}): Promise<Metadata> {
  const { category, yacht: yachtId } = await params;
  const yacht = yachts.find(
    (y) => y.id === yachtId && y.categorySlug === category
  );

  if (!yacht) {
    return { title: "Yacht not found" };
  }

  return {
    title: `${yacht.name} — ${yacht.category} | Luxury Yacht Charter`,
    description: yacht.description,
    openGraph: {
      title: `${yacht.name} — ${yacht.category} | Skyseaker`,
      description: yacht.description,
      images: [{ url: yacht.image, width: 1200, height: 630 }],
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function YachtPage({
  params,
}: {
  params: Promise<{ category: string; yacht: string }>;
}) {
  const { category, yacht: yachtId } = await params;
  const yacht = yachts.find(
    (y) => y.id === yachtId && y.categorySlug === category
  );

  if (!yacht) {
    notFound();
  }

  // Find similar yachts (same category, then adjacent)
  const similarYachts = yachts
    .filter((y) => y.categorySlug === yacht.categorySlug && y.id !== yacht.id)
    .slice(0, 3);

  if (similarYachts.length < 3) {
    const catIndex = yachtCategories.findIndex(
      (c) => c.slug === yacht.categorySlug
    );
    const additional = yachts
      .filter(
        (y) =>
          y.id !== yacht.id &&
          !similarYachts.find((s) => s.id === y.id) &&
          (y.categorySlug === yachtCategories[catIndex - 1]?.slug ||
            y.categorySlug === yachtCategories[catIndex + 1]?.slug)
      )
      .slice(0, 3 - similarYachts.length);
    similarYachts.push(...additional);
  }

  return <YachtPageClient yacht={yacht} similarYachts={similarYachts} />;
}
