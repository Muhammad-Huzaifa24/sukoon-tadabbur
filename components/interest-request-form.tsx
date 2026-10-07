"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RequestKind = "waitlist" | "event_registration";

export function InterestRequestForm({
  kind,
  itemId,
  buttonLabel,
}: {
  kind: RequestKind;
  itemId?: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const { error } = await createClient()
      .from("interest_requests")
      .insert({
        email: email.trim().toLowerCase(),
        name: name.trim() || null,
        message: message.trim() || null,
        item_id: itemId ?? null,
        kind,
      });
    setState(error ? "error" : "success");
    if (!error) {
      setEmail("");
      setName("");
      setMessage("");
    }
  }

  if (state === "success")
    return (
      <p className="mt-6 text-sm text-paper/80">
        Thank you. Your request has been received.
      </p>
    );

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
      <input
        required
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name (optional)"
        aria-label="Your name"
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Anything you would like us to know (optional)"
        aria-label="Message"
        rows={3}
        className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/50"
      />
      {state === "error" && (
        <p className="text-sm text-terracotta">
          We could not send that request. Please try again.
        </p>
      )}
      <button
        disabled={state === "sending"}
        className="mt-2 inline-flex w-fit rounded-full bg-paper px-5 py-3 text-sm text-ink disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : buttonLabel}
      </button>
    </form>
  );
}
