import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images, siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/Navbar";
import { QuickBookingFlow } from "@/components/booking/QuickBookingFlow";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.book" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/book",
      languages: { en: "/book", tr: "/tr/book" },
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line">
        <Container wide className="flex h-16 items-center justify-between">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="relative block h-7 w-[120px]">
            <Image src={images.logo} alt={siteConfig.name} fill sizes="120px" className="object-contain object-left" />
          </Link>
          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <Link href="/" className="underline-anim font-mono text-xs uppercase tracking-[0.1em]">
              {t("backToSite")}
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-1 py-10 md:py-14">
        <Container wide>
          <Suspense fallback={null}>
            <QuickBookingFlow />
          </Suspense>
        </Container>
      </main>

      <footer className="border-t border-line py-6">
        <Container wide className="flex flex-col items-center gap-1 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-faded">
            {siteConfig.name} — {siteConfig.address.city}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-faded">
            © {year} {siteConfig.name}
          </p>
        </Container>
      </footer>
    </div>
  );
}
