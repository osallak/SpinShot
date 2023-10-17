import React, { useState } from "react";
import { SidbarIcon } from "../FolderDropDown/ArrayIcon";
import Image from "next/image";
import test1 from "./../../../../public/test1.svg";
import { useAppSelector } from "../../../../redux_tool";
import Search from "@/Components/search/userSearch";
import { Router, useRouter } from "next/router";

const SidebarMobile = (props: {
  // handleClick: Function;
  setOpned: Function;
  opened: boolean;
  // setSearch: Function;
  setPages: Function;
}) => {

  const data = useAppSelector((state) => state.Profile);
  const [isSearch, setSearch] = useState(false);
  const router = useRouter();

  const handleClick = (route: string | undefined) => {
    if (route == "/profile")
    {
      props.setOpned(true)
      props.setPages(route);
    }
    else if (route)
      router.push(route); 
  };

  return (
    <div className="bg-very-dark-purple block md:hidden  h-full w-[60px] top-2 fixed z-50 pb-4 ">
      <div className=" flex justify-between items-center flex-col w-[60px] h-full c-gb:h-full  backdrop:blur   bg-white/10 md:hidden  rounded-[20px] mr-1 ">
        <div className=" space-y-6 mt-2  ">
          {SidbarIcon.map((Icon, index) => (
            <div
              key={index}
              className="flex justify-center items-center opacity-40  hover:opacity-100 m-2"
            >
              {Icon.route == "/search" ? (
                <button onClick={() => setSearch(!isSearch)}>
                  <Search isSearch={isSearch} />

                  <Image src={Icon.icon} alt="" />
                </button>
              ) : (
                <button
                  className={``}
                  onClick={() => {
                    props.opened == false
                      ? handleClick(Icon.route)
                      : props.setOpned(false);
                  }}
                >
                  <Image src={Icon.icon} alt="" />
                </button>
              )}
            </div>
          ))}
        </div>
        {data?.profile?.profile?.avatar ? (
          <picture>
            <img
              className="w-[50px] rounded-xl"
              src={data?.profile?.profile?.avatar}
              alt="Image not found"
            />
          </picture>
        ) : (
          <Image className="w-[50px]" src={test1} alt="Image not found" />
        )}
      </div>
    </div>
  );
};

export default SidebarMobile;
