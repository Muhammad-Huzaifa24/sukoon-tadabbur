"use client";

import { useEffect, useRef } from "react";

export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Scroll progress bar ──────────────────────────────
    const bar = barRef.current;
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Scroll reveal ────────────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // ── 3D card tilt + glow follow ───────────────────────
    const supportsHover =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];
    if (supportsHover) {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          card.style.setProperty("--mx", x + "px");
          card.style.setProperty("--my", y + "px");
          const rx = ((y / r.height) - 0.5) * -6;
          const ry = ((x / r.width) - 0.5) * 6;
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        };
        const onLeave = () => { card.style.transform = ""; };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <div ref={barRef} className="progress-bar" aria-hidden="true" />;
}
