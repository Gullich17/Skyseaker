import type { Metadata } from 'next';
import ExperiencesClient from './ExperiencesClient';

export const metadata: Metadata = {
  title: 'Exclusive Experiences',
  description:
    'Discover our exclusive packages combining private jet flights and luxury experiences: gastronomy, ski, Grand Prix, wellness, safari, yacht, golf and Fashion Week.',
  openGraph: {
    title: 'Exclusive Experiences | Skyseaker',
    description:
      'Unique experiences combining private aviation and luxury: Michelin-starred dining, heli-skiing, F1 VIP, wellness retreats and much more.',
    url: 'https://skyseaker.com/experiences',
  },
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
