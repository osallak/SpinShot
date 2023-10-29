import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux_tool";
import ambassadorLose from "../../../../public/ambassadorLose.svg";
import ambassadorWin from "../../../../public/ambassadorWin.svg";
import Image from "next/image";

const Ambassador = () => {
  const data = useAppSelector((state) => state.Profile);
  const [achievements, setAchievement] = useState<any>();

  useEffect(() => {
    setAchievement(data?.profile.achievements);
  }, [data]);

  return (
    <>
      {achievements && achievements.length > 3 && (
        <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px]  rounded-[20px] w-[85%] c-gb:w-full flex flex-row  justify-between">
          <div
            className={` ${
              achievements[3]?.achieved
                ? "text-pearl "
                : "text-pearl opacity-40"
            } p-4 sm:p-10 space-y-[20%]`}
          >
            <h1 className="text-pearl text-sm sm:text-2xl">AMBASSADOR</h1>
            <h1 className="text-pearl text-[8px] sm:text-sm">
              PLAY THE FIRST MATCH WITH YOUR FRIEND
            </h1>
          </div>
          <div className="flex justify-center items-center  md:w-[40%]  ">
            {achievements[3]?.achieved ? (
              <Image
                className="        w-[70%] sm:w-24 c-gb:w-[60%]"
                src={ambassadorWin}
                alt=""
              />
            ) : (
              <Image
                className="        w-[70%] sm:w-24 c-gb:w-[60%]"
                src={ambassadorLose}
                alt=""
              />
            )}
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Ambassador;
