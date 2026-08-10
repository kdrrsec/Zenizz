import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { team } from "@/data/team";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BookingWidget } from "@/components/booking/BookingWidget";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.team" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/team",
      languages: { en: "/team", tr: "/tr/team" },
    },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.team");
  const tTeam = await getTranslations("team");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} description={t("heroDescription")} />

      <section className="py-16 md:py-24">
        <Container wide>
          <Stagger className="grid gap-12 md:grid-cols-2">
            {team.map((member) => {
              const specialties = tTeam.raw(`${member.id}.specialties`) as string[];
              return (
                <StaggerItem key={member.id} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-line">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6">
                    <h2 className="display text-3xl md:text-4xl">{member.name}</h2>
                    <p className="eyebrow mt-2">{tTeam(`${member.id}.role`)}</p>
                    <p className="mt-4 max-w-md text-muted leading-relaxed">
                      {tTeam(`${member.id}.bio`)}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {specialties.map((item) => (
                        <li key={item} className="eyebrow text-stone">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget title={t("bookingTitle")} description={t("bookingDescription")} />
        </Container>
      </section>
    </>
  );
}
