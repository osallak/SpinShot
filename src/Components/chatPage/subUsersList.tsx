"use client";
import channelType from "@/types/channelTypes";
import ip from "@/utils/endPoint";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import timeMute from "../../../public/timeMute.svg";
import { parseJwt } from "../../../redux_tool/extractToken";
import { channelAtom } from "../context/recoilContextChannel";

const SubUsersList = (props: {
  open: boolean;
  setOpen: Function;
  setClose: Function;
  type: string;
  name: string;
  content: any[];
  checkedID: string;
}) => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [timeOpen, setTimeOpen] = useState(false);

  const muteTime = [
    { content: "For 1 Hour", time: "3600000" },
    { content: "For 12 Hour", time: "43200000" },
    { content: "For 24 Hour", time: "86400000" },
  ];

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
    content: string,
    time?: string
  ) => {
    event.preventDefault();
    const type: any = channel.find(function (items: channelType) {
      if (items.id === props.name) {
        return items;
      }
    });
    if (content === "Kick") {
      try {
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
        const res = await axios.delete(
          `${ip}/room/kick/${props.name}/${props.checkedID}`,
          {
            params: {
              room: props.name,
              user: props.checkedID,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        props.setClose(false);
        toast.success("user kicked successfully");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    } else if (content === "Ban") {
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
        const res = await axios.patch(
          `${ip}/room/ban`,
          {
            name: props.name,
            userToBeBanned: props.checkedID,
            type: type?.type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        props.setClose(false);
        toast.success("user baned successfully");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    } else if (content === "Mute") {
      const params: any = {
        wannaBeMuted: {
          userId: props.checkedID,
          time: time,
          mutedAt: String(Date.now()),
        },
        name: props.name,
        type: type?.type,
      };
      try {
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
        const res = await axios.post(`${ip}/room/mute`, params, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        props.setClose(false);
        toast.success("user muted successfully");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    } else if (content === "Add as admin") {
      try {
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
        const res = await axios.patch(
          `${ip}/room/elevate`,
          { room: props.name, user: props.checkedID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        props.setClose(false);
        toast.success("the channel now has a new admin");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    } else if (content === "Leave") {
      try {
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
        const res = await axios.patch(
          `${ip}/room/leave`,
          { room: props.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        props.setClose(false);
        toast.success("you leave this channel");
      } catch (error: any) {
        setError(true);
        setErrorMessage(error?.response?.data);
      }
    }
  };

  const openTime = (event: MouseEvent<HTMLButtonElement>) => {
    setTimeOpen(!timeOpen);
  };

  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  return (
    <Dialog
      size="xs"
      open={props.open}
      handler={handleOpen}
      className=" bg-pearl outline-none ring-0"
    >
      <DialogHeader className="flex justify-end items-center py-2">
        <IconButton
          className="justify-end flex items-center"
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#260323"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="py-1">
        <div className="w-full flex md:space-y-5 sm:space-y-3 space-y-0">
          <div className="h-auto md:max-h-[500px] sm:max-h-[350px] max-h-[250px] w-[50%] overflow-auto flex items-center sm:flex-wrap flex-nowrap sm:flex-row flex-col py-3 space-y-2">
            {props.content.map((items, index) => (
              <div key={index} className="w-full">
                {items.content === "Leave" ? (
                  <button
                    onClick={(event) => handleClick(event, items.content)}
                    className="flex flex-row justify-start items-center"
                  >
                    <Image src={items.icon} alt={items.content}></Image>
                    <span className="font-Passion-One text-very-dark-purple font-semibold">
                      {items.content}
                    </span>
                  </button>
                ) : items.content === "Mute" ? (
                  <button
                    onClick={(event) => openTime(event)}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <div className="flex flex-row justify-center items-center">
                      <Image src={items.icon} alt={items.content}></Image>
                      <span className="font-Passion-One text-very-dark-purple font-semibold">
                        {items.content}
                      </span>
                    </div>
                    <Image src={timeMute} alt="timeMute"></Image>
                  </button>
                ) : (
                  <button
                    onClick={(event) => handleClick(event, items.content)}
                    className="flex flex-row justify-start items-center"
                  >
                    <Image src={items.icon} alt={items.content}></Image>
                    <span className="font-Passion-One text-very-dark-purple font-semibold">
                      {items.content}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          {timeOpen && (
            <div className="space-y-2 border border-black w-[50%] h-full flex items-center justify-center flex-col rounded-2xl bg-very-dark-purple">
              {muteTime.map((items, index) => (
                <button
                  key={index}
                  onClick={(event) => handleClick(event, "Mute", items.time)}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="font-Passion-One font-semibold text-pearl">
                    {items.content}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        {error && (
          <span className="font-poppins text-red-900 font-semibold text-base">
            {errorMessage}
          </span>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default SubUsersList;
