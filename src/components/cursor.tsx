"use client";
import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const hidden = useRef(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hide]")) {
        hidden.current = true;
      } else {
        hovering.current = true;
      }
    };

    const handleLeave = () => {
      hovering.current = false;
      hidden.current = false;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const m = mouse.current;
      const d = dotPos.current;
      const r = ringPos.current;

      const isHover = hovering.current;
      const isHidden = hidden.current;

      // Dot follows mouse instantly (with slight lerp for smoothness)
      d.x = lerp(d.x, m.x, 0.25);
      d.y = lerp(d.y, m.y, 0.25);

      // Ring follows with more lag
      r.x = lerp(r.x, m.x, 0.12);
      r.y = lerp(r.y, m.y, 0.12);

      const dotScale = isHover ? 2 : isHidden ? 0 : 1;
      const ringSize = isHover ? 60 : isHidden ? 0 : 40;
      const opacity = isHidden ? 0 : 1;

      dot.style.transform = `translate(${d.x - 6}px, ${d.y - 6}px) scale(${dotScale})`;
      dot.style.opacity = String(d.x === -100 ? 0 : opacity);

      ring.style.transform = `translate(${r.x - ringSize / 2}px, ${r.y - ringSize / 2}px)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.opacity = String(r.x === -100 ? 0 : opacity);

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    const interactives = document.querySelectorAll(
      "a, button, .sticker, .menu-card, .card-hover"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
