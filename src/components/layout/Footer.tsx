import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigation, siteConfig } from "@/data/site";
import { formatAddress } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container wide className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-sm font-semibold tracking-[0.14em] uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-5 max-w-sm text-faded leading-relaxed">{t("footer.newsletter")}</p>
            <form
              className="mt-6 flex max-w-md gap-2"
              action={`mailto:${siteConfig.email}`}
              method="get"
            >
              <label className="sr-only" htmlFor="footer-email">
                {t("footer.emailLabel")}
              </label>
              <input
                id="footer-email"
                name="body"
                type="email"
                required
                placeholder={t("footer.emailPlaceholder")}
                className="w-full border border-line bg-soft px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-ink"
              />
              <Button type="submit" variant="primary" size="sm">
                {t("footer.signUp")}
              </Button>
            </form>
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
      </Container>
    </footer>
  );
}
