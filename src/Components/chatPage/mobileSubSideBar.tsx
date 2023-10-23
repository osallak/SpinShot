"use client";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import invite from "../../../public/invite.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import IconButton from "../ui/Buttons/iconButton";
import Channels from "./channels";
import Individual from "./individual";

const MobileSubSideBar = (props: {
  setOpenSubSideBar: Function;
  openSubSideBar: boolean;
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
  const [searchValue, setSearchValue] = useState("");

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
  };

  const setIndividual = () => {
    props.setIsIndividual("Individual");
  };

  const setChannels = () => {
    props.setIsIndividual("Channels");
  };

  return (
    <div
      className={`h-full w-full md:pl-3 md:pt-3 md:pb-3 sm:pt-1 sm:pl-2 pl-1 pt-1 pb-2`}
    >
      <div className="h-full w-full bg-white/10 flex flex-col rounded-l-2xl">
        <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[70px] ">
          <div className="w-full h-full flex-col lg:px-6 md:px-4 px-2">
            <button
              onClick={() => props.setOpenSubSideBar(false)}
              className=" w-full h-[30%] flex justify-end items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full flex items-center flex-row space-x-3 h-[70%] ">
              <Image
                src={messagesIcon}
                alt="message icon"
                className=" h-full lg:w-7 w-6"
              />
              <h1 className="flex  justify-center items-center font-Poppins text-pearl lg:text-xl md:text-lg text-base font-bold h-full">
                Messages
              </h1>
            </div>
            <div className="w-full border border-pearl border-opacity-40"></div>
          </div>
        </div>
        <div className="w-full flex justify-center items-end h-[6%] min-h-[50px]">
          <div className="w-[98%] h-[35px] rounded-full">
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
              className="font-Passion-One text-pearl lg:text-xl text-lg"
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
              className="font-Passion-One text-pearl lg:text-xl text-lg"
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
          <div className="flex justify-center items-center w-full lg:px-2 md:px-1 px-0 lg:h-8 h-7">
            <IconButton
              icon={invite}
              content="Invite Friend"
              onclick={inviteFriends}
            />
          </div>
          <div className="flex justify-around items-center w-full space-x-1">
            <div className="w-[50%] lg:h-8 h-7 flex justify-center items-center">
              <IconButton
                icon={CreateChannel}
                content="Create channel"
                onclick={createChannels}
              />
            </div>
            <div className="w-[50%] lg:h-8 h-7 flex justify-center items-center">
              <IconButton
                icon={ExportChannels}
                content="Explore channels"
                onclick={exploreChannels}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSubSideBar;
