"use client";

import { useLayoutEffect } from "react";
import { parseTokensFromParams, setAuthTokens } from "@/lib/auth/token-storage";

const TOKEN_QUERY_KEYS = [
  "accessToken",
  "accessTokenExpired",
  "refreshToken",
  "refreshTokenExpired",
] as const;

export default function AuthInitializer() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    const tokens = parseTokensFromParams(url.searchParams);

    if (tokens) {
      setAuthTokens(tokens);
    }

    let sanitized = false;

    TOKEN_QUERY_KEYS.forEach((key) => {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        sanitized = true;
      }
    });

    if (sanitized) {
      const nextSearch = url.searchParams.toString();
      const nextUrl = `${url.pathname}${
        nextSearch ? `?${nextSearch}` : ""
      }${url.hash}`;
      window.history.replaceState(null, "", nextUrl);
    }
  }, []);

  return null;
}
