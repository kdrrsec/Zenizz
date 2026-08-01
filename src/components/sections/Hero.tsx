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
      delayChildren: 0.6,
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
        initial={{ scale: 1.08 }}
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
    reduce ? ["0%", "0%"] : ["0%", "7%"],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Mobile: dominant result still */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={images.heroAfter}
            alt="Precise burst fade after a Zenizz cut"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
        </div>

        {/*
          Desktop editorial composition — unequal visual weight:
          Dominant result (7/12) + craft stack detail/atmosphere (5/12)
        */}
        <motion.div
          className="absolute inset-0 hidden gap-[3px] bg-ink md:grid md:grid-cols-12"
          variants={mediaContainer}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <EditorialPanel
            src={images.heroAfter}
            alt="Precise burst fade after a Zenizz cut"
            priority
            objectPosition="center 18%"
            sizes="58vw"
            className="col-span-7 h-full"
            overlay="bg-gradient-to-r from-black/50 via-black/10 to-transparent"
          />

          <motion.div
            variants={stackContainer}
            className="col-span-5 grid h-full grid-rows-12 gap-[3px]"
          >
            <EditorialPanel
              src={images.heroDetail}
              alt="Close-up taper fade — Zenizz craftsmanship"
              priority
              objectPosition="center 35%"
              sizes="42vw"
              className="row-span-5 h-full"
              overlay="bg-black/10"
            />
            <EditorialPanel
              src={images.hero}
              alt="Gold shears — quiet craft detail"
              priority
              objectPosition="center 62%"
              sizes="42vw"
              className="row-span-7 h-full"
              overlay="bg-black/15"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] w-full items-end md:items-center pt-[calc(var(--announce-height)+var(--nav-height))] pb-16 md:pb-28">
        <div className="container-wide w-full">
          <motion.div
            variants={copyContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex max-w-[17rem] flex-col sm:max-w-[19rem] md:max-w-[21rem]"
          >
            <motion.p
              variants={fade}
              className="font-display text-[clamp(2.05rem,5.2vw,3.95rem)] font-semibold leading-[0.96] tracking-[0.1em]"
            >
              {siteConfig.name}
            </motion.p>

            <motion.div variants={fade} className="mt-11 space-y-1.5 md:mt-14">
              <p className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-paper/65">
                Istanbul
              </p>
              <p className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-paper/40">
                Türkiye
              </p>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-[4.5rem] flex w-full flex-col gap-3.5 sm:mt-24 sm:w-auto sm:flex-row sm:items-center"
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
