import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  const featured = services.slice(0, 6);

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="services-preview-title">
      <Container wide>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-3">Best of the chair</p>
            <h2 id="services-preview-title" className="display text-4xl md:text-6xl">
              Signature services
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-md text-faded leading-relaxed">
              Know what you need?{" "}
              <Link href="#book" className="underline-anim text-ink font-medium">
                Book it.
              </Link>{" "}
              Not sure? Explore the menu below.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem
              key={service.id}
              className="group relative flex min-h-[280px] flex-col justify-between bg-paper p-7 transition-colors duration-400 hover:bg-soft"
            >
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-faded">
                  {service.duration}
                </p>
                <h3 className="display mt-4 text-3xl md:text-4xl transition-transform duration-500 group-hover:translate-x-1">
                  {service.name}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-faded">
                  {service.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <p className="font-mono text-sm tracking-[0.08em]">{service.price}</p>
                <Link
                  href="#book"
                  className="font-mono text-lg leading-none transition-transform duration-300 group-hover:rotate-45"
                  aria-label={`Book ${service.name}`}
                >
                  [+]
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <Button href="/services" variant="soft">
            View all services
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
