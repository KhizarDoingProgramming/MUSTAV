"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loader";
import ScrollReveal from "@/components/Reveal";
import ScrollProgress from "@/components/scrollbar";
import Marquee from "@/components/Ticker";

export default function ContactPage() {
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroTextVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vw] max-md:h-[80vw] flex items-center justify-center overflow-hidden bg-dark-red">
        <Image
          src="/images/general/hero-contact.jpg"
          alt="Contact MUSTAV"
          fill
          className="object-cover opacity-40"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[25vw] h-[25vw] rounded-full bg-red/10 animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-[20vw] h-[20vw] rounded-full bg-mustard/10 animate-float-reverse" />
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
            Say Hello
          </p>
          <h1
            className="text-[5vw] max-md:text-[10vw] text-beige uppercase leading-[.85]"
            style={{
              fontFamily: "var(--font-modak)",
              WebkitTextStroke: "2px #FFD700",
              color: "transparent",
              opacity: heroTextVisible ? 1 : 0,
              transform: heroTextVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            Got a Craving?
            <br />
            Let&apos;s Talk
          </h1>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-[1.5vw] max-md:py-[3vw] bg-red overflow-hidden">
        <Marquee speed={25}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-beige/20 text-[3vw] max-md:text-[8vw] uppercase whitespace-nowrap mx-6" style={{ fontFamily: "var(--font-modak)" }}>
              CONTACT • REACH • CONNECT • TALK •
            </span>
          ))}
        </Marquee>
      </div>

      {/* Contact Form */}
      <section className="py-[12vw] max-md:py-[18vw] bg-beige">
        <div className="max-w-[60vw] max-md:max-w-[90vw] mx-auto relative">
          {/* Floating stickers */}
          <ScrollReveal direction="rotate" className="absolute top-[-12vw] left-[-4vw] w-[12vw] max-md:w-[20vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img-webp/fries.webp" alt="Fries sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="rotate" delay={100} className="absolute top-[-8vw] right-[-3vw] w-[16vw] max-md:w-[30vw] z-50 sticker">
            <div className="animate-sticker">
              <Image src="/img/burger-boy.png" alt="Burger Boy sticker" width={200} height={200} className="w-full h-auto drop-shadow-lg" />
            </div>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="space-y-[3vw] max-md:space-y-[6vw] relative z-10">
            {[
              { key: "name", label: "Your Name", type: "text", placeholder: "Enter your name" },
              { key: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
            ].map((field, i) => (
              <ScrollReveal key={field.key} delay={i * 100}>
                <div className="relative">
                  <label
                    className="block text-black text-[1.2vw] max-md:text-[4vw] uppercase mb-2"
                    style={{ fontFamily: "var(--font-modak)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-[2vw] py-[1.2vw] max-md:px-[5vw] max-md:py-[4vw] bg-white rounded-xl border-2 outline-none transition-all duration-300 text-black text-[1vw] max-md:text-[3.5vw]"
                    style={{
                      fontFamily: "var(--font-mouse)",
                      borderColor: focusedField === field.key ? "#F91914" : "#e8d4ba",
                      boxShadow: focusedField === field.key ? "0 0 0 4px rgba(249,25,20,0.1)" : "none",
                      transform: focusedField === field.key ? "translateY(-2px)" : "none",
                    }}
                    placeholder={field.placeholder}
                  />
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={200}>
              <div className="relative">
                <label
                  className="block text-black text-[1.2vw] max-md:text-[4vw] uppercase mb-2"
                  style={{ fontFamily: "var(--font-modak)" }}
                >
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full px-[2vw] py-[1.2vw] max-md:px-[5vw] max-md:py-[4vw] bg-white rounded-xl border-2 outline-none transition-all duration-300 text-black text-[1vw] max-md:text-[3.5vw] resize-none"
                  style={{
                    fontFamily: "var(--font-mouse)",
                    borderColor: focusedField === "message" ? "#F91914" : "#e8d4ba",
                    boxShadow: focusedField === "message" ? "0 0 0 4px rgba(249,25,20,0.1)" : "none",
                    transform: focusedField === "message" ? "translateY(-2px)" : "none",
                  }}
                  placeholder="Tell us what you're craving..."
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="scale">
              <button
                data-cursor-hide="true"
                type="submit"
                className={`w-full py-[1.5vw] max-md:py-[4vw] rounded-full text-[1.2vw] max-md:text-[4vw] font-bold uppercase transition-all duration-500 cursor-pointer ${
                  submitted
                    ? "bg-green-500 text-white scale-[1.02]"
                    : "bg-red text-beige hover:bg-dark-red hover:scale-[1.02] hover:shadow-xl"
                }`}
                style={{ fontFamily: "var(--font-mouse)" }}
              >
                {submitted ? "✓ Message Sent!" : "SEND CRAVING"}
              </button>
            </ScrollReveal>
          </form>

          {/* Locations */}
          <div className="mt-[8vw] max-md:mt-[12vw]">
            <ScrollReveal>
              <h3 className="text-black text-[2.5vw] max-md:text-[7vw] uppercase mb-[3vw] text-center" style={{ fontFamily: "var(--font-modak)" }}>
                Find Us
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-4 gap-[2vw] max-md:grid-cols-2 max-md:gap-[4vw]">
              {[
                { city: "Lahore", address: "Bahria Town, Sector D", phone: "+92 320 9609931" },
                { city: "Islamabad", address: "F-8 Markaz", phone: "+92 320 9609931" },
                { city: "Rawalpindi", address: "Saddar Bazaar", phone: "+92 320 9609931" },
                { city: "Multan", address: "Mall Road", phone: "+92 320 9609931" },
              ].map((loc, i) => (
                <ScrollReveal key={loc.city} delay={i * 100} direction="up">
                  <div className="bg-white rounded-xl p-[2vw] max-md:p-[4vw] card-hover group cursor-pointer text-center">
                    <div className="w-[4vw] max-md:w-[10vw] h-[4vw] max-md:h-[10vw] mx-auto mb-[1.5vw] rounded-full bg-red/10 flex items-center justify-center group-hover:bg-red/20 transition-colors duration-300">
                      <svg viewBox="0 0 24 24" className="w-[2vw] max-md:w-[5vw] h-[2vw] max-md:h-[5vw]" fill="none" stroke="#F91914" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h4 className="text-red text-[1.5vw] max-md:text-[5vw] uppercase mb-1" style={{ fontFamily: "var(--font-modak)" }}>
                      {loc.city}
                    </h4>
                    <p className="text-black/50 text-[.8vw] max-md:text-[2.5vw] mb-1" style={{ fontFamily: "var(--font-mouse)" }}>
                      {loc.address}
                    </p>
                    <p className="text-red/70 text-[.7vw] max-md:text-[2.2vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                      {loc.phone}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
