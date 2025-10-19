import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUPPORTED_PROVIDERS = new Set(["google", "github"]);

type RouteParams = {
  params: Promise<{ provider: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { provider: providerParam } = await params;
  const provider = providerParam?.toLowerCase();

  if (!provider || !SUPPORTED_PROVIDERS.has(provider)) {
    return NextResponse.json(
      { error: "Unsupported OAuth provider" },
      { status: 400 },
    );
  }

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.BACKEND_URL;

  if (!backendBaseUrl) {
    return NextResponse.json(
      { error: "OAuth backend URL is not configured" },
      { status: 500 },
    );
  }

  const currentUrl = new URL(req.url);
  const destinationUrl = new URL(`/auth/oauth/${provider}`, backendBaseUrl);

  currentUrl.searchParams.forEach((value, key) => {
    destinationUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(destinationUrl.toString());
}
