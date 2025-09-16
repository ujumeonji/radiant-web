import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ko", "ja", "zh", "en"],
  defaultLocale: "ko",
  pathnames: {
    "/": "/",
    "/posts/[id]": "/posts/[id]",
    "/topics/[slug]": "/topics/[slug]",
    "/users/[username]": "/users/[username]",
  } as const,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
