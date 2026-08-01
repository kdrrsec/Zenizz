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
 * Zenizz brand lockup from public/ZenizV4.png (cropped + transparent).
 * Inline height beats the global `img { height: auto }` rule.
 */
export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Image
      src={LOGO[variant]}
      alt="Zenizz"
      width={200}
      height={50}
      priority
      className={cn("block select-none object-contain object-left", className)}
      style={{ width: "auto", height: "2.25rem", maxHeight: "2.25rem" }}
    />
  );
}
