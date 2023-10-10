"use client";
import SideBar from "@/Components/ui/sideBar/sideBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NavBar from "../ui/navBar/navBar";
import MobileSideBar from "../ui/sideBar/mobileSideBar";
import Conversation from "./conversation";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import SubSideBar from "./subSideBar";
import dataConversation from "@/types/messagesArrays";
import dataSubSideBar from "@/types/messagesArrays";
import parseJwt from "@/utils/parsJwt";
import dataExploreChannel from "@/types/exploreChannel";

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
  const [exploreChannel, setExploreChannel] = useState<dataExploreChannel[]>([]);
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0YWppIiwic3ViIjoiYzlkN2QzMmEtYTE2NC00OWUxLTk4YmYtNTE3YmQwZjBmMzYzIiwiaXNzIjoic3BpbnNob3QiLCJpYXQiOjE2OTY3OTU4NTksImV4cCI6MTY5Njg4MjI1OX0.QEAG6ZKAKzSLJ0hyrdRJQH65aWW_YKneTLCaN7XiWKU";

  const featchDataConversation = async (id: string, jwtTokenID: string) => {
    try {
      const result = await axios.get(
        `http://e3r10p14.1337.ma:3001/chat/individual/${id}`,
        {
          headers: {
            Authorization: `Bearer ${ayoubToken}`,
          },
          params: {
            page: 1,
            limit: 5,
            id: jwtTokenID,
          },
        }
      );
      setResponse(result.data);
      setUserId(jwtTokenID);
      console.log("response from conversation: ", result.data);
    } catch (error) {
      console.log("error of fetching data fron conversation: ", error);
    }
  };

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

  const fetchDataExploreChannel = async () => {
    if (open === true) {
      console.log("hello");
      try {
        const res = await axios.get(`http://e3r10p14.1337.ma:3001/room/explore`, {
          headers: {
            Authorization: `Bearer ${ayoubToken}`,
          },
        });
        setExploreChannel(res.data);
        console.log("response from explore channel in chat page: ", res)
        console.log("response from explore channel: ", res.data);
      } catch (error: any) {
        console.log("error from explore channel: ", error);
      }
    }
  };

  useEffect(() => {
    fetchDataSubSideBar();
  });

  useEffect(() => {
    fetchDataExploreChannel();
  });

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar avatar={individual[0]?.other?.avatar} />
      {openSideBar && <MobileSideBar />}
      <SubSideBar
        open={open}
        setOpen={setOpen}
        setFlag={setFlag}
        data={individual}
      />
      {flag === "ExploreChannels" && (
        <ExploreChannels open={open} setOpen={setOpen} data={exploreChannel} />
      )}
      {flag === "CreateChannels" && (
        <CreateChannels open={open} setOpen={setOpen} />
      )}
      <div className="w-full h-full">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        <Conversation
          data={response}
          userName={individual[0]?.other?.username}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Chat;
