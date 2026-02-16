import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vols a Vide — Empty Legs',
  description:
    'Profitez de nos vols a vide (empty legs) pour voyager en jet prive a tarif reduit, jusqu\'a -75%. Offres en temps reel, alertes personnalisees.',
  openGraph: {
    title: 'Vols a Vide — Empty Legs | Skyseaker Aviation Privee',
    description:
      'Jusqu\'a -75% sur votre jet prive grace aux empty legs. Consultez nos offres en temps reel.',
    url: 'https://skyseaker.com/empty-legs',
  },
  alternates: {
    canonical: 'https://skyseaker.com/empty-legs',
  },
};

export default function EmptyLegsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
