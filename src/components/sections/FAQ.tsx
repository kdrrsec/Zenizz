"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type FaqItem = { q: string; a: string };

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-line bg-paper py-20 md:py-28" aria-labelledby="faq-title">
      <Container>
        <Reveal className="mb-12">
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h2 id="faq-title" className="display text-4xl md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="display text-xl md:text-2xl !normal-case !tracking-[-0.02em] !leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-lg transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-faded leading-relaxed">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
