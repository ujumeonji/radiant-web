export interface AuthTokens {
  accessToken: string;
  accessTokenExpired: number | null;
  refreshToken?: string;
  refreshTokenExpired?: number | null;
}

const STORAGE_KEY = "auth.tokens";

let inMemoryTokens: AuthTokens | null = null;

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function normalizeExpiration(
  value: string | number | null | undefined,
): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : (value as number);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  const timestamp = parsed < 1_000_000_000_000 ? parsed * 1000 : parsed;
  return Math.trunc(timestamp);
}

function normalizeTokens(raw: unknown): AuthTokens | null {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }

  const candidate = raw as Record<string, unknown>;
  const accessToken = candidate.accessToken;

  if (typeof accessToken !== "string" || accessToken.trim() === "") {
    return null;
  }

  return {
    accessToken,
    accessTokenExpired: normalizeExpiration(
      candidate.accessTokenExpired as string | number | null | undefined,
    ),
    refreshToken:
      typeof candidate.refreshToken === "string"
        ? candidate.refreshToken
        : undefined,
    refreshTokenExpired: normalizeExpiration(
      candidate.refreshTokenExpired as string | number | null | undefined,
    ),
  };
}

export function setAuthTokens(tokens: AuthTokens) {
  inMemoryTokens = tokens;

  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // no-op: storage quota or access issues should not break flow
  }
}

export function clearAuthTokens() {
  inMemoryTokens = null;

  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getAuthTokens(): AuthTokens | null {
  if (inMemoryTokens) {
    return inMemoryTokens;
  }

  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const normalized = normalizeTokens(parsed);
    inMemoryTokens = normalized;
    return normalized;
  } catch {
    storage.removeItem(STORAGE_KEY);
    return null;
  }
}

function isExpired(expiredAt: number | null | undefined): boolean {
  if (!expiredAt) {
    return false;
  }

  const now = Date.now();
  return now >= expiredAt - 1000;
}

export function getValidAccessToken(): string | null {
  const tokens = getAuthTokens();

  if (!tokens?.accessToken) {
    return null;
  }

  if (isExpired(tokens.accessTokenExpired)) {
    return null;
  }

  return tokens.accessToken;
}

export function parseTokensFromParams(
  params: URLSearchParams,
): AuthTokens | null {
  const accessToken = params.get("accessToken");

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    accessTokenExpired: normalizeExpiration(params.get("accessTokenExpired")),
    refreshToken: params.get("refreshToken") ?? undefined,
    refreshTokenExpired: normalizeExpiration(params.get("refreshTokenExpired")),
  };
}
