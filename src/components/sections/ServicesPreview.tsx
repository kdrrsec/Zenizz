import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function ServicesPreview() {
  const featured = services.slice(0, 4);

  return (
    <section className="border-y border-line bg-paper-elevated py-24 md:py-32" aria-labelledby="services-preview-title">
      <Container wide>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Rituals met precisie."
            description="Van signature cuts tot hot towel shaves — elk traject is doordacht, persoonlijk en zonder haast."
          />
          <Reveal>
            <Button href="/services" variant="secondary">
              All Services
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-16 divide-y divide-line border-y border-line">
          {featured.map((service) => (
            <StaggerItem
              key={service.id}
              className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:items-center md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="display text-3xl md:text-4xl transition-transform duration-500 group-hover:translate-x-1">
                  {service.name}
                </h3>
              </div>
              <p className="md:col-span-5 text-muted leading-relaxed">
                {service.description}
              </p>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-sm tracking-[0.12em] uppercase text-ink">
                  {service.price}
                </p>
                <p className="mt-1 text-sm text-stone">{service.duration}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <h2 id="services-preview-title" className="sr-only">
          Services
        </h2>
      </Container>
    </section>
  );
}
