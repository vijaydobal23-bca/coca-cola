import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = () => {
  useGSAP(() => {
    const tl = gsap.timeline(
    );

    const animConfig = {
      clipPath: "circle(100% at 50% 50%)",
      duration: 1.2,
      ease: "expo.inOut",
    };

    tl.to(".circle5", animConfig)
      .to(".circle4", animConfig, "-=1")
      .to(".circle3", animConfig, "-=1")
      .to(".circle2", animConfig, "-=1")
      .to(".circle1", animConfig, "-=1")
      .to(".loading", {
        duration: 0,
        display: "none",
      });
  });

  return (
    <div className="h-screen w-screen  loading block">
      <div className="h-full relative flex justify-center items-center">
        <div
          className="circle1 absolute h-full w-full bg-red-600 z-50"
          style={{ clipPath: "circle(5% at 50% 50%)" }}
        ></div>
        <div
          className="circle2 absolute h-full w-full bg-blue-500 z-40"
          style={{ clipPath: "circle(10% at 50% 50%)" }}
        ></div>
        <div
          className="circle3 absolute h-full w-full bg-black z-30"
          style={{ clipPath: "circle(15% at 50% 50%)" }}
        ></div>
        <div
          className="circle4 absolute h-full w-full bg-yellow-500 z-20"
          style={{ clipPath: "circle(15% at 50% 50%)" }}
        ></div>
        <div
          className="circle5 absolute h-full w-full bg-lime-500 z-10"
          style={{ clipPath: "circle(15% at 50% 50%)" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
