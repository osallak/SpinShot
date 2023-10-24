import Image from "next/image";
import menu from "../../../../public/menu.svg";
import test1 from "../../../../public/test1.svg";
import React from "react";
import { useAppSelector } from "../../../../redux_tool";

const NavbarMobile = (props: {
  setMenu: Function;
  handleMenu: Function;
  isopen: boolean;
}) => {
  const data = useAppSelector((state) => state.Profile);
  
  return (
    <div className=" bg-very-dark-purple block md:hidden w-full h-20 fixed z-50 top-0  justify-center items-center">
      <div
        className={`w-[98%]  fixed backdrop:blur  bg-white/10 top-2 rounded-xl h-16 `}
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
            {data?.profile?.profile?.avatar ? (
              <picture>
              <img
                className="rounded-lg md:rounded-2xl w-[35px] md:w-[50px]"
                src={data?.profile?.profile?.avatar}
                alt=""
                />
                </picture>
            ) : (
              <Image
                className=" rounded-lg md:rounded-2xl w-[35px] md:w-[50px]"
                src={test1}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
