interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const fallback: FaqItem[] = [
  { id: "1", question: "What is Sukoon?",                 answer: "Sukoon is a quiet editorial space for reminders, tadabbur, and reflective learning." },
  { id: "2", question: "Are the reminders free?",         answer: "The daily reminder is free. Longer letters may be premium previews." },
  { id: "3", question: "How do the live sessions work?",  answer: "Sessions are held online. The join link is emailed on request." },
  { id: "4", question: "Do you offer private consultations?", answer: "Yes. Send a consultation request and the author will follow up." },
  { id: "5", question: "Can I unsubscribe?",              answer: "Yes. Newsletter requests can be unsubscribed from at any time." },
  { id: "6", question: "Are payments available now?",     answer: "Not yet. Prices shown are illustrative only." },
];

export function Faq({ items }: { items: FaqItem[] }) {
  const display = items.length > 0 ? items : fallback;

  return (
    <section style={{ padding: "112px 0", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="faq-grid">
          {/* Left sticky label */}
          <div className="reveal">
            <p className="eyebrow">Frequently asked</p>
            <h2 style={{ fontSize: "clamp(40px,5vw,60px)", marginTop: 14 }}>
              Good <em>questions.</em>
            </h2>
          </div>

          {/* Right — details list */}
          <div className="reveal" style={{ ["--d" as string]: "120ms" }}>
            {display.map((item, i) => (
              <details
                key={item.id}
                open={i === 0}
                className="faq-item"
                style={{ borderTop: i === 0 ? "1px solid var(--line)" : undefined }}
              >
                <summary className="faq-summary">
                  {item.question}
                  <span className="faq-icon">+</span>
                </summary>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    marginTop: 14,
                    maxWidth: "60ch",
                    animation: "fade .5s var(--ease)",
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 80px;
        }
        .faq-item {
          border-bottom: 1px solid var(--line);
          padding: 26px 0;
        }
        .faq-summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font: 24px var(--font-display);
          user-select: none;
        }
        .faq-summary::-webkit-details-marker { display: none; }
        details::-webkit-details-marker { display: none; }
        .faq-icon {
          font: 26px var(--font-geist);
          color: var(--gold);
          transition: transform .5s var(--spring);
          flex-shrink: 0;
          margin-left: 16px;
        }
        details[open] .faq-icon { transform: rotate(135deg); }
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
