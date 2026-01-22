import { FC, PropsWithChildren } from "react";
import { Comfortaa, Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Shailash Bhati | Développeur Frontend",
    template: "%s | Shailash Bhati",
  },
  description: "Portfolio de Shailash Bhati, développeur frontend spécialisé en React, Next.js, TypeScript et design moderne. Découvrez mes projets et compétences.",
  keywords: ["développeur frontend", "React", "Next.js", "TypeScript", "portfolio", "développeur web", "frontend developer"],
  authors: [{ name: "Shailash Bhati" }],
  creator: "Shailash Bhati",
  publisher: "Shailash Bhati",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shailashbhati.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Shailash Bhati | Développeur Frontend",
    description: "Portfolio de Shailash Bhati, développeur frontend spécialisé en React, Next.js, TypeScript et design moderne.",
    siteName: "Shailash Bhati Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shailash Bhati - Développeur Frontend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shailash Bhati | Développeur Frontend",
    description: "Portfolio de Shailash Bhati, développeur frontend spécialisé en React, Next.js, TypeScript et design moderne.",
    images: ["/og-image.png"],
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
  verification: {
    // Ajoutez vos clés de vérification si nécessaire
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

const comfortaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shailash Bhati",
    jobTitle: "Développeur Frontend",
    description: "Développeur frontend spécialisé en React, Next.js, TypeScript et design moderne",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://shailashbhati.com",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Development",
      "Frontend Development",
    ],
  };

  return (
    <html lang="fr" className={`${comfortaa.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
