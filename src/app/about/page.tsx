import type { Metadata } from "next";
import { images } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ontdek het verhaal achter ZENIZZ — een modern barbershop atelier in Amsterdam, gebouwd rond craft, presence en precisie.",
};

const pillars = [
  {
    title: "Craft",
    text: "Elke knipbeurt begint met kijken. Vorm, textuur en balans bepalen het traject — niet de trend van de week.",
  },
  {
    title: "Presence",
    text: "We maken ruimte. Geen haast, geen ruis. Alleen focus op het moment in de stoel.",
  },
  {
    title: "Precision",
    text: "Strakke lijnen, zachte overgangen, scherpe afwerking. Details die je voelt, ook dagen later.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Een atelier voor wie het vak serieus neemt."
        description="ZENIZZ is ontstaan vanuit een eenvoudige vraag: wat als een barbershop aanvoelt als een stilte tussen werk en thuis — warm, editorial, en meesterlijk uitgevoerd?"
      />

      <section className="py-20 md:py-28">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5 space-y-6 text-lg leading-relaxed text-muted">
              <p>
                We specialiseren ons in short tot medium lengths: fades, scissor
                work, beard sculpting en klassieke rituals. Niet omdat dat trendy
                is — maar omdat daar onze craft het scherpst is.
              </p>
              <p>
                Het interieur, de lichtval, de tools, het tempo: alles is
                gekozen om aanwezigheid te creëren. Bij ZENIZZ word je niet
                afgehandeld. Je wordt gezien.
              </p>
              <Button href="#book">Book Appointment</Button>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <ImageReveal
                src={images.about}
                alt="Barbershop chairs in soft afternoon light"
                className="aspect-[3/4] sm:translate-y-10"
                parallax
              />
              <ImageReveal
                src={images.aboutSecondary}
                alt="Clean modern barbershop atmosphere"
                className="aspect-[3/4]"
                parallax
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-elevated py-20 md:py-28">
        <Container wide>
          <Reveal>
            <p className="eyebrow mb-5">Philosophy</p>
            <h2 className="display max-w-3xl text-4xl md:text-6xl text-balance">
              Laat je verschijning spreken voor je iets zegt.
            </h2>
          </Reveal>
          <Stagger className="mt-16 grid gap-10 md:grid-cols-3">
            {pillars.map((item) => (
              <StaggerItem key={item.title} className="border-t border-line pt-8">
                <h3 className="display text-3xl">{item.title}</h3>
                <p className="mt-4 text-muted leading-relaxed">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <BookingWidget
            title="Ervaar ZENIZZ"
            description="Boek een consult of signature ritual. Het boekingssysteem is klaar voor AxaBook-integratie."
          />
        </Container>
      </section>
    </>
  );
}
