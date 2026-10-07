import type { NextConfig } from "next";
import { isIndexable } from "./lib/site-config";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smaller), WebP fallback; negotiated via the Accept header.
    // deviceSizes, imageSizes and qualities ([75]) use the Next.js defaults.
    formats: ["image/avif", "image/webp"],
  },

  headers() {
    if (isIndexable) return Promise.resolve([]);
    // Non-production: noindex every response (HTML, images, files),
    // independent of any page-level metadata.
    return Promise.resolve([
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]);
  },
};

export default nextConfig;
