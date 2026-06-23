"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [peeling, setPeeling] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.2;
      });
    }, 30);

    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 1900),
      setTimeout(() => setPhase(5), 2400),
      setTimeout(() => setPeeling(true), 2800),
      setTimeout(() => setFadeOut(true), 4200),
    ];

    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (fadeOut) setGone(true);
  }, [fadeOut]);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 h-dvh w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        zIndex: 99999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
      onTransitionEnd={handleTransitionEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Page loading"
    >
      {/* Background layers — slide up like CRAV */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "#4C0016",
            transform: peeling ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
            transitionDelay: "0.2s",
          }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "#F91914",
            transform: peeling ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
            transitionDelay: "0s",
          }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "#FFD700",
            transform: peeling ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
            transitionDelay: "0.1s",
          }}
        />
      </div>

      {/* Animated burger build */}
      <div
        className="relative w-[75vw] h-[80vw] mb-[12vw] max-w-[340px] max-h-[360px] md:max-w-[450px] md:max-h-[480px] flex items-center justify-center z-20 origin-bottom"
        style={{
          opacity: peeling ? 0 : 1,
          transform: peeling ? "scale(0.8) translateY(-30px)" : "scale(1) translateY(0)",
          transition: "all 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {/* Particles */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          {[
            { color: "#ffd750", size: "w-2 h-2 md:w-3 md:h-3" },
            { color: "#fff", size: "w-3 h-3 md:w-4 md:h-4" },
            { color: "#60A905", size: "w-2 h-2 md:w-3 md:h-3" },
            { color: "#ffd750", size: "w-3 h-3 md:w-4 md:h-4" },
            { color: "#fff", size: "w-2 h-2 md:w-3 md:h-3" },
            { color: "#60A905", size: "w-3 h-3 md:w-4 md:h-4" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${p.size}`}
              style={{
                backgroundColor: p.color,
                opacity: phase >= 5 ? 0.8 : 0,
                transition: `opacity 0.5s ${0.1 + i * 0.05}s`,
                left: `${(i % 3) * 15 - 15}px`,
                top: `${Math.floor(i / 3) * 15 - 7}px`,
              }}
            />
          ))}
        </div>

        {/* SVG Burger layers */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          {/* Top bun */}
          <g style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0) scale(1)" : "translateY(-30px) scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s",
          }}>
            <ellipse cx="100" cy="70" rx="80" ry="40" fill="#E55A00" />
            <ellipse cx="100" cy="67" rx="75" ry="35" fill="#EF6F2E" />
            <ellipse cx="70" cy="58" rx="3.5" ry="6" fill="#FFD700" transform="rotate(-20 70 58)" />
            <ellipse cx="100" cy="52" rx="3.5" ry="6" fill="#FFD700" transform="rotate(10 100 52)" />
            <ellipse cx="130" cy="58" rx="3.5" ry="6" fill="#FFD700" transform="rotate(15 130 58)" />
            <ellipse cx="85" cy="65" rx="3" ry="5" fill="#FFD700" transform="rotate(-5 85 65)" />
            <ellipse cx="115" cy="63" rx="3" ry="5" fill="#FFD700" transform="rotate(8 115 63)" />
          </g>

          {/* Lettuce */}
          <g style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}>
            <path d="M22 108 Q65 95 100 100 Q135 95 178 108 Q160 120 100 113 Q40 120 22 108" fill="#4CAF50" />
            <path d="M28 112 Q75 100 100 105 Q125 100 172 112 Q155 122 100 116 Q45 122 28 112" fill="#66BB6A" />
          </g>

          {/* Cheese */}
          <g style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}>
            <path d="M28 115 L172 115 L180 128 Q145 135 100 128 Q55 135 20 128 Z" fill="#FFD700" />
            <path d="M172 115 L185 120 L180 128" fill="#ED900A" />
          </g>

          {/* Patty */}
          <g style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}>
            <rect x="32" y="120" width="136" height="25" rx="12" fill="#4A2C1E" />
            <rect x="36" y="122" width="128" height="21" rx="10" fill="#5D3A1E" />
          </g>

          {/* Bottom bun */}
          <g style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <path d="M30 145 Q30 170 100 170 Q170 170 170 145 Z" fill="#E55A00" />
            <path d="M35 145 Q35 165 100 165 Q165 165 165 145 Z" fill="#EF6F2E" />
          </g>
        </svg>
      </div>

      {/* Loading text */}
      <div
        className="flex absolute bottom-[4vw] max-md:bottom-[20vw] flex-col items-center mt-[6vw] md:mt-[10vw] z-20 w-full px-6"
        style={{
          opacity: peeling ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <p
          className="font-mouse-memoirs text60 text-white/90 tracking-wider uppercase mt-[3vw] md:mt-[1.5vw] text-center min-h-[1.5em]"
          aria-live="polite"
        >
          {phase < 1 && "Firing up the grill..."}
          {phase === 1 && "Laying the bun..."}
          {phase === 2 && "Sizzling the patty..."}
          {phase === 3 && "Melting the cheese..."}
          {phase === 4 && "Adding fresh toppings..."}
          {phase >= 5 && "Ready to serve!"}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="w-full absolute bottom-0 left-0 h-[2vw] md:h-[1vw] bg-white/15 overflow-hidden mt-[2vw] md:mt-[1vw]"
        style={{
          opacity: peeling ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          className="h-full bg-mustard transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
