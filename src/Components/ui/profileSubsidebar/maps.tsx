import Image from "next/image";
import React, { useEffect, useState } from "react";

import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const Maps = (props: any) => {
  const [clickable, setClickable] = useState(true);
  useEffect(() => {
    if (props.matchData) {
      setClickable(false);
    } else {
      setClickable(true);
    }
  }, [props.matchData])
  return (
    <div className="relative c-3xl:text-3xl">
      maps
      <Image className="absolute left-5" src={linechoose} alt="" />
      <button
        disabled={!clickable}
        onClick={() => props.changeBackgroundmap("map1", "normal", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map1}   c-3xl:text-3xl  absolute left-[25%] c-3xl:left-[12%] top-[35px] sm:top-[45px] c-3xl:top-12 text-base sm:text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6 `}
      >
        Normal
      </button>
      <Image className="absolute left-5 top-10 c-3xl:top-14" src={linechoose2} alt="" />
      <button
        disabled={!clickable}
        onClick={() => props.changeBackgroundmap("map2", "hard", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map2}  c-3xl:text-3xl absolute left-[25%] c-3xl:left-[12%]  c-3xl:top-[110px] top-24 text-base sm:text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6 `}
      >
        Hard
      </button>
      <Image className="absolute left-5 top-24 c-3xl:top-32 " src={linechoose2} alt="" />
      <button
        disabled={!clickable}
        onClick={() => props.changeBackgroundmap("map3", "expert", "very-dark-purple")}
        className={`bg-${props.backgroundmap.map3}  c-3xl:text-3xl absolute left-[25%] c-3xl:left-[12%] top-[155px] c-3xl:top-[180px] text-base sm:text-2xl  w-[90%] flex justify-start rounded-2xl p-2 px-6`}
      >
        Expert
      </button>
    </div>
  );
};

export default Maps;
