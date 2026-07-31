import { images } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="about-preview-title">
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About"
              title="Meer dan een knipbeurt."
              description="ZENIZZ is een moderne barbershop die aanvoelt als een atelier: rustig, editorial en gericht op vakmanschap. We geloven in aanwezigheid — in het moment tussen werk en thuis."
            />
            <Reveal className="mt-8">
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <ImageReveal
              src={images.about}
              alt="Warm lit barbershop chairs"
              className="aspect-[3/4] sm:mt-12"
              parallax
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <ImageReveal
              src={images.aboutSecondary}
              alt="Contemporary barbershop interior"
              className="aspect-[3/4]"
              parallax
              sizes="(max-width: 768px) 100vw, 35vw"
            />
          </div>
        </div>
        <h2 id="about-preview-title" className="sr-only">
          About ZENIZZ
        </h2>
      </Container>
    </section>
  );
}
