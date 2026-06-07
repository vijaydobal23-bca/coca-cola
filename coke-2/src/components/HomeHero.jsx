import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import Home3D from "./Model3D";
import Model3D from "./Model3D";
import Loading from "./Loading";

const HomeHero = () => {


   const val = {
      x:1,y:1,z:1,
      px:0,py:-2.2,pz:0
  }
  useGSAP(() => {
    const splitCoke = SplitText.create(".coke", {
      type: "chars",
    });

    const splitRecycle = SplitText.create(".recycle h2" , {
      type:"chars",
    })

    const splitTaste = SplitText.create(".original h2" , {
      type:"chars",
    })

    const canTl = gsap.timeline();

    canTl.to("anim",{
      display:"none",
      duration:2.5,
    })
      .from(splitCoke.chars, {
        
        y: 300,
        duration: 0.7,
        stagger: 0.08,
        opacity: 0,
        ease: "power2.out",
      })
      .from("canvas", {
        opacity: 0,
        y:300,
        
        
        duration: 0.8,
       
      }).from(splitRecycle.chars ,{
        opacity:0,
        stagger:0.05,
        
      }).from(splitTaste.chars ,{
        opacity:0,
        stagger:0.05,
      });

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "1% top",
        end: "bottom top",

        scrub: true,
      },
    });
    heroTl.to(".hero-section", {
      rotate: 5,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <div className="w-full hero-section z-0 relative overflow-hidden ">
      <div className="absolute">
        <Loading></Loading>
      </div>

      <div className="3d absolute z-50">
        <Model3D fileName={"french_coke_light_can.glb"} val = {val}/>
      </div>

      <div className="hero-coke h-screen flex justify-center items-center">
        <div className="coke-container overflow-hidden">
          <h1 className="md:text-[32vw] text-[40vw] text-milk font-bold coke overflow-hidden">
            COKE
          </h1>
        </div>

        <div className="absolute bottom-[5%] left-[10%] text-2xl text-milk tracking-normal recycle">
          <h2>RECYCLE ME</h2>
        </div>

        <div className="absolute bottom-[5%] right-[10%] text-milk text-2xl tracking-normal original">
          <h2> ORIGINAL TASTE</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
