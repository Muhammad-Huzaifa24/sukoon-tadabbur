interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  role: string | null;
}

const fallback: Testimonial[] = [
  { id: "1", quote: "A quiet, grounding place to return to each week.",  author_name: "Newsletter reader",  role: null },
  { id: "2", quote: "The prompts helped me make space for reflection.",   author_name: "Course participant", role: null },
  { id: "3", quote: "Thoughtful, spacious, and deeply practical.",        author_name: "Community member",   role: null },
];

export function Testimonials({ items }: { items: Testimonial[] }) {
  const display = items.length > 0 ? items : fallback;

  return (
    <section style={{ padding: "112px 0", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        {/* Header */}
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
            <p className="eyebrow">Words from readers</p>
            <h2 style={{ fontSize: "clamp(38px,4.8vw,60px)", marginTop: 14 }}>
              Quiet, <em>grounding,</em> practical.
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="quotes-grid">
          {display.map((item, i) => (
            <figure
              key={item.id}
              className="quote-card reveal"
              style={{ ["--d" as string]: `${i * 120}ms` }}
            >
              <p style={{ font: `italic 22px/1.35 var(--font-display)`, marginBottom: 24 }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <small style={{ color: "var(--ink-soft)", fontSize: 13 }}>
                {item.author_name}{item.role ? ` · ${item.role}` : ""}
              </small>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .quote-card {
          padding: 36px;
          border-radius: 20px;
          background: var(--paper-2);
          transition: transform .6s var(--ease);
          cursor: default;
        }
        .quote-card:hover { transform: translateY(-6px) rotate(-.4deg); }
        @media (max-width: 900px) { .quotes-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
