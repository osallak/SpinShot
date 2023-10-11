import React from "react";
import Image from "next/image";
import defi from "../../../../public/defi.svg";
import time from "../../../../public/time.svg";
import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const Mode = (props: any) => {
  return (
    <div className="relative text-3xl">
      Mode
      <Image className="absolute left-5" src={linechoose} alt="" />
      <button
        onClick={() => props.changeBackgroundmode("mode1", "very-dark-purple")}
        className={`bg-${props.backgroundmode.mode1} absolute left-[12%] top-12 text-2xl flex flex-row justify-between  w-[70%] rounded-2xl p-2 px-4 `}
      >
        Time
        <Image className="w-[15%] " src={time} alt="" />
      </button>
      <Image className="absolute left-5 top-14" src={linechoose2} alt="" />
      <button
        onClick={() => props.changeBackgroundmode("mode2", "very-dark-purple")}
        className={`bg-${props.backgroundmode.mode2} absolute left-[12%] top-28 text-2xl  flex flex-row justify-between   w-[70%] rounded-2xl p-2 px-4`}
      >
        Defi
        <Image className="w-[20%]" src={defi} alt="" />
      </button>
    </div>
  );
};

export default Mode;
