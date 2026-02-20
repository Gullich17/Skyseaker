import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empty Leg Flights',
  description:
    'Take advantage of our empty leg flights to travel by private jet at reduced rates, up to -75% off. Real-time offers, personalized alerts.',
  openGraph: {
    title: 'Empty Leg Flights | Skyseaker Private Aviation',
    description:
      'Up to -75% off your private jet with empty legs. View our real-time offers.',
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
