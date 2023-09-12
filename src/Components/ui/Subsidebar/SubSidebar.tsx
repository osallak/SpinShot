import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import securityIcon from "./../../../../public/securityIcon.svg";
import securityIcon2 from "./../../../../public/securityIcon2.svg";
import linechoose from "./../../../../public/linechoose.svg";
import linechoose2 from "./../../../../public/linechoose2.svg";
import ToggleButton from "./../Buttons/ToggleButton";
import { buttons } from "@/Components/ui/DropDown/ArrayIcon";
import { useRouter } from "next/router";
import Profile from "@/pages/profile/profile";
import { useContext } from "react";
import { createContext } from "react";
import ContentProfile from "@/pages/profile/PersonalInformation";

const SubSidebar = (props: { setContent: Function; setPassword: Function }) => {
  const router = useRouter();
  const [isClick, setClick] = useState(false);
  const [background, setBackground] = useState(false);
  const [subbackground, setSubBackground] = useState<number>(1);
  const handle = (id: number, route: string) => {
    setSubBackground(id);
     props.setContent(route) 
  };
  const handlePasswd = (id: boolean, route: string) => {
    setBackground(true);
    props.setPassword(true)
  };
  return (
    <div className="  ml-[150px]  backdrop:blur  bg-white/10 space-y-10 w-[30%] hidden c-gb:block rounded-[20px]  ">
      <div className="w-full flex flex-col h-[132px]">
        <div className="flex justify-center  w-full h-full items-center text-[35px] font-Poppins font-extrabold text-pearl">
          <div className="w-[80%]">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="w-full flex justify-center  items-center">
          <div className=" bg-pearl w-[80%] opacity-40 border"></div>
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
                subbackground === button.id ? " bg-very-dark-purple" : ""
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
                        <Image className={``} src={securityIcon} alt=""/>
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
              className={` relative flex rounded-[12px] justify-between c-ml:text-xl 2xl:text-base xl:text-sm text-xs  w-[55%] left-[39%] bottom-[65px] xl:bottom-[65px] 2xl:bottom-[70px] `}
            >
              <button>Tow Factory</button>
              <div className="relative flex justify-end w-12 h-6 c-gb:w-9 c-xs:w-10">
                <ToggleButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubSidebar;
