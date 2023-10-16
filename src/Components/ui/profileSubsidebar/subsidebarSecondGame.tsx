import React, { useState } from 'react'
import SimpleButton from '../Buttons/simpleButton'
import Maps from './maps';

const SubsidebarSecondGame = (props:any) => {

  const hendleUpdata = () => {};

  const [backgroundmap, setBackgroundmap] = useState({
    map1: "",
    map2: "",
    map3: "",
  });

  const changeBackgroundmap = (mapId: string, newColor: string) => {
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
    props.setMap(mapId);
    updatedBackgroundmap[mapId] = newColor;
    setBackgroundmap(updatedBackgroundmap);
  };

  return (
    <div className='fixed top-[70px] md:top-2 md:ml-[105px] ml-[65px] w-[70%] z-50  h-full  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] text-pearl pb-5 '>
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
                  changeBackgroundmap={changeBackgroundmap}
                  backgroundmap={backgroundmap}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[4%]  w-[17%] top-[85%] flex justify-center items-center ">
          <div className="w-[150px] h-full">
            <SimpleButton content="Play" onclick={hendleUpdata} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubsidebarSecondGame