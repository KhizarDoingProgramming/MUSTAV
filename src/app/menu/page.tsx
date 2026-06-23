"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loader";
import ScrollReveal from "@/components/Reveal";
import ScrollProgress from "@/components/scrollbar";
import Marquee from "@/components/Ticker";
import { useCart } from "@/components/cart-ctx";


const burgers = [
  { id: 1, name: "Classic Smash", price: 850, time: "10–12 min", bun: "Brioche", patty: "Beef", spice: "Mild", calories: 720, protein: 32, color: "#EF6F2E", image: "/images/burgers/classic-smash.jpg" },
  { id: 2, name: "Spicy Jalapeño", price: 950, time: "12–14 min", bun: "Brioche", patty: "Beef", spice: "Hot", calories: 810, protein: 34, color: "#F91914", image: "/images/burgers/spicy-jalapeno.jpg" },
  { id: 3, name: "Bacon Cheese", price: 1100, time: "12–15 min", bun: "Brioche", patty: "Beef", spice: "Mild", calories: 900, protein: 37, color: "#FFD700", image: "/images/burgers/bacon-cheese.jpg" },
  { id: 4, name: "Veggie Delight", price: 750, time: "10–12 min", bun: "Sesame", patty: "Veggie", spice: "Mild", calories: 620, protein: 17, color: "#4CAF50", image: "/images/burgers/veggie-delight.jpg" },
  { id: 5, name: "BBQ Ranch", price: 1000, time: "12–14 min", bun: "Brioche", patty: "Beef", spice: "Medium", calories: 870, protein: 36, color: "#E55A00", image: "/images/burgers/bbq-ranch.jpg" },
  { id: 6, name: "Mushroom Swiss", price: 1050, time: "12–14 min", bun: "Brioche", patty: "Beef", spice: "Mild", calories: 830, protein: 33, color: "#8D6E63", image: "/images/burgers/mushroom-swiss.jpg" },
];

function BurgerCard({ burger, index }: { burger: typeof burgers[0]; index: number }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id: burger.id, name: burger.name, price: burger.price, image: burger.color });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <ScrollReveal delay={index * 100} direction="up">
      <div className="menu-card group">
        {/* Image */}
        <div className="relative h-[20vw] max-md:h-[45vw] overflow-hidden" style={{ backgroundColor: burger.color + "15" }}>
          <Image
            src={burger.image}
            alt={burger.name}
            fill
            className="object-cover menu-card-img"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Fallback */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-[60%] h-[60%] opacity-20">
              <circle cx="100" cy="100" r="80" fill={burger.color} />
              <circle cx="100" cy="100" r="50" fill="white" opacity="0.3" />
            </svg>
          </div>
          {/* Time badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
            <span className="text-small text-black font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
              {burger.time}
            </span>
          </div>
          {/* Spice badge */}
          <div
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-white text-small font-bold shadow-md"
            style={{ backgroundColor: burger.color, fontFamily: "var(--font-mouse)" }}
          >
            {burger.spice}
          </div>
        </div>

        {/* Info */}
        <div className="p-[1.5vw] max-md:p-[4vw]">
          <div className="flex justify-between mb-2 text-[.7vw] max-md:text-[2.5vw] text-black/50" style={{ fontFamily: "var(--font-mouse)" }}>
            <span>Bun: {burger.bun}</span>
            <span>Patty: {burger.patty}</span>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="text-[.6vw] max-md:text-[2.2vw] bg-red/10 text-red px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-mouse)" }}>
              {burger.calories} kcal
            </span>
            <span className="text-[.6vw] max-md:text-[2.2vw] bg-mustard/10 text-mustard-dark px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-mouse)" }}>
              {burger.protein}g protein
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[1.3vw] max-md:text-[4.5vw] text-black" style={{ fontFamily: "var(--font-modak)" }}>
              {burger.name}
            </h3>
            <span className="text-[1.5vw] max-md:text-[5vw] text-red font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
              Rs. {burger.price}
            </span>
          </div>
          <button
            data-cursor-hide="true"
            onClick={handleAdd}
            className={`w-full py-[0.6vw] max-md:py-[2.5vw] rounded-full text-[.8vw] max-md:text-[3vw] font-bold uppercase transition-all duration-500 cursor-pointer ${
              added
                ? "bg-green-500 text-white scale-[1.02]"
                : "bg-red text-beige hover:bg-dark-red hover:scale-[1.02] hover:shadow-lg"
            }`}
            style={{ fontFamily: "var(--font-mouse)" }}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}

function MenuContent() {
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  useEffect(() => {
    const t2 = setTimeout(() => setHeroTextVisible(true), 600);
    return () => { clearTimeout(t2); };
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      {/* Hero */}
      <section className="relative h-[70vw] max-md:h-[90vw] flex items-center justify-center overflow-hidden bg-dark-red">
        {/* Animated background circles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-red/10 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[20vw] h-[20vw] rounded-full bg-mustard/10 animate-float-reverse" />
          <div className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] rounded-full bg-red/5 animate-float-slow -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center px-[5vw]">
          <p
            className="text-mustard text-[3vw] max-md:text-[7vw] uppercase tracking-wider mb-3"
            style={{
              fontFamily: "var(--font-modak)",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            The Best
          </p>
          <h1
            className="text-[8vw] max-md:text-[14vw] text-beige uppercase leading-[.85]"
            style={{
              fontFamily: "var(--font-mouse)",
              WebkitTextStroke: "3px #FFD700",
              color: "transparent",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            Eat like
            <br />
            you mean it
          </h1>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-[1.5vw] max-md:py-[3vw] bg-red overflow-hidden">
        <Marquee speed={18}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-beige/20 text-[3vw] max-md:text-[8vw] uppercase whitespace-nowrap mx-6" style={{ fontFamily: "var(--font-modak)" }}>
              SMASHED • BOLD • FRESH • CRAVE •
            </span>
          ))}
        </Marquee>
      </div>

      {/* Menu Grid */}
      <section className="py-[10vw] max-md:py-[14vw] bg-beige">
        <div className="text-center mb-[5vw] max-md:mb-[8vw] px-[2.5vw]">
          <ScrollReveal>
            <p className="text-red text-[2vw] max-md:text-[5vw] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-modak)" }}>
              Our Finest
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-black heading-section uppercase max-md:text-[10vw] leading-[.75]" style={{ fontFamily: "var(--font-modak)" }}>
              Burger Picks
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body text-black/50 mt-2" style={{ fontFamily: "var(--font-mouse)" }}>
              {burgers.length} items
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-3 gap-[2vw] max-md:grid-cols-1 max-md:gap-[5vw] px-[5vw] max-md:px-[4vw]">
          {burgers.map((burger, i) => (
            <BurgerCard key={burger.id} burger={burger} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function MenuPage() {
  return <MenuContent />;
}
