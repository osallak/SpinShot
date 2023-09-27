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
import NavBar from "../ui/navBar/navBar";
import Conversation from "./conversation";
import { Socket } from "socket.io";
import ExploreChannels from "./exploreChannels";
import CreateChannels from "./createChannels";

function parseJwt (token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const Chat = () => {
  const Router = useRouter();
  const [storedToken, setToken] = useState("");

  // const chatContainerRef = useRef<HTMLDivElement>(null);
  // const [currentMsg, setCurrentMsg] = useState("");
  // const Router = useRouter();
  // const [message, setMessage] = useState("");
  // const [chatHistory, setChatHistory] = useState<string[]>([]);
  // const user = "You";
  // const msg = [
  //   {
  //     message: "hey",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up impmport sendMessageIcogeIcon from import sendMessageIcon ort sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  //   {
  //     message:
  //       "what's up import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from import sendMessageIcon from ",
  //     sender: "receiver",
  //   },
  //   {
  //     message: "what do you doing",
  //     sender: "owner",
  //   },
  // ];

  // const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setCurrentMessage(event.target.value);
  // };

  // function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
  //   if (event.key === "Enter") {

  //     handleSendMessage(event);
  //   }
  // }

  // const inputRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   const conversationDiv: any = chatContainerRef.current;
  //   if (conversationDiv) {
  //     conversationDiv.scrollTop = conversationDiv.scrollHeight;
  //   }
  // }, [chatHistory.length]);

  // useEffect(() => {
  //   const handleKeyPress = (event: any) => {
  //     event.preventDefault(); // Prevent the "/" key from being typed into the input
  //     if (event.key === "/") {
  //       if (inputRef.current) {
  //         inputRef.current.focus();
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", (event) => handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  // const emailInput = useCallback((inputElement: any) => {
  //   if (inputElement) {
  //     inputElement.focus();
  //   }
  // }, []);

  // const sendMessage = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setMessageContent(currentMessage);
  //   console.log("Message Content : ", messageContent);
  // }
  // interface IMsgDataTypes {
  //   user: String;
  //   msg: String;
  //   time: String;
  // }

  // const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  // const handleSendMessage = (
  //   event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  //   ) => {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdm9vcyIsInN1YiI6IjQ4YTRkNDI2LWZiMjEtNDE5NC04ZWQ2LTZiZjRhY2Y0M2I1NSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk0ODA4OTM1LCJleHAiOjE2OTQ4OTUzMzV9.zsDFfyE2t1gLbQ9DDAJr92X88pegk7fOCt93rM2BH9A'
  // const socket = io("e3r10p14.1337.ma:8001", {
  //   extraHeaders: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // socket.on("connect", () => {
  //   console.log(parseJwt(token));
  //   socket.on("pm", (data) => {console.log(data)});
  //   socket.on("exception", (data) => {console.log(data)})
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
  //     setMessage("");
  //   }
  // };

  // const socketInitializer = () => {
  //   socket.on("connect", () => {
  //     const msgData: IMsgDataTypes = {
  //       user: "ataji",
  //       msg: currentMsg,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };
  //     socket.emit("hello", msgData);
  //   });
  // };

  // useEffect(() => {
  //   socket.on("hello", (data: IMsgDataTypes) => {
  //     setChat((pre) => [...pre, data]);
  //   });
  // }, [socket]);

  // useEffect(() => socketInitializer(), []);

  useEffect(() => {
    // Get the token from localStorage
    const storedToken = localStorage.getItem('token');

    // Redirect to the Signin page if token is not available
    // if (!storedToken) {
    //   Router.push('/signin');
    //   return;
    // }

    // Set the token state
    // setToken(storedToken);
  }, []);

  console.log("======> token: ", storedToken);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");
  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 md:space-y-0 space-y-3 flex justify-start px-3 pb-3 md:pt-3 pt-0 items-center md:flex-row flex-col">
      <SideBar />
      <SubSideBar open={open} setOpen={setOpen} setFlag={setFlag} />
      {flag === "ExploreChannels" && <ExploreChannels open={open} setOpen={setOpen} />}
      {flag === "CreateChannels" && <CreateChannels open={open} setOpen={setOpen} />}
      <NavBar />
      <Conversation />
    </div>
  );
};

export default Chat;
