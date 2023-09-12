import React from "react";
import achievement1 from "../../../public/achievement1.svg";
import achievement2 from "../../../public/achievement2.svg";
import achievement3 from "../../../public/achievement3.svg";
import achievement4 from "../../../public/achievement4.svg";
import Image from "next/image";

const Achievements = () => {
  return (
    <div className=" ">
      <div className=" text-pearl text-[15px] sm:text-2xl sm:text-2x  h-[25%] c-2xl:h-[18%] flex items-center c-10xl:px-24 px-16">
        <h1 className="">Achievements</h1>
      </div>
      <div className="   flex justify-center items-center flex-col c-gb:grid c-gb:grid-cols-2 c-gb:gap-14 h-[100%] px-4 sm:px-14 c-10xl:px-32 space-y-[10%]  c-gb:space-y-0 ">
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row h-[140px] w-[90%] sm:h-[200px] sm:w-[90%]  c-gb:w-full c-gb:h-full  ">
          {/* fash gha yrbah awel match */}
          <div className="  w-[60%] flex flex-col space-y-[8%] sm:space-y-[14%] c-gb:space-y-[20%] p-4 sm:p-8   ">
            <h1 className={`text-pearl opacity-100 md:text-xl  text-[12px]`}>
              SPINSHOT Rookie
            </h1>
            <h1 className={`text-pearl opacity-100 md:text-xl text-[10px]`}>
              Win your first Match
            </h1>
          </div>
          <div className="  "><Image className=" h-[80%] md:h-full " src={achievement1} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] h-[140px]  sm:h-[200px] sm:w-[90%] w-[90%] c-gb:w-full c-gb:h-full flex flex-row ">
          {/* ila l3ab 10 dial lmatchat */}
          <div className="  w-[60%] flex flex-col space-y-[6%] sm:space-y-[12%] c-gb:space-y-[25%] p-4  ">
            <h1 className={`text-pearl opacity-40 md:text-xl text-[12px] `}>
              SPINSHOT MARATHON
            </h1>
            <h1 className={`text-pearl opacity-40 md:text-md text-[10px]`}>
              Play a total of 10 online matches
            </h1>
            <div className="w-full">
              <div className="absolute  w-[35%] c-gb:w-[20%] h-3 sm:h-6 rounded-full flex justify-start bg-peridot p-[0.9px]">
                <div className="bg-very-dark-purple w-[60%] h-full rounded-full">
                </div>
              </div>
            </div>
          </div>
          <div className=" "><Image className="  h-[80%] md:h-full " src={achievement2} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] flex flex-rowh-[140px] w-[90%] h-[140px] sm:h-[200px] sm:w-[90%] c-gb:w-full c-gb:h-full ">
          {/* ila rbeh match ou marka 3lih hta bit */}
          <div className="  w-[60%] flex flex-col space-y-[8%] sm:space-y-[12%] c-gb:space-y-[17%] p-4  ">
            <h1 className={`text-pearl opacity-40 md:text-2xl text-[14px] `}>
              Untouchable
            </h1>
            <h1 className={`text-pearl opacity-40 md:text-xl text-[10px]`}>
            Win a match without your opponent scoring a single point
            </h1>
          </div>
          <div className=" flex items-center "><Image className=" h-[80%] md:h-full  " src={achievement3} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row space-x-[10%]h-[140px] w-[90%] h-[140px] sm:h-[200px] sm:w-[90%] c-gb:w-full c-gb:h-full">
          {/* fash gha yl3ab awel match m3a shi wahed sahbo */}
          <div className="  w-[60%] flex flex-col space-y-[8%] sm:space-y-[12%] c-gb:space-y-[17%] p-4  ">
            <h1 className={`text-pearl opacity-40 md:text-2xl text-[14px]`}>
              Ambassador
            </h1>
            <h1 className={`text-pearl opacity-40 md:text-xl text-[10px]`}>
              Play the First match with your friend
            </h1>
          </div>
          <div className="flex justify-start items-center  c-6xl:justify-center "><Image className=" h-[40%] sm:h-[50%]  md:h-full " src={achievement4} alt=""/></div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
