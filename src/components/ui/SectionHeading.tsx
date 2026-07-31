import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", light && "text-warm")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display text-4xl sm:text-5xl md:text-6xl",
          light ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-warm/90" : "text-faded",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
