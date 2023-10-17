"use client";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { chatAll, currentFriendsAtom, exploreChannelAtom } from "../context/recoilContext";
import { channelAtom } from "../context/recoilContextChannel";
import { individualAtom } from "../context/recoilContextIndividual";
import NavBar from "../ui/FolderNavbar/navBar";
import MobileSideBar from "../ui/folderSidebar/mobileSideBar";
import ConversationChannel from "./conversationChannel";
import ConversationIndividual from "./conversationIndividual";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import SubSideBar from "./subSideBar";
import individualType from "@/types/individulaTypes";

let socket: any;
let token: any;
const Chat = () => {
  const router = useRouter();
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
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [reload, setReload] = useState(false);
  const [currentFriend, setCurrentFriends] = useRecoilState(currentFriendsAtom)

  // const fetchDataSubSideBar = async () => {
  //   if (router.query.id) {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router.push("/signin");
  //       return;
  //     }
  //     const jwtToken = parseJwt(token);
  //     try {
  //       const res = await axios.get(`${ip}/chat/all`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           id: jwtToken.sub,
  //         },
  //       });
  //       setIndividual(res?.data?.individual);
  //       setChannel(res?.data?.room);
  //       setReload(true)
  //       const returnedId = res.data?.individual.find(
  //         (items: any) => items.other.id === router.query.id
  //       );
  //       if (returnedId) setId(returnedId.other.id);
  //       else {
  //         if (router.query.id === parseJwt(token).sub) {
  //           setId(res?.data?.individual[0]?.other?.id);
  //         } else {
  //           const fromFriends : any = currentFriend.find((items: any) => (
  //             items.id === router.query.id
  //           ))
  //           if (fromFriends) setId(fromFriends.id)
  //           setIndividual((prev : individualType[] ) => {
  //             const newConv : individualType = {
  //                 message : "",
  //                 other : {
  //                   avatar : fromFriends.avatar,
  //                   id : fromFriends.id,
  //                   username : fromFriends.username
  //                 },
  //                 sender : "",
  //                 sentAt : ""
  //             }
  //             return [newConv, ...prev] as any
  //           })
  //         }
  //       }
  //       setRoomId(res?.data?.room[0]?.id);
  //     } catch (error) {
  //       // console.log("error of fetching data from subsidebar: ", error);
  //     }
  //   }
  // };

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
        console.log("error from explore channel: ", error);
      }
    }
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    socket = io(`${ip}`, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", () => console.log("connected"));
    socket.on("pm", (data: any) => {
      setReload(true);
      console.log("hello there from socket event");
    });
    socket.on("gm", (data: any) => {
      setReload(true);
      console.log("hello there from socket event of channels: ", data);
    });
    socket.on("exception", (data: any) =>
      console.log("exception of socket event: ", data)
    );
    socket.on("disconnect", (data: any) => console.log(data));
  }, []);

  // useEffect(() => {
  //   fetchDataSubSideBar();
  //   setIsLoaded(true);
  // }, [router.query.id, router.isReady]);

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
        setRoomId={setRoomId}
        roomId={roomId}
        setId={setId}
        reload={reload}
        setReload={setReload}
        id={id}
        setIsLoaded={setIsLoaded}
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
          <ConversationIndividual
            userName={"three"}
            id={id}
            socket={socket}
            setReload={setReload}
            reload={reload}
          />
        ) : (
          <ConversationChannel
            userName={"three"}
            id={roomId}
            socket={socket}
            setReload={setReload}
            reload={reload}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
