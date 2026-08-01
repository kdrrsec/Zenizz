"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 12);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <>
      {/* Thin announcement ticker */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-paper text-ink">
        <div className="marquee py-[0.45rem]">
          <div className="marquee-track font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink/55">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-3">
                <span>Istanbul</span>
                <span aria-hidden>·</span>
                <span>Book your chair</span>
                <span aria-hidden>·</span>
                <span>Zenizz</span>
                <span aria-hidden>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-[var(--announce-height)] z-50 transition-[background-color,color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "bg-paper/80 text-ink backdrop-blur-[14px]"
            : "bg-transparent text-paper",
        )}
      >
        {/*
          Three-zone editorial bar:
          logo left · links truly centered · CTA right
        */}
        <div className="container-wide relative grid h-[var(--nav-height)] grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: menu (mobile) + logo */}
          <div className="flex items-center gap-3 justify-self-start lg:gap-0">
            <button
              type="button"
              className="relative z-50 flex h-11 w-11 -ml-2 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="flex w-[1.15rem] flex-col gap-[7px]">
                <span
                  className={cn(
                    "block h-px w-full origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    solid || open ? "bg-ink" : "bg-paper",
                    open && "translate-y-[4px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-full origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    solid || open ? "bg-ink" : "bg-paper",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </div>
            </button>

            <Link
              href="/"
              className="inline-flex items-center transition-opacity duration-400 hover:opacity-60"
              aria-label={`${siteConfig.name} home`}
            >
              <Logo variant={solid ? "dark" : "light"} />
            </Link>
          </div>

          {/* Center: desktop links */}
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 lg:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative font-mono text-[0.68rem] tracking-[0.16em] uppercase transition-opacity duration-400",
                    solid ? "text-ink/80 hover:text-ink" : "text-paper/80 hover:text-paper",
                    active && (solid ? "text-ink" : "text-paper"),
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA */}
          <div className="justify-self-end">
            <div className="hidden sm:block">
              <Button
                href="#book"
                variant={solid ? "secondary" : "outlineLight"}
                size="sm"
                ariaLabel="Book appointment"
                className={cn(
                  "!px-5 !py-2.5 tracking-[0.14em]",
                  solid && "border-ink/20 hover:border-ink",
                )}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper/98 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <nav
              className="container-wide flex h-full flex-col justify-between pb-12 pt-[calc(var(--announce-height)+var(--nav-height)+2.5rem)]"
              aria-label="Mobile"
            >
              <ul className="space-y-0">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.55, ease: easeOutExpo }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-ink/8 py-5 font-mono text-[0.8rem] tracking-[0.2em] uppercase text-ink/85 transition-colors hover:text-ink"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55, ease: easeOutExpo }}
              >
                <Button
                  href="#book"
                  variant="primary"
                  className="w-full tracking-[0.14em]"
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </Button>
                <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-ink/40">
                  Istanbul · Türkiye
                </p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
