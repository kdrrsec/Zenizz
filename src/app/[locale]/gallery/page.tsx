import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Button } from "@/components/ui/Button";

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
  const tNav = await getTranslations("nav");
  const tBooking = await getTranslations("booking");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-12 md:py-20">
        <GalleryGrid />
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <div className="flex flex-col items-start gap-6 border border-line bg-soft p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <p className="eyebrow mb-3">{tBooking("reservations")}</p>
              <h2 className="display text-3xl md:text-4xl">{tBooking("defaultTitle")}</h2>
              <p className="mt-3 max-w-md text-faded leading-relaxed">{tBooking("defaultDescription")}</p>
            </div>
            <Button href="/book" variant="primary">
              {tNav("bookAppointment")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
