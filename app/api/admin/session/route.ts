import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const COOKIE = "sukoon_admin_session";
const maxAge = 60 * 60 * 8;

function token(username: string) {
  const payload = Buffer.from(
    JSON.stringify({ username, exp: Date.now() + maxAge * 1000 }),
  ).toString("base64url");
  const signature = createHmac("sha256", process.env.ADMIN_PASSWORD ?? "")
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function valid(value: string | undefined) {
  if (!value || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME)
    return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", process.env.ADMIN_PASSWORD)
    .update(payload)
    .digest("base64url");
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  )
    return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return (
      data.username === process.env.ADMIN_USERNAME && data.exp > Date.now()
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    authenticated: valid(
      request.headers
        .get("cookie")
        ?.match(new RegExp(`${COOKIE}=([^;]+)`))?.[1],
    ),
  });
}

export async function POST(request: Request) {
  const { username, password } = await request.json().catch(() => ({}));
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  )
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 },
    );
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(COOKIE, token(username), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export { valid as isAdminSession };
