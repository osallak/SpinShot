"use client";
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
import SideBar from "@/Components/ui/sideBar/sideBar";
import IconButton from "../ui/Buttons/IconButton";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import sendMessageIcon from "../../../public/sendMessage.svg";
import { DropDown } from "../ui/dropDown/dropDown";
import { useRouter } from "next/router";
import io from "Socket.IO-client";

interface IMsgDataTypes {
  user: string;
  msg: string;
  time: string;
}

const Chat = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState<number>();
  const [messageContent, setMessageContent] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [readed, setReaded] = useState(false);
  const [id, setId] = useState("");
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  var divId = 0;
  const user = "You";
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

  const handleSendMessage = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, message]);
      setMessage("");
    }
  };

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const Channel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("hello world from the other side");
  };

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentMessage(event.target.value);
  };

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      console.log("hello world!")
      handleSendMessage(event);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const conversationDiv : any = chatContainerRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [chatHistory.length]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      event.preventDefault(); // Prevent the "/" key from being typed into the input
      if (event.key === '/') {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', event => handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  const emailInput = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  // const sendMessage = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setMessageContent(currentMessage);
  //   console.log("Message Content : " + messageContent);
  // }

  // const socket = io("e3r10p14.1337.ma:8001");

  // const sendData = async (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (currentMsg !== "") {
  //     const msgData: IMsgDataTypes = {
  //       user: "ataji",
  //       msg: currentMsg,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };
  //     await socket.emit("send_msg", msgData);
  //     setCurrentMsg("");
  //   }
  // };

  // const socketInitializer = () => {
  //   socket.on("receive_msg", () => {
  //     console.log("socket connected");
  //   });
  // };

  // useEffect(() => socketInitializer(), []);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start p-3 items-center flex-row">
      <SideBar />
      <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl xl:w-[570px] w-[350px] space-y-8">
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
      <div className="bg-white/10 h-full rounded-2xl w-full flex justify-between items-center flex-col">
        {/* <div className="h-[100px] w-full border bg-white/10 border-red-500"></div> */}
        <div className="w-full md:h-[132px] h-[100px] flex justify-center flex-col items-center">
          <div className="md:h-[132px] h-[100px] xl:px-20 md:px-10 sm:px-7 px-4 flex items-center justify-between space-x-3 w-full">
            <div className="flex justify-center items-center space-x-2 flex-row">
              <Image src={test1} alt="test1" className="md:w-[65px] w-[50px]" />
              <div className="flex flex-col">
                <p className="font-Poppins md:text-xl text-md text-pearl font-semibold">
                  Navoos
                </p>
                <p className="font-Poppins md:text-lg text-sm text-pearl text-opacity-40 font-thin">
                  Online
                </p>
              </div>
            </div>
            <DropDown />
          </div>
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
        </div>
        <div ref={chatContainerRef} className="w-[99%] p-16 chat chat-end flex flex-col scroll-smooth bg-black h-full min-h-[100px] space-y-1 hover:overflow-auto overflow-hidden scroll-absolute">
          {chatHistory.map((msg, index) => (
            <div key={index} className="w-[700px] bg-red-400 flex flex-row space-x-2 justify-end">
              <div className="bg-transparent w-[500px] flex justify-center items-end flex-col">
                <div>{user}</div>
                <div className="bg-very-dark-purple rounded-l-2xl rounded-br-2xl pl-5 p-3 font-Sarabun text-pearl">
                  {msg}
                </div>
              </div>
              <div>
                <Image src={test1} alt="test1" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:h-[132px] h-[100px] flex justify-start items-center flex-col space-y-7">
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
          <div className="pr-5 pl-10 space-x-2 bg-very-dark-purple rounded-full w-[90%] lg:h-14 md:h-10 h-8 flex justify-center items-center flex-row">
            <div className="w-full h-14">
              <input
                ref={emailInput}
                placeholder="Type a message"
                className="text-pearl caret-peridot w-full h-14 outline-none placeholder:text-pearl font-light placeholder:opacity-50 font-Poppins text-lg bg-transparent"
                type="text"
                onKeyDown={handleKeyPress}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button onClick={event => handleSendMessage(event)}>
              <Image
                src={sendMessageIcon}
                alt="send Message Input"
                className="w-10"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
