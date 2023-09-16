"use client";
import Image from "next/image";
import test1 from "../../../public/test1.svg";
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
import sendMessageIcon from "../../../public/sendMessage.svg";
import { DropDown } from "../ui/dropDown/dropDown";
import { useRouter } from "next/router";
import io from "Socket.IO-client";
import SubSideBar from "./subSideBar";

const Chat = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const user = "You";
  const msg = [
    {
      message: "hey",
      sender: "owner"
    },
    {
      message: "what's up impmport sendMessageIcogeIcon from import sendMessageIcon ort sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
    {
      message: "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
    {
      message: "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
    {
      message: "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
    {
      message: "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
    {
      message: "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver"
    },
    {
      message: "what do you doing",
      sender: "owner"
    },
  ]

  const handleSendMessage = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, message]);
      setMessage("");
    }
  };

  // const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCurrentMessage(event.target.value);
  // };

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      console.log("hello world!");
      handleSendMessage(event);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const conversationDiv: any = chatContainerRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [chatHistory.length]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      event.preventDefault(); // Prevent the "/" key from being typed into the input
      if (event.key === "/") {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", (event) => handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
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
  //   console.log("Message Content : ", messageContent);
  // }

  // const socketInitializer = () => {
  //   const socket = io("e3r10p14.1337.ma:8001", {
  //     extraHeaders: {
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdm9vcyIsInN1YiI6IjQ4YTRkNDI2LWZiMjEtNDE5NC04ZWQ2LTZiZjRhY2Y0M2I1NSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk0ODA4OTM1LCJleHAiOjE2OTQ4OTUzMzV9.zsDFfyE2t1gLbQ9DDAJr92X88pegk7fOCt93rM2BH9A`,
  //     },
  //   });
  //   console.log("socket: ", socket);
  //   socket.on("connect", () => {
  //     const msgData: IMsgDataTypes = {
  //       user: "ataji",
  //       msg: "hello",
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };
  //     console.log("socket connected");
  //     socket.emit("hello", msgData);
  //   });
  //   socket.on("hello", (data) => console.log("here: ", data));
  // };

  // useEffect(() => socketInitializer(), []);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start p-3 items-center flex-row">
      <SideBar />
      <SubSideBar />
      <div className="bg-white/10 h-full rounded-2xl w-full flex justify-between items-center flex-col">
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
        <div
          ref={chatContainerRef}
          className={`w-[99%] 2xl:px-16 xl:px-14 lg:px-12 md:px-5 px-2 py-8 flex flex-col scroll-smooth h-full min-h-[100px] space-y-1 hover:overflow-auto overflow-hidden scroll-absolute`}
        >
          {msg.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender == "receiver" ? "flex-row-reverse space-x-reverse space-x-5" : "flex-row md:space-x-5 sm:space-x-3 space-x-1"} justify-end`}
            >
              <div className={`bg-transparent 2xl:w-[700px] xl:w-[600px] lg:w-[500px] md:w-[400px] w-[80%] flex ${msg.sender == "receiver" ? "items-start" : "items-end"} flex-col space-y-1`}>
                <div className="font-Poppins text-pearl">{user}</div>
                <div className={`${msg.sender == "receiver" ? "rounded-r-2xl rounded-bl-2xl bg-peridot text-very-dark-purple" : "rounded-l-2xl rounded-br-2xl bg-very-dark-purple text-pearl"} md:p-2 p-1 px-3 font-Sarabun lg:text-xl md:text-lg sm:text-md text-sm flex justify-center items-center`}>
                  {msg.message}
                </div>
              </div>
              <div>
                <Image src={test1} alt="test1" className="lg:w-16 md:w-14 sm:w-12 w-10" />
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
            <button onClick={(event) => handleSendMessage(event)}>
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
