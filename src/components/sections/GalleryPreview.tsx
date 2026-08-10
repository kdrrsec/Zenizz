"use client";

import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function GalleryPreview() {
  const items = gallery.slice(0, 6);

  if (items.length === 0) return null;

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

        <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.id} className="group relative aspect-[3/4] overflow-hidden bg-line">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
