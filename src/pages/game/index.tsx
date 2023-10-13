import SideBar from "@/Components/ui/Sidebar/sidebar";
import React, { useState, useEffect } from "react";
import SubSidebarGame from "@/Components/ui/FolderSubsidebar/subSidebarGame";
import NavbarMobile from "@/Components/ui/FolderNavbar/navbarMobile";
import NavGame from "@/Components/ui/FolderNavbar/navGame";
import SidebarM from "@/Components/ui/Sidebar/SidebarMobile";
import GameNormal from "./GameNormal";
import GameHard from "./GameHard";
import GameExpert from "./GameExpert";
import SubsidebarSecondGame from "@/Components/ui/FolderSubsidebar/subsidebarSecondGame";

const Game = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>();
  const [width, setWidth] = useState<number>();
  const [pages, setPages] = useState("game");

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleClick = (a: boolean, route: string | undefined) => {
    setOpned(true);
    {
      route ? setPages(route) : null;
    }
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  console.log(opened);
  return (
    <div
      className={
        "bg-very-dark-purple w-screen h-screen font-semibold font-Poppins"
      }
    >
      <div className={`  ${isopen ? "ml-[70px]  w-full " : null}  `}>
        <NavbarMobile
          setMenu={setMenu}
          handleMenu={handleMenu}
          isopen={isopen}
        />
      </div>
      <div className={` flex flex-row c-gb:space-x-3 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame setMode={setMode} setMap={setMap} />

        {isopen && (
          <SidebarM
            handleClick={handleClick}
            setOpned={setOpned}
            opened={opened}
          />
        )}

        <div
          className={` ${
            isopen && width! < 720 ? "ml-[65px] " : null
          } h-full w-full flex-col flex  items-center rounded-2xl bg-white/10 space-y-10  relative md:ml-2 ${
            opened && width! < 1024 ? "opacity-10  bg-white/10 " : null
          }`}
        >
          <div className={`w-[96%] c-gb:w-[80%]  `}>
            <NavGame />
          </div>
          <div
            className={` h-full w-full flex justify-center items-center relative    `}
          >
            {map == "map1" ? (
              <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%]  rounded-3xl absolute   sm:min-w-[400px] c-gb:min-w-[600px]  top-[120px] sm:top-33 c-gb:top-28  ">
                <GameNormal />
              </div>
            ) : map == "map2" ? (
              <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%] rounded-3xl absolute   sm:min-w-[400px] c-gb:min-w-[600px]  top-[120px] sm:top-33 c-gb:top-28  ">
                <GameHard />
              </div>
            ) : map == "map3" ? (
              <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%] rounded-3xl absolute   sm:min-w-[400px] c-gb:min-w-[600px]  top-[120px] sm:top-33 c-gb:top-28  ">
                <GameExpert />
              </div>
            ) : null}
          </div>
        </div>
        {opened && <SubsidebarSecondGame />}
      </div>
    </div>
  );
};

export default Game;
