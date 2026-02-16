import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Actualit\u00e9s, guides et inspirations autour de l\u2019aviation priv\u00e9e. D\u00e9couvrez nos articles sur les destinations, le lifestyle et les tendances du voyage en jet priv\u00e9.',
  openGraph: {
    title: 'Journal | Skyseaker',
    description:
      'Actualit\u00e9s et inspirations de l\u2019aviation priv\u00e9e de luxe. Destinations, guides pratiques et lifestyle.',
    url: 'https://skyseaker.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
