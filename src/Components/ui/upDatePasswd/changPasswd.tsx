import Image from "next/image";
import React from "react";
import ToggleButton from "../Buttons/ToggleButton";
import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const ChangPasswd = (props: { handlePasswd: Function; background: boolean }) => {
  return (
    <div>
      <div className=" ">
        <div className=" w-6 relative left-[30%] flex flex-row">
          <Image src={linechoose} alt="" />
        </div>
        <div
          className={`c-ml:text-xl 2xl:text-base xl:text-sm text-xs w-[60%] rounded-[12px] left-[33%] relative bottom-2 xl:bottom-3 2xl:bottom-4  ${
            props.background ? "bg-very-dark-purple" : "bg-white/12"
          }`}
          onClick={() => props.handlePasswd(true, "ResetPassword")}
        >
          <button className="left-[10%] relative h-10">
            <button>Reset Password</button>
          </button>
        </div>
        <div className=" w-6 relative left-[30%] bottom-14 flex flex-row">
          <Image src={linechoose2} alt="" />
        </div>
        <div
          className={` relative flex rounded-[12px] justify-between c-ml:text-xl 2xl:text-base xl:text-sm text-xs  w-[55%] left-[39%] bottom-[65px] xl:bottom-[65px] 2xl:bottom-[70px] `}
        >
          <button>Tow Factory</button>
          <div className="relative flex justify-end w-12 h-6 c-gb:w-9 c-xs:w-10">
            <ToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangPasswd;
