import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/team", "/gallery", "/contact"];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      return {
        url: `${siteConfig.url}${prefix}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
      };
    }),
  );
}
