import type { CSSProperties } from "react";

const LETTERS = ["s", "u", "k", "o", "o", "n"];

interface SukoonLogoProps {
  href?: string;
  fontSize?: string | number;
  color?: string;
}

export function SukoonLogo({
  href = "/",
  fontSize = 34,
  color = "var(--ink)",
}: SukoonLogoProps) {
  return (
    <a
      href={href}
      className="sukoon-logo"
      aria-label="sukoon home"
      style={{ color, fontSize } as CSSProperties}
    >
      <span className="sr-only">sukoon.</span>
      <span aria-hidden="true">
        {LETTERS.map((letter, i) => (
          <span key={i} className="logo-ch" style={{ "--i": i } as CSSProperties}>
            <span className="logo-lt" style={{ "--i": i } as CSSProperties}>{letter}</span>
          </span>
        ))}
      </span>
      <span className="logo-dot" aria-hidden="true">.</span>
      <style>{`
        .sukoon-logo { position:relative; display:inline-flex; align-items:baseline; font-family:var(--font-display); font-style:italic; font-weight:500; line-height:1; letter-spacing:-.02em; text-decoration:none; padding:10px 14px; cursor:pointer; isolation:isolate; }
        .sukoon-logo::before { content:""; position:absolute; inset:-18px -22px; z-index:-1; border-radius:999px; background:radial-gradient(closest-side,rgba(216,174,104,.22),transparent 70%); opacity:0; transform:scale(.7); animation:logo-glow 1.4s .9s var(--ease) forwards, logo-breathe 4s 2.3s ease-in-out infinite; }
        @keyframes logo-glow { to { opacity:1; transform:scale(1); } }
        @keyframes logo-breathe { 50% { opacity:.55; transform:scale(.94); } }
        .sukoon-logo::after { content:""; position:absolute; left:14px; right:14px; bottom:2px; height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); transform:scaleX(0); transform-origin:left; animation:logo-underline 1.2s 1.5s var(--ease) forwards; }
        @keyframes logo-underline { to { transform:scaleX(1); } }
        .logo-ch { display:inline-block; opacity:0; filter:blur(8px); transform:translateY(.45em) rotate(-6deg); animation:logo-enter .9s var(--ease) forwards; animation-delay:calc(var(--i) * 70ms + 150ms); }
        @keyframes logo-enter { to { opacity:1; filter:blur(0); transform:none; } }
        .logo-lt { display:inline-block; animation:logo-sheen 5s ease-in-out infinite; animation-delay:calc(var(--i) * 120ms + 1.8s); }
        @keyframes logo-sheen { 0%,100% { color:inherit; text-shadow:none; } 10% { color:#fff6e0; text-shadow:0 0 12px rgba(216,174,104,.55); } 22% { color:inherit; text-shadow:none; } }
        .logo-dot { display:inline-block; color:var(--gold); margin-left:1px; position:relative; opacity:0; transform:translateY(-.8em) scale(.2); animation:logo-drop .8s var(--spring) 1.05s forwards, logo-pulse 2.8s 2.4s ease-in-out infinite; }
        @keyframes logo-drop { to { opacity:1; transform:none; } }
        @keyframes logo-pulse { 0%,100% { transform:scale(1); text-shadow:0 0 0 rgba(216,174,104,0); } 12% { transform:scale(1.35); text-shadow:0 0 14px rgba(216,174,104,.9); } 24% { transform:scale(1); text-shadow:0 0 0 rgba(216,174,104,0); } 36% { transform:scale(1.18); text-shadow:0 0 8px rgba(216,174,104,.6); } 48% { transform:scale(1); } }
        .logo-dot::after { content:""; position:absolute; left:50%; top:58%; width:10px; height:10px; margin:-5px 0 0 -5px; border-radius:50%; border:1px solid var(--gold); opacity:0; animation:logo-ripple 2.8s 2.4s ease-out infinite; }
        @keyframes logo-ripple { 0% { opacity:.9; transform:scale(.6); } 60%,100% { opacity:0; transform:scale(3.4); } }
        .sukoon-logo:hover .logo-lt { animation:logo-wave .6s var(--spring) calc(var(--i) * 45ms); }
        @keyframes logo-wave { 0% { transform:none; } 40% { transform:translateY(-.22em) rotate(3deg); color:var(--gold); } 100% { transform:none; } }
        .sukoon-logo:hover .logo-dot { animation:logo-pulse .9s ease-in-out; }
        .sukoon-logo:active .logo-lt { transform:scale(.94); transition:transform .15s; }
        .sukoon-logo:focus-visible { outline:1px solid var(--gold); outline-offset:4px; border-radius:8px; }
        @media (prefers-reduced-motion:reduce) { .logo-ch,.logo-dot { opacity:1; filter:none; transform:none; animation:none !important; } .sukoon-logo::before { opacity:1; transform:none; animation:none !important; } .sukoon-logo::after { transform:scaleX(1); animation:none !important; } }
      `}</style>
    </a>
  );
}