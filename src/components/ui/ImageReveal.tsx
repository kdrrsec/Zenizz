"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: boolean;
};

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  parallax = false,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !reduce ? ["-8%", "8%"] : ["0%", "0%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-line", className)}>
      <motion.div
        className="absolute inset-0 origin-bottom"
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        whileInView={reduce ? undefined : { clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.15, ease: easeOutExpo }}
      >
        <motion.div style={{ y }} className="absolute inset-[-12%] will-change-transform">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover", imgClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
