import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/sora";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { company } from "@/data/company";

const title = `${company.brandName} | IT Training Institute in ${company.location.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: title,
    template: `%s | ${company.brandName}`,
  },
  description: company.introduction,
  applicationName: company.brandName,
  openGraph: {
    type: "website",
    siteName: company.brandName,
    title,
    description: company.introduction,
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title,
    description: company.introduction,
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf5",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: company.brandName,
  legalName: company.legalName,
  description: company.introduction,
  slogan: company.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.location.city,
    addressRegion: company.location.state,
    addressCountry: "IN",
  },
};

/** Without JavaScript, animated content must still be visible. */
const noScriptCss = `[data-reveal]{opacity:1!important;transform:none!important}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptCss }} />
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="btn btn-navy btn-sm sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
