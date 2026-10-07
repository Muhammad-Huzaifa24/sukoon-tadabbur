import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { isAdminSession } from "@/app/api/admin/session/route";

export async function POST(request: Request) {
  const cookie = (await cookies()).get("sukoon_admin_session")?.value;
  if (!isAdminSession(cookie))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const payload = await request.json();
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { error } = await client
    .from("site_content")
    .upsert(payload, { onConflict: "slug" });
  return error
    ? NextResponse.json({ error: error.message }, { status: 400 })
    : NextResponse.json({ ok: true });
}
