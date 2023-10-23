"use client";
import logoWhite from "../../../../public/logoWhite.svg";
import Image from "next/image";
import search from "../../../../public/search.svg";
import friend from "../../../../public/friend.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import test1 from "../../../../public/test1.svg";
import logout from "../../../../public/logout.svg";
import { MouseEvent, useEffect, useState } from "react";
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../redux_tool";
import Search from "@/Components/search/userSearch";

const SideBar = (props:any) => {
  const Router = useRouter();
  const data = useAppSelector((state) => (state.Profile))
  const [hovered, setHovered] = useState(false);
  const [isSearch, setSearch] = useState(false);

  const [icons, setIcons] = useState<any[]>([]);

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
    { icon: game, route: `/game/${parseJwt(JSON.stringify(localStorage.getItem("token"))).sub}` },
    ])
  }, [])

  return (
    <div
      className={`bg-white/10 rounded-2xl h-full md:flex flex-col hidden lg:w-[140px] w-[100px] lg:max-w-[100px] min-w-[80px] `}
    >
      <div className="w-full h-[10%] min-h-[100px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center h-full">
          <Image src={logoWhite} alt="white logo" className="h-[75px] aspect-square w-auto" width={200} height={200} priority={true}/>
        </div>
        <div className="w-[80%] border border-pearl border-opacity-40"></div>
      </div>
      <div className="w-full h-[82%] min-h-[150px] py-5  overflow-hidden flex flex-col items-center">
        {icons.map((option, index) => (
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
                <Search isSearch={isSearch} setId={props.setId}/>
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
          <picture>

        <img
          onClick={handleLogOut}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          className={`${hovered ? "opacity-10" : "opacity-100"} cursor-pointer rounded-2xl`}
          src={data?.profile?.profile?.avatar}
          alt="profile pic"
          width={500}
          height={500}
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

export default SideBar;
