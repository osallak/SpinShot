"use client";
import messagesType from "@/types/channelConversationType";
import { default as channelType, usersListType } from "@/types/channelTypes";
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
import admin from "../../../public/adminIcon.svg";
import ban from "../../../public/banIcon.svg";
import kick from "../../../public/kickIcon.svg";
import mute from "../../../public/muteIcon.svg";
import sendMessageIcon from "../../../public/sendMessage.svg";
import settings from "../../../public/settingIcon.svg";
import threePoint from "../../../public/threePoint.svg";
import threePointforPeridot from "../../../public/threePointforPeridot.svg";
import {
  blockedUsersAtom,
  channelAtom,
  channelConversationAtom,
} from "../context/recoilContextChannel";
import DropDownChannel from "../ui/FolderDropDown/DropDownChannel";
import SubUsersList from "./subUsersList";
import UsersList from "./usersList";

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
  const [usersList, setUsersList] = useState<usersListType[]>([]);
  const [type, setType] = useState("");
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [userId, setUserId] = useState("");
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUsersAtom);
  const [setting, setSettings] = useState(false);
  const [content, setContent] = useState<any[]>([]);
  const [openUsersList, setOpenUsersList] = useState(false);
  const [openSubUsersList, setOpenSubUsersList] = useState(false);
  const [openLeaveList, setOpenLeaveList] = useState(false);
  const [targetId, setTargetId] = useState("");

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

  const handleClick = () => {
    setSettings(true);
  };

  const dropDownContent = [
    { content: "Settings", click: handleClick, icon: settings },
  ];

  const goToUser = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleSendMessage = () => {
    setMessage("");
    props.setReload(true);
    const messageData: any = {
      from: `${parseJwt(JSON.stringify(token)).sub}`,
      roomName: `${props.id}`,
      content: currentMsg,
      timestamp: String(Date.now()),
    };
    props.socket.emit("gm", messageData);
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
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
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
        result.data.messages.reverse();
        setConversationChannel(result.data.messages);
        setBlockedUsers(result?.data?.blockedUsers);
      }
    } catch (error) {}
  };

  const fetchUsersList = async () => {
    token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
      router.push("/signin");
      return;
    }
    setOpenUsersList(true);
    try {
      if (props.id && props.id !== "") {
        const res = await axios.get(`${ip}/room/users/${props.id}`, {
          params: {
            room: props.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsersList(res.data);
      }
    } catch (error: any) {}
  };

  const sp = (name: string) => {
    const res = name.split(" ");
    if (res.length > 2) for (let i = 0; i < res.length; i++) res.pop();
    return res;
  };

  const getTypeOfChannel = () => {
    channel.find((items: any) => {
      if (items.id === props.id) {
        setType(items.type);
      }
    });
  };

  const handleOpenSubUsersList = (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    setContent([
      { content: "Mute", icon: mute },
      { content: "Kick", icon: kick },
      { content: "Ban", icon: ban },
      { content: "Add as admin", icon: admin },
    ]);
    setTargetId(id);
    setOpenSubUsersList(true);
  };

  function blockeduser(user: string): boolean {
    return !(blockedUsers as string[]).some((item: string) => item === user);
  }

  const handleOpenLeaveList = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setContent([{ content: "Leave", icon: kick }]);
    setOpenLeaveList(true);
  };

  const emailInput = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  useEffect(() => {
    getTypeOfChannel();
  }, [props.id]);

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
  }, [conversationChannel]);

  return (
    <div className="w-full md:h-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2">
      {openUsersList && (
        <UsersList
          open={openUsersList}
          setOpen={setOpenUsersList}
          id={props.id}
          data={usersList}
          userId={userId}
        />
      )}
      <div className="bg-white/10 h-full sm:rounded-2xl rounded-xl w-full flex justify-center items-center flex-col">
        <div className="w-full h-[10%] md:min-h-[100px] min-h-[70px] flex md:justify-center justify-between flex-col items-center pt-3">
          <div className="md:h-full flex items-center justify-between w-[90%]">
            <div className="flex justify-center items-center space-x-2 flex-row">
              {(channel as channelType[]).map(
                (items: channelType, index: number) =>
                  items.id === props.id && (
                    <button
                      onClick={fetchUsersList}
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
                    </button>
                  )
              )}
              <div className="flex flex-col">
                <button
                  onClick={fetchUsersList}
                  className="font-Poppins lg:text-xl md:text-lg sm:text-base text-sm text-pearl font-semibold"
                >
                  {props.id?.length > 10
                    ? props.id.slice(0, 10) + " ..."
                    : props.id}
                </button>
              </div>
            </div>
            {type !== "PRIVATE" && (
              <DropDownChannel data={dropDownContent} id={props.id} />
            )}
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
                (items: messagesType, index: number) =>
                  blockeduser(items.user.id) && (
                    <div
                      key={index}
                      className={`flex ${
                        items.user.id != userId
                          ? "flex-row-reverse space-x-reverse space-x-5"
                          : "flex-row md:space-x-5 sm:space-x-3 space-x-1"
                      } justify-end`}
                    >
                      <div
                        className={`x-pp:w-[700px] 2xl:w-[600px] xl:w-[500px] lg:w-[70%] w-[80%] md:min-h-[70px] min-h-[50px] flex justify-between rounded-xl ${
                          items.user.id != userId
                            ? "items-center bg-peridot text-very-dark-purple font-bold flex-row space-x-reverse"
                            : "items-center bg-very-dark-purple text-pearl font-medium flex-row-reverse"
                        } flex-row md:space-y-1 space-y-0 md:p-2 p-1`}
                      >
                        <div
                          className={`flex flex-col x-pp:w-[650px] 2xl:w-[550px] xl:w-[450px] lg:w-[80%] w-[90%]  ${
                            items.user.id != userId
                              ? "items-start bg-peridot text-very-dark-purple font-bold"
                              : "items-end bg-very-dark-purple text-pearl font-medium"
                          }`}
                        >
                          <div
                            className={`font-Poppins md:text-base sm:text-sm text-xs sm:h-5 h-4 flex justify-center items-center ${
                              items.user.id != userId
                                ? "flex-row space-x-2"
                                : "flex-row-reverse space-x-reverse space-x-2"
                            }`}
                          >
                            <button
                              onClick={() => goToUser(items.user.id)}
                              className={`font-bold ${
                                items.user.id !== userId
                                  ? "text-very-dark-purple pl-3"
                                  : "text-pearl pr-3"
                              }`}
                            >
                              {items.user.id === userId
                                ? "you"
                                : items.user.username}
                            </button>
                            <span
                              className={`text-[10px] font-light h-full ${
                                items.user.id !== userId
                                  ? "text-very-dark-purple"
                                  : "text-pearl"
                              }`}
                            >
                              {getTime(items.sentAt)}
                            </span>
                          </div>
                          <span
                            className={`px-3 font-poppins font-light ${
                              items.user.id === userId
                                ? "text-pearl"
                                : "text-very-dark-purple"
                            } md:text-lg sm:text-base text-sm`}
                          >
                            {items.message}
                          </span>
                        </div>
                        {items.user.id === userId ? (
                          <button
                            onClick={(event) => handleOpenLeaveList(event)}
                          >
                            <Image src={threePoint} alt="three point" />
                          </button>
                        ) : (
                          <button
                            onClick={(event) =>
                              handleOpenSubUsersList(event, items.user.id)
                            }
                          >
                            <Image
                              src={threePointforPeridot}
                              alt="three point"
                            />
                          </button>
                        )}
                        {openSubUsersList && items.user.id === targetId && (
                          <SubUsersList
                            open={openSubUsersList}
                            setOpen={setOpenSubUsersList}
                            setClose={setOpenSubUsersList}
                            type={type}
                            name={props.id}
                            content={content}
                            checkedID={items.user.id}
                          />
                        )}
                        {openLeaveList && items.user.id === targetId && (
                          <SubUsersList
                            open={openLeaveList}
                            setOpen={setOpenLeaveList}
                            setClose={setOpenLeaveList}
                            type={type}
                            name={props.id}
                            content={content}
                            checkedID={items.user.id}
                          />
                        )}
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