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
    default: "Skyseaker — Private Jet Charter | Luxury Business Aviation",
    template: "%s | Skyseaker — Private Aviation",
  },
  description:
    "Skyseaker, your luxury private aviation partner. Private jet charter, empty legs, concierge services and exclusive experiences. Available 24/7 with over 8,500 aircraft.",
  keywords: [
    "private jet",
    "private jet charter",
    "private aviation",
    "charter",
    "aircraft charter",
    "private flight",
    "empty leg",
    "empty leg flights",
    "luxury private jet",
  ],
  metadataBase: new URL("https://skyseaker.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skyseaker.com",
    siteName: "Skyseaker",
    title: "Skyseaker — Private Jet Charter | Luxury Business Aviation",
    description:
      "Your luxury private aviation partner. Over 8,500 certified aircraft. Available 24/7.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Skyseaker Private Aviation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyseaker — Private Jet Charter",
    description: "Luxury private aviation. 8,500+ aircraft. Available 24/7.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skyseaker.com",
    languages: {
      "en-US": "https://skyseaker.com/en",
      "fr-FR": "https://skyseaker.com/fr",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              description: "Private jet charter and luxury business aviation",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-1-00-00-00-00",
                contactType: "customer service",
                availableLanguage: ["English", "French"],
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
