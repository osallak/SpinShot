"use client";
import SideBar from "@/Components/ui/folderSidebar/sideBar";
import ip from "@/utils/endPoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { exploreChannelAtom } from "../context/recoilContext";
import NavBar from "../ui/FolderNavbar/navBar";
import MobileSideBar from "../ui/folderSidebar/mobileSideBar";
import ConversationChannel from "./conversationChannel";
import ConversationIndividual from "./conversationIndividual";
import CreateChannels from "./createChannels";
import ExploreChannels from "./exploreChannels";
import InviteFriends from "./inviteFriends";
import MobileSubSideBar from "./mobileSubSideBar";
import SubSideBar from "./subSideBar";

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
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSubSideBar, setOpenSubSideBar] = useState(false);

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
      } catch (error: any) {}
    }
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    socket = io(`${ip}`, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", () => console.log("connected"));
    socket.on("pm", (data: any) => {
      setReload(true);
    });
    socket.on("gm", (data: any) => {
      setReload(true);
    });
    socket.on("exception", (data: any) => console.log("exception"));
    socket.on("disconnect", (data: any) => console.log("disconnect"));
  }, []);

  useEffect(() => {
    fetchDataExploreChannel();
  }, [open]);

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
        <div className="bg-very-dark-purple h-[91%] z-50 md:h-full flex flex-col rounded-l-2xl w-full">
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
        <NavBar open={openSideBar} setOpen={setOpenSideBar} setOpenSubSideBar={setOpenSubSideBar} />
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
