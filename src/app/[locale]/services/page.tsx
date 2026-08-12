import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { images } from "@/data/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/services",
      languages: { en: "/services", tr: "/tr/services" },
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tServicesPreview = await getTranslations("servicesPreview");
  const tServices = await getTranslations("services");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ImageReveal
                src={images.services}
                alt={t("imageAlt")}
                className="aspect-[4/5] sticky top-28"
                parallax
              />
            </div>
            <div className="lg:col-span-8">
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => {
                  const hasSuffix = tServices.has(`${service.id}.nameSuffix`);
                  return (
                    <StaggerItem
                      key={service.id}
                      className="border border-line p-7 transition-colors hover:border-ink"
                    >
                      <h2 className="display text-2xl !leading-[1.05]">
                        <span lang="en">
                          {tServices(`${service.id}.name`)}
                          {hasSuffix ? (
                            <>
                              {" "}
                              <span className="text-base italic normal-case !tracking-normal text-faded">
                                {tServices(`${service.id}.nameSuffix`)}
                              </span>
                            </>
                          ) : null}
                        </span>
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {tServices(`${service.id}.description`)}
                      </p>
                      <p className="mt-5 font-mono text-sm tracking-[0.08em]">
                        <span className="text-stone">{tServicesPreview("from")} </span>
                        <span className="font-semibold text-ink">{service.price}</span>
                      </p>
                    </StaggerItem>
                  );
                })}
              </Stagger>
              <Reveal className="mt-10">
                <Button href="#book">{t("bookAppointment")}</Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget />
        </Container>
      </section>
    </>
  );
}
