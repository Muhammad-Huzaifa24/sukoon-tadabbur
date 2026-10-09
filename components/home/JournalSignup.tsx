import { SubscribeForm } from "@/components/subscribe-form";

export function JournalSignup() {
  return (
    <section style={{ padding: "112px 0", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="journal-grid">
          {/* Left */}
          <div className="reveal">
            {/* Mail icon */}
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              style={{ width: 64, height: 64, marginBottom: 18, color: "var(--moss)" }}
            >
              <rect
                className="icon-letter"
                x="20" y="10" width="26" height="18" rx="2"
                fill="var(--paper-2)"
                stroke="var(--moss)"
                strokeWidth="1.2"
              />
              <rect
                x="8" y="24" width="48" height="30" rx="3"
                fill="none" stroke="currentColor"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                className="icon-flap"
                d="M8 24l24 14 24-14"
                fill="none" stroke="currentColor"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <p className="eyebrow">The journal</p>
            <h2 style={{ fontSize: "clamp(40px,5vw,64px)", margin: "14px 0 20px" }}>
              A letter for <em>your inbox.</em>
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 18, maxWidth: "42ch" }}>
              Occasional notes on attention, faith, and the quiet work of becoming.
            </p>
          </div>

          {/* Right */}
          <div className="reveal" style={{ ["--d" as string]: "150ms" }}>
            <SubscribeForm />
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 12, paddingLeft: 18 }}>
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .journal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .journal-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
