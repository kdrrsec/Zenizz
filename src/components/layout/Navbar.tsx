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
    setScrolled(value > 10);
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
      {/* Thin announcement bar */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-paper text-ink">
        <div className="marquee py-[0.4rem]">
          <div className="marquee-track font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink/50">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-7 px-2">
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
          "fixed inset-x-0 top-[var(--announce-height)] z-50 transition-[background-color,backdrop-filter,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "bg-paper/85 text-ink backdrop-blur-md"
            : "bg-transparent text-paper",
        )}
      >
        {/*
          Full-bleed editorial bar.
          Layer 1 (absolute): nav links centered to the VIEWPORT.
          Layer 2 (flex): logo flush left + CTA flush right.
          CTA can never sit between the links.
        */}
        <div className="relative mx-auto flex h-[var(--nav-height)] w-full max-w-[96rem] items-center px-6 md:px-10 lg:px-14">
          {/* Centered navigation — viewport middle */}
          <nav
            className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
            aria-label="Primary"
          >
            <ul className="pointer-events-auto flex items-center gap-10 xl:gap-12">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative inline-block py-2 font-mono text-[0.65rem] tracking-[0.18em] uppercase transition-opacity duration-400",
                        solid
                          ? "text-ink/75 hover:text-ink"
                          : "text-paper/75 hover:text-paper",
                        active && (solid ? "text-ink" : "text-paper"),
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 mx-auto h-px origin-center scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logo — completely left */}
          <Link
            href="/"
            className="relative z-10 inline-flex shrink-0 items-center transition-opacity duration-400 hover:opacity-55"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo variant={solid ? "dark" : "light"} />
          </Link>

          {/* Right cluster — CTA desktop / menu mobile */}
          <div className="relative z-10 ml-auto flex shrink-0 items-center">
            <div className="hidden lg:block">
              <Button
                href="#book"
                variant={solid ? "secondary" : "outlineLight"}
                size="sm"
                ariaLabel="Book appointment"
                className={cn(
                  "!px-5 !py-2.5 tracking-[0.14em]",
                  solid && "border-ink/25 hover:border-ink",
                )}
              >
                Book Appointment
              </Button>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="flex w-[1.1rem] flex-col gap-[7px]">
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
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <nav
              className="mx-auto flex h-full w-full max-w-[96rem] flex-col justify-between px-6 pb-14 pt-[calc(var(--announce-height)+var(--nav-height)+3rem)] md:px-10"
              aria-label="Mobile"
            >
              <ul>
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.55, ease: easeOutExpo }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-ink/[0.07] py-6 font-mono text-[0.75rem] tracking-[0.22em] uppercase text-ink/80 transition-colors duration-300 hover:text-ink"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.55, ease: easeOutExpo }}
              >
                <Button
                  href="#book"
                  variant="primary"
                  className="w-full tracking-[0.14em]"
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </Button>
                <p className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink/35">
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
