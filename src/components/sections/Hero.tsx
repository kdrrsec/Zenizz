"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { images, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { easeOutExpo } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.55,
    },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: easeOutExpo },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "12%"],
  );
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.06],
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      {/* Full-bleed authentic studio still — vertical craft photography cropped for atmosphere */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: mediaScale }}
          initial={reduce ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeOutExpo }}
        >
          <Image
            src={images.hero}
            alt="Gold shears resting on a tattooed forearm — Zenizz Barbershop craft"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
        </motion.div>

        {/* Quiet atmosphere — keep the craft visible, text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
      </motion.div>

      <div className="relative z-10 w-full pt-[calc(var(--announce-height)+var(--nav-height)+2rem)] pb-24 md:pb-28">
        <div className="container-wide">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex min-h-[min(62svh,36rem)] max-w-xl flex-col justify-center"
          >
            <motion.p
              variants={fade}
              className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-[0.08em]"
            >
              {siteConfig.name}
            </motion.p>

            <motion.div variants={fade} className="mt-8 space-y-2 md:mt-10">
              <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-paper/80">
                Premium Barber Studio
              </p>
              <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-paper/55">
                Istanbul, Türkiye
              </p>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-12 flex w-full flex-col gap-3 sm:mt-14 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button href="#book" variant="inverse" className="w-full sm:w-auto" showArrow>
                Book Appointment
              </Button>
              <Button
                href="/services"
                variant="outlineLight"
                className="w-full sm:w-auto"
                showArrow={false}
              >
                View Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
