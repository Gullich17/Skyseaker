import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'News, guides and inspiration about private aviation. Discover our articles on destinations, lifestyle and private jet travel trends.',
  openGraph: {
    title: 'Journal | Skyseaker',
    description:
      'News and inspiration from luxury private aviation. Destinations, practical guides and lifestyle.',
    url: 'https://skyseaker.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
