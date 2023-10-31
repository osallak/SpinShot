import { useContext, useEffect, useState } from "react";
import SimpleButton from "../Buttons/simpleButton";
import Maps from "./maps";
import toast from "react-hot-toast";
import play from "./../../../../public/playIcon.svg";
import Image from "next/image";
import { SocketContext } from "@/context/socket.context";

const SubSidebarGame = (props: any) => {
  const { socket } = useContext(SocketContext);
  
  useEffect((
    
  ) => {}, [props.matchData, socket]);

  const HandleUpdate = () => {
    if (!socket) return;
    if (socket.connected) {
      socket.emit("joinQueue", { map: props.map });
    } else {
      toast.error("You are not connected to the server");
    }
    props.setIsClick(!props.isClick);
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
    <div className=" c-gb:block hidden w-[30%]  text-pearl text-3xl">
      <div className="bg-white/10 rounded-2xl h-full flex flex-col w-[100%] px-[10%]  ">
        <div className=" flex items-center  h-[10%] space-x-3">
          <Image src={play} alt="" width={40} />
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
        <div className="absolute h-[4%]  w-[17%] top-[85%] flex justify-center items-center ">
          <div className="w-[150px] h-full">
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

export default SubSidebarGame;
