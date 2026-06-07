import React from "react";
import AboutSectionHero from "../components/AboutSectionHero";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import AboutSectionStatement from "../components/AboutSectionStatement";


import Info from "../components/Info";
import Loading from "../components/Loading";
import VideoAnimation from "../components/Footer";

const AboutSection = () => {
  const fanta = {
    name: "FANTA",
    model: "fanta_can.glb",
    img1: "/images/lemon-4.png",
    img2: "/images/lemon-3.webp",
    statement:
      "Brighten your day with the bold, fruity splash of Fanta! Every sip bursts with lively orange flavor that refreshes your mind and lifts your mood. Whether you’re taking a break, hanging out with friends, or chasing new goals, Fanta adds a spark of fun and energy to every moment. Stay vibrant, stay refreshed!",
    img3: "/images/leaf-1.png",
    heading: "ABOUT FANTA",
    class: "fanta",
    part: "1",
    info: {
      amount: "Per 100ml",
      energy: "42 kcal",
      carbs: "10.6g",
      suger: "10.6g",
      sodium: "11mg",
      fat: "0g",
      protine: "0g",
    },
  };

  const coke = {
    name: "COKE",
    model: "french_coke_can.glb",
    img1: "/images/leaf2.png",
    img2: "",
    statement:
      "Enjoy the timeless refreshment of Coca-Cola! Every sip delivers a crisp, uplifting taste that refreshes your mind and energizes your day. Whether you're relaxing, celebrating, or sharing moments with friends, Coca-Cola brings a spark of happiness and makes every moment feel a little more special.",
    img3: "/images/leaf-3.webp",
    heading: "ABOUT COKE",
    class: "Coke",
    part: "2",

    info: {
      amount: "Per 100ml",
      energy: "56 kacl",
      carbs: "14g",
      suger: "14.5g",
      sodium: "10g",
      fat: "0g",
      protine: "0g",
    },
  };

  const pepsi = {
    name: "PEPSI",
    model: "pepsi_can.glb",
    img1: "",
    img2: "",
    statement:
      "Feel the bold energy of Pepsi with every refreshing sip! Its crisp, exciting taste brings a burst of cool confidence that lifts your mood and fuels your day. Whether you're chasing goals, enjoying music, or celebrating with friends, Pepsi keeps the vibe alive and the moment unforgettable. Stay bold, stay refreshed",
    img3: "",
    heading: "ABOUT PEPSI",
    class: "Pepsi",
    part: "3",

    info: {
      amount: "Per 100ml",
      energy: "41 kcal",
      carbs: "10.4g",
      suger: "10.4g",
      sodium: "10mg",
      fat: "0g",
      protine: "0g",
    },
  };

  const fantaVal = {
    x: 26,
    y: 26,
    z: 26,
    px: 0,
    py: -1.7,
    pz: 0,
  };

  const CokeVal = {
    x: 1,
    y: 1,
    z: 1,
    px: 0,
    py: -2.2,
    pz: 0,
  };

  const pepsiVal = {
    x: 0.021,
    y: 0.021,
    z: 0.021,
    px: 0,
    py: -1.5,
    pz: 0,
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      //  FANTA INTRO

      const fantaIntroTl = gsap.timeline();

      fantaIntroTl.to(".LoadingAnim",{
        display:"none",
        duration:2.5
      })
      .from(".orange", {
          x: 100,
          rotate: 360,
          scale: 0,
          duration: 1,
        })
        .from(".fanta", {
          opacity: 0,
          duration: 1,
          x: 400,
          y: -400,
        });

      //  FANTA SCROLL

      const fantaScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-part1",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
        },
      });

      fantaScrollTl.to(".fanta", {
        xPercent: -30,
        yPercent: 100,
        rotate:360,
      });

      // FANTA INFO

      const fantaInfoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info-part1",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
        },
      });

      fantaInfoTl.to(".fanta", {
        yPercent: 200,
        xPercent: 0,
      });

      //  FANTA TEXT

      //  COKE INTRO

      const cokeIntroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".part2",
          start: "top 0%",
          end: "top 20%",
        },
      });

      cokeIntroTl.from(".Coke", {
        x: -400,
        y: -400,
        scale: 0,
        duration: 1,
      });

      // COKE SCROLL

      const cokeScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-part2",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
        },
      });

      cokeScrollTl.to(".Coke", {
        xPercent: -30,
        yPercent: 100,
        rotate:-15,
      });

      //  COKE INFO

      const cokeInfoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info-part2",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
        },
      });

      cokeInfoTl.to(".Coke", {
        yPercent: 200,
        xPercent: 0,
      });

      //  COKE TEXT

      //  PEPSI INTRO

      const pepsiIntroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".part3",
          start: "top 0%",
          end: "top 20%",
        },
      });

      pepsiIntroTl.from(".Pepsi", {
        x: 400,
        y: -400,
        scale: 0,
        duration: 1,
      });

      //  PEPSI SCROLL

      const pepsiScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-part3",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
        },
      });

      pepsiScrollTl.to(".Pepsi", {
        xPercent: -30,
        yPercent: 100,
        rotate:15,
      });

      //  PEPSI INFO

      const pepsiInfotl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info-part3",
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
          
        },
      });

      pepsiInfotl.to(".Pepsi", {
        xPercent: 0,
        yPercent: 200,
        rotate:375,
      });

      
    });

    
  });

  return (
    <section className="w-full">
      <div className="absolute LoadingAnim"><Loading/></div>
      <div className="fantaSection">
        <AboutSectionHero can={fanta} val={fantaVal} />
        <AboutSectionStatement can={fanta} />
        <Info info={fanta} />
      </div>

      <div className="cokeSection">
        <AboutSectionHero can={coke} val={CokeVal} />
        <AboutSectionStatement can={coke} />
        <Info info={coke} />
      </div>

      <div className="pepsiSection">
        <AboutSectionHero can={pepsi} val={pepsiVal} />
        <AboutSectionStatement can={pepsi} />
        <Info info={pepsi} />
      </div>
      
    </section>
  );
};

export default AboutSection;
