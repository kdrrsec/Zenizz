import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { formatAddress } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container wide className="py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="display text-4xl md:text-5xl">
              {siteConfig.name}
            </Link>
            <p className="mt-6 max-w-sm text-warm/90 leading-relaxed">
              {siteConfig.tagline} Een modern barbershop atelier in Amsterdam —
              gebouwd rond vakmanschap, rust en aanwezigheid.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-stone mb-5">Navigate</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/85 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-stone mb-5">Visit</p>
            <address className="not-italic space-y-2 text-paper/85 leading-relaxed">
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.postal} {siteConfig.address.city}
              </p>
              <p>
                <a href={siteConfig.phoneHref} className="hover:text-paper transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-paper transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-stone mb-5">Social</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/85 transition-colors hover:text-paper"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/85 transition-colors hover:text-paper"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow text-stone">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-stone">
            {formatAddress(siteConfig.address)}
          </p>
        </div>
      </Container>
    </footer>
  );
}
