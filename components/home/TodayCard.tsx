interface TodayCardProps {
  title: string;
  excerpt: string;
  createdAt: string | null;
}

export function TodayCard({ title, excerpt, createdAt }: TodayCardProps) {
  const now = createdAt ? new Date(createdAt) : new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en", { month: "short" });

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="wrap reveal">
        <article className="today-card">
          {/* Date tile */}
          <div className="date-tile" aria-hidden="true">
            <div className="date-tile__spin" />
            <div style={{ position: "relative" }}>
              <strong style={{ display: "block", fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
                {day}
              </strong>
              <small style={{ font: "600 11px var(--font-geist)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                {month}
              </small>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="pill">Free · Daily</span>
            <h3 style={{ fontSize: 34, margin: "10px 0 8px" }}>
              {title || "Begin with one quiet minute"}
            </h3>
            <p style={{ color: "var(--ink-soft)" }}>
              {excerpt || "Small words, held gently. Read slowly, then carry one line into your day."}
            </p>
          </div>

          {/* CTA */}
          <a href="/reminders" className="btn btn-ghost">
            All reminders <span className="arr">→</span>
          </a>
        </article>
      </div>

      <style>{`
        .today-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 40px;
          align-items: center;
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 28px;
          padding: 40px 48px;
        }
        .date-tile {
          width: 96px; height: 96px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          display: grid;
          place-items: center;
          text-align: center;
          font-family: var(--font-display);
          position: relative;
        }
        .date-tile__spin {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed var(--line);
          animation: spin-slow 24s linear infinite;
        }
        .pill {
          display: inline-block;
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 999px;
          background: var(--moss);
          color: var(--paper);
          font-weight: 500;
        }
        @media (max-width: 760px) {
          .today-card { grid-template-columns: 1fr !important; padding: 28px !important; }
        }
      `}</style>
    </section>
  );
}
