"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { easeOutExpo, staggerContainer, fadeUp } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Barber giving a precise haircut in the ZENIZZ atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
        <div className="absolute inset-0 bg-ink/20" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-16 pt-32 md:pb-24"
      >
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-6 text-warm">
              Amsterdam Barber Atelier
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="display text-[clamp(3.4rem,12vw,8.5rem)] text-balance"
            >
              {siteConfig.name}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-paper/85"
            >
              Waar craft, presence en precisie samenkomen. Een rustige stoel,
              scherpe lijnen, en de tijd om het goed te doen.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Button href="#book" variant="inverse">
                Book Appointment
              </Button>
              <Button href="/services" variant="secondary" className="border-paper/30 text-paper hover:bg-paper hover:text-ink">
                View Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 flex items-end justify-between gap-6 border-t border-white/15 pt-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: easeOutExpo }}
          >
            <p className="eyebrow text-warm/80">{siteConfig.tagline}</p>
            <p className="hidden eyebrow text-warm/80 sm:block">Scroll</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
