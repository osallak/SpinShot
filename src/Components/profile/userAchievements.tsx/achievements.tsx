import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useAppSelector } from "../../../../redux_tool";
import Ambassador from "./ambassador";
import Marathone from "./marathone";
import Untouchable from "./untouchable";
import Rookie from "./rookie";

const Achievements = () => {
  const profileData = useAppSelector((state) => state.Profile);
  const [level, setLevle] = useState<number>();

  console.log("profileData: ", profileData);

  const getMyRank = (rank: number) => {
    setLevle(Math.floor(rank));
  };

  useEffect(() => {
    getMyRank(profileData.profile?.level);
  });

  return (
    <div className=" flex flex-col h-[1200px] c-gb:h-[910px]">
      <div className="text-pearl text-[15px] sm:text-2xl md:h-40 h-32 flex items-center c-10xl:px-24 px-14 ">
        <h1>Achievements</h1>
      </div>
      <div className="flex flex-col  space-y-8  ">
        <div className=" flex flex-col c-gb:flex-row c-gb:px-[8%] justify-center items-center  c-gb:space-x-11 space-y-8 c-gb:space-y-0">
          <Rookie />
          <Marathone level={level} />
        </div>
        <div className="flex flex-col c-gb:flex-row c-gb:px-[8%] justify-center items-center c-gb:space-x-11 space-y-8 c-gb:space-y-0 ">
          <Untouchable />
          <Ambassador />
        </div>
      </div>
    </div>
  );
};

export default Achievements;
