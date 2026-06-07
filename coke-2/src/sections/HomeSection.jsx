import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import HomeHero from "../components/HomeHero";
import HomeMeaasge from "../components/HomeMeaasge";
import HomeCan from "../components/HomeCan";
import HomeSlider from "../components/HomeSlider";
import HomeVideo from "../components/HomeVideo";
import HomeText from "../components/HomeText";
import HomeSliderBottom from "../components/HomeSliderBottom";
import Wavy from "../components/Wawy";



gsap.registerPlugin(useGSAP, SplitText);

const HomeSection = () => {

  const homeSlider1 = {
    class:"slider1",
    rotate:10,
    x:-500,
    img1:"/images/can-1.png",
    img2:"/images/can-2.png",
    img3:"/images/can-4.png",
  }



 

  return (
    <section className="w-full z-10 bg-gray-300">
      
      <HomeHero />
      <HomeMeaasge/>
      <HomeCan/>
      <HomeSlider slider = {homeSlider1}/>
      {window.innerWidth >= 768 && <HomeSliderBottom />}
      <Wavy/>
      <HomeText/>
      <HomeVideo/>
    </section>
  );
};

export default HomeSection;