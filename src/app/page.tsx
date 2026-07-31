import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ServiceQuiz } from "@/components/sections/ServiceQuiz";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { ContactPreview } from "@/components/sections/ContactPreview";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ServiceQuiz />
      <AboutPreview />
      <TeamPreview />
      <GalleryPreview />
      <Reviews />
      <BookingCTA />
      <FAQ />
      <ContactPreview />
    </>
  );
}
