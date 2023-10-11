"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import game from "../../../public/game.svg";
import sendMessageIcon from "../../../public/sendMessage.svg";
import test1 from "../../../public/test1.svg";
import trash from "../../../public/trash.svg";
import DropDown from "../ui/FolderDropDown/Dropdown";
import dataConversation from "@/types/messagesArrays";
import { io } from "socket.io-client";

const Conversation = (props: {
  data: dataConversation[];
  userName: string;
  userId: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentMsg, setCurrentMsg] = useState("");
  const Router = useRouter();
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(undefined);
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const [test, setTest] = useState<string>("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    console.log("hello world from the other side");
  };

  const dropDownContent = [
    { content: "Delete Conversation", click: handleClick, icon: trash },
    { content: "Let't Play", click: handleClick, icon: game },
  ];

  // const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCurrentMessage(event.target.value);
  // };

  // function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
  //   if (event.key === "Enter") {
  //     handleSendMessage(event);
  //   }
  // }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const conversationDiv: any = chatContainerRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [chatHistory.length]);

  // const sendMessage = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setMessageContent(currentMessage);
  //   console.log("Message Content : ", messageContent);
  // }

  interface IMsgDataTypes {
    from: string;
    to: string;
    content: string;
    timestamp: string;
  }

  console.log("data from subsidebar to conversation: ", props.data);

  // const handleSendMessage = (
  //   event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  //   ) => {
  //     event.preventDefault();
  //     if (message.trim() !== "") {
  //       socket.on("connect", () => {
  //         console.log("socket connected successfuly");
  //         const messageData: IMsgDataTypes = {
  //           from: "ataji",
  //           to: "username3",
  //           content: currentMsg,
  //           timestamp: String(Date.now()),
  //         };
  //         setConnected(true);
  //         socket.emit("pm", messageData);
  //       });
  //       socket.on("disconnect", (data: any) => console.log("disconnected"));
  //       socket.on("pm", (data: any) => console.log("the response from the server socket: ", data));
  //       socket.on("exception", (data: any) => console.log("exception: ", data));
  //     setMessage("");
  //   }
  // };

  // useEffect(() => {
  //   const socket = io("ws://e3r10p14.1337.ma:3001", {
  //     extraHeaders: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMSIsInN1YiI6IjMxYTQwM2M3LTM4NjItNDI0My1iNjZlLThkYjRlMzg1OWZjNSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk2NTg3ODA1LCJleHAiOjE2OTY2NzQyMDV9.MW1zUeCPwYBMqt5IFhuHTNEXtILwciQFpnigZoHN_tQ`,
  //     },
  //   });
  //   setSocket(socket);
  // });

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

  return (
    <div className="w-full md:h-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2">
      {/* <div className="bg-white/10 h-full sm:rounded-2xl rounded-xl w-full flex justify-center items-center flex-col">
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[70px] flex md:justify-center justify-between flex-col items-center pt-3">
          <div className="md:h-full flex items-center justify-between w-[90%]">
            <div className="flex justify-center items-center space-x-2 flex-row">
              <Image
                src={test1}
                alt="test1"
                className="lg:w-16 md:w-14 sm:w-12 w-10"
              />
              <div className="flex flex-col">
                <p className="font-Poppins md:text-xl sm:text-md text-sm text-pearl font-semibold">
                  {props.userName}
                </p>
                <p className="font-Poppins md:text-lg sm:text-sm text-xs text-pearl text-opacity-40 font-thin">
                  Online
                </p>
              </div>
            </div>
            <DropDown data={dropDownContent} />
          </div>
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
        </div>
        {props.data.length ? (
          <div
            ref={chatContainerRef}
            className={`w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden `}
          >
            <div className="w-[94%] space-y-1">
              {props.data.map((items, index) => (
                <div
                  key={index}
                  className={`flex ${
                    items.sender != props.userId
                      ? "flex-row-reverse space-x-reverse space-x-5"
                      : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
                  } justify-end`}
                >
                  <div
                    className={`bg-transparent x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] flex ${
                      items.sender != props.userId ? "items-start" : "items-end"
                    } flex-col md:space-y-1 space-y-0`}
                  >
                    <div
                      className={`font-Poppins text-pearl md:text-base sm:text-sm text-xs sm:h-5 h-4 flex justify-center items-center ${
                        items.sender != props.userId
                          ? "flex-row space-x-2"
                          : "flex-row-reverse space-x-reverse space-x-2"
                      }`}
                    >
                      <span>
                        {items.sender != props.userId ? props.userName : "you"}
                      </span>
                      <span className="text-[10px] font-light h-full text-pearl text-opacity-40">
                        {items.sentAt}
                      </span>
                    </div>
                    <div
                      className={`${
                        items.sender != props.userId
                          ? "rounded-r-2xl rounded-bl-2xl bg-peridot text-very-dark-purple"
                          : "rounded-l-2xl rounded-br-2xl bg-very-dark-purple text-pearl"
                      } md:p-2 p-1 px-3 font-Sarabun md:text-base sm:text-sm text-xs flex justify-center items-center`}
                    >
                      {items.message}
                    </div>
                  </div>
                  <div>
                    <Image
                      src={test1}
                      alt="test1"
                      className="lg:w-16 md:w-14 sm:w-12 w-8"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
            No chat Messages
          </div>
        )}
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[60px] flex justify-center items-center flex-col">
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
          <div className="w-[90%] h-full flex justify-center items-center flex-row">
            <div className="w-full md:h-14 sm:h-10 h-8 flex justify-center items-center pr-5 md:pl-10 sm:pl-8 pl-6 space-x-2 bg-very-dark-purple rounded-full">
              <div className="w-full h-full flex justify-center items-center">
                <input
                  ref={emailInput}
                  placeholder="Type a message"
                  className="text-pearl caret-peridot w-full h-full outline-none placeholder:text-pearl font-light placeholder:opacity-50 font-Poppins md:text-lg sm:text-md text-sm bg-transparent"
                  type="text"
                  onKeyDown={handleKeyPress}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              <button onClick={(event) => {
								// handleSendMessage(event);
							}}>
                <Image
                  src={sendMessageIcon}
                  alt="send Message Input"
                  className="md:w-10 sm:w-8 w-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Conversation;
