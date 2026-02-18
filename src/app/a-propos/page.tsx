import type { Metadata } from 'next';
import AProposClient from './AProposClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover Skyseaker, your luxury private aviation partner. Our history, values, team and commitment to excellence.',
  openGraph: {
    title: 'About Us | Skyseaker',
    description:
      'Excellence from day one. Over 15,000 flights, 120,000 passengers and an unwavering commitment to quality.',
    url: 'https://skyseaker.com/a-propos',
  },
};

export default function AProposPage() {
  return <AProposClient />;
}
