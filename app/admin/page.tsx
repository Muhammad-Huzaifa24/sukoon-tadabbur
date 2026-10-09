"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Quill must be loaded client-side only (it accesses `document` on import)
const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-64 animate-pulse rounded-xl border border-border bg-paper" />
  ),
});

const categories = [
  "Reminder",
  "Series",
  "Course",
  "Tadabbur",
  "Consultation",
  "Blog",
] as const;

const empty = {
  title: "",
  excerpt: "",
  body: "",
  category: "Reminder",
  status: "published",
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.authenticated === true));
  }, []);

  function updateField(field: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    const type =
      form.category.toLowerCase() === "course"
        ? "course"
        : form.category.toLowerCase();
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        type,
        access: "free",
        is_featured: false,
        publish_at: new Date().toISOString(),
      }),
    });
    if (response.ok) {
      setMessage("Published to the site.");
      setForm(empty);
    } else {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error ?? "Could not save. Check the admin credentials.");
    }
  }

  async function loadCount() {
    const { count: subscriberCount } = await createClient()
      .from("subscribers")
      .select("id", { count: "exact", head: true });
    setCount(subscriberCount ?? 0);
  }

  // ── Login gate ──────────────────────────────────────────────────────────
  if (!loggedIn)
    return (
      <main className="min-h-screen bg-paper px-6 py-10">
        <div className="mx-auto max-w-md">
          <a href="/" className="cursor-pointer font-serif text-2xl">
            sukoon<span className="text-terracotta">.</span>
          </a>
          <div className="mt-20 rounded-4xl border border-border bg-card p-8">
            <p className="eyebrow">Private studio</p>
            <h1 className="mt-3 text-center font-serif text-2xl">
              Admin sign in.
            </h1>
            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={async (event) => {
                event.preventDefault();
                const response = await fetch("/api/admin/session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ username, password }),
                });
                if (response.ok) setLoggedIn(true);
                else setMessage("Invalid username or password.");
              }}
            >
              <input
                aria-label="Username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border border-border bg-paper px-4 py-3"
              />
              <div className="relative">
                <input
                  aria-label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-paper px-4 py-3 pr-11"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {message && (
                <p className="text-sm text-terracotta">{message}</p>
              )}
              <button
                type="submit"
                className="btn btn-primary"
              >
                Enter studio
              </button>
            </form>
          </div>
        </div>
      </main>
    );

  // ── Content studio ───────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-paper px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <a href="/" className="cursor-pointer font-serif text-2xl">
            sukoon<span className="text-terracotta">.</span>
          </a>
          <button
            type="button"
            className="btn inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-2 text-base"
            onClick={async () => {
              await fetch("/api/admin/session", { method: "DELETE" });
              setLoggedIn(false);
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>

        <div className="mt-16">
          <p className="eyebrow">Content studio</p>
          <h1 className="mt-3 font-serif text-5xl">
            Write something worth returning to.
          </h1>

          <div className="mt-10 rounded-4xl border border-border bg-card p-8">
            <form onSubmit={save} className="flex flex-col gap-4">
              {/* Title */}
              <input
                required
                placeholder="Title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="rounded-xl border border-border bg-paper px-4 py-3"
              />

              {/* Category */}
              <Select
                value={form.category}
                onValueChange={(value) => {
                  if (value) updateField("category", value);
                }}
              >
                <SelectTrigger
                  aria-label="Category"
                  className="!h-[50px] min-h-[50px] w-full cursor-pointer rounded-xl border-border bg-paper px-5 text-base font-medium hover:border-terracotta focus-visible:border-terracotta"
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="cursor-pointer rounded-lg px-3 py-2.5 text-base focus:bg-terracotta/10 focus:text-ink"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Excerpt */}
              <textarea
                required
                placeholder="Short excerpt"
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                className="min-h-16 resize-y rounded-xl border border-border bg-paper px-4 py-3"
              />

              {/* Rich text body */}
              <RichTextEditor
                value={form.body}
                onChange={(value) => updateField("body", value)}
              />

              {/* Actions */}
              <div className="flex sm:flex-row flex-col items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Publish content
                </button>
                <button
                  type="button"
                  onClick={loadCount}
                  className="btn btn-ghost"
                >
                  Check subscribers ({count})
                </button>
              </div>

              {message && (
                <p className="text-sm text-terracotta">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
