import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleet, categories } from "@/data/fleet";
import AircraftPageClient from "./AircraftPageClient";

/* ============================================
   STATIC PARAMS
   ============================================ */
export function generateStaticParams() {
  return fleet.map((aircraft) => ({
    category: aircraft.categorySlug,
    aircraft: aircraft.id,
  }));
}

/* ============================================
   METADATA
   ============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; aircraft: string }>;
}): Promise<Metadata> {
  const { category, aircraft: aircraftId } = await params;
  const aircraft = fleet.find(
    (a) => a.id === aircraftId && a.categorySlug === category
  );

  if (!aircraft) {
    return {
      title: "Aircraft Not Found",
    };
  }

  return {
    title: `${aircraft.name} — ${aircraft.category} | Private Jet Charter`,
    description: aircraft.description,
    openGraph: {
      title: `${aircraft.name} — ${aircraft.category} | Skyseaker`,
      description: aircraft.description,
      images: [{ url: aircraft.image, width: 1200, height: 630 }],
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function AircraftPage({
  params,
}: {
  params: Promise<{ category: string; aircraft: string }>;
}) {
  const { category, aircraft: aircraftId } = await params;
  const aircraft = fleet.find(
    (a) => a.id === aircraftId && a.categorySlug === category
  );

  if (!aircraft) {
    notFound();
  }

  // Find similar aircraft (same category, different aircraft)
  const similarAircraft = fleet
    .filter((a) => a.categorySlug === aircraft.categorySlug && a.id !== aircraft.id)
    .slice(0, 3);

  // If not enough in same category, add from adjacent categories
  if (similarAircraft.length < 3) {
    const catIndex = categories.findIndex(
      (c) => c.slug === aircraft.categorySlug
    );
    const additionalAircraft = fleet
      .filter(
        (a) =>
          a.id !== aircraft.id &&
          !similarAircraft.find((s) => s.id === a.id) &&
          (a.categorySlug === categories[catIndex - 1]?.slug ||
            a.categorySlug === categories[catIndex + 1]?.slug)
      )
      .slice(0, 3 - similarAircraft.length);
    similarAircraft.push(...additionalAircraft);
  }

  return (
    <AircraftPageClient aircraft={aircraft} similarAircraft={similarAircraft} />
  );
}
