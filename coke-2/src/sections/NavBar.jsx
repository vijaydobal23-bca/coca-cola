import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cart from "../components/Cart";
import MyOrders from "../components/MyOrders";
import api from "../api/client";

const NavBar = () => {  const [open, setOpen] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));

  const handleAuth = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await api.post("/auth/logout");
      } catch {
        // ignore logout error
      }
      localStorage.removeItem('userInfo');
      setUser(null);
      window.location.href = '/';
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });

    tl.from(".nav", {
      y: -100,
      duration: 0.8,
    });

    tl.from(".nav-img", {
      scale: 0,
      rotateX: 360,
      opacity: 1,
    });

    tl.from(".nav-item", {
      opacity: 0,
      y: 25,
      stagger: 0.1,
    });

    tl.from(".login", {
      y: 25,
      opacity: 0,
      duration: 0.8,
    });
  });

  return (
    <section>

      <nav className="nav w-full fixed top-0 left-0 z-50 py-2 md:py-[1.2vw] bg-transparent text-white lg:py-4 px-3 md:px-[4vw] lg:px-24">

        <div className="nav-container flex justify-between items-center">

          <div className="nav-img cursor-pointer">
            <img src="/images/logo2.png" alt="" className="w-14 sm:w-16 md:w-20 lg:w-24" />
          </div>

          <div className="nav-items flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-xs md:text-[16px] rounded-full px-2 md:px-[2vw] lg:px-6 py-1">

            <div className="nav-item rounded-full hover:bg-black px-2 py-1 md:px-4 ">
              <a href="/" >Home</a>
            </div>

            <div className="nav-item rounded-full hover:bg-black px-2 py-1 md:px-4">
              <a href="/about">About</a>
            </div>

            <div className="nav-item rounded-full hover:bg-black px-2 py-1 md:px-4">
              <a href="/store">Store</a>
            </div>

            <div className="nav-item rounded-full hover:bg-black px-2 py-1 md:px-4">
              <a href="/services">Services</a>
            </div>

          </div>

          <div className=" flex gap-[1vw] items-center">

            {user ? (
              <button onClick={handleAuth} className="nav-link login login-btn px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full border text-xs md:text-[1.1vw] lg:text-xl cursor-pointer">
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="nav-link loginlogin-btn px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full border text-xs md:text-[1.1vw] lg:text-xl cursor-pointer">
                  Login
                </a>
                <a href="/signup" className="nav-link login-btn px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full bg-red-600 border border-red-600 text-xs md:text-[1.1vw] lg:text-xl cursor-pointer text-white">
                  Signup
                </a>
              </>
            )}

            {(!user || user.role !== 'seller') ? (
              <div
                className="cart login-btn flex justify-center items-center px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full border text-xs md:text-[1.1vw] lg:text-xl cursor-pointer bg-white/10 hover:bg-white/20 transition"
                onClick={() => setOpen(true)}
              >
                Cart
              </div>
            ) : (
              <div
                className="my-orders login-btn flex justify-center items-center px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full border   text-xs md:text-[1.1vw] lg:text-xl cursor-pointer  transition"
                onClick={() => setOpenOrders(true)}
              >
                My Orders
              </div>
            )}

          </div>

        </div>

      </nav>

      {/* Cart Drawer for Users */}
      {open && (
        <div className="cart-drawer fixed md:right-[2%] h-screen md:w-[55vw] lg:w-[40vw] w-screen bg-cyan-200 z-50">
          <Cart closeCart={() => setOpen(false)} />
        </div>
      )}

      {/* Orders Drawer for Sellers */}
      {openOrders && (
        <div className="orders-drawer fixed md:right-[2%] h-screen md:w-[65vw] lg:w-[50vw] w-screen bg-cyan-200 z-50">
          <MyOrders closeOrders={() => setOpenOrders(false)} />
        </div>
      )}

    </section>
  );
};

export default NavBar;
