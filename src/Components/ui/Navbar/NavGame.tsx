import React from "react";
import test1 from "./../../../../public/test1.svg";
import Image from "next/image";

const NavGame = () => {
  return (
    <div className="  w-[96%] c-gb:w-[80%]  bg-very-dark-purple rounded-xl sm:rounded-3xl flex justify-between flex-row items-center px-[2%] absolute top-16 md:top-6 ">
      <div className="flex  flex-row items-center justify-between w-[50%] ">
        <div className="flex  c-gb:space-x-8  ">
          <Image className="p-1 w-[40%] sm:w-[60%]" src={test1} alt="" />
          <div className="p-1">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">
              Navoos
            </h1>
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
              PRO
            </h1>
          </div>
        </div>
        <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-end   ">
          <h1 className=" hidden md:flex text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
            Level{" "}
          </h1>
          <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">
              5
            </h1>
          </div>
        </div>
      </div>
      <div className=" sm:p-1 x-3xl:p-3  text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40 p-1">
        vs
      </div>
      {/* midlle*/}
      <div className="flex flex-row items-center  justify-between w-[50%] ">
        <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-start   ">
          <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">
              5
            </h1>
          </div>
          <h1 className=" hidden md:flex text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
            Level{" "}
          </h1>
        </div>
        <div className="flex justify-end  c-gb:space-x-8 ">
          <div className="flex  flex-col items-end justify-start p-1">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">
              TeeJee
            </h1>
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
              PRO
            </h1>
          </div>
          <Image className=" p-1 w-[40%] sm:w-[60%]" src={test1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NavGame;
