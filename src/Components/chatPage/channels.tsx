import allMessagesType from "@/types/messagesArrays";
import parseJwt from "@/utils/parsJwt";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import test1 from "../../../public/test1.svg";
import { chatAll } from "../context/recoilContext";

const Channels = (props: { searchValue: string; loaded: boolean }) => {
  const [allMessages, setAllMessages] = useRecoilState(chatAll);
  const [clicked, setClicked] = useState<number>();

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const sp = (name: string) => {
    const res = name.split(" ");
    if (res.length > 2) for (let i = 0; i < res.length; i++) res.pop();
    return res;
  };

  return (
    <div className="w-[99%] xl:px-4 px-2 hover:overflow-auto overflow-hidden flex items-center h-[68%] min-h-[100px]">
      {props.searchValue?.length === 0 ? (
        props.loaded === true && (
          <div className="w-full hover:overflow-auto overflow-hidden h-full">
            {(allMessages as allMessagesType).room?.length ? (
              (allMessages as allMessagesType).room?.map(
                (items: any, index: number) =>
                  items.messages.length !== 0 && (
                    <button
                      onClick={(event) => clickChat(event, index)}
                      key={index}
                      className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                        clicked == index
                          ? "bg-very-dark-purple"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] h-full flex justify-center items-center">
                        <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] md:rounded-2xl rounded-xl bg-white/20 flex justify-center items-center">
                          <div className="font-Poppins md:text-4xl sm:text-3xl text-2xl font-thin text-very-dark-purple flex justify-center items-center">
                            {sp(items.id).map((charName, index) => (
                              <p key={index} className="uppercase">
                                {charName[0]}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start items-start space-y-1 flex-col">
                        <p className="font-poppins flex justify-start text-pearl text-lg font-semibold">
                          {items.id}
                        </p>
                        {items.messages.map((items: any, index: number) => (
                          <p
                            key={index}
                            className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                          >
                            {items.message}
                          </p>
                        ))}
                      </div>
                    </button>
                  )
              )
            ) : (
              <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
                theire is no channel
              </div>
            )}
          </div>
        )
      ) : (
        <div className="w-full hover:overflow-auto overflow-hidden h-full">
          {(allMessages as allMessagesType).room?.length ? (
            (allMessages as allMessagesType).room?.map(
              (items: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex justify-center items-center outline-none rounded-2xl"
                >
                  {items.id.startsWith(props.searchValue) && (
                    <button
                      onClick={(event) => clickChat(event, index)}
                      key={index}
                      className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                        clicked == index
                          ? "bg-very-dark-purple"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] h-full flex justify-center items-center">
                        <div className="lg:w-[70px] md:w-[60px] sm:w-[50px] w-[40px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] md:rounded-2xl rounded-xl bg-white/20 flex justify-center items-center">
                          <div className="font-Poppins md:text-4xl sm:text-3xl text-2xl font-thin text-very-dark-purple flex justify-center items-center">
                            {sp(items.id).map((charName, index) => (
                              <p key={index} className="uppercase">
                                {charName[0]}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start items-start space-y-1 flex-col">
                        <p className="font-poppins flex justify-start text-pearl text-lg font-semibold">
                          {items.id}
                        </p>
                        {items.messages.map((items: any, index: number) => (
                          <p
                            key={index}
                            className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                          >
                            {items.message}
                          </p>
                        ))}
                      </div>
                    </button>
                  )}
                </div>
              )
            )
          ) : (
            <div className="font-Poppins text-pearl text-opacity-40 w-[99.5%] py-8 flex flex-col items-center md:h-[80%] md:min-h-[100px] h-[82%] min-h-[70px] space-y-1 hover:overflow-auto overflow-hidden justify-center">
              theire is no channel
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Channels;
