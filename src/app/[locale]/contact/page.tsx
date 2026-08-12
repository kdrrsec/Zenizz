import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps?cid=7479869037686330595&output=embed";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/contact",
      languages: { en: "/contact", tr: "/tr/contact" },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const tDays = await getTranslations("days");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-10">
              <Reveal>
                <p className="eyebrow mb-3">{t("studio")}</p>
                <h2 className="display text-4xl">{t("studioName")}</h2>
                <address className="mt-5 not-italic text-muted leading-relaxed">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postal} {siteConfig.address.city}
                  <br />
                  {siteConfig.address.country}
                </address>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-3">{t("contactLabel")}</p>
                <p>
                  <a className="text-lg hover:opacity-70 transition-opacity" href={siteConfig.phoneHref}>
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <a className="text-lg hover:opacity-70 transition-opacity" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/book">{tNav("bookAppointment")}</Button>
                  <Button href={siteConfig.phoneHref} variant="secondary">
                    {t("call")}
                  </Button>
                </div>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-4">{t("openingHours")}</p>
                <ul className="space-y-3 max-w-sm">
                  {siteConfig.openingHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-center justify-between gap-6 border-b border-line pb-3 text-sm"
                    >
                      <span className="text-muted">{tDays(item.day)}</span>
                      <span className="font-mono tracking-wide">{item.hours ?? tDays("closed")}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <Reveal className="relative aspect-[16/11] overflow-hidden bg-line">
                <iframe
                  src={GOOGLE_MAPS_EMBED_SRC}
                  title={t("mapTitle")}
                  className="absolute inset-0 h-full w-full grayscale-[15%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
