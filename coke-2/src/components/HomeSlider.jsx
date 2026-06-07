import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const HomeSlider = ({slider}) => {

  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:`.${slider.class}`,
        start:"top 15%",
        end:"top 40%",
        scrub:3,
        
      }
    })

    tl.from(`.${slider.class} .card-container` ,{
      rotate:-`${slider.rotate}`,
      x:`${slider.x}`,
      opacity:0,
      
     
    })
  })
 


  return (
    <div className = {`${slider.class} w-full min-h-screen ] flex flex-col items-center justify-center px-6 py-20 bg-black z-20`}>

      
      <div className="card-container flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-[6vw] w-full max-w-350 overflowX-auto">

       
        <div
          className="
          relative 
          w-[85vw] md:w-[60vw] lg:w-[32vw]
          h-75 md:h-95 lg:h-[28vw]
          flex items-center justify-center
          lg:rotate-[-15deg]
        "
        >
          <img
            src="/images/bg-3.svg"
            className="absolute w-full h-full object-cover rounded-[40px]"
          />

          <img
            src={`${slider.img1}`}
            className="relative w-[55%] md:w-[60%] lg:w-[65%]"
          />
        </div>

        <div
          className="
          relative 
          w-[85vw] md:w-[60vw] lg:w-[32vw]
          h-75 md:h-95 lg:h-[28vw]
          flex items-center justify-center
          lg:-translate-y-12
        "
        >
          <img
            src="/images/bg-2.svg"
            className="absolute w-full h-full object-cover rounded-[40px]"
          />

          <img
            src={`${slider.img2}`}
            className="relative w-[55%] md:w-[60%] lg:w-[65%] img2"
          />
        </div>



         <div
          className="
          relative 
          w-[85vw] md:w-[60vw] lg:w-[32vw]
          h-75 md:h-95 lg:h-[28vw]
          flex items-center justify-center
          lg:rotate-15
        "
        >
          <img
            src="/images/bg-1.svg"
            className="absolute w-full h-full object-cover rounded-[40px]"
          />

          <img
            src={`${slider.img3}`}
            className="relative w-[55%] md:w-[60%] lg:w-[65%]"
          />
        </div>

      </div>

      {/* BUTTON */}
      <button className="mt-16 px-10 py-4 bg-[#d89b4c] rounded-full font-semibold tracking-wider hover:scale-105 transition">
        GET IT NOW
      </button>

    </div>
  );
};

export default HomeSlider;