import Image from "next/image";
import ibenmain from "../../../../public/ibenmain.jpeg"
import menu from "../../../../public/menu.svg"
import React from "react";

const NavbarMobile = (props: {setMenu: Function, handleMenu: Function, isopen: boolean}) => {
  return (

      <div className=" bg-very-dark-purple block md:hidden w-[99%] h-20   fixed z-50 top-0  justify-center items-center ">
        <div
          className={`w-full  fixed backdrop:blur  bg-white/10 top-2 rounded-[20px] h-16`}
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
              <div className="flex flex-col justify-end items-end text-pearl text-opacity-40 ">
                <span>ibenmain</span>
                <div className="hidden sm:block">
                  <span>ibenmaina@gmail.com</span>
                </div>
              </div>
              <Image className=" rounded-xl sm:rounded-2xl w-[40px] sm:w-[50px]" src={ibenmain} alt="" />
            </div>
          </div>
        </div>
      </div>

  );
};

export default NavbarMobile;
