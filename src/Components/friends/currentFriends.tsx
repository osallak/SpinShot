import { currentFriendsAtom } from "@/components/context/recoilContext";
import dataFriends from "@/types/friendsType";
import ip from "@/utils/endPoint";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FriendsIcon from "../../../public/friend.svg";
import test1 from "../../../public/test1.svg";
import CurrentFriendsDropDown from "../ui/dropDown/currentFriendsDropDown";

const CurrentFriends = () => {
  const [loaded, setIsLoaded] = useState<boolean>(false);
  const [currentFriends, setCurrentFriends] =
    useRecoilState(currentFriendsAtom);
  const Router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
          status: "ACCEPTED",
        },
      });
      setCurrentFriends(res.data.data);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data?.message);
      console.log("error from friends: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoaded(true);
  }, [currentFriends]);

  return (
    <div className="w-[50%] h-full rounded-2xl bg-white/10 md:flex hidden justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[100px]">
        <div className="w-full h-full flex justify-center items-center flex-col">
          <div className="w-[80%] flex flex-row justify-start items-center space-x-3 h-full">
            <Image
              src={FriendsIcon}
              alt="message icon"
              className=" h-full xl:w-10 w-9"
            />
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              Friends
            </h1>
          </div>
          <div className="w-[93%] border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="w-[85%] h-[10%] min-h-[60px] flex-col">
        <h1 className="flex justify-start items-center font-Poppins text-pearl lg:text-3xl md:text-2xl text-xl font-bold h-full">
          7 Friends
        </h1>
      </div>
      <div className="h-[80%] flex flex-col items-center min-h-[100px] w-[98%] overflow-auto rounded-sm">
        {currentFriends.length > 0 ? (
          loaded === true &&
          (currentFriends as dataFriends[]).map(
            (items: dataFriends, index: number) => (
              <div key={index} className="w-full h-[90px] min-h-[80px]">
                {items.status === "ACCEPTED" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[50%] h-full flex justify-start items-center space-x-2 ">
                      <Image
                        onClick={() => goToUser(items.username)}
                        src={test1}
                        alt="avatar"
                        className="xl:w-16 md:w-14 w-10 cursor-pointer"
                      />
                      <div className="h-[70%] flex justify-center flex-col">
                        <p className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base">
                          <span
                            className="cursor-pointer"
                            onClick={() => goToUser(items.username)}
                          >
                            {items.username}
                          </span>
                        </p>
                        <p className="font-Poppins text-pearl text-opacity-40 font-normal xl:text-base md:text-sm text-xs">
                          {items.email}
                        </p>
                      </div>
                    </div>
                    <div className="w-[50%] h-full flex justify-end items-center xl:space-x-3 md:space-x-2 space-x-1 xl:pr-3 pr-1">
                      <CurrentFriendsDropDown id={items.id} />
                    </div>
                  </div>
                )}
              </div>
            )
          )
        ) : (
          <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
            {error ? errorMessage : "theire is no friends"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentFriends;
