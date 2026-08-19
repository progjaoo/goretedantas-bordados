import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goretedantas-bordados.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ateliê Gorete Bordados | Toalhas, Necessaires & Enxovais Personalizados",
    template: "%s | Ateliê Gorete Bordados",
  },
  description:
    "Catálogo oficial do Ateliê Gorete Bordados em Volta Redonda - RJ. Bordados computadorizados de alta precisão: toalhas de banho e lavabo com monogramas, necessaires em couro sintético e enxovais de bebê. Entregas para todo o Brasil.",
  keywords: [
    "bordados personalizados",
    "Gorete Bordados",
    "Gorete Dantas Bordados",
    "bordados Volta Redonda",
    "toalhas bordadas",
    "monogramas de luxo",
    "necessaire personalizada",
    "enxoval de bebê bordado",
    "toalhas de casamento",
    "toalhas pastorais",
    "bordado computadorizado",
    "presentes personalizados artesanais",
  ],
  authors: [{ name: "Gorete Dantas", url: "https://www.instagram.com/goretedantasbordados/" }],
  creator: "Ateliê Gorete Bordados",
  publisher: "Ateliê Gorete Bordados",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Ateliê Gorete Bordados | Peças Exclusivas & Enxovais Personalizados",
    description:
      "Toalhas nobres com monogramas, necessaires estruturadas e enxovais afetivos. Bordados de alta precisão confeccionados sob medida em Volta Redonda - RJ.",
    url: siteUrl,
    siteName: "Ateliê Gorete Bordados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/portfolio/743992557_18383435056201125_2665605754153811949_n.jpg",
        width: 1200,
        height: 630,
        alt: "Ateliê Gorete Bordados - Toalhas e Necessaires Personalizadas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateliê Gorete Bordados | Bordados Personalizados de Afeto",
    description:
      "Peças artesanais sob medida em Volta Redonda - RJ: toalhas com monogramas, necessaires e enxovais infantis.",
    images: ["/images/portfolio/743992557_18383435056201125_2665605754153811949_n.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#8d7966",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Structured Data for LocalBusiness & Artisan Store
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ateliê Gorete Bordados",
  image: `${siteUrl}/images/portfolio/743992557_18383435056201125_2665605754153811949_n.jpg`,
  description:
    "Ateliê especializado em bordados computadorizados e artesanais de alta precisão: toalhas bordadas sob medida, monogramas de casamento, necessaires e enxovais de bebê.",
  telephone: "+55-24-99935-6139",
  url: siteUrl,
  sameAs: [
    "https://www.instagram.com/goretedantasbordados/",
    "https://wa.me/5524999356139",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Volta Redonda",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.5231,
    longitude: -44.1042,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data (JSON-LD) for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#8d7966]/20 selection:text-[#231e1a]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
