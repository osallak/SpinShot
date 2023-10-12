import Image from "next/image";
import menu from "../../../../public/menu.svg"
import React from "react";
import { useAppSelector } from "../../../../redux_tool";

const NavbarMobile = (props: {setMenu: Function, handleMenu: Function, isopen: boolean}) => {
  const data = useAppSelector((state) => state.Profile);
  return (

      <div className=" bg-very-dark-purple block md:hidden w-full h-16 fixed z-50 top-0 justify-center items-center ">
        <div
          className={`w-full  fixed backdrop:blur  bg-white/10 top-1 rounded-[20px] h-14`}
        >
          <div className="flex flex-row justify-between">
            <button
              className=" block  c-gb:hidden "
              onClick={() => {
                !props.isopen ? props.setMenu(!props.isopen) : props.handleMenu();
              }}
            >
              <Image src={menu} alt="" />
            </button>
            <div
              className={`flex justify-end items-center space-x-2   ${
                props.isopen ? "mr-[88px] " : "mr-3"
              }`}
            >
              <div className="flex flex-col justify-end items-end text-pearl text-opacity-40 text-xs">
                <span>{data.profile?.username}</span>
                <div className="hidden sm:block">
                  <span>{data.profile?.email}</span>
                </div>
              </div>
              <Image className=" rounded-lg md:rounded-2xl w-[35px] md:w-[50px]" src={""} alt="" />
            </div>
          </div>
        </div>
      </div>

  );
};

export default NavbarMobile;
