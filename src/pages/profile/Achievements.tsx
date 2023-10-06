import React from "react";
import achievement1 from "../../../public/achievement1.svg";
import achievement2 from "../../../public/achievement2.svg";
import achievement3 from "../../../public/achievement3.svg";
import achievement4 from "../../../public/achievement4.svg";
import Image from "next/image";
import { useAppSelector } from "../../../redux_tool";

const Achievements = () => {
  const achievement_data = useAppSelector((state) => state.Profile);
  console.log(achievement_data.profile?.achievements[0].Achiement.name);
  return (
    <div className=" flex flex-col h-[1200px] c-gb:h-[910px]">
      <div className="text-pearl text-[15px] sm:text-2xl md:h-40 h-32 flex items-center c-10xl:px-24 px-14 ">
        <h1>Achievements</h1>
      </div>
      <div className="flex flex-col  space-y-8  ">
        <div className=" flex flex-col c-gb:flex-row c-gb:px-[8%] justify-center items-center  c-gb:space-x-11 space-y-8 c-gb:space-y-0">
          <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row justify-between">
            <div className="p-4 sm:p-10 space-y-[20%]">
              <h1 className="text-pearl text-sm sm:text-2xl">
                {achievement_data.profile?.achievements[0]?.Achiement?.name}
                {/* SPINSHOT ROOKIE */}
              </h1>
              <h1 className="text-pearl text-xs sm:text-md">
              {achievement_data.profile?.achievements[0]?.Achiement?.description}
                {/* Win your first Match */}
              </h1>
            </div>
            <div className="flex justify-center items-center  ">
              <Image className="       " src={achievement1} alt="" />
            </div>
          </div>
          <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full flex flex-row justify-between">
            <div className="p-4 sm:p-10 md:space-y-4 c-gb:space-y-[16%] w-[80%] ">
              <h1 className="text-pearl text-sm sm:text-2xl">
              {achievement_data.profile?.achievements[1]?.Achiement?.name}
                {/* SPINSHOT MARATHON */}
              </h1>
              <h1 className="text-pearl text-xs sm:text-md">
              {achievement_data.profile?.achievements[1]?.Achiement?.description}
                {/* Win your first Match */}
              </h1>
              <div className="w-full ">
                <h1 className="text-pearl">7/10</h1>
                <div className="border h-3 md:h-5 rounded-full p-[0.5px] flex justfy-center items-center ">
                  <div className=" rounded-full  h-full w-[70%] bg-peridot"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  ">
              <Image className="       " src={achievement2} alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col c-gb:flex-row c-gb:px-[8%] justify-center items-center c-gb:space-x-11 space-y-8 c-gb:space-y-0 ">
          <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px] rounded-[20px] w-[85%] c-gb:w-full  flex flex-row  justify-between">
            <div className="p-4 sm:p-10 space-y-[20%]">
              <h1 className="text-pearl text-sm sm:text-2xl">
              {achievement_data.profile?.achievements[2]?.Achiement?.name}
                {/* UNTOUCHABLE */}
              </h1>
              <h1 className="text-pearl text-xs sm:text-md">
              {achievement_data.profile?.achievements[2]?.Achiement?.description}
                {/* Win a match without your opponent scoring a single point */}
              </h1>
            </div>
            <div className="flex justify-center items-center   ">
              <Image className="        " src={achievement3} alt="" />
            </div>
          </div>
          <div className=" bg-very-dark-purple h-[150px] sm:h-[200px] c-gb:h-[300px]  rounded-[20px] w-[85%] c-gb:w-full flex flex-row  justify-between">
            <div className="p-4 sm:p-10 space-y-[20%]">
              <h1 className="text-pearl text-sm sm:text-2xl">
              {achievement_data.profile?.achievements[3]?.Achiement?.name}
                {/* AMBASSADOR */}
              </h1>
              <h1 className="text-pearl text-xs sm:text-md">
              {achievement_data.profile?.achievements[3]?.Achiement?.description}
                {/* Play the First match with your friend */}
              </h1>
            </div>
            <div className="flex justify-center items-center  md:w-[40%]  ">
              <Image className="        w-[70%] sm:w-24 c-gb:w-[60%]" src={achievement4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
