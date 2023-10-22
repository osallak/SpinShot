"use client";
import individualType from "@/types/individulaTypes";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentFriendsAtom } from "../context/recoilContext";
import { channelAtom } from "../context/recoilContextChannel";
import { individualAtom } from "../context/recoilContextIndividual";

const Individual = (props: {
  searchValue: string;
  loaded: boolean;
  setId: Function;
  id: string;
  reload: boolean;
  setReload: Function;
  setIsLoaded: Function;
}) => {
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const [clicked, setClicked] = useState<number>(0);
  const router = useRouter();
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [currentFriend, setCurrentFriends] = useRecoilState(currentFriendsAtom);
  const [lastMessage, setLastMessage] = useState("");

  const clickChat = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
    id: string
  ) => {
    event.preventDefault();
    setClicked(index);
    props.setId(id);
  };

  const fetchDataSubSideBar = async () => {
    if (router.query.id) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }
      const jwtToken = parseJwt(token);
      try {
        const res = await axios.get(`${ip}/chat/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: jwtToken.sub,
          },
        });
        setIndividual(res?.data?.individual);
        props.setReload(true);
        const returnedId = res.data?.individual.find(
          (items: any) => items.other.id === router.query.id
        );
        if (returnedId) props.setId(returnedId.other.id);
        else {
          if (router.query.id === parseJwt(token).sub) {
            props.setId(res?.data?.individual[0]?.other?.id);
          } else {
            const fromFriends: any = currentFriend.find(
              (items: any) => items.id === router.query.id
            );
            if (fromFriends) props.setId(fromFriends.id);
            setIndividual((prev: individualType[]) => {
              const newConv: individualType = {
                message: "",
                other: {
                  avatar: fromFriends.avatar,
                  id: fromFriends.id,
                  username: fromFriends.username,
                },
                sender: "",
                sentAt: "",
              };
              return [newConv, ...prev] as any;
            });
          }
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchDataSubSideBar();
    props.setIsLoaded(true);
  }, [router.query.id, router.isReady]);

  return (
    <div className="w-[99%] xl:px-4 px-2 hover:overflow-auto overflow-hidden h-[68%] min-h-[100px] flex items-center">
      {props.searchValue?.length === 0 ? (
        props.loaded === true && (
          <div className="w-full hover:overflow-auto overflow-hidden h-full">
            {(individual as individualType[]).length ? (
              (individual as individualType[])?.map(
                (items: individualType, index: number) => (
                  <button
                    onClick={(event) => clickChat(event, index, items.other.id)}
                    key={index}
                    className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl md:h-20 h-14 ${
                      items.other.id === props.id
                        ? "bg-very-dark-purple"
                        : "bg-transparent"
                    }`}
                  >
                    <Image
                      src={items.other.avatar}
                      alt="test"
                      width={500}
                      height={500}
                      className="md:w-14 sm:w-12 w-10 rounded-xl"
                    />
                    <div className="flex justify-start items-start md:space-y-1 space-y-0 flex-col">
                      <p className="font-poppins flex justify-start text-pearl md:text-lg text-base font-semibold">
                        {items.other.username}
                      </p>
                      <p
                        className={`font-poppins text-pearl flex justify-start md:text-sm text-xs font-medium opacity-40`}
                      >
                        {items.message.length > 15
                          ? items.message.slice(0, 20) + " ..."
                          : items.message}
                      </p>
                    </div>
                  </button>
                )
              )
            ) : (
              <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
                theire is no chat
              </div>
            )}
          </div>
        )
      ) : (
        <div className="w-full hover:overflow-auto overflow-hidden h-full">
          {(individual as individualType[]).length ? (
            (individual as individualType[])?.map(
              (items: individualType, index: number) =>
                items.other?.username.startsWith(props.searchValue) && (
                  <div
                    key={index}
                    className="w-full flex justify-center items-center outline-none md:h-20 h-14  rounded-2xl"
                  >
                    <button
                      onClick={(event) =>
                        clickChat(event, index, items.other.id)
                      }
                      key={index}
                      className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                        items.other.id === props.id
                          ? "bg-very-dark-purple"
                          : "bg-transparent"
                      }`}
                    >
                      <Image
                        src={items.other.avatar}
                        alt="test"
                        width={500}
                        height={500}
                        className="md:w-14 sm:w-12 w-10 rounded-xl"
                      />
                      <div className="flex justify-start items-start md:space-y-1 space-y-0  flex-col">
                        <p className="font-poppins flex justify-start text-pearl md:text-lg text-base font-semibold">
                          {items.other.username}
                        </p>
                        <p
                          className={`font-poopins text-pearl flex justify-start md:text-sm text-xs  font-medium opacity-40`}
                        >
                          {lastMessage.length > 15
                            ? lastMessage.slice(0, 20) + " ..."
                            : lastMessage}
                        </p>
                      </div>
                    </button>
                  </div>
                )
            )
          ) : (
            <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
              theire is no chat
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Individual;
