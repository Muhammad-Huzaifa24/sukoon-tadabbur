export const runtime = "nodejs";

import { promises as dns } from "dns";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendMail, adminEmail } from "@/lib/mailer";
import {
  subscribeWelcome,
  adminSubscribeAlert,
} from "@/lib/email-templates";
import { isRateLimited } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function hasMxRecord(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false; // domain doesn't exist or has no MX records
  }
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // Honeypot — bots fill hidden fields, real users don't
  if (body.website) {
    return NextResponse.json({ status: "ok" });
  }

  // Rate limit
  if (isRateLimited(getIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const email: string = String(body.email ?? "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  // MX record check — reject domains that cannot receive email
  const mxValid = await hasMxRecord(email);
  if (!mxValid) {
    return NextResponse.json(
      {
        error:
          "That email address doesn't look right. Please check the domain and try again.",
      },
      { status: 400 },
    );
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: existing } = await client
    .from("subscribers")
    .select("id, is_active")
    .eq("email", email)
    .maybeSingle();

  if (existing?.is_active) {
    return NextResponse.json({ status: "already_subscribed" });
  }

  const submittedAt = new Date().toISOString();
  let status: "subscribed" | "reactivated";

  if (existing) {
    await client
      .from("subscribers")
      .update({ is_active: true })
      .eq("email", email);
    status = "reactivated";
  } else {
    const { error } = await client
      .from("subscribers")
      .insert({ email, is_active: true });
    if (error) {
      if (error.code === "23505")
        return NextResponse.json({ status: "already_subscribed" });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    status = "subscribed";
  }

  // Fire emails without awaiting — user gets instant response
  sendMail({ to: email, ...subscribeWelcome(email) }).catch((err) =>
    console.error("[subscribe] visitor email failed:", err),
  );
  sendMail({
    to: adminEmail(),
    replyTo: email,
    ...adminSubscribeAlert({ email, submittedAt }),
  }).catch((err) => console.error("[subscribe] admin alert failed:", err));

  return NextResponse.json({ status });
}
