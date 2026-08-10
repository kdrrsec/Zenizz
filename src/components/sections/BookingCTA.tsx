import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BookingCTA() {
  const t = useTranslations("bookingCta");

  return (
    <section className="relative overflow-hidden py-28 md:py-36 text-paper" aria-labelledby="booking-cta-title">
      <Image
        src={images.cta}
        alt=""
        fill
        sizes="100vw"
        style={{ objectPosition: "center 25%" }}
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/65" />

      <Container className="relative z-10 text-center">
        <Reveal>
          <p className="mb-5 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-white/70">
            {t("eyebrow")}
          </p>
          <h2 id="booking-cta-title" className="display mx-auto max-w-4xl text-5xl md:text-7xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80 leading-relaxed">{t("description")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="#book" variant="inverse">
              {t("bookAppointment")}
            </Button>
            <Button href="/contact" variant="secondary" className="border-white/30 text-paper hover:bg-paper hover:text-ink">
              {t("contact")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
