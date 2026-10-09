const items = [
  "Reminders", "·", "Series", "·", "Tadabbur", "·", "Courses", "·", "Consultation", "·",
  "Reminders", "·", "Series", "·", "Tadabbur", "·", "Courses", "·", "Consultation", "·",
];

export function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "22px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: 48,
          animation: "tick 30s linear infinite",
          font: `italic 34px var(--font-display)`,
          color: "var(--ink-soft)",
        }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ color: item === "·" ? "var(--gold)" : undefined }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
