"use client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function Marquee({ children, speed = 30, className = "" }: Props) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex gap-16"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
