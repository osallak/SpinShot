import Image from "next/image";
import React from "react";

import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const Maps = (props: any) => {
  return (
    <div className="relative c-3xl:text-3xl">
      maps
      <Image className="absolute left-5" src={linechoose} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map1", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map1} text-[15px] c-3xl:text-3xl  absolute left-[25%] c-3xl:left-[12%] top-[35px] c-3xl:top-12 text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6 `}
      >
        Normal
      </button>
      <Image className="absolute left-5 top-10 c-3xl:top-14" src={linechoose2} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map2", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map2} text-[15px] c-3xl:text-3xl absolute left-[25%] c-3xl:left-[12%]  c-3xl:top-[110px] top-24 text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6 `}
      >
        Hard
      </button>
      <Image className="absolute left-5 top-28 c-3xl:top-32 " src={linechoose2} alt="" />
      <button
        onClick={() => props.changeBackgroundmap("map3", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map3} text-[15px] c-3xl:text-3xl absolute left-[25%] c-3xl:left-[12%] top-[165px] c-3xl:top-[180px] text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6`}
      >
        Expert
      </button>
    </div>
  );
};

export default Maps;
