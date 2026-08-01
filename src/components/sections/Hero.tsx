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

const copyContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.65,
    },
  },
};

const mediaContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.06,
    },
  },
};

const stackContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.05,
    },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: easeOutExpo },
  },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.4, ease: easeOutExpo },
  },
};

type PanelProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
  sizes: string;
  overlay?: string;
};

function EditorialPanel({
  src,
  alt,
  priority,
  objectPosition = "center",
  className,
  sizes,
  overlay,
}: PanelProps) {
  return (
    <motion.div variants={panelReveal} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.75, ease: easeOutExpo }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
      {overlay ? (
        <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      ) : null}
    </motion.div>
  );
}

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
    reduce ? ["0%", "0%"] : ["0%", "6%"],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Mobile: dominant result */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={images.heroLeft}
            alt="Precision taper fade — Zenizz Barbershop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </div>

        {/*
          Desktop 3-panel editorial (kept):
          Left dominant result · top detail · bottom craft-in-context
          One story: the cut — result, texture, atelier.
        */}
        <motion.div
          className="absolute inset-0 hidden gap-[3px] bg-ink md:grid md:grid-cols-12"
          variants={mediaContainer}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <EditorialPanel
            src={images.heroLeft}
            alt="Precision taper fade from behind — Zenizz Barbershop"
            priority
            objectPosition="center 28%"
            sizes="58vw"
            className="col-span-7 h-full"
            overlay="bg-gradient-to-r from-black/45 via-black/10 to-transparent"
          />

          <motion.div
            variants={stackContainer}
            className="col-span-5 grid h-full grid-rows-12 gap-[3px]"
          >
            <EditorialPanel
              src={images.heroDetail}
              alt="Close-up hair texture and fade detail"
              priority
              objectPosition="center 40%"
              sizes="42vw"
              className="row-span-5 h-full"
              overlay="bg-black/[0.08]"
            />
            <EditorialPanel
              src={images.heroStory}
              alt="Finished burst fade in the Zenizz atelier"
              priority
              objectPosition="center 35%"
              sizes="42vw"
              className="row-span-7 h-full"
              overlay="bg-black/10"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copy lower — more air, imagery leads */}
      <div className="relative z-10 flex min-h-[100svh] w-full items-end pt-[calc(var(--announce-height)+var(--nav-height))] pb-14 md:pb-20 lg:pb-24">
        <div className="container-wide w-full">
          <motion.div
            variants={copyContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mb-2 flex max-w-[16rem] flex-col sm:max-w-[18rem] md:mb-4 md:max-w-[20rem]"
          >
            <motion.p
              variants={fade}
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.1em]"
            >
              {siteConfig.name}
            </motion.p>

            <motion.div variants={fade} className="mt-12 space-y-1.5 md:mt-14">
              <p className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-paper/65">
                Istanbul
              </p>
              <p className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-paper/40">
                Türkiye
              </p>
            </motion.div>

            <motion.div variants={fade} className="mt-20 sm:mt-24">
              <Button href="#book" variant="inverse" className="w-full sm:w-auto" showArrow>
                Book Appointment
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
