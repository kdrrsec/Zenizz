"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.08em] uppercase", className)}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 ? <span className="text-faded" aria-hidden>/</span> : null}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={locale === loc}
            className={cn(
              "px-1 transition-opacity",
              locale === loc ? "opacity-100 underline underline-offset-4" : "opacity-50 hover:opacity-80",
            )}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useTranslations();

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 text-ink backdrop-blur-md">
        <div className="container-wide flex h-[var(--nav-height)] items-center justify-between gap-4">
          <Link
            href="/"
            className="relative z-50 ml-3 flex h-9 w-[150px] items-center transition-opacity hover:opacity-70 sm:ml-6"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="relative block h-9 w-[150px] shrink-0 lg:ml-5 lg:h-[40.8px] lg:w-[170px]">
              <Image
                src="/zenizz-logo.png"
                alt={siteConfig.name}
                fill
                priority
                sizes="170px"
                className="object-contain object-left"
              />
            </span>
          </Link>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
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

          <nav className="hidden items-center gap-7 lg:flex" aria-label={t("nav.mainNav")}>
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "corner-trim font-mono text-[0.7rem] tracking-[0.08em] text-ink uppercase transition-opacity hover:opacity-55",
                    active && "opacity-100 underline underline-offset-4",
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 sm:flex">
            <LanguageSwitcher />
            <Button href="/book" variant="soft" size="sm" ariaLabel={t("nav.bookAppointment")}>
              {t("nav.bookAppointment")}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              className="fixed right-3 top-[calc(var(--nav-height)+0.5rem)] z-50 w-[min(80vw,300px)] overflow-hidden rounded-2xl border border-line bg-paper shadow-xl lg:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
            >
              <nav className="flex flex-col p-5" aria-label={t("nav.mobileNav")}>
                <ul className="space-y-1">
                  {navigation.map((item, index) => {
                    const active = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * index, duration: 0.3, ease: easeOutExpo }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity",
                            active ? "opacity-100 underline underline-offset-4" : "opacity-70 hover:opacity-100",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-4 space-y-4 border-t border-line pt-4">
                  <Button href="/book" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                    {t("nav.bookAppointment")}
                  </Button>
                  <div className="flex items-center justify-end">
                    <LanguageSwitcher />
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
