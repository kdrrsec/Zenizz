"use client";

import { Suspense, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BOOKING_MOUNT_ID } from "@/lib/booking";
import { QuickBookingFlow } from "@/components/booking/QuickBookingFlow";

/**
 * BookingWidget: renders the built-in quick booking flow by default.
 *
 * To connect AxaBook or another provider instead:
 * 1. Set `provider` to "axabook" (or your provider id)
 * 2. Pass `embedUrl` or `scriptSrc` + `widgetId`
 * 3. Optionally pass `onReady` for analytics hooks
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
  title,
  description,
  onReady,
}: BookingWidgetProps) {
  const t = useTranslations("booking");
  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedDescription = description ?? t("defaultDescription");
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
            target: `#${BOOKING_MOUNT_ID}`,
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
      <div className="border border-line bg-soft p-8 md:p-12">
        <p className="eyebrow mb-4">{t("reservations")}</p>
        <h2 id="booking-title" className="display text-3xl md:text-5xl">
          {resolvedTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-faded leading-relaxed">{resolvedDescription}</p>

        {showEmbed ? (
          <div className="mt-8 overflow-hidden border border-line bg-paper">
            <iframe
              title={t("defaultTitle")}
              src={embedUrl}
              className="h-[640px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}

        {showMount ? (
          <div
            id={BOOKING_MOUNT_ID}
            ref={mountRef}
            className="mt-8 min-h-[320px] border border-dashed border-line bg-paper p-6"
            data-booking-provider="axabook"
            data-widget-id={widgetId}
          />
        ) : null}

        {provider === "none" ? (
          <Suspense fallback={null}>
            <QuickBookingFlow />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
}
