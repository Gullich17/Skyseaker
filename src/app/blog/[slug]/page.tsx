import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleClient from './BlogArticleClient';

/* ============================================
   ARTICLE DATA
   ============================================ */

export interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateISO: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  heroImage: string;
  sections: {
    id: string;
    title: string;
    content: string[];
    quote?: string;
  }[];
  relatedSlugs: string[];
}

const articlesData: Record<string, ArticleData> = {
  'top-destinations-2026': {
    slug: 'top-destinations-2026',
    title: 'The 10 most popular private jet destinations in 2026',
    excerpt:
      'From Monaco to Dubai, discover the destinations our clients love most this year and the emerging trends in private travel.',
    category: 'Destinations',
    date: '12 February 2026',
    dateISO: '2026-02-12',
    readTime: '5 min',
    author: { name: 'Nicolas Mercier', role: 'Sales Director' },
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          'The year 2026 marks a turning point in private aviation travel habits. Our clients are seeking destinations that combine luxury, exclusivity and authentic experiences.',
          'We analysed data from over 15,000 flights completed in the past twelve months to establish this ranking of the most in-demand private jet destinations.',
        ],
      },
      {
        id: 'monaco',
        title: 'Monaco, the unrivalled',
        content: [
          'Unsurprisingly, the Principality of Monaco retains its top spot. Between the Grand Prix, the Yacht Show and a vibrant nightlife, Monaco attracts a demanding international clientele all year round.',
          'Nice C\u00f4te d\'Azur Airport, just 20 minutes by helicopter, provides quick and discreet access to the Principality.',
        ],
        quote:
          'Monaco remains the number one destination for our clients, with an 18% increase in bookings this year.',
      },
      {
        id: 'dubai',
        title: 'Dubai, luxury without limits',
        content: [
          'Dubai continues to attract with its world-class infrastructure, iconic hotels and an expanding gastronomic scene. The city has established itself as an essential private aviation hub in the Middle East.',
          'The private terminal at Al Maktoum offers a VIP experience from start to finish, from arrival to luxury vehicle transfers.',
        ],
      },
      {
        id: 'mykonos',
        title: 'Mykonos and the Greek islands',
        content: [
          'The Greek islands are experiencing a spectacular resurgence of interest. Mykonos, Santorini and now Paros attract clients seeking sunshine, Mediterranean gastronomy and relaxation.',
          'Mykonos Airport now accepts midsize aircraft, making direct flights from Paris, Geneva or London much easier.',
        ],
      },
      {
        id: 'tendances',
        title: 'Emerging trends',
        content: [
          'Beyond the classics, we are seeing strong growth in demand for Japan, Norway and Rwanda. These destinations offer unique experiences and meet our clients\' quest for authenticity.',
          'Space tourism and Arctic destinations are also beginning to generate interest, foreshadowing the journeys of tomorrow.',
        ],
        quote:
          'Emerging destinations now account for 25% of our bookings, compared to just 12% three years ago.',
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'empty-legs-guide-complet', 'courchevel-saison-ski-2026'],
  },
  'guide-choisir-jet-prive': {
    slug: 'guide-choisir-jet-prive',
    title: 'Complete guide: how to choose your private jet',
    excerpt:
      'Light jet, midsize, heavy jet... All the criteria for selecting the ideal aircraft based on your route, budget and needs.',
    category: 'Guides',
    date: '8 February 2026',
    dateISO: '2026-02-08',
    readTime: '8 min',
    author: { name: 'Camille Laurent', role: 'Director of Operations' },
    heroImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          'Choosing the right private jet can seem daunting given the variety of aircraft available on the market. This guide walks you through the process step by step to identify the perfect aircraft for your needs.',
          'Flight distance, number of passengers, budget and comfort level are all essential criteria to consider before booking.',
        ],
      },
      {
        id: 'categories',
        title: 'Aircraft categories',
        content: [
          'Private aviation comes in several categories, from the Very Light Jet for short trips to the Heavy Jet for intercontinental flights. Each category offers a different balance between range, capacity and comfort.',
          'Light Jets (4-7 passengers) are ideal for European trips under 3 hours. Midsize Jets (7-9 passengers) offer an excellent compromise for flights of 3 to 5 hours. Heavy Jets (10-16 passengers) are perfect for long-haul travel with maximum comfort.',
        ],
        quote:
          'The choice of aircraft accounts for 60% of overall satisfaction with a private flight.',
      },
      {
        id: 'budget',
        title: 'Understanding costs',
        content: [
          'The price of a private jet flight depends on many factors: aircraft type, distance, ground time, airport taxes and additional services.',
          'At Skyseaker, we provide detailed and transparent quotes for every flight, with no hidden fees. Our empty legs also offer opportunities to travel at reduced rates.',
        ],
      },
      {
        id: 'conseils',
        title: 'Our expert advice',
        content: [
          'Book in advance to get the best rates and the widest choice of aircraft. Don\'t hesitate to ask our experts for advice: every flight is unique and deserves particular attention.',
          'Also consider ancillary services: catering, ground transfers and concierge can transform a simple flight into an unforgettable experience.',
        ],
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'empty-legs-guide-complet', 'tendances-aviation-privee-2026'],
  },
  'empty-legs-guide-complet': {
    slug: 'empty-legs-guide-complet',
    title: 'Empty legs: everything you need to know to fly smart',
    excerpt:
      'Empty leg flights are a unique opportunity to travel by private jet at a reduced price. Here is how to take advantage of them.',
    category: 'Guides',
    date: '3 February 2026',
    dateISO: '2026-02-03',
    readTime: '6 min',
    author: { name: 'Nicolas Mercier', role: 'Sales Director' },
    heroImage: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'What is an empty leg?',
        content: [
          'An empty leg is a repositioning flight operated by a private jet without passengers. These flights occur when an aircraft needs to travel to an airport to pick up passengers or return to its base.',
          'These flights represent an exceptional opportunity to travel by private jet at reduced rates of up to 75% off compared to a standard flight.',
        ],
      },
      {
        id: 'avantages',
        title: 'The advantages of empty legs',
        content: [
          'The main advantage is of course the price: substantial savings for the same level of comfort and service. You benefit from the same aircraft, the same crew and the same amenities.',
          'It is also a more responsible approach: by filling a flight that would take place anyway, you optimise the use of resources and reduce the environmental impact per passenger.',
        ],
        quote:
          'Our empty leg clients save an average of 45% on the price of a standard flight.',
      },
      {
        id: 'conseils',
        title: 'How to take advantage',
        content: [
          'The key to taking advantage of empty legs is flexibility. These offers are often available at short notice and on specific routes. Sign up for our alerts to be notified of opportunities in real time.',
          'Check our dedicated empty legs page regularly and don\'t hesitate to contact our advisors to find out about real-time availability.',
        ],
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'top-destinations-2026', 'tendances-aviation-privee-2026'],
  },
  'monaco-grand-prix-2026': {
    slug: 'monaco-grand-prix-2026',
    title: 'Monaco Grand Prix 2026: your VIP guide by private jet',
    excerpt:
      'Everything you need to know to experience the Monaco Grand Prix from the paddocks, with a private flight and exclusive access.',
    category: 'Events',
    date: '28 January 2026',
    dateISO: '2026-01-28',
    readTime: '7 min',
    author: { name: 'Sophie Archambault', role: 'Head of Concierge' },
    heroImage: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'The Grand Prix like never before',
        content: [
          'The Monaco Grand Prix remains the most prestigious event on the Formula 1 calendar. In 2026, the race promises even greater thrills with the new technical regulations.',
          'At Skyseaker, we have designed a complete package to experience this event in the best conditions: private flight, helicopter transfer, paddock access and luxury accommodation.',
        ],
      },
      {
        id: 'logistique',
        title: 'Weekend logistics',
        content: [
          'Nice Airport is extremely busy during Grand Prix weekend. Booking your slot in advance is essential to ensure a smooth arrival and departure.',
          'Our team handles all logistics: airport slot, helicopter transfer to Monaco, chauffeured vehicle on-site and personalised assistance.',
        ],
        quote:
          'On Grand Prix weekend, we operate over 50 flights to Nice and Cannes.',
      },
      {
        id: 'experiences',
        title: 'Exclusive experiences',
        content: [
          'Beyond the race, the Monaco Grand Prix is a major social event. Private parties, Michelin-starred dinners on yachts and access to the most exclusive terraces complete the experience.',
          'Our concierge team orchestrates every detail to make your weekend absolutely perfect, from arrival to departure.',
        ],
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'guide-choisir-jet-prive', 'retraite-wellness-ibiza'],
  },
  'tendances-aviation-privee-2026': {
    slug: 'tendances-aviation-privee-2026',
    title: 'Private aviation trends in 2026',
    excerpt:
      'Sustainability, digitalisation, new routes... The major trends shaping the future of business aviation.',
    category: 'News',
    date: '20 January 2026',
    dateISO: '2026-01-20',
    readTime: '5 min',
    author: { name: 'Alexandre Dubois', role: 'Founder & CEO' },
    heroImage: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'A sector in transformation',
        content: [
          'Private aviation is undergoing a profound transformation. Between environmental demands, service digitalisation and new client expectations, the sector is reinventing itself.',
          'Here are the major trends that will define business aviation in 2026 and beyond.',
        ],
      },
      {
        id: 'durabilite',
        title: 'Sustainability at the heart of concerns',
        content: [
          'Sustainable aviation fuel (SAF) is gradually becoming the standard. Operators are investing heavily in reducing their carbon footprint, and offset programmes are becoming systematic.',
          'The first prototypes of electric and hybrid aircraft for business aviation are in the testing phase, offering a glimpse of a greener future.',
        ],
        quote:
          'By 2030, 10% of private flights could use SAF exclusively.',
      },
      {
        id: 'digital',
        title: 'The digital revolution',
        content: [
          'Online booking and mobile applications are transforming the client experience. Artificial intelligence is optimising routes and anticipating passenger needs.',
          'At Skyseaker, we continuously invest in our platform to deliver a smooth and intuitive booking experience.',
        ],
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'empty-legs-guide-complet', 'top-destinations-2026'],
  },
  'retraite-wellness-ibiza': {
    slug: 'retraite-wellness-ibiza',
    title: 'Ibiza redefined: wellness retreat by private jet',
    excerpt:
      'Far from its party image, Ibiza reveals itself as an exceptional wellness destination. Discover our exclusive experience.',
    category: 'Lifestyle',
    date: '15 January 2026',
    dateISO: '2026-01-15',
    readTime: '4 min',
    author: { name: 'Sophie Archambault', role: 'Head of Concierge' },
    heroImage: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Ibiza, the island of wellness',
        content: [
          'Beyond its party reputation, Ibiza has a more serene and spiritual side. The island has become a destination of choice for high-end wellness retreats.',
          'Our Wellness package combines a private jet flight and an exclusive retreat at one of the island\'s most beautiful properties.',
        ],
      },
      {
        id: 'programme',
        title: 'The retreat programme',
        content: [
          'Sunrise yoga facing the Mediterranean, guided meditation sessions, personalised spa treatments and holistic cuisine prepared by a private chef.',
          'Each day is orchestrated to offer the perfect balance between activity, relaxation and discovery of the island.',
        ],
        quote:
          'Our wellness clients report a significant improvement in their well-being after just 4 days of retreat.',
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'monaco-grand-prix-2026', 'courchevel-saison-ski-2026'],
  },
  'courchevel-saison-ski-2026': {
    slug: 'courchevel-saison-ski-2026',
    title: 'Courchevel 2026: the ski season by private jet + helicopter',
    excerpt:
      'From the airport straight to the slopes: our guide to an unforgettable ski season in the French Alps.',
    category: 'Destinations',
    date: '8 January 2026',
    dateISO: '2026-01-08',
    readTime: '6 min',
    author: { name: 'Camille Laurent', role: 'Director of Operations' },
    heroImage: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Courchevel, the pinnacle of luxury',
        content: [
          'Courchevel remains the most exclusive ski resort in the world. Its unique altiport in France allows direct helicopter access from the main regional airports.',
          'Our Ski package combines a private jet flight to Geneva, Lyon or Chamb\u00e9ry, then a direct helicopter transfer to the Courchevel altiport.',
        ],
      },
      {
        id: 'logistique',
        title: 'The flight and transfer',
        content: [
          'We operate daily flights to Alpine airports throughout the season. The 20-minute helicopter transfer offers a spectacular view of the Vanoise massif.',
          'Your luggage and ski equipment are handled from start to finish. Upon arrival, a private vehicle takes you directly to your accommodation.',
        ],
        quote:
          'In less than 3 hours, you go from your home to the slopes of Courchevel.',
      },
      {
        id: 'saison',
        title: 'Season highlights',
        content: [
          'The 2025-2026 season promises to be exceptional with record snowfall. Key events include the Alpine Ski World Cup and the Snow Polo World Cup.',
          'Our concierge can arrange private ski instructors, reservations at the best mountain restaurants and access to the resort\'s most exclusive evening events.',
        ],
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'guide-choisir-jet-prive', 'retraite-wellness-ibiza'],
  },
};

/* ============================================
   STATIC PARAMS
   ============================================ */

export function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

/* ============================================
   METADATA
   ============================================ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    return { title: 'Article not found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Skyseaker`,
      description: article.excerpt,
      url: `https://skyseaker.com/blog/${slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

/* ============================================
   PAGE
   ============================================ */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedSlugs
    .map((s) => articlesData[s])
    .filter(Boolean)
    .slice(0, 3);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Skyseaker',
      url: 'https://skyseaker.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skyseaker.com/images/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://skyseaker.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
