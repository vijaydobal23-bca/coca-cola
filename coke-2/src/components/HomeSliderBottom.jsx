import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const HomeSliderBottom = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      
      scrollTrigger: {
        trigger: ".sliderBottom",
        start: "top 45%",
        end: "top 10%",
        
        scrub: 2,
      
      },
    });

    tl.to(".slider1 .img2", {
      yPercent: "212",
      scale: 1.54,
    })
      .from(
        ".sliderBottom .btmimg1",
        {
          rotation: -90, 
          transformOrigin: "bottom right",
          ease:"back"
        },
        "combine",
      )
      .from(
        ".sliderBottom .btmimg2",
        {
          rotation: 90, 
          transformOrigin: "bottom left",
          ease:"back"
        },
        "combine",
      );
  });

  return (
    <div className="h-screen  w-screen bg-black flex justify-between items-center sliderBottom">
      <div
        className="
          relative 
          w-[85vw] md:w-[60vw] lg:w-[40vw]
          h-75 md:h-95 lg:h-[28vw]
          flex items-center justify-center "
      >
        <img
          src="/images/can-3.png"
          className="relative w-[55%] md:w-[60%] lg:w-[65%] btmimg1"
        />
      </div>

      <div
        className="
          relative 
          w-[85vw] md:w-[60vw] lg:w-[40vw]
          h-75 md:h-95 lg:h-[28vw]
          flex items-center justify-center"
      >
        <img
          src="/images/can-5.png"
          className="relative w-[55%] md:w-[60%] lg:w-[65%] btmimg2"
        />
      </div>
    </div>
  );
};

export default HomeSliderBottom;
