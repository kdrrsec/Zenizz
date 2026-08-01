import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** light = over dark hero; dark = solid/white nav */
  variant?: "light" | "dark";
};

const LOGO = {
  dark: "/brand/zenizz-logo.png",
  light: "/brand/zenizz-logo-light.png",
} as const;

/**
 * Zenizz brand lockup.
 * Explicit height in style beats global `img { height: auto }`.
 */
export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Image
      src={LOGO[variant]}
      alt="Zenizz"
      width={200}
      height={50}
      priority
      className={cn("block h-7 w-auto select-none object-contain object-left md:h-8", className)}
      style={{ width: "auto", height: "2rem", maxHeight: "2rem" }}
    />
  );
}
