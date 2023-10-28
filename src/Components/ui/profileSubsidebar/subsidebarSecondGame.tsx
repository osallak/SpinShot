import React, { useContext, useState } from "react";
import SimpleButton from "../Buttons/simpleButton";
import Maps from "./maps";
import { SocketContext } from "@/context/socket.context";

const SubsidebarSecondGame = (props: any) => {
  const {socket} = useContext(SocketContext);
  const HandleUpdate = () => {
    if (!socket) return;
    socket.emit("joinQueue", { map: props.map });
    props.setIsClick(!props.isClick);
    props.setOpned(false);
    // props.setDepend(true);
  };

  const [backgroundmap, setBackgroundmap] = useState({
    map1: "very-dark-purple",
    map2: "",
    map3: "",
  });

  const changeBackgroundmap = (
    mapId: string,
    type: string,
    newColor: string
  ) => {
    const updatedBackgroundmap: {
      [key: string]: string;
      map1: string;
      map2: string;
      map3: string;
    } = {
      map1: "",
      map2: "",
      map3: "",
    };
    props.setMap(type);
    updatedBackgroundmap[mapId] = newColor;
    setBackgroundmap(updatedBackgroundmap);
  };

  return (
    <div className="fixed top-[75px] md:top-2 md:ml-[105px] ml-[65px] w-[70%] z-50  h-[93%] md:h-[98%] backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] text-pearl  ">
      <div className=" rounded-2xl h-full flex flex-col w-[100%] px-[10%] text-base sm:text-2xl ">
        <div className=" flex items-center h-[10%] ">
          <h1>Game</h1>
        </div>
        <div className="flex items-center justify-center ">
          <div className="border w-full  opacity-40"></div>
        </div>
        <div className="">
          <div className=" flex flex-col  space-y-20 py-12">
            <div className="">Options</div>
            <div className="space-y-36">
              <div className="px-4 ">
                <Maps
                  matchData={props.matchData}
                  changeBackgroundmap={changeBackgroundmap}
                  backgroundmap={backgroundmap}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[4%]  w-full top-[85%] flex justify-center items-center ">
          <div className="w-[100px] h-full">
            <SimpleButton
              content="Play"
              onclick={HandleUpdate}
              gameSession={props.matchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsidebarSecondGame;
