import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Button } from "@/components/ui/Button";

const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps?cid=7479869037686330595&output=embed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit ZENIZZ in Beşiktaş, Istanbul or book an appointment. View opening hours and contact details.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Kom langs. Of plan vooruit."
        description="We ontvangen je graag in het atelier. Voor vragen of reserveringen: bel, mail, of gebruik het boekingsblok."
      />

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-10">
              <Reveal>
                <p className="eyebrow mb-3">Studio</p>
                <h2 className="display text-4xl">ZENIZZ Istanbul</h2>
                <address className="mt-5 not-italic text-muted leading-relaxed">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postal} {siteConfig.address.city}
                  <br />
                  {siteConfig.address.country}
                </address>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-3">Contact</p>
                <p>
                  <a className="text-lg hover:opacity-70 transition-opacity" href={siteConfig.phoneHref}>
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <a className="text-lg hover:opacity-70 transition-opacity" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="#book">Book Appointment</Button>
                  <Button href={siteConfig.phoneHref} variant="secondary">
                    Call
                  </Button>
                </div>
              </Reveal>

              <Reveal>
                <p className="eyebrow mb-4">Opening hours</p>
                <ul className="space-y-3 max-w-sm">
                  {siteConfig.openingHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-center justify-between gap-6 border-b border-line pb-3 text-sm"
                    >
                      <span className="text-muted">{item.day}</span>
                      <span className="font-mono tracking-wide">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <Reveal className="relative aspect-[16/11] overflow-hidden bg-line">
                <iframe
                  src={GOOGLE_MAPS_EMBED_SRC}
                  title="ZENIZZ op Google Maps"
                  className="absolute inset-0 h-full w-full grayscale-[15%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Reveal>
              <BookingWidget
                title="Book Appointment"
                description="Dit blok is voorbereid op AxaBook of een andere externe booking provider. Configureer provider, widgetId of embedUrl om live te gaan."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
