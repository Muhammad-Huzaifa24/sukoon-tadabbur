export function LiveSection() {
  return (
    <section style={{ padding: "80px 0 112px", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="live-card reveal">

          {/* ── Left column ───────────────── */}
          <div>
            <span className="live-badge">
              <span className="live-dot" aria-hidden="true" />
              Live reflection
            </span>

            <h2 className="live-heading">
              Gather in <em>good company.</em>
            </h2>

            <p className="live-desc">
              Sessions are held online, in a small circle of readers. The join
              link is emailed to you on request.
            </p>

            <div className="live-actions">
              <a href="/tadabbur" className="btn btn-dark">
                See upcoming sessions <span className="arr">→</span>
              </a>
              {/* Wave bars */}
              <div className="live-eq" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <i
                    key={i}
                    style={{
                      animationDelay: [".0s", ".2s", ".4s", ".1s"][i],
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — next session panel ── */}
          <aside className="live-next" aria-label="Next session">
            <div className="live-next__shine" aria-hidden="true" />
            <p className="live-next__label">Next session</p>
            <h3 className="live-next__title">
              Five Days of Returning, Reflection Circle
            </h3>
            <div className="live-countdown" role="timer" aria-live="off">
              {[
                { id: "d", label: "Days",  val: "03" },
                { id: "h", label: "Hours", val: "14" },
                { id: "m", label: "Min",   val: "22" },
                { id: "s", label: "Sec",   val: "00" },
              ].map(({ id, label, val }) => (
                <div key={id} className="live-countdown__cell">
                  <strong>{val}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="live-avatars">
              <div className="live-avatars__stack">
                {["A", "M", "S", "+"].map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </div>
              <span>Join 24 readers this week</span>
            </div>
          </aside>
        </div>
      </div>

            <style>{`
        .live-card {
          position: relative;
          border-radius: 36px;
          background: var(--paper-2);
          border: 1px solid var(--line);
          padding: clamp(32px,5vw,64px);
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 48px;
          overflow: hidden;
          color: var(--ink);
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 14px; border-radius: 999px;
          background: var(--moss); color: var(--paper);
          font-family: var(--font-geist); font-size: 12px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff6b5b; flex-shrink: 0; position: relative;
        }
        .live-dot::after {
          content: ""; position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid #ff6b5b;
          animation: live-ping 1.8s var(--ease) infinite;
        }
        @keyframes live-ping { to { transform: scale(2.2); opacity: 0; } }
        .live-heading {
          font-family: var(--font-display);
          font-size: clamp(40px,5vw,64px);
          font-weight: 400;
          letter-spacing: -.02em;
          line-height: 1.02;
          margin: 14px 0 18px;
          color: var(--ink);
        }
        .live-heading em { color: var(--gold); font-style: italic; }
        .live-desc { color: var(--ink-soft); font-size: 17px; max-width: 42ch; margin-bottom: 30px; }
        .live-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .btn-dark {
          background: var(--moss); color: var(--paper);
        }
        .btn-dark::before { background: var(--gold); }
        .live-eq { display:flex; gap:4px; align-items:flex-end; height:26px; margin-left:8px; }
        .live-eq i { display:block; width:4px; height:40%; background:var(--gold); border-radius:3px; animation:eq 1.1s ease-in-out infinite; }

        /* ── Next session panel ── */
        .live-next {
          background: var(--moss-deep);
          color: var(--paper);
          border-radius: 26px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .live-next__shine {
          position: absolute; inset: -40% -20%;
          background: radial-gradient(closest-side, color-mix(in srgb, var(--gold) 18%, transparent), transparent);
          pointer-events: none;
          animation: live-float 8s ease-in-out infinite alternate;
        }
        @keyframes live-float { to { transform: translate(30px, 20px); } }
        .live-next__label {
          font-family: var(--font-geist);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: .85;
        }
        .live-next__title {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: 32px;
          line-height: 1.15;
          margin: 10px 0 22px;
          color: var(--paper);
        }
        .live-countdown {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 26px;
        }
        .live-countdown__cell {
          background: rgba(236,229,214,.07);
          border: 1px solid rgba(236,229,214,.12);
          border-radius: 16px; padding: 14px 6px; text-align: center;
        }
        .live-countdown__cell strong {
          display: block;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 32px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          color: var(--paper);
        }
        .live-countdown__cell span {
          font-size: 11px; letter-spacing: .12em;
          text-transform: uppercase; opacity: .7;
          color: var(--paper);
        }
        .live-avatars { display:flex; align-items:center; gap:12px; font-size:14px; opacity:.85; color: var(--paper); }
        .live-avatars__stack { display:flex; }
        .live-avatars__stack span {
          width:34px; height:34px; border-radius:50%;
          display:grid; place-items:center;
          font-family: var(--font-geist); font-size: 12px; font-weight: 600;
          color: var(--moss);
          border: 2px solid var(--moss-deep);
          margin-left: -10px;
          background: color-mix(in srgb, var(--gold) 55%, var(--paper));
        }
        .live-avatars__stack span:first-child { margin-left:0; }
        .live-avatars__stack span:nth-child(2) { background: var(--paper); }
        .live-avatars__stack span:nth-child(3) { background: color-mix(in srgb, var(--moss) 40%, var(--paper)); color: var(--paper); }
        .live-avatars__stack span:nth-child(4) { background: var(--gold); }

        @media (max-width: 860px) {
          .live-card { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </section>
  );
}
