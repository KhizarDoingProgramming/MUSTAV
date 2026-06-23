"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-ctx";

export default function CartDrawer() {
  const { items, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const router = useRouter();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Toast notification */}
      <div
        className={`fixed top-[8vw] right-[2.5vw] max-md:top-[18vw] max-md:right-[4vw] bg-red text-beige px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(249,25,20,0.3)] z-[1000] transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
        style={{ fontFamily: "var(--font-mouse)" }}
      >
        ✓ Added to Cart
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-dark-red/40 backdrop-blur-sm z-[1000] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[32vw] max-md:w-[85vw] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] z-[1001] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-[2vw] max-md:p-[5vw]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-beige-dark">
            <h3 className="text-[2vw] max-md:text-[6vw] text-black uppercase" style={{ fontFamily: "var(--font-modak)" }}>
              Your Cart {itemCount > 0 && <span className="text-red text-[1.2vw] max-md:text-[4vw]">({itemCount})</span>}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-black/60 hover:text-black hover:bg-red/10 transition-all duration-300 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-[15vw] max-md:w-[25vw] h-[15vw] max-md:h-[25vw] mb-4 relative">
                <Image
                  src="/images/general/empty-cart.png"
                  alt="Empty cart"
                  fill
                  className="object-contain opacity-30"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 empty-cart-fallback">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#4C0016" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="50" y="55" textAnchor="middle" fill="#4C0016" fontSize="24" opacity="0.3">🍔</text>
                </svg>
              </div>
              <p className="text-black/40 text-[1.2vw] max-md:text-[4vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                Hungry? Add items to start your order.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 border-b border-beige-dark transition-all duration-300"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(20px)",
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-beige flex-shrink-0">
                      <svg viewBox="0 0 60 60" className="w-full h-full">
                        <circle cx="30" cy="30" r="28" fill={item.image} opacity="0.3" />
                        <circle cx="30" cy="30" r="20" fill={item.image} opacity="0.5" />
                        <circle cx="30" cy="30" r="12" fill={item.image} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-black text-[1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                        {item.name}
                      </p>
                      <p className="text-red text-[.9vw] max-md:text-[3vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                        Rs. {item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-beige text-black flex items-center justify-center hover:bg-red hover:text-beige transition-all duration-300 cursor-pointer text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-black text-[1vw] max-md:text-[3.5vw] w-6 text-center font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-beige text-black flex items-center justify-center hover:bg-red hover:text-beige transition-all duration-300 cursor-pointer text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-beige-dark">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black text-[1.2vw] max-md:text-[4vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Total
                  </span>
                  <span className="text-red text-[1.5vw] max-md:text-[5.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Rs. {total.toFixed(0)}
                  </span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); router.push("/checkout"); }}
                  className="w-full py-4 bg-red text-beige rounded-full font-bold uppercase hover:bg-dark-red transition-all duration-400 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                  style={{ fontFamily: "var(--font-mouse)" }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
