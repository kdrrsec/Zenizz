import Image from "next/image";
import { siteConfig } from "@/data/site";

export type OrderSummaryLine = {
  label: string;
  price?: string;
};

export type OrderSummaryProps = {
  title: string;
  placeholder: string;
  subtotalLabel: string;
  professional?: { name: string; image?: string } | null;
  service?: { name: string; price: string } | null;
  addOns?: OrderSummaryLine[];
  dateTimeLabel?: string | null;
  subtotal?: string | null;
};

export function OrderSummary({
  title,
  placeholder,
  subtotalLabel,
  professional,
  service,
  addOns = [],
  dateTimeLabel,
  subtotal,
}: OrderSummaryProps) {
  const hasAnySelection = Boolean(professional || service);

  return (
    <div className="border border-line bg-paper p-6 lg:sticky lg:top-8">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-stone">{title}</p>
      <p className="mt-1 font-mono text-sm font-semibold">{siteConfig.name}</p>

      {!hasAnySelection ? (
        <p className="mt-6 text-sm text-faded">{placeholder}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {professional ? (
            <div className="flex items-center gap-3">
              {professional.image ? (
                <span className="relative h-9 w-9 shrink-0 overflow-hidden border border-line bg-soft">
                  <Image src={professional.image} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ) : null}
              <span className="font-mono text-sm font-semibold">{professional.name}</span>
            </div>
          ) : null}

          {service ? (
            <div className="flex items-start justify-between gap-3 font-mono text-sm">
              <span>{service.name}</span>
              <span className="shrink-0 font-semibold">{service.price}</span>
            </div>
          ) : null}

          {addOns.map((line) => (
            <div key={line.label} className="flex items-start justify-between gap-3 font-mono text-xs text-faded">
              <span>{line.label}</span>
              {line.price ? <span className="shrink-0">{line.price}</span> : null}
            </div>
          ))}

          {dateTimeLabel ? (
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-faded">{dateTimeLabel}</p>
          ) : null}
        </div>
      )}

      {subtotal ? (
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-stone">{subtotalLabel}</span>
          <span className="font-mono text-sm font-semibold">{subtotal}</span>
        </div>
      ) : null}
    </div>
  );
}
