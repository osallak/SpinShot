import chatMenu from "../../../../public/chatmenu.svg";
import React, { useContext, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import ip from "@/utils/endPoint";
import toast from "react-hot-toast";
import { SocketContext } from "@/context/socket.context";

const DropdownUser = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const Array = props.Array;
  const router = useRouter();

  const sendInvitation = async () => {
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
      console.log(router.query.id);
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/friends/add/${router.query.id}`,
        null,
        {
          params: {
            userId: router.query.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("user invited successfully");
    } catch (error: any) {
      console.log(error.response);
      if (error.response.status == 409) {
        toast.error("user already invited");
      } else if (error.response.status == 403) {
        toast.error("user already friend");
      }
    }
  };

  const blockUser = async () => {
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
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/friends/${router.query.id}/block`,
        {
          userId: router.query.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("user blocked successfully");
    } catch (error: any) {
      if (error.response.status == 403) {
        toast.error("user already blocked");
      }
    }
  };

  const unBlockUser = async () => {
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
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/friends/${router.query.id}/unblock`,
        {
          userId: router.query.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("user unblocked successfully");
    } catch (error: any) {
      if (error.response.status == 400) {
        toast.error("user already unblocked");
      }
    }
  };

  const {chatSocket, socket} = useContext(SocketContext);

  const handleSignout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/2fa/signOut`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error: any) {
    }
  }

  const HandleState = (name: any) => {
    if (name == "Sign out") {
      handleSignout()
      chatSocket?.disconnect();
      socket?.disconnect();
      localStorage.removeItem("token");
      router.push("/signin");
    } else {
      if (name == "Invite to channel") {
        props.setInvite(true);
        console.log("Invite to channel");
      } else if (name == "Invite") {
        console.log(name);
        sendInvitation();
        console.log("Invite");
      } else if (name == "Block") {
        blockUser();
        console.log("Block");
      } else if (name == "Unblock") {
        unBlockUser();
        console.log("Unblock");
      }
    }
  };

  return (
    <div className=" font-sans box-border  inline-block ">
      <div className=" bg-cover flex justify-end relativ">
        <button
          className="py-2 px-4    cursor-pointer rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={chatMenu} alt="" />
        </button>
        {isOpen && (
          <div className=" absolute my-11 mx-8 w-60 bg-very-dark-purple  rounded-l-[20px] rounded-b-[20px] p-2">
            {Array.map((option: any, index: number) => (
              <div key={index} className={` `}>
                <button className="  " onClick={() => HandleState(option.name)}>
                  <div className="p-2 space-x-3 px-4 flex opacity-40 w-full text-pearl hover:opacity-100">
                    <Image src={option.icon} alt="" />
                    <span> {option.name} </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownUser;
