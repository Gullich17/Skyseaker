import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service non trouvé',
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} — Skyseaker Aviation Privée`,
      description: service.shortDescription,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
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
