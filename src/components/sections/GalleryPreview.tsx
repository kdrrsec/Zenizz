"use client";

import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  const items = gallery.slice(0, 6);

  return (
    <section className="border-y border-line bg-soft py-20 md:py-28" aria-labelledby="gallery-preview-title">
      <Container wide>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-3">Lookbook</p>
            <h2 id="gallery-preview-title" className="display text-4xl md:text-6xl">
              Lifestyle gallery
            </h2>
          </Reveal>
          <Reveal>
            <Button href="/gallery" variant="soft">
              View gallery
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid auto-rows-[220px] gap-3 md:grid-cols-6 md:auto-rows-[280px]">
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
                index === 5 && "md:col-span-6 md:h-[340px]",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
