"use client";
import Image from "next/image";
import logoWhite from "../../../public/logoWhite.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import test1 from "../../../public/test1.svg";
import test2 from "../../../public/test2.svg";
import test3 from "../../../public/test3.svg";
import { MouseEvent, useState } from "react";
import SideBar from "@/Components/ui/sideBar/sideBar";
import IconButton from "../ui/Buttons/IconButton";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import friend from "../../../public/friend.svg";
import notification from "../../../public/notification.svg";
import search from "../../../public/search.svg";
import message from "../../../public/message.svg";
import profile from "../../../public/profile.svg";
import game from "../../../public/game.svg";

const Chat = () => {
  const [clicked, setClicked] = useState<number>();
  const [readed, setReaded] = useState(false);
  const [id, setId] = useState("");
  var divId = 0;
  const data = [
    {
      icon: test1,
      username: "Navoos",
      message: "You: hello!",
      readed: readed,
      // me: true,
      id: JSON.stringify(divId),
    },
    {
      icon: test2,
      username: "Ael-jack",
      message: "you are a great man",
      readed: readed,
      // me: false,
      id: JSON.stringify(divId),
    },
    {
      icon: test3,
      username: "Zoulikha",
      message: "can you help me please",
      readed: readed,
      // me: false,
      id: JSON.stringify(divId),
    },
    {
      icon: test1,
      username: "FRAG33R",
      message: "anaaa ghadi ldar",
      readed: readed,
    },
    {
      icon: test1,
      username: "sknahs",
      message: "time to paint the tape",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "MarOne",
      message: "la na7tajo lmala",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
    {
      icon: test1,
      username: "/API",
      message: "oki by",
      readed: readed,
    },
  ];

  const Icons = [
    { icon: search, route: "/search" },
    { icon: profile, route: "/profile" },
    { icon: message, route: "/message" },
    { icon: friend, route: "/friend" },
    { icon: game, route: "/game" },
    { icon: notification, route: "/notification" },
  ];

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const Channel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("hello world from the other side");
  };

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start p-3 items-center flex-row">
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
        <div className="w-full h-[100px] py-2 flex justify-center items-center">
          <Image src={test1} alt="test1" />
        </div>
      </div>
      <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl xl:w-[570px] lg:w-[400px] w-[300px] space-y-8">
        <div className="flex justify-center items-center flex-col w-full h-[130px]">
          <div className="w-full h-[130px] flex-col px-6">
            <div className="w-full  pt-5 flex flex-row space-x-3 h-[130px]">
              <Image
                src={messagesIcon}
                alt="message icon"
                className=" h-full xl:w-10 w-9"
              />
              <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
                Messages
              </h1>
            </div>
            <div className="w-full border border-pearl border-opacity-40"></div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-[90%] h-[45px] rounded-full">
            <SearchInput />
          </div>
        </div>
        <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-[900px] min-h-[100px]">
          {data.map((data, index) => (
            <button
              onClick={(event) => clickChat(event, index)}
              key={index}
              className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                clicked == index ? "bg-very-dark-purple" : "bg-transparent"
              }`}
            >
              <Image src={data.icon} alt="test" />
              <div className="flex justify-start items-start space-y-1 flex-col">
                <p className="font-poppins flex justify-start text-pearl text-lg font-semibold">
                  {data.username}
                </p>
                <p
                  className={`font-poopins text-pearl flex justify-start text-sm font-medium ${
                    !data.readed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  {data.message}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center items-end w-full py-5 h-[100px]">
          <div className="w-1/2 h-10 pl-5 pr-2 flex justify-center items-center">
            <IconButton
              icon={CreateChannel}
              content="Create channel"
              onclick={Channel}
            />
          </div>
          <div className="w-1/2 h-10 pr-5 pl-2 flex justify-center items-center">
            <IconButton
              icon={ExportChannels}
              content="Export channel"
              onclick={Channel}
            />
          </div>
        </div>
      </div>
      <div className="bg-white/10 h-full rounded-2xl w-full">
        <div className="w-full h-[132px] flex justify-center flex-col items-center">
          <div className="h-full px-20 flex items-center space-x-3 w-full">
            <Image src={test1} alt="test1" />
            <div className="flex flex-col">
              <p className="font-Poppins text-xl text-pearl font-semibold ">Navoos</p>
              <p className="font-Poppins text-lg text-pearl text-opacity-40 font-thin ">Online</p>
            </div>
          </div>
          <div className="w-[95%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
