import logoWhite from "../../../../public/logoWhite.svg";
import Image from "next/image";
import search from "../../../../public/search.svg";
import friend from "../../../../public/friend.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import notification from "../../../../public/notification.svg";
import test1 from "../../../../public/test1.svg";
import { MouseEvent } from "react";
import { useRouter } from "next/router";

const SideBar = () => {
  const Router = useRouter()
  const Icons = [
    { icon: search, route: "/search" },
    { icon: profile, route: "/profile" },
    { icon: message, route: "/messages" },
    { icon: friend, route: "/friends" },
    { icon: game, route: "/game" },
    { icon: notification, route: "/notification" },
  ];

  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault();
    Router.push(path);
  };

  return (
    <div className="bg-white/10 rounded-2xl h-full md:flex flex-col hidden lg:w-[140px] w-[100px] lg:max-w-[100px] min-w-[80px]">
      <div className="w-full h-[132px] min-h-[132px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center h-full">
          <Image src={logoWhite} alt="white logo" className="h-[120px]" />
        </div>
        <div className="w-[80%] border border-pearl border-opacity-40"></div>
      </div>
      <div className="w-full h-[1098px] py-5 min-h-[200px] overflow-hidden flex flex-col items-center">
        {Icons.map((option, index) => (
          <div
            key={index}
            className="w-full h-[60px] flex items-center justify-center opacity-40 hover:opacity-100 "
          >
            {option.route != "/search" && option.route != "/notification" ? (
              <button onClick={(event) => changePage(event, option.route)}>
                {" "}
                <Image src={option.icon} alt="" />{" "}
              </button>
            ) : (
              <button>
                {" "}
                <Image src={option.icon} alt="" />{" "}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[100px] py-2 flex justify-center items-center">
        <Image src={test1} alt="test1" />
      </div>
    </div>
  );
};

export default SideBar;
