import ChannelSettings from "@/Components/chatPage/channelSettings";
import { channelAtom } from "@/Components/context/recoilContextChannel";
import channelType from "@/types/channelTypes";
import ip from "@/utils/endPoint";
import axios from "axios";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import threePoint from "../../../../public/threePoint.svg";
import timeMute from "../../../../public/timeMute.svg";

const DropDownChannel: React.FC<any> = (props: {
  data: any;
  option?: string;
  setOption?: Function;
  userId?: string;
  id?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [mute, setMute] = useState(false);
  const [settings, setSettings] = useState(false);
  const muteTime = [
    { content: "For 1 Hour", time: "60" },
    { content: "For 12 Hour", time: "720" },
    { content: "For 24 Hour", time: "1440" },
  ];

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!isOpen);
  };

  const openMuteDropDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMute(!mute);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleUsers = async (
    event: MouseEvent<HTMLButtonElement>,
    content: string,
    time?: string
  ) => {
    event.preventDefault();
    const type: any = channel.find(function (items: channelType) {
      if (items.id === props.id) {
        return items;
      }
    });
    if (content === "Kick") {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API}/room/kick/${props.id}/${props.userId}`,
          {
            params: {
              room: props.id,
              user: props.userId,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("result from delete axios: ", res);
      } catch (error: any) {
        // console.log("error from kick someone in rooms: ", error);
      }
    } else if (content === "Ban") {
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API}/room/ban`,
          { name: props.id, userToBeBanned: props.userId, type: type?.type },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("res from ban: ", res);
      } catch (error: any) {
        // console.log("error from ban : ", error);
      }
    } else if (content === "Mute") {
      const params: any = {
        wannaBeMuted: {
          userId: props.userId,
          time: time,
          mutedAt: String(Date.now()),
        },
        name: props.id,
        type: type?.type,
      };
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/room/mute`, params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("res from mute: ", res);
      } catch (error: any) {
        // console.log("error from mute: ", error);
      }
    } else if (content === "Add as admin") {
      try {
        // console.log("here");
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API}/room/elevate`,
          { room: props.id, user: props.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("res from add as admin: ", res);
      } catch (error: any) {
        // console.log("error from add as admin: ", error);
      }
    } else if (content === "Leave") {
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API}/room/leave`,
          { room: props.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("res from leave: ", res);
      } catch (error: any) {
        // console.log("error from leave: ", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        closeDropdown();
      }
    };

    const handleEscape = (event: any) => {
      if (event.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {settings && (
        <ChannelSettings open={settings} setOpen={setSettings} id={props.id} />
      )}
      <button
        className="inline-flex h-10 items-center text-center focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        <Image src={threePoint} alt="threepoint" className="lg:w-9 md:w-8 sm:w-7 w-6"></Image>
      </button>
      {isOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="z-10 md:p-3 sm:p-2 p-1 right-3  bg-very-dark-purple absolute rounded-l-2xl rounded-b-2xl md:w-[230px] w-[170px]"
        >
          {props.data.map((content: any, index: number) => (
            <div key={index}>
              {content.content !== "Mute" && content.content !== "Settings" ? (
                <button
                  onClick={(event) => handleUsers(event, content.content)}
                  className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
                >
                  <Image
                    src={content.icon}
                    alt="add"
                    className="md:w-[26px] w-[20px]"
                  />
                  <span>{content.content}</span>
                </button>
              ) : content.content === "Mute" ? (
                <div className="relative z-20">
                  <button
                    onClick={openMuteDropDown}
                    key={index}
                    className="flex justify-between opacity-40 w-full hover:opacity-100 space-x-2 items-between px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
                  >
                    <div className="flex space-x-2">
                      <Image
                        src={content.icon}
                        alt="add"
                        className="md:w-[26px] w-[20px]"
                      />
                      <span>{content.content}</span>
                    </div>
                    <div className="flex justify-center items-center h-full">
                      <Image src={timeMute} alt="timeMute" />
                    </div>
                  </button>
                  {mute && (
                    <div className="z-30 md:p-3 sm:p-2 p-1 left-56 top-10 bg-very-dark-purple absolute rounded-r-2xl rounded-b-2xl md:w-[230px] w-[170px]">
                      {muteTime.map((items: any, index: number) => (
                        <button
                          onClick={(event) =>
                            handleUsers(event, content.content, items.time)
                          }
                          key={index}
                          className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
                        >
                          <span>{items.content}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setSettings(true)}
                  key={index}
                  className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
                >
                  <Image
                    src={content.icon}
                    alt="add"
                    className="md:w-[26px] w-[20px]"
                  />
                  <span>{content.content}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownChannel;
