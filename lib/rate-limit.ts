interface Entry {
  count: number;
  resetAt: number;
}

const store     = new Map<string, Entry>();
const WINDOW_MS = 60_000; // 1-minute window
const MAX_HITS  = 5;      // requests per IP per window

export function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_HITS;
}

// Prune stale entries to prevent unbounded memory growth.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, WINDOW_MS * 5);
}
