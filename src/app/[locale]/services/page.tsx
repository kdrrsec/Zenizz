import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { services, serviceCategories } from "@/data/services";
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
  const tServices = await getTranslations("services");
  const tCategories = await getTranslations("serviceCategories");

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
            <div className="lg:col-span-8 space-y-16">
              {serviceCategories.map((category) => {
                const items = services.filter((s) => s.category === category.id);
                if (!items.length) return null;
                return (
                  <div key={category.id} id={category.id} className="scroll-mt-[calc(var(--announce-height)+var(--nav-height)+1.5rem)]">
                    <Reveal>
                      <p className="eyebrow mb-6">{tCategories(category.id)}</p>
                    </Reveal>
                    <Stagger className="divide-y divide-line border-y border-line">
                      {items.map((service) => (
                        <StaggerItem
                          key={service.id}
                          className="grid gap-4 py-7 md:grid-cols-12 md:items-center"
                        >
                          <div className="md:col-span-4">
                            <h2 className="display text-3xl">
                              <span lang="en">{tServices(`${service.id}.name`)}</span>
                            </h2>
                          </div>
                          <p className="md:col-span-5 text-muted leading-relaxed">
                            {tServices(`${service.id}.description`)}
                          </p>
                          <div className="md:col-span-3 md:text-right">
                            <p className="font-mono text-sm tracking-[0.12em] uppercase">
                              {service.price}
                            </p>
                            <p className="mt-1 text-sm text-stone">{service.duration}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
              <Reveal>
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
