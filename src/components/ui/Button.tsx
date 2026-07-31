"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  external?: boolean;
};

const sizes = {
  sm: "px-4 py-2.5 text-xs tracking-[0.14em]",
  md: "px-6 py-3.5 text-[0.7rem] tracking-[0.16em]",
  lg: "px-8 py-4 text-xs tracking-[0.18em]",
};

const variants = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft border border-ink",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper",
  ghost:
    "bg-transparent text-ink border border-transparent hover:border-line",
  inverse:
    "bg-paper text-ink border border-paper hover:bg-transparent hover:text-paper",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ariaLabel,
  external,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden uppercase font-mono transition-colors duration-300",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        initial={false}
        whileHover={{ x: 3 }}
      >
        →
      </motion.span>
    </span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
