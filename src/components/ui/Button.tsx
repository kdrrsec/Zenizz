"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "soft" | "outlineLight";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  external?: boolean;
  showArrow?: boolean;
};

const sizes = {
  sm: "px-4 py-2.5 text-[0.7rem] tracking-[0.06em]",
  md: "px-5 py-3.5 text-[0.75rem] tracking-[0.06em]",
  lg: "px-7 py-4 text-xs tracking-[0.08em]",
};

const variants = {
  primary:
    "bg-[#111111] !text-white border-0 hover:bg-[#2A2A2A] hover:-translate-y-[2px]",
  soft: "bg-soft !text-ink hover:bg-line border border-soft hover:-translate-y-[1px]",
  secondary:
    "bg-transparent !text-ink border border-ink/15 hover:border-ink hover:-translate-y-[1px]",
  ghost: "bg-transparent !text-ink border border-transparent hover:bg-soft",
  // !text-* beats global `a { color: inherit }` over dark transparent nav
  inverse:
    "bg-paper !text-ink border border-paper hover:bg-transparent hover:!text-paper",
  outlineLight:
    "bg-transparent !text-white border border-white/35 hover:bg-white hover:!text-black hover:-translate-y-[2px]",
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
  showArrow = true,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden uppercase font-mono font-medium transition-all duration-300 ease-out",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span aria-hidden className="inline-block opacity-70 transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      ) : null}
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
