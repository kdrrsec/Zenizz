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
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
        {/* Bottom wash so the headline stays legible where it now sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full px-0 pt-[calc(var(--announce-height)+var(--nav-height)+2.5rem)] pb-16 sm:pb-20 md:pb-24">
        <div className="container-wide">
          <motion.div
            variants={heroContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="w-full max-w-[min(100%,26rem)] sm:max-w-[min(100%,34rem)] md:max-w-[45rem] lg:max-w-[52rem]"
          >
            <motion.h1
              variants={heroFade}
              className="display whitespace-nowrap text-[clamp(1.9rem,4.4vw,3.75rem)] !font-black !leading-[0.98] !tracking-tight max-[480px]:whitespace-normal"
            >
              Istanbul&apos;s finest cut.
            </motion.h1>

            <motion.p
              variants={heroFade}
              className="mt-3 text-sm font-normal normal-case tracking-wide text-white/70 sm:text-base"
            >
              Premium barbering, crafted in Istanbul.
            </motion.p>

            <motion.div
              variants={heroFade}
              className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center"
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
