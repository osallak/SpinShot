import Image from "next/image";
import messagesIcon from "../../../public/messagesIcon.svg";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import test1 from "../../../public/test1.svg";
import test2 from "../../../public/test2.svg";
import test3 from "../../../public/test3.svg";
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  useCallback,
} from "react";
import IconButton from "../ui/Buttons/IconButton";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";

function SubSideBar() {
  const [readed, setReaded] = useState(false);
  const [clicked, setClicked] = useState<number>();
  var divId = 0;
  const data = [
    {
      icon: test1,
      username: "Navoos",
      message: "You: hello!",
      readed,
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
    <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl w-[25%] min-w-[350px] space-y-8">
      <div className="flex justify-center items-center flex-col w-full h-[130px] border">
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
      <div className="w-full flex justify-center border items-center">
        <div className="w-[90%] h-[45px] rounded-full">
          <SearchInput />
        </div>
      </div>
      <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-full min-h-[100px] border">
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
      <div className="flex justify-around items-center w-full border border-red-500 h-[200px]">
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={CreateChannel}
            content="Create channel"
            onclick={Channel}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={ExportChannels}
            content="Export channel"
            onclick={Channel}
          />
        </div>
      </div>
    </div>
  );
}

export default SubSideBar;
