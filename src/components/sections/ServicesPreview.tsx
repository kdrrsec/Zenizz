import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  const t = useTranslations("servicesPreview");
  const tServices = useTranslations("services");
  const featured = services.slice(0, 6);

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="services-preview-title">
      <Container wide>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-3">{t("eyebrow")}</p>
            <h2 id="services-preview-title" className="display text-4xl md:text-6xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-md text-faded leading-relaxed">
              {t("description")}{" "}
              <Link href="#book" className="underline-anim text-ink font-medium">
                {t("bookIt")}
              </Link>{" "}
              {t("notSure")}
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => {
            const name = tServices(`${service.id}.name`);
            const hasSuffix = tServices.has(`${service.id}.nameSuffix`);
            return (
              <StaggerItem
                key={service.id}
                className="group relative flex min-h-[240px] flex-col justify-between bg-paper p-7 transition-colors duration-400 hover:bg-soft"
              >
                <div>
                  <h3 className="display text-3xl transition-transform duration-500 group-hover:translate-x-1">
                    <span lang="en">
                      {name}
                      {hasSuffix ? (
                        <>
                          {" "}
                          <span className="text-lg italic normal-case !tracking-normal text-faded">
                            {tServices(`${service.id}.nameSuffix`)}
                          </span>
                        </>
                      ) : null}
                    </span>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-faded">
                    {tServices(`${service.id}.description`)}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-mono text-sm tracking-[0.08em]">
                    <span className="text-faded">{t("from")} </span>
                    <span className="font-semibold">{service.price}</span>
                  </p>
                  <Link
                    href="#book"
                    className="font-mono text-lg leading-none transition-transform duration-300 group-hover:rotate-45"
                    aria-label={t("bookAria", { name })}
                  >
                    [+]
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10">
          <Button href="/services" variant="soft">
            {t("viewAll")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
