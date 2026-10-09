"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SukoonLogo } from "@/components/home/SukoonLogo";

const links = [
  { label: "Home",         href: "/" },
  { label: "Reminders",    href: "/reminders" },
  { label: "Series",       href: "/series" },
  { label: "Courses",      href: "/courses" },
  { label: "Tadabbur",     href: "/tadabbur" },
  { label: "Consultation", href: "/consultation" },
  { label: "Blog",         href: "/blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const close = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header className="home-nav">
      <div className="wrap home-nav__inner">
        <SukoonLogo href="/" fontSize={26} />

        <nav className="home-nav__links" aria-label="Primary navigation">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="home-nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="/reminders" className="btn btn-primary home-nav__cta" style={{ padding: "10px 18px", fontSize: 14 }}>
          Begin here
        </a>

        <button
          type="button"
          className="home-nav__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav className="home-nav__drawer" aria-label="Mobile navigation">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="home-nav__drawer-link" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/admin" className="home-nav__drawer-link home-nav__drawer-link--muted" onClick={() => setOpen(false)}>
            Admin
          </a>
        </nav>
      )}

      <style>{`
        .home-nav { position:sticky; top:env(safe-area-inset-top,0px); z-index:50; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); background:color-mix(in srgb,var(--paper) 80%,transparent); border-bottom:1px solid var(--line); }
        .home-nav__inner { display:flex; align-items:center; justify-content:space-between; height:72px; gap:24px; }
        .home-nav__links { display:flex; gap:26px; font-size:14px; color:var(--ink-soft); }
        .home-nav__link { position:relative; padding:4px 0; transition:color .3s; color:inherit; text-decoration:none; white-space:nowrap; }
        .home-nav__link::after { content:""; position:absolute; left:0; bottom:-2px; height:1px; width:100%; background:var(--gold); transform:scaleX(0); transform-origin:right; transition:transform .5s var(--ease); }
        .home-nav__link:hover { color:var(--ink); }
        .home-nav__link:hover::after { transform:scaleX(1); transform-origin:left; }
        .home-nav__burger { display:none; align-items:center; justify-content:center; width:40px; height:40px; min-height:unset; border-radius:50%; border:1px solid var(--line); background:transparent; color:var(--ink); cursor:pointer; flex-shrink:0; }
        .home-nav__drawer { border-top:1px solid var(--line); background:var(--paper); padding:16px 24px; display:flex; flex-direction:column; gap:4px; }
        .home-nav__drawer-link { padding:12px 16px; border-radius:12px; font-size:15px; color:var(--ink); text-decoration:none; transition:background .2s; min-height:unset; }
        .home-nav__drawer-link:hover { background:var(--paper-2); }
        .home-nav__drawer-link--muted { color:var(--ink-soft); }
        @media (max-width:900px) { .home-nav__links { display:none !important; } .home-nav__cta { display:none !important; } .home-nav__burger { display:inline-flex !important; } }
      `}</style>
    </header>
  );
}