import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import LoadingSplash from "./components/LoadingSplash";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: {
    default: "Nuverum Ventures",
    template: "%s | Nuverum Ventures"
  },
  description: "Bridging vision with opportunity. Strategic investment and venture capital solutions for innovative companies and entrepreneurs.",
  keywords: [
    "venture capital",
    "investment",
    "startup funding",
    "strategic investment",
    "business development",
    "entrepreneurship",
    "innovation",
    "growth capital"
  ],
  authors: [{ name: "Nuverum Ventures" }],
  creator: "Nuverum Ventures",
  publisher: "Nuverum Ventures",
  applicationName: "Nuverum Ventures",
  
  // Basic metadata
  metadataBase: new URL('https://nuverum-ventures.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  
  // OpenGraph metadata for social media
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nuverum-ventures.com',
    title: 'Nuverum Ventures - Bridging Vision with Opportunity',
    description: 'Strategic investment and venture capital solutions for innovative companies and entrepreneurs.',
    siteName: 'Nuverum Ventures',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nuverum Ventures - Strategic Investment Solutions',
      },
      {
        url: '/og-image-square.png',
        width: 600,
        height: 600,
        alt: 'Nuverum Ventures Logo',
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Nuverum Ventures - Bridging Vision with Opportunity',
    description: 'Strategic investment and venture capital solutions for innovative companies and entrepreneurs.',
    creator: '@nuverum_ventures',
    site: '@nuverum_ventures',
    images: ['/twitter-image.png'],
  },
  
  // Icons and manifest
  icons: {
    icon: [
      // Theme-aware SVG favicons (modern browsers)
      { 
        url: '/logos/SVG/favicon-light.svg', 
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)'
      },
      { 
        url: '/logos/SVG/favicon-dark.svg', 
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)'
      },
      // Fallback PNG favicons (using root for existing files)
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/manifest.json',
  
  // Additional metadata
  category: 'business',
  classification: 'Venture Capital & Investment',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (placeholders)
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
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
        {/* Additional meta tags for better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nuverum" />
        <meta name="application-name" content="Nuverum Ventures" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for common external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Theme-aware favicons for better browser support */}
        <link rel="icon" href="/logos/SVG/favicon-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logos/SVG/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      </head>
      <body className={`${roboto.variable} antialiased bg-background text-foreground`}>
        <LoadingSplash />
        <Navbar />
        <main className="bg-background">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
