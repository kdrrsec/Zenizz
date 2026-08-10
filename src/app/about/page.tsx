import type { Metadata } from "next";
import { images } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story behind ZENIZZ — a premium barbershop in Istanbul, built around craft, presence and precision.",
  alternates: {
    canonical: "/about",
  },
};

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
                alt="Yusuf aan het werk in het ZENIZZ atelier"
                className="aspect-[3/4] sm:translate-y-10"
                imgClassName="object-[center_25%]"
                parallax
              />
              <ImageReveal
                src={images.aboutSecondary}
                alt="Yusuf met een tevreden klant"
                className="aspect-[3/4]"
                imgClassName="object-[center_15%]"
                parallax
              />
            </div>
          </div>
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
