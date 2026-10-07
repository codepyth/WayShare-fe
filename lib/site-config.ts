import { z } from "zod";

/**
 * Single source of truth for site-wide identity and environment.
 * Imported by metadata helpers, robots.ts, sitemap.ts and next.config.ts.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so each deployment
 * environment (staging, preview, production) needs its own build with
 * its own values.
 */

const envSchema = z.object({
  // Only "production" is indexable. Anything else (including unset) is noindex.
  NEXT_PUBLIC_SITE_ENV: z
    .enum(["development", "preview", "staging", "production"])
    .default("development"),
  // Public base URL of this deployment, e.g. https://wayshare.example
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

const env = envSchema.parse({
  // Empty strings are treated as unset.
  NEXT_PUBLIC_SITE_ENV: process.env.NEXT_PUBLIC_SITE_ENV || undefined,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
});

export type SiteEnv = typeof env.NEXT_PUBLIC_SITE_ENV;

export const siteEnv: SiteEnv = env.NEXT_PUBLIC_SITE_ENV;

/** True only for the production deployment. Gates all indexing signals. */
export const isIndexable = siteEnv === "production";

if (isIndexable && !env.NEXT_PUBLIC_SITE_URL) {
  // Fail the build rather than ship canonicals pointing at localhost.
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set when NEXT_PUBLIC_SITE_ENV=production",
  );
}

export const siteUrl = new URL(
  env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

/** Resolves a site-relative path to an absolute URL string. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

export const siteConfig = {
  name: "WayShare",
  // TODO: replace with final default description copy.
  description: "WayShare",
  /** Value for <html lang>. */
  lang: "en",
} as const;
