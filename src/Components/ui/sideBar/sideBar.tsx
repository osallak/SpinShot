import logoWhite from "../../../../public/logoWhite.svg";
import Image from "next/image";
import friend from "../../../../public/friend.svg";
import notification from "../../../../public/notification.svg";
import search from "../../../../public/search.svg";
import message from "../../../../public/message.svg";
import profile from "../../../../public/profile.svg";
import game from "../../../../public/game.svg";
import test1 from "../../../../public/test1.svg";

const SideBar = () => {
  const Icons = [
    { icon: search, route: "/search" },
    { icon: profile, route: "/profile" },
    { icon: message, route: "/message" },
    { icon: friend, route: "/friend" },
    { icon: game, route: "/game" },
    { icon: notification, route: "/notification" },
  ];

  return (
    <div className="w-full h-full border">
      <div className="w-full border h-[132px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center h-full">
          <Image src={logoWhite} alt="white logo" className="h-[120px]" />
        </div>
        <div className="w-[80%] border border-pearl border-opacity-40"></div>
      </div>
      <div className="w-full h-[800px] min-h-[300px] overflow-auto border border-green-500 flex flex-col items-center">
        {Icons.map((option, index) => (
          <div
            key={index}
            className="w-full h-[8%] flex items-center justify-center opacity-40 hover:opacity-100 "
          >
            {option.route != "/search" && option.route != "/notification" ? (
              <button>
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
      <div className="w-full h-[100px] border flex justify-center border-blue-500 items-center">
        <Image src={test1} alt="test1" />
      </div>
    </div>
  );
};

export default SideBar;
