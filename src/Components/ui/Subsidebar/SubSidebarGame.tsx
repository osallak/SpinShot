import React, { useState } from "react";
import SimpleButton from "../Buttons/SimpleButton";
import Mode from "./Mode";
import Maps from "./Maps";

const SubSidebarGame = (props: any) => {
  const hendleUpdata = () => {};
  const [backgroundmode, setBackgroundmode] = useState({
    mode1: "",
    mode2: "",
  });

  const changeBackgroundmode = (modeId: string, newColor: string) => {
    const updatedBackgroundmode = {
      mode1: "",
      mode2: "",
    };
    props.setMode(modeId);
    updatedBackgroundmode[modeId] = newColor;
    setBackgroundmode(updatedBackgroundmode);
  };

  const [backgroundmap, setBackgroundmap] = useState({
    map1: "",
    map2: "",
    map3: "",
  });

  const changeBackgroundmap = (mapId: string, newColor: string) => {
    const updatedBackgroundmap = {
      map1: "",
      map2: "",
      map3: "",
    };
    props.setMap(mapId);
    updatedBackgroundmap[mapId] = newColor;
    setBackgroundmap(updatedBackgroundmap);
  };

  return (
    <div className=" c-gb:block hidden w-[30%]  text-pearl">
      <div className="bg-white/10 rounded-2xl h-full flex flex-col w-[100%] px-[10%]  ">
        <div className=" flex items-center text-3xl  h-[10%] ">
          <h1>Game</h1>
        </div>
        <div className="flex items-center justify-center ">
          <div className="border w-full  opacity-40"></div>
        </div>
        <div className="">
          <div className=" flex flex-col  space-y-20 py-12">
            <div className=" text-3xl">Options</div>
            <div className="space-y-36">
              <div className="px-4 ">
                <Mode
                  changeBackgroundmode={changeBackgroundmode}
                  backgroundmode={backgroundmode}
                />
              </div>
              <div className="px-4 ">
                <Maps
                  changeBackgroundmap={changeBackgroundmap}
                  backgroundmap={backgroundmap}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[85%] left-[13%]">
          <SimpleButton content="Play" onclick={hendleUpdata} />
        </div>
      </div>
    </div>
  );
};

export default SubSidebarGame;
