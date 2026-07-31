import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { formatAddress } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container wide className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-sm font-semibold tracking-[0.14em] uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-5 max-w-sm text-faded leading-relaxed">
              Join us. Be first to know about openings, seasonal rituals, and atelier news.
            </p>
            <form
              className="mt-6 flex max-w-md gap-2"
              action={`mailto:${siteConfig.email}`}
              method="get"
            >
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>
              <input
                id="footer-email"
                name="body"
                type="email"
                required
                placeholder="Email"
                className="w-full border border-line bg-soft px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-ink"
              />
              <Button type="submit" variant="primary" size="sm">
                Sign up
              </Button>
            </form>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-anim text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Visit</p>
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
            <p className="eyebrow mb-4">Follow</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="underline-anim">
                  Instagram
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
