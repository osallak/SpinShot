import React, { useState } from "react";
import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";
import time from "../../../../public/time.svg";
import defi from "../../../../public/defi.svg";
import Image from "next/image";
import SimpleButton from "../Buttons/SimpleButton";

const SubSidebarGame = () => {
  const hendleUpdata = () => {};
  const [backgroundColors, setBackgroundColors] = useState({
    element1: "",
    element2: "",
    element3: "",
    element4: "",
    element5: "",
  });

  const changeBackgroundColor = (elementId: any, newColor: any) => {
    const updatedBackgroundColors = {
      element1: "",
      element2: "",
      element3: "",
      element4: "",
      element5: "",
    };
    updatedBackgroundColors[elementId] = newColor;
    setBackgroundColors(updatedBackgroundColors);
  };

  return (
    <div className=" c-gb:block hidden w-[30%]  text-pearl">
      <div className="bg-white/10 rounded-2xl h-full flex flex-col w-[100%] px-[10%]  ">
        <div className=" flex items-center text-3xl  h-[10%] ">
          <h1>Game</h1>
        </div>
        <div className="flex items-center justify-center ">
          <div className="border w-full  opacity-40"></div>
        </div>
        <div className="">
          <div className=" flex flex-col  space-y-20 py-12">
            <div className=" text-3xl">Options</div>
            <div className="space-y-36">
              <div className="px-4 ">
                <div className="relative text-3xl">
                  Mode
                  <Image className="absolute left-5" src={linechoose} alt="" />
                  <button
                    onClick={() =>
                      changeBackgroundColor("element1", "very-dark-purple")
                    }
                    className={`bg-${backgroundColors.element1} absolute left-[12%] top-12 text-2xl flex flex-row justify-between  w-[70%] rounded-2xl p-2 px-4`}
                  >
                    Time
                    <Image src={time} alt="" />
                  </button>
                  <Image
                    className="absolute left-5 top-14"
                    src={linechoose2}
                    alt=""
                  />
                  <button
                    onClick={() =>
                      changeBackgroundColor("element2", "very-dark-purple")
                    }
                    className={`bg-${backgroundColors.element2} absolute left-[12%] top-28 text-2xl  flex flex-row justify-between   w-[70%] rounded-2xl p-2 px-4`}
                  >
                    Defi
                    <Image src={defi} alt="" />
                  </button>
                </div>
              </div>
              <div className="px-4 ">
                <div className="relative text-3xl">
                  maps
                  <Image className="absolute left-5" src={linechoose} alt="" />
                  <button
                    onClick={() =>
                      changeBackgroundColor("element3", "very-dark-purple")
                    }
                    className={`bg-${backgroundColors.element3} absolute left-[12%] top-12 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4`}
                  >
                    Normal
                  </button>
                  <Image
                    className="absolute left-5 top-14"
                    src={linechoose2}
                    alt=""
                  />
                  <button
                    onClick={() =>
                      changeBackgroundColor("element4", "very-dark-purple")
                    }
                    className={`bg-${backgroundColors.element4} absolute left-[12%] top-28 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4 `}
                  >
                    Hard
                  </button>
                  <Image
                    className="absolute left-5 top-32 "
                    src={linechoose2}
                    alt=""
                  />
                  <button
                    onClick={() =>
                      changeBackgroundColor("element5", "very-dark-purple")
                    }
                    className={`bg-${backgroundColors.element5} absolute left-[12%] top-44 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4`}
                  >
                    Expert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[85%] left-[13%]">
          <SimpleButton content="Play" onclick={hendleUpdata} />
        </div>
      </div>
    </div>
  );
};

export default SubSidebarGame;
