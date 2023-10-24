import React, { useEffect, useState } from "react";
import rookieLose from "../../../../public/ rookieLose.svg";
import rookieWin from "../../../../public/rookieWin.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../../redux_tool";
import { getProfile } from "../../../../redux_tool/redusProfile/profileThunk";
import { useRouter } from "next/router";

const Rookie = () => {
  const data = useAppSelector((state) => state.Profile);
  const [achievements, setAchievement] = useState<any>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
      setAchievement(data?.profile.achievements);
    }, 100);
  }, [data]);

  return (
    <>
      {loaded && (
        <div
          className={`  bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row justify-between`}
        >
          <div
            className={` ${
              achievements[0]?.achieved ? "text-pearl" : "text-pearl opacity-40"
            } p-4 sm:p-10 space-y-[20%]`}
          >
            <h1 className=" text-sm sm:text-2xl">SPINSHOT ROOKIE</h1>
            <h1 className=" text-[8px] sm:text-sm">WIN YOUR FIRST MATCH</h1>
          </div>
          <div className="flex justify-center items-center  ">
            {1 ? (
              <Image className="      " src={rookieWin} alt="" />
            ) : (
              <Image className="      " src={rookieLose} alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Rookie;
