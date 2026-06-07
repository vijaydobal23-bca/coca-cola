import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const HomeCan = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width:1024px)", () => {
      const splitText = new SplitText(".can-title", { type: "chars" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".can-animation",
          start: "top 0%",
          end: "top -110%",
          scrub: 2,
          pin: true,
        },
      });

      tl.from(splitText.chars, { y: 100, opacity: 0, stagger: 0.2 });

      tl.from(".img1", { opacity: 0, x: -200 })
        .from(".img2", { opacity: 0, y: 200, x: -200 })
        .from(".img4", { opacity: 0, y: 200, x: 200 })
        .from(".img5", { opacity: 0, x: 200 })
        .from(".img3", { opacity: 0, y: 200 });
    });
  });

  return (
    <div className="can-animation w-full relative bg-orange-400">
      {/* PRODUCTS TEXT */}
      <h1 className="can-title sticky top-10 text-center text-[18vw] md:text-[30vw] lg:text-[27vw] font-bold whitespace-nowrap text-gray-100 z-50 md:z-0 py-4 md:absolute md:left-1/2 md:-translate-x-1/2 overflow-hidden">
        PRODUCTS
      </h1>

      {/* CAN CONTAINER */}
      <div className="can-container relative flex items-center justify-center h-screen overflow-x-auto md:overflow-hidden pt-24 md:pt-0">
        <div className="flex md:block gap-10 px-10 md:px-0">
          <img
            src="/images/can-1.png"
            alt=""
            className="img1 w-[60vw] md:w-[32vw] lg:w-[23vw] md:absolute md:top-[23%] md:left-[15%] z-30"
          />

          <img
            src="/images/can-2.png"
            alt=""
            className="img2 w-[65vw] md:w-[35vw] lg:w-[26vw] md:absolute md:top-[19%] md:left-[25%] z-40"
          />

          <img
            src="/images/can-3.png"
            alt=""
            className="img3 w-[70vw] md:w-[38vw] lg:w-[28vw] md:absolute md:top-[14%] md:left-[35%] z-50"
          />

          <img
            src="/images/can-4.png"
            alt=""
            className="img4 w-[65vw] md:w-[35vw] lg:w-[26vw] md:absolute md:top-[19%] md:left-[48%] z-40"
          />

          <img
            src="/images/can-5.png"
            alt=""
            className="img5 w-[60vw] md:w-[32vw] lg:w-[23vw] md:absolute md:top-[23%] md:left-[60%] z-30"
          />

          
        </div>
      </div>
    </div>
  );
};

export default HomeCan;
