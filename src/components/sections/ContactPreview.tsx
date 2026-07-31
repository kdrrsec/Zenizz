import { siteConfig, images } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

export function ContactPreview() {
  return (
    <section className="border-t border-line bg-paper py-20 md:py-28" aria-labelledby="contact-preview-title">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Contact</p>
              <h2 id="contact-preview-title" className="display text-4xl md:text-6xl">
                Visit the atelier
              </h2>
              <p className="mt-5 max-w-md text-faded leading-relaxed">
                Mid-Amsterdam. Come in, take a seat, and let the craft do the talking.
              </p>
            </Reveal>

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
                <ul className="max-w-xs space-y-2 text-sm">
                  {siteConfig.openingHours.map((item) => (
                    <li key={item.day} className="flex justify-between gap-6">
                      <span className="text-faded">{item.day}</span>
                      <span className="font-mono tracking-wide">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">Reach us</p>
                <p>
                  <a href={siteConfig.phoneHref} className="underline-anim">
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`mailto:${siteConfig.email}`} className="underline-anim">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8 lg:col-span-7">
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
      </Container>
    </section>
  );
}
