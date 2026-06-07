import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';



const HomeText = () => {


  useGSAP(()=>{

    gsap.to(".text" , {
      xPercent:"-100",
      duration:3,
      scrollTrigger:{
        trigger:".text-wrapper",
        start:"top 0%",
        end:"top -150%",
        scrub:2,
        pin:true,
      }
    })


  })

  return (
   <div className='text-wrapper h-screen bg-blue-600 w-screen text- lg:text-[25vw] md:text-[30vw] text-[35vw] font-extrabold flex justify-center items-center p-[1vw] text-transparent [-webkit-text-stroke:6px_white]'>

  <h2 className='whitespace-nowrap translate-x-[50%] text tracking-wide '>KEEP SCROLLING</h2> 
</div>
  )
}

export default HomeText 