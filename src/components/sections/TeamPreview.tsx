import Image from "next/image";
import { team } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function TeamPreview() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="team-preview-title">
      <Container wide>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Team"
            title="Mensen achter het vak."
            description="Barbers die hun craft serieus nemen — met een rustige hand en een scherp oog."
          />
          <Reveal>
            <Button href="/team" variant="secondary">
              Meet the Team
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-line">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5">
                <h3 className="display text-2xl">{member.name}</h3>
                <p className="eyebrow mt-2">{member.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <h2 id="team-preview-title" className="sr-only">
          Team
        </h2>
      </Container>
    </section>
  );
}
