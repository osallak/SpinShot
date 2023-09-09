import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import logo from "./../../../../public/logo.svg";
import ibenmain from "./../../../../public/ibenmain.jpeg";
import { Icons } from "@/Components/ui/DropDown/ArrayIcon";

const Sidebar = () => {
  const router = useRouter();
  const a = () => {
    console.log("error");
  };
  const handle = (route: string) => {
    route != "profile" ? 
    router.push(route) :
    ""
  };

  return (
    <div
      className={` hidden c-gb:block w-[150px] h-[100vh] bg-white   backdrop:blur  bg-white/10 rounded-[20px]`}
    >
      <div className="flex items-center flex-col space-y-10 ">
        <div className="opacity-40 mt-4">
          <Image src={logo} alt="" />
        </div>
        <div className="  border-pearl w-[80px] opacity-40 border "></div>
        <div className=" flex justify-between ">
          <div className="  flex justify-between flex-col items-center space-y-10">
            {Icons.map((option, index) => (
              <div key={index} className=" opacity-40 hover:opacity-100 ">
                {option.route != "/search" &&
                option.route != "/notification" ? (
                  <button onClick={() => handle(option.route)}>
                    {" "}
                    <Image src={option.icon} alt="" />{" "}
                  </button>
                ) : (
                  <button onClick={a}>
                    {" "}
                    <Image src={option.icon} alt="" />{" "}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className=" w-12 justify-between flex items-end">
          <div>
            <Image className="rounded-[15px]" src={ibenmain} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
