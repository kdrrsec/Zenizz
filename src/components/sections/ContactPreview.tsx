import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { images } from "@/data/site";

export function ContactPreview() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="contact-preview-title">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Bezoek het atelier."
              description="Midden in Amsterdam. Kom binnen, neem plaats, en laat de rust het werk doen."
            />

            <Reveal className="mt-10 space-y-8">
              <div>
                <p className="eyebrow mb-3">Address</p>
                <p className="leading-relaxed">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postal} {siteConfig.address.city}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Hours</p>
                <ul className="space-y-2 text-muted">
                  {siteConfig.openingHours.map((item) => (
                    <li key={item.day} className="flex justify-between gap-6 max-w-xs">
                      <span>{item.day}</span>
                      <span className="text-ink">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">Reach us</p>
                <p>
                  <a href={siteConfig.phoneHref} className="hover:opacity-70 transition-opacity">
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`mailto:${siteConfig.email}`} className="hover:opacity-70 transition-opacity">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <ImageReveal
              src={images.contact}
              alt="Barber tools on a clean station"
              className="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              parallax
            />
            <BookingWidget />
          </div>
        </div>

        <h2 id="contact-preview-title" className="sr-only">
          Contact
        </h2>
      </Container>
    </section>
  );
}
