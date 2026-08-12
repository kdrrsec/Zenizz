import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BookingWidget } from "@/components/booking/BookingWidget";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.book" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/book",
      languages: { en: "/book", tr: "/tr/book" },
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="border-b border-line bg-paper pt-[calc(var(--announce-height)+var(--nav-height)+4rem)] pb-16 md:pb-24">
      <Container wide>
        <BookingWidget />
      </Container>
    </section>
  );
}
