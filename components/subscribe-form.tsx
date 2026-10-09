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
      if (res.status === 429) { toast.error("Too many attempts. Please wait a moment."); return; }
      if (!res.ok)            { toast.error(data.error ?? "Something went wrong. Please try again."); return; }
      if (data.status === "already_subscribed") { toast.info("You're already subscribed."); return; }
      setEmail("");
      toast.success("You're on the list. Welcome.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="subscribe-pill">
        {/* Honeypot */}
        <input type="text" name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
        <label htmlFor="subscriber-email" style={{ position: "absolute", left: -9999 }}>Email address</label>
        <input
          id="subscriber-email"
          required
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="subscribe-pill__input"
        />
        <button type="submit" disabled={busy} className="btn btn-primary subscribe-pill__btn">
          {busy ? "Joining…" : "Join the letters"}
        </button>
      </form>

      <style>{`
        .subscribe-pill {
          display: flex;
          gap: 10px;
          padding: 8px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: var(--paper-2);
          position: relative;
        }
        .subscribe-pill__input {
          flex: 1;
          min-width: 0;
          border: 2px solid transparent;
          border-radius: 999px;
          background: transparent;
          padding: 10px 18px;
          font-family: var(--font-geist), sans-serif;
          font-size: 18px;
          color: var(--ink);
          outline: none !important;
          transition: border-color .3s;
        }
        .subscribe-pill__input::placeholder {
          color: var(--ink-soft);
        }
        .subscribe-pill__input:focus {
          border-color: var(--gold);
        }
        .subscribe-pill__btn {
          padding: 12px 22px !important;
          font-size: 14px !important;
          flex-shrink: 0;
        }
        .subscribe-pill__btn:disabled {
          cursor: wait;
          opacity: .6;
        }
        @media (max-width: 600px) {
          .subscribe-pill__input { font-size: 12px; }
        }
      `}</style>
    </>
  );
}
