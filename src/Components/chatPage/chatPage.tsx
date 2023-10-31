"use client";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import messagesType from "@/types/channelConversationType";
import channelType from "@/types/channelTypes";
import individualConversationType from "@/types/individualConversationType";
import individualType from "@/types/individualTypes";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import { chatSocket, io } from "chatSocket.io-client";
import { SocketContext } from "@/context/socket.context";
import toast from "react-hot-toast";
import {
  currentFriendsAtom,
  exploreChannelAtom,
} from "../context/recoilContext";
import {
  blockedUsersAtom,
  channelAtom,
  channelConversationAtom,
} from "../context/recoilContextChannel";
import {
  individualAtom,
  individualConversationAtom,
} from "../context/recoilContextIndividual";
import NavBar from "../ui/FolderNavbar/navBar";
import MobileSideBar from "../ui/folderSidebar/mobileSideBar";
import ConversationChannel from "./conversationChannel";
import ConversationIndividual from "./conversationIndividual";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import InviteFriends from "./inviteFriends";
import MobileSubSideBar from "./mobileSubSideBar";
import SubSideBar from "./subSideBar";
// import { chatSocketContext } from "@/context/chatSocket.context";

// let chatSocket: any;
let token: any;
const Chat = () => {
  const router = useRouter();
  const { chatSocket } = useContext(SocketContext);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [id, setId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isIndividual, setIsIndividual] = useState("Individual");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [loaded, setIsLoaded] = useState(false);
  const [exploreChannel, setExploreChannel] =
    useRecoilState(exploreChannelAtom);
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const [currentFriend, setCurrentFriends] = useRecoilState(currentFriendsAtom);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSubSideBar, setOpenSubSideBar] = useState(false);
  const [individualConversation, setIndividualConversation] = useRecoilState(
    individualConversationAtom
  );
  const [conversationChannel, setConversationChannel] = useRecoilState(
    channelConversationAtom
  );
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUsersAtom);
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [userId, setUserId] = useState("");

  const updateChannelConversation = (data: any) => {
    const parsedData = JSON.parse(data);
    setChannel((prev: channelType[]) => {
      const newChannel = prev.map((item: channelType) => {
        if (item.id === parsedData.roomName) {
          if (item.messages.length > 0) {
            const updatedMessages = item.messages.map((message) => {
              return {
                ...message,
                message: parsedData.content,
                sentAt: parsedData.timestamp,
                user: {
                  avatar: "",
                  id: parsedData.userId,
                  username: parsedData.userName,
                },
              };
            });
            return { ...item, messages: updatedMessages };
          } else {
            return {
              ...item,
              messages: [
                {
                  message: parsedData.content,
                  sentAt: parsedData.timestamp,
                  user: {
                    avatar: "",
                    id: parsedData.userId,
                    username: parsedData.userName,
                  },
                },
              ],
            };
          }
        } else return item;
      });
      return newChannel;
    });
    setConversationChannel((prev: messagesType[]) => {
      const newConversationChannel: messagesType = {
        message: parsedData.content,
        sentAt: parsedData.timestamp,
        user: {
          avatar: parsedData.avatar,
          id: parsedData.from,
          username: parsedData.senderUsername,
        },
      };
      return [...prev, newConversationChannel];
    });
    setReload(true);
  };
  const updateIndividualConversation = (data: any) => {
    // console.log("data:", data);
    const parsedData = JSON.parse(String(data));
    setId(parsedData.from);

    setIndividual((prev: individualType[]) => {
      if (prev.length === 0) {
        const newIndividual = {
          message: parsedData.content,
          other: {
            avatar: parsedData.senderAvatar,
            id: parsedData.from,
            username: parsedData.senderUsername,
          },
          sender: parsedData.from,
          sentAt: parsedData.timestamp,
        };
        return [newIndividual];
      } else {
        const wanted = prev.find(
          (item: individualType) => item.other.id === parsedData.from
        );
        if (wanted) {
          const newIndividual = prev.map((item: individualType) => {
            if (item.other.id === parsedData.from) {
              return {
                message: parsedData.content,
                other: {
                  avatar: parsedData.senderAvatar,
                  id: parsedData.from,
                  username: parsedData.senderUsername,
                },
                sender: parsedData.from,
                sentAt: parsedData.timestamp,
              };
            } else return item;
          });
          return newIndividual;
        } else {
          const newIndividual = {
            message: parsedData.content,
            other: {
              avatar: parsedData.senderAvatar,
              id: parsedData.from,
              username: parsedData.senderUsername,
            },
            sender: parsedData.from,
            sentAt: parsedData.timestamp,
          };
          return [newIndividual, ...prev];
        }
      }
    });

    setIndividualConversation((prev: individualConversationType[]) => {
      const newIndividualConversation: individualConversationType = {
        sentAt: parsedData.timestamp,
        sender: parsedData.from,
        message: parsedData.content,
      };
      return [...prev, newIndividualConversation];
    });
  };

  const initializechatSocket = () => {
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
    // chatSocket.on("connect", () => {});
    if (!chatSocket.hasListeners("pm")) {
      chatSocket.on("pm", (data: any) => {
        updateIndividualConversation(data);
      });
    }
    if (!chatSocket.hasListeners("gm")) {
      chatSocket.on("gm", (data: any) => {
        updateChannelConversation(data);
      });
    }
    chatSocket.on("exception", (data:any) => {toast.error(data?.message ?? "Invalid Operation");
    console.log("exception", data)});
    // chatSocket.on("disconnect", (data: any) => console.log("disconnect"));
  };

  const fetchDataExploreChannel = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const twoFA = parseJwt(JSON.stringify(token));
    if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
      router.push("/signin");
      return;
    }
    if (open === true) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/room/explore`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExploreChannel(res.data);
      } catch (error: any) {}
    }
  };

  const fetchDataPrivateConversation = async () => {
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
      if (id && id !== "") {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API}/chat/individual/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: jwtToken.sub,
          },
        });
        setIndividualConversation(result.data);
      }
    } catch (error) {}
  };

  const fetchDataPrivateChatAll = async () => {
    if (router.query.id) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }
      const twoFA = parseJwt(JSON.stringify(token));
      if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
        router.push("/signin");
        return;
      }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/chat/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: twoFA.sub,
          },
        });
        setIndividual(res?.data?.individual);
        setReload(true);
        const returnedId = res.data?.individual.find(
          (items: any) => items.other.id === router.query.id
        );
        if (returnedId) {
          setId(returnedId.other.id);
        } else {
          if (router.query.id === parseJwt(token).sub) {
            setId(res?.data?.individual[0]?.other?.id);
          } else {
            const fromFriends: any = currentFriend.find(
              (items: any) => items.id === router.query.id
            );
            if (fromFriends) {
              setId(fromFriends.id);
            }
            setIndividual((prev: individualType[]) => {
              const newConv: individualType = {
                message: "",
                other: {
                  avatar: fromFriends.avatar,
                  id: fromFriends.id,
                  username: fromFriends.username,
                },
                sender: "",
                sentAt: "",
              };
              return [newConv, ...prev] as any;
            });
          }
        }
      } catch (error: any) {}
    }
  };

  const fetchDataChannelConversation = async () => {
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
      if (roomId && roomId !== "") {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API}/room/individual/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: roomId,
          },
        });
        result.data.messages.reverse();
        setConversationChannel(result.data.messages);
        setBlockedUsers(result?.data?.blockedUsers);
      }
    } catch (error) {}
  };

  const fetchDataChannelChatAll = async () => {
    if (router.query.id) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }
      const twoFA = parseJwt(JSON.stringify(token));
      if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
        router.push("/signin");
        return;
      }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/chat/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: twoFA.sub,
          },
        });
        setChannel(res?.data?.room);
        setReload(true);
        setRoomId(res?.data?.room[0]?.id);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchDataChannelConversation();
  }, [roomId]);

  useEffect(() => {
    fetchDataChannelChatAll();
    setIsLoaded(true);
  }, [router.query.id, router.isReady]);

  useEffect(() => {
    fetchDataPrivateChatAll();
    setIsLoaded(true);
  }, [router.query.id, router.isReady]);

  useEffect(() => {
    fetchDataPrivateConversation();
  }, [id]);

  useEffect(() => {
    fetchDataExploreChannel();
  }, [open]);
  useEffect(() => {
    initializechatSocket();
    return () => {
      chatSocket.removeAllListeners("gm");
      chatSocket.removeAllListeners("pm");
      chatSocket.off("gm");
      chatSocket.off("pm");
      chatSocket.off("exception");
      // chatSocket.off("exception", () => {});
      // chatSocket.off("connect", () => {});
    };
    // return () => {
    //   console.log("disconnected !!");
    //   chatSocket.off("connect");
    //   chatSocket.off("pm");
    //   chatSocket.off("gm");
    //   chatSocket.off("exception");
    //   chatSocket.disconnect();
    // };
  }, [chatSocket]);

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 md:space-x-3 space-x-0 flex justify-start md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row relative">
      <SideBar
        setOpenSubSideBar={setOpenSubSideBar}
        openSubSideBar={openSubSideBar}
        flag="messages"
      />
      {openSideBar && (
        <MobileSideBar
          setOpenSubSideBar={setOpenSubSideBar}
          openSubSideBar={openSubSideBar}
          flag="messages"
        />
      )}
      {openSubSideBar && (
        <div className="h-full md:w-[300px] sm:w-[250px] w-[200px] lg:hidden flex items-end absolute md:left-[90px] left-16 drop-shadow-2xl z-40">
          <div className="h-[91%] z-50 md:h-full flex flex-col rounded-l-2xl w-full">
            <MobileSubSideBar
              setOpenSubSideBar={setOpenSubSideBar}
              openSubSideBar={openSubSideBar}
              open={open}
              setOpen={setOpen}
              setFlag={setFlag}
              setIsIndividual={setIsIndividual}
              isIndividual={isIndividual}
              setRoomId={setRoomId}
              roomId={roomId}
              setId={setId}
              reload={reload}
              setReload={setReload}
              id={id}
              setIsLoaded={setIsLoaded}
              loaded={loaded}
            />
          </div>
        </div>
      )}
      <SubSideBar
        open={open}
        setOpen={setOpen}
        setFlag={setFlag}
        setIsIndividual={setIsIndividual}
        isIndividual={isIndividual}
        setRoomId={setRoomId}
        roomId={roomId}
        setId={setId}
        reload={reload}
        setReload={setReload}
        id={id}
        setIsLoaded={setIsLoaded}
        loaded={loaded}
      />
      {flag === "ExploreChannels" ? (
        <ExploreChannels
          open={open}
          setOpen={setOpen}
          error={error}
          errorMessage={errorMessage}
        />
      ) : flag === "CreateChannels" ? (
        <CreateChannels open={open} setOpen={setOpen} />
      ) : (
        <InviteFriends open={open} setOpen={setOpen} id={id} roomId={roomId} />
      )}
      <div className="w-full h-full">
        <NavBar
          open={openSideBar}
          setOpen={setOpenSideBar}
          setOpenSubSideBar={setOpenSubSideBar}
        />
        {isIndividual === "Individual" ? (
          <ConversationIndividual
            userId={userId}
            id={id}
            socket={chatSocket}
            setReload={setReload}
            reload={reload}
            openSubSideBar={openSubSideBar}
          />
        ) : (
          <ConversationChannel
            userId={userId}
            id={roomId}
            socket={chatSocket}
            setReload={setReload}
            reload={reload}
            openSubSideBar={openSubSideBar}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
