import type { Metadata } from 'next';
import ExperiencesClient from './ExperiencesClient';

export const metadata: Metadata = {
  title: 'Experiences Exclusives',
  description:
    'Decouvrez nos packages exclusifs alliant vol en jet prive et experiences de luxe : gastronomie, ski, Grand Prix, wellness, safari, yacht, golf et Fashion Week.',
  openGraph: {
    title: 'Experiences Exclusives | Skyseaker',
    description:
      'Des experiences uniques combinant aviation privee et luxe : gastronomie etoilee, ski helico, F1 VIP, retraites bien-etre et bien plus.',
    url: 'https://skyseaker.com/experiences',
  },
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
