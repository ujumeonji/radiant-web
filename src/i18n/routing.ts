import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ko", "ja", "zh", "en"],

  // Used when no locale matches
  defaultLocale: "ko",

  // The `pathnames` object holds pairs of internal and external paths.
  // Based on the locale, the external paths are rewritten to the shared,
  // internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be provided for all locales
    "/": "/",
    "/posts/[id]": "/posts/[id]",
    "/topics/[slug]": "/topics/[slug]",
    "/authors/[username]": "/authors/[username]",
  } as const,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
