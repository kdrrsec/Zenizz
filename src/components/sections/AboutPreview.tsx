import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { images } from "@/data/site";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");
  const pillars = t.raw("pillars") as string[];

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="about-preview-title">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">{t("eyebrow")}</p>
              <blockquote
                id="about-preview-title"
                className="display text-[clamp(2rem,5vw,4.2rem)]"
              >
                &ldquo;{t("quote")}&rdquo;
              </blockquote>
            </Reveal>

            <Reveal className="mt-10 max-w-xl">
              <p className="display text-2xl md:text-3xl !normal-case !tracking-[-0.02em] !leading-tight text-ink">
                {t("description")}
              </p>
              <ul className="mt-8 space-y-3">
                {pillars.map((item) => (
                  <li key={item} className="flex gap-3 font-mono text-sm tracking-[0.04em] uppercase text-faded">
                    <span className="text-ink">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href="/about" variant="soft">
                  {t("readStory")}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            <ImageReveal
              src={images.about}
              alt={t("aboutAlt")}
              className="aspect-[3/4] sm:mt-12"
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
  );
}
