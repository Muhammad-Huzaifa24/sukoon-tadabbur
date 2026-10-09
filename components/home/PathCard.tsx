import type { ReactNode } from "react";

export type PathCardVariant = "normal" | "wide" | "full";

export interface PathCardProps {
  num: string;
  href: string;
  title: string;
  description: string;
  tag: string;
  tagType: "free" | "premium";
  price?: string;
  variant?: PathCardVariant;
  delay?: number;
  icon: ReactNode;
}

export function PathCard({
  num,
  href,
  title,
  description,
  tag,
  tagType,
  price,
  variant = "normal",
  delay = 0,
  icon,
}: PathCardProps) {
  const colSpan =
    variant === "full" ? "span 12" :
    variant === "wide" ? "span 8"  : "span 4";

  return (
    <a
      href={href}
      className="group tilt reveal path-card"
      style={{
        gridColumn: colSpan,
        ["--d" as string]: `${delay}ms`,
      }}
    >
      {/* Gold glow follows cursor — position set by ScrollEffects via --mx --my */}
      <span className="path-card__glow" aria-hidden="true" />

      {/* Arrow */}
      <span className="arrow-go" aria-hidden="true">→</span>

      <div>
        <div className="path-card__icon">{icon}</div>
        <span style={{ font: `italic 15px var(--font-display)`, color: "var(--ink-soft)" }}>
          {num}
        </span>
        <h3 style={{ fontSize: 34, margin: "10px 0 12px" }}>{title}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: "40ch" }}>{description}</p>
      </div>

      <div className="path-card__foot">
        <span
          style={{
            font: "600 12px var(--font-geist)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: tagType === "free" ? "var(--moss)" : "var(--gold)",
          }}
        >
          {tag}
        </span>
        {price && (
          <span style={{ font: `22px var(--font-display)` }}>{price}</span>
        )}
      </div>

      <style>{`
        .path-card {
          position: relative;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--paper);
          overflow: hidden;
          isolation: isolate;
          transform-style: preserve-3d;
          transition: transform .6s var(--ease), border-color .5s, box-shadow .6s var(--ease);
          text-decoration: none;
          color: inherit;
        }
        .path-card:hover {
          border-color: var(--gold);
          box-shadow: 0 30px 60px -30px rgba(27,47,39,.35);
        }
        .path-card__glow {
          position: absolute;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--gold) 35%, transparent), transparent 70%);
          left: var(--mx, 50%);
          top:  var(--my, 50%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity .5s;
          z-index: -1;
          pointer-events: none;
        }
        .path-card:hover .path-card__glow { opacity: 1; }
        .path-card__icon {
          width: 64px; height: 64px;
          color: var(--moss);
          margin-bottom: 28px;
        }
        .path-card__foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 28px;
          gap: 8px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .path-card { grid-column: span 12 !important; }
        }
      `}</style>
    </a>
  );
}
