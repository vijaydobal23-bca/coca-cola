import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const HomeVideo = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".videoContainer",
        start: "top 0%",
        end: "top -100%",
        scrub: 2,
        pin: true,
      },
    });

    tl.to(".video-box", {
      clipPath: "circle(100% at 50% 50%)",
      ease: "power1.inOut",
    });

  }, [isMobile]); 

  return (
    <div className="bg-black h-screen w-screen videoContainer">
      <div className="h-full w-full">
        
        <div
          className="video-box relative h-full w-full"
          style={{
            clipPath: isMobile
              ? "circle(100% at 50% 50%)"
              : "circle(12% at 50% 50%)",
          }}
        >
          <video
            src="video.mp4"
            loop
            muted
            autoPlay
            className="h-full w-full object-cover"
          />

        
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <img src="/images/play.svg" className="w-[5vw]" alt="" />
          </div>

        
          <div className="absolute inset-0 flex justify-center items-center z-10 animate-[spin_10s_linear_infinite]">
  
            <img src="/images/circle-text.svg" className="w-[20vw]" alt="" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeVideo;