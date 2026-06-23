"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loader";
import ScrollReveal from "@/components/Reveal";
import ScrollProgress from "@/components/scrollbar";
import CursorFollower from "@/components/cursor";
import Marquee from "@/components/Ticker";

const cities = [
  { name: "LAHORE", image: "/images/locations/lahore.jpg", desc: "Where tradition meets taste — our flagship kitchen." },
  { name: "ISLAMABAD", image: "/images/locations/islamabad.jpg", desc: "Capital flavors, crafted with precision." },
  { name: "RAWALPINDI", image: "/images/locations/rawalpindi.jpg", desc: "Bold street-style smash burgers." },
  { name: "MULTAN", image: "/images/locations/multan.jpg", desc: "Southern hospitality in every bite." },
];

const ingredients = [
  { name: "Freshly Greens", icon: "lettuce", desc: "Grilled to perfection juicy, smoky, unforgettable.", image: "/images/ingredients/lettuce.jpg" },
  { name: "Juicy Tomatoes", icon: "tomato", desc: "Sun-ripened tomatoes that bring natural sweetness and balance.", image: "/images/ingredients/tomato.jpg" },
  { name: "Creamy Cheese", icon: "cheese", desc: "Rich, creamy cheese that melts into every bite.", image: "/images/ingredients/cheese.jpg" },
  { name: "Perfect Patty", icon: "patty", desc: "Grilled to perfection juicy, smoky, unforgettable.", image: "/images/ingredients/patty.jpg" },
  { name: "Artisan Bun", icon: "bun", desc: "Soft, toasted buns crafted to hold everything together.", image: "/images/ingredients/bun.jpg" },
];

function IngredientIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    lettuce: (
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
        <circle cx="30" cy="30" r="28" fill="#4CAF50" />
        <path d="M15 30 Q30 10 45 30 Q30 50 15 30" fill="#66BB6A" />
        <path d="M20 30 Q30 15 40 30 Q30 45 20 30" fill="#81C784" />
      </svg>
    ),
    tomato: (
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
        <circle cx="30" cy="32" r="26" fill="#F44336" />
        <circle cx="30" cy="32" r="18" fill="#EF5350" />
        <path d="M25 12 Q30 5 35 12" stroke="#4CAF50" strokeWidth="3" fill="none" />
      </svg>
    ),
    cheese: (
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
        <polygon points="10,45 50,45 55,15 5,15" fill="#FFD700" />
        <polygon points="15,20 25,20 20,30" fill="#ED900A" />
        <circle cx="35" cy="25" r="4" fill="#ED900A" />
        <circle cx="45" cy="35" r="3" fill="#ED900A" />
      </svg>
    ),
    patty: (
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
        <ellipse cx="30" cy="30" rx="28" ry="15" fill="#4A2C1E" />
        <ellipse cx="30" cy="28" rx="26" ry="12" fill="#5D3A1E" />
      </svg>
    ),
    bun: (
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
        <path d="M10 35 Q10 15 30 15 Q50 15 50 35 Z" fill="#E55A00" />
        <path d="M12 35 Q12 18 30 18 Q48 18 48 35 Z" fill="#EF6F2E" />
        <rect x="10" y="35" width="40" height="12" rx="2" fill="#FFD700" />
      </svg>
    ),
  };
  return icons[type] || icons.bun;
}

function CityCard({ city, index }: { city: typeof cities[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 100} className="w-[70vw] max-md:w-[85vw] flex-shrink-0 snap-center">
      <div className="relative rounded-2xl overflow-hidden h-[40vw] max-md:h-[50vw] group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-red/20 to-dark-red/70 z-10 transition-all duration-500 group-hover:from-dark-red/10 group-hover:to-dark-red/60" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={city.image}
            alt={`${city.name} location`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-red via-red-dark to-dark-red -z-10" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-[3vw] max-md:p-[5vw] z-20 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <h3
            className="text-[3vw] max-md:text-[8vw] text-beige uppercase tracking-wider"
            style={{ fontFamily: "var(--font-modak)" }}
          >
            {city.name}
          </h3>
          <p
            className="text-beige/70 text-[1.2vw] max-md:text-[3.5vw] mt-1"
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            {city.desc}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setHeroTextVisible(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const heroWords = ["THE", "BURGER"];

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CursorFollower />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col justify-between items-center pt-[8vw] max-md:pt-[40vw] overflow-hidden pb-[3vw]"
      >
        {/* Background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--beige)_0%,_var(--beige)_100%)]" />

        {/* Main title area */}
        <div className="relative z-10 w-fit h-fit text-center">
          {/* SMASHED FRESH — top left */}
          <div
            className="absolute top-[10%] left-[10%] max-md:static max-md:mb-4 z-10"
            style={{
              transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <p
              className="text-mustard-dark text-[2.8vw] max-md:text-[6vw] uppercase leading-[.9] rotate-[12deg] max-md:rotate-0"
              style={{
                fontFamily: "var(--font-modak)",
                WebkitTextStroke: "2px #4C0016",
                color: "transparent",
                opacity: heroTextVisible ? 1 : 0,
                transform: heroTextVisible ? "translateY(0) rotate(12deg)" : "translateY(30px) rotate(12deg)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              SMASHED
              <br />
              FRESH
            </p>
          </div>

          {/* BOLD FLAVOR — bottom right */}
          <div
            className="absolute bottom-[10%] right-[10%] max-md:static max-md:mt-4 z-10"
            style={{
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <p
              className="text-mustard-dark text-[2.8vw] max-md:text-[6vw] uppercase leading-[.9] -rotate-[12deg] max-md:rotate-0 text-right"
              style={{
                fontFamily: "var(--font-modak)",
                WebkitTextStroke: "2px #4C0016",
                color: "transparent",
                opacity: heroTextVisible ? 1 : 0,
                transform: heroTextVisible ? "translateY(0) rotate(-12deg)" : "translateY(30px) rotate(-12deg)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            >
              BOLD
              <br />
              FLAVOR
            </p>
          </div>

          {/* THE BURGER — center */}
          <h1
            className="heading-hero text-center relative z-10"
            style={{
              fontFamily: "var(--font-mouse)",
              WebkitTextStroke: "3px #4C0016",
              color: "transparent",
            }}
          >
            {heroWords.map((word, i) => (
              <span
                key={word}
                className="inline-block mx-[2vw]"
                style={{
                  opacity: heroTextVisible ? 1 : 0,
                  transform: heroTextVisible ? "translateY(0) scale(1)" : "translateY(80px) scale(0.8)",
                  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* MUSTAV text + floating main image */}
        <div className="relative mt-[18vw] max-md:mt-[12vw]">
          <div
            className="absolute pointer-events-none z-0"
            style={{
              width: "min(40vw, 400px)",
              height: "min(40vw, 400px)",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
              transition: "transform 0.4s ease-out",
              opacity: heroTextVisible ? 1 : 0,
            }}
          >
            <div className="animate-float w-full h-full">
              <Image
                src="/img/main-page.png"
                alt="MUSTAV"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
          <p
            className="text-center text-[15vw] max-md:text-[20vw] relative z-10"
            style={{
              fontFamily: "var(--font-modak)",
              WebkitTextStroke: "3px #4C0016",
              color: "transparent",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            MUSTAV
          </p>
        </div>

        {/* Bottom descriptions */}
        <div className="w-full flex justify-between px-[2.5vw] py-[2.5vw] max-md:flex-col max-md:gap-[4vw] max-md:items-center max-md:px-[5vw] max-md:py-6">
          <ScrollReveal direction="left" delay={800} className="w-[23vw] max-md:w-full">
            <p
              className="text-red text-[1.5vw] max-md:text-[5vw] uppercase mb-1"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              Crafted
            </p>
            <p className="text-body leading-[1.3] max-md:text-center">
              Smashed hot on the flat top, our prime patties lock in ultimate juiciness under a caramelized crust.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={850} className="hidden md:block">
            <p
              className="text-mustard text-[2vw] uppercase"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              •
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={900} className="w-[23vw] max-md:w-full">
            <p
              className="text-red text-[1.5vw] max-md:text-[5vw] uppercase mb-1 text-right max-md:text-center"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              For Your Cravings
            </p>
            <p className="text-body leading-[1.3] text-right max-md:text-center">
              Topped with melted cheddar and our signature chili honey glaze crafted to satisfy your cravings.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MARQUEE TICKER ═══ */}
      <div className="py-[2vw] max-md:py-[4vw] bg-red overflow-hidden">
        <Marquee speed={20}>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="text-beige/20 text-[4vw] max-md:text-[10vw] uppercase whitespace-nowrap mx-8"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              SMASHED • FRESH • BOLD • CRAVE •
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" className="py-[12vw] max-md:py-[18vw] overflow-hidden relative">
        <div className="text-center space-y-[2vw] max-md:space-y-[5vw] px-[2.5vw] max-md:px-[5vw]">
          <ScrollReveal>
            <p
              className="text-red text-[2.8vw] max-md:text-[8vw] -rotate-5 max-md:rotate-0"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              TOP CLASSIC
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2
              className="heading-section uppercase max-md:text-[12vw] leading-[.75] w-[70%] max-md:w-full mx-auto"
              style={{
                fontFamily: "var(--font-modak)",
                WebkitTextStroke: "3px #4C0016",
                color: "transparent",
              }}
            >
              juicy cheesy fully Loaded
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p
              className="text-body text-black w-[45%] max-md:w-[90%] mx-auto leading-[1.2]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              MUSTAV is back and bolder than ever. Honoring our rich roots, we bring you the ultimate
              smashed experience fully loaded, hot, and crafted fresh.
            </p>
          </ScrollReveal>
        </div>

        {/* Order Now Blob Button */}
        <ScrollReveal delay={300} direction="scale" className="mt-[3vw] max-md:mt-[6vw] mb-[5vw] max-md:mb-[8vw] text-center">
          <Link href="/menu" data-cursor-hide="true" className="relative inline-block group">
            <svg xmlns="http://www.w3.org/2000/svg" width="280" viewBox="-10 -10 602 475" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <path
                stroke="white" strokeWidth="8" fill="#F91914"
                d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"
                className="transition-[fill] duration-300 group-hover:fill-dark-red"
              />
            </svg>
            <span className="relative z-10 text-white font-bold text-body uppercase inline-block px-[4vw] py-[1.5vw] max-md:px-[10vw] max-md:py-[4vw]" style={{ fontFamily: "var(--font-mouse)" }}>
              Order Now
            </span>
          </Link>
        </ScrollReveal>

        {/* Image Grid */}
        <div className="relative px-[8vw] max-md:px-[4vw] pb-[4vw]">
          {/* Sticker */}
          <ScrollReveal direction="rotate" className="absolute w-[14vw] max-md:w-[22vw] top-[-10vw] max-md:top-[-25vw] left-[4vw] max-md:left-[-2vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img/burger-boy.png" alt="Burger Boy sticker" width={200} height={200} className="w-full h-auto drop-shadow-xl" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-[1.5vw] max-md:grid-cols-3 max-md:gap-[3vw] justify-center mx-auto max-w-[75vw] max-md:max-w-full">
            {[
              { src: "/images/about/chef.jpg", rotate: "md:rotate-[5deg]", color: "#EF6F2E" },
              { src: "/images/about/cheese-closeup.jpg", rotate: "md:rotate-[-5deg] max-md:-translate-y-[4vw] max-md:z-10", color: "#FFD700" },
              { src: "/images/about/restaurant.jpg", rotate: "md:rotate-[8deg]", color: "#E55A00" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 150} direction="scale">
                <div
                  className={`relative h-[22vw] max-md:h-[32vw] rounded-[4%] overflow-hidden ${item.rotate} group cursor-pointer card-hover`}
                >
                  <Image
                    src={item.src}
                    alt="About MUSTAV"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Fallback gradient */}
                  <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)` }}>
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-30">
                      <circle cx="100" cy="100" r="80" fill="white" />
                    </svg>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE SECTION ═══ */}
      <section className="relative bg-red overflow-hidden">
        {/* Wave divider */}
        <div className="relative w-full overflow-hidden leading-[0]">
          <svg className="w-full h-[200px] max-md:h-[80px]" viewBox="0 0 1536 300" fill="none" preserveAspectRatio="none">
            <path d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0" fill="#f5e3cd" />
          </svg>
        </div>

        <div className="relative py-[8vw] max-md:py-[12vw] pb-[10vw] max-md:pb-[18vw]">
          {/* Stickers */}
          <ScrollReveal direction="left" className="w-[12vw] max-md:w-[20vw] absolute top-[2vw] max-md:top-[3vw] left-[4vw] max-md:left-[-2vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img-webp/fries.webp" alt="Fries sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" className="w-[16vw] max-md:w-[28vw] absolute top-[12vw] max-md:top-[8vw] right-[3vw] max-md:right-[-4vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img/burgerselfie.png" alt="Burger Selfie sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>

          {/* Heading */}
          <div className="text-center relative z-20">
            <ScrollReveal>
              <p
                className="text-beige absolute -rotate-8 max-md:rotate-0 left-1/2 -translate-x-1/2 text-[2.8vw] max-md:text-[7vw] leading-[.9] z-0 mix-blend-overlay opacity-60"
                style={{
                  fontFamily: "var(--font-modak)",
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  color: "transparent",
                }}
              >
                EXPERIENCE
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
                <h2
                  className="heading-section uppercase max-md:text-[14vw] leading-[.75] text-beige relative z-20 pt-[10vw] max-md:pt-[16vw]"
                style={{ fontFamily: "var(--font-modak)" }}
              >
                food that
                <br />
                feels good
              </h2>
            </ScrollReveal>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-[2.5vw] max-md:grid-cols-1 max-md:gap-[5vw] w-[80vw] max-md:w-[90vw] mx-auto mt-[8vw] max-md:mt-[14vw] relative z-20">
            {[
              { title: "BOLD FLAVOUR", stats: ["100% Organic", "Zero Guilt", "True Taste"], color: "#FFD700", icon: "/images/general/flame.png", fallback: "🔥" },
              { title: "450 kcal", stats: ["High Protein", "Fresh Ingredients", "Low Carb"], color: "#EF6F2E", icon: "/images/general/muscle.png", fallback: "💪" },
              { title: "Pure Quality", stats: ["Every Layer", "Packed With", "Signature Flavor"], color: "#E55A00", icon: "/images/general/sparkle.png", fallback: "✨" },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 150} direction="up">
                <div className="bg-beige rounded-2xl p-[2.5vw] max-md:p-[5vw] text-center card-hover group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-[8vw] max-md:w-[18vw] h-[8vw] max-md:h-[18vw] mx-auto mb-[2vw] rounded-full overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="48" fill={card.color} />
                      <circle cx="50" cy="50" r="30" fill="white" opacity="0.15" />
                      <circle cx="50" cy="50" r="20" fill="white" opacity="0.1" />
                    </svg>
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={80}
                      height={80}
                      className="absolute inset-0 w-full h-full object-contain p-[15%]"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-2xl card-fallback">{card.fallback}</span>
                  </div>
                  <h3
                    className="text-[1.5vw] max-md:text-[5vw] text-black uppercase mb-2"
                    style={{ fontFamily: "var(--font-modak)" }}
                  >
                    {card.title}
                  </h3>
                  {card.stats.map((stat, j) => (
                    <p
                      key={j}
                      className="text-body text-black/60"
                      style={{ fontFamily: "var(--font-mouse)" }}
                    >
                      {stat}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TAKE AWAY / LOCATIONS ═══ */}
      <section id="locations" className="relative py-[12vw] max-md:py-[18vw] bg-beige overflow-hidden">
        {/* Floating ingredients */}
        <div className="absolute top-[8vw] left-[3vw] w-[5vw] max-md:w-[12vw] opacity-15 animate-float-slow pointer-events-none">
          <Image src="/images/ingredients/lettuce.jpg" alt="Lettuce" width={100} height={100} className="w-full h-auto rounded-full object-cover" />
        </div>
        <div className="absolute top-[18vw] right-[5vw] w-[4vw] max-md:w-[10vw] opacity-15 animate-float pointer-events-none">
          <Image src="/images/ingredients/tomato.jpg" alt="Tomato" width={100} height={100} className="w-full h-auto rounded-full object-cover" />
        </div>
        <div className="absolute bottom-[8vw] left-[8vw] w-[4vw] max-md:w-[10vw] opacity-15 animate-float-reverse pointer-events-none">
          <Image src="/images/ingredients/cheese.jpg" alt="Cheese" width={100} height={100} className="w-full h-auto rounded-full object-cover" />
        </div>
        <div className="absolute bottom-[15vw] right-[3vw] w-[5vw] max-md:w-[12vw] opacity-15 animate-float-slow pointer-events-none">
          <Image src="/images/ingredients/patty.jpg" alt="Patty" width={100} height={100} className="w-full h-auto rounded-full object-cover" />
        </div>

        {/* Flying plane */}
        <div className="absolute top-[12vw] left-0 w-full overflow-hidden pointer-events-none">
          <svg viewBox="0 0 100 30" className="w-[8vw] max-md:w-[14vw] animate-fly" style={{ animationDuration: "15s" }}>
            <polygon points="0,15 30,10 60,15 30,20" fill="#EF6F2E" opacity="0.6" />
            <polygon points="20,5 35,10 20,15" fill="#FFD700" opacity="0.6" />
            <polygon points="20,20 35,15 20,25" fill="#FFD700" opacity="0.6" />
          </svg>
        </div>

        <div className="text-center mb-[5vw] max-md:mb-[8vw] relative z-10 px-[2.5vw]">
          <ScrollReveal>
            <p
              className="text-red text-[2.8vw] max-md:text-[7vw] uppercase tracking-wider mb-2"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              take away
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2
              className="text-black heading-section uppercase max-md:text-[10vw] leading-[.75]"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              QUALITY THAT
              <br />
              TRAVELS WITH YOU
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p
              className="text-body text-black/60 w-[50%] max-md:w-[90%] mx-auto mt-[2vw]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Freshly packed smash burgers, ready to go wherever you crave. From our flat-top to any
              corner of Pakistan, we ensure every layer stays hot and juicy.
            </p>
          </ScrollReveal>
        </div>

        {/* City cards */}
        <div className="horizontal-scroll px-[5vw]">
          {cities.map((city, i) => (
            <CityCard key={i} city={city} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ STORY / INGREDIENTS ═══ */}
      <section className="py-[12vw] max-md:py-[18vw] bg-beige overflow-hidden">
        <div className="text-center mb-[5vw] max-md:mb-[8vw] px-[2.5vw]">
          <ScrollReveal>
            <h2
              className="text-black heading-section uppercase max-md:text-[10vw] leading-[.75]"
              style={{ fontFamily: "var(--font-modak)" }}
            >
              A story in every bite.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p
              className="text-body text-black/60 mt-[2vw]"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              From fresh farms to your hands every layer matters.
            </p>
          </ScrollReveal>
        </div>

        {/* Ingredients horizontal scroll */}
        <div className="horizontal-scroll px-[5vw]">
          {ingredients.map((ing, i) => (
            <ScrollReveal key={i} delay={i * 80} className="w-[55vw] max-md:w-[72vw] flex-shrink-0 snap-center">
              <div className="bg-white rounded-2xl overflow-hidden card-hover group cursor-pointer">
                <div className="relative h-[22vw] max-md:h-[32vw] overflow-hidden">
                  <Image
                    src={ing.image}
                    alt={ing.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-[2vw] max-md:p-[4vw]">
                  <h3
                    className="text-[1.5vw] max-md:text-[5vw] text-black uppercase mb-1"
                    style={{ fontFamily: "var(--font-modak)" }}
                  >
                    {ing.name}
                  </h3>
                  <p
                    className="text-body text-black/50"
                    style={{ fontFamily: "var(--font-mouse)" }}
                  >
                    {ing.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
