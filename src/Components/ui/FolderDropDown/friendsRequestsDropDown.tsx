import { Select, Option } from "@material-tailwind/react";
import threePoint from "../../../../public/threePoint.svg";
import Image from "next/image";
import {
  useState,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import ip from "@/utils/endPoint";
import accept from "../../../../public/active.svg";
import refuse from "../../../../public/unactive.svg";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { friendRequestsAtom, currentFriendsAtom } from "@/components/context/recoilContext";
import dataFriends from "@/types/friendsType";

const FriendRequestsDropDown = (props: { id: string }) => {
  const [isOpen, setOpen] = useState(false);
  const [friends, setFriends] = useRecoilState(friendRequestsAtom);
  const [friendStatus, setFriendStatus] = useRecoilState(currentFriendsAtom);

  const ref = useRef<HTMLDivElement>(null);
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

  const handleAccept = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/signin");
      return ;
    }
    // console.log("id from handle accept: ", props.id);
    const jwtToken = parseJwt(JSON.stringify(token));
    try {
      const res = await axios.put(`${ip}/friends/${props.id}/accept`, {id: props.id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response from accept button: ", res);
      setFriends((prev :  any) => {
        const newArray = prev.map((item: dataFriends) => item.id != props.id);
        return newArray;
      })
      // console.log("response from handle accept : ", res);
    } catch (error: any) {
      console.log("error from accept a friend request: ", error);
    }
  };

  const handleRefuse = async () => {
    const token = localStorage.getItem("token");
    // console.log("id from handle refuse: ", props.id);
    const jwtToken = parseJwt(JSON.stringify(token));
    try {
      const res = await axios.put(`${ip}/friends/${props.id}/reject`, {id: props.id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends((prev :  any) => {
        const newArray = prev.map((item: dataFriends) => item.id != props.id);
        return newArray;
      })
      // console.log("response from handle refuse : ", res);
    } catch (error: any) {
      console.log("error from refuse a friend request: ", error);
    }
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
            onClick={() => handleAccept()}
            className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
          >
            <Image src={accept} alt="add" className="md:w-[26px] w-[20px]" />
            <span>Accept</span>
          </button>
          <button
            onClick={() => handleRefuse()}
            className="flex justify-start opacity-40 hover:opacity-100 space-x-2 items-center px-4 py-2 cursor-pointer text-pearl md:text-lg text-xs font-Passion-One"
          >
            <Image src={refuse} alt="add" className="md:w-[26px] w-[20px]" />
            <span>Refuse</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendRequestsDropDown;
