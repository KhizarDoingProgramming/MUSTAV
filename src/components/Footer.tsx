"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./Reveal";
import Marquee from "./Ticker";

export default function Footer() {
  return (
    <footer className="relative bg-dark-red text-beige overflow-hidden">
      {/* Marquee ticker */}
      <div className="py-[2vw] max-md:py-[4vw] border-b border-beige/10 overflow-hidden">
        <Marquee speed={35}>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-beige/10 text-[5vw] max-md:text-[12vw] uppercase whitespace-nowrap"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              MUSTAV • BURGERS • MUSTAV • BURGERS •{" "}
            </span>
          ))}
        </Marquee>
      </div>

      {/* CTA Section */}
      <div className="relative py-[10vw] max-md:py-[18vw] flex flex-col items-center justify-center overflow-hidden">
        {/* Floating mascot */}
        <div className="absolute top-[5vw] left-[10vw] max-md:top-[8vw] max-md:left-[5vw] z-10 animate-float-slow w-[10vw] max-md:w-[18vw]">
          <Image
            src="/images/about/mascot.png"
            alt="MUSTAV Mascot"
            width={200}
            height={200}
            className="w-full h-auto drop-shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <svg width="120" height="120" viewBox="0 0 120 120" className="max-md:w-[80px] max-md:h-[80px] hidden">
            <circle cx="60" cy="60" r="55" fill="#FFD700" />
            <circle cx="45" cy="50" r="8" fill="#4C0016" />
            <circle cx="75" cy="50" r="8" fill="#4C0016" />
            <path d="M40 70 Q60 90 80 70" stroke="#4C0016" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="30" rx="25" ry="8" fill="#EF6F2E" />
          </svg>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-[10%] right-[15%] w-[8vw] h-[8vw] rounded-full border-2 border-beige/10 animate-spin-slow" />
        <div className="absolute bottom-[20%] left-[8%] w-[5vw] h-[5vw] rounded-full bg-mustard/5 animate-float" />

        <ScrollReveal direction="scale">
          <p
            className="text-mustard text-[2.8vw] max-md:text-[7vw] uppercase tracking-wider mb-3"
            style={{ fontFamily: "var(--font-modak)" }}
          >
            FEEL IT
          </p>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <h2
            className="text-center heading-section uppercase max-md:text-[14vw] leading-[.75] w-full text-beige mb-[4vw]"
            style={{ fontFamily: "var(--font-modak)" }}
          >
            feel the
            <br />
            Change
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <p
            className="text-body text-beige/70 w-[50%] max-md:w-[90%] text-center mb-[4vw]"
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            Smashed for the bold, built for the hungry. Dive into a legendary
            craft experience where every crispy edge and juicy layer rules.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={450} direction="scale">
          <Link
            href="/menu"
            data-cursor-hide="true"
            className="blob-btn relative z-20"
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            Order Now
          </Link>
        </ScrollReveal>

        {/* Background burger silhouette */}
        <div className="absolute bottom-0 right-0 w-[40vw] max-md:w-[60vw] opacity-10">
          <Image
            src="/img/burger-silhouette.png"
            alt=""
            width={600}
            height={600}
            className="w-full h-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-beige/10 py-[5vw] max-md:py-[10vw] px-[2.5vw] max-md:px-[5vw]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[4vw] max-w-[120vw] mx-auto">
          {/* Logo */}
          <ScrollReveal direction="left" className="mb-[4vw] md:mb-0">
            <h3
              className="text-[6vw] max-md:text-[15vw] text-stroke-white leading-none mb-2"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              MUSTAV
            </h3>
            <p
              className="text-small text-beige/50"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Crafted for your cravings · est. 2024
            </p>
          </ScrollReveal>

          {/* Links */}
          <ScrollReveal delay={100} className="mb-[4vw] md:mb-0">
            <p
              className="text-mustard text-[1.1vw] max-md:text-[3.5vw] uppercase tracking-wider mb-[1.5vw]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Navigate
            </p>
            <div className="flex flex-col gap-[.8vw] max-md:gap-[2.5vw]">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Burgers" },
                { href: "/spices", label: "Spices" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-cursor-hide="true"
                  className="text-body text-beige/60 hover:text-mustard hover:translate-x-2 transition-all duration-300"
                  style={{ fontFamily: "var(--font-mouse)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>

          {/* Locations */}
          <ScrollReveal delay={200}>
            <p
              className="text-mustard text-[1.1vw] max-md:text-[3.5vw] uppercase tracking-wider mb-[1.5vw]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Locations
            </p>
            <div className="flex flex-col gap-[.8vw] max-md:gap-[2vw]">
              {["Lahore", "Islamabad", "Rawalpindi", "Multan"].map((loc) => (
                <p
                  key={loc}
                  className="text-body text-beige/50 hover:text-beige transition-colors duration-300"
                  style={{ fontFamily: "var(--font-mouse)" }}
                >
                  {loc}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* Owner */}
          <ScrollReveal delay={300}>
            <p
              className="text-mustard text-[1.1vw] max-md:text-[3.5vw] uppercase tracking-wider mb-[1.5vw]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Owner
            </p>
            <p
              className="text-body text-beige/50"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Mustafa
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-[4vw] pt-[2vw] border-t border-beige/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <p
            className="text-small text-beige/30"
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            © 2026 MUSTAV — All rights reserved
          </p>
          <p
            className="text-small text-beige/30"
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            Crafted for your cravings
          </p>
        </div>
      </div>
    </footer>
  );
}
