import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidget from "@/components/layout/FloatingWidget";
import CookieBanner from "@/components/layout/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Skyseaker — Location de Jet Privé | Aviation d'Affaires de Luxe",
    template: "%s | Skyseaker — Aviation Privée",
  },
  description:
    "Skyseaker, votre partenaire en aviation privée de luxe. Affrètement de jet privé, vols à vide, conciergerie et expériences exclusives. Disponible 24/7 avec plus de 8 500 appareils.",
  keywords: [
    "jet privé",
    "location jet privé",
    "aviation privée",
    "affrètement",
    "charter avion",
    "vol privé",
    "empty leg",
    "vol à vide",
    "avion privé luxe",
  ],
  metadataBase: new URL("https://skyseaker.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://skyseaker.com",
    siteName: "Skyseaker",
    title: "Skyseaker — Location de Jet Privé | Aviation d'Affaires de Luxe",
    description:
      "Votre partenaire en aviation privée de luxe. Plus de 8 500 appareils certifiés. Disponible 24/7.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Skyseaker Aviation Privée" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyseaker — Location de Jet Privé",
    description: "Aviation privée de luxe. 8 500+ appareils. Disponible 24/7.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skyseaker.com",
    languages: {
      "fr-FR": "https://skyseaker.com/fr",
      "en-US": "https://skyseaker.com/en",
      "ar-SA": "https://skyseaker.com/ar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Skyseaker",
              url: "https://skyseaker.com",
              logo: "https://skyseaker.com/images/logo.svg",
              description: "Location de jet privé et aviation d'affaires de luxe",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-1-00-00-00-00",
                contactType: "customer service",
                availableLanguage: ["French", "English", "Arabic"],
                areaServed: "Worldwide",
              },
              sameAs: [
                "https://instagram.com/skyseaker",
                "https://linkedin.com/company/skyseaker",
                "https://facebook.com/skyseaker",
              ],
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} ${cormorant.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
