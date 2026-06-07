import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Info = ({ info }) => {

  useGSAP(()=>{

     const splitNutrition = SplitText.create(`.info-part${info.part} h1`, { type: "chars" });
    const splitFacts = SplitText.create(`.info-part${info.part} .second`, { type: "chars" });

    

    const nutritionTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.info-part${info.part}`,
        start: "top 75%",
        end: "top 0%",
        scrub: 2,
      },
    });

    nutritionTl
      .from(splitNutrition.chars, {
        opacity: 0,
        y: 100,
        rotate:50,
        scale:0,
        stagger: 0.05,
      })
      .from(splitFacts.chars, {
        opacity: 0,
        y: 100,
        stagger: 0.05,
      })
      .from(`.info-part${info.part} .info-bottom h1`, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
      });





    const splitPara = SplitText.create(`.info-part${info.part} .nutrition p`,{
      type:"words"
    });

    gsap.from(splitPara.words ,{
     
      
      opacity:0,
      stagger:0.02,
      duration:1,
      
      
      
      scrollTrigger:{
        trigger:`.info-part${info.part}`,
        start:"top 50%",
        end:"top 10%",
        scrub:2,
       
       
        
      }
    })
  })


  return (
    <div className={`info-part${info.part} bg-black h-screen flex relative`}>

      <div className="nutrition h-full w-full font-bold flex md:flex-row flex-col items-center justify-center md:justify-normal text-center lg:items-start lg:text-left md:px-[2vw] text-milk pb-[3vw] md:pb-0 gap-[2vw]">

        <div className="h-[45%]">
          <h1 className="text-[15vw] md:text-[10vw] first md:-rotate-3">NUTRITIONAL</h1>
          <h1 className="text-[15vw] md:text-[10vw] second md:-rotate-6">FACT</h1>
        </div>

        <div className="md:w-[30%] w-[90%] md:mb-0 mb-[15vw]  flex justify-center py-2 items-center md:absolute right-[2%] top-[30%] px-[3vw] text-[12px] md:leading-[2vw] lg:leading-[1.5vw] ">

          <p className="overflow-hidden  tracking-wider text-center">{info.name} offers a refreshing burst of flavor, delivering quick energy through carbohydrates, with its crisp fizz and sweetness making it a popular choice for instant refreshment.</p>
        </div>
      </div>

      <div className="info-content w-full absolute bottom-[2%]  px-[1vw] md:px-[10vw]">
        <div className="info flex   bg-milk justify-between items-center rounded-full font-bold py-[1.5vw] border-5">

          <div className="info-bottom border-r last:border-r-0 px-6 py-4 text-center flex-1">
            <h4>ENERGY</h4>
            <p>UP TO</p>
            <h1 className="md:text-3xl">{info.info.energy}</h1>
          </div>

          <div className="info-bottom border-r last:border-r-0 px-6 py-4 text-center flex-1">
            <h4>CARBS</h4>
            <p>UP TO</p>
            <h1 className="md:text-3xl">{info.info.carbs}</h1>
          </div>

          <div className="info-bottom border-r last:border-r-0 px-6 py-4 text-center flex-1">
            <h4>SUGAR</h4>
            <p>UP TO</p>
            <h1 className="md:text-3xl">{info.info.suger}</h1>
          </div>

          <div className="info-bottom border-r last:border-r-0 px-6 py-4 text-center flex-1">
            <h4>SODIUM</h4>
            <p>UP TO</p>
            <h1 className="md:text-3xl">{info.info.sodium}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
