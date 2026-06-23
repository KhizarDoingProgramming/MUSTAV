"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "./cart-ctx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { items, setIsOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-[2.5vw] max-md:px-[4vw] py-[1vw] max-md:py-[4vw]">
      {/* Logo */}
      <Link
        href="/"
        data-cursor-hide="true"
        className="font-modak hover:scale-105 transition-all duration-300 text-red text-stroke-small text-[4vw] max-md:text-[10vw] leading-none"
      >
        MUSTAV
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-[1vw] max-md:gap-[3vw]">
        {/* Cart button */}
        <button
          data-cursor-hide="true"
          onClick={() => setIsOpen(true)}
          className="relative hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] w-[2.8vw] h-[2.8vw] max-md:w-[10vw] max-md:h-[10vw] rounded-full border-[.15vw] max-md:border-[.4vw] border-black/20 hover:border-black cursor-pointer bg-transparent"
          aria-label="Open cart"
        >
          <svg viewBox="0 0 24 24" className="w-[1.4vw] h-[1.4vw] max-md:w-[5vw] max-md:h-[5vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-[.4vw] -right-[.4vw] max-md:top-[0vw] max-md:right-[0vw] bg-red text-beige text-[.6vw] max-md:text-[2.2vw] font-bold w-[1.2vw] h-[1.2vw] max-md:w-[4.5vw] max-md:h-[4.5vw] rounded-full flex items-center justify-center" style={{ fontFamily: "var(--font-mouse)" }}>
              {itemCount}
            </span>
          )}
        </button>

        {/* Burgers link */}
        <Link
          href="/menu"
          data-cursor-hide="true"
          className="font-mouse-memoirs hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide text-beige bg-red px-[1.6vw] py-[.5vw] max-md:px-[5vw] max-md:py-[1.8vw] group rounded-full hover:bg-black"
        >
          <span className="overflow-hidden relative inline-block group">
            <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
              Burgers
            </span>
            <span
              className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300"
              aria-hidden="true"
            >
              Burgers
            </span>
          </span>
        </Link>

        {/* Menu toggle */}
        <div className="relative" ref={menuRef}>
          <button
            data-cursor-hide="true"
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:scale-105 flex items-center gap-[.6vw] max-md:gap-[2vw] px-[1.4vw] py-[.5vw] max-md:px-[4vw] group max-md:py-[1.8vw] rounded-full cursor-pointer transition-all duration-400 border-[.15vw] max-md:border-[.4vw] bg-transparent border-black/20 hover:border-black"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="font-mouse-memoirs flex items-center justify-center uppercase text-[1.3vw] max-md:text-[4vw] tracking-wide transition-colors duration-300 text-black">
              <span className="overflow-hidden relative inline-block group">
                <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
                  Menu
                </span>
                <span
                  className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300"
                  aria-hidden="true"
                >
                  Menu
                </span>
              </span>
            </span>
            {/* Hamburger icon */}
            <div
              className="relative shrink-0 w-[1.2vw] h-[1.2vw] max-md:w-[3.5vw] max-md:h-[3.5vw]"
              aria-hidden="true"
            >
              <span
                className={`bg-black absolute left-0 top-0 block w-full h-[.15vw] max-md:h-[.5vw] rounded-full origin-center transition-all duration-400 ${
                  menuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
                }`}
              />
              <span
                className={`bg-black absolute left-0 top-1/2 block h-[.15vw] max-md:h-[.5vw] rounded-full -translate-y-1/2 transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-[70%]"
                }`}
              />
              <span
                className={`bg-black absolute left-0 bottom-0 block w-full h-[.15vw] max-md:h-[.5vw] rounded-full origin-center transition-all duration-400 ${
                  menuOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown menu */}
          <div
            id="main-menu"
            role="menu"
            className="absolute top-[calc(100%+1vw)] right-0 w-[18vw] max-md:w-[91vw] bg-red rounded-[1.2vw] max-md:rounded-[4vw] p-[2vw] max-md:mt-[5vw] max-md:p-[6vw] shadow-[0_1vw_3vw_rgba(27,27,27,.25)]"
            style={{
              opacity: menuOpen ? 1 : 0,
              scale: menuOpen ? 1 : 0.3,
              transformOrigin: "top right",
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex flex-col gap-[.6vw] max-md:gap-[2vw]">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About" },
                { href: "/spices", label: "Our Spices" },
                { href: "/#locations", label: "Locations" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  role="menuitem"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-modak text-[2.4vw] max-md:text-[8vw] text-beige leading-[1.1] uppercase hover:text-mustard hover:scale-105 transition-transform duration-300 transform inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-[1.5vw] max-md:mt-[4vw] pt-[1vw] max-md:pt-[3vw] border-t border-beige/20">
              <p className="font-mouse-memoirs text-[.9vw] max-md:text-[3.5vw] text-beige/85 uppercase tracking-[.2em]">
                Est. 2024 — Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
