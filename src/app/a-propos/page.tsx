import type { Metadata } from 'next';
import AProposClient from './AProposClient';

export const metadata: Metadata = {
  title: '\u00c0 Propos',
  description:
    'D\u00e9couvrez Skyseaker, votre partenaire en aviation priv\u00e9e de luxe. Notre histoire, nos valeurs, notre \u00e9quipe et notre engagement pour l\u2019excellence.',
  openGraph: {
    title: '\u00c0 Propos | Skyseaker',
    description:
      'L\u2019excellence depuis le premier jour. Plus de 15\u202f000 vols, 120\u202f000 passagers et un engagement in\u00e9branlable pour la qualit\u00e9.',
    url: 'https://skyseaker.com/a-propos',
  },
};

export default function AProposPage() {
  return <AProposClient />;
}
