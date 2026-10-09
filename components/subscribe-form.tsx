"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy]   = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const normalised = email.trim().toLowerCase();

    if (!isValidEmail(normalised)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalised, website: "" }),
      });
      const data = await res.json();

      if (res.status === 429) {
        toast.error("Too many attempts. Please wait a moment.");
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (data.status === "already_subscribed") {
        toast.info("You're already subscribed.");
        return;
      }

      setEmail("");
      toast.success("You're on the list. Welcome.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      {/* Honeypot — visually hidden, bots fill it, real users don't */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
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
      <button
        disabled={busy}
        className="rounded-full bg-ink px-5 py-3 text-sm text-white disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Joining…" : "Join the letters"}
      </button>
    </form>
  );
}
