import Image from "next/image";
import { useTranslations } from "next-intl";
import { team } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function TeamPreview() {
  const t = useTranslations("teamPreview");
  const tTeam = useTranslations("team");

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="team-preview-title">
      <Container wide>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-3">{t("eyebrow")}</p>
            <h2 id="team-preview-title" className="display text-4xl md:text-6xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal>
            <Button href="/team" variant="soft">
              {t("meetTeam")}
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-soft">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4">
                <h3 className="display text-2xl !normal-case !tracking-[-0.02em]">{member.name}</h3>
                <p className="mt-1 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-faded">
                  {tTeam(`${member.id}.role`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
