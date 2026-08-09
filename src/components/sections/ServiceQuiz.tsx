"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { serviceCategories } from "@/data/services";

export function ServiceQuiz() {
  return (
    <section className="border-y border-line bg-soft py-20 md:py-28" aria-labelledby="quiz-title">
      <Container wide>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">Service guide</p>
          <h2 id="quiz-title" className="display text-4xl md:text-6xl">
            What do you need?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-faded leading-relaxed">
            Pick a direction. We&apos;ll take it from there — consult included.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/services#${category.id}`}
                className="group flex min-h-[120px] items-end border border-black/10 bg-paper p-5 transition-all duration-400 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <span className="display text-2xl md:text-3xl">{category.label}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/gallery" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            Lifestyle lookbook
          </Link>
          <Link href="/about" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            Our story
          </Link>
          <Link href="/team" className="font-mono text-[0.7rem] tracking-[0.1em] uppercase underline-anim">
            Meet the team
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
