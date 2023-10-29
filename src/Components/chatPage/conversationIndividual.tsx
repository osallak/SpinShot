"use client";
import IMsgDataTypes from "@/types/iMsgDataTypes";
import game from "../../../public/game.svg";
import individualConversationType from "@/types/individualConversationType";
import individualType from "@/types/individualTypes";
// import { dropDownContent } from "@/utils/dropDownContent";
import parseJwt from "@/utils/parsJwt";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import ip from "@/utils/endPoint";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext,
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
import { SocketContext } from "@/context/socket.context";

let token: any;
const ConversationIndividual = (props: {
  userId: string;
  id: string;
  socket: any;
  setReload: Function;
  reload: boolean;
  openSubSideBar: boolean;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {socket} = useContext(SocketContext);
  const router = useRouter();
  const [userStatus, setUserStatus] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [individualConversation, setIndividualConversation] = useRecoilState(
    individualConversationAtom
  );
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const myHandleClick = () => {
    console.log("invite:", { id: props.id});
    socket.emit("invite", {id: props.id});
    router.push(`/game/${router.query.id}`);
  }
  const dropDownContent = [
    { content: "Let's Play", click: myHandleClick, icon: game},
  ];
  const getTime = (time: string): string => {
    const date = new Date(Number(time));
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let parsedMinutes =
      Math.floor(minutes / 10) === 0
        ? "0" + minutes.toString()
        : minutes.toString();
    let parsedHours =
      Math.floor(hours / 10) === 0 ? "0" + hours.toString() : hours.toString();
    return parsedHours + ":" + parsedMinutes;
  };
  const handleSendMessage = () => {
    const token = localStorage.getItem("token");
    const jwtToken = parseJwt(JSON.stringify(token));
    if (
      !token ||
      (jwtToken.isTwoFactorEnabled && !jwtToken.isTwoFaAuthenticated)
    ) {
      router.push("/signin");
      return;
    }
    if (message === "") return;
    props.setReload(true);

    const messageData: IMsgDataTypes = {
      from: `${parseJwt(JSON.stringify(token)).sub}`,
      to: `${props.id}`,
      content: message,
      timestamp: String(Date.now()),
      senderUsername: userName,
    };
	
    setIndividual((prev: individualType[]) => {
      const newIndividual: individualType[] = prev.map((item: any) => {
        if (item.other.id === props.id) {
          return {
            other: item.other,
            sender: item.sender,
            sentAt: item.sentAt,
            message: message,
          };
        } else return item;
      });
      return newIndividual;
    });

    setIndividualConversation((prev: individualConversationType[]) => {
      const newIndividualConversation: individualConversationType = {
        sentAt: messageData.timestamp,
        sender: messageData.from,
        message: messageData.content,
      };
      return [...prev, newIndividualConversation];
    });
    props.socket.emit("pm", messageData);
    setMessage("");
  };

  const keySendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
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

  const getUserName = async () => {
    try {
      const senderId = parseJwt(JSON.stringify(localStorage.getItem('token'))).sub;
      const userNameRes = await axios.get(`${ip}/users/profile/${senderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserName((prev) => userNameRes.data.username);
    } catch (error : any) {
	}
  };

  const playerStatus = async () => {
	const token = localStorage.getItem("token");
	const jwtToken = parseJwt(JSON.stringify(token));
	if (!token || (jwtToken.isTwoFactorEnabled && !jwtToken.isTwoFaAuthenticated)) {
		router.push("/signin")
		return;
	}
	try {
		const res = await axios.get(`${ip}/users/status/${props.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				id: props.id,
			}
		})
		setUserStatus(res.data.status);
		console.log('res from player status: ' , res);
	} catch (error: any) {
		console.log('error from player status : ', error)
	}
  }

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
	playerStatus();
  }, [])


  useEffect(() => {
    const conversationDiv: any = chatContainerRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [individualConversation.length]);

  return (
    <div className={`w-full md:h-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2 relative ${props.openSubSideBar && "opacity-5"}`}>
      <div className="bg-white/10 h-full sm:rounded-2xl rounded-xl w-full flex justify-center items-center flex-col">
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[70px] flex md:justify-center justify-between flex-col items-center pt-3">
          <div className="md:h-full flex items-center justify-between w-[90%]">
            <div className="flex justify-center items-center space-x-2 flex-row">
              {(individual as individualType[]).map(
                (items: individualType, index: number) => (
                  <button
                    key={index}
                    className="rounded-xl"
                    onClick={(event) => goToUser(event, props.id)}
                  >
                    {items.other.id === props.id && (
                      <div className="lg:h-[60px] md:h-[50px] h-[40px] lg:w-[60px] md:w-[50px] w-[40px] rounded-xl">
                        <Image
                          key={index}
                          width={500}
                          height={500}
                          src={items.other.avatar}
                          alt="profile pic"
                          className="w-full h-full rounded-xl"
                        />
                      </div>
                    )}
                  </button>
                )
              )}
              <div className="flex flex-col">
                <p className="font-Poppins md:text-xl sm:text-md text-sm text-pearl font-semibold">
                  {individual.map((individ: individualType, index: number) => (
                    <button
                      onClick={(event) => goToUser(event, props.id)}
                      key={index}
                    >
                      {props.id === individ.other.id
                        ? individ.other.username
                        : ""}
                    </button>
                  ))}
                </p>
                <p className="font-Poppins md:text-lg sm:text-sm text-xs text-pearl text-opacity-40 font-thin">
                  {userStatus}
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
                          items.sender != props.userId
                            ? "flex-row-reverse space-x-reverse space-x-5"
                            : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
                        } justify-end`}
                      >
                        <div
                          className={`x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] md:min-h-[70px] min-h-[50px] flex justify-center rounded-xl ${
                            items.sender != props.userId
                              ? "items-start bg-peridot text-very-dark-purple font-bold"
                              : "items-end bg-very-dark-purple text-pearl font-medium"
                          } flex-col md:space-y-1 space-y-0 md:p-2 p-1`}
                        >
                          <div
                            className={`font-Poppins md:text-base sm:text-sm text-xs sm:h-5 h-4 flex justify-center items-center ${
                              items.sender != props.userId
                                ? "flex-row space-x-2"
                                : "flex-row-reverse space-x-reverse space-x-2"
                            }`}
                          >
                            <span
                              className={`${
                                items.sender !== props.userId
                                  ? "text-very-dark-purple pl-3"
                                  : "text-pearl pr-3"
                              }`}
                            >
                              {individual.map(
                                (individ: individualType, index: number) => (
                                  <button
                                    onClick={(event) =>
                                      goToUser(event, items.sender)
                                    }
                                    key={index}
                                  >
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
                                items.sender !== props.userId
                                  ? "text-very-dark-purple"
                                  : "text-pearl"
                              }`}
                            >
                              {getTime(items.sentAt)}
                            </span>
                          </div>
                          <span
                            className={`px-3 font-poppins font-light ${
                              items.sender === props.userId
                                ? "text-pearl"
                                : "text-very-dark-purple"
                            } md:text-lg sm:text-base text-sm`}
                          >
                            {items.message}
                          </span>
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
