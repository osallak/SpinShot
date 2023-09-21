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
import axios from "axios";
import io from "Socket.IO-client";
import { headers } from "next/dist/client/components/headers";

const Conversation = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentMsg, setCurrentMsg] = useState("");
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const user = "You";
  const msg = [
    {
      message: "hey",
      sender: "owner",
    },
    {
      message:
        "what's up impmport sendMessageIcogeIcon from import sendMessageIcon ort sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
    {
      message:
        "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
    {
      message:
        "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
    {
      message:
        "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
    {
      message:
        "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
    {
      message:
        "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
      sender: "receiver",
    },
    {
      message: "what do you doing",
      sender: "owner",
    },
  ];

  // const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCurrentMessage(event.target.value);
  // };

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
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
  interface IMsgDataTypes {
    user: String;
    msg: String;
    time: String;
  }

  // const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  // const handleSendMessage = (
  //   event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  //   ) => {
  // const socket = io("e3r10p14.1337.ma:8001", {
  //   extraHeaders: {
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdm9vcyIsInN1YiI6IjQ4YTRkNDI2LWZiMjEtNDE5NC04ZWQ2LTZiZjRhY2Y0M2I1NSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk0ODA4OTM1LCJleHAiOjE2OTQ4OTUzMzV9.zsDFfyE2t1gLbQ9DDAJr92X88pegk7fOCt93rM2BH9A`,
  //   },
  // });
  //     event.preventDefault();
  //     if (message.trim() !== "") {
  //       socket.on("connect", () => {
  //       console.log("socket connected");
  //       const msgData: IMsgDataTypes = {
  //         user: "ataji",
  //         msg: currentMsg,
  //         time:
  //           new Date(Date.now()).getHours() +
  //           ":" +
  //           new Date(Date.now()).getMinutes(),
  //       };
  //       socket.emit("hello", msgData);
  //     });
  //     socket.on("hello", (data: IMsgDataTypes) => {
  //       setChat((pre) => [...pre, data]);
  //     });
  //     console.log("data: ", );
  //     setMessage("");
  //   }
  // };

  // const handleSendMessage = (
  //   event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  // ) => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdm9vcyIsInN1YiI6IjQ4YTRkNDI2LWZiMjEtNDE5NC04ZWQ2LTZiZjRhY2Y0M2I1NSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk0ODA4OTM1LCJleHAiOjE2OTQ4OTUzMzV9.zsDFfyE2t1gLbQ9DDAJr92X88pegk7fOCt93rM2BH9A";
  //   function parseJwt(token: string) {
  //     var base64Url = token.split(".")[1];
  //     var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     var jsonPayload = decodeURIComponent(
  //       window
  //         .atob(base64)
  //         .split("")
  //         .map(function (c) {
  //           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //         })
  //         .join("")
  //     );

  //     return JSON.parse(jsonPayload);
  //   }
  //   const jwtToken = parseJwt(token);

  //   console.log(jwtToken.sub);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const ayoubToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5b3ViIiwic3ViIjoiMTE4NTc5ZTctZGE3Yy00MGExLWI4ZmYtNGVkMjE5MDhkYTE0IiwiaXNzIjoic3BpbnNob3QiLCJpYXQiOjE2OTUyNTE2MTYsImV4cCI6MTY5NTMzODAxNn0.DN5AXkCuE6Sh-ZpubfdY66V-uS-upKFHHG2yioFZoOo";
      const yaakoubToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhYWtvdWIiLCJzdWIiOiI2ZjllNWMxZS1iMTVlLTQ0NDAtOTk5Mi0zMDUxZGVhYzE4MDAiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5NTI1MTcxMiwiZXhwIjoxNjk1MzM4MTEyfQ.UFqT9GT5Xt2iLW-ni9aLao2eXjOFbUJh5vS-NB5FokM"
      function parseJwt(token: string) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
      }
      const jwtToken = parseJwt(ayoubToken);
      const yaakoubjwtToken = parseJwt(yaakoubToken);

      // console.log(jwtToken);
      try {
        const res = await axios.get(
 
          `http://e3r10p14.1337.ma:3000/chat/individual`, {
            headers: {
              Authorization: `Bearer ${ayoubToken}`,
            },
          params: {
            id: jwtToken.sub,
            page: 1,
            limit: 5,
            user: yaakoubjwtToken.sub,
          }}
        );
        // console.log(res.data);
      } catch (error) {
        console.log("error of fetching data: ", error);
      }
    };
    fetchData();
  });
  //   useEffect(() => socketInitializer(), []);
  return (
    <div className="bg-white/10 sm:h-full h-[85%] rounded-2xl w-full flex justify-between items-center flex-col">
      <div className="w-full md:h-[132px] h-[80px] flex justify-center flex-col items-center">
        <div className="md:h-[132px] h-[100px] xl:px-20 md:px-10 sm:px-7 px-4 flex items-center justify-between space-x-3 w-full">
          <div className="flex justify-center items-center space-x-2 flex-row">
            <Image
              src={test1}
              alt="test1"
              className="lg:w-16 md:w-14 sm:w-12 w-10"
            />
            <div className="flex flex-col">
              <p className="font-Poppins md:text-xl sm:text-md text-sm text-pearl font-semibold">
                Navoos
              </p>
              <p className="font-Poppins md:text-lg sm:text-sm text-xs text-pearl text-opacity-40 font-thin">
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
        className={`w-[99.5%] py-8 flex flex-col items-center scroll-smooth h-full min-h-[100px] space-y-1 hover:overflow-auto overflow-hidden `}
      >
        <div className="w-[94%] space-y-1">
          {msg.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender == "receiver"
                  ? "flex-row-reverse space-x-reverse space-x-5"
                  : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
              } justify-end`}
            >
              <div
                className={`bg-transparent x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] flex ${
                  msg.sender == "receiver" ? "items-start" : "items-end"
                } flex-col md:space-y-1 space-y-0`}
              >
                <div className="font-Poppins text-pearl md:text-base sm:text-sm text-xs sm:h-5 h-4">
                  <span>{user}</span>
                  <span>10:12</span>
                </div>
                <div
                  className={`${
                    msg.sender == "receiver"
                      ? "rounded-r-2xl rounded-bl-2xl bg-peridot text-very-dark-purple"
                      : "rounded-l-2xl rounded-br-2xl bg-very-dark-purple text-pearl"
                  } md:p-2 p-1 px-3 font-Sarabun md:text-base sm:text-sm text-xs flex justify-center items-center`}
                >
                  {msg.message}
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
      <div className="w-full md:h-[132px] h-[80px] flex justify-center items-center flex-col">
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
            <button onClick={(event) => handleSendMessage(event)}>
              <Image
                src={sendMessageIcon}
                alt="send Message Input"
                className="md:w-10 sm:w-8 w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
