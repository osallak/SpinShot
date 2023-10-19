import SearchInput from "@/Components/ui/Inputs/searchInput";
import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import IconButton from "../ui/Buttons/iconButton";
import Channels from "./channels";
import Individual from "./individual";
import invite from "../../../public/invite.svg"

const SubSideBar = (props: {
  open: boolean;
  setOpen: Function;
  setFlag: Function;
  setIsIndividual: Function;
  isIndividual: string;
  setRoomId: Function;
  roomId: string;
  setId: Function;
  reload: boolean;
  setReload: Function;
  id: string;
  setIsLoaded: Function;
  loaded: boolean;
}) => {
  const [clicked, setClicked] = useState<number>();
  const [searchValue, setSearchValue] = useState("");

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const exploreChannels = () => {
    props.setFlag("ExploreChannels");
    props.setOpen(!props.open);
  };

  const createChannels = () => {
    props.setFlag("CreateChannels");
    props.setOpen(!props.open);
  };

  const inviteFriends = () => {
    props.setFlag("Invite");
    props.setOpen(!props.open);
  }

  const setIndividual = () => {
    props.setIsIndividual("Individual");
  };

  const setChannels = () => {
    props.setIsIndividual("Channels");
  };

  return (
    <div className="bg-white/10 h-full lg:flex hidden flex-col rounded-2xl w-[25%] min-w-[350px]">
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
            props.isIndividual === "Individual"
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
            props.isIndividual === "Channels"
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
      {props.isIndividual === "Channels" ? (
        <Channels
          searchValue={searchValue}
          loaded={props.loaded}
          setRoomId={props.setRoomId}
          roomId={props.roomId}
          reload={props.reload}
          setReload={props.setReload}
          setIsLoaded={props.setIsLoaded}
        />
      ) : (
        <Individual
          searchValue={searchValue}
          loaded={props.loaded}
          setId={props.setId}
          id={props.id}
          reload={props.reload}
          setReload={props.setReload}
          setIsLoaded={props.setIsLoaded}
        />
      )}
      <div className="flex flex-col justify-center items-center w-full h-[12%] min-h-[100px] space-y-2 ">
        <div className="flex justify-center items-center w-full px-2 h-10">
        <IconButton
          icon={invite}
          content="Invite Friend"
          onclick={inviteFriends}
        />
        </div>
        <div className="flex justify-around items-center w-full">
          <div className="w-[45%] h-10 flex justify-center items-center">
            <IconButton
              icon={CreateChannel}
              content="Create channel"
              onclick={createChannels}
            />
          </div>
          <div className="w-[45%] h-10 flex justify-center items-center">
            <IconButton
              icon={ExportChannels}
              content="Explore channels"
              onclick={exploreChannels}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSideBar;
