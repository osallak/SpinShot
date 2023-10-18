"use client";
import Search from "@/Components/search/userSearch";
import parseJwt from "@/utils/parsJwt";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import friend from "../../../../public/friend.svg";
import game from "../../../../public/game.svg";
import logoWhite from "../../../../public/logoWhite.svg";
import logout from "../../../../public/logout.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import search from "../../../../public/search.svg";
import { useAppDispatch, useAppSelector } from "../../../../redux_tool";
import { getProfile } from "../../../../redux_tool/redusProfile/profileThunk";

const SideBar = () => {
  const Router = useRouter();
  const data = useAppSelector((state) => state.Profile);
  const [hovered, setHovered] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [icons, setIcons] = useState<any>([]);
  const dispatch = useAppDispatch()


  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault();
    Router.push(path);
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
      { icon: profile, route: `/profile/${parseJwt(JSON.stringify(localStorage.getItem("token"))).sub}` },
      { icon: message, route: `/messages/${parseJwt(JSON.stringify(localStorage.getItem("token"))).sub}` },
      { icon: friend, route: "/friends" },
      { icon: game, route: "/game" },
    ])
  }, [])

  
  const dis = async () => {
    const sub = parseJwt(JSON.stringify(localStorage.getItem("token"))).sub
    try {
      await dispatch(getProfile(sub))
    } catch (error: any) {
    }
  }

  useEffect(() => {
    dis();
  }, [])

  return (
    <div
      className={`bg-white/10 rounded-2xl h-full md:flex flex-col hidden lg:w-[140px] w-[100px] lg:max-w-[100px] min-w-[80px] `}
    >
      <div className="w-full h-[10%] min-h-[100px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center h-full">
          <Image
            src={logoWhite}
            alt="white logo"
            className="h-[75px] aspect-square w-auto"
            width={200}
            height={200}
            priority={true}
          />
        </div>
        <div className="w-[80%] border border-pearl border-opacity-40"></div>
      </div>
      <div className="w-full h-[82%] min-h-[150px] py-5  overflow-hidden flex flex-col items-center">
        {icons.map((option: any, index: number) => (
          <div
            key={index}
            className="w-full h-[60px] flex items-center justify-center"
          >
            {option.route === "/search" ? (
              <button onClick={() => setSearch(!isSearch)}>
                {" "}
                <Image
                  src={option.icon}
                  alt={option.icon}
                  className="opacity-40 hover:opacity-100"
                />{" "}
                <Search isSearch={isSearch} />
              </button>
            ) : (
              <button onClick={(event) => changePage(event, option.route)}>
                {" "}
                <Image
                  src={option.icon}
                  alt={option.icon}
                  className="opacity-40 hover:opacity-100"
                />{" "}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[8%] min-h-[100px] py-2 flex justify-center items-center">
        <div className="w-[70px] h-[70px] rounded-2xl relative flex justify-center items-center">
          <Image
            onClick={handleLogOut}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className={`${
              hovered ? "opacity-10" : "opacity-100"
            } cursor-pointer rounded-2xl`}
            src={data?.profile?.profile?.avatar}
            alt="profile pic"
            width={500}
            height={500}
          />
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

export default SideBar;
