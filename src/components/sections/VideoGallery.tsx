"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { easeOutExpo } from "@/lib/motion";

type TikTokClip = {
  id: string;
  videoId: string;
  url: string;
  author: string;
};

const clips: TikTokClip[] = [
  {
    id: "v1",
    videoId: "7641913682926177544",
    url: "https://www.tiktok.com/@istanbulbarbershoop/video/7641913682926177544",
    author: "@istanbulbarbershoop",
  },
  {
    id: "v2",
    videoId: "7437082663543950599",
    url: "https://www.tiktok.com/@istanbulbarbershoop/video/7437082663543950599",
    author: "@istanbulbarbershoop",
  },
  {
    id: "v3",
    videoId: "7626633696048598280",
    url: "https://www.tiktok.com/@istanbulbarbershoop/video/7626633696048598280",
    author: "@istanbulbarbershoop",
  },
  {
    id: "v4",
    videoId: "7662279138903870728",
    url: "https://www.tiktok.com/@zenizz.barber/video/7662279138903870728",
    author: "@zenizz.barber",
  },
];

const AUTOPLAY_MS = 8000;

export function VideoGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % clips.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduce, paused]);

  return (
    <section className="border-y border-line bg-soft py-20 md:py-28" aria-labelledby="video-gallery-title">
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <Container wide>
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">On set</p>
            <h2 id="video-gallery-title" className="display text-4xl md:text-6xl">
              Straight from TikTok
            </h2>
          </div>
          <p className="max-w-md text-faded leading-relaxed">
            Echte clips van de zaak. Geluid staat uit tot je zelf op play drukt.
          </p>
        </Reveal>

        <div
          className="relative mx-auto max-w-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[9/16] overflow-hidden bg-line">
            {clips.map((c, i) => (
              <motion.div
                key={c.id}
                animate={{ opacity: i === index ? 1 : 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="absolute inset-0"
                style={{ pointerEvents: i === index ? "auto" : "none", zIndex: i === index ? 1 : 0 }}
                aria-hidden={i !== index}
              >
                <blockquote
                  className="tiktok-embed"
                  cite={c.url}
                  data-video-id={c.videoId}
                  data-embed-from="oembed"
                  style={{ maxWidth: "100%", minWidth: "100%", margin: 0 }}
                >
                  <section />
                </blockquote>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {clips.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Toon video van ${c.author}`}
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
