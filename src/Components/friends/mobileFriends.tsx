import Image from "next/image";
import FriendsIcon from "../../../public/friend.svg";
import test1 from "../../../public/test1.svg";

import SimpleButton from "../ui/buttons/simpleButton";
import { useState } from "react";
import { motion } from "framer-motion";
import EmptyButton from "../ui/buttons/emptyButton";
import ContentMyFriends from "./contentMyFriends";
import ContentFriendsRequests from "./contentFriendsRequest";

const MobileCurrentFriends = () => {
  const [friendPage, setFriendPage] = useState("myFriend");

  const myFriendsChange = () => {
    setFriendPage("myFriend");
  };

  const friendsRequestChange = () => {
    setFriendPage("friendsRequest");
  };

  return (
    <div className="w-full h-[91%] md:pt-0 pt-1 md:px-0 px-2 md:pb-0 pb-2 flex">
      <div className="w-full h-full rounded-xl bg-white/10 flex md:hidden justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[70px]">
          <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="w-[80%] flex flex-row justify-start items-center space-x-3 h-full">
              <Image
                src={FriendsIcon}
                alt="message icon"
                className=" h-full xl:w-10 w-9"
              />
              <h1 className="flex  justify-center items-center font-Poppins text-pearl text-xl font-bold h-full">
                Friends
              </h1>
            </div>
            <div className="w-[93%] border border-pearl border-opacity-40"></div>
          </div>
        </div>
        <div className="w-[85%] h-[10%] min-h-[60px] flex flex-row items-center space-x-5">
          <div
            className={`flex justify-center items-center ${
              friendPage === "myFriend"
                ? "border-b-2 border-pearl border-opacity-40"
                : "border-none"
            }`}
          >
            <motion.button
              onClick={myFriendsChange}
              whileTap={{ scale: 0.9 }}
              className="font-Passion-One text-pearl xs:text-base text-sm"
            >
              My Friends
            </motion.button>
          </div>
          <div
            className={`flex justify-center items-center ${
              friendPage === "friendsRequest"
                ? "border-b-2 border-pearl border-opacity-40"
                : "border-none"
            }`}
          >
            <motion.button
              onClick={friendsRequestChange}
              whileTap={{ scale: 0.9 }}
              className="font-Passion-One text-pearl xs:text-base text-sm"
            >
              Friend Requests
            </motion.button>
          </div>
        </div>
        {friendPage === "myFriend" && <ContentMyFriends />}
        {friendPage === "friendsRequest" && <ContentFriendsRequests />}
      </div>
    </div>
  );
};

export default MobileCurrentFriends;
