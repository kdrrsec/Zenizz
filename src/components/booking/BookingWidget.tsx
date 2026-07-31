"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * BookingWidget — integration-ready placeholder for an external booking system.
 *
 * To connect AxaBook or another provider later:
 * 1. Set `provider` to "axabook" (or your provider id)
 * 2. Pass `embedUrl` or `scriptSrc` + `widgetId`
 * 3. Optionally pass `onReady` for analytics hooks
 *
 * Until configured, this renders a clear CTA that scrolls/opens the booking intent.
 */
export type BookingProvider = "none" | "axabook" | "custom";

export type BookingWidgetProps = {
  provider?: BookingProvider;
  /** Full URL to an embedded booking page / iframe source */
  embedUrl?: string;
  /** External script URL for widget loaders (e.g. AxaBook) */
  scriptSrc?: string;
  /** Provider-specific widget / shop id */
  widgetId?: string;
  className?: string;
  title?: string;
  description?: string;
  onReady?: () => void;
};

declare global {
  interface Window {
    AxaBook?: {
      init?: (config: { widgetId: string; target: string }) => void;
    };
  }
}

export function BookingWidget({
  provider = "none",
  embedUrl,
  scriptSrc,
  widgetId,
  className,
  title = "Book Appointment",
  description = "Kies je barber, service en tijdstip. Het externe boekingssysteem kan hier naadloos worden geïntegreerd.",
  onReady,
}: BookingWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (provider === "none") return;

    let cancelled = false;

    const initProvider = async () => {
      if (provider === "axabook" && scriptSrc && widgetId && mountRef.current) {
        const existing = document.querySelector<HTMLScriptElement>(
          `script[data-booking-provider="axabook"]`,
        );

        const load = () => {
          if (cancelled) return;
          window.AxaBook?.init?.({
            widgetId,
            target: "#zenizz-booking-mount",
          });
          onReady?.();
        };

        if (existing) {
          load();
          return;
        }

        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.dataset.bookingProvider = "axabook";
        script.onload = load;
        document.body.appendChild(script);
      }

      if (provider === "custom" && embedUrl) {
        onReady?.();
      }
    };

    void initProvider();

    return () => {
      cancelled = true;
    };
  }, [provider, scriptSrc, widgetId, embedUrl, onReady]);

  const showEmbed = provider === "custom" && Boolean(embedUrl);
  const showMount = provider === "axabook";

  return (
    <section
      id="book"
      aria-labelledby="booking-title"
      className={cn("scroll-mt-28", className)}
    >
      <div className="border border-line bg-paper-elevated p-8 md:p-12">
        <p className="eyebrow mb-4">Reservations</p>
        <h2 id="booking-title" className="display text-3xl md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">{description}</p>

        {showEmbed ? (
          <div className="mt-8 overflow-hidden border border-line bg-paper">
            <iframe
              title="Booking system"
              src={embedUrl}
              className="h-[640px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}

        {showMount ? (
          <div
            id="zenizz-booking-mount"
            ref={mountRef}
            className="mt-8 min-h-[320px] border border-dashed border-line bg-paper p-6"
            data-booking-provider="axabook"
            data-widget-id={widgetId}
          />
        ) : null}

        {provider === "none" ? (
          <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                <span className="font-mono uppercase tracking-[0.14em] text-ink">
                  Integration ready
                </span>
              </p>
              <p>
                Vervang deze placeholder door AxaBook of een andere provider via
                de <code className="font-mono text-ink">BookingWidget</code> props:
                <span className="font-mono text-ink"> provider</span>,{" "}
                <span className="font-mono text-ink">embedUrl</span>,{" "}
                <span className="font-mono text-ink">scriptSrc</span> en{" "}
                <span className="font-mono text-ink">widgetId</span>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button href="mailto:hello@zenizz.nl?subject=Afspraak%20aanvraag">
                Request Appointment
              </Button>
              <Button href="tel:+31201234567" variant="secondary">
                Call Studio
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
