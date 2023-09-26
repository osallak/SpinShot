import { Select, Option } from "@material-tailwind/react";
import threePoint from "../../../../public/threePoint.svg";
import game from "../../../../public/game.svg";
import trash from "../../../../public/trash.svg";
import add from "../../../../public/add.svg";
import Image from "next/image";
import { useState, MouseEvent } from "react";

export default function DropDown() {
  const [isOpen, setOpen] = useState(false);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!isOpen);
  };
  const dropdown = [
    {
      icon: add,
      content: "Add",
    },
    {
      icon: trash,
      content: "Delete conversation",
    },
    {
      icon: game,
      content: "Let's play",
    },
  ];
  return (
    <div>
      <button
        className="inline-flex h-10 items-center text-center focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        <Image src={threePoint} alt="threepoint"></Image>
      </button>
      {isOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="z-10 md:p-3 sm:p-2 p-1 right-0 xl:mr-[115px] md:mr-[75px] mr-[45px] bg-very-dark-purple absolute rounded-l-2xl rounded-b-2xl md:w-[230px] w-[170px]"
        >
          {dropdown.map((content, index) => (
            <button
              key={index}
              className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-sm font-Passion-One"
            >
              <Image src={content.icon} alt="add" className="md:w-[26px] w-[20px]"/>
              <span>{content.content}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
