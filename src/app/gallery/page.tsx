import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { BookingWidget } from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Bekijk de ZENIZZ gallery — interieur, cuts, details en sfeer van ons Amsterdam barbershop atelier.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Beelden van het atelier."
        description="Een selectie van sfeer, craft en details — ter inspiratie, niet als catalogus."
      />

      <section className="py-12 md:py-20">
        <GalleryGrid />
      </section>

      <section className="border-t border-line bg-paper-elevated py-20">
        <Container>
          <BookingWidget />
        </Container>
      </section>
    </>
  );
}
