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

  const anchorOffset = "scroll-mt-[calc(var(--announce-height)+var(--nav-height)+1.5rem)]";

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <div className="sticky top-[calc(var(--announce-height)+var(--nav-height))] z-30 border-b border-line bg-paper/95 backdrop-blur-md">
        <Container wide>
          <nav
            className="flex flex-wrap gap-2 py-4"
            aria-label={t("eyebrow")}
          >
            {serviceCategories.map((category) => {
              const count = services.filter((s) => s.category === category.id).length;
              if (!count) return null;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="eyebrow border border-line px-4 py-2 text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {tCategories(category.id)}
                </a>
              );
            })}
          </nav>
        </Container>
      </div>

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ImageReveal
                src={images.services}
                alt={t("imageAlt")}
                className="aspect-[4/5] sticky top-[calc(var(--announce-height)+var(--nav-height)+5rem)]"
                parallax
              />
            </div>
            <div className="lg:col-span-8 space-y-16">
              {serviceCategories.map((category) => {
                const items = services.filter((s) => s.category === category.id);
                if (!items.length) return null;
                return (
                  <div key={category.id} id={category.id} className={anchorOffset}>
                    <Reveal className="mb-7 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                      <h2 className="display text-3xl md:text-4xl">{tCategories(category.id)}</h2>
                      <span className="font-mono text-xs tracking-[0.1em] text-stone">
                        {items.length}
                      </span>
                    </Reveal>
                    <Stagger className="grid gap-4 sm:grid-cols-2">
                      {items.map((service) => (
                        <StaggerItem
                          key={service.id}
                          className="border border-line p-6 transition-colors hover:border-ink"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="display text-2xl !leading-[1.05]">
                              <span lang="en">{tServices(`${service.id}.name`)}</span>
                            </h3>
                            <p className="shrink-0 whitespace-nowrap font-mono text-sm tracking-[0.08em]">
                              {service.price}
                            </p>
                          </div>
                          <p className="mt-1 font-mono text-xs tracking-[0.1em] uppercase text-stone">
                            {service.duration}
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-muted">
                            {tServices(`${service.id}.description`)}
                          </p>
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
