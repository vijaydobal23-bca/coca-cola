import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

 function Wavy() {
  const containerRef = useRef(null);
  const topPathRef = useRef(null);

  useEffect(() => {
    const wavePath = "M0,150 C150,280 300,20 450,150 C600,280 750,20 900,150 C1050,280 1200,20 1350,150 L1350,300 L0,300 Z";

    let ctx = gsap.context(() => {
      gsap.set(topPathRef.current, { attr: { d: wavePath } });
      gsap.to(topPathRef.current, {
        x: -450, 
        duration: 3, 
        ease: "none",
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useGSAP(()=>{
    const splitHeading = SplitText.create(".line1",{
      type:"chars"
    })

    const splitHeading2 = SplitText.create(".line2",{
      type:"chars"
    })

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:".wave-container",
        start:"top 60%",
        end:"top -20%", 
        scrub:2,
        
        
      }
    })

    tl.from(splitHeading.chars,{
        
        opacity:0,
        duration:0.2,
        scale:0,
        y:200,
        rotate:-10, 
        stagger:0.03,
        
        ease:"back"
        
  

    },"combine").from(splitHeading2.chars,{
       opacity:0,
        duration:0.2,
        scale:0,
        y:200,
        rotate:-10, 
        stagger:0.03,
        
        ease:"back"
    },"combine").to(".container",{
      scale:2,
      filter:"blur(5px)",
      opacity:0.5,
      
      
      
      
    })
  })

  return (
    <div className="bg-black h-screen w-full overflow-hidden font-sans pt-30 md:pt-45 lg:pt-55 wave-container">
      
      <section 
        ref={containerRef}
        className="relative bg-[#FFCA08] w-full h-[calc(100vh-120px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-220px)] flex items-center justify-center"
      >
        {/* WAVE CONTAINER */}
        <div className="absolute top-0 left-0 w-full overflow-visible pointer-events-none">
          <svg 
            viewBox="0 0 900 300" 
            preserveAspectRatio="none" 
            className="w-[200%] h-30 md:h-45 lg:h-55 -mt-30 md:-mt-45 lg:-mt-55" 
          >
            <path ref={topPathRef} fill="#FFCA08" />
          </svg>
        </div>
 
        {/* CONTENT - FIXED CENTERING */}
        {/* Removed 'absolute', 'top-[10%]', and 'top-[40%]' */}
        <div className="container mx-auto px-6 text-center z-20">
          <h1 className="text-[#5a3b2b] 
               text-[12vw] 
               md:text-[10vw]  
               lg:text-[7.5vw] 
               font-extrabold uppercase 
               leading-[1.1] tracking-tight statement overflow-hidden line1">
            Just know that every win<br/>
          </h1>
          <h1 className="text-[#5a3b2b] 
               text-[12vw] 
               md:text-[10vw]  
               lg:text-[7.5vw] 
               font-extrabold uppercase 
               leading-[1.1] tracking-tight statement overflow-hidden line2 ">
            loss & adventure will make sense
          </h1>
        </div>

      </section>
      
    </div>
  );
}

export default Wavy