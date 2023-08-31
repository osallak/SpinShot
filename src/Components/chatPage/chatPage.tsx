"use client";
import Image from "next/image";
import logoWhite from "../../../public/logoWhite.svg";
import messagesIcon from "../../../public/messagesIcon.svg";

const Chat = () => {
  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 space-x-3 flex justify-start p-3 items-center flex-row">
      <div className="bg-white/10 h-full rounded-2xl w-[6%] ">
        <div className="w-full h-[10%] flex justify-center space-y-4 items-center flex-col">
          <Image src={logoWhite} alt="white logo" className="w-[60px]" />
          <div className="w-[80%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="bg-white/10 h-full rounded-2xl w-[20%] space-x-3">
        <div className=" flex justify-center items-center flex-col w-full h-[10%] space-y-3">
          <div className=" w-full flex flex-row space-x-3 px-9">
            <Image
              src={messagesIcon}
              alt="message icon"
              className=" h-24 w-10"
            />
            <h1 className="flex justify-center items-center font-Poppins text-pearl text-4xl font-extrabold h-24">
              Messages
            </h1>
          </div>
          <div className="w-[80%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="bg-white/10 h-full rounded-2xl w-full"></div>
    </div>
  );
};

export default Chat;
