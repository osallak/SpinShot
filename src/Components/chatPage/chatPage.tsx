"use client";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import { default as dataConversation } from "@/types/messagesArrays";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  chatAll,
  conversationAtom,
  exploreChannelAtom,
  individualAtom,
  roomsAtom,
} from "../context/recoilContext";
import NavBar from "../ui/FolderNavbar/navBar";
import MobileSideBar from "../ui/folderSidebar/mobileSideBar";
import ConversationIndividual from "./conversationIndividual";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import SubSideBar from "./subSideBar";

const Chat = () => {
  const router = useRouter();
  const [storedToken, setToken] = useState("");
  const [otherUserID, setOtherUserID] = useState("");
  const [exploreOpen, setExploreOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [id, setId] = useState("");
  const [isIndividual, setIsIndividual] = useState("Individual");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [response, setResponse] = useState<dataConversation[]>([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const userIdRef = useRef<string>();
  const [loaded, setIsLoaded] = useState(false);
  const [exploreChannel, setExploreChannel] =
    useRecoilState(exploreChannelAtom);
  const [allMessages, setAllMessages] = useRecoilState(chatAll);
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const [rooms, setRooms] = useRecoilState(roomsAtom);
  const [conversation, setConversation] = useRecoilState(conversationAtom);
  // const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentMsg, setCurrentMsg] = useState("");
  // const Router = useRouter();
  const [message, setMessage] = useState("");
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
  // ) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/signin");
  //     return;
  //   }
  //   const socket = io("e3r10p14.1337.ma:8001", {
  //     extraHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   socket.on("connect", () => {
  //     console.log(parseJwt(token));
  //     socket.on("pm", (data) => {
  //       console.log(data);
  //     });
  //     socket.on("exception", (data) => {
  //       console.log(data);
  //     });
  //   });
  //   event.preventDefault();
  //   if (message.trim() !== "") {
  //     socket.on("connect", () => {
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

  // const featchDataConversation = async (id: string) => {
  //   // const token = localStorage.getItem("token");
  //   // if (!token) {
  //   //   Router.push("/Signin");
  //   //   return;
  //   // }
  //   const jwtToken = parseJwt(token);
  //   try {
  //     const result = await axios.get(
  //       `${ip}/chat/individual/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           id: jwtToken.sub,
  //         },
  //       }
  //     );
  //     setResponse(result.data);
  //     setConversation(result.data);
  //     setUserId(jwtToken.sub);
  //     console.log("response from conversation here:====>    ", result.data);
  //   } catch (error) {
  //     console.log("error of fetching data fron conversation: ", error);
  //   }
  // };

  const fetchDataSubSideBar = async () => {
    const token = localStorage.getItem("token");
    console.log("token from chat Page: ", token);
    if (!token) {
      router.push("/signin");
      return;
    }
    const jwtToken = parseJwt(token);
    try {
      const res = await axios.get(`${ip}/chat/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: jwtToken.sub,
        },
      });
      setIndividual(res?.data?.individual);
      setId(res?.data?.individual[0]?.other?.id);
      setRooms(res?.data?.room);
      setAllMessages(res.data);
    } catch (error) {
      console.log("error of fetching data from subsidebar: ", error);
    }
  };

  const fetchDataExploreChannel = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    if (open === true) {
      try {
        const res = await axios.get(`${ip}/room/explore`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExploreChannel(res.data);
      } catch (error: any) {
        console.log("error from explore chan   nel: ", error);
      }
    }
  };

  useEffect(() => {
    fetchDataSubSideBar();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchDataExploreChannel();
  }, [open]);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row relative">
      <SideBar />
      {openSideBar && <MobileSideBar />}
      <SubSideBar
        open={open}
        setOpen={setOpen}
        setFlag={setFlag}
        setIsIndividual={setIsIndividual}
        isIndividual={isIndividual}
        setId={setId}
        loaded={loaded}
      />
      {flag === "ExploreChannels" && (
        <ExploreChannels open={open} setOpen={setOpen} />
      )}
      {flag === "CreateChannels" && (
        <CreateChannels open={open} setOpen={setOpen} />
      )}
      <div className="w-full h-full">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        {isIndividual === "Individual" ? (
          <ConversationIndividual userName={"three"} id={id} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
function io(arg0: string, arg1: { extraHeaders: { Authorization: string } }) {
  throw new Error("Function not implemented.");
}
