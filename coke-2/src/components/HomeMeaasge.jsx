import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import HomeHero from "../components/HomeHero";

gsap.registerPlugin(useGSAP, SplitText);

const HomeMeaasge = () => {
  useGSAP(() => {
    const splitWords1 = SplitText.create(".first-message h1", {
      type: "chars",
    });

    const splitWords2 = SplitText.create(".second-message h1", {
      type: "chars",
    });

    const splitWords3 = SplitText.create(".third-message h1", {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-part2",
        start: "top 40%",
        end: "top 0%",
        scrub: 2,
      },
    });

    tl.to(splitWords1.chars, {
      duration: 2,
      color: "#faeade",
      stagger: 0.3,
    })

      .to(".second-message", {
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        duration: 2,
      })
      .to(splitWords2.chars, {
        color: "#faeade",
        stagger: 0.3,
      })

      .to(splitWords3.chars, {
        duration: 2,
        color: "#faeade",
        stagger: 0.3,
      });
  });

  return (
    <div className="home-part2 md:h-screen h-[90vh] bg-black relative overflow-hidden">
      
      <div className="message-content h-full flex flex-col justify-center items-center gap-[1vw]  md:px-[10vw] md:leading-[20vw] lg:leading-[13vw] leading-[25vw] uppercase font-bold  tracking-tight md:text-[12vw] text-[13vw] text-transparent [-webkit-text-stroke:1px_#3b82f6] ">

        <div className="first-message flex justify-center items-center">
          <h1 className=" text-center">Stay Refreshed</h1>
        </div>

        <div
          className="second-message relative -rotate-6 px-[3vw] border-3 border-white bg-red-600"
          style={{ clipPath: "polygon(0 0,0 0, 0 100%, 0% 100%)" }}
        >
          <h1 className="text-[11vw] md:text-[10vw] text-center ">
            With
          </h1>
        </div>

        <div className="third-message">
          <h1 className="text-center">Coca - Cola</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeMeaasge;
