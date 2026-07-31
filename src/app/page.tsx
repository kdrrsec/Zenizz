import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { ContactPreview } from "@/components/sections/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <TeamPreview />
      <GalleryPreview />
      <Reviews />
      <BookingCTA />
      <ContactPreview />
    </>
  );
}
