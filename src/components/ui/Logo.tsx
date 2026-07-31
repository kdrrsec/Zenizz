import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show wordmark next to the mark (default: true) */
  withWordmark?: boolean;
};

/**
 * Zenizz brand mark — three parallel diagonal strokes + wordmark.
 * Uses currentColor so it adapts to transparent (light) and solid (dark) nav states.
 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-3 text-current", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.35em] w-[1.35em] shrink-0"
      >
        <path d="M10 14h36L28 106H-8z" />
        <path d="M46 14h36L64 106H28z" />
        <path d="M82 14h36L100 106H64z" />
      </svg>

      {withWordmark ? (
        <>
          <span className="hidden h-[0.95em] w-px bg-current opacity-40 sm:block" />
          <span className="font-display text-[0.95em] font-semibold tracking-[0.24em]">
            ZENIZZ
          </span>
        </>
      ) : null}
    </span>
  );
}
