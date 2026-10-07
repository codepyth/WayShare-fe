import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Public, indexable static/marketing routes. Add new pages here. */
const staticPaths: `/${string}`[] = ["/"];

/**
 * Dynamic routes (e.g. individual trip listings). Fetch published,
 * indexable records here and map them to entries, for example:
 *
 *   const trips = await getPublishedTrips();
 *   return trips.map((trip) => ({
 *     url: absoluteUrl(`/trips/${trip.id}`),
 *     lastModified: trip.updatedAt,
 *   }));
 *
 * If this grows past 50,000 URLs, split it with generateSitemaps().
 */
async function getDynamicEntries(): Promise<SitemapEntry[]> {
  return Promise.resolve([]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: SitemapEntry[] = staticPaths.map((path) => ({
    url: absoluteUrl(path),
  }));

  return [...staticEntries, ...(await getDynamicEntries())];
}
