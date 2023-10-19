import ip from "@/utils/endPoint";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from "react";
import admin from "../../../public/adminIcon.svg";
import ban from "../../../public/banIcon.svg";
import kick from "../../../public/kickIcon.svg";
import { useRecoilState } from "recoil";
import channelType from "@/types/channelTypes";
import { channelAtom } from "../context/recoilContextChannel";
import mute from "../../../public/muteIcon.svg";
import timeMute from "../../../public/timeMute.svg";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const SubUsersList = (props: {
  open: boolean;
  setOpen: Function;
  setClose: Function;
  type: string;
  name: string | undefined;
  userId: string;
  checkedID: string;
}) => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [content, setContent] = useState<any[]>([]);
  const [timeOpen, setTimeOpen] = useState(false);
  // const [checkedId, setCheckedId] = useState("");
  function closeModal() {
    // props.setOpen(false);
  }

  const muteTime = [
    { content: "For 1 Hour", time: "60" },
    { content: "For 12 Hour", time: "720" },
    { content: "For 24 Hour", time: "1440" },
  ];

  useEffect(() => {
    if (props.userId !== props.checkedID) {
      setContent([
        { content: "Mute", icon: mute },
        { content: "Kick", icon: kick },
        { content: "Ban", icon: ban },
        { content: "Add as admin", icon: admin },
      ]);
    } else {
      setContent([{ content: "Leave", icon: kick }]);
    }
  }, []);

  console.log("here the content: ", props.checkedID);

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
        const res = await axios.delete(
          `${ip}/room/kick/${props.name}/${props.checkedID}`,
          {
            params: {
              room: props.name,
              user: props.checkedID,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.setClose(false);
        console.log("result from delete axios: ", res);
      } catch (error: any) {
        console.log("error from kick someone in rooms: ", error);
      }
    } else if (content === "Ban") {
      try {
        const res = await axios.patch(
          `${ip}/room/ban`,
          { name: props.name, userToBeBanned: props.checkedID, type: type?.type },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.setClose(false);
        console.log("res from ban: ", res);
      } catch (error: any) {
        console.log("error from ban : ", error);
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
        const res = await axios.post(`${ip}/room/mute`, params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        props.setClose(false);
        console.log("res from mute: ", res);
      } catch (error: any) {
        console.log("error from mute: ", error);
      }
    } else if (content === "Add as admin") {
      try {
        const res = await axios.patch(
          `${ip}/room/elevate`,
          { room: props.name, user: props.checkedID },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.setClose(false);
        console.log("res from add as admin: ", res);
      } catch (error: any) {
        console.log("error from add as admin: ", error);
      }
    } else if (content === "Leave") {
      try {
        const res = await axios.patch(
          `${ip}/room/leave`,
          { room: props.name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.setClose(false);
        console.log("res from leave: ", res);
      } catch (error: any) {
        console.log("error from leave: ", error);
      }
    }
  };

  const openTime = (event: MouseEvent<HTMLButtonElement>) => {
    setTimeOpen(!timeOpen)
  }

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleOpen = () => props.setOpen(!props.open);

  return (
    <Dialog
      size="xs"
      open={props.open}
      handler={handleOpen}
      className=" bg-pearl outline-none ring-0"
    >
      <DialogBody>
        <div className="w-full flex md:space-y-5 sm:space-y-3 space-y-0">
          <div className="h-auto md:max-h-[500px] sm:max-h-[350px] max-h-[250px] w-[50%] overflow-auto flex items-center sm:flex-wrap flex-nowrap sm:flex-row flex-col py-3 space-y-2">
            {content.map((items, index) => (
              <div className="w-full">
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
          {timeOpen && 
            <div className="space-y-2 border border-black w-[50%] h-full flex items-center justify-center flex-col rounded-2xl bg-very-dark-purple">
              {muteTime.map((items, index) => (
                <button key={index} onClick={(event) => handleClick(event, "Mute", items.time)} className="flex flex-col justify-center items-center">
                  <span className="font-Passion-One font-semibold text-pearl">{items.content}</span>
                </button>
              ))}
            </div>
          }
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default SubUsersList;
