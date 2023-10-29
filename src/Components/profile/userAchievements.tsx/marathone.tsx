import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux_tool";
import marathonLose from "../../../../public/marathonLose.svg";
import marathonWin from "../../../../public/marathonWin.svg";

const Marathone = () => {
  const data = useAppSelector((state) => state.Profile);
  const [achievements, setAchievement] = useState<any>();

  useEffect(() => {
    setAchievement(data?.profile.achievements);
  }, [data]);

  return (
    <>
      {achievements && achievements.length > 1 && (
        <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full flex flex-row justify-between ">
          <div
            className={`   p-4 sm:p-4 c-gb:p-10 md:space-y-3 c-gb:space-y-[12%] w-[80%] `}
          >
            <h1
              className={` ${
                achievements[1]?.achieved
                  ? "text-pearl "
                  : "text-pearl opacity-40"
              } text-sm sm:text-2xl`}
            >
              SPINSHOT MARATHON
            </h1>
            <h1
              className={` ${
                achievements[1]?.achieved
                  ? "text-pearl "
                  : "text-pearl opacity-40"
              } text-[8px] sm:text-sm`}
            >
              PLAY A TOTAL OF 10 ONLINE MATCHES
            </h1>
            <div className="w-full ">
              <h1
                className={`${
                  achievements[1]?.achieved
                    ? "text-pearl "
                    : "text-pearl opacity-40"
                }`}
              >
                {achievements[1].level}/10
              </h1>
              <div className="border h-3 md:h-5 rounded-full p-[0.5px] flex justfy-center items-center ">
                <div
                  style={{ width: `${achievements[1].level}%` }}
                  className=" rounded-full  h-full  bg-peridot"
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {achievements[1]?.achieved ? (
              <Image className=" " src={marathonWin} alt="" />
            ) : (
              <Image className="   " src={marathonLose} alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Marathone;
