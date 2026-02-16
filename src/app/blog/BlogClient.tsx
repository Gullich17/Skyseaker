'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

/* ============================================
   DATA
   ============================================ */

type Category = 'Tous' | 'Destinations' | 'Guides' | 'Actualit\u00e9s' | 'Lifestyle' | '\u00c9v\u00e9nements';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, 'Tous'>;
  date: string;
  readTime: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    slug: 'top-destinations-2026',
    title: 'Les 10 destinations les plus pris\u00e9es en jet priv\u00e9 en 2026',
    excerpt:
      'De Monaco \u00e0 Duba\u00ef, d\u00e9couvrez les destinations qui s\u00e9duisent le plus nos clients cette ann\u00e9e et les tendances \u00e9mergentes du voyage priv\u00e9.',
    category: 'Destinations',
    date: '12 F\u00e9v 2026',
    readTime: '5 min',
    featured: true,
  },
  {
    slug: 'guide-choisir-jet-prive',
    title: 'Guide complet\u00a0: comment choisir son jet priv\u00e9',
    excerpt:
      'Light jet, midsize, heavy jet\u2026 Tous les crit\u00e8res pour s\u00e9lectionner l\u2019appareil id\u00e9al selon votre trajet, votre budget et vos besoins.',
    category: 'Guides',
    date: '8 F\u00e9v 2026',
    readTime: '8 min',
  },
  {
    slug: 'empty-legs-guide-complet',
    title: 'Empty legs\u00a0: tout ce qu\u2019il faut savoir pour voyager malin',
    excerpt:
      'Les vols \u00e0 vide repr\u00e9sentent une opportunit\u00e9 unique de voyager en jet priv\u00e9 \u00e0 prix r\u00e9duit. Voici comment en profiter.',
    category: 'Guides',
    date: '3 F\u00e9v 2026',
    readTime: '6 min',
  },
  {
    slug: 'monaco-grand-prix-2026',
    title: 'Grand Prix de Monaco 2026\u00a0: votre guide VIP en jet priv\u00e9',
    excerpt:
      'Tout ce qu\u2019il faut savoir pour vivre le Grand Prix de Monaco depuis les paddocks, avec un vol priv\u00e9 et un acc\u00e8s exclusif.',
    category: '\u00c9v\u00e9nements',
    date: '28 Jan 2026',
    readTime: '7 min',
  },
  {
    slug: 'tendances-aviation-privee-2026',
    title: 'Les tendances de l\u2019aviation priv\u00e9e en 2026',
    excerpt:
      'Durabilit\u00e9, digitalisation, nouvelles routes\u2026 Les grandes tendances qui fa\u00e7onnent l\u2019avenir de l\u2019aviation d\u2019affaires.',
    category: 'Actualit\u00e9s',
    date: '20 Jan 2026',
    readTime: '5 min',
  },
  {
    slug: 'retraite-wellness-ibiza',
    title: 'Ibiza autrement\u00a0: retraite wellness en jet priv\u00e9',
    excerpt:
      'Loin de l\u2019image festive, Ibiza se r\u00e9v\u00e8le comme une destination bien-\u00eatre d\u2019exception. D\u00e9couvrez notre exp\u00e9rience exclusive.',
    category: 'Lifestyle',
    date: '15 Jan 2026',
    readTime: '4 min',
  },
  {
    slug: 'courchevel-saison-ski-2026',
    title: 'Courchevel 2026\u00a0: la saison ski en jet priv\u00e9 + h\u00e9licopt\u00e8re',
    excerpt:
      'De l\u2019a\u00e9roport directement aux pistes\u00a0: notre guide pour une saison de ski inoubliable dans les Alpes fran\u00e7aises.',
    category: 'Destinations',
    date: '8 Jan 2026',
    readTime: '6 min',
  },
];

const categories: Category[] = [
  'Tous',
  'Destinations',
  'Guides',
  'Actualit\u00e9s',
  'Lifestyle',
  '\u00c9v\u00e9nements',
];

/* ============================================
   HERO
   ============================================ */

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1510 60%, #0A0A0A 100%)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.05]"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-[5vw] pt-32 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[12px] uppercase tracking-[0.3em] mb-6"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 500,
            color: '#C9A96E',
          }}
        >
          Journal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[36px] md:text-[56px] lg:text-[68px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#F5F5F0',
            lineHeight: 1.1,
          }}
        >
          Actualit\u00e9s et inspirations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[18px] md:text-[22px]"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Guides, tendances et r\u00e9cits de voyage pour les passionn\u00e9s d&apos;aviation priv\u00e9e
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
   FEATURED ARTICLE
   ============================================ */

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <ScrollReveal>
      <Link href={`/blog/${article.slug}`} className="block group">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{ background: '#141414', border: '1px solid #1E1E1E' }}
        >
          {/* Image placeholder */}
          <div
            className="relative aspect-[16/9] lg:aspect-auto overflow-hidden"
            style={{ background: '#1E1E1E', minHeight: '320px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  className="opacity-20 mx-auto mb-2"
                >
                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z" />
                </svg>
                <span
                  className="text-[11px] text-[#6B6B6B] uppercase tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}
                >
                  [BLOG-{article.slug}]
                </span>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'rgba(201,169,110,0.05)' }}
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-4">
              <Badge>{article.category}</Badge>
            </div>
            <h2
              className="text-[26px] md:text-[32px] mb-4 group-hover:text-[#C9A96E] transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 600,
                color: '#F5F5F0',
                lineHeight: 1.3,
              }}
            >
              {article.title}
            </h2>
            <p
              className="text-[15px] mb-6"
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                color: '#A0A0A0',
                lineHeight: 1.7,
              }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <span
                className="text-[12px] text-[#6B6B6B]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              >
                {article.date}
              </span>
              <span className="w-[1px] h-3 bg-[#1E1E1E]" />
              <span
                className="text-[12px] text-[#6B6B6B]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              >
                {article.readTime} de lecture
              </span>
            </div>
            <span
              className="block mt-6 text-[12px] uppercase tracking-[0.15em] text-[#C9A96E]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
            >
              Lire l&apos;article \u2192
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   ARTICLE CARD
   ============================================ */

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/blog/${article.slug}`} className="block group h-full">
        <div
          className="card-luxury overflow-hidden h-full flex flex-col"
        >
          {/* Image placeholder */}
          <div
            className="aspect-[16/9] relative overflow-hidden"
            style={{ background: '#1E1E1E' }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[#6B6B6B] text-xs">
              [BLOG-{article.slug}]
            </div>
            <div className="absolute top-3 left-3 z-10">
              <Badge>{article.category}</Badge>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'rgba(201,169,110,0.05)' }}
            />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3
              className="text-[18px] mb-3 group-hover:text-[#C9A96E] transition-colors duration-300 line-clamp-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 600,
                color: '#F5F5F0',
                lineHeight: 1.4,
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-[14px] mb-4 flex-1 line-clamp-2"
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                color: '#A0A0A0',
                lineHeight: 1.7,
              }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[12px] text-[#6B6B6B]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              >
                {article.date}
              </span>
              <span className="w-[1px] h-3 bg-[#1E1E1E]" />
              <span
                className="text-[12px] text-[#6B6B6B]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              >
                {article.readTime} de lecture
              </span>
            </div>
            <span
              className="text-[12px] uppercase tracking-[0.15em] text-[#C9A96E]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
            >
              Lire l&apos;article \u2192
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ============================================
   ARTICLES SECTION
   ============================================ */

function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  const filteredArticles = useMemo(() => {
    return otherArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'Tous' || article.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, otherArticles]);

  return (
    <section className="section-padding" style={{ background: '#0A0A0A' }}>
      <div className="px-[5vw]" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Filters and search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-0 border-b w-full lg:w-auto" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-3 text-[12px] uppercase tracking-[0.12em] transition-all duration-300 relative whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  color: activeCategory === cat ? '#C9A96E' : '#6B6B6B',
                }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="blogActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: '#C9A96E' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-[300px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              fill="none"
              stroke="#6B6B6B"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[14px] bg-transparent border text-[#F5F5F0]"
              style={{
                borderColor: '#1E1E1E',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
              }}
            />
          </div>
        </div>

        {/* Featured article */}
        {featuredArticle && activeCategory === 'Tous' && searchQuery === '' && (
          <div className="mb-12">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Articles grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p
              className="text-[16px] text-[#6B6B6B] mb-4"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
            >
              Aucun article trouv\u00e9 pour cette recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tous');
                setSearchQuery('');
              }}
              className="text-[12px] uppercase tracking-[0.15em] text-[#C9A96E] hover:text-[#D4B978] transition-colors"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
            >
              R\u00e9initialiser les filtres
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20">
          <ScrollReveal>
            <div
              className="p-8 md:p-12 text-center"
              style={{ background: '#141414', border: '1px solid #1E1E1E' }}
            >
              <h3
                className="text-[24px] md:text-[32px] mb-4"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  color: '#F5F5F0',
                }}
              >
                Restez inspir\u00e9
              </h3>
              <p
                className="text-[16px] mb-8"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: '#A0A0A0',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}
              >
                Recevez nos derni\u00e8res actualit\u00e9s, guides exclusifs et offres sp\u00e9ciales directement dans votre bo\u00eete mail
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 text-[14px] bg-transparent border text-[#F5F5F0]"
                  style={{
                    borderColor: '#1E1E1E',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                  }}
                />
                <Button variant="primary" size="sm">
                  S&apos;inscrire
                </Button>
              </div>
              <p
                className="mt-4 text-[11px] text-[#6B6B6B]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              >
                Pas de spam. D\u00e9sinscription en un clic.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PAGE CLIENT
   ============================================ */

export default function BlogClient() {
  return (
    <>
      <HeroSection />
      <ArticlesSection />
    </>
  );
}
