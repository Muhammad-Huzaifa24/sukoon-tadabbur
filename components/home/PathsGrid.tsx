import { PathCard } from "./PathCard";

export function PathsGrid() {
  return (
    <section
      id="paths"
      style={{ padding: "112px 0", borderTop: "1px solid var(--line)" }}
    >
      <div className="wrap">
        {/* Section header */}
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: 32,
            marginBottom: 56,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">Find your way around</p>
            <h2 style={{ fontSize: "clamp(38px,4.8vw,60px)", marginTop: 14 }}>
              Go deeper, <em>at your pace.</em>
            </h2>
          </div>
          <p style={{ maxWidth: "36ch", color: "var(--ink-soft)" }}>
            Every path begins free. Premium previews show what is inside before you pay.
          </p>
        </div>

        {/* 12-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20 }}>

          {/* 01 Reminders — bell */}
          <PathCard
            href="/reminders" num="01" title="Reminders" variant="normal" delay={0}
            description="A daily line to return you to attention."
            tag="Free · Daily" tagType="free"
            icon={
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle className="icon-bell-wave"   cx="32" cy="32" r="22" stroke="var(--gold)" strokeWidth="1.2" />
                <circle className="icon-bell-wave-2" cx="32" cy="32" r="22" stroke="var(--gold)" strokeWidth="1.2" />
                <g className="icon-bell-shape">
                  <path d="M16 44c0-4 3-6 3-16a13 13 0 0 1 26 0c0 10 3 12 3 16z" />
                  <path d="M28 50a4 4 0 0 0 8 0" />
                  <path d="M32 8v3" />
                </g>
              </svg>
            }
          />

          {/* 02 Series — layers */}
          <PathCard
            href="/series" num="02" title="Series" variant="normal" delay={120}
            description="Short, focused sequences, such as Five Days of Returning."
            tag="Free · Short" tagType="free"
            icon={
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <g className="icon-layer icon-layer-3"><path d="M32 34 8 46l24 12 24-12z" /></g>
                <g className="icon-layer icon-layer-2"><path d="M32 24 8 36l24 12 24-12z" /></g>
                <g className="icon-layer icon-layer-1"><path d="M32 14 8 26l24 12 24-12z" /></g>
              </svg>
            }
          />

          {/* 03 Tadabbur — book */}
          <PathCard
            href="/tadabbur" num="03" title="Tadabbur" variant="normal" delay={240}
            description="Slow, reflective reading of the Quran, with care."
            tag="Free" tagType="free"
            icon={
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32 18C26 13 18 12 8 13v36c10-1 18 0 24 5" />
                <path className="icon-page-r" d="M32 18c6-5 14-6 24-5v36c-10-1-18 0-24 5" />
                <path className="icon-book-line" d="M14 24h10M14 30h10M40 24h10M40 30h8" />
              </svg>
            }
          />

          {/* 04 Courses — steps */}
          <PathCard
            href="/courses" num="04" title="Courses" variant="normal" delay={0}
            description="Practical micro courses, such as Foundations of Tadabbur."
            tag="Premium" tagType="premium" price="$48"
            icon={
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect className="icon-step icon-step-1" x="8"  y="40" width="14" height="16" rx="2" />
                <rect className="icon-step icon-step-2" x="25" y="28" width="14" height="28" rx="2" />
                <rect className="icon-step icon-step-3" x="42" y="14" width="14" height="42" rx="2" fill="var(--gold)" fillOpacity=".25" />
              </svg>
            }
          />

          {/* 05 Masterclasses — spark (wide) */}
          <PathCard
            href="/tadabbur" num="05" title="Masterclasses &amp; Consultation" variant="wide" delay={120}
            description="Reading with Presence, and private 1:1 reflection sessions for shaping your own practice."
            tag="Premium" tagType="premium" price="from $72"
            icon={
              <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <g className="icon-star">
                  <path fill="var(--gold)" stroke="none" d="M32 10l4.5 14.5L51 29l-14.5 4.5L32 48l-4.5-14.5L13 29l14.5-4.5z" />
                </g>
                <circle className="icon-twinkle" cx="52" cy="12" r="2.4" fill="var(--gold)" stroke="none" />
                <circle className="icon-twinkle" cx="12" cy="50" r="1.8" fill="var(--gold)" stroke="none" style={{ animationDelay: ".6s" }} />
              </svg>
            }
          />

          {/* 06 Blog — pen (full) */}
          <PathCard
            href="/blog" num="06" title="The Blog" variant="full" delay={0}
            description="Essays and notes on attention, faith, and the quiet work of becoming."
            tag="Free" tagType="free"
            icon={
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path className="icon-stroke" d="M6 52c8-6 12-2 18-6s10 0 14-4 8-2 12-6" />
                <g className="icon-nib">
                  <path d="M44 8l12 12-18 18-12-2-2-12z" />
                  <path d="M44 8l6-6 12 12-6 6" />
                </g>
              </svg>
            }
          />

        </div>
      </div>
    </section>
  );
}
