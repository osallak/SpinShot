import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../../../redux_tool";
import marathonLose from "../../../../public/marathonLose.svg";
import marathonWin from "../../../../public/marathonWin.svg";

const Marathone = (props: any) => {
  const achievement_data = useAppSelector((state) => state.Profile);
  return (
    <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full flex flex-row justify-between ">
      <div className={`   p-4 sm:p-4 c-gb:p-10 md:space-y-3 c-gb:space-y-[16%] w-[80%] `}>
        <h1 className={` ${1 ? "text-pearl opacity-40" : "text-pearl "} text-sm sm:text-2xl`}>
          {achievement_data.profile?.achievements[1]?.Achiement?.name}
        </h1>
        <h1 className={` ${1 ? "text-pearl opacity-40" : "text-pearl "} text-[8px] sm:text-sm`}>
          {achievement_data.profile?.achievements[1]?.Achiement?.description}
        </h1>
        <div className="w-full ">
          <h1 className={`${1 ? "text-pearl opacity-40" : "text-pearl "}`}>{props.level}/10</h1>
          <div className="border h-3 md:h-5 rounded-full p-[0.5px] flex justfy-center items-center ">
            <div
              style={{ width: `${props.level}%` }}
              className=" rounded-full  h-full  bg-peridot"
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center  ">
        {1 ? (
          <Image className="      " src={marathonLose} alt="" />
        ) : (
          <Image className="      " src={marathonWin} alt="" />
        )}
      </div>
    </div>
  );
};

export default Marathone;
