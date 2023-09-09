import React from "react";
import achievement1 from "../../../public/achievement1.svg";
import achievement2 from "../../../public/achievement2.svg";
import achievement3 from "../../../public/achievement3.svg";
import achievement4 from "../../../public/achievement4.svg";
import Image from "next/image";

const Achievements = () => {
  return (
    <div className="  h-[100%]  ">
      <div className=" text-pearl text-xl sm:text-2xl sm:text-2x h-[18%] c-gb:h-[20%] flex items-center c-10xl:px-24 px-16">
        <h1 className="">Achievements</h1>
      </div>
      <div className="  grid grid-cols-1 gap-5 c-gb:grid c-gb:grid-cols-2 c-gb:gap-14 h-[70%] px-4 sm:px-14 c-10xl:px-32 ">
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row sm:w-[60%] sm:h-[60%] c-gb:w-full c-gb:h-full ">
          {/* fash gha yrbah awel match */}
          <div className=" w-[60%] flex flex-col ">
            <h1 className={`text-pearl opacity-100 text-xl  p-8`}>
              SPINSHOT Rookie
            </h1>
            <h1 className={`text-pearl opacity-100 text-xl p-8`}>
              Win your first Match
            </h1>
          </div>
          <div className="  "><Image className="" src={achievement1} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row border">
          {/* ila l3ab 10 dial lmatchat */}
          <div className=" w-[60%] flex flex-col space-y-16 m-6">
            <h1 className={`text-pearl opacity-40 text-xl `}>
              SPINSHOT MARATHON
            </h1>
            <h1 className={`text-pearl opacity-40 text-md `}>
              Play a total of 10 online matches
            </h1>
            <div className="w-full">
              <div className="w-full h-6 rounded-full flex justify-start bg-peridot p-[0.9px]">
                <div className="bg-very-dark-purple w-[60%] h-full rounded-full">
                </div>
              </div>
            </div>
          </div>
          <div className=" "><Image className=" " src={achievement2} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row">
          {/* ila rbeh match ou marka 3lih hta bit */}
          <div className=" w-[60%] flex flex-col ">
            <h1 className={`text-pearl opacity-40 text-2xl p-8`}>
              Untouchable
            </h1>
            <h1 className={`text-pearl opacity-40 text-xl p-8`}>
            Win a match without your opponent scoring a single point
            </h1>
          </div>
          <div className="  "><Image className="" src={achievement3} alt=""/></div>
        </div>
        <div className="bg-very-dark-purple rounded-[20px] flex flex-row space-x-[10%]">
          {/* fash gha yl3ab awel match m3a shi wahed sahbo */}
          <div className=" w-[60%] flex flex-col ">
            <h1 className={`text-pearl opacity-40 text-2xl p-8`}>
              Ambassador
            </h1>
            <h1 className={`text-pearl opacity-40 text-xl p-8`}>
              Play the First match with your friend
            </h1>
          </div>
          <div className="flex justify-start c-6xl:justify-center "><Image className="" src={achievement4} alt=""/></div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
