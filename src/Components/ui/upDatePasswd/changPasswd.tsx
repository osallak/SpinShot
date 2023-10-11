import Image from "next/image";
import React from "react";
import ToggleButton from "../Buttons/ToggleButton";
import linechoose from "../../../../public/linechoose.svg";
import linechoose2 from "../../../../public/linechoose2.svg";

const Security = (props: { handlePasswd: Function; background: boolean, isActive:boolean, setisActive:Function}) => {
  return (
    <div>
      <div className=" ">
        <div className=" w-6 relative left-[30%] flex flex-row">
          <Image src={linechoose} alt="" />
        </div>
        <div
          className={` c-ml:text-xl 2xl:text-[14px]  text-[10px]  w-[60%] rounded-[12px] left-[33%] relative bottom-2 lg:bottom-5 2xl:bottom-4  ${
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
          className={` relative flex rounded-[12px] justify-between items-center c-ml:text-xl 2xl:text-[14px]  lg:text-[10px]    w-[54%] left-[35%] bottom-[70px] lg:bottom-[75px] `}
        >
          <button>2FA</button>
          <div className="relative flex justify-end w-12 h-6 c-gb:w-9 c-xs:w-10 ">
            <ToggleButton isActive={props.isActive} setisActive={props.setisActive}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;



