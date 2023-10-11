import test1 from "../../../public/test1.svg";
import Image from "next/image";
import Example from "../ui/dropDown/menu";
import accept from "../../../public/active.svg"
import refuse from "../../../public/unactive.svg"
import FriendRequestsDropDown from "../ui/dropDown/friendsRequestsDropDown";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import ip from "@/utils/endPoint";
import { useEffect, useState } from "react";
import dataFriends from "@/types/friendsType";
import { useRouter } from "next/router";

const ContentFriendsRequests = () => {
  const [response, setResponse] = useState<dataFriends[]>([]); 
  const Router = useRouter();

	const handleClick = () => {
    console.log("hello world from the other side");
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/Signin");
      return ;
    }
    const jwtToken = parseJwt(JSON.stringify(token));
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
      console.log("data from friend requests: ", res.data.data);
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
                  src={test1}
                  alt="avatar"
                  className="xl:w-16 md:w-14 w-10"
                />
                <div className="h-[70%] flex justify-center flex-col">
                  <p className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base">
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
