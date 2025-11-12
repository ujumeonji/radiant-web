export interface AuthTokens {
  accessToken: string;
  accessTokenExpired: number | null;
  refreshToken?: string;
  refreshTokenExpired?: number | null;
  accountId?: string;
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
    accountId:
      typeof candidate.accountId === "string"
        ? candidate.accountId
        : undefined,
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

/**
 * ISO 8601 날짜 문자열을 타임스탬프(밀리초)로 변환합니다.
 */
function parseIsoDate(dateString: string | null | undefined): number | null {
  if (!dateString) {
    return null;
  }

  try {
    const timestamp = Date.parse(dateString);
    return Number.isNaN(timestamp) ? null : timestamp;
  } catch {
    return null;
  }
}

/**
 * JWT 토큰을 디코딩하여 만료 시간을 추출합니다.
 */
function decodeJwtExpiration(token: string): number | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const parsed = JSON.parse(decoded);

    if (parsed.exp && typeof parsed.exp === "number") {
      return parsed.exp * 1000;
    }

    return null;
  } catch {
    return null;
  }
}

export function parseTokensFromParams(
  params: URLSearchParams,
): AuthTokens | null {
  const accessToken = params.get("accessToken");

  if (accessToken) {
    return {
      accessToken,
      accessTokenExpired: normalizeExpiration(params.get("accessTokenExpired")),
      refreshToken: params.get("refreshToken") ?? undefined,
      refreshTokenExpired: normalizeExpiration(params.get("refreshTokenExpired")),
    };
  }

  // 새로운 OAuth2 형식: token, type, accountId, expiresIn
  const token = params.get("token");
  const type = params.get("type");

  if (!token || type !== "Bearer") {
    return null;
  }

  const accountId = params.get("accountId") ?? undefined;

  // expiresIn 파라미터가 있으면 우선 사용, 없으면 JWT 디코딩
  const expiresIn = params.get("expiresIn");
  const tokenExpired = parseIsoDate(expiresIn) ?? decodeJwtExpiration(token);

  return {
    accessToken: token,
    accessTokenExpired: tokenExpired,
    accountId,
  };
}
