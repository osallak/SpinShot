import dataFriends from "@/types/friendsType";
import ip from "@/utils/endPoint";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import test1 from "../../../public/test1.svg";
import FriendRequestsDropDown from "../ui/dropDown/friendsRequestsDropDown";

const ContentFriendsRequests = () => {
  const [response, setResponse] = useState<dataFriends[]>([]);
  const Router = useRouter();

  const handleClick = () => {
    console.log("hello world from the other side");
  };

  const goToUser = (username: string) => {
    Router.push(`/profile/${username}`);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/signin");
      return;
    }
    try {
      const res = await axios.get(`${ip}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "PENDING",
        },
      });
      setResponse(res.data.data);
    } catch (error: any) {
      console.log("error from friends: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-[85%] h-[10%] min-h-[60px] flex-col">
        <h1 className="flex justify-start items-center font-Poppins text-pearl lg:text-3xl md:text-2xl text-base font-bold h-full">
          7 Friend Requests
        </h1>
      </div>
      <div className="h-[70%] flex flex-col items-center min-h-[150px] w-[95%] overflow-auto rounded-sm">
        {response.map((items, index) => (
          <div key={index} className="w-full h-[60px] min-h-[60px]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[50%] h-full flex justify-start items-center space-x-2">
                <Image
                  onClick={() => goToUser(items.username)}
                  src={test1}
                  alt="avatar"
                  className="xl:w-16 md:w-14 w-10 cursor-pointer"
                />
                <div className="h-[70%] flex justify-center flex-col">
                  <p
                    onClick={() => goToUser(items.username)}
                    className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base"
                  >
                    {items.username}
                  </p>
                  <p className="font-Poppins text-pearl text-opacity-40 font-normal xl:text-base md:text-sm text-xs sm:fixed hidden">
                    {items.email}
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-full flex justify-end items-center xl:space-x-3 md:space-x-2 space-x-1 xl:pr-3 pr-1">
                <FriendRequestsDropDown id={items.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentFriendsRequests;
