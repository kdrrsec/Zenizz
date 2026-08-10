"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { reviews } from "@/data/reviews";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { easeOutExpo } from "@/lib/motion";

const GOOGLE_PROFILE_URL = "https://maps.google.com/maps?cid=7479869037686330595";
const AUTOPLAY_MS = 6000;

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18v5.97h7.73c4.51-4.16 7.09-10.29 7.09-17.62z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.15 15.89-5.83l-7.73-5.97c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91H2.6v6.16C6.51 42.62 14.62 48 24 48z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59v-6.16H2.6C.94 16.46 0 20.12 0 24c0 3.88.94 7.54 2.6 10.75l7.93-6.16z"
      />
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.6 13.25l7.93 6.16C12.43 13.72 17.74 9.5 24 9.5z"
      />
    </svg>
  );
}

function Stars({ rating, className, label }: { rating: number; className?: string; label: string }) {
  return (
    <div className={className ?? "flex gap-0.5"} aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={i < rating ? "h-3.5 w-3.5 fill-[#FBBC05]" : "h-3.5 w-3.5 fill-line"}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.8l-5.2 2.72.99-5.8-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  const t = useTranslations("reviews");
  const tReviewText = useTranslations("reviewItems");
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce]);

  const review = reviews[index];

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="reviews-title">
      <Container wide>
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">{t("eyebrow")}</p>
            <h2 id="reviews-title" className="display text-4xl md:text-6xl">
              {t("title")}
            </h2>
          </div>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-line px-5 py-3 transition-colors hover:border-ink"
          >
            <GoogleLogo className="h-7 w-7 shrink-0" />
            <span className="flex flex-col gap-1">
              <span className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-ink">5.0</span>
                <Stars rating={5} label={t("srRating", { rating: 5 })} />
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-faded underline-anim">
                {t("googleReviewsCount")}
              </span>
            </span>
          </a>
        </Reveal>

        <div className="relative mx-auto max-w-3xl border-t border-line pt-10 md:pt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: easeOutExpo }}
            >
              <Stars rating={review.rating} className="flex gap-1" label={t("srRating", { rating: review.rating })} />

              <blockquote className="display mt-6 min-h-[6rem] text-2xl !normal-case !tracking-[-0.02em] !leading-snug md:text-4xl">
                &ldquo;{tReviewText(`${review.id}.text`)}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-faded">
                  {review.name} · {tReviewText(`${review.id}.date`)}
                </p>
                <GoogleLogo className="h-5 w-5 shrink-0 opacity-70" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("goToReview", { name: r.name })}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-ink" : "w-1.5 bg-line hover:bg-stone"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
