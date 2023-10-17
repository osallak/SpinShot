import Image from 'next/image'
import React from 'react'
import { useAppSelector } from '../../../../redux_tool';
import untouchableLose from "../../../../public/untouchableLose.svg";
import untouchableWin from "../../../../public/untouchableLose.svg";


const Untouchable = () => {
    const achievement_data = useAppSelector((state) => state.Profile);
  return (
    <div className={`  bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row  justify-between`}>
    <div className={` ${1 ? "text-pearl opacity-40" : "text-pearl "} p-4 sm:p-4 c-gb:p-10 space-y-[15%] c-gb:space-y-[20%]`}>
      <h1 className="text-pearl text-sm sm:text-2xl">
      UNTOUCHABLE
      </h1>
      <h1 className="text-pearl text-[8px] sm:text-sm">
      WIN A MATCH WITHOUT YOUR OPPONENT SCORING A SINGLE POINT
      </h1>
    </div>
    <div className="flex justify-center items-center   ">
      {1 ? (
        <Image className="      " src={untouchableLose} alt="" />
      ) : (
        <Image className="      " src={untouchableWin} alt="" />
      )}
    </div>
  </div>
  )
}

export default Untouchable