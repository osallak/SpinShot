"use client";
import SideBar from "@/Components/ui/sideBar/sideBar";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useEffect,
  useState
} from "react";
import NavBar from "../ui/navBar/navBar";
import MobileSideBar from "../ui/sideBar/mobileSideBar";
import Conversation from "./conversation";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import SubSideBar from "./subSideBar";
import dataConversation from "@/types/messagesArrays";
import dataSubSideBar from "@/types/messagesArrays";

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

  const [response, setResponse] = useState<dataConversation[]>([]);
  const [userId, setUserId] = useState("");
  const [individual, setIndividual] = useState<dataSubSideBar[]>([]);
  const [userName, setUserName] = useState("");

  const fetchDataConversation = async () => {
    const u1 =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMSIsInN1YiI6ImNkYTMxODA4LTE0M2QtNDJjNy1iY2U2LTY1OGZjYjMxYTA3NCIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk2NDE1NDQ4LCJleHAiOjE2OTY1MDE4NDh9.i3AtMo6H4WS0_B5CnK6R_ETr272T92hmS0NFlmwgkt0"
    const u2 =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMiIsInN1YiI6ImMzNGFjMzNiLTJlOGEtNDJiNS05OTg1LWQ3ZmE5OTk3NzE2YSIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk2NDE1NTA4LCJleHAiOjE2OTY1MDE5MDh9.F3WsEuWzpPByr5WA_8gNh_IrIdyCH3t_0Dcycr6-XEA"
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
    const jwtU1 = parseJwt(u1);
    const jwtU2 = parseJwt(u2);
    // console.log(jwtU1);
    try {
      const res = await axios.get(
        `http://e3r10p14.1337.ma:3000/chat/individual/${jwtU2.sub}`, {
          headers: {
            Authorization: `Bearer ${u1}`,
          },
        params: {
          page: 1,
          limit: 5,
          id: jwtU1.sub,
        }}
      );
      setResponse(res.data);
      setUserId(jwtU1.sub);
      console.log("response from conversation: ", res.data);
    } catch (error) {
      console.log("error of fetching data fron conversation: ", error);
    }
  };

  const fetchDataSubSideBar = async () => {
    const ayoubToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMSIsInN1YiI6ImNkYTMxODA4LTE0M2QtNDJjNy1iY2U2LTY1OGZjYjMxYTA3NCIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk2NDE1NDQ4LCJleHAiOjE2OTY1MDE4NDh9.i3AtMo6H4WS0_B5CnK6R_ETr272T92hmS0NFlmwgkt0";
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
    try {
      const res = await axios.get(`http://e3r10p14.1337.ma:3000/chat/all`, {
        headers: {
          Authorization: `Bearer ${ayoubToken}`,
        },
        params: {
          id: jwtToken.sub,
        },
      });
      setIndividual(res.data.individual);
      setUserName(res.data.individual[0].other.username);
      console.log("message: ", res.data.individual[0]);
      console.log("response from subsidebar: ", res.data);
    } catch (error) {
      console.log("error of fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchDataConversation();
    fetchDataSubSideBar();
  }, []);

  // useEffect(() => {
  // }, []);

  console.log("======> token: ", storedToken);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar />
      {openSideBar && <MobileSideBar />}
      <SubSideBar open={open} setOpen={setOpen} setFlag={setFlag} />
      {flag === "ExploreChannels" && (
        <ExploreChannels open={open} setOpen={setOpen} />
      )}
      {flag === "CreateChannels" && (
        <CreateChannels open={open} setOpen={setOpen} />
      )}
      <div className="w-full h-full">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        <Conversation data={response} userName={"individual[0].message"} userId={userId} />
      </div>
    </div>
  );
};

export default Chat;
