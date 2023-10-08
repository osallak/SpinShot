import React from "react";
import imagePlayer from "../../../public/imagePlayer.svg";
import Image from "next/image";
import Pagination from "../../Components/ui/pagination/Pagination";
const MatchHistory = () => {
  return (
    <div className="  h-[1100px] c-gb:h-[900px] relative">
      <div className=" text-pearl text-[15px] sm:text-2xl h-[8%] c-gb:h-[18%]  flex items-end c-10xl:px-24 px-16 ">
        <h1>Match History</h1>
      </div>
      <div className="  flex justify-between flex-col c-gb:flex-row h-full sm:h-[95%]  md:h-full  c-gb:h-[75%] space-y-11 text-pearl c-3xl:text-2xl c-lg:text-xl relative">
        <div className=" w-full c-gb:w-[40%] flex justify-center items-center h-[40%]  c-gb:h-full ">
          <div className="  w-[70%] h-[80%] sm:w-[40%]  c-gb:h-[50%] c-gb:w-[90%] rounded-[20px] bg-very-dark-purple flex flex-col items-center ">
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
          <div className="border w-[40%] c-gb:hidden block  "></div>
        </div>
        {/* todo */}
        <div className=" w-full flex c-gb:flex-row items-start flex-col h-full space-y-10  c-gb:space-y-0   relative ">
          <div className=" w-full c-gb:space-y-10 space-y-2 flex justify-center items-center flex-col  ">
            <div className="text-[15px] c-3xl:text-[20px] flex flex-row justify-center items-center c-3xl:space-x-10 md:space-x-32 m-0  c-gb:space-x-8 sm:space-x-24 space-x-3 ">
              <div className="w-[60px] ">
                <Image className="w-[70%] sm:w-full" src={imagePlayer} alt="" />
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
            <div className=" text-[15px] c-3xl:text-[20px] flex flex-row justify-center items-center c-3xl:space-x-10 md:space-x-32 m-0  c-gb:space-x-8 sm:space-x-24 space-x-3 ">
              <div className="w-[60px]">
                <Image className="w-[70%] sm:w-full" src={imagePlayer} alt="" />
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
            <div className=" text-[15px] c-3xl:text-[20px] flex flex-row justify-center items-center c-3xl:space-x-10 md:space-x-32 m-0  c-gb:space-x-8 sm:space-x-24 space-x-3 ">
              <div className="w-[60px]">
                <Image className="w-[70%] sm:w-full" src={imagePlayer} alt="" />
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
            <div className=" text-[15px] c-3xl:text-[20px] flex flex-row justify-center items-center c-3xl:space-x-10 md:space-x-32 m-0  c-gb:space-x-8 sm:space-x-24 space-x-3 ">
              <div className="w-[60px]">
                <Image className="w-[70%] sm:w-full" src={imagePlayer} alt="" />
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
            <div className=" text-[15px] c-3xl:text-[20px] flex flex-row justify-center items-center c-3xl:space-x-10 md:space-x-32 m-0  c-gb:space-x-8 sm:space-x-24 space-x-3 ">
              <div className="w-[60px]">
                <Image className="w-[70%] sm:w-full" src={imagePlayer} alt="" />
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
          <div className=" w-[100%] c-gb:w-0 hidden c-gb:block  justify-center items-center opacity-40">
            <div className="border w-[40%] c-gb:hidden block"></div>
          </div>
          <div className=" w-full space-y-2 sm:space-y-6 c-gb:space-y-20  justify-center items-center flex-col hidden c-gb:block text-[15px] c-3xl:text-[20px]">
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
            <div className="flex flex-row justify-around">
              <h1>July 8, 2023</h1>
              <h1 className="text-red-900">DEFEAT</h1>
            </div>
          </div>
        <div className="bottom-80 sm:bottom-52 c-gb:bottom-5 w-full absolute flex justify-center c-gb:justify-end items-end px-10">
          <div>
            <Pagination/>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
