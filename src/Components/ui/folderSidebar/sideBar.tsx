import logoWhite from "../../../../public/logoWhite.svg";
import Image from "next/image";
import search from "../../../../public/search.svg";
import friend from "../../../../public/friend.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import notification from "../../../../public/notification.svg";
import test1 from "../../../../public/test1.svg";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import Search from "@/Components/search/userSearch";
// import logout from "../../../../public/logout.svg"

const SideBar = () => {
  const Router = useRouter()
  const [hovered, setHovered] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const Icons = [
    { icon: search, route: "/Search" },
    { icon: profile, route: "/profile" },
    { icon: message, route: "/Messages" },
    { icon: friend, route: "/Friends" },
    { icon: game, route: "/Game" },
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
    console.log("logout");
  }


  return (
    <div className={`bg-white/10 rounded-2xl h-full md:flex flex-col hidden lg:w-[140px] w-[100px] lg:max-w-[100px] min-w-[80px] `}>
      <div className="w-full h-[10%] min-h-[100px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center h-full">
          <Image src={logoWhite} alt="white logo" className="h-[120px]" />
        </div>
        <div className="w-[80%] border border-pearl border-opacity-40"></div>
      </div>
      <div className="w-full h-[82%] min-h-[150px] py-5  overflow-hidden flex flex-col items-center">
        {Icons.map((option, index) => (
          <div
            key={index}
            className="w-full h-[60px] flex items-center justify-center opacity-40 hover:opacity-100"
          >
            {option.route != "/Search" ? (
              <button onClick={(event) => changePage(event, option.route)}>
                {" "}
                <Image src={option.icon} alt={option.icon} />{" "}
              </button>
            ) : (
              <button onClick={() => setSearch(!isSearch)}>
                {" "}
                <Search isSearch={isSearch}/> 
                <Image src={option.icon} alt="" />{" "}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[8%] min-h-[100px] py-2 flex justify-center items-center relative">
        <Image onClick={handleLogOut} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} className={`${hovered ? "opacity-10" : "opacity-100"} cursor-pointer`} src={test1} alt="test1" />
        {/* {hovered && <Image onClick={handleLogOut} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} src={logout} alt="logout" className="absolute cursor-pointer" />} */}
      </div>
    </div>
  );
};

export default SideBar;
