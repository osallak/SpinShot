import Image from "next/image";
import React, { useState } from "react";
import securityIcon from "./../../../../public/securityIcon.svg";
import securityIcon2 from "./../../../../public/securityIcon2.svg";
import linechoose from "./../../../../public/linechoose.svg";
import linechoose2 from "./../../../../public/linechoose2.svg";
import ToggleButton from "../Buttons/ToggleButton";
import { buttons } from "@/Components/ui/DropDown/ArrayIcon";


const SubsidebarSecond = (props: {
  isActive: boolean;
  setisActive: Function;
  setContent: Function;
  setPassword: Function;
}) => {
  const [isClick, setClick] = useState(false);
  const [background, setBackground] = useState(false);
  const [subbackground, setSubBackground] = useState<number>(0);

  const handle = (id: number, route: string) => {
    {
      route != "Security" ? setClick(false) : null;
    }
    setSubBackground(id);
    props.setContent(route);
  };

  const handlePasswd = (id: boolean, route: string) => {
    setBackground(true);
    props.setPassword(true);
  };

  return (
    <div className=" fixed top-[70px] md:top-2 md:ml-[105px] ml-[65px] w-[70%] z-50  h-full c-gb:h-full  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] ">
      <div className=" text-[10px] sm:text-[20px] md:text-[35px] font-Poppins font-extrabold text-pearl p-6 space-y-3">
        <h1>Profile</h1>
        <div className=" w-[70%] opacity-40">
          {" "}
          <div className="border"></div>{" "}
        </div>
      </div>
      <div className={`font-Poppins text-pearl text-[1.32rem] `}>
        {buttons.map((button) => (
          <div
            key={button.id}
            className={`flex justify-center items-center rounded-2xl w-full h-20   `}
          >
            <button
              className={` w-[90%] h-full  rounded-2xl flex justify-center items-center  ${
                subbackground === button.id ? " bg-very-dark-purple " : ""
              }`}
              onClick={() => handle(button.id, button.route)}
            >
              <div className="w-[80%] h-full flex justify-start items-center c-ml:text-xl 2xl:text-base xl:text-sm text-sm">
                {button.text}
                {button.text === "Security" ? (
                  <div
                    className={`flex justify-end items-center rounded-2xl h-20 w-[100%]`}
                    onClick={() => setClick(!isClick)}
                  >
                    <div className="">
                      {isClick ? (
                        <Image className={``} src={securityIcon2} alt="" />
                      ) : (
                        <Image className={``} src={securityIcon} alt="" />
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </button>
          </div>
        ))}
        {isClick && (
          <div className=" ">
            <div className=" w-6 relative left-[30%] flex flex-row">
              <Image src={linechoose} alt="" />
            </div>
            <div
              className={`c-ml:text-xl 2xl:text-base xl:text-sm text-xs w-[60%] rounded-[12px] left-[33%] relative bottom-2 xl:bottom-3 2xl:bottom-4  ${
                background ? "bg-very-dark-purple" : "bg-white/12"
              }`}
              onClick={() => handlePasswd(true, "ResetPassword")}
            >
              <button className="left-[10%] relative">
                <button>Reset Password</button>
              </button>
            </div>
            <div className=" w-6 relative left-[30%] bottom-14 flex flex-row">
              <Image src={linechoose2} alt="" />
            </div>
            <div
              className={` relative flex rounded-[12px] justify-between c-ml:text-xl 2xl:text-base xl:text-sm text-xs  w-[55%] left-[39%] bottom-[65px] xl:bottom-[65px] 2xl:bottom-[70px]  `}
            >
              <button className="">Two Factor Auth</button>
              <div className="relative flex justify-end w-12 h-6 c-gb:w-9 c-xs:w-1 ">
                <ToggleButton
                  isActive={props.isActive}
                  setisActive={props.setisActive}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubsidebarSecond;
