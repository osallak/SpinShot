"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { SidbarIcon } from "../FolderDropDown/ArrayIcon";
import Image from "next/image";
import test1 from "./../../../../public/test1.svg";
import { useAppSelector } from "../../../../redux_tool";
import search from "../../../../public/search.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import Search from "@/Components/search/userSearch";
import friend from "../../../../public/friend.svg";
import parseJwt from "@/utils/parsJwt";
import logoWhite from "../../../../public/logoWhite.svg";
import { useRouter } from "next/router";
import logout from "../../../../public/logout.svg";

const SidebarMobile = (props: {
  handleClick: Function;
  setOpned: Function;
  opened: boolean;
  // setSearch: Function;
  setPages: Function;
}) => {
  const [icons, setIcons] = useState<any[]>([]);
  const [hovered, setHovered] = useState(false);
  const Router = useRouter();
  // onClick={() => { props.opened == false ? props.handleClick(Icon.route) : props.setOpned(false); }}
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


  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverOut = () => {
    setHovered(false);
  };

  const handleLogOut = () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    Router.push("/signin");
  };

  useEffect(() => {
    setIcons([
      { icon: search, route: "/search" },
      {
        icon: profile,
        route: `/profile/${
          parseJwt(JSON.stringify(localStorage.getItem("token"))).sub
        }`,
      },
      {
        icon: message,
        route: `/messages/${
          parseJwt(JSON.stringify(localStorage.getItem("token"))).sub
        }`,
      },
      { icon: friend, route: "/friends" },
      {
        icon: game,
        route: `/game/${
          parseJwt(JSON.stringify(localStorage.getItem("token"))).sub
        }`,
      },
    ]);
  }, []);

  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
   props.handleClick(path);
    event.preventDefault();
    Router.push(path);
  };

  return (
    <div className="bg-very-dark-purple block md:hidden  h-full w-[60px] top-2 fixed z-50 pb-4 ">
      <div className=" flex items-center justify-between flex-col w-[60px] h-full c-gb:h-full  backdrop:blur   bg-white/10 md:hidden  rounded-xl mr-1 ">
        <div className=" space-y-6">
          <div className="h-24   flex items-end justify-center">
            <Image className=" "  src={logoWhite} alt="" />
          </div>
          <div className="w-full border border-pearl border-opacity-40"></div>
          <div className=" space-y-6 mt-2  ">
            {icons.map((option, index) => (
              <div
                key={index}
                className="flex justify-center items-center opacity-40  hover:opacity-100 m-2"
              >
                {option.route === "/search" ? (
              <button onClick={() => setSearch(!isSearch)}>
                {" "}
                <Image
                  src={option.icon}
                  alt={option.icon}
                  className=""
                />{" "}
                <Search isSearch={isSearch} />
              </button>
            ) : (
              <button onClick={(event) => changePage(event, option.route)}>
                {" "}
                <Image
                  src={option.icon}
                  alt={option.icon}
                  className=""
                />{" "}
              </button>
            )}
                {/* <button
                  className={``}
                  onClick={() => {
                    props.opened == false
                      ? props.handleClick(Icon.route)
                      : props.setOpned(false);
                  }}
                >
                  <Image src={Icon.icon} alt="" />
                </button> */}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70px] h-[70px] rounded-2xl relative flex justify-center items-center">
        <picture>
          <img
            onClick={handleLogOut}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className={`${
              hovered ? "opacity-10" : "opacity-100"
            } cursor-pointer rounded-xl`}
            src={data?.profile?.profile?.avatar}
            alt="profile pic"
            width={40}
            height={40}
          />
        </picture>
        {hovered && (
          <Image
            onClick={handleLogOut}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            src={logout}
            alt="logout"
            className="absolute cursor-pointer rounded-2xl"
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
