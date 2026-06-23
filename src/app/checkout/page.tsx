"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loader";
import ScrollProgress from "@/components/scrollbar";
import { useCart } from "@/components/cart-ctx";

const DELIVERY_FEE = 50;

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"easypaisa" | "jazzcash" | "card">("easypaisa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    easypaisaNumber: "",
    jazzcashNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const subtotal = total;
  const deliveryFee = DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <>
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <section className="min-h-[70vh] flex flex-col items-center justify-center bg-beige px-[5vw]">
          <div className="text-center">
            <svg viewBox="0 0 100 100" className="w-[12vw] h-[12vw] mx-auto mb-6 opacity-20">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4C0016" strokeWidth="2" strokeDasharray="8 4" />
              <text x="50" y="55" textAnchor="middle" fill="#4C0016" fontSize="24" opacity="0.3">🍔</text>
            </svg>
            <h2 className="text-[3vw] max-md:text-[7vw] text-black uppercase mb-3" style={{ fontFamily: "var(--font-modak)" }}>
              Your Cart is Empty
            </h2>
            <p className="text-black/50 text-[1.2vw] max-md:text-[4vw] mb-6" style={{ fontFamily: "var(--font-mouse)" }}>
              Add some burgers before checking out!
            </p>
            <button
              onClick={() => router.push("/menu")}
              className="px-8 py-3 bg-red text-beige rounded-full font-bold uppercase hover:bg-dark-red transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Browse Menu
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <section className="min-h-[70vh] flex flex-col items-center justify-center bg-beige px-[5vw]">
          <div className="text-center animate-pop-in">
            <div className="w-[10vw] h-[10vw] mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-[5vw] h-[5vw] text-green-500" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[3vw] max-md:text-[7vw] text-black uppercase mb-3" style={{ fontFamily: "var(--font-modak)" }}>
              Order Placed!
            </h2>
            <p className="text-black/50 text-[1.2vw] max-md:text-[4vw] mb-2" style={{ fontFamily: "var(--font-mouse)" }}>
              Your order has been confirmed.
            </p>
            <p className="text-red text-[1.5vw] max-md:text-[5vw] font-bold mb-8" style={{ fontFamily: "var(--font-mouse)" }}>
              Total: Rs. {grandTotal}
            </p>
            <button
              onClick={() => router.push("/menu")}
              className="px-8 py-3 bg-red text-beige rounded-full font-bold uppercase hover:bg-dark-red transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-mouse)" }}
            >
              Order More
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[30vw] max-md:h-[45vw] flex items-center justify-center overflow-hidden bg-dark-red">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[20vw] h-[20vw] rounded-full bg-red/10 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[15vw] h-[15vw] rounded-full bg-mustard/10 animate-float-reverse" />
        </div>
        <div className="relative z-10 text-center px-[5vw]">
          <h1
            className="text-[6vw] max-md:text-[10vw] text-beige uppercase leading-[.85]"
            style={{
              fontFamily: "var(--font-mouse)",
              WebkitTextStroke: "2px #FFD700",
              color: "transparent",
            }}
          >
            Checkout
          </h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-[5vw] max-md:py-[8vw] bg-beige">
        <div className="max-w-[1200px] mx-auto px-[5vw] max-md:px-[4vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4vw]">

            {/* Left: Order Summary */}
            <div>
              <h2 className="text-[2.5vw] max-md:text-[6vw] text-black uppercase mb-6" style={{ fontFamily: "var(--font-modak)" }}>
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-beige flex-shrink-0">
                      <svg viewBox="0 0 60 60" className="w-full h-full">
                        <circle cx="30" cy="30" r="28" fill={item.image} opacity="0.3" />
                        <circle cx="30" cy="30" r="20" fill={item.image} opacity="0.5" />
                        <circle cx="30" cy="30" r="12" fill={item.image} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
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
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-black/30 hover:text-red transition-colors cursor-pointer ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-black/60 text-[1vw] max-md:text-[3.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                    Subtotal
                  </span>
                  <span className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Rs. {subtotal}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-beige-dark">
                  <span className="text-black/60 text-[1vw] max-md:text-[3.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                    Delivery Fee
                  </span>
                  <span className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Rs. {deliveryFee}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black text-[1.3vw] max-md:text-[4vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Total
                  </span>
                  <span className="text-red text-[1.5vw] max-md:text-[5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>
                    Rs. {grandTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Payment & Details */}
            <div>
              {/* Delivery Details */}
              <h2 className="text-[2.5vw] max-md:text-[6vw] text-black uppercase mb-6" style={{ fontFamily: "var(--font-modak)" }}>
                Delivery Details
              </h2>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-white rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-red/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                  style={{ fontFamily: "var(--font-mouse)" }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-white rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-red/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                  style={{ fontFamily: "var(--font-mouse)" }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-white rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-red/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                  style={{ fontFamily: "var(--font-mouse)" }}
                />
              </div>

              {/* Payment Method */}
              <h2 className="text-[2.5vw] max-md:text-[6vw] text-black uppercase mb-6" style={{ fontFamily: "var(--font-modak)" }}>
                Payment Method
              </h2>

              <div className="space-y-3 mb-6">
                {/* EasyPaisa */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "easypaisa"
                      ? "bg-green-500/10 ring-2 ring-green-500/30"
                      : "bg-white hover:bg-green-500/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa"
                    checked={paymentMethod === "easypaisa"}
                    onChange={() => setPaymentMethod("easypaisa")}
                    className="w-5 h-5 accent-green-600"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                      <span className="text-white text-[0.7vw] max-md:text-[2.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>EP</span>
                    </div>
                    <div>
                      <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>EasyPaisa</p>
                      <p className="text-black/40 text-[.8vw] max-md:text-[2.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>Pay via EasyPaisa mobile account</p>
                    </div>
                  </div>
                </label>

                {/* JazzCash */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "jazzcash"
                      ? "bg-red/10 ring-2 ring-red/30"
                      : "bg-white hover:bg-red/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash"
                    checked={paymentMethod === "jazzcash"}
                    onChange={() => setPaymentMethod("jazzcash")}
                    className="w-5 h-5 accent-red"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red flex items-center justify-center">
                      <span className="text-white text-[0.7vw] max-md:text-[2.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>JC</span>
                    </div>
                    <div>
                      <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>JazzCash</p>
                      <p className="text-black/40 text-[.8vw] max-md:text-[2.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>Pay via JazzCash mobile account</p>
                    </div>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "card"
                      ? "bg-mustard/10 ring-2 ring-mustard/30"
                      : "bg-white hover:bg-mustard/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-5 h-5 accent-yellow-500"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-mustard-dark flex items-center justify-center">
                      <span className="text-white text-[0.7vw] max-md:text-[2.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>VISA</span>
                    </div>
                    <div>
                      <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold" style={{ fontFamily: "var(--font-mouse)" }}>Credit / Debit Card</p>
                      <p className="text-black/40 text-[.8vw] max-md:text-[2.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>Pay with Visa or Mastercard</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Fields */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                {paymentMethod === "easypaisa" && (
                  <div className="space-y-4">
                    <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold mb-2" style={{ fontFamily: "var(--font-mouse)" }}>
                      EasyPaisa Account Number
                    </p>
                    <input
                      type="tel"
                      name="easypaisaNumber"
                      placeholder="03XXXXXXXXX"
                      value={formData.easypaisaNumber}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-beige rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-green-500/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                      style={{ fontFamily: "var(--font-mouse)" }}
                    />
                    <p className="text-black/40 text-[.8vw] max-md:text-[2.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                      You will receive a confirmation prompt on your phone
                    </p>
                  </div>
                )}

                {paymentMethod === "jazzcash" && (
                  <div className="space-y-4">
                    <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold mb-2" style={{ fontFamily: "var(--font-mouse)" }}>
                      JazzCash Account Number
                    </p>
                    <input
                      type="tel"
                      name="jazzcashNumber"
                      placeholder="03XXXXXXXXX"
                      value={formData.jazzcashNumber}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-beige rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-red/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                      style={{ fontFamily: "var(--font-mouse)" }}
                    />
                    <p className="text-black/40 text-[.8vw] max-md:text-[2.5vw]" style={{ fontFamily: "var(--font-mouse)" }}>
                      You will receive a confirmation prompt on your phone
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <p className="text-black text-[1.1vw] max-md:text-[3.5vw] font-bold mb-2" style={{ fontFamily: "var(--font-mouse)" }}>
                      Card Details
                    </p>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-beige rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-mustard/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                      style={{ fontFamily: "var(--font-mouse)" }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-beige rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-mustard/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                        style={{ fontFamily: "var(--font-mouse)" }}
                      />
                      <input
                        type="text"
                        name="cardCvv"
                        placeholder="CVV"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-beige rounded-xl text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-mustard/30 transition-all text-[1vw] max-md:text-[3.5vw]"
                        style={{ fontFamily: "var(--font-mouse)" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-red text-beige rounded-full font-bold uppercase hover:bg-dark-red transition-all duration-400 cursor-pointer hover:shadow-lg hover:scale-[1.02] text-[1.2vw] max-md:text-[4vw]"
                style={{ fontFamily: "var(--font-mouse)" }}
              >
                Place Order — Rs. {grandTotal}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
