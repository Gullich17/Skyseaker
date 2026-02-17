import type { Metadata } from 'next';
import ExperiencesClient from './ExperiencesClient';

export const metadata: Metadata = {
  title: 'Expériences Exclusives',
  description:
    'Découvrez nos packages exclusifs alliant vol en jet privé et expériences de luxe : gastronomie, ski, Grand Prix, wellness, safari, yacht, golf et Fashion Week.',
  openGraph: {
    title: 'Expériences Exclusives | Skyseaker',
    description:
      'Des expériences uniques combinant aviation privée et luxe : gastronomie étoilée, ski hélico, F1 VIP, retraites bien-être et bien plus.',
    url: 'https://skyseaker.com/experiences',
  },
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
