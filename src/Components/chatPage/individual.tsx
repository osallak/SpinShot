import { individualData } from "@/types/messagesArrays";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import test1 from "../../../public/test1.svg";
import { chatAll, individualAtom } from "../context/recoilContext";

const Individual = (props: { searchValue: string; loaded: boolean; setId: Function }) => {
  const [allMessages, setAllMessages] = useRecoilState(chatAll);
  const [individual, setIndividual] = useRecoilState(individualAtom);
  const [clicked, setClicked] = useState<number>(0);

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number, id: string) => {
    event.preventDefault();
    setClicked(index);
    props.setId(id)
  };

  return (
    <div className="w-[99%] xl:px-4 px-2 hover:overflow-auto overflow-hidden h-[68%] min-h-[100px] flex items-center">
      {props.searchValue?.length === 0 ? (
        props.loaded === true && (
          <div className="w-full hover:overflow-auto overflow-hidden h-full">
            {(individual as individualData[]).length ? (
              (individual as individualData[])?.map(
                (items: any, index: number) => (
                  <button
                    onClick={(event) => clickChat(event, index, items.other.id)}
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
                        {items.other.username}
                      </p>
                      <p
                        className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                      >
                        {items.message.length > 15
                          ? items.message.substr(0, 15) + " ..."
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
          {(individual as individualData[]).length ? (
            (individual as individualData[])?.map(
              (items: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex justify-center items-center outline-none rounded-2xl"
                >
                  {items.other?.username.startsWith(props.searchValue) && (
                    <button
                      onClick={(event) => clickChat(event, index, items.other.id)}
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
                          {items.other?.username}
                        </p>
                        <p
                          className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                        >
                          {items.message}
                        </p>
                      </div>
                    </button>
                  )}
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
