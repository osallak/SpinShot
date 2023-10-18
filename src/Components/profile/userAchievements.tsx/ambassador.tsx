import React from "react";
import { useAppSelector } from "../../../../redux_tool";
import ambassadorLose from "../../../../public/ambassadorLose.svg";
import ambassadorWin from "../../../../public/ambassadorWin.svg";
import Image from "next/image";

const Ambassador = () => {
  const achievement_data = useAppSelector((state) => state.Profile);
  return (
    <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px]  rounded-[20px] w-[85%] c-gb:w-full flex flex-row  justify-between">
      <div className={` ${1 ? "text-pearl opacity-40" : "text-pearl "} p-4 sm:p-10 space-y-[20%]`}>
        <h1 className="text-pearl text-sm sm:text-2xl">
          {achievement_data.profile?.achievements[3]?.Achiement?.name}
        </h1>
        <h1 className="text-pearl text-[8px] sm:text-sm">
          {achievement_data.profile?.achievements[3]?.Achiement?.description}
        </h1>
      </div>
      <div className="flex justify-center items-center  md:w-[40%]  ">
        {1 ? (
          <Image
            className="        w-[70%] sm:w-24 c-gb:w-[60%]"
            src={ambassadorLose}
            alt=""
          />
        ) : (
          <Image
            className="        w-[70%] sm:w-24 c-gb:w-[60%]"
            src={ambassadorWin}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Ambassador;