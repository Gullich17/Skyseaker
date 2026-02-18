'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  image: string;
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
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
  },
  {
    slug: 'guide-choisir-jet-prive',
    title: 'Guide complet\u00a0: comment choisir son jet priv\u00e9',
    excerpt:
      'Light jet, midsize, heavy jet\u2026 Tous les crit\u00e8res pour s\u00e9lectionner l\u2019appareil id\u00e9al selon votre trajet, votre budget et vos besoins.',
    category: 'Guides',
    date: '8 F\u00e9v 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=75',
  },
  {
    slug: 'empty-legs-guide-complet',
    title: 'Empty legs\u00a0: tout ce qu\u2019il faut savoir pour voyager malin',
    excerpt:
      'Les vols \u00e0 vide repr\u00e9sentent une opportunit\u00e9 unique de voyager en jet priv\u00e9 \u00e0 prix r\u00e9duit. Voici comment en profiter.',
    category: 'Guides',
    date: '3 F\u00e9v 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=75',
  },
  {
    slug: 'monaco-grand-prix-2026',
    title: 'Grand Prix de Monaco 2026\u00a0: votre guide VIP en jet priv\u00e9',
    excerpt:
      'Tout ce qu\u2019il faut savoir pour vivre le Grand Prix de Monaco depuis les paddocks, avec un vol priv\u00e9 et un acc\u00e8s exclusif.',
    category: '\u00c9v\u00e9nements',
    date: '28 Jan 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?w=600&q=75',
  },
  {
    slug: 'tendances-aviation-privee-2026',
    title: 'Les tendances de l\u2019aviation priv\u00e9e en 2026',
    excerpt:
      'Durabilit\u00e9, digitalisation, nouvelles routes\u2026 Les grandes tendances qui fa\u00e7onnent l\u2019avenir de l\u2019aviation d\u2019affaires.',
    category: 'Actualit\u00e9s',
    date: '20 Jan 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=75',
  },
  {
    slug: 'retraite-wellness-ibiza',
    title: 'Ibiza autrement\u00a0: retraite wellness en jet priv\u00e9',
    excerpt:
      'Loin de l\u2019image festive, Ibiza se r\u00e9v\u00e8le comme une destination bien-\u00eatre d\u2019exception. D\u00e9couvrez notre exp\u00e9rience exclusive.',
    category: 'Lifestyle',
    date: '15 Jan 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=75',
  },
  {
    slug: 'courchevel-saison-ski-2026',
    title: 'Courchevel 2026\u00a0: la saison ski en jet priv\u00e9 + h\u00e9licopt\u00e8re',
    excerpt:
      'De l\u2019a\u00e9roport directement aux pistes\u00a0: notre guide pour une saison de ski inoubliable dans les Alpes fran\u00e7aises.',
    category: 'Destinations',
    date: '8 Jan 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=75',
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
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fleet/falcon-8x/main.png"
          alt="Aviation priv\u00e9e"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(14,32,45,0.85) 0%, rgba(19,42,58,0.75) 40%, rgba(18,40,56,0.8) 60%, rgba(14,32,45,0.9) 100%)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 right-0"
          style={{
            height: '1px',
            opacity: 0.05,
            background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to top, rgba(14,32,45,0.8) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)',
        }}
      />

      <div
        className="relative text-center"
        style={{
          zIndex: 10,
          padding: '128px 5vw 64px 5vw',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            marginBottom: '24px',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 500,
            color: '#F4DDC3',
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
          style={{
            fontSize: 'clamp(36px, 5vw, 68px)',
            marginBottom: '24px',
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}
        >
          Actualités et inspirations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: '#A0A0A0',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Guides, tendances et récits de voyage pour les passionnés d&apos;aviation privée
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
          className="overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            background: '#132A3A',
            border: '1px solid #1A3448',
          }}
        >
          <style>{`@media(min-width:1024px){.featured-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
          {/* Image */}
          <div
            className="featured-grid-img relative overflow-hidden"
            style={{ aspectRatio: '16/9', minHeight: '320px' }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
              className="group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(244,221,195,0.05)', transitionDuration: '500ms' }}
            />
          </div>

          {/* Content */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: 'clamp(32px, 4vw, 48px)' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Badge>{article.category}</Badge>
            </div>
            <h2
              className="group-hover:text-[#F4DDC3] transition-colors"
              style={{
                fontSize: 'clamp(26px, 3vw, 32px)',
                marginBottom: '16px',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.3,
                transitionDuration: '300ms',
              }}
            >
              {article.title}
            </h2>
            <p
              style={{
                fontSize: '15px',
                marginBottom: '24px',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                color: '#A0A0A0',
                lineHeight: 1.7,
              }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center" style={{ gap: '16px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: '#6B6B6B',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                }}
              >
                {article.date}
              </span>
              <span style={{ width: '1px', height: '12px', background: '#1A3448' }} />
              <span
                style={{
                  fontSize: '12px',
                  color: '#6B6B6B',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                }}
              >
                {article.readTime} de lecture
              </span>
            </div>
            <span
              style={{
                display: 'block',
                marginTop: '24px',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#F4DDC3',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 500,
              }}
            >
              Lire l&apos;article &rarr;
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
        <div className="card-luxury overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
              className="group-hover:scale-105"
            />
            <div
              className="absolute top-3 left-3"
              style={{ zIndex: 10 }}
            >
              <Badge>{article.category}</Badge>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(244,221,195,0.05)', transitionDuration: '500ms' }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col" style={{ padding: '24px' }}>
            <h3
              className="group-hover:text-[#F4DDC3] transition-colors line-clamp-2"
              style={{
                fontSize: '18px',
                marginBottom: '12px',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.4,
                transitionDuration: '300ms',
              }}
            >
              {article.title}
            </h3>
            <p
              className="flex-1 line-clamp-2"
              style={{
                fontSize: '14px',
                marginBottom: '16px',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                color: '#A0A0A0',
                lineHeight: 1.7,
              }}
            >
              {article.excerpt}
            </p>
            <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: '#6B6B6B',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                }}
              >
                {article.date}
              </span>
              <span style={{ width: '1px', height: '12px', background: '#1A3448' }} />
              <span
                style={{
                  fontSize: '12px',
                  color: '#6B6B6B',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                }}
              >
                {article.readTime} de lecture
              </span>
            </div>
            <span
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#F4DDC3',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 500,
              }}
            >
              Lire l&apos;article &rarr;
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
    <section className="section-padding" style={{ background: '#0E202D' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        {/* Filters and search */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
          style={{ gap: '24px', marginBottom: '48px' }}
        >
          {/* Category tabs */}
          <div
            className="flex flex-wrap"
            style={{ gap: 0, borderBottom: '1px solid rgba(244,221,195,0.15)', width: '100%', maxWidth: '100%' }}
          >
            <style>{`@media(min-width:1024px){.blog-tabs-wrap{width:auto !important;}}`}</style>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative whitespace-nowrap transition-all"
                style={{
                  padding: '12px 16px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  color: activeCategory === cat ? '#F4DDC3' : '#6B6B6B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transitionDuration: '300ms',
                }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="blogActiveTab"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: '2px', background: '#F4DDC3' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative" style={{ width: '100%', maxWidth: '300px' }}>
            <svg
              className="absolute"
              style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
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
              style={{
                width: '100%',
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                background: 'transparent',
                border: '1px solid #1A3448',
                color: '#FFFFFF',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Featured article */}
        {featuredArticle && activeCategory === 'Tous' && searchQuery === '' && (
          <div style={{ marginBottom: '48px' }}>
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Articles grid */}
        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: '24px' }}
          >
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p
              style={{
                fontSize: '16px',
                color: '#6B6B6B',
                marginBottom: '16px',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
              }}
            >
              Aucun article trouv\u00e9 pour cette recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tous');
                setSearchQuery('');
              }}
              className="transition-colors"
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#F4DDC3',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 500,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              R\u00e9initialiser les filtres
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div style={{ marginTop: '80px' }}>
          <ScrollReveal>
            <div
              style={{
                padding: 'clamp(32px, 4vw, 48px)',
                textAlign: 'center',
                background: '#132A3A',
                border: '1px solid #1A3448',
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Restez inspir\u00e9
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  marginBottom: '32px',
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: '#A0A0A0',
                  maxWidth: '500px',
                  margin: '0 auto 32px auto',
                }}
              >
                Recevez nos derni\u00e8res actualit\u00e9s, guides exclusifs et offres sp\u00e9ciales directement dans votre bo\u00eete mail
              </p>
              <div
                className="flex flex-col sm:flex-row items-center justify-center"
                style={{ gap: '12px', maxWidth: '500px', margin: '0 auto' }}
              >
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'transparent',
                    border: '1px solid #1A3448',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 300,
                    outline: 'none',
                  }}
                />
                <Button variant="primary" size="sm">
                  S&apos;inscrire
                </Button>
              </div>
              <p
                style={{
                  marginTop: '16px',
                  fontSize: '11px',
                  color: '#6B6B6B',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                }}
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
