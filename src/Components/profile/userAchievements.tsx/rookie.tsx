import React from 'react'

import rookieLose from "../../../../public/ rookieLose.svg";
import rookieWin from "../../../../public/rookieWin.svg";
import Image from 'next/image';
import { useAppSelector } from '../../../../redux_tool';
const Rookie = () => {
    const achievement_data = useAppSelector((state) => state.Profile);
  return (
    <div className={`  bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row justify-between`}>
    <div className={` ${1 ? "text-pearl opacity-40" : "text-pearl "} p-4 sm:p-10 space-y-[20%]`}>
      <h1 className=" text-sm sm:text-2xl">
        {achievement_data.profile?.achievements[0]?.Achiement?.name}
      </h1>
      <h1 className=" text-[8px] sm:text-sm">
        {
          achievement_data.profile?.achievements[0]?.Achiement
            ?.description
        }
      </h1>
    </div>
    <div className="flex justify-center items-center  ">
      {1 ? (
        <Image className="      " src={rookieLose} alt="" />
      ) : (
        <Image className="      " src={rookieWin} alt="" />
      )}
    </div>
  </div>
  )
}

export default Rookie