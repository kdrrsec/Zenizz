"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "cuts", label: "Cuts" },
  { id: "details", label: "Details" },
  { id: "atmosphere", label: "Atmosphere" },
] as const;

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <Container wide>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Gallery filters">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "eyebrow border px-4 py-2 transition-colors duration-300",
              filter === item.id
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-ink hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" key={filter}>
        {items.map((item) => (
          <StaggerItem
            key={item.id}
            className={cn(
              "group relative overflow-hidden bg-line",
              item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/5]",
              item.span === "wide" && "sm:col-span-2 sm:aspect-[16/10]",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
