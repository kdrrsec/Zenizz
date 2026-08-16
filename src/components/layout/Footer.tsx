"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { images, navigation, siteConfig } from "@/data/site";
import { formatAddress } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/book") return null;

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container wide className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="relative h-9 w-[150px]" aria-hidden="true">
              <Image
                src={images.logo}
                alt=""
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <span className="sr-only">{siteConfig.name}</span>
            <p className="mt-5 max-w-sm text-faded leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">{t("footer.navigate")}</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-anim text-sm">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">{t("footer.visit")}</p>
            <address className="not-italic space-y-2 text-sm text-faded leading-relaxed">
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.postal} {siteConfig.address.city}
              </p>
              <p>
                <a href={siteConfig.phoneHref} className="underline-anim text-ink">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="underline-anim text-ink">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">{t("footer.follow")}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="underline-anim">
                  {t("footer.instagram")}
                </a>
              </li>
              <li>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="underline-anim">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-faded">
            © {year} {siteConfig.name}
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.06em] uppercase text-faded">
            {formatAddress(siteConfig.address)}
          </p>
        </div>

        <div className="mt-4 border-t border-line pt-4 text-center">
          <a
            href="https://axaweb.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-anim font-mono text-[0.65rem] tracking-[0.08em] uppercase text-faded"
          >
            Powered by Axaweb.nl
          </a>
        </div>
      </Container>
    </footer>
  );
}
