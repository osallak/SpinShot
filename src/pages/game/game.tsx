import SideBar from "@/Components/ui/Sidebar/SideBar";
import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/ui/Sidebar/SideBar";
import SubSidebar from "@/Components/ui/Subsidebar/SubSidebar";
import SubSidebarGame from "@/Components/ui/Subsidebar/SubSidebarGame";
import NavbarMobile from "@/Components/ui/Navbar/NavbarMobile";
import NavGame from "@/Components/ui/Navbar/NavGame";
import SidebarM from "@/Components/ui/Sidebar/SidebarMobile";
import GameNormal from "./GameNormal";
import GameHard from "./GameHard";
import GameExpert from "./GameExpert";
const Game = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>();
  const [width, setWidth] = useState<number>();

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  useEffect(() => {
    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className={"bg-very-dark-purple w-screen h-screen font-semibold font-Poppins"}>
      <div className={` flex flex-row c-gb:space-x-1 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame setMode={setMode} setMap={setMap} />

        {isopen && (
          <SidebarM
            handleClick={() => {}}
            setOpned={setOpned}
            opened={opened}
          />
        )}
        <div
          className={` ${
            (isopen && width! < 720)  ? "ml-[75px]" : null
          } h-full w-full flex-col flex  items-center rounded-2xl bg-white/10 space-y-10  relative ml-2`}
        >
          <div className={`  w-full `}>
            <NavbarMobile
              setMenu={setMenu}
              handleMenu={handleMenu}
              isopen={isopen}
            />
          </div>
          <NavGame />
          <div className=" h-full w-full flex justify-center items-center relative  ">
            {mode == "mode2" ? (
              <div className=" absolute top-[100px] sm:top-[130px] left-4 text-sm sm:text-lg c-gb:text-3xl text-pearl ">
                <h1> Defi :</h1>
              </div>
            ) : mode == "mode1" ? (
              <div
                className={`flex flex-row justify-between c-gb:justify-center items-center absolute top-[95px] sm:top-[120px] c-gb:top-[130px] left-[5%] text-sm sm:text-lg c-gb:text-3xl text-pearl c-gb:bg-very-dark-purple rounded-2xl  ${
                  isopen ? "w-[60%]" : "w-[50%]"
                } c-gb:w-[10%]`}
              >
                <h1 className="c-gb:hidden block">Time :</h1>
                <h1 className="bg-very-dark-purple rounded-2xl w-16 sm:w-28 c-gb:w-[10%] flex  justify-center items-center  h-6 sm:h-12">
                  05:35
                </h1>
              </div>
            ) : null}
            {map == "map1" ? (
              <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%]  rounded-3xl absolute   sm:min-w-[450px] c-gb:min-w-[600px]  top-[125px] sm:top-44 c-gb:top-28  ">
                <GameNormal />
              </div>
            ) : map == "map2" ? (
              <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%] rounded-3xl absolute   sm:min-w-[450px] c-gb:min-w-[600px]  top-[125px] sm:top-44 c-gb:top-28  ">
                <GameHard /> 
              </div>
              ) : map == "map3" ? (
                <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%] rounded-3xl absolute   sm:min-w-[450px] c-gb:min-w-[600px]  top-[125px] sm:top-44 c-gb:top-28  ">
                  <GameExpert />
                </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
