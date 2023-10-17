import SideBar from "@/Components/ui/folderSidebar/sideBar";
import React, { useState, useEffect } from "react";
import SubSidebarGame from "@/Components/ui/profileSubsidebar/subSidebarGame";
import NavbarMobile from "@/Components/ui/FolderNavbar/navbarMobile";
import NavGame from "@/Components/ui/FolderNavbar/navGame";
import SidebarM from "@/Components/ui/folderSidebar/sidebarMobile";
import SubsidebarSecondGame from "@/Components/ui/profileSubsidebar/subsidebarSecondGame";
import GameModel from "./gameModel";
import { Socket, io } from "socket.io-client";

let game: GameModel | null = null;

const GamePage = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>();
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [pages, setPages] = useState("game");

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  useEffect(() => {
    handleResize();
    let socket: Socket = io("http://localhost:3000");
    socket.on('connection', ()=>{
      console.log('connected')
    })
    socket.on("eventFromBackend", (data: any) => {
      game?.updateState(data);
    });
    setSocket(socket);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        socket.disconnect();
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
    setheight(window.innerHeight);
  };

  console.log(map);
  
  useEffect(() => {
    game = new GameModel(divRef.current!, map!, socket!);
    return () => {
      game?.destroy();
    };
  }, [width, height, isopen, socket, map]);

  return (
    <div
      className={
        "bg-very-dark-purple w-screen h-screen font-semibold font-Poppins "
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
        <SubSidebarGame setMap={setMap} />

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
          <div className={`flex justify-center items-center w-[96%] c-gb:w-[80% h-[15%] `}>
            <NavGame />
          </div>
          <div
            className={` h-[80%] w-[80%] flex justify-center items-center relative `}
            ref={divRef}
          >
          </div>
        </div>
        {opened && <SubsidebarSecondGame setMode={setMode} setMap={setMap} />}
      </div>
    </div>
  );
};

export default GamePage;
