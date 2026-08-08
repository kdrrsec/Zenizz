"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] border-b border-black/5 bg-paper text-ink">
        <div className="marquee py-2">
          <div className="marquee-track eyebrow !text-ink/70">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 px-4">
                <span>Istanbul&apos;s finest cut</span>
                <span aria-hidden>·</span>
                <span>Istanbul</span>
                <span aria-hidden>·</span>
                <span>Book your chair</span>
                <span aria-hidden>·</span>
                <span>Premium barber experience</span>
                <span aria-hidden>·</span>
                <span>Zenizz Barbershop</span>
                <span aria-hidden>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <header className="fixed inset-x-0 top-[var(--announce-height)] z-50 border-b border-line bg-paper/95 text-ink backdrop-blur-md">
        <div className="container-wide flex h-[var(--nav-height)] items-center justify-between gap-4">
          <Link
            href="/"
            className="relative z-50 ml-3 flex h-9 w-[150px] items-center transition-opacity hover:opacity-70 sm:ml-6"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/zenizz-logo.png"
              alt={siteConfig.name}
              fill
              priority
              sizes="150px"
              className="object-contain object-left"
            />
          </Link>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Sluit menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-full bg-ink transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-ink transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </div>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hoofdnavigatie">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-mono text-[0.7rem] tracking-[0.08em] text-ink uppercase transition-opacity hover:opacity-55",
                    active && "opacity-100 underline underline-offset-4",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:block">
            <Button href="#book" variant="soft" size="sm" ariaLabel="Book appointment">
              Book Appointment
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper pt-[calc(var(--announce-height)+var(--nav-height))] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <nav className="container-page flex h-full flex-col justify-between py-10" aria-label="Mobiel menu">
              <ul className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.45, ease: easeOutExpo }}
                  >
                    <Link
                      href={item.href}
                      className="display block py-3 text-4xl"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-5 pb-10">
                <Button href="#book" variant="primary" className="w-full" onClick={() => setOpen(false)}>
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
