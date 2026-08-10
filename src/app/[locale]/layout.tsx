import type { Metadata } from "next";
import localFont from "next/font/local";
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

const outfit = localFont({
  src: "../../fonts/outfit-variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "../../fonts/outfit-variable.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: "../../fonts/source-code-pro-variable.woff2",
  weight: "200 900",
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const descriptions = {
  en: "ZENIZZ is a premium barbershop in Istanbul. Precision cuts, calm rituals, and a chair experience built around craft, not speed.",
  tr: "ZENIZZ, İstanbul'da premium bir berber. Hassas kesimler, sakin ritüeller ve hız değil ustalık üzerine kurulu bir koltuk deneyimi.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const t = await getTranslations({ locale, namespace: "pages.home" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} | ${t("title")}`,
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
      title: `${siteConfig.name} | ${t("title")}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${t("title")}`,
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
      <body className={`${outfit.variable} ${sans.variable} ${mono.variable} antialiased`}>
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
