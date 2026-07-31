"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { easeOutExpo, staggerContainer, fadeUp } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Barber giving a precise cut in the ZENIZZ atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-12 pt-44 sm:pb-14 sm:pt-40 md:pb-20"
      >
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="max-w-5xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 font-mono text-[0.65rem] leading-relaxed tracking-[0.14em] uppercase text-white/75 sm:mb-6 sm:text-[0.7rem]"
            >
              Zenizz Barbershop
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              Istanbul · Türkiye
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="display text-[clamp(2.75rem,10vw,7.5rem)]"
            >
              Premium barbering.
              <br />
              Crafted in Istanbul.
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <Button href="#book" variant="primary" className="w-full sm:w-auto" showArrow>
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

          <motion.div
            className="mt-12 flex items-end justify-between gap-6 border-t border-white/15 pt-5 sm:mt-16"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7, ease: easeOutExpo }}
          >
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-white/65">
              We take this craft very seriously
            </p>
            <p className="hidden font-mono text-[0.65rem] tracking-[0.12em] uppercase text-white/65 sm:block">
              Scroll
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
