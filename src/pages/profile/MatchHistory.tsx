import React from "react";
import imagePlayer from "../../../public/imagePlayer.svg";
import Image from "next/image";
const MatchHistory = () => {
  return (
    <div className="  h-[1100px] c-gb:h-full">
      <div className=' text-pearl text-[15px] sm:text-2xl h-[18%]  flex items-center c-10xl:px-24 px-16 '>
        <h1>Match History</h1>
      </div>
      <div className="  flex justify-between flex-col c-gb:flex-row h-[80%] md:h-[75%] text-pearl c-3xl:text-2xl c-lg:text-xl   ">
        <div className=" w-full flex justify-center items-center h-[100%]">
          <div className=" w-[50%] h-[100%] c-gb:w-[80%] c-gb:h-[40%] c-lg:w-[70%] c-lg:h-[50%] rounded-[20px] bg-very-dark-purple flex flex-col items-center ">
            <div className="flex justify-center items-center flex-col h-[50%]">
              <h1>Games</h1>
              <h1 className="opacity-40">160</h1>
            </div>
            <div className="w-[80%] border"></div>
            <div className="h-[50%] w-full flex items-center ">
              <div className="w-[50%] flex-col flex  justify-center items-center">
                <h1>Wins</h1>
                <h1 className="text-peridot">100</h1>
              </div>
              <div className="border h-[70%]"></div>
              <div className="w-[50%] flex flex-col items-center">
                <h1>Loses</h1>
                <h1 className="text-red-900">0</h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[100%] c-gb:w-0  flex justify-center items-center opacity-40">
        <div className="border w-[40%] c-gb:hidden block"></div>
        </div>
        <div className=" w-full c-gb:space-y-20 sm:space-y-10 space-y-4 flex justify-center c-gb:items-start flex-col  ">
          <div className=" flex flex-row justify-center items-center c-3xl:space-x-20  md:space-x-48 m-0 sm:m-5 md:m-10 c-gb:p-0 c-gb:space-x-8 sm:space-x-32 space-x-4 ">
            <div className="w-[60px]">
              <Image src={imagePlayer} alt="" />
            </div>
            <div className="opacity-40">
              <div className="flex flex-row">
                <h1>ibenmain(PRO)</h1>
                <h1>MAROC</h1>
              </div>
              <div className="flex flex-row">
                <h1>ataji(ELITE)</h1>
                <h1>USA</h1>
              </div>
            </div>
            <div>
              <h1>5</h1>
              <h1>3</h1>
            </div>
          </div>
          <div className=" flex flex-row justify-center items-center c-3xl:space-x-20 md:space-x-48 m-0 sm:m-5 md:m-10 c-gb:p-0 c-gb:space-x-8 sm:space-x-32 space-x-4">
            <div className="w-[60px]">
              <Image src={imagePlayer} alt="" />
            </div>
            <div className="opacity-40">
              <div className="flex flex-row">
                <h1>ibenmain(PRO)</h1>
                <h1>MAROC</h1>
              </div>
              <div className="flex flex-row">
                <h1>ataji(ELITE)</h1>
                <h1>USA</h1>
              </div>
            </div>
            <div>
              <h1>5</h1>
              <h1>3</h1>
            </div>
          </div>
          <div className=" flex flex-row justify-center items-center c-3xl:space-x-20 md:space-x-48 m-0 sm:m-5 md:m-10 c-gb:p-0 c-gb:space-x-8 sm:space-x-32 space-x-4 ">
            <div className="w-[60px]">
              <Image src={imagePlayer} alt="" />
            </div>
            <div className="opacity-40">
              <div className="flex flex-row">
                <h1>ibenmain(PRO)</h1>
                <h1>MAROC</h1>
              </div>
              <div className="flex flex-row">
                <h1>ataji(ELITE)</h1>
                <h1>USA</h1>
              </div>
            </div>
            <div>
              <h1>5</h1>
              <h1>3</h1>
            </div>
          </div>
          <div className=" flex flex-row justify-center items-center c-3xl:space-x-20 md:space-x-48 m-0 sm:m-5 md:m-10 c-gb:p-0 c-gb:space-x-8 sm:space-x-32 space-x-4">
            <div className="w-[60px]">
              <Image src={imagePlayer} alt="" />
            </div>
            <div className="opacity-40">
              <div className="flex flex-row">
                <h1>ibenmain(PRO)</h1>
                <h1>MAROC</h1>
              </div>
              <div className="flex flex-row">
                <h1>ataji(ELITE)</h1>
                <h1>USA</h1>
              </div>
            </div>
            <div>
              <h1>5</h1>
              <h1>3</h1>
            </div>
          </div>
        </div>
        <div className=" w-[100%] c-gb:w-0  flex justify-center items-center opacity-40">
        <div className="border w-[40%] c-gb:hidden block"></div>
        </div>
        <div className=" w-full space-y-8 sm:space-y-16 c-gb:space-y-28 flex justify-center  flex-col ">
          <div className="flex flex-row justify-around">
            <h1>July 8, 2023</h1>
            <h1 className="text-peridot">VECTORY</h1>
          </div>
          <div className="flex flex-row justify-around">
            <h1>July 8, 2023</h1>
            <h1 className="text-red-900">DEFEAT</h1>
          </div>
          <div className="flex flex-row justify-around">
            <h1>July 8, 2023</h1>
            <h1 className="text-peridot">VECTORY</h1>
          </div>
          <div className="flex flex-row justify-around">
            <h1>July 8, 2023</h1>
            <h1 className="text-red-900">DEFEAT</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
