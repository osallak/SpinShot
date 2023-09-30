import Image from "next/image";
import test1 from "../../../public/test1.svg";
import EmptyButton from "../ui/Buttons/EmptyButton";
import SimpleButton from "../ui/Buttons/SimpleButton";
import { MouseEvent } from "react";
import { motion } from "framer-motion";
import Example from "../ui/dropDown/menu";

const FriendsRequest = () => {
  const array = [
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "TeeJee",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "SKNAHS",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "FRAG33R",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "/API",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "l3zawa",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "Navoos",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "PonPon",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
    {
      icon: test1,
      email: "tajiayoub35@gmail.com",
      name: "MAR1",
    },
  ];

  const handleClick = () => {
    console.log("hello world from the other side");
  };

  const menu = [
    { content: "Accept", click: handleClick },
    { content: "Refuse", click: handleClick },
  ];

  return (
    <div className="w-[50%] h-full rounded-2xl bg-white/10 md:flex hidden justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[100px]">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full  pt-5 flex flex-row space-x-3 h-full"></div>
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="w-[85%] h-[10%] min-h-[60px] flex-col">
        <h1 className="flex justify-start items-center font-Poppins text-pearl lg:text-3xl md:text-2xl text-xl font-bold h-full">
          7 Friend Requests
        </h1>
      </div>
      <div className="h-[80%] flex flex-col items-center min-h-[150px] w-[95%] overflow-auto">
        {array.map((items, index) => (
          <div key={index} className="w-full h-[90px] min-h-[80px]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[50%] h-full flex justify-start items-center space-x-2">
                <Image
                  src={items.icon}
                  alt="avatar"
                  className="xl:w-16 md:w-14 w-10"
                />
                <div className="h-[70%] flex justify-center flex-col">
                  <p className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base">
                    {items.name}
                  </p>
                  <p className="font-Poppins text-pearl text-opacity-40 font-normal xl:text-base md:text-sm text-xs">
                    {items.email}
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-full flex justify-end items-center xl:space-x-3 md:space-x-2 space-x-1 xl:pr-3 pr-1">
                <Example data={menu} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsRequest;
