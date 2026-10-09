interface HeroProps {
  quote: string;
  reminderDate: string | null;
}

const words = [
  { text: "Small",     em: false },
  { text: "words",     em: false },
  { text: "for",       em: false },
  { text: "returning", em: true  },
  { text: "to",        em: false },
  { text: "what",      em: false },
  { text: "matters.",  em: false },
];

export function Hero({ quote, reminderDate }: HeroProps) {
  const dateStr = reminderDate
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(reminderDate))
    : "Today";

  return (
    <section className="hero-section">
      {/* Ambient blob */}
      <div className="hero-blob" aria-hidden="true" />

      <div className="wrap hero-grid">
        {/* ── Left column ─────────────────────────── */}
        <div>
          <p className="eyebrow reveal in">A space to return to what matters</p>
          <h1 className="hero-h1">
            {words.map((w, i) => (
              <span
                key={i}
                className="word"
                style={{
                  animationDelay: `${i * 90 + 200}ms`,
                  marginRight: "0.25em",
                }}
              >
                {w.em ? <em>{w.text}</em> : w.text}
              </span>
            ))}
          </h1>
          <p className="hero-lead">
            A quiet place for reminders, tadabbur, and learning to pay attention again.
          </p>
          <div className="hero-cta">
            <a href="/reminders" className="btn btn-primary">
              Begin with a reminder <span className="arr">→</span>
            </a>
            <a href="#paths" className="btn btn-ghost">
              Find your way around
            </a>
          </div>
        </div>

                {/* ── Right column — reminder card ────────── */}
      <figure className="reminder-card reveal" aria-label="Featured reminder">
        {/* Light beam sweep */}
        <div className="reminder-card__beam" aria-hidden="true" />

        {/* Eyebrow */}
        <p className="eyebrow reminder-card__eyebrow">
          <span className="reminder-card__ping" aria-hidden="true" />
          Today's reminder
        </p>

        {/* Quote */}
        <blockquote className="reminder-card__quote">
          {quote || "A small reminder to begin again without rushing."}
        </blockquote>

        {/* Meta row */}
        <div className="reminder-card__meta-row">
          <span>Free daily reminder · {dateStr}</span>
        </div>

        {/* Orbit visual */}
        <div className="orbit" aria-hidden="true">
          <div className="orbit__ring" />
          <div className="orbit__ring orbit__ring--dashed" />
          <div className="orbit__ring orbit__ring--inner" />
          <div className="orbit__core" />
          <div className="orbit__sat orbit__sat--1"><i /></div>
          <div className="orbit__sat orbit__sat--2"><i /></div>
          <div className="orbit__sat orbit__sat--3"><i /></div>
        </div>
      </figure>

      </div>

            <style>{`
        .hero-section { padding: 96px 0 80px; position: relative; overflow: hidden; }
        .hero-blob { position:absolute; width:520px; height:520px; border-radius:50%; filter:blur(90px); opacity:.35; z-index:-1; background:radial-gradient(circle,var(--gold),transparent 70%); top:-120px; right:-160px; animation:drift 14s ease-in-out infinite alternate; }
        .hero-grid { display:grid; grid-template-columns:1.15fr .85fr; gap:64px; align-items:center; }
        .hero-h1 { font-size:clamp(48px,7vw,96px); margin:22px 0 28px; }
        .word { display:inline-block; opacity:0; transform:translateY(40px) rotate(4deg); animation:rise 1s var(--ease) forwards; }
        .hero-lead { font-size:19px; color:var(--ink-soft); max-width:46ch; margin-bottom:36px; animation:fade .9s .9s var(--ease) both; }
        .hero-cta { display:flex; gap:12px; flex-wrap:wrap; animation:fade .9s 1.05s var(--ease) both; }

        /* ── Reminder card ── */
        .reminder-card {
          position: relative;
          border-radius: 36px;
          overflow: hidden;
          padding: clamp(32px,5vw,48px);
          background: radial-gradient(120% 90% at 100% 0%, #22392f, #1b2f27 60%);
          color: #ece5d6;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 420px;
          box-shadow: 0 40px 80px -40px rgba(20,29,25,.55);
        }
        .reminder-card__beam {
          position: absolute; width:70%; height:220%; top:-60%; left:-30%;
          background: linear-gradient(100deg, transparent 40%, rgba(240,213,159,.12) 50%, transparent 60%);
          animation: beam 9s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes beam { to { transform: translateX(60%) rotate(4deg); } }
        .reminder-card__eyebrow {
          display: flex; align-items: center; gap: 10px;
          font: 600 12px var(--font-geist);
          letter-spacing: .18em; text-transform: uppercase;
          color: #f0d59f;
          position: relative;
        }
        .reminder-card__ping {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(217,169,90,.7);
          animation: ping-ring 2.4s infinite;
        }
        @keyframes ping-ring { 0%{box-shadow:0 0 0 0 rgba(217,169,90,.7)} 80%,100%{box-shadow:0 0 0 12px rgba(217,169,90,0)} }
        .reminder-card__quote {
          font: italic 400 clamp(26px,3.2vw,40px)/1.25 var(--font-display);
          letter-spacing: -.01em;
          position: relative;
          margin: 24px 0 20px;
          flex: 1;
        }
        .reminder-card__meta-row {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 14px;
          font-size: 13px;
          color: rgba(236,229,214,.72);
          position: relative;
        }

        /* ── Orbit ── */
        .orbit {
          position: absolute;
          right: -40px; bottom: -40px;
          width: 220px; height: 220px;
          pointer-events: none;
        }
        .orbit__ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(236,229,214,.18);
        }
        .orbit__ring--dashed { inset:14%; border-style:dashed; animation:spin-slow 40s linear infinite; }
        .orbit__ring--inner  { inset:30%; }
        .orbit__core {
          position: absolute; inset: 40%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #f0d59f, var(--gold));
          box-shadow: 0 0 40px rgba(217,169,90,.5);
          animation: orbit-breathe 4s ease-in-out infinite;
        }
        @keyframes orbit-breathe { 50%{transform:scale(1.12); box-shadow:0 0 70px rgba(217,169,90,.7);} }
        .orbit__sat {
          position: absolute; top:50%; left:50%;
          width:0; height:0;
        }
        .orbit__sat i {
          position: absolute; border-radius:50%;
          background: #ece5d6;
          box-shadow: 0 0 10px rgba(236,229,214,.7);
        }
        .orbit__sat--1 { animation: spin-slow 14s linear infinite; }
        .orbit__sat--1 i { width:10px;height:10px;margin:-5px;transform:translate(100px,0); }
        .orbit__sat--2 { animation: spin-slow 22s linear infinite reverse; }
        .orbit__sat--2 i { width:7px;height:7px;margin:-3.5px;transform:translate(72px,0);background:#f0d59f; }
        .orbit__sat--3 { animation: spin-slow 30s linear infinite; }
        .orbit__sat--3 i { width:4px;height:4px;margin:-2px;transform:translate(44px,0); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .reminder-card { min-height:300px; }
          .orbit { width:150px; height:150px; right:-20px; bottom:-20px; }
          .orbit__sat--1 i { transform:translate(68px,0); }
          .orbit__sat--2 i { transform:translate(48px,0); }
          .orbit__sat--3 i { transform:translate(30px,0); }
        }
      `}</style>

    </section>
  );
}
