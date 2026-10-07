import type { Metadata } from "next";
import { isIndexable, siteConfig, siteUrl } from "./site-config";

/**
 * Metadata conventions for every route.
 *
 * Next.js merges metadata between segments *shallowly*: a page that sets
 * `openGraph`, `twitter` or `robots` replaces the parent's object entirely.
 * Always build page metadata through `createPageMetadata` so those objects
 * are complete and the environment noindex guard can't be dropped.
 */

export type SocialImage = {
  /** Absolute URL, or a path resolved against metadataBase. */
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

/** Served by app/opengraph-image.tsx. */
export const defaultSocialImage: SocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

/**
 * Robots directives. Outside production everything is noindex/nofollow,
 * regardless of what the page asks for.
 */
function buildRobots(noIndex: boolean): Metadata["robots"] {
  const index = isIndexable && !noIndex;
  const follow = isIndexable;
  return { index, follow, googleBot: { index, follow } };
}

function buildSocial({
  title,
  description,
  image,
  path,
  type,
}: {
  title: string;
  description: string;
  image: SocialImage;
  path?: string;
  type: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      siteName: siteConfig.name,
      title,
      description,
      images: [image],
      ...(path !== undefined && { url: path }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/**
 * Site-wide defaults for app/layout.tsx.
 *
 * Deliberately sets no `alternates.canonical`: a canonical here would be
 * inherited by every page that forgets its own, pointing them all at "/".
 * Canonicals come from `createPageMetadata` instead.
 */
export function createRootMetadata(): Metadata {
  return {
    metadataBase: siteUrl,
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    robots: buildRobots(false),
    ...buildSocial({
      title: siteConfig.name,
      description: siteConfig.description,
      image: defaultSocialImage,
      type: "website",
    }),
  };
}

export type PageMetadataOptions = {
  /** Route path, used for the canonical URL and og:url, e.g. "/trips/abc". */
  path: `/${string}`;
  /** Page title; the root template appends " | WayShare". Omit to use the site default. */
  title?: string;
  description?: string;
  image?: SocialImage;
  /** Exclude this page from indexing even in production (e.g. login, dashboard, booking). */
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Per-page metadata. Use in `export const metadata` or `generateMetadata`:
 *
 *   export const metadata = createPageMetadata({ path: "/about", title: "About" });
 *
 *   export async function generateMetadata({ params }: PageProps<"/trips/[id]">) {
 *     const { id } = await params;
 *     const trip = await getTrip(id);
 *     return createPageMetadata({ path: `/trips/${id}`, title: trip.title });
 *   }
 */
export function createPageMetadata({
  path,
  title,
  description = siteConfig.description,
  image = defaultSocialImage,
  noIndex = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  return {
    ...(title !== undefined && { title }),
    description,
    alternates: { canonical: path },
    robots: buildRobots(noIndex),
    ...buildSocial({
      title: title ?? siteConfig.name,
      description,
      image,
      path,
      type,
    }),
  };
}
