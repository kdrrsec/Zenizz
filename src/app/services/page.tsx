import type { Metadata } from "next";
import { services, serviceCategories } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bekijk alle ZENIZZ services: signature cuts, fades, beard sculpting, hot towel shaves en complete grooming rituals.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Trajecten met aandacht."
        description="Heldere menu’s, eerlijke tijden, en altijd ruimte voor een persoonlijk consult."
      />

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ImageReveal
                src={images.services}
                alt="Fresh precision haircut detail"
                className="aspect-[4/5] sticky top-28"
                parallax
              />
            </div>
            <div className="lg:col-span-8 space-y-16">
              {serviceCategories.map((category) => {
                const items = services.filter((s) => s.category === category.id);
                if (!items.length) return null;
                return (
                  <div key={category.id}>
                    <Reveal>
                      <p className="eyebrow mb-6">{category.label}</p>
                    </Reveal>
                    <Stagger className="divide-y divide-line border-y border-line">
                      {items.map((service) => (
                        <StaggerItem
                          key={service.id}
                          className="grid gap-4 py-7 md:grid-cols-12 md:items-center"
                        >
                          <div className="md:col-span-4">
                            <h2 className="display text-3xl">{service.name}</h2>
                          </div>
                          <p className="md:col-span-5 text-muted leading-relaxed">
                            {service.description}
                          </p>
                          <div className="md:col-span-3 md:text-right">
                            <p className="font-mono text-sm tracking-[0.12em] uppercase">
                              {service.price}
                            </p>
                            <p className="mt-1 text-sm text-stone">{service.duration}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
              <Reveal>
                <Button href="#book">Book Appointment</Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget />
        </Container>
      </section>
    </>
  );
}
