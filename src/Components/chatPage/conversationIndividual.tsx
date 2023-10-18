"use client";
import IMsgDataTypes from "@/types/iMsgDataTypes";
import individualConversationType from "@/types/individulaTypes";
import individualType from "@/types/individulaTypes";
import { dropDownContent } from "@/utils/dropDownContent";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import sendMessageIcon from "../../../public/sendMessage.svg";
import {
  individualAtom,
  individualConversationAtom,
} from "../context/recoilContextIndividual";
import DropDown from "../ui/FolderDropDown/Dropdown";

let token: any;
const ConversationIndividual = (props: {
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
  const [individualConversation, setIndividualConversation] = useRecoilState(
    individualConversationAtom
  );
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const [userId, setUserId] = useState("");

  const handleSendMessage = () => {
    setMessage("");
    props.setReload(true);
    const messageData: IMsgDataTypes = {
      from: `${parseJwt(JSON.stringify(token)).sub}`,
      to: `${props.id}`,
      content: currentMsg,
      timestamp: String(Date.now()),
    };

    setIndividual((prev : individualType[]) => {
      const newIndividual : individualType[] = prev.map((item : any) => {
        if (item.other.id === props.id)
        {
          return {
            other : item.other,
            sender : item.sender,
            sentAt : item.sentAt,
            message : currentMsg
          } 
        }
        else
          return item;
      })
      return newIndividual
    })
    props.socket.emit("pm", messageData);
  };

  const keySendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
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
        const result = await axios.get(`${ip}/chat/individual/${props.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: jwtToken.sub,
          },
        });
        setIndividualConversation(result.data);
      }
    } catch (error) {
      console.log("error of fetching data fron conversation: ", error);
    }
  };

  const goToUser = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    router.push(`/profile/${id}`);
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
  }, [individualConversation.length]);

  return (
    <div className="w-full md:h-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2">
      <div className="bg-white/10 h-full sm:rounded-2xl rounded-xl w-full flex justify-center items-center flex-col">
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[70px] flex md:justify-center justify-between flex-col items-center pt-3">
          <div className="md:h-full flex items-center justify-between w-[90%]">
            <div className="flex justify-center items-center space-x-2 flex-row">
              {(individual as individualType[]).map(
                (items: individualType, index: number) => (
                  <button
                    className="rounded-xl"
                    onClick={(event) => goToUser(event, props.id)}
                  >
                    {items.other.id === props.id && (
                      <Image
                        key={index}
                        width={500}
                        height={500}
                        src={items.other.avatar}
                        alt="profile pic"
                        className="md:w-14 sm:w-12 w-10 rounded-xl"
                      />
                    )}
                  </button>
                )
              )}
              <div className="flex flex-col">
                <p className="font-Poppins md:text-xl sm:text-md text-sm text-pearl font-semibold">
                  {individual.map((individ: individualType, index: number) => (
                    <button onClick={(event) => goToUser(event, props.id)} key={index}>
                      {props.id === individ.other.id
                        ? individ.other.username
                        : ""}
                    </button>
                  ))}
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
        {individualConversation.length ? (
          <div
            ref={chatContainerRef}
            className={`w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden `}
          >
            <div className="w-[94%] space-y-3">
              {(individualConversation as individualConversationType[]).map(
                (items: individualConversationType, index: number) =>
                  items.message !== "" && (
                    <div key={index}>
                      <div
                        className={`flex ${
                          items.sender != userId
                            ? "flex-row-reverse space-x-reverse space-x-5"
                            : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
                        } justify-end`}
                      >
                        <div
                          className={`x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] md:min-h-[70px] min-h-[50px] flex justify-center rounded-xl ${
                            items.sender != userId
                              ? "items-start bg-peridot text-very-dark-purple font-bold"
                              : "items-end bg-very-dark-purple text-pearl font-medium"
                          } flex-col md:space-y-1 space-y-0 md:p-2 p-1`}
                        >
                          <div
                            className={`font-Poppins md:text-base sm:text-sm text-xs sm:h-5 h-4 flex justify-center items-center ${
                              items.sender != userId
                                ? "flex-row space-x-2"
                                : "flex-row-reverse space-x-reverse space-x-2"
                            }`}
                          >
                            <span
                              className={`px-3 ${
                                items.sender !== userId
                                  ? "text-very-dark-purple"
                                  : "text-pearl"
                              }`}
                            >
                              {individual.map(
                                (individ: individualType, index: number) => (
                                  <button onClick={(event) => goToUser(event, items.sender)} key={index}>
                                    {props.id === individ.other.id
                                      ? items.sender === props.id
                                        ? individ.other.username
                                        : "you"
                                      : ""}
                                  </button>
                                )
                              )}
                            </span>
                            <span
                              className={`text-[10px] font-light h-full ${
                                items.sender !== userId
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

export default ConversationIndividual;
