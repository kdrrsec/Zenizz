"use client";

import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  const items = gallery.slice(0, 6);

  return (
    <section className="border-y border-line bg-paper-elevated py-24 md:py-32" aria-labelledby="gallery-preview-title">
      <Container wide>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title="Sfeer in beeld."
            description="Interieur, craft en details — een blik op de wereld van ZENIZZ."
          />
          <Reveal>
            <Button href="/gallery" variant="secondary">
              View Gallery
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid auto-rows-[220px] gap-4 md:grid-cols-6 md:auto-rows-[260px]">
          {items.map((item, index) => (
            <StaggerItem
              key={item.id}
              className={cn(
                "group relative overflow-hidden bg-line",
                index === 0 && "md:col-span-3 md:row-span-2",
                index === 1 && "md:col-span-3",
                index === 2 && "md:col-span-2",
                index === 3 && "md:col-span-2",
                index === 4 && "md:col-span-2",
                index === 5 && "md:col-span-6 md:row-span-1 md:h-[320px]",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </StaggerItem>
          ))}
        </Stagger>

        <h2 id="gallery-preview-title" className="sr-only">
          Gallery
        </h2>
      </Container>
    </section>
  );
}
