import type { NextConfig } from "next";
import { isIndexable } from "./lib/site-config";

/** Django API origin, server-side only; the browser calls same-origin `/api`. */
const apiOrigin = new URL(process.env.API_ORIGIN ?? "https://wayshare-be.onrender.com")
  .origin;

const nextConfig: NextConfig = {
  // Hide the dev badge; errors still show.
  devIndicators: false,

  images: {
    // AVIF first (smaller), WebP fallback.
    formats: ["image/avif", "image/webp"],
  },

  rewrites() {
    return Promise.resolve([
      {
        // Next.js strips trailing slashes; Django needs them, so add it back.
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*/`,
      },
    ]);
  },

  headers() {
    if (isIndexable) return Promise.resolve([]);
    // Non-production: noindex every response.
    return Promise.resolve([
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]);
  },
};

export default nextConfig;
