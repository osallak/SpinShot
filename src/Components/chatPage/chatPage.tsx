"use client";
import Image from "next/image";
import logoWhite from "../../../public/logoWhite.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import test1 from "../../../public/test1.svg";
import test2 from "../../../public/test2.svg";
import test3 from "../../../public/test3.svg";
import { MouseEvent, useState } from "react";

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

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start p-3 items-center flex-row">
      <div className="bg-white/10 h-full md:flex hidden rounded-2xl overflow-auto w-[140px]">
        <div className="w-full h-[135px] flex justify-center space-y-4 items-center flex-col">
          <Image
            src={logoWhite}
            alt="white logo"
            className="xl:w-[50px] w-[45px]"
          />
          <div className="w-[80%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="bg-white/10 h-full md:flex flex-col hidden rounded-2xl w-[570px] min:w-[570px] space-y-8">
        <div className="flex justify-center items-center flex-col w-full h-[10%] space-y-3">
          <div className="w-full flex space-y-4 h-[135px] flex-col px-6">
            <div className="w-full flex flex-row space-x-3 xl:h-[96px] h-[92px]">
              <Image
                src={messagesIcon}
                alt="message icon"
                className=" h-full xl:w-10 w-9"
              />
              <h1 className="flex justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
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
        <div className="w-full xl:px-6 px-2 overflow-auto h-[800px]">
          {data.map((data, index) => (
            <button
              onClick={(event) => clickChat(event, index)}
              key={index}
              className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center flex-row rounded-2xl ${
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
      </div>
      <div className="bg-white/10 h-full rounded-2xl w-full"></div>
    </div>
  );
};

export default Chat;
