import Image from 'next/image'
import React from 'react'

const Subsidebar = () => {
  return (
        <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl xl:w-[570px] lg:w-[400px] w-[300px] space-y-8 ">
        <div className="flex justify-center items-center flex-col w-full h-[130px]">
          <div className="w-full h-[130px] flex-col px-6 ">
            <div className="w-full  pt-5 flex flex-row space-x-3 h-[130px]">
              <Image
                src=""
                alt="message icon"
                className=" h-full xl:w-10 w-9"
              />
              <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
                Messages
              </h1>
            </div>
            <div className="w-full border border-pearl border-opacity-40 "></div>
            
          </div>
          <div className="">

          </div>
        </div>
      </div>
  )
}

export default Subsidebar