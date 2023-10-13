import SearchInput from "@/components/ui/Inputs/searchInput";
import allMessagesType from "@/types/messagesArrays";
import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import { chatAll } from "../context/recoilContext";
import IconButton from "../ui/buttons/iconButton";
import Channels from "./channels";
import Individual from "./individual";

const SubSideBar = (props: {
  open: boolean;
  setOpen: Function;
  setFlag: Function;
  loaded: boolean;
}) => {
  const [clicked, setClicked] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  const [allMessages, setAllMessages] = useRecoilState(chatAll);
  // const [responseExploreChannels, setResponseExploreChannels] = useState()

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const exploreChannels = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // try {
    //   const res = await axios.get(`http://e3r10p14.1337.ma:3001/room/all`, {
    //     headers: {
    //       Authorization: `Bearer ${ayoubToken}`
    //     }
    //   })
    //   console.log("response from explore channel: ", res.data);
    // } catch (error: any) {
    //   console.log("error from explore channel: ", error);
    // }
    props.setFlag("ExploreChannels");
    props.setOpen(!props.open);
  };

  const createChannels = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFlag("CreateChannels");
    props.setOpen(!props.open);
  };

  if (props.loaded === true)
    console.log("all Messages: ", allMessages as allMessagesType[]);
  const [chatPage, setChatPage] = useState("Individual");
  const setIndividual = () => {
    setChatPage("Individual");
  };
  const setChannels = () => {
    setChatPage("Channels");
  };
  return (
    <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl w-[25%] min-w-[350px]">
      <div className="flex justify-center items-center flex-col w-full h-[10%] md:min-h-[100px] min-h-[70px]">
        <div className="w-full h-full flex-col px-6">
          <div className="w-full  pt-5 flex flex-row space-x-3 h-full">
            <Image
              src={messagesIcon}
              alt="message icon"
              className=" h-full xl:w-10 w-9"
            />
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              Messages
            </h1>
          </div>
          <div className="w-full border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="w-full flex justify-center items-end h-[6%] min-h-[50px]">
        <div className="w-[90%] h-[45px] rounded-full">
          <SearchInput setValue={setSearchValue} />
        </div>
      </div>
      <div className="w-full h-[6%] min-h-[50px] flex flex-row items-center justify-center space-x-5">
        <div
          className={`flex justify-center items-center ${
            chatPage === "Individual"
              ? "border-b-2 border-pearl border-opacity-40"
              : "border-none"
          }`}
        >
          <motion.button
            onClick={setIndividual}
            whileTap={{ scale: 0.9 }}
            className="font-Passion-One text-pearl xl:text-2xl text-xl"
          >
            Individual
          </motion.button>
        </div>
        <div
          className={`flex justify-center items-center ${
            chatPage === "Channels"
              ? "border-b-2 border-pearl border-opacity-40"
              : "border-none"
          }`}
        >
          <motion.button
            onClick={setChannels}
            whileTap={{ scale: 0.9 }}
            className="font-Passion-One text-pearl xl:text-2xl text-xl"
          >
            Channels
          </motion.button>
        </div>
      </div>
      {chatPage === "Channels" && (
        <Channels searchValue={searchValue} loaded={props.loaded} />
      )}
      {chatPage === "Individual" && (
        <Individual searchValue={searchValue} loaded={props.loaded} />
      )}
      <div className="flex justify-around items-center w-full h-[10%] min-h-[60px]">
        <div className="w-[45%] h-10 flex justify-center items-center">
          {/* <IconButton
            icon={CreateChannel}
            content="Create channel"
            onclick={createChannels}
          /> */}
        </div>
        <div className="w-[45%] h-10 flex justify-center items-center">
          {/* <IconButton
            icon={ExportChannels}
            content="Explore channels"
            onclick={exploreChannels}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SubSideBar;
