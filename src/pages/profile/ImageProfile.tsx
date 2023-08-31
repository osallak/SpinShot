import ibenmain from "./../../../public/ibenmain.jpeg"
import Image from "next/image"
import React from 'react'

const ImageProfile = (props:any) => {
  const response = props.response;
  return (
    <div className="  rounded-[20px] flex flex-col items-center justify-center text-pearl text-opacity-40 w-full p-20 c-gb:w-[30%] ">
        <div className="rounded-3xl w-[120px] sm:w-[20%] c-gb:w-[10rem] c-10xl:w-[15rem]  relative ">
            <Image className=" rounded-[20px] " src={ibenmain} alt="" />
        </div>
        <div className="flex flex-col items-center c-10xl:text-xl text-md">
                <span>Ibenmain</span>
                <span>{response[0]?.id}</span>

        </div>
    </div>
  )
}

export default ImageProfile;