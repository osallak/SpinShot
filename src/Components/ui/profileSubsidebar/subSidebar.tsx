import Image from "next/image";
import React, { useState } from "react";
import securityIcon from "./../../../../public/securityIcon.svg";
import securityIcon2 from "./../../../../public/securityIcon2.svg";
import { buttons } from "@/Components/ui/folderDropDown/arrayIcon";
import Security from "../upDatePasswd/security";

const SubSidebar = (props: any) => {
  const [isClick, setClick] = useState(false);
  const [background, setBackground] = useState(false);
  const [subbackground, setSubBackground] = useState<number>(1);

  const handle = (id: number, route: string) => {
    {
      route != "Security" ? setClick(false) : null;
    }
    setSubBackground(id);
    props.setContent(route);
    props.setPassword(true);
  };

  const handlePasswd = (id: boolean, route: string) => {
    setBackground(true);
  };

  return (
    <div className=" backdrop:blur  bg-white/10 space-y-10 w-[30%] hidden c-gb:block rounded-[20px]  ml-[110px]">
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
      <div className={`font-Poppins font-semibold text-pearl `}>
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
              <div className="w-[80%] h-full flex justify-start items-center c-ml:text-xl 2xl:text-base xl:text-sm  text-xs">
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
          <Security
            handlePasswd={handlePasswd}
            background={true}
            isActive={props.isActive}
            setisActive={props.setisActive}
          />
        )}
      </div>
    </div>
  );
};

export default SubSidebar;
