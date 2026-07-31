"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,color] duration-500",
          solid
            ? "border-b border-line/80 bg-paper/90 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-paper",
        )}
      >
        <div className="container-wide flex h-[var(--nav-height)] items-center justify-between gap-6">
          <Link
            href="/"
            className="display text-2xl tracking-tight transition-opacity hover:opacity-70"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdnavigatie">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "eyebrow transition-colors duration-300",
                    solid ? "hover:text-ink" : "text-paper/75 hover:text-paper",
                    active && (solid ? "text-ink" : "text-paper"),
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="#book"
              variant={solid ? "primary" : "inverse"}
              size="sm"
              ariaLabel="Book appointment"
            >
              Book Appointment
            </Button>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Sluit menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-full origin-center transition-transform duration-300",
                  solid || open ? "bg-ink" : "bg-paper",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full origin-center transition-transform duration-300",
                  solid || open ? "bg-ink" : "bg-paper",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper pt-[var(--nav-height)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            <nav className="container-page flex h-full flex-col justify-between py-10" aria-label="Mobiel menu">
              <ul className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.5, ease: easeOutExpo }}
                  >
                    <Link
                      href={item.href}
                      className="display block py-3 text-4xl sm:text-5xl"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-6 pb-8">
                <Button href="#book" className="w-full" onClick={() => setOpen(false)}>
                  Book Appointment
                </Button>
                <p className="eyebrow">{siteConfig.tagline}</p>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
