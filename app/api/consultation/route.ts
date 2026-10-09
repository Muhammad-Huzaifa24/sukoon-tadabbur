export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendMail, adminEmail } from "@/lib/mailer";
import {
  consultationConfirmation,
  adminConsultationAlert,
} from "@/lib/email-templates";
import { isRateLimited } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  if (body.website) return NextResponse.json({ status: "ok" });

  if (isRateLimited(getIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const email: string   = String(body.email   ?? "").trim().toLowerCase();
  const name: string    = String(body.name    ?? "").trim();
  const message: string = String(body.message ?? "").trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await client.from("interest_requests").insert({
    email,
    name:    name    || null,
    message: message || null,
    kind:    "consultation",
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save your request." },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toISOString();

  // Visitor confirmation
  let emailWarning = false;
  try {
    const tpl = consultationConfirmation({ name, message });
    await sendMail({ to: email, ...tpl });
  } catch (err) {
    console.error("[consultation] visitor email failed:", err);
    emailWarning = true;
  }

  // Admin alert — best-effort
  try {
    const tpl = adminConsultationAlert({ email, name, message, submittedAt });
    await sendMail({ to: adminEmail(), replyTo: email, ...tpl });
  } catch (err) {
    console.error("[consultation] admin alert failed:", err);
  }

  return NextResponse.json({
    status: "ok",
    ...(emailWarning && { emailWarning: true }),
  });
}
