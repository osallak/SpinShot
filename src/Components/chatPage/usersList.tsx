// import { Dialog, Transition } from "@headlessui/react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import Image from "next/image";
// import eye from "../../../public/eye.svg";
// import eyeSlash from "../../../public/eye-slash.svg";
// import { ChangeEvent, Fragment, useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { channelAtom } from "../context/recoilContextChannel";
// import { usersListAtom } from "../context/recoilContextChannel";
// import { usersListType } from "@/types/channelTypes";
// import leave from "../../../public/kickIcon.svg";
// import ip from "@/utils/endPoint";
// import DropDownChannel from "../ui/FolderDropDown/DropDownChannel";
// import { roomContent } from "@/utils/dropDownContent";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import threePoint from "../../../public/threePoint.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usersListType } from "@/types/channelTypes";
import { useRecoilState } from "recoil";
import { channelAtom } from "../context/recoilContextChannel";
import { useRouter } from "next/router";
import SubUsersList from "./subUsersList";
import admin from "../../../public/adminIcon.svg";
import ban from "../../../public/banIcon.svg";
import kick from "../../../public/kickIcon.svg";
import mute from "../../../public/muteIcon.svg";

export default function UsersList(props: {
  open: boolean;
  setOpen: Function;
  id: string;
  data: usersListType[];
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [subOpen, setSubOpen] = useState(false);
  const [checkedId, setCheckedId] = useState("");
  const [content, setContent] = useState<any[]>([]);
  const router = useRouter();

  const goToUser = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  const getTypeOfChannel = () => {
    channel.find((items: any) => {
      if (items.id === props.id) {
        setType(items.type);
      }
    });
  };

  const handleSubOpen = (check: string, userId: string) => {
    props.data.find((items: usersListType) => {
      if (items.userId === userId)
        setCheckedId(items.userId);
    })
    if (check === "my") {
      setContent([{ content: "Leave", icon: kick}])
    } else {
      setContent([
        { content: "Mute", icon: mute },
        { content: "Kick", icon: kick },
        { content: "Ban", icon: ban },
        { content: "Add as admin", icon: admin },
      ]);
    }
    setSubOpen(true);
  }
  
  useEffect(() => {
    getTypeOfChannel();
  }, []);
  

  const handleOpen = () => {
    props.setOpen(true)
  }

  return (
    <>
      {subOpen && (
        <SubUsersList
          open={subOpen}
          setOpen={setSubOpen}
          setClose={props.setOpen}
          type={type}
          name={props.id}
          content={content}
          checkedID={checkedId}
        />
      )}
      <Dialog
        size="lg"
        open={props.open}
        handler={handleOpen}
        className=" bg-pearl"
      >
        <DialogHeader className="flex justify-center items-center text-very-dark-purple font-poppins font-semibold">
          Members
        </DialogHeader>
        <DialogBody>
          <div className="w-full  md:space-y-5 sm:space-y-3 space-y-0">
            <div className="h-auto md:max-h-[500px] sm:max-h-[350px] max-h-[250px] overflow-auto flex items-center sm:flex-wrap flex-nowrap sm:flex-row flex-col py-3 ">
              {(props.data as usersListType[]).map(
                (items: usersListType, index: number) => (
                  <div
                    key={index}
                    className="sm:w-1/2 w-full flex justify-center items-center lg:px-3 sm:px-2 px-1 md:py-5 sm:py-4 py-2"
                  >
                    <div className="bg-very-dark-purple w-full md:h-24 sm:h-20 h-16 md:rounded-[30px] sm:rounded-2xl rounded-xl flex items-center justify-between md:pl-4 sm:pl-3 pl-2">
                      <div className="flex flex-row justify-center items-center lg:space-x-2 space-x-1">
                        <button
                          onClick={() => goToUser(items.userId)}
                          className="md:w-14 sm:w-12 w-10 flex justify-center items-center rounded-xl"
                        >
                          <Image
                            src={items.User.avatar}
                            alt="avatar"
                            width={500}
                            height={500}
                            className="w-full h-full rounded-xl"
                          />
                        </button>
                        <div className="h-full flex flex-col items-start justify-center">
                          <button
                            onClick={() => goToUser(items.userId)}
                            className="outline-none ring-0"
                          >
                            <span className="font-poppins text-pearl md:text-lg sm:text-base text-sm">
                              {items.User.username}
                            </span>
                          </button>
                          <div className="flex flex-row justify-center items-center md:space-x-2 space-x-1">
                            <span className="font-poppins text-pearl text-opacity-40 font-thin md:text-base sm:text-sm text-xs">
                              {items.userRole}
                            </span>
                            {items.userStatus && (
                              <span className="font-poppins text-pearl text-opacity-40 font-thin md:text-base sm:text-sm text-xs">
                                {items.userStatus}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="h-full flex justify-center items-center md:pr-4 sm:pr-3 pr-2">
                        {props.userId === items.userId ? <button
                          onClick={() => handleSubOpen("my", items.userId)}
                          className="outline-none ring-0"
                        >
                          <Image
                            src={threePoint}
                            alt="three point"
                            className="md:w-8 sm:w-6 w-5"
                          ></Image>
                        </button> : <button
                          onClick={() => handleSubOpen("other", items.userId)}
                          className="outline-none ring-0"
                        >
                          <Image
                            src={threePoint}
                            alt="three point"
                            className="md:w-8 sm:w-6 w-5"
                          ></Image>
                        </button>}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => props.setOpen(false)}
            className="bg-peridot rounded-full w-20"
          >
            <span className="font-Passion-One text-very-dark-purple font-bold">
              Exit
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
