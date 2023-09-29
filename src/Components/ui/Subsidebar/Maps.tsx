import Image from "next/image";
import React from "react";

import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const Maps = (props: any) => {
  return (
    <div className="relative text-3xl">
      maps
      <Image className="absolute left-5" src={linechoose} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map1", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map1} absolute left-[12%] top-12 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4`}
      >
        Normal
      </button>
      <Image className="absolute left-5 top-14" src={linechoose2} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map2", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map2} absolute left-[12%] top-28 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4 `}
      >
        Hard
      </button>
      <Image className="absolute left-5 top-32 " src={linechoose2} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map3", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map3} absolute left-[12%] top-44 text-2xl  w-[70%] flex justify-start rounded-2xl p-2 px-4`}
      >
        Expert
      </button>
    </div>
  );
};

export default Maps;
