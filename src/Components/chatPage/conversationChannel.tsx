"use client";
import messagesType from "@/types/channelConversationType";
import { default as channelType } from "@/types/channelTypes";
import { default as IMsgDataTypes, default as sendRoomMessageDto } from "@/types/iMsgDataTypes";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import game from "../../../public/game.svg";
import sendMessageIcon from "../../../public/sendMessage.svg";
import trash from "../../../public/trash.svg";
import {
  channelAtom,
  channelConversationAtom,
} from "../context/recoilContextChannel";
import DropDown from "../ui/FolderDropDown/Dropdown";

let token: any;
const ConversationChannel = (props: {
  userName: string;
  id: string;
  socket: any;
  setReload: Function;
  reload: boolean;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentMsg, setCurrentMsg] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [conversationChannel, setConversationChannel] = useRecoilState(
    channelConversationAtom
  );
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [userId, setUserId] = useState("");

  const deleteConversation = () => {
    console.log("hello world from the other side");
  };

  const handleClick = () => {
    console.log("hello world from handle click");
  };

  const dropDownContent = [
    { content: "Delete Conversation", click: deleteConversation, icon: trash },
    { content: "Let't Play", click: handleClick, icon: game },
  ];

  const handleSendMessage = () => {
    setMessage("");
    props.setReload(true);
    const messageData: sendRoomMessageDto = {
      from: `${parseJwt(JSON.stringify(token)).sub}`,
      roomName: `${props.id}`,
      content: currentMsg,
      timestamp: String(Date.now()),
    };
    props.socket.emit("gm", messageData);
  };

  const keySendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.setReload(true);
      setMessage("");
      const messageData: sendRoomMessageDto = {
        from: `${parseJwt(JSON.stringify(token)).sub}`,
        roomName: `${props.id}`,
        content: currentMsg,
        timestamp: String(Date.now()),
      };
      props.socket.emit("gm", messageData);
    }
  };

  const fetchDataConversation = async () => {
    token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const jwtToken = parseJwt(token);
    setUserId(jwtToken.sub);
    try {
      if (props.id && props.id !== "") {
        const result = await axios.get(`${ip}/room/individual/${props.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: props.id,
          },
        });
        console.log("result form fetch data conversation: ", result.data.messages);
        setConversationChannel(result.data.messages);
      }
    } catch (error) {
      console.log("error of fetching data fron conversation: ", error);
    }
  };

  const sp = (name: string) => {
    const res = name.split(" ");
    if (res.length > 2) for (let i = 0; i < res.length; i++) res.pop();
    return res;
  };

  const emailInput = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  useEffect(() => {
    setCurrentMsg(message);
  }, [message]);

  useEffect(() => {
    fetchDataConversation();
    props.setReload(false);
  }, [props.id, props.reload]);

  useEffect(() => {
    const conversationDiv: any = chatContainerRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [conversationChannel.length]);

  return (
    <div className="w-full md:h-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2">
      <div className="bg-white/10 h-full sm:rounded-2xl rounded-xl w-full flex justify-center items-center flex-col">
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[70px] flex md:justify-center justify-between flex-col items-center pt-3">
          <div className="md:h-full flex items-center justify-between w-[90%]">
            <div className="flex justify-center items-center space-x-2 flex-row">
              {(channel as channelType[]).map(
                (items: channelType, index: number) =>
                  items.id === props.id && (
                    <div
                      key={index}
                      className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] h-full flex justify-center items-center"
                    >
                      <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] md:rounded-2xl rounded-xl bg-white/20 flex justify-center items-center">
                        <div className="font-Poppins md:text-4xl sm:text-3xl text-2xl font-thin text-very-dark-purple flex justify-center items-center">
                          {sp(items.id).map((charName, index) => (
                            <p key={index} className="uppercase">
                              {charName[0]}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
              )}
              <div className="flex flex-col">
                <p className="font-Poppins md:text-xl sm:text-md text-sm text-pearl font-semibold">
                  {(channel as channelType[]).map(
                    (chan: channelType, index: number) => (
                      <div key={index}>
                        {props.id === chan.id ? chan.id : ""}
                      </div>
                    )
                  )}
                </p>
              </div>
            </div>
            <DropDown data={dropDownContent} />
          </div>
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
        </div>
        {conversationChannel ? (
          <div
            ref={chatContainerRef}
            className={`w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden `}
          >
            <div className="w-[94%] space-y-3">
              {(conversationChannel as messagesType[]).map(
                (items: messagesType, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      items.user.id != userId
                        ? "flex-row-reverse space-x-reverse space-x-5"
                        : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
                    } justify-end`}
                  >
                    <div
                      className={`x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] min-h-[70px] flex justify-center rounded-xl ${
                        items.user.id != userId
                          ? "items-start bg-peridot text-very-dark-purple font-bold"
                          : "items-end bg-very-dark-purple text-pearl font-medium"
                      } flex-col md:space-y-1 space-y-0 md:p-2 p-1`}
                    >
                      <div
                        className={`font-Poppins md:text-base sm:text-sm text-xs sm:h-5 h-4 flex justify-center items-center ${
                          items.user.id != userId
                            ? "flex-row space-x-2"
                            : "flex-row-reverse space-x-reverse space-x-2"
                        }`}
                      >
                        <span
                          className={`px-3 ${
                            items.user.id !== userId
                              ? "text-very-dark-purple"
                              : "text-pearl"
                          }`}
                        >
                          {items.user.username}
                        </span>
                        <span
                          className={`text-[10px] font-light h-full ${
                            items.user.id !== userId
                              ? "text-very-dark-purple"
                              : "text-pearl"
                          }`}
                        >
                          {items.sentAt}
                        </span>
                      </div>
                      <span className="px-3">{items.message}</span>
                    </div>
                  </div>
                )
              )}
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
                  onKeyDown={(event) => keySendMessage(event)}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              <button onClick={(event) => handleSendMessage()}>
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
    </div>
  );
};

export default ConversationChannel;
