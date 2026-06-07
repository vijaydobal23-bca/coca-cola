import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/src/all'

const FooterContent = () => {

  useGSAP(()=>{

    const splitScrolling = SplitText.create(".second h1" , {
      type:"chars",
    })
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:".anim",
        start:"top 20%",
        end:"top 0%",
        scrub:2
        
        
      }
    })

    tl.from(".first .left h2" ,{
      x:-100,
      opacity:0,
      stagger:0.1
    });


    const tl2 = gsap.timeline({
      scrollTrigger:{
        trigger:".anim",
        start:"top 10%",
        end:"top -50%",
        
        scrub:2,
        
      }
    })

    tl2.from(".first .right h1" , {
      opacity:0,
      x:200,
      stagger:0.3,
    })


    tl2.from(splitScrolling.chars, {
      opacity:0,
      y:-100,
      rotateY:100,
      stagger:0.2
      
    })
  })
  return (
    <div className="content absolute z-40 h-screen w-screen text-white">

          <div className="first h-[60%] w-full mt-[5vw] flex">
            <div className="left flex w-[50%] flex-col gap-[3vw] px-[5vw] text-[2vw]">
              <h2 className="text-[4vw] uppercase">
                Worlds No. 1 Cold Drink Brand
              </h2>
              <h2>
                <a href="/about">About</a>
              </h2>
              <h2>
                <a href="/home">Home</a>
              </h2>
              <h2>
                <a href="/store">Store</a>
              </h2>
            </div>

            <div className="right flex w-[50%] flex-col justify-center gap-[3vw] items-center text-[3vw] px-[2vw]">
              <h1>STAY REFRESHED WITH COKE</h1>
              <h1>ORIGINAL TASTE</h1>
              <h1>KEEP SCROLLING</h1>
            </div>
          </div>

          <div className="second h-[40%] w-full flex justify-center items-center ">
            <h1 className="md:text-[9vw] text-[15vw] font-bold md:mb-[1vw] tracking-wider">KEEP SMILING</h1>
          </div>
        </div>

  )
}

export default FooterContent
