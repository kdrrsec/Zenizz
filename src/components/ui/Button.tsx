"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "soft";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  external?: boolean;
};

const sizes = {
  sm: "px-4 py-2.5 text-[0.7rem] tracking-[0.06em]",
  md: "px-5 py-3.5 text-[0.75rem] tracking-[0.06em]",
  lg: "px-7 py-4 text-xs tracking-[0.08em]",
};

const variants = {
  primary: "bg-ink text-paper hover:opacity-80 border border-ink",
  soft: "bg-soft text-ink hover:bg-line border border-soft",
  secondary: "bg-transparent text-ink border border-ink/15 hover:border-ink",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-soft",
  inverse: "bg-paper text-ink border border-paper hover:bg-transparent hover:text-paper",
};

export function Button({
  children,
  href,
  onClick,
  variant = "soft",
  size = "md",
  className,
  type = "button",
  ariaLabel,
  external,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden uppercase font-mono font-medium transition-all duration-300",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <motion.span aria-hidden className="inline-block opacity-60" initial={false}>
        →
      </motion.span>
    </>
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
