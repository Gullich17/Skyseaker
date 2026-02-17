'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { ArticleData } from './page';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ============================================
   HERO
   ============================================ */

function ArticleHero({ article }: { article: ArticleData }) {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      <div className="absolute inset-0">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to top, rgba(14,32,45,0.95) 0%, rgba(14,32,45,0.5) 40%, rgba(14,32,45,0.3) 100%)',
        }}
      />

      <div
        className="relative"
        style={{
          zIndex: 10,
          width: '100%',
          padding: '160px 5vw 64px 5vw',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ marginBottom: '16px' }}
        >
          <Badge>{article.category}</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            fontSize: 'clamp(32px, 5vw, 56px)',
            marginBottom: '24px',
          }}
        >
          {article.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="flex flex-wrap items-center"
          style={{ gap: '16px' }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            {/* Author avatar placeholder */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#132A3A',
                border: '1px solid #1A3448',
              }}
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
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  fontSize: '13px',
                }}
              >
                {article.author.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                  color: '#6B6B6B',
                  fontSize: '11px',
                }}
              >
                {article.author.role}
              </p>
            </div>
          </div>
          <span
            style={{
              width: '1px',
              height: '16px',
              background: '#1A3448',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              color: '#A0A0A0',
              fontSize: '13px',
            }}
          >
            {article.date}
          </span>
          <span
            style={{
              width: '1px',
              height: '16px',
              background: '#1A3448',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              color: '#A0A0A0',
              fontSize: '13px',
            }}
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
    <>
      <style>{`@media(max-width:1023px){.toc-sidebar{display:none !important;}}`}</style>
      <nav
        className="toc-sidebar sticky"
        style={{ top: '128px', alignSelf: 'flex-start' }}
      >
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '16px',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 600,
            color: '#F4DDC3',
          }}
        >
          Sommaire
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block transition-colors"
              style={{
                fontSize: '13px',
                padding: '4px 0',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: activeSection === section.id ? 500 : 300,
                color: activeSection === section.id ? '#F4DDC3' : '#6B6B6B',
                borderLeft:
                  activeSection === section.id
                    ? '2px solid #F4DDC3'
                    : '2px solid transparent',
                paddingLeft: '12px',
                transitionDuration: '300ms',
              }}
            >
              {section.title}
            </a>
          ))}
        </div>

        {/* Social share */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '1px solid #1A3448',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '16px',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              color: '#F4DDC3',
            }}
          >
            Partager
          </p>
          <div className="flex" style={{ gap: '12px' }}>
            <ShareButton label="LinkedIn" icon="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
            <ShareButton label="Twitter" icon="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            <ShareButton label="Email" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            <ShareButton label="Copier" icon="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </div>
        </div>
      </nav>
    </>
  );
}

function ShareButton({ label, icon }: { label: string; icon: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center"
      style={{
        width: '40px',
        height: '40px',
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
      <style>{`
        @media(min-width:1024px){.article-grid{grid-template-columns:250px 1fr !important;}}
        @media(max-width:1023px){.mobile-share{display:block !important;}}
        @media(min-width:1024px){.mobile-share{display:none !important;}}
      `}</style>
      <div style={{ padding: '0 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <div
          className="grid article-grid"
          style={{
            gridTemplateColumns: '1fr',
            gap: '48px',
          }}
        >
          {/* Sidebar */}
          <TableOfContents
            sections={article.sections}
            activeSection={activeSection}
          />

          {/* Article content */}
          <div style={{ maxWidth: '740px' }}>
            {article.sections.map((section, sIdx) => (
              <div
                key={section.id}
                id={section.id}
                style={{ marginBottom: '64px', scrollMarginTop: '128px' }}
              >
                <ScrollReveal>
                  <h2
                    style={{
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      marginBottom: '24px',
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
                      style={{
                        fontSize: '16px',
                        marginBottom: '24px',
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
                      style={{
                        margin: '32px 0',
                        paddingLeft: '24px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        borderLeft: '2px solid #F4DDC3',
                        background: 'rgba(244,221,195,0.03)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 'clamp(18px, 2vw, 20px)',
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
                    style={{
                      width: '48px',
                      height: '1px',
                      margin: '48px 0',
                      background: 'rgba(244,221,195,0.2)',
                    }}
                  />
                )}
              </div>
            ))}

            {/* Mobile share buttons */}
            <div
              className="mobile-share"
              style={{ display: 'none', marginTop: '32px', marginBottom: '48px' }}
            >
              <p
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  color: '#F4DDC3',
                }}
              >
                Partager cet article
              </p>
              <div className="flex" style={{ gap: '12px' }}>
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
      <div style={{ padding: '0 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            marginBottom: '48px',
            textAlign: 'center',
            fontFamily: 'var(--font-playfair)',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Articles similaires
        </h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
          }}
        >
          {articles.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${article.slug}`}
                className="block group"
              >
                <div className="card-luxury overflow-hidden">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute"
                      style={{ top: '12px', left: '12px' }}
                    >
                      <Badge>{article.category}</Badge>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3
                      className="group-hover:text-[#F4DDC3] transition-colors"
                      style={{
                        fontSize: '18px',
                        marginBottom: '12px',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h3>
                    <div
                      className="flex items-center"
                      style={{
                        gap: '12px',
                        fontSize: '12px',
                        color: '#6B6B6B',
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 300,
                      }}
                    >
                      <span>{article.date}</span>
                      <span
                        style={{
                          width: '1px',
                          height: '12px',
                          background: '#1A3448',
                          display: 'inline-block',
                        }}
                      />
                      <span>{article.readTime} de lecture</span>
                    </div>
                    <span
                      className="block"
                      style={{
                        marginTop: '16px',
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
    <section
      className="relative overflow-hidden"
      style={{ padding: 'clamp(60px, 8vw, 120px) 0' }}
    >
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
      <div
        className="relative"
        style={{
          padding: '0 5vw',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              marginBottom: '16px',
              fontFamily: 'var(--font-playfair)',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Ne manquez rien
          </h2>
          <p
            style={{
              fontSize: '16px',
              marginBottom: '32px',
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#A0A0A0',
            }}
          >
            Inscrivez-vous {'\u00e0'} notre newsletter pour recevoir nos derniers articles,
            guides et offres exclusives
          </p>
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px' }}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              style={{
                width: '100%',
                flex: '1 1 240px',
                padding: '12px 16px',
                fontSize: '14px',
                background: 'transparent',
                border: '1px solid #1A3448',
                color: '#FFFFFF',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
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
            Pas de spam. D{'\u00e9'}sinscription en un clic.
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
