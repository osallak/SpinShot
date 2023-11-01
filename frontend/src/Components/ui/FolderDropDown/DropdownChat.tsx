import chatMenu from "../../../../public/chatmenu.svg";
import React, { useState } from "react";
import Image from "next/image";
import flechIcon from "../../../../public/flechIcon.svg";
import { ArrayChat } from "./ArrayIcon";
import { ArrayMute } from "./ArrayIcon";
import { select } from "@material-tailwind/react";
import { Divider } from "@nextui-org/react";

const DropdownChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChild, setIsOpenChild] = useState(false);
  const down = () => {
    setIsOpen(!isOpen);
    setIsOpenChild(false);
  };

  return (
    <div className=" font-sans box-border  inline-block">
      <div className=" bg-cover flex justify-start relativ">
        <button
          className="py-2 px-4  bg-very-dark-purple  cursor-pointer rounded-md"
          onClick={down}
        >
          <Image src={chatMenu} alt="" />
        </button>
        {isOpen && (
          <div className="p-4 absolute my-11 mx-8 w-65 bg-very-dark-purple  rounded-r-[20px] rounded-b-[20px]">
            {" "}
            {ArrayChat.map((option, index) => (
              <div key={index} className={`px-4 py-2 divide-y-4`}>
                <button className=" flex justify-row  text-pearl opacity-40 hover:opacity-100">
                  <div className="pr-4">
                    <picture>
                    <img src={option.icon} alt="" />
                    </picture>
                  </div>
                  <span> {option.name} </span>
                  <div
                    className="absolute right-[12px]"
                    onClick={() => setIsOpenChild(!isOpenChild)}
                  >
                    {option.name === "Mute" ? (
                      <Image src={flechIcon} alt="flech" />
                    ) : (
                      ""
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {isOpenChild && (
          <div className=" py-[120px] px-[250px]">
            <div className="bg-very-dark-purple pt-[6px] pb-[6px] w-[230px]=====\\\\\\\\\\rounded-r-[20px] rounded-b-[20px]">
              {" "}
              {ArrayMute.map((option, index) => (
                <div
                  key={index}
                  className="px-[40px] py-1 pr-[13] opacity-40 text-pearl hover:opacity-100 "
                >
                  <button className="">{option.name}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownChat;
