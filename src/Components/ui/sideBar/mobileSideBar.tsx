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

const MobileSideBar = () => {
  const Router = useRouter();
  const Icons = [
    { icon: search, route: "/Search" },
    { icon: profile, route: "/Profile" },
    { icon: message, route: "/Messages" },
    { icon: friend, route: "/Friends" },
    { icon: game, route: "/Game" },
  ];

  const changePage = (event: MouseEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault();
    Router.push(path);
  };

  return (
    <div className="h-full flex justify-center items-center md:hidden w-[70px] min-w-[50px] py-2 pl-2">
      <div
        className={`bg-white/10 rounded-2xl h-full flex flex-col md:hidden w-full`}
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
              {option.route != "/search" && option.route != "/notification" ? (
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
          <Image src={test1} alt="test1" className="w-9" />
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
