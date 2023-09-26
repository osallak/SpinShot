import SideBar from "@/Components/ui/Sidebar/SideBar";
import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/ui/Sidebar/SideBar";
import SubSidebar from "@/Components/ui/Subsidebar/SubSidebar";
import SubSidebarGame from "@/Components/ui/Subsidebar/SubSidebarGame";
import test1 from "./../../../public/test1.svg";
import Image from "next/image"
import NavbarMobile from "@/Components/ui/Navbar/NavbarMobile";

const game = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };
  return (
    <div className={"bg-very-dark-purple w-screen h-screen"}>
      <div className={` flex flex-row c-gb:space-x-1 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame />
        <div className="">

            <NavbarMobile
              setMenu={setMenu}
              handleMenu={handleMenu}
              isopen={isopen}
              />
        </div>
        <div className=" h-full w-full flex-col flex  items-center rounded-2xl bg-white/10 space-y-10  relative  ">
          <div className="  w-[94%] c-gb:w-[80%] h-[80px] bg-very-dark-purple rounded-3xl flex justify-between flex-row items-center px-[2%] absolute top-20 c-gb:top-5">
            <div className="flex flex-row items-center justify-between w-[50%] ">
              <div className="flex  sm:space-x-5  ">
                <Image className="p-1 w-[60%]" src={test1} alt="" />
                <div className="p-1">
                  <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">Navoos</h1>
                  <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">PRO</h1>
                </div>
              </div>
              <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-end   ">
                <h1 className=" hidden sm:block text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">Level </h1>
              <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
                <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">5</h1>
              </div>
              </div>
            </div>
            <div className=" sm:p-1 x-3xl:p-3  text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">vs</div>{/* midlle*/}
            <div className="flex flex-row items-center  justify-between w-[50%] ">
              <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-start   ">
              <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
                <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">5</h1>
              </div>
                <h1 className=" hidden sm:block text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">Level </h1>
              </div>
              <div className="flex justify-end  sm:space-x-5 ">
                <div className="flex  flex-col items-end justify-start p-1">
                  <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">TeeJee</h1>
                  <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">PRO</h1>
                </div>
                <Image className=" p-1 w-[60%]" src={test1} alt="" />
              </div>
            </div>
          </div>
          <div className=" h-full  w-full flex justify-center items-center relative   ">
              <h1 className="c-gb:hidden block absolute top-[120px] left-4 text-sm sm:text-3xl text-pearl h-[100px] ">Defi</h1>
            {/* <div className="absolute  w-[10%] h-[5%]  top-10 left-[0] 3xl:left-[6%] rounded-3xl bg-very-dark-purple "></div> */}
            <div className="border h-[65%] sm:h-[80%] c-gb:h-[90%] w-[85%] sm:w-[75%] c-gb:w-[55%] bg-very-dark-purple rounded-3xl absolute   sm:min-w-[500px] c-gb:min-w-[600px]  top-[150px] sm:top-44 c-gb:top-24 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default game;
