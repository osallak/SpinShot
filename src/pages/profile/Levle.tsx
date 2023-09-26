import proLogo from "./../../../public/proImg.svg"
import level from "./../../../public/levleIcon.svg"
import {SignOut} from "@/Components/ui/DropDown/ArrayIcon"
import DropdownUser from "@/Components/ui/DropDown/DropdownUser"
import Image from "next/image"
import React from 'react'

const  Levle = (props:any) => {
    const opned = props.opne;
    return (
    <div className={`rounded-[20px] ${(opned && props.width! < 1024) ? "opacity-10   backdrop:blur bg-white/10 " : "backdrop:blur bg-white/10 " }  w-full flex flex-col`}>
        
        <div className="relative rounded-[20px]  w-full  h-[250px] c-gb:h-[70%]  flex flex-row justify-center  ">
            <div className="absolute w-[120px] sm:w-[20%] c-gb:w-[10rem] c-10xl:w-[12rem] c-10xl:top-8  flex flex-col items-center justify-center  h-full top-10 space-y-4" >
                <span className="text-xl md:text-3xl c-gb:text-5xl text-pearl ">PRO</span>
                <Image src={proLogo} alt="" />
            </div>
            <div className="  right-0 absolute p-8 hidden c-gb:block">
                <DropdownUser Array={SignOut}/>
            </div>
        </div>
        <div className=" flex items-center justify-center flex-col  rounded-[20px] w-full h-[100px] c-gb:h-[30%]">
            <div className=" text-xl flex  justify-between  text-pearl  opacity-40 w-[85%]">
                <div className="flex flex-row space-x-1">
                    <Image className="" src={level} alt=""></Image> <span >level</span> <span>5</span>
                </div>
                <div className="">
                    <span>50.00/100</span>
                </div>
            </div>
            <div className=" bg-very-dark-purple  rounded-[20px] w-[90%] h-[25%] c-gb:h-[30%] flex items-center justify-start p-1">
                <div className="rounded-[20px] bg-peridot w-[65%] h-[100%] ">
                </div>
            </div>
        </div >
    </div>
  )
}

export default Levle;