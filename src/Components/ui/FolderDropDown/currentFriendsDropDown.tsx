"use client";
import { currentFriendsAtom } from "@/Components/context/recoilContext";
import dataFriends from "@/types/friendsType";
import ip from "@/utils/endPoint";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import block from "../../../../public/block.svg";
import game from "../../../../public/game.svg";
import newMessage from "../../../../public/newMessage.svg";
import threePoint from "../../../../public/threePoint.svg";
import unfriend from "../../../../public/unfriend.svg";
import toast from "react-hot-toast";

const CurrentFriendsDropDown = (props: { id: string }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [currentFriends, setCurrentFriends] =
    useRecoilState(currentFriendsAtom);

  const Router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!isOpen);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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

  const handleBlock = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/signin");
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/friends/${props.id}/block`,
        { id: props.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentFriends((prev: any) => {
        const newArray = prev.map((item: dataFriends) => item.id !== props.id);
        return newArray;
      });
			toast.success(res?.data?.message);
    } catch (error: any) {
			toast.error(error?.data?.message);
		}
  };
  const handleUnfriend = async () => {
		const token = localStorage.getItem("token");
    if (!token) {
			Router.push("/signin");
      return;
    }
    try {
			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API}/friends/${props.id}/unfriend`,
        { id: props.id },
        {
					headers: {
						Authorization: `Bearer ${token}`,
          },
        }
				);
				setCurrentFriends((prev: any) => {
					const newArray = prev.map((item: dataFriends) => item.id !== props.id);
					return newArray;
				});
				toast.success(res?.data?.message);
			} catch (error: any) {
			toast.success(error?.data?.message);
    }
  };

  const handleSendNewMessage = () => {
    Router.push(`/messages/${props.id}`);
  };

  return (
    <div ref={ref} className="relative">
      <button
        className="inline-flex h-10 items-center text-center focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        <Image src={threePoint} alt="threepoint"></Image>
      </button>
      {isOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="z-10 md:p-3 sm:p-2 p-1 right-3  bg-very-dark-purple absolute rounded-l-2xl rounded-b-2xl md:w-[230px] w-[170px]"
        >
          <button
            onClick={() => handleSendNewMessage()}
            className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
          >
            <Image
              src={newMessage}
              alt="add"
              className="md:w-[26px] w-[20px]"
            />
            <span>Message</span>
          </button>
          <button
            onClick={() => handleBlock()}
            className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
          >
            <Image src={block} alt="add" className="md:w-[26px] w-[20px]" />
            <span>Block</span>
          </button>
          <button
            onClick={() => handleUnfriend()}
            className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
          >
            <Image src={unfriend} alt="add" className="md:w-[26px] w-[20px]" />
            <span>Unfriend</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentFriendsDropDown;
