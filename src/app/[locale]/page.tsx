import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesPreview />
      <TeamPreview />
      <GalleryPreview />
      <Reviews />
      <BookingCTA />
      <FAQ />
      <ContactPreview />
    </>
  );
}
