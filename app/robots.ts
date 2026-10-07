import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site-config";

/**
 * Paths crawlers should not fetch in production. Add auth-gated
 * routes here as they're built, e.g. "/login", "/dashboard/", "/booking/".
 *
 * Note: robots.txt only blocks crawling; a blocked URL can still be indexed
 * if linked elsewhere. Pages that must never appear in results should also
 * use `createPageMetadata({ noIndex: true })`.
 */
const disallowedPaths: string[] = [];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    // Non-production: crawling stays allowed on purpose so crawlers can see
    // the noindex meta tag and X-Robots-Tag header (see next.config.ts).
    // Blocking here would hide those signals and still allow URL-only indexing.
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(disallowedPaths.length > 0 && { disallow: disallowedPaths }),
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
