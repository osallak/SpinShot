"use client";
import Image from "next/image";
import logoWhite from "../../../public/logoWhite.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import test1 from "../../../public/test1.svg";
import test2 from "../../../public/test2.svg";
import test3 from "../../../public/test3.svg";
import { ChangeEvent, MouseEvent, useState } from "react";
import IconButton from "../ui/Buttons/IconButton";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import friend from "../../../public/friend.svg";
import notification from "../../../public/notification.svg";
import search from "../../../public/search.svg";
import message from "../../../public/message.svg";
import profile from "../../../public/profile.svg";
import game from "../../../public/game.svg";
import sendMessage from "../../../public/sendMessage.svg";
import SideBar from "../ui//Sidebar/sideBar";
import MobileSideBar from "../ui/Sidebar/mobileSideBar";
import NavBar from "../ui/FolderNavbar/navBar";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useEffect,
  useRef,
} from "react";
import Conversation from "./conversation";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import SubSideBar from "./subSideBar";
import dataConversation from "@/types/messagesArrays";
import dataSubSideBar from "@/types/messagesArrays";
import parseJwt from "@/utils/parsJwt";

const Chat = () => {
  const Router = useRouter();
  const [storedToken, setToken] = useState("");
  const [otherUserID, setOtherUserID] = useState("");
  const [exploreOpen, setExploreOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [response, setResponse] = useState<dataConversation[]>([]);
  const [userId, setUserId] = useState("");
  const [individual, setIndividual] = useState<dataSubSideBar[]>([]);
  const [userName, setUserName] = useState("");
  const userIdRef = useRef<string>();
  // const chatContainerRef = useRef<HTMLDivElement>(null);
  // const [currentMsg, setCurrentMsg] = useState("");
  // const Router = useRouter();
  // const [message, setMessage] = useState("");
  // const [chatHistory, setChatHistory] = useState<string[]>([]);

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



  const ayoubToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0YWppIiwic3ViIjoiMGM0ZjQ0ODMtNDI5Ny00ZWFkLTg1NWYtOGVhNjcyOTIwYmRmIiwiaXNzIjoic3BpbnNob3QiLCJpYXQiOjE2OTY2MDAzMzMsImV4cCI6MTY5NjY4NjczM30.3JyzTZBDHdFfUMRwu11tNFLngGucY7nH1YpCl1KSnlI";
  
  const featchDataConversation = async (id: string, jwtTokenID: string) => {
    try {
      const result = await axios.get(
        `http://e3r10p14.1337.ma:3001/chat/individual/${id}`, {
          headers: {
            Authorization: `Bearer ${ayoubToken}`,
          },
        params: {
          page: 1,
          limit: 5,
          id: jwtTokenID,
        }}
      );
      setResponse(result.data);
      setUserId(jwtTokenID);
      console.log("response from conversation: ", result.data);
    } catch (error) {
      console.log("error of fetching data fron conversation: ", error);
    }
  }

  const fetchDataSubSideBar = async () => {
    const jwtToken = parseJwt(ayoubToken);
    console.log("JWTTOKEN: ", jwtToken);
    try {
      const res = await axios.get(`http://e3r10p14.1337.ma:3001/chat/all`, {
        headers: {
          Authorization: `Bearer ${ayoubToken}`,
        },
        params: {
          id: jwtToken.sub,
        },
      });
      console.log("response from subsidebar: ", res.data);
      setIndividual((prev) => res.data.individual);
      featchDataConversation(res.data.individual[0].other.id, jwtToken.sub);
    } catch (error) {
      console.log("error of fetching data from subsidebar: ", error);
    }
  };

  useEffect(() => {
    fetchDataSubSideBar();
  },);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar />
      {openSideBar && <MobileSideBar />}
      <SubSideBar open={open} setOpen={setOpen} setFlag={setFlag} data={individual} />
      {flag === "ExploreChannels" && (
        <ExploreChannels open={open} setOpen={setOpen} />
      )}
      {flag === "CreateChannels" && (
        <CreateChannels open={open} setOpen={setOpen} />
      )}
      <div className="w-full h-full">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        <Conversation data={response} userName={individual[0]?.other?.username} userId={userId} />
       </div>
    </div>
  );
};

export default Chat;
