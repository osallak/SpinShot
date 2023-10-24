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


let game: GameModel | null = null;

const GamePage = (props: any) => {
  const socket:any = useContext(SocketContext);
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const [mode, setMode] = useState<string>();
  const [map, setMap] = useState<string>("normal");
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();
  const divRef = React.useRef<HTMLDivElement>(null);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [pages, setPages] = useState("game");
  const [isClick, setIsClick] = useState(false);
  const [cancelJoin, setCancelJoin] = useState(false);
  const [matchData, setmatchData] = useState<any>(null);
  const router = useRouter();
  const [dataGame, setDataGame] = useState<any>();
  const [isClick2, setIsClick2] = useState(true);
  // const [depend, setDepend] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [gamerState, setGamerState] = useState<any>(null);
  const [winnerCardState, setWinnerCardState] = useState(true);
  const [loserCardState, setLoserCardState] = useState(true);
  const [gameJustFinished, setGameJustFinished] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [clear, setClear] = useState(false);

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
    // console.log("hana bdit ok");
    setWinnerCardState(true);
    setCancelJoin(false);
    setLoserCardState(true);
    setGameJustFinished(false);
    setIsClick(false);
    setGamerState(null);
    setGameOver(false);
    setmatchData(data);
    handleData(data);
    setDataGame(dataGame);
  };

  const gameOverCallback = (data: any) => {
    setScore(null);
    setClear(true);
    // console.log("game over ", data);
    setDataGame(null);
    setGamerState(data);
    setGameJustFinished(true);
    // setLoser(data);
    setmatchData(null);
    setGameOver(true);
    // setIsClick(true);
  };

  const handleData = async (data:any) => {
    // console.log("after");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      // console.log("matchData men handleData", data);
      if (data?.opponent || data?.opponnet) {
        let url = undefined
        if (data?.opponnet)
          url = `${ip}/users/profile/${data?.opponnet}`;
        else
          url = `${ip}/users/profile/${data?.opponent}`;
        const respo = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("setting 3afak: ", respo?.data);
        setDataGame(respo?.data);
        // console.log("after setting:", dataGame);
      }
    } catch (error) {
      // console.log("errrror dzeb")
      console.log(error);
      return;
    }
  };

  // const getDataOfUser = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/Signin");
  //     return;
  //   }
  //   try {
  //     await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // };

  const handleResize = () => {
    setWidth(window.innerWidth);
    setheight(window.innerHeight);
  };

  const handleClick = (route: string) => {
    console.log("route: ", route);
    {
      route.includes("/game") && !opened ? setOpned(true) : setOpned(false);
    }
    setPages("/game");
    // setOpned(true);
    // route ? setPages(route) : null;
  };

  // useEffect(() => {
    // console.log("1111111");
    // handleData();
    // getDataOfUser();
    // setDepend(false);
  // }, []);

  useEffect(() => {
    if (!socket)
    return;
    console.log("socket: ", socket);
    handleResize();
    // const token = localStorage.getItem("token");
    // let socket: Socket = io(`ws://${socketIp}/games`, {
    //   extraHeaders: { Authorization: `Bearer ${token}` },
    // });
    socket.on("connect", () => {
      console.log("connected......");
      socket.emit("message", "Message received on the server...");
    });

    socket.on("cancel-join", cancelJoinCallback);
    socket.on("error", errorEventCallback);
    socket.on("gameOver", gameOverCallback);
    socket.on("match", gameStartedCallback);
    socket.on("gameState", (data: any) => {
      // console.log("game state ", data);
      // setScore(data);
      game?.updateState(data);
    });
    socket.on("scoreUpdate", (data: any) => {
      // console.log("score update ", data);
      setScore(data);
      // game?.updateState(data);
    })
    // setSocket(socket);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  useEffect(() => {
    // handleData();
    game = new GameModel(divRef.current!, map!, socket!);
    return () => {
      game?.destroy();
    };
  }, [width, height, isopen, map, socket]);

  const cleanUp = () => {
    setDataGame(null);
    setmatchData(null);
  };

  useEffect(() => {
    return () => {
      if (clear) {
        cleanUp();
      }
    };
  }, []);

  // {
  //   console.log(matchData, dataGame);
  // }

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
          // depend={depend}
          matchData={matchData}
          // setDepend={setDepend}
          setMap={setMap}
          setIsClick={setIsClick}
          isClick={isClick}
          socket={socket}
          map={map}
        />

        {isopen && (
          <SidebarMobile
            handleClick={handleClick}
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
            <NavGame dataGame={dataGame} score={score} />
          </div>
          <div
            className={`h-[80%] w-[80%] flex justify-center items-center relative `}
            ref={divRef}
          ></div>
        </div>
        {opened && pages == "/game" &&(
          <SubsidebarSecondGame
          // opened={opened}
          setOpned={setOpned}
            // depend={depend}
            matchData={matchData}
            // setDepend={setDepend}
            setMap={setMap}
            setIsClick={setIsClick}
            isClick={isClick}
            socket={socket}
            map={map}
          />
        )}
        {isClick && !matchData && (
          <Matchmaking
            isClick={isClick}
            setIsClick={setIsClick}
            socket={socket}
            dataGame={dataGame}
            setDataGame={setDataGame}
            setmatchData={setmatchData}
            matchData={matchData}
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
      <Toaster />
    </div>
  );
};

export default GamePage;
