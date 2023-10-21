import NavGame from "@/Components/ui/FolderNavbar/navGame";
import NavbarMobile from "@/Components/ui/FolderNavbar/navbarMobile";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import SidebarM from "@/Components/ui/folderSidebar/sidebarMobile";
import SubSidebarGame from "@/Components/ui/profileSubsidebar/subSidebarGame";
import SubsidebarSecondGame from "@/Components/ui/profileSubsidebar/subsidebarSecondGame";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Socket, io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import GameCard from "./gameCard";
import Gamemenu from "./gameMenu";
import GameModel from "./gameModel";
import Matchmaking from "./matchmaking";
import { get } from "node:http";

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
  const [gameOver, setGameOver] = useState(false);
  const [gamerState, setGamerState] = useState<any>(null);
  const [winnerCardState, setWinnerCardState] = useState(true);
  const [loserCardState, setLoserCardState] = useState(true);

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  const errorEventCallback = (error: string) => {
    toast.error(error);
  };

  const cancelJoinCallback = () => {
    gameOver && setGameOver(false);
    setCancelJoin(true);
  };

  const gameStartedCallback = (data: any) => {
    // console.log("match data ", data);
    setWinnerCardState(true);
    setLoserCardState(true);
    setGamerState(null);
    // setGameOver(true);
    setmatchData(data);
  };

  const gameOverCallback = (data: any) => {
    console.log("game over ", data);
    setGamerState(data);
    // setLoser(data);
    setmatchData(null);
    setDataGame(null);
    setGameOver(true);
  };

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      if (matchData?.opponent) {
        const url = `${ip}/users/profile/${matchData?.opponent}`;
        const respo = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataGame(respo?.data);
        // console.log("data game ", respo?.data);
      }
      // } else if (parseJwt(JSON.stringify(token)).sub === matchData?.secondPlayer){
      //   const url = `${ip}/users/profile/${matchData?.firstPlayer}`;
      //   const respo = await axios.get(url, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   setDataGame(respo?.data);
      // }
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
    {
      route ? setPages(route) : null;
    }
  };

  useEffect(() => {
    handleData();
    getDataOfUser();
    setDepend(false);
  }, [handleData, depend, getDataOfUser]);

  useEffect(() => {
    handleResize();
    const token = localStorage.getItem("token");
    let socket: Socket = io("ws://e1r7p8:3000/games", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("connected......");
      socket.emit("message", "Message received on the server...");
    });

    socket.on("cancel-join", cancelJoinCallback);
    socket.on("error", errorEventCallback);
    socket.on("gameOver", gameOverCallback);
    socket.on("match", gameStartedCallback);
    socket.on("gameState", (data: any) => {
      // console.log("game state ", data.ball);
      game?.updateState(data);
    });

    setSocket(socket);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // handleData();
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
      {isClick2 && <Gamemenu isClick2={isClick2} setIsClick2={setIsClick2} />}
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
            className={`h-[80%] w-[80%] flex justify-center items-center relative `}
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
        {!cancelJoin && !gameOver && !matchData && (
          <Matchmaking
            isClick={isClick}
            setIsClick={setIsClick}
            socket={socket}
            dataGame={dataGame}
            setDataGame={setDataGame}
            matchData={matchData}
          />
        )}
      </div>
      {gameOver && !gamerState && gamerState.winner === router.query?.id && (
        <GameCard
          cardState={winnerCardState}
          setCardState={setWinnerCardState}
          gameState={"You Win"}
        />
      )}
      {gameOver && !gamerState && gamerState.winner !== router.query?.id && (
        <GameCard
          cardState={loserCardState}
          setCardState={setLoserCardState}
          gameState={"You Lose"}
        />
      )}
      <Toaster />
    </div>
  );
};

export default GamePage;
