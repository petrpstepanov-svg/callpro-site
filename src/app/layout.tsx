import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { config } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
  keywords: [...config.seoKeywords],
  authors: [{ name: config.company }],
  creator: config.company,
  publisher: config.company,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  category: "business",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: config.seoTitle,
    description: config.seoDescription,
    url: "/",
    siteName: config.company,
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: config.seoTitle,
    description: config.seoDescription,
  },
  other: {
    "yandex-verification": "code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: config.company,
  telephone: config.phoneRaw,
  email: config.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: config.city,
    streetAddress: config.address,
    addressRegion: config.region,
    addressCountry: "RU",
  },
  openingHours: "Mo-Fr 09:00-19:00",
  description: config.seoDescription,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(config.socialProof.rating),
    reviewCount: String(config.socialProof.reviewCount),
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: config.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
