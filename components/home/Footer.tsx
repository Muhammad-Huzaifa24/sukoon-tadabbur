import { SukoonLogo } from "@/components/home/SukoonLogo";

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="wrap">
        <SukoonLogo href="/" fontSize="clamp(64px, 14vw, 200px)" />

        <p className="foot-tagline">
          For the life you are already living.
        </p>

        <div className="foot-bar">
          <nav aria-label="Footer" style={{ display: "flex", gap: 24 }}>
            <a href="/blog"                             className="footer-link">Blog</a>
            <a href="mailto:hello@sukoon.example" className="footer-link">Contact</a>
            <a href="/privacy"                         className="footer-link">Privacy</a>
          </nav>
          <span>© 2026 sukoon.</span>
        </div>
      </div>

      <style>{`
        .home-footer { padding: 96px 0 40px; background: var(--paper-2); overflow: hidden; }
        @media (max-width: 600px) { .home-footer { padding: 50px 0 40px !important; } }
        .foot-tagline { font-family:var(--font-display); font-style:italic; font-size:24px; margin-top:20px; color:var(--ink-soft); }
        .foot-bar { display:flex; justify-content:space-between; flex-wrap:wrap; gap:20px; margin-top:56px; padding-top:28px; border-top:1px solid var(--line); font-size:14px; color:var(--ink-soft); }
        .footer-link { color:inherit; transition:color .3s; }
        .footer-link:hover { color:var(--gold) !important; }
      `}</style>
    </footer>
  );
}