import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Image from "next/image";

export function GalleryGrid() {
  if (gallery.length === 0) {
    return (
      <Container wide>
        <div className="border border-dashed border-line py-24 text-center">
          <p className="eyebrow mb-3">Binnenkort</p>
          <p className="text-muted">Nieuwe foto&apos;s volgen snel.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container wide>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <StaggerItem key={item.id} className="group relative aspect-[3/4] overflow-hidden bg-soft">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
