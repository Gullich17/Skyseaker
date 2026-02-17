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
    title: 'Les 10 destinations les plus pris\u00e9es en jet priv\u00e9 en 2026',
    excerpt:
      'De Monaco \u00e0 Duba\u00ef, d\u00e9couvrez les destinations qui s\u00e9duisent le plus nos clients cette ann\u00e9e et les tendances \u00e9mergentes du voyage priv\u00e9.',
    category: 'Destinations',
    date: '12 F\u00e9vrier 2026',
    dateISO: '2026-02-12',
    readTime: '5 min',
    author: { name: 'Nicolas Mercier', role: 'Directeur Commercial' },
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          'L\u2019ann\u00e9e 2026 marque un tournant dans les habitudes de voyage en aviation priv\u00e9e. Nos clients recherchent des destinations alliant luxe, exclusivit\u00e9 et exp\u00e9riences authentiques.',
          'Nous avons analys\u00e9 les donn\u00e9es de plus de 15\u202f000 vols r\u00e9alis\u00e9s ces douze derniers mois pour \u00e9tablir ce classement des destinations les plus demand\u00e9es en jet priv\u00e9.',
        ],
      },
      {
        id: 'monaco',
        title: 'Monaco, l\u2019ind\u00e9tr\u00f4nable',
        content: [
          'Sans surprise, la Principaut\u00e9 de Monaco conserve sa premi\u00e8re place. Entre le Grand Prix, le Yacht Show et une vie nocturne effervescente, Monaco attire une client\u00e8le internationale exigeante tout au long de l\u2019ann\u00e9e.',
          'L\u2019a\u00e9roport de Nice C\u00f4te d\u2019Azur, \u00e0 seulement 20 minutes en h\u00e9licopt\u00e8re, offre un acc\u00e8s rapide et discret \u00e0 la Principaut\u00e9.',
        ],
        quote:
          'Monaco reste la destination num\u00e9ro un pour nos clients, avec une croissance de 18\u00a0% des r\u00e9servations cette ann\u00e9e.',
      },
      {
        id: 'dubai',
        title: 'Duba\u00ef, le luxe sans limites',
        content: [
          'Duba\u00ef continue de s\u00e9duire avec ses infrastructures de classe mondiale, ses h\u00f4tels iconiques et une offre gastronomique en pleine expansion. La ville s\u2019est impos\u00e9e comme un hub incontournable de l\u2019aviation priv\u00e9e au Moyen-Orient.',
          'Le terminal priv\u00e9 d\u2019Al Maktoum offre une exp\u00e9rience VIP de bout en bout, du d\u00e9barquement aux transferts en v\u00e9hicule de luxe.',
        ],
      },
      {
        id: 'mykonos',
        title: 'Mykonos et les \u00eeles grecques',
        content: [
          'Les \u00eeles grecques connaissent un regain d\u2019int\u00e9r\u00eat spectaculaire. Mykonos, Santorin et d\u00e9sormais Paros attirent une client\u00e8le en qu\u00eate de soleil, de gastronomie m\u00e9diterran\u00e9enne et de d\u00e9tente.',
          'L\u2019a\u00e9roport de Mykonos accepte d\u00e9sormais les appareils midsize, facilitant les vols directs depuis Paris, Gen\u00e8ve ou Londres.',
        ],
      },
      {
        id: 'tendances',
        title: 'Les tendances \u00e9mergentes',
        content: [
          'Au-del\u00e0 des classiques, nous observons une forte croissance des demandes vers le Japon, la Norv\u00e8ge et le Rwanda. Ces destinations offrent des exp\u00e9riences uniques et r\u00e9pondent \u00e0 la qu\u00eate d\u2019authenticit\u00e9 de nos clients.',
          'Le tourisme spatial et les destinations arctiques commencent \u00e9galement \u00e0 susciter l\u2019int\u00e9r\u00eat, pr\u00e9figurant les voyages de demain.',
        ],
        quote:
          'Les destinations \u00e9mergentes repr\u00e9sentent d\u00e9sormais 25\u00a0% de nos r\u00e9servations, contre seulement 12\u00a0% il y a trois ans.',
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'empty-legs-guide-complet', 'courchevel-saison-ski-2026'],
  },
  'guide-choisir-jet-prive': {
    slug: 'guide-choisir-jet-prive',
    title: 'Guide complet\u00a0: comment choisir son jet priv\u00e9',
    excerpt:
      'Light jet, midsize, heavy jet\u2026 Tous les crit\u00e8res pour s\u00e9lectionner l\u2019appareil id\u00e9al selon votre trajet, votre budget et vos besoins.',
    category: 'Guides',
    date: '8 F\u00e9vrier 2026',
    dateISO: '2026-02-08',
    readTime: '8 min',
    author: { name: 'Camille Laurent', role: 'Directrice des Op\u00e9rations' },
    heroImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          'Choisir le bon jet priv\u00e9 peut sembler complexe face \u00e0 la diversit\u00e9 des appareils disponibles sur le march\u00e9. Ce guide vous accompagne pas \u00e0 pas pour identifier l\u2019appareil parfait selon vos besoins.',
          'Distance de vol, nombre de passagers, budget et niveau de confort sont autant de crit\u00e8res essentiels \u00e0 consid\u00e9rer avant de r\u00e9server.',
        ],
      },
      {
        id: 'categories',
        title: 'Les cat\u00e9gories d\u2019appareils',
        content: [
          'L\u2019aviation priv\u00e9e se d\u00e9cline en plusieurs cat\u00e9gories, du Very Light Jet pour les courts trajets au Heavy Jet pour les vols intercontinentaux. Chaque cat\u00e9gorie offre un \u00e9quilibre diff\u00e9rent entre autonomie, capacit\u00e9 et confort.',
          'Les Light Jets (4-7 passagers) sont id\u00e9aux pour les trajets europ\u00e9ens de moins de 3 heures. Les Midsize Jets (7-9 passagers) offrent un excellent compromis pour les vols de 3 \u00e0 5 heures. Les Heavy Jets (10-16 passagers) sont parfaits pour les longs courriers avec un confort maximal.',
        ],
        quote:
          'Le choix de l\u2019appareil repr\u00e9sente 60\u00a0% de la satisfaction globale d\u2019un vol priv\u00e9.',
      },
      {
        id: 'budget',
        title: 'Comprendre les co\u00fbts',
        content: [
          'Le prix d\u2019un vol en jet priv\u00e9 d\u00e9pend de nombreux facteurs\u00a0: type d\u2019appareil, distance, dur\u00e9e au sol, taxes a\u00e9roportuaires et services additionnels.',
          'Chez Skyseaker, nous proposons des devis d\u00e9taill\u00e9s et transparents pour chaque vol, sans frais cach\u00e9s. Nos empty legs offrent \u00e9galement des opportunit\u00e9s de voyager \u00e0 tarif r\u00e9duit.',
        ],
      },
      {
        id: 'conseils',
        title: 'Nos conseils d\u2019experts',
        content: [
          'R\u00e9servez \u00e0 l\u2019avance pour b\u00e9n\u00e9ficier des meilleurs tarifs et du plus grand choix d\u2019appareils. N\u2019h\u00e9sitez pas \u00e0 demander conseil \u00e0 nos experts\u00a0: chaque vol est unique et m\u00e9rite une attention particuli\u00e8re.',
          'Pensez \u00e9galement \u00e0 prendre en compte les services annexes\u00a0: catering, transferts terrestres et conciergerie peuvent transformer un simple vol en une exp\u00e9rience inoubliable.',
        ],
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'empty-legs-guide-complet', 'tendances-aviation-privee-2026'],
  },
  'empty-legs-guide-complet': {
    slug: 'empty-legs-guide-complet',
    title: 'Empty legs\u00a0: tout ce qu\u2019il faut savoir pour voyager malin',
    excerpt:
      'Les vols \u00e0 vide repr\u00e9sentent une opportunit\u00e9 unique de voyager en jet priv\u00e9 \u00e0 prix r\u00e9duit. Voici comment en profiter.',
    category: 'Guides',
    date: '3 F\u00e9vrier 2026',
    dateISO: '2026-02-03',
    readTime: '6 min',
    author: { name: 'Nicolas Mercier', role: 'Directeur Commercial' },
    heroImage: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Qu\u2019est-ce qu\u2019un empty leg\u00a0?',
        content: [
          'Un empty leg, ou vol \u00e0 vide, est un vol de repositionnement effectu\u00e9 par un jet priv\u00e9 sans passagers. Ces vols surviennent lorsqu\u2019un appareil doit se d\u00e9placer vers un a\u00e9roport pour r\u00e9cup\u00e9rer des passagers ou retourner \u00e0 sa base.',
          'Ces vols repr\u00e9sentent une opportunit\u00e9 exceptionnelle de voyager en jet priv\u00e9 \u00e0 des tarifs r\u00e9duits pouvant atteindre -75\u00a0% par rapport \u00e0 un vol classique.',
        ],
      },
      {
        id: 'avantages',
        title: 'Les avantages des empty legs',
        content: [
          'Le principal avantage est bien s\u00fbr le prix\u00a0: des \u00e9conomies substantielles pour le m\u00eame niveau de confort et de service. Vous b\u00e9n\u00e9ficiez du m\u00eame appareil, du m\u00eame \u00e9quipage et des m\u00eames prestations.',
          'C\u2019est \u00e9galement une d\u00e9marche plus responsable\u00a0: en occupant un vol qui aurait lieu de toute fa\u00e7on, vous optimisez l\u2019utilisation des ressources et r\u00e9duisez l\u2019impact environnemental par passager.',
        ],
        quote:
          'Nos clients empty legs \u00e9conomisent en moyenne 45\u00a0% sur le prix d\u2019un vol classique.',
      },
      {
        id: 'conseils',
        title: 'Comment en profiter',
        content: [
          'La cl\u00e9 pour profiter des empty legs est la flexibilit\u00e9. Ces offres sont souvent disponibles avec un pr\u00e9avis court et sur des itin\u00e9raires sp\u00e9cifiques. Inscrivez-vous \u00e0 nos alertes pour \u00eatre inform\u00e9 en temps r\u00e9el des opportunit\u00e9s.',
          'Consultez r\u00e9guli\u00e8rement notre page d\u00e9di\u00e9e aux empty legs et n\u2019h\u00e9sitez pas \u00e0 contacter nos conseillers pour conna\u00eetre les disponibilit\u00e9s en temps r\u00e9el.',
        ],
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'top-destinations-2026', 'tendances-aviation-privee-2026'],
  },
  'monaco-grand-prix-2026': {
    slug: 'monaco-grand-prix-2026',
    title: 'Grand Prix de Monaco 2026\u00a0: votre guide VIP en jet priv\u00e9',
    excerpt:
      'Tout ce qu\u2019il faut savoir pour vivre le Grand Prix de Monaco depuis les paddocks, avec un vol priv\u00e9 et un acc\u00e8s exclusif.',
    category: '\u00c9v\u00e9nements',
    date: '28 Janvier 2026',
    dateISO: '2026-01-28',
    readTime: '7 min',
    author: { name: 'Sophie Archambault', role: 'Responsable Conciergerie' },
    heroImage: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Le Grand Prix comme jamais',
        content: [
          'Le Grand Prix de Monaco reste l\u2019\u00e9v\u00e9nement le plus prestigieux du calendrier de Formule 1. En 2026, la course promet des sensations encore plus fortes avec les nouvelles r\u00e9glementations techniques.',
          'Chez Skyseaker, nous avons con\u00e7u un package complet pour vivre cette exp\u00e9rience dans les meilleures conditions\u00a0: vol priv\u00e9, transfert h\u00e9licopt\u00e8re, acc\u00e8s paddock et h\u00e9bergement de luxe.',
        ],
      },
      {
        id: 'logistique',
        title: 'La logistique du week-end',
        content: [
          'L\u2019a\u00e9roport de Nice est pris d\u2019assaut pendant le week-end du Grand Prix. R\u00e9server votre cr\u00e9neau \u00e0 l\u2019avance est essentiel pour garantir votre arriv\u00e9e et votre d\u00e9part sans encombre.',
          'Notre \u00e9quipe g\u00e8re l\u2019ensemble de la logistique\u00a0: cr\u00e9neau a\u00e9roportuaire, transfert h\u00e9licopt\u00e8re vers Monaco, v\u00e9hicule avec chauffeur sur place et accompagnement personnalis\u00e9.',
        ],
        quote:
          'Le week-end du Grand Prix, nous op\u00e9rons plus de 50 vols vers Nice et Cannes.',
      },
      {
        id: 'experiences',
        title: 'Les exp\u00e9riences exclusives',
        content: [
          'Au-del\u00e0 de la course, le Grand Prix de Monaco est un \u00e9v\u00e9nement social majeur. Soir\u00e9es priv\u00e9es, d\u00eeners \u00e9toil\u00e9s sur yacht et acc\u00e8s aux terrasses les plus exclusives compl\u00e8tent l\u2019exp\u00e9rience.',
          'Notre conciergerie orchestre chaque d\u00e9tail pour que votre week-end soit absolument parfait, de l\u2019arriv\u00e9e au d\u00e9part.',
        ],
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'guide-choisir-jet-prive', 'retraite-wellness-ibiza'],
  },
  'tendances-aviation-privee-2026': {
    slug: 'tendances-aviation-privee-2026',
    title: 'Les tendances de l\u2019aviation priv\u00e9e en 2026',
    excerpt:
      'Durabilit\u00e9, digitalisation, nouvelles routes\u2026 Les grandes tendances qui fa\u00e7onnent l\u2019avenir de l\u2019aviation d\u2019affaires.',
    category: 'Actualit\u00e9s',
    date: '20 Janvier 2026',
    dateISO: '2026-01-20',
    readTime: '5 min',
    author: { name: 'Alexandre Dubois', role: 'Fondateur & CEO' },
    heroImage: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Un secteur en pleine mutation',
        content: [
          'L\u2019aviation priv\u00e9e conna\u00eet une transformation profonde. Entre exigences environnementales, digitalisation des services et nouvelles attentes des clients, le secteur se r\u00e9invente.',
          'Voici les grandes tendances qui d\u00e9finiront l\u2019aviation d\u2019affaires en 2026 et au-del\u00e0.',
        ],
      },
      {
        id: 'durabilite',
        title: 'La durabilit\u00e9 au c\u0153ur des pr\u00e9occupations',
        content: [
          'Le carburant durable (SAF) s\u2019impose progressivement comme standard. Les op\u00e9rateurs investissent massivement dans la r\u00e9duction de leur empreinte carbone, et les programmes de compensation deviennent syst\u00e9matiques.',
          'Les premiers prototypes d\u2019avions \u00e9lectriques et hybrides pour l\u2019aviation d\u2019affaires sont en phase de test, laissant entrevoir un avenir plus vert.',
        ],
        quote:
          'D\u2019ici 2030, 10\u00a0% des vols priv\u00e9s pourraient utiliser exclusivement du SAF.',
      },
      {
        id: 'digital',
        title: 'La r\u00e9volution digitale',
        content: [
          'La r\u00e9servation en ligne et les applications mobiles transforment l\u2019exp\u00e9rience client. L\u2019intelligence artificielle optimise les itin\u00e9raires et anticipe les besoins des passagers.',
          'Chez Skyseaker, nous investissons continuellement dans notre plateforme pour offrir une exp\u00e9rience de r\u00e9servation fluide et intuitive.',
        ],
      },
    ],
    relatedSlugs: ['guide-choisir-jet-prive', 'empty-legs-guide-complet', 'top-destinations-2026'],
  },
  'retraite-wellness-ibiza': {
    slug: 'retraite-wellness-ibiza',
    title: 'Ibiza autrement\u00a0: retraite wellness en jet priv\u00e9',
    excerpt:
      'Loin de l\u2019image festive, Ibiza se r\u00e9v\u00e8le comme une destination bien-\u00eatre d\u2019exception. D\u00e9couvrez notre exp\u00e9rience exclusive.',
    category: 'Lifestyle',
    date: '15 Janvier 2026',
    dateISO: '2026-01-15',
    readTime: '4 min',
    author: { name: 'Sophie Archambault', role: 'Responsable Conciergerie' },
    heroImage: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Ibiza, \u00eele du bien-\u00eatre',
        content: [
          'Au-del\u00e0 de sa r\u00e9putation festive, Ibiza poss\u00e8de une facette plus sereine et spirituelle. L\u2019\u00eele est devenue une destination de choix pour les retraites bien-\u00eatre haut de gamme.',
          'Notre package Wellness combine vol en jet priv\u00e9 et retraite exclusive dans l\u2019une des plus belles propri\u00e9t\u00e9s de l\u2019\u00eele.',
        ],
      },
      {
        id: 'programme',
        title: 'Le programme de la retraite',
        content: [
          'Yoga au lever du soleil face \u00e0 la M\u00e9diterran\u00e9e, s\u00e9ances de m\u00e9ditation guid\u00e9e, soins spa personnalis\u00e9s et cuisine holistique compos\u00e9e par un chef priv\u00e9.',
          'Chaque journ\u00e9e est orchestr\u00e9e pour offrir un \u00e9quilibre parfait entre activit\u00e9, d\u00e9tente et d\u00e9couverte de l\u2019\u00eele.',
        ],
        quote:
          'Nos clients wellness rapportent une am\u00e9lioration significative de leur bien-\u00eatre apr\u00e8s seulement 4 jours de retraite.',
      },
    ],
    relatedSlugs: ['top-destinations-2026', 'monaco-grand-prix-2026', 'courchevel-saison-ski-2026'],
  },
  'courchevel-saison-ski-2026': {
    slug: 'courchevel-saison-ski-2026',
    title: 'Courchevel 2026\u00a0: la saison ski en jet priv\u00e9 + h\u00e9licopt\u00e8re',
    excerpt:
      'De l\u2019a\u00e9roport directement aux pistes\u00a0: notre guide pour une saison de ski inoubliable dans les Alpes fran\u00e7aises.',
    category: 'Destinations',
    date: '8 Janvier 2026',
    dateISO: '2026-01-08',
    readTime: '6 min',
    author: { name: 'Camille Laurent', role: 'Directrice des Op\u00e9rations' },
    heroImage: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80',
    sections: [
      {
        id: 'introduction',
        title: 'Courchevel, le sommet du luxe',
        content: [
          'Courchevel reste la station de ski la plus exclusive au monde. Son altiport unique en France permet un acc\u00e8s direct en h\u00e9licopt\u00e8re depuis les principaux a\u00e9roports de la r\u00e9gion.',
          'Notre package Ski combine vol en jet priv\u00e9 jusqu\u2019\u00e0 Gen\u00e8ve, Lyon ou Chamb\u00e9ry, puis transfert h\u00e9licopt\u00e8re direct vers l\u2019altiport de Courchevel.',
        ],
      },
      {
        id: 'logistique',
        title: 'Le vol et le transfert',
        content: [
          'Nous op\u00e9rons des vols quotidiens vers les a\u00e9roports alpins pendant toute la saison. Le transfert h\u00e9licopt\u00e8re de 20 minutes offre une vue spectaculaire sur le massif de la Vanoise.',
          'Vos bagages et \u00e9quipements de ski sont pris en charge de bout en bout. \u00c0 votre arriv\u00e9e, un v\u00e9hicule priv\u00e9 vous conduit directement \u00e0 votre h\u00e9bergement.',
        ],
        quote:
          'En moins de 3 heures, vous passez de votre domicile aux pistes de Courchevel.',
      },
      {
        id: 'saison',
        title: 'Les temps forts de la saison',
        content: [
          'La saison 2025-2026 promet d\u2019\u00eatre exceptionnelle avec un enneigement record. Les \u00e9v\u00e9nements phares incluent la Coupe du Monde de ski alpin et le Snow Polo World Cup.',
          'Notre conciergerie peut organiser moniteurs de ski priv\u00e9s, r\u00e9servations dans les meilleurs restaurants d\u2019altitude et acc\u00e8s aux soir\u00e9es les plus exclusives de la station.',
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
    return { title: 'Article non trouv\u00e9' };
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
