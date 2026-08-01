import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** light = over dark hero; dark = solid/white nav */
  variant?: "light" | "dark";
};

const LOGO = {
  dark: {
    src: "/brand/zenizz-logo.png",
    width: 794,
    height: 240,
  },
  light: {
    src: "/brand/zenizz-logo-light.png",
    width: 794,
    height: 240,
  },
} as const;

/**
 * Zenizz brand lockup (Z mark + wordmark).
 * Light variant for transparent hero nav; dark/metallic for solid nav.
 */
export function Logo({ className, variant = "dark" }: LogoProps) {
  const asset = LOGO[variant];

  return (
    <Image
      src={asset.src}
      alt="Zenizz"
      width={asset.width}
      height={asset.height}
      priority
      className={cn(
        "h-7 w-auto select-none object-contain object-left md:h-8",
        className,
      )}
    />
  );
}
