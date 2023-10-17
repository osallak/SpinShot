import { Select, Option } from "@material-tailwind/react";
import threePoint from "../../../../public/threePoint.svg";
import threePointforPeridot from "../../../../public/threePointforPeridot.svg";
import Image from "next/image";
import { useState, MouseEvent, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { channelAtom } from "@/Components/context/recoilContextChannel";
import axios from "axios";
import ip from "@/utils/endPoint";
import { headers } from "next/dist/client/components/headers";
import channelType from "@/types/channelTypes";

const DropDownChannel: React.FC<any> = (props: {
  data: any;
  option: string;
  setOption: Function;
  userId: string;
  id: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [channel, setChannel] = useRecoilState(channelAtom);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!isOpen);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleUsers = async (
    event: MouseEvent<HTMLButtonElement>,
    content: string
  ) => {
    event.preventDefault();
    const type: any = channel.find(function(items: channelType){
      if (items.id === props.id) {
        return items;
      }
    })
    if (content === "Kick") {
      try {
        const res = await axios.delete(
          `${ip}/room/kick/${props.id}/${props.userId}`,
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
        console.log("result from delete axios: ", res);
      } catch (error: any) {
        console.log("error from kick someone in rooms: ", error);
      }
    } else if (content === "Ban") {
      try {
        const res = await axios.patch(`${ip}/room/ban`, {
          params: {
            name: props.id,
            userToBeBanned: props.userId,
            type: type?.type
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("res from ban axios: ", res);
      } catch (error: any) {
        console.log("error from ban axios: ", error);
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
      <button
        className="inline-flex h-10 items-center text-center focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        {props.id === props.userId ? (
          <Image src={threePoint} alt="threepoint"></Image>
        ) : (
          <Image src={threePointforPeridot} alt="threepoint"></Image>
        )}
      </button>
      {isOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="z-10 md:p-3 sm:p-2 p-1 right-3  bg-very-dark-purple absolute rounded-l-2xl rounded-b-2xl md:w-[230px] w-[170px]"
        >
          {props.data.map((content: any, index: number) => (
            <button
              onClick={(event) => handleUsers(event, content.content)}
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
          ))}
        </div>
      )}
    </div>
  );
};
export default DropDownChannel;
