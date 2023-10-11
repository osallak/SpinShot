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

  useEffect(() => {
    console.log(
      parseJwt(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1R3b0ZhQXV0aGVudGljYXRlZCI6ZmFsc2UsImlzVHdvRmFjdG9yRW5hYmxlZCI6ZmFsc2UsInVzZXJuYW1lIjoidXNlcjEiLCJzdWIiOiJlNzQ5NTAzMi1jNmFlLTQ1N2YtOTZiOC1iMDgzNTQ5ZWQ2Y2QiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5NzA1NDQyMiwiZXhwIjoxNjk3MTQwODIyfQ.nhnHlup9YYxkH-QuOwtinCwjg8S8Q0Uw4RvwX-V2PeY"
      )
    );
  });

  return (
    <div className="w-[99%] xl:px-4 px-2 hover:overflow-auto overflow-hidden flex items-center h-[68%] min-h-[100px]">
      {props.searchValue?.length === 0 ? (
        props.loaded === true && (
          <div className="w-full hover:overflow-auto overflow-hidden h-full">
            {(allMessages as allMessagesType).room?.map(
              (items: any, index: number) => (
                <button
                  onClick={(event) => clickChat(event, index)}
                  key={index}
                  className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                    clicked == index ? "bg-very-dark-purple" : "bg-transparent"
                  }`}
                >
                  <Image src={test1} alt="test" />
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
            )}
          </div>
        )
      ) : (
        <div className="w-full hover:overflow-auto overflow-hidden h-full">
          {(allMessages as allMessagesType).room?.map(
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
                    <Image src={test1} alt="test" />
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
          )}
        </div>
      )}
    </div>
  );
};

export default Channels;
