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
      staggerChildren: 0.12,
      delayChildren: 0.35,
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

const panelReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.25, ease: easeOutExpo },
  },
};

type PanelProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
};

function HeroPanel({
  src,
  alt,
  priority,
  objectPosition = "center",
  className,
}: PanelProps) {
  return (
    <motion.div variants={panelReveal} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 34vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
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
    reduce ? ["0%", "0%"] : ["0%", "8%"],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Mobile: one calm still */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={images.hero}
            alt="Gold shears resting on a tattooed forearm — Zenizz craft"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
        </div>

        {/* Desktop: after cut · craft · Yusuf */}
        <motion.div
          className="absolute inset-0 hidden md:grid md:grid-cols-3"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <HeroPanel
            src={images.heroAfter}
            alt="Fresh fade after a Zenizz cut"
            priority
            objectPosition="center 18%"
            className="h-full"
          />
          <HeroPanel
            src={images.hero}
            alt="Gold shears resting on a tattooed forearm — Zenizz craft"
            priority
            objectPosition="center 55%"
            className="h-full"
          />
          <HeroPanel
            src={images.heroYusuf}
            alt="Yusuf Zencirkıran with a client at Zenizz Barbershop"
            priority
            objectPosition="center 22%"
            className="h-full"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/45 md:from-black/72 md:via-black/20 md:to-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] w-full items-center pt-[calc(var(--announce-height)+var(--nav-height))] pb-20">
        <div className="container-wide w-full">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex max-w-md flex-col justify-center md:max-w-lg"
          >
            <motion.p
              variants={fade}
              className="font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[0.92] tracking-[0.08em]"
            >
              {siteConfig.name}
            </motion.p>

            <motion.div variants={fade} className="mt-7 space-y-2 md:mt-9">
              <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-paper/80">
                Premium Barber Studio
              </p>
              <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-paper/55">
                Istanbul, Türkiye
              </p>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center"
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
