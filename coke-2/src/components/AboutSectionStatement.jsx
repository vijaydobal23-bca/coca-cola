import React from 'react'

const AboutSectionStatement = ({can}) => {
  return (
     <div className ={`section-part${can.part} md:h-screen h-[80vh] w-full flex flex-col md:flex-row`}>
        {/* Left */}
        <div className="left w-full md:w-1/2 h-[40vh] md:h-auto flex items-center justify-center relative">
          <img
            src={can.img3}
            alt=""
            className="absolute top-[10%] right-[15%]"
          />
        </div>

        {/* Right */}
        <div className="right w-full md:w-1/2 flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 text-white px-6 sm:px-10 md:px-16 py-10">
          <h1
            className="font-bold leading-tight 
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          lg:text-6xl"
          >
           {can.heading}
          </h1>

          <p className="text-sm sm:text-base md:text-[1.5vw] max-w-150 leading-relaxed">
            {can.statement}
          </p>
        </div>
      </div>
  )
}

export default AboutSectionStatement
