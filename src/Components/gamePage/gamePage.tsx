import NavGame from "@/Components/ui/FolderNavbar/navGame";
import NavbarMobile from "@/Components/ui/FolderNavbar/navbarMobile";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import SidebarMobile from "@/Components/ui/folderSidebar/sidebarMobile";
import SubSidebarGame from "@/Components/ui/profileSubsidebar/subSidebarGame";
import SubsidebarSecondGame from "@/Components/ui/profileSubsidebar/subsidebarSecondGame";
import ip from "@/utils/endPoint";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import GameCard from "./gameCard";
import Gamemenu from "./gameMenu";
import GameModel from "./gameModel";
import Matchmaking from "./matchmaking";
import { SocketContext } from "@/context/socket.context";
import Counter from "./counter";
import { Socket, io } from "socket.io-client";
import parseJwt from "@/utils/parsJwt";
import { useAppSelector } from "../../../redux_tool";

let game: GameModel | null = null;
// let socket: Socket;

const GamePage = (props: any) => {
  const auth_status = useAppSelector((state) => state.Profile.auth_status);
  const { socket, setSocket } = useContext(SocketContext);
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  // const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>("normal");
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();
  const divRef = React.useRef<HTMLDivElement>(null);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [pages, setPages] = useState("game");
  const [isClick, setIsClick] = useState(false);
  // const [cancelJoin, setCancelJoin] = useState(false);
  const [matchData, setmatchData] = useState<any>(null);
  const router = useRouter();
  const [dataOpponent, setDataOfOpponent] = useState<any>();
  const [isClick2, setIsClick2] = useState(true);
  // const [depend, setDepend] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [gamerState, setGamerState] = useState<any>(null);
  const [winnerCardState, setWinnerCardState] = useState(true);
  const [loserCardState, setLoserCardState] = useState(true);
  // const [gameJustFinished, setGameJustFinished] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [clear, setClear] = useState(false);

  const [start, setStart] = useState(false);

  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };

  const errorEventCallback = (error: string) => {
    // console.log("error event");
    toast.error(error);
  };

  const cancelJoinCallback = () => {
    // console.log("cancel join");
    // setCount(true);
    gameOver && setGameOver(false);
    // setCancelJoin(true);
  };

  const gameStartedCallback = (data: any) => {
    // console.log("game started");
    // setCount(true);
    setWinnerCardState(true);
    // setCancelJoin(false);
    setLoserCardState(true);
    // setGameJustFinished(false);
    // console.log("game start data: ", data);
    setIsClick(false);
    setGamerState(null);
    setGameOver(false);
    setmatchData(data);
    handleData(data);
    // setDataOfOpponent(data);
  };

  const gameOverCallback = (data: any) => {
    // console.log("game over data: ", data);
    setScore(null);
    setClear(true);
    setDataOfOpponent(null);
    setGamerState(data);
    // setGameJustFinished(true);
    // setLoser(data);
    setmatchData(null);
    setGameOver(true);
    // setIsClick(true);
  };

  const handleData = async (data: any) => {
    // console.log("after");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
      router.push("/signin");
      return;
    }
    try {
      // console.log("matchData men handleData", data);
      if (data?.opponent || data?.opponnet) {
        let url = undefined;
        if (data?.opponnet) url = `${ip}/users/profile/${data?.opponnet}`;
        else url = `${ip}/users/profile/${data?.opponent}`;
        const respo = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataOfOpponent(respo?.data);
        // console.log("after setting:", dataOpponent);
      }
    } catch (error) {
      // console.log("errrror dzeb")
      console.log(error);
      return;
    }
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    setheight(window.innerHeight);
  };

  const initializeSocket = () => {
    socket.on("connect", () => {
      console.log("connected......");
    });
    socket.on("cancel-join", cancelJoinCallback);
    socket.on("error", errorEventCallback);
    socket.on("gameOver", gameOverCallback);
    socket.on("match", gameStartedCallback);
    socket.on("gameState", (data: any) => {
      setStart(false);
      // console.log("game state ", data);
      // setScore(data);
      game?.updateState(data);
    });

    socket.on("scoreUpdate", (data: any) => {
      // console.log("score update ", data);
      setScore(data);
      // game?.updateState(data);
    });
    return null;
  };
  useEffect(() => {
    initializeSocket();
    return () => {
      socket.off("connect");
      socket.off("cancel-join");
      socket.off("error");
      socket.off("gameOver");
      socket.off("match");
      socket.off("gameState");
      socket.off("scoreUpdate");
    };
  }, []);

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    // handleData();
    game = new GameModel(divRef.current!, map!, socket!);
    return () => {
      game?.destroy();
    };
  }, [width, height, isopen, map]);

  const cleanUp = () => {
    setDataOfOpponent(null);
    setmatchData(null);
  };

  useEffect(() => {
    return () => {
      if (clear) {
        cleanUp();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (start) {
  //     const timer = setInterval(() => {
  //       setCounter((prevCounter) => prevCounter - 1);
  //     }, 1000);

  //     // return () => {
  //     //   clearInterval(timer);
  //     // };
  //   }
  //   return () => {
  //     setCounter(3);
  //   };
  // }, [start]);

  return (
    <div
      className={
        "bg-very-dark-purple w-screen h-screen font-semibold font-Poppins "
      }
    >
      {isClick2 && <Gamemenu isClick2={isClick2} setIsClick2={setIsClick2} />}
      <div className={` ml-2 ${isopen ? "ml-[70px]  w-full " : null}  `}>
        <NavbarMobile
          setMenu={setMenu}
          handleMenu={handleMenu}
          isopen={isopen}
        />
      </div>

      <div className={` flex flex-row c-gb:space-x-3 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame
          // depend={depend}
          matchData={matchData}
          // setDepend={setDepend}
          setMap={setMap}
          setIsClick={setIsClick}
          isClick={isClick}
          // socket={socket}
          map={map}
        />

        {isopen && (
          <SidebarMobile
            currentPage={"/game"}
            // handleClick={handleClick}
            setOpned={setOpned}
            opened={opened}
            setPages={setPages}
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
            <NavGame dataOpponent={dataOpponent} score={score} />
          </div>
          <div
            id="game"
            className={`h-[80%] w-[80%] flex justify-center items-center relative `}
            ref={divRef}
          ></div>
        </div>
        {opened && pages == "/game" && (
          <SubsidebarSecondGame
            // opened={opened}
            setOpned={setOpned}
            // depend={depend}
            matchData={matchData}
            // setDepend={setDepend}
            setMap={setMap}
            setIsClick={setIsClick}
            isClick={isClick}
            // socket={socket}
            map={map}
          />
        )}
        {isClick && !matchData && (
          <Matchmaking
            isClick={isClick}
            setIsClick={setIsClick}
            // socket={socket}
            dataOpponent={dataOpponent}
            setDataOfOpponent={setDataOfOpponent}
            // setmatchData={setmatchData}
            // matchData={matchData}
            setClear={setClear}
          />
        )}
      </div>
      {gameOver && gamerState && gamerState.winner === router.query?.id && (
        <GameCard
          cardState={winnerCardState}
          setCardState={setWinnerCardState}
          gameState={"You Win"}
        />
      )}
      {gameOver && gamerState && gamerState.winner !== router.query?.id && (
        <GameCard
          cardState={loserCardState}
          setCardState={setLoserCardState}
          gameState={"You Lose"}
        />
      )}

      {start && <Counter setStart={setStart} start={start} />}
      <Toaster />
      {/* <Main /> */}
    </div>
  );
};

export default GamePage;
