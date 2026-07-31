import Image from "next/image";
import { images } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36 text-paper" aria-labelledby="booking-cta-title">
      <Image
        src={images.cta}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/70" />

      <Container className="relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-5 text-warm">Ready when you are</p>
          <h2 id="booking-cta-title" className="display mx-auto max-w-4xl text-5xl md:text-7xl text-balance">
            Boek je stoel.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-paper/85 leading-relaxed">
            Kies een tijdstip dat past. Wij zorgen voor de rest — rust, precisie
            en een knipbeurt die spreekt voor zich.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="#book" variant="inverse">
              Book Appointment
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-paper/35 text-paper hover:bg-paper hover:text-ink"
            >
              Contact
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
