"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { serviceCategories } from "@/data/services";

export function ServiceQuiz() {
  const t = useTranslations("serviceQuiz");
  const tCategories = useTranslations("serviceCategories");

  return (
    <section className="border-y border-line bg-soft py-20 md:py-28" aria-labelledby="quiz-title">
      <Container wide>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h2 id="quiz-title" className="display text-4xl md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-faded leading-relaxed">{t("description")}</p>
        </Reveal>

        <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/services#${category.id}`}
                className="group flex min-h-[120px] items-end border border-black/10 bg-paper p-5 transition-all duration-400 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <span className="display text-2xl md:text-3xl">{tCategories(category.id)}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/gallery" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            {t("lookbook")}
          </Link>
          <Link href="/about" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            {t("story")}
          </Link>
          <Link href="/team" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            {t("team")}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
