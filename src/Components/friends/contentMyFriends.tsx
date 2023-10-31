"use client";
import { currentFriendsAtom } from "@/Components/context/recoilContext";
import dataFriends from "@/types/friendsType";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CurrentFriendsDropDown from "../ui/FolderDropDown/currentFriendsDropDown";

const ContentMyFriends = () => {
  const [currentFriends, setCurrentFriends] =
    useRecoilState(currentFriendsAtom);
  const [loaded, setIsLoaded] = useState<boolean>(false);
  const Router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const goToUser = (username: string) => {
    Router.push(`/profile/${username}`);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (
      !token ||
      (parseJwt(token).isTwoFactorEnabled &&
        !parseJwt(token).isTwoFaAuthenticated)
    ) {
      Router.push("/signin");
      return;
    }
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "ACCEPTED",
        },
      });
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoaded(true);
  }, [currentFriends]);

  return (
    <>
      <div className="w-[85%] h-[10%] min-h-[60px] flex flex-col">
        <h1 className="flex justify-start items-center font-Poppins text-pearl lg:text-3xl md:text-2xl text-base font-bold h-full">
          {currentFriends.length} Friends
        </h1>
      </div>
      <div className="h-[70%] flex flex-col items-center min-h-[100px] w-[95%] overflow-auto rounded-sm">
        {currentFriends?.length > 0 ? (
          loaded === true &&
          (currentFriends as dataFriends[]).map(
            (items: dataFriends, index: number) => (
              <div key={index} className="w-full h-[60px] min-h-[60px]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-[50%] h-full flex justify-start items-center space-x-2">
                    <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] min-h-[40px] min-w-[40px] ">
                      <Image
                        onClick={() => goToUser(items.username)}
                        src={items.avatar}
                        width={500}
                        height={500}
                        alt="avatar"
                        className="w-full h-full rounded-xl cursor-pointer"
                      />
                    </div>
                    <div className="h-[70%] flex justify-center flex-col">
                      <p
                        onClick={() => goToUser(items.username)}
                        className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base cursor-pointer"
                      >
                        {items.username}
                      </p>
                      <p className="font-Poppins text-pearl text-opacity-40 font-extralight xl:text-base md:text-sm text-xs sm:fixed hidden">
                        {items.email}
                      </p>
                    </div>
                  </div>
                  <div className="w-[50%] h-full flex justify-end items-center xl:space-x-3 md:space-x-2 space-x-1 xl:pr-3 pr-1">
                    <CurrentFriendsDropDown id={items.id} />
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
            {error ? errorMessage : "theire is no friends"}
          </div>
        )}
      </div>
    </>
  );
};

export default ContentMyFriends;
