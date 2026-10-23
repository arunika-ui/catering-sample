import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/images/hero.jpg", width: 2000, height: 1333, alt: site.hero.alt }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.theme.ink,
  width: "device-width",
  initialScale: 1,
};

const themeVars = {
  "--ink": site.theme.ink,
  "--paper": site.theme.paper,
  "--paper-deep": site.theme.paperDeep,
  "--accent": site.theme.accent,
  "--accent-light": site.theme.accentLight,
} as CSSProperties;

// Hides animated elements before first paint (no flash), but only when the
// visitor hasn't asked for reduced motion. Falls back to visible after 2.5s.
const motionScript = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: site.name,
  description: site.seo.description,
  url: site.seo.url,
  telephone: site.phoneHref,
  email: site.email,
  servesCuisine: site.menus.map((m) => m.label),
  areaServed: site.areas.map((a) => ({ "@type": "City", name: a })),
  address: { "@type": "PostalAddress", streetAddress: site.address.join(", "), addressCountry: "IN" },
  ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" style={themeVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
