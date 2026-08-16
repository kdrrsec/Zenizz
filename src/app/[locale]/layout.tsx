import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen, PageTransition } from "@/components/layout/LoadingScreen";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Fonts are self-hosted and wired up via @font-face rules in globals.css
// (with latin + latin-ext unicode-range subsets for correct Turkish glyphs),
// so the --font-display/--font-sans/--font-mono variables just need to be
// set to those font-family names here instead of using next/font.
const fontVariablesStyle = {
  "--font-display": "'Outfit', system-ui, sans-serif",
  "--font-sans": "'Inter', system-ui, sans-serif",
  "--font-mono": "'Source Code Pro Variable', ui-monospace, monospace",
} as React.CSSProperties;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const descriptions = {
  en: "ZENIZZ is a premium barbershop in Beşiktaş, Istanbul, offering precision haircuts, beard grooming, and kids cuts in a calm, detail focused atelier.",
  tr: "ZENIZZ, Beşiktaş, İstanbul'da hassas saç kesimi, sakal bakımı ve çocuk kesimi sunan, sakin ve detaylara önem veren premium bir berber atölyesi.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const t = await getTranslations({ locale, namespace: "pages.home" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${t("title")}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
      "barbershop Istanbul",
      "Beşiktaş barber",
      "modern barber",
      "fade",
      "hot towel shave",
      "ZENIZZ",
      "premium barbershop",
    ],
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        tr: "/tr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${t("title")}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${t("title")}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.name,
    description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postal,
      addressCountry: "TR",
    },
  };

  return (
    <html lang={locale}>
      <body style={fontVariablesStyle} className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
            >
              {locale === "tr" ? "İçeriğe git" : "Skip to content"}
            </a>
            <LoadingScreen />
            <Navbar />
            <PageTransition>
              <main id="main-content">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
