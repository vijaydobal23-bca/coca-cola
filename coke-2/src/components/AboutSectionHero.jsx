import React from 'react'
import Model3D from './Model3D'


const AboutSectionHero = ({can ,val}) => {

  
  return (
    <div className={`part${can.part} md:min-h-screen h-[85vh] w-full flex items-center justify-center`}>

      <div className="can-container flex items-center justify-center w-full">

        <div className="first-can relative flex items-center justify-center">

          <h1 className="text-[30vw] text-gray-200 absolute font-bold">{can.name}</h1>

          {/* Orange Slice */}
          <img
            src={can.img1}
            alt=""
            className="orange absolute w-[45%] md:w-[35%]  md:top-[0%] md:left-[20%] top-[15%] left-[10%] lg:w-[20%] lg:left-[30%] z-0"
          />

          {/* Can */}
        
         <div className={`z-10 ${can.class}`}> <Model3D fileName={can.model} val = {val}/></div>
          <img src={can.img2}alt="" className="orange w-[45vw] md:w-[35vw] absolute z-20 md:top-[65%] bottom-[5%] left-[55%] lg:top-[65%] lg:w-[25vw] "/>

        </div>

      </div>

    </div>
  )
}

export default AboutSectionHero
