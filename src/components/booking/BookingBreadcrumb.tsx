import { cn } from "@/lib/utils";

type BookingBreadcrumbProps = {
  steps: string[];
  currentIndex: number;
};

export function BookingBreadcrumb({ steps, currentIndex }: BookingBreadcrumbProps) {
  return (
    <nav aria-label="Booking steps" className="mb-8 flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <span key={step} className="flex items-center gap-2">
          {index > 0 ? (
            <span className="text-stone/50" aria-hidden>
              /
            </span>
          ) : null}
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-[0.1em]",
              index === currentIndex ? "font-semibold text-ink" : index < currentIndex ? "text-faded" : "text-stone/50",
            )}
          >
            {step}
          </span>
        </span>
      ))}
    </nav>
  );
}
