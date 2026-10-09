"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

type RequestKind = "waitlist" | "event_registration";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function InterestRequestForm({
  kind,
  itemId,
  buttonLabel,
}: {
  kind: RequestKind;
  itemId?: string;
  buttonLabel: string;
}) {
  const [email, setEmail]     = useState("");
  const [name, setName]       = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy]       = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalisedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalisedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:   normalisedEmail,
          name:    name.trim(),
          message: message.trim(),
          item_id: itemId ?? null,
          kind,
          website: "", // honeypot
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        toast.error("Too many attempts. Please wait a moment.");
        return;
      }
      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Your request has been received. Thank you.");
      setEmail("");
      setName("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        aria-label="Your name"
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything you would like us to know (optional)"
        aria-label="Message"
        rows={3}
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <button
        disabled={busy}
        className="mt-2 inline-flex w-fit rounded-full bg-paper px-5 py-3 text-sm text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Sending…" : buttonLabel}
      </button>
    </form>
  );
}
