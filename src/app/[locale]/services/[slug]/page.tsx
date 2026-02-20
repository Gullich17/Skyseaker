import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { t as tData } from '@/lib/i18n-data';
import type { Locale } from '@/i18n/routing';
import ServiceDetailClient from './ServiceDetailClient';

/* ============================================
   STATIC PARAMS
   ============================================ */
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/* ============================================
   METADATA
   ============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: tData(service.title, loc),
    description: tData(service.shortDescription, loc),
    openGraph: {
      title: `${tData(service.title, loc)} — Skyseaker Private Aviation`,
      description: tData(service.shortDescription, loc),
      url: `https://skyseaker.com/services/${service.slug}`,
    },
    alternates: {
      canonical: `https://skyseaker.com/services/${service.slug}`,
    },
  };
}

/* ============================================
   PAGE (SERVER COMPONENT)
   ============================================ */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* FAQPage JSON-LD */}
      {service.faq && service.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: service.faq.map((item) => ({
                '@type': 'Question',
                name: tData(item.question, loc),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: tData(item.answer, loc),
                },
              })),
            }),
          }}
        />
      )}
      <ServiceDetailClient service={service} />
    </>
  );
}
