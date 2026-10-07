"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    const { error } = await createClient()
      .from("subscribers")
      .upsert({ email, is_active: true }, { onConflict: "email" });
    setMessage(
      error ? "We could not save that email yet." : "You are on the list.",
    );
    if (!error) setEmail("");
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="subscriber-email">
        Email address
      </label>
      <input
        id="subscriber-email"
        required
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-full border border-border bg-paper px-5 py-3 text-sm outline-none"
      />
      <button className="rounded-full bg-ink px-5 py-3 text-sm text-white">
        Join the letters
      </button>
      {message && (
        <span role="status" className="text-sm text-olive sm:self-center">
          {message}
        </span>
      )}
    </form>
  );
}
