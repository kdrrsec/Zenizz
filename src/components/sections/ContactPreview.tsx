import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Reveal } from "@/components/ui/Reveal";

const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps?cid=7479869037686330595&output=embed";

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
                In the heart of Beşiktaş, Istanbul. Come in, take a seat, and let the craft do the talking.
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
            <Reveal className="relative aspect-[16/10] overflow-hidden bg-line">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                title="ZENIZZ op Google Maps"
                className="absolute inset-0 h-full w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
            <BookingWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
