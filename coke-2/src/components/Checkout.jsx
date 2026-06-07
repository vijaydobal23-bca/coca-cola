import React, { useState } from "react";
import api from "../api/client";

const Checkout = ({ cartItems, total, selectedProductIds, onBack, onComplete }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address || !phone) return alert("Please fill all required fields");

    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        qty: item.qty,
        price: item.product.price,
        image: item.product.image,
      }));

      await api.post("/orders", {
        orderItems,
        selectedProductIds,
        address,
        phone,
        paymentMethod,
        totalAmount: total,
      });
      alert("Order placed successfully! Confirmation email sent.");
      onComplete(selectedProductIds);
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#0a0a0a] text-white overflow-y-auto">
      {/* Header */}
      <div className="p-[5vw] md:p-[2vw] pb-0 flex justify-between items-center">
        <h1 className="text-3xl font-black bg-[#1aff00] text-black px-5 py-2 rounded-sm italic tracking-tighter">
          CHECKOUT
        </h1>
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-[#1aff00] font-bold hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO CART
        </button>
      </div>

      <div className="p-[5vw] md:p-[2vw] grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            
            {/* Delivery Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#1aff00] text-black w-8 h-8 flex items-center justify-center font-black rounded-full">1</span>
                <h2 className="text-xl font-black uppercase tracking-widest">Delivery Details</h2>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-[#1aff00] transition-colors">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#141414] border border-[#222] rounded-xl p-4 text-white focus:outline-none focus:border-[#1aff00] focus:ring-1 focus:ring-[#1aff00] transition-all resize-none"
                    placeholder="Street, Apartment, City, State, Zip Code"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-[#1aff00] transition-colors">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141414] border border-[#222] rounded-xl p-4 text-white focus:outline-none focus:border-[#1aff00] focus:ring-1 focus:ring-[#1aff00] transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#1aff00] text-black w-8 h-8 flex items-center justify-center font-black rounded-full">2</span>
                <h2 className="text-xl font-black uppercase tracking-widest">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "COD" ? "border-[#1aff00] bg-[#1aff00]/10" : "border-[#222] bg-[#141414] hover:border-gray-600"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#1aff00]"
                    />
                    <span className="font-bold text-sm uppercase">Cash on Delivery</span>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "Card" ? "border-[#1aff00] bg-[#1aff00]/10" : "border-[#222] bg-[#141414] hover:border-gray-600"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#1aff00]"
                    />
                    <span className="font-bold text-sm uppercase">Credit/Debit Card</span>
                  </div>
                </label>
              </div>

              {paymentMethod === "Card" && (
                <div className="mt-6 p-6 bg-[#141414] border border-[#1aff00]/30 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 mb-1 uppercase">Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-black border border-[#333] rounded-lg p-3 text-sm focus:border-[#1aff00] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 mb-1 uppercase">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-black border border-[#333] rounded-lg p-3 text-sm focus:border-[#1aff00] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 mb-1 uppercase">CVC</label>
                      <input type="text" placeholder="XXX" className="w-full bg-black border border-[#333] rounded-lg p-3 text-sm focus:border-[#1aff00] outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1aff00] hover:bg-white text-black font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(26,255,0,0.2)] disabled:opacity-50 text-xl tracking-tighter uppercase active:scale-95"
            >
              {loading ? "PROCESSING ORDER..." : "PLACE YOUR ORDER"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#141414] border border-[#222] rounded-3xl p-6 lg:sticky lg:top-8">
            <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-[#222] pb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-black/40 p-3 rounded-xl border border-[#222]">
                  <img src={item.product.image} className="w-16  object-cover rounded-lg border  border-[#333]" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm uppercase truncate">{item.product.name}</p>
                    <p className="text-[#1aff00] text-xs font-black italic">QTY: {item.qty}</p>
                  </div>
                  <p className="font-bold text-sm text-white whitespace-nowrap">Rs. {item.product.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-[#222]">
              <div className="flex justify-between text-gray-400 text-sm font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm font-bold uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-[#1aff00]">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#222]">
                <span className="text-xl font-black uppercase italic tracking-tighter text-[#1aff00]">Total to Pay</span>
                <span className="text-2xl font-black text-white">Rs. {total}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-[#333]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1aff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c0 5.523 4.477 10 10 10s10-4.477 10-10l-.382-14.016z" />
              </svg>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">
                Secure checkout encrypted with industry-standard protocols.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;