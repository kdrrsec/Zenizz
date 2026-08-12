import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/about",
      languages: { en: "/about", tr: "/tr/about" },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-20 md:py-28">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5 space-y-6 text-lg leading-relaxed text-muted">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <Button href="/book">{t("bookAppointment")}</Button>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <ImageReveal
                src={images.about}
                alt={t("aboutAlt")}
                className="aspect-[3/4] sm:translate-y-10"
                imgClassName="object-[center_25%]"
                parallax
              />
              <ImageReveal
                src={images.aboutSecondary}
                alt={t("aboutSecondaryAlt")}
                className="aspect-[3/4]"
                imgClassName="object-[center_15%]"
                parallax
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
