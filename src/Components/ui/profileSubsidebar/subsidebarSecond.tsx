import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import securityIcon from "./../../../../public/securityIcon.svg";
import securityIcon2 from "./../../../../public/securityIcon2.svg";
import { buttons } from "@/Components/ui/FolderDropDown/ArrayIcon";
import Security from  "../upDatePasswd/security"
import { Router, useRouter } from "next/router";
import parseJwt from "@/utils/parsJwt";

const SubsidebarSecond = (props: any) => {

  const [isClick, setClick] = useState(false);
  const [background, setBackground] = useState(false);
  const [subbackground, setSubBackground] = useState<number>(0);
  const router = useRouter();

  const handle = (id: number, route: string) => {
    route != "Security" ? setClick(false) : null;
    setSubBackground(id);
    props.setContent(route);
    // props.setPassword(true);
  };

  const handlePasswd = (id: boolean, route: string) => {
    setBackground(true);
    props.setPassword(true);
  };

  const handleClick = () => {
    router.push(`/profile/${parseJwt(JSON.stringify(localStorage.getItem("token"))).sub}`);
  }
  
  return (
    <div className=" fixed top-[70px] md:top-2 md:ml-[105px] ml-[65px] w-[70%] z-50  h-full c-gb:h-full  backdrop:blur  bg-white/10 c-gb:hidden block rounded-[20px] ">
      <div className=" text-[10px] sm:text-[20px] md:text-[35px] font-Poppins font-extrabold text-pearl p-6 space-y-3">
        <button onClick={() => handleClick()}> Profile</button>
        <div className=" w-[70%] opacity-40">
          {" "}
          <div className="border"></div>{" "}
        </div>
      </div>
      <div className={`font-Poppins text-pearl text-[1.32rem] `}>
        {props.table.map((button:any) => (
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
              <div className="w-[80%] h-full flex justify-start items-center text-[10px] sm:text-[20px]">
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

export default SubsidebarSecond;
