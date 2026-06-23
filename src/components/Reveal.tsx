"use client";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const transforms: Record<string, string> = {
      up: "translateY(50px)",
      down: "translateY(-50px)",
      left: "translateX(-50px)",
      right: "translateX(50px)",
      scale: "scale(0.9)",
      rotate: "rotate(-8deg) scale(0.9)",
    };

    const savedTransform = transforms[direction];
    let revealed = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "none";
          }, delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    el.style.opacity = "0";
    el.style.transform = savedTransform;
    el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
    obs.observe(el);

    return () => obs.disconnect();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
