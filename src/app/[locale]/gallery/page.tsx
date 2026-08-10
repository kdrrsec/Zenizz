import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { BookingWidget } from "@/components/booking/BookingWidget";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.gallery" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/gallery",
      languages: { en: "/gallery", tr: "/tr/gallery" },
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.gallery");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-12 md:py-20">
        <GalleryGrid />
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget />
        </Container>
      </section>
    </>
  );
}
