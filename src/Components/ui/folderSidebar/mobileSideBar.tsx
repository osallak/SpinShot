import logoWhite from "../../../../public/logoWhite.svg";
import Image from "next/image";
import search from "../../../../public/search.svg";
import friend from "../../../../public/friend.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import test1 from "../../../../public/test1.svg";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import logout from "../../../../public/logout.svg"

const MobileSideBar = () => {
  const Router = useRouter();
  const [hovered, setHovered] = useState(false);
  const Icons = [
    { icon: search, route: "/search" },
    { icon: profile, route: "/profile" },
    { icon: message, route: "/messages" },
    { icon: friend, route: "/friends" },
    { icon: game, route: "/game" },
  ];

  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault();
    Router.push(path);
  };

  const handleHover = () => {
    setHovered(true);
  }
  const handleHoverOut = () => {
    setHovered(false);
  }

  const handleLogOut = () => {
    if (localStorage.getItem("token"))
      localStorage.removeItem("token");
    Router.push("/signin");
  }

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
          {Icons.map((option, index) => (
            <div
              key={index}
              className="w-full h-[40px] flex items-center justify-center opacity-40 hover:opacity-100"
            >
              {option.route != "/Search" ? (
                <button onClick={(event) => changePage(event, option.route)}>
                  {" "}
                  <Image src={option.icon} alt="" className="w-5" />{" "}
                </button>
              ) : (
                <button>
                  {" "}
                  <Image src={option.icon} alt="" className="w-5" />{" "}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="w-full h-[6%] min-h-[60px] py-2 flex justify-center items-center">
          <Image onClick={handleLogOut} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} src={test1} alt="test1" className={`w-9 ${hovered ? "opacity-10" : "opacity-100"}`} />
          {hovered && <Image onClick={handleLogOut} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} src={logout} alt="logout" className="absolute cursor-pointer w-4" />}
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
