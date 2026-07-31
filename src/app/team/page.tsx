import type { Metadata } from "next";
import Image from "next/image";
import { team } from "@/data/team";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BookingWidget } from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Ontmoet het ZENIZZ team — master barbers en specialisten in fades, scissor work, texture en classic rituals.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="De handen achter de craft."
        description="Elke barber brengt een eigen handtekening. Samen vormen ze de standaard van ZENIZZ."
      />

      <section className="py-16 md:py-24">
        <Container wide>
          <Stagger className="grid gap-12 md:grid-cols-2">
            {team.map((member) => (
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
                  <p className="eyebrow mt-2">{member.role}</p>
                  <p className="mt-4 max-w-md text-muted leading-relaxed">{member.bio}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {member.specialties.map((item) => (
                      <li key={item} className="eyebrow text-stone">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget
            title="Kies je barber"
            description="Boek direct bij je favoriete specialist zodra AxaBook is gekoppeld. Tot die tijd kun je een afspraak aanvragen."
          />
        </Container>
      </section>
    </>
  );
}
