"use client";
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
import Search from "@/Components/search/userSearch";

const MobileSideBar = (props: {
  setOpenSubSideBar?: Function;
  openSubSideBar?: boolean;
  flag: string;
}) => {
  const Router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [icons, setIcons] = useState<any>([]);
  const data = useAppSelector((state) => state.Profile);
  const dispatch = useAppDispatch();
  const [isSearch, setSearch] = useState(false);

  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault();
    const page = path.split("/");
    if (props.openSubSideBar || props.flag !== page[1]) Router.push(path);
    else {
      if (props.setOpenSubSideBar)
        props.setOpenSubSideBar(true);
    }
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
      { icon: game, route: "/game" },
    ]);
  }, []);

  const dis = async () => {
    const sub = parseJwt(JSON.stringify(localStorage.getItem("token"))).sub;
    try {
      await dispatch(getProfile(sub));
    } catch (error: any) {}
  };

  useEffect(() => {
    dis();
  }, []);

  return (
    <div className="h-full flex justify-center items-center md:hidden w-[70px] min-w-[50px] py-2 pl-2">
      <div
        className={`bg-white/10 rounded-xl h-full flex flex-col md:hidden w-full`}
      >
        <div className="w-full h-[10%] min-h-[70px] flex justify-center items-center flex-col">
          <div className="flex justify-center items-center h-full">
            <Image src={logoWhite} alt="white logo" className="h-[50px]" />
          </div>
          <div className="w-[80%] border border-pearl border-opacity-40"></div>
        </div>
        <div className="w-full h-[84%] min-h-[100px] py-5  overflow-hidden flex flex-col items-center">
          {icons.map((option: any, index: number) => (
            <div
              key={index}
              className="w-full h-[40px] flex items-center justify-center opacity-40 hover:opacity-100"
            >
              {option.route === "/search" ? (
                <button onClick={() => setSearch(!isSearch)}>
                  {" "}
                  <Image src={option.icon} alt="" className="w-5" />{" "}
				  <Search isSearch={isSearch} />
                </button>
              ) : (
                <button onClick={(event) => (changePage(event, option.route))}>
                  {" "}
                  <Image src={option.icon} alt="" className="w-5" />{" "}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="w-full h-[6%] min-h-[60px] py-2 flex justify-center items-center">
          <div className="h-[55px] w-[45px] py-2 flex justify-center items-center">
            <Image
              onClick={handleLogOut}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
              src={data?.profile?.profile?.avatar}
              width={500}
              height={500}
              alt="test1"
              className={`rounded-xl w-full h-full ${
                hovered ? "opacity-10" : "opacity-100"
              }`}
            />
            {hovered && (
              <Image
                onClick={handleLogOut}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
                src={logout}
                alt="logout"
                className="absolute cursor-pointer w-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
