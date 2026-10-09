"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ConsultationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data    = new FormData(event.currentTarget);
    const name    = String(data.get("name")    ?? "").trim();
    const email   = String(data.get("email")   ?? "").trim().toLowerCase();
    const message = String(data.get("message") ?? "").trim();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: "" }),
      });
      await res.json();

      if (res.status === 429) {
        toast.error("Too many attempts. Please wait a moment.");
        return;
      }
      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Your note is on its way. We will be in touch soon.");
      formRef.current?.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="mt-8 flex flex-col gap-3"
      aria-label="Consultation request"
    >
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
        name="name"
        placeholder="Your name"
        className="rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <input
        name="email"
        required
        type="email"
        placeholder="Email address"
        className="rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <textarea
        name="message"
        rows={4}
        placeholder="What would you like to explore?"
        className="resize-y rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <button
        disabled={busy}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-paper px-5 py-3 text-sm text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Sending…" : "Request a conversation"}{" "}
        <span aria-hidden="true" className="ml-2">↗</span>
      </button>
    </form>
  );
}
