"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loader";
import ScrollReveal from "@/components/Reveal";
import ScrollProgress from "@/components/scrollbar";
import Marquee from "@/components/Ticker";

const ingredients = [
  { name: "Freshly Greens", icon: "lettuce", desc: "Grilled to perfection juicy, smoky, unforgettable.", image: "/images/ingredients/lettuce.jpg" },
  { name: "Juicy Tomatoes", icon: "tomato", desc: "Sun-ripened tomatoes that bring natural sweetness and balance.", image: "/images/ingredients/tomato.jpg" },
  { name: "Creamy Cheese", icon: "cheese", desc: "Rich, creamy cheese that melts into every bite.", image: "/images/ingredients/cheese.jpg" },
  { name: "Perfect Patty", icon: "patty", desc: "Grilled to perfection juicy, smoky, unforgettable.", image: "/images/ingredients/patty.jpg" },
  { name: "Artisan Bun", icon: "bun", desc: "Soft, toasted buns crafted to hold everything together.", image: "/images/ingredients/bun.jpg" },
];

function IngredientIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    lettuce: (<svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md"><circle cx="30" cy="30" r="28" fill="#4CAF50" /><path d="M15 30 Q30 10 45 30 Q30 50 15 30" fill="#66BB6A" /><path d="M20 30 Q30 15 40 30 Q30 45 20 30" fill="#81C784" /></svg>),
    tomato: (<svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md"><circle cx="30" cy="32" r="26" fill="#F44336" /><circle cx="30" cy="32" r="18" fill="#EF5350" /><path d="M25 12 Q30 5 35 12" stroke="#4CAF50" strokeWidth="3" fill="none" /></svg>),
    cheese: (<svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md"><polygon points="10,45 50,45 55,15 5,15" fill="#FFD700" /><polygon points="15,20 25,20 20,30" fill="#ED900A" /><circle cx="35" cy="25" r="4" fill="#ED900A" /><circle cx="45" cy="35" r="3" fill="#ED900A" /></svg>),
    patty: (<svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md"><ellipse cx="30" cy="30" rx="28" ry="15" fill="#4A2C1E" /><ellipse cx="30" cy="28" rx="26" ry="12" fill="#5D3A1E" /></svg>),
    bun: (<svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md"><path d="M10 35 Q10 15 30 15 Q50 15 50 35 Z" fill="#E55A00" /><path d="M12 35 Q12 18 30 18 Q48 18 48 35 Z" fill="#EF6F2E" /><rect x="10" y="35" width="40" height="12" rx="2" fill="#FFD700" /></svg>),
  };
  return icons[type] || icons.bun;
}

export default function SpicesPage() {
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroTextVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vw] max-md:h-[80vw] flex items-center justify-center overflow-hidden bg-dark-red">
        <Image
          src="/images/general/hero-spices.jpg"
          alt="Fresh ingredients"
          fill
          className="object-cover opacity-30"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[25vw] h-[25vw] rounded-full bg-green-500/10 animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-[20vw] h-[20vw] rounded-full bg-red/10 animate-float-reverse" />
          <div className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] rounded-full bg-mustard/10 animate-float-slow -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 text-center px-[5vw]">
          <p
            className="text-mustard text-[3vw] max-md:text-[8vw] uppercase tracking-wider mb-3"
            style={{
              fontFamily: "var(--font-modak)",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            What&apos;s Inside
          </p>
          <h1
            className="text-[6vw] max-md:text-[12vw] text-beige uppercase leading-[.85]"
            style={{
              fontFamily: "var(--font-modak)",
              WebkitTextStroke: "2px #FFD700",
              color: "transparent",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            simple things
            <br />
            done right
          </h1>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-[1.5vw] max-md:py-[3vw] bg-red overflow-hidden">
        <Marquee speed={22}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-beige/20 text-[3vw] max-md:text-[8vw] uppercase whitespace-nowrap mx-6" style={{ fontFamily: "var(--font-modak)" }}>
              FRESH • ORGANIC • QUALITY • PURE •
            </span>
          ))}
        </Marquee>
      </div>

      {/* Farm to Bite */}
      <section className="py-[12vw] max-md:py-[18vw] bg-beige">
        <div className="text-center mb-[8vw] max-md:mb-[12vw] px-[5vw]">
          <ScrollReveal>
            <p className="text-red text-[2.5vw] max-md:text-[7vw] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-modak)" }}>
              From Farm to Bite
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-black heading-section uppercase max-md:text-[10vw] leading-[.75]" style={{ fontFamily: "var(--font-modak)" }}>
              We don&apos;t have a long
              <br />
              list of ingredients.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body text-black/60 w-[60%] max-md:w-[90%] mx-auto mt-[3vw]" style={{ fontFamily: "var(--font-mouse)" }}>
              We have a short one — and we&apos;re obsessive about every single item on it.
              We didn&apos;t just pick ingredients off a list. We thought about where they come from,
              why they matter, and what they bring to the burger.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="scale">
            <Link href="/menu" data-cursor-hide="true" className="inline-block mt-[3vw] blob-btn" style={{ fontFamily: "var(--font-mouse)" }}>
              Order Now
            </Link>
          </ScrollReveal>
        </div>

        {/* Stickers */}
        <div className="relative">
          <ScrollReveal direction="rotate" className="absolute top-[-10vw] left-[5vw] w-[14vw] max-md:w-[25vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img-webp/fries.webp" alt="Fries sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="rotate" delay={100} className="absolute top-[5vw] right-[3vw] w-[18vw] max-md:w-[35vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img-webp/burger.webp" alt="Burger sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-[6vw] max-md:py-[10vw] bg-red">
        <div className="text-center mb-[4vw] max-md:mb-[8vw]">
          <ScrollReveal>
            <h2 className="text-beige heading-section uppercase max-md:text-[10vw] leading-[.75]" style={{ fontFamily: "var(--font-modak)" }}>
              A story in every bite.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body text-beige/60 mt-2" style={{ fontFamily: "var(--font-mouse)" }}>
              From fresh farms to your hands every layer matters.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-5 gap-[1.5vw] max-md:grid-cols-2 max-md:gap-[3vw] px-[5vw] max-md:px-[4vw]">
          {ingredients.map((ing, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="up">
              <div className="bg-beige rounded-2xl overflow-hidden card-hover group cursor-pointer">
                <div className="relative h-[12vw] max-md:h-[28vw] overflow-hidden">
                  <Image
                    src={ing.image}
                    alt={ing.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-[1.5vw] max-md:p-[4vw]">
                  <h3 className="text-[1.2vw] max-md:text-[4.5vw] text-black uppercase mb-1" style={{ fontFamily: "var(--font-modak)" }}>
                    {ing.name}
                  </h3>
                  <p className="text-[.7vw] max-md:text-[2.5vw] text-black/50" style={{ fontFamily: "var(--font-mouse)" }}>
                    {ing.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ingredient Scroll */}
      <section className="py-[12vw] max-md:py-[18vw] bg-beige">
        <div className="text-center mb-[4vw] max-md:mb-[8vw]">
          <ScrollReveal>
            <h2 className="text-black heading-section uppercase max-md:text-[10vw] leading-[.75]" style={{ fontFamily: "var(--font-modak)" }}>
              Every layer matters.
            </h2>
          </ScrollReveal>
        </div>
        <div className="horizontal-scroll px-[5vw]">
          {ingredients.map((ing, i) => (
            <ScrollReveal key={i} delay={i * 80} className="w-[50vw] max-md:w-[70vw] flex-shrink-0 snap-center">
              <div className="bg-white rounded-2xl overflow-hidden card-hover group cursor-pointer">
                <div className="relative h-[20vw] max-md:h-[35vw] overflow-hidden">
                  <Image
                    src={ing.image}
                    alt={ing.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-[2vw] max-md:p-[4vw]">
                  <h3 className="text-[1.5vw] max-md:text-[5vw] text-black uppercase mb-1" style={{ fontFamily: "var(--font-modak)" }}>
                    {ing.name}
                  </h3>
                  <p className="text-body text-black/50" style={{ fontFamily: "var(--font-mouse)" }}>
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
