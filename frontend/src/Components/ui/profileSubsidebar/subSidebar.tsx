import Image from "next/image";
import React, { useEffect, useState } from "react";
import securityIcon from "./../../../../public/securityIcon.svg";
import securityIcon2 from "./../../../../public/securityIcon2.svg";
import profile from "./../../../../public/profileIcon.svg";
import Security from "../upDatePasswd/security";
import parseJwt from "@/utils/parsJwt";
import { Router, useRouter } from "next/router";

const SubSidebar = (props: any) => {
  const [background, setBackground] = useState(false);
  const [subbackground, setSubBackground] = useState<number>(1);
  const router = useRouter();

  const handle = (id: number, route: string) => {
    props.setClick(!props.isClick);
    route != "Security" ? props.setClick(false) : null;
    setSubBackground(id);
    props.setContent(route);
    props.setPassword(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
      router.push("/signin");
      return;
    }
    if (router.query.id === parseJwt(JSON.stringify(token)).sub) {
      setSubBackground(1);
      props.setContent("Personal_Information");
    } else {
      setSubBackground(2);
      props.setContent("Achievements");
    }
  }, [router.query.id]);

  const handlePasswd = (id: boolean, route: string) => {
    setBackground(true);
  };

  return (
    <div className=" backdrop:blur  bg-white/10 space-y-10 w-[30%] hidden c-gb:block rounded-[20px]  ml-[110px]  ">
      <div className="w-full flex flex-col h-[132px]">
        <div className="flex justify-center  w-full h-full items-center text-[35px] font-Poppins font-extrabold text-pearl">
          <div className="w-[80%] flex flex-row space-x-3 items-center">
            <Image src={profile} alt="" width={30} />
            <h1>Profile</h1>
          </div>
        </div>
        <div className="w-full flex justify-center  items-center">
          <div className=" bg-pearl w-[80%] opacity-40 border"></div>
        </div>
      </div>
      <div className={`font-Poppins font-semibold text-pearl `}>
        {props.table.map((bu: any) => (
          <div
            key={bu.id}
            className={`flex justify-center items-center rounded-2xl w-full h-20   `}
          >
            <button
              className={` w-[90%] h-full  rounded-2xl flex justify-center items-center  ${
                subbackground === bu.id ? " bg-very-dark-purple" : ""
              }`}
              onClick={() => handle(bu.id, bu.route)}
            >
              <div className="w-[80%] h-full flex justify-start items-center c-ml:text-xl 2xl:text-base xl:text-sm text-xs">
                {bu.text}
                {bu.text === "Security" ? (
                  <div
                    className={`flex justify-end items-center rounded-2xl h-20 w-[100%] `}
                    onClick={() => props.setClick(!props.isClick)}
                  >
                    <div className="">
                      {props.isClick ? (
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
        {props.isClick && (
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
