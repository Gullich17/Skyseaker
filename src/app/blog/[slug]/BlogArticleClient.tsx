'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { ArticleData } from './page';

/* ============================================
   HERO
   ============================================ */

function ArticleHero({ article }: { article: ArticleData }) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: '#1A3448' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[12px] text-[#6B6B6B] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}
            >
              {article.heroImage}
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.5) 40%, rgba(14,32,45,0.3) 100%)',
        }}
      />

      <div className="relative z-10 w-full px-[5vw] pb-16 pt-40" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="mb-4"
        >
          <Badge>{article.category}</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="text-[32px] md:text-[48px] lg:text-[56px] mb-6"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
          }}
        >
          {article.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-3">
            {/* Author avatar placeholder */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: '#132A3A', border: '1px solid #1A3448' }}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#F4DDC3"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[13px]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 500,
                  color: '#FFFFFF',
                }}
              >
                {article.author.name}
              </p>
              <p
                className="text-[11px]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                  color: '#6B6B6B',
                }}
              >
                {article.author.role}
              </p>
            </div>
          </div>
          <span className="w-[1px] h-4 bg-[#1A3448]" />
          <span
            className="text-[13px] text-[#A0A0A0]"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
          >
            {article.date}
          </span>
          <span className="w-[1px] h-4 bg-[#1A3448]" />
          <span
            className="text-[13px] text-[#A0A0A0]"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
          >
            {article.readTime} de lecture
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   TABLE OF CONTENTS (Sticky Sidebar)
   ============================================ */

function TableOfContents({
  sections,
  activeSection,
}: {
  sections: ArticleData['sections'];
  activeSection: string;
}) {
  return (
    <nav className="hidden lg:block sticky top-32 self-start">
      <p
        className="text-[11px] uppercase tracking-[0.2em] mb-4"
        style={{
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 600,
          color: '#F4DDC3',
        }}
      >
        Sommaire
      </p>
      <div className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-[13px] py-1 transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: activeSection === section.id ? 500 : 300,
              color: activeSection === section.id ? '#F4DDC3' : '#6B6B6B',
              borderLeft:
                activeSection === section.id
                  ? '2px solid #F4DDC3'
                  : '2px solid transparent',
              paddingLeft: '12px',
            }}
          >
            {section.title}
          </a>
        ))}
      </div>

      {/* Social share */}
      <div
        className="mt-10 pt-8"
        style={{ borderTop: '1px solid #1A3448' }}
      >
        <p
          className="text-[11px] uppercase tracking-[0.2em] mb-4"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 600,
            color: '#F4DDC3',
          }}
        >
          Partager
        </p>
        <div className="flex gap-3">
          <ShareButton label="LinkedIn" icon="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
          <ShareButton label="Twitter" icon="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          <ShareButton label="Email" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <ShareButton label="Copier" icon="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </div>
      </div>
    </nav>
  );
}

function ShareButton({ label, icon }: { label: string; icon: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 flex items-center justify-center"
      style={{
        background: 'rgba(244,221,195,0.05)',
        border: '1px solid rgba(244,221,195,0.2)',
      }}
      title={label}
    >
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="#F4DDC3"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </motion.button>
  );
}

/* ============================================
   ARTICLE BODY
   ============================================ */

function ArticleBody({ article }: { article: ArticleData }) {
  const [activeSection, setActiveSection] = useState(
    article.sections[0]?.id || ''
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    article.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article.sections]);

  return (
    <section className="section-padding" style={{ background: '#0E202D' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
          {/* Sidebar */}
          <TableOfContents
            sections={article.sections}
            activeSection={activeSection}
          />

          {/* Article content */}
          <div className="max-w-[740px]">
            {article.sections.map((section, sIdx) => (
              <div key={section.id} id={section.id} className="mb-16 scroll-mt-32">
                <ScrollReveal>
                  <h2
                    className="text-[24px] md:text-[32px] mb-6"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: 1.3,
                    }}
                  >
                    {section.title}
                  </h2>
                </ScrollReveal>

                {section.content.map((paragraph, pIdx) => (
                  <ScrollReveal key={pIdx} delay={0.05 * pIdx}>
                    <p
                      className="text-[16px] mb-6"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                        color: '#A0A0A0',
                        lineHeight: 1.8,
                      }}
                    >
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}

                {section.quote && (
                  <ScrollReveal delay={0.15}>
                    <blockquote
                      className="my-8 pl-6 py-4"
                      style={{
                        borderLeft: '2px solid #F4DDC3',
                        background: 'rgba(244,221,195,0.03)',
                      }}
                    >
                      <p
                        className="text-[18px] md:text-[20px]"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontStyle: 'italic',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          lineHeight: 1.6,
                        }}
                      >
                        &laquo;&nbsp;{section.quote}&nbsp;&raquo;
                      </p>
                    </blockquote>
                  </ScrollReveal>
                )}

                {sIdx < article.sections.length - 1 && (
                  <div
                    className="w-12 h-[1px] my-12"
                    style={{ background: 'rgba(244,221,195,0.2)' }}
                  />
                )}
              </div>
            ))}

            {/* Mobile share buttons */}
            <div className="lg:hidden mt-8 mb-12">
              <p
                className="text-[11px] uppercase tracking-[0.2em] mb-4"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  color: '#F4DDC3',
                }}
              >
                Partager cet article
              </p>
              <div className="flex gap-3">
                <ShareButton label="LinkedIn" icon="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                <ShareButton label="Twitter" icon="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                <ShareButton label="Email" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                <ShareButton label="Copier" icon="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   RELATED ARTICLES
   ============================================ */

function RelatedArticles({
  articles,
}: {
  articles: ArticleData[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: '#132A3A' }}>
      <div className="px-[5vw]" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          className="text-[28px] md:text-[36px] mb-12 text-center"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Articles similaires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${article.slug}`}
                className="block group"
              >
                <div className="card-luxury overflow-hidden">
                  {/* Image placeholder */}
                  <div
                    className="aspect-[16/9] relative"
                    style={{ background: '#1A3448' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#6B6B6B] text-xs">
                      {article.heroImage}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge>{article.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-[18px] mb-3 group-hover:text-[#F4DDC3] transition-colors"
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h3>
                    <div
                      className="flex items-center gap-3 text-[12px] text-[#6B6B6B]"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                      }}
                    >
                      <span>{article.date}</span>
                      <span className="w-[1px] h-3 bg-[#1A3448]" />
                      <span>{article.readTime} de lecture</span>
                    </div>
                    <span
                      className="block mt-4 text-[12px] uppercase tracking-[0.15em] text-[#F4DDC3]"
                      style={{
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
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   NEWSLETTER CTA
   ============================================ */

function NewsletterCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0E202D 0%, #122838 50%, #0E202D 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(244,221,195,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="relative px-[5vw] text-center" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2
            className="text-[28px] md:text-[36px] mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Ne manquez rien
          </h2>
          <p
            className="text-[16px] mb-8"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#A0A0A0',
            }}
          >
            Inscrivez-vous \u00e0 notre newsletter pour recevoir nos derniers articles,
            guides et offres exclusives
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="w-full sm:flex-1 px-4 py-3 text-[14px] bg-transparent border text-[#FFFFFF]"
              style={{
                borderColor: '#1A3448',
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
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
            }}
          >
            Pas de spam. D\u00e9sinscription en un clic.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   PAGE CLIENT
   ============================================ */

export default function BlogArticleClient({
  article,
  relatedArticles,
}: {
  article: ArticleData;
  relatedArticles: ArticleData[];
}) {
  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <RelatedArticles articles={relatedArticles} />
      <NewsletterCTA />
    </>
  );
}
