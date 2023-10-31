import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux_tool";
import untouchableLose from "../../../../public/untouchableLose.svg";
import untouchableWin from "../../../../public/untouchableWin.svg";

const Untouchable = () => {
  const data = useAppSelector((state) => state.Profile);
  const [achievements, setAchievement] = useState<any>();

  useEffect(() => {
    setAchievement(data?.profile.achievements);
  }, [data]);
  // // console.log("achievement", achievements);

  return (
    <>
      {achievements && achievements.length > 3 && (
        <div
          className={`  bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row  justify-between`}
        >
          <div
            className={` ${
              achievements[3]?.achieved
                ? "text-pearl "
                : "text-pearl opacity-40"
            } p-4 sm:p-10 space-y-[20%]`}
          >
            <h1 className="text-pearl text-sm sm:text-2xl">UNTOUCHABLE</h1>
            <h1 className="text-pearl text-[8px] sm:text-sm">
              WIN A MATCH WITHOUT YOUR OPPONENT SCORING A SINGLE POINT
            </h1>
          </div>
          <div className="flex justify-center items-center   ">
            {achievements[3]?.achieved ? (
              <Image className="      " src={untouchableWin} alt="" />
            ) : (
              <Image className="      " src={untouchableLose} alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Untouchable;
