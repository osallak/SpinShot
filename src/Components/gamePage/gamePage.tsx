import SideBar from "@/Components/ui/folderSidebar/sideBar";
import React, { useState, useEffect, use } from "react";
import SubSidebarGame from "@/Components/ui/profileSubsidebar/subSidebarGame";
import NavbarMobile from "@/Components/ui/FolderNavbar/navbarMobile";
import NavGame from "@/Components/ui/FolderNavbar/navGame";
import SidebarM from "@/Components/ui/folderSidebar/sidebarMobile";
import SubsidebarSecondGame from "@/Components/ui/profileSubsidebar/subsidebarSecondGame";
import GameModel from "./gameModel";
import { Socket, io } from "socket.io-client";
import Matchmaking from "./matchmaking";
import parseJwt from "@/utils/parsJwt";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Gamemenu from "./gameMenu";
import ip from "@/utils/endPoint";
import axios from "axios";

let game: GameModel | null = null;

const GamePage = (props: any) => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>("normal");
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [pages, setPages] = useState("game");
  const [isClick, setIsClick] = useState(false);
  const [cancelJoin, setCancelJoin] = useState(false);
  const [matchData, setmatchData] = useState<any>();
  const dispatch = useAppDispatch();
  const myData = useAppSelector((state) => state.Profile);
  const router = useRouter();
  const [dataGame, setDataGame] = useState<any>();
  const [isClick2, setIsClick2] = useState(true);
  const [depend, setDepend] = useState(false);

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  const errorEventCallback = (error: string) => {
    toast.error(error);
  }

  const cancelJoinCallback = () => {
    setCancelJoin(true);
  }

  const gameStartedCallback = (data: any) => {
    setmatchData(data);
  }

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try{
     if (parseJwt(JSON.stringify(token)).sub === matchData?.firstPlayer) {
      const url = `${ip}/users/profile/${matchData?.secondPlayer}`;
      const respo = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataGame(respo?.data);
      } else if (parseJwt(JSON.stringify(token)).sub === matchData?.secondPlayer){
        const url = `${ip}/users/profile/${matchData?.firstPlayer}`;
        const respo = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataGame(respo?.data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  
  const getDataOfUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    setheight(window.innerHeight);
  };
 
  const handleClick = (a: boolean, route: string | undefined) => {
    setOpned(true);
    { route ? setPages(route) : null }
  };
  
  useEffect(() => {
    setDepend(false);
    getDataOfUser();
    handleResize();
    const token = localStorage.getItem("token");
    let socket: Socket = io("ws://e1r7p8:3000/games", {
      extraHeaders: { 'Authorization': `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("connected......");
      socket.emit('message', 'Message received on the server...');
    });
    socket.on("cancel-join", cancelJoinCallback);
    socket.on("error", errorEventCallback);
    socket.on("match", gameStartedCallback);
    socket.on("eventFromBackend", (data: any) => {
      game?.updateState(data);
    });

    setSocket(socket);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    handleData();
  }, [matchData]);


  useEffect(() => {
    handleData();
    // setDepend(false);
    game = new GameModel(divRef.current!, map!, socket!);
    return () => {
      game?.destroy();
    };
  }, [width, height, isopen, map, socket]);


  return (
    <div
      className={
        "bg-very-dark-purple w-screen h-screen font-semibold font-Poppins "
      }
    >
      {isClick2 && <Gamemenu isClick2={isClick2} setIsClick2={setIsClick2}/>}
      <div className={`  ${isopen ? "ml-[70px]  w-full " : null}  `}>
        <NavbarMobile
          setMenu={setMenu}
          handleMenu={handleMenu}
          isopen={isopen}
        />
      </div>
      <div className={` flex flex-row c-gb:space-x-3 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame
          depend={depend}
          setDepend={setDepend}
          setMap={setMap}
          setIsClick={setIsClick}
          isClick={isClick}
          socket={socket}
          map={map}
        />

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
          <div
            className={`flex justify-center items-center w-[96%] c-gb:w-[80% h-[15%] `}
          >
            <NavGame />
          </div>
          <div
            className={` h-[80%] w-[80%] flex justify-center items-center relative `}
            ref={divRef}
          ></div>
        </div>
        {opened && (
          <SubsidebarSecondGame
            setMode={setMode}
            setMap={setMap}
            setIsClick={setIsClick}
            isClick={isClick}
          />
        )}
        {!cancelJoin &&  <Matchmaking isClick={isClick} setIsClick={setIsClick} socket={socket} matchData={matchData} myData={myData} dataGame={dataGame} setDataGame={setDataGame}/>}
      </div>
      <Toaster />
    </div>
  );
};
export default GamePage;
