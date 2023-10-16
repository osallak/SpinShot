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

  const fetchDataSubSideBar = async () => {
    const token = localStorage.getItem("token");
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
        console.log("error from explore channel: ", error);
      }
    }
  };

  useEffect(() => {
    fetchDataSubSideBar();
    setIsLoaded(true);
  });

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
