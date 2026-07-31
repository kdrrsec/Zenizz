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
import { images } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { easeOutExpo } from "@/lib/motion";

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const heroFade: Variants = {
  hidden: { opacity: 0, y: 18 },
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
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Close-up of a precise haircut with soft shallow depth of field"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Soft left wash only — keeps the image breathing on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
      </motion.div>

      <div className="relative z-10 w-full px-0 py-28 md:py-32">
        <div className="container-wide">
          <motion.div
            variants={heroContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="w-full max-w-[min(100%,28rem)] sm:max-w-[min(100%,32rem)] md:max-w-[42%]"
          >
            <motion.h1
              variants={heroFade}
              className="display text-[clamp(2.15rem,5.5vw,4.25rem)] !leading-[1.08] !tracking-[-0.035em]"
            >
              Premium barbering.
              <br />
              Crafted in Istanbul.
            </motion.h1>

            <motion.div
              variants={heroFade}
              className="mt-12 flex w-full flex-col gap-3 sm:mt-14 sm:w-auto sm:flex-row sm:items-center"
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
        </div>
      </div>
    </section>
  );
}
