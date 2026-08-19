import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ateliê Gorete Bordados | Toalhas, Necessaires & Enxovais Personalizados",
  description:
    "Catálogo e ateliê de bordados computadorizados e artesanais de alta precisão. Toalhas bordadas sob medida, necessaires estruturadas e enxovais infantis.",
  keywords: [
    "bordados personalizados",
    "toalhas bordadas",
    "necessaire personalizada",
    "enxoval de bebê",
    "Gorete Bordados",
    "bordado computadorizado",
    "monogramas de luxo",
    "toalhas de pastores",
  ],
  authors: [{ name: "Ateliê Gorete Bordados" }],
  openGraph: {
    title: "Ateliê Gorete Bordados | Arte, Elegância & Personalização",
    description: "Transformando fios e tecidos nobres em peças com afeto e exclusividade.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#8d7966",
  width: "device-width",
  initialScale: 1,
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
      </head>
      <body className="font-sans antialiased selection:bg-[#8d7966]/20 selection:text-[#231e1a]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
