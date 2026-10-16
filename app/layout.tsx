import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { TopBar } from "@/components/shell/top-bar";
import { createRootMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Providers } from "./providers";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Secondary font (plates, figures): don't compete with the primary for preload.
  preload: false,
});

export function generateMetadata(): Metadata {
  return createRootMetadata();
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.lang}
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      {/* Fixed top bar; only <main> scrolls. */}
      <body className="flex h-dvh flex-col overflow-hidden font-sans text-[15px] leading-[1.55]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        <TopBar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain focus:outline-none"
        >
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
