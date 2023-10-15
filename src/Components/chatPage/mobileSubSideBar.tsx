import SearchInput from "@/Components/ui/Inputs/searchInput";
import ip from "@/utils/endPoint";
import dataSubSideBar from "@/types/messagesArrays";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import messagesIcon from "../../../public/messagesIcon.svg";
import test1 from "../../../public/test1.svg";
import IconButton from "../ui/Buttons/iconButton";
import axios from "axios";
import token from "@/utils/token";

function MobileSubSideBar(props: {
  open: boolean;
  setOpen: Function;
  setFlag: Function;
  data: dataSubSideBar[];
}) {
  const [clicked, setClicked] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  // const [responseExploreChannels, setResponseExploreChannels] = useState()

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const exploreChannels = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${ip}/room/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("response from explore channel: ", res.data);
    } catch (error: any) {
      console.log("error from explore channel: ", error);
    }
    props.setFlag("ExploreChannels");
    props.setOpen(!props.open);
  };

  const createChannels = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFlag("CreateChannels");
    props.setOpen(!props.open);
  };

  return (
    <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl w-[25%] min-w-[350px]">
      <div className="flex justify-center items-center flex-col w-full h-[10%] md:min-h-[100px] min-h-[70px]">
        <div className="w-full h-full flex-col px-6">
          <div className="w-full  pt-5 flex flex-row space-x-3 h-full">
            <Image
              src={messagesIcon}
              alt="message icon"
              className=" h-full xl:w-10 w-9"
            />
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              Messages
            </h1>
          </div>
          <div className="w-full border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-[10%] min-h-[55px]">
        <div className="w-[90%] h-[45px] rounded-full">
          <SearchInput setValue={setSearchValue} />
        </div>
      </div>
      {searchValue.length === 0 ? (
        <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-[70%] min-h-[100px]">
          {props.data.map((items, index) => (
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
                  {/* {items.other.username} */}
                </p>
                <p
                  className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                >
                  {/* {items.message} */}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-[70%] min-h-[100px]">
          {props.data.map((items, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center outline-none rounded-2xl"
            >
              {/* {items.other.username.startsWith(searchValue) && (
                <button
                  onClick={(event) => clickChat(event, index)}
                  key={index}
                  className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
                    clicked == index ? "bg-very-dark-purple" : "bg-transparent"
                  }`}
                >
                  <Image src={items.other.avatar} alt="test" />
                  <div className="flex justify-start items-start space-y-1 flex-col">
                    <p className="font-poppins flex justify-start text-pearl text-lg font-semibold">
                      {items.other.username}
                    </p>
                    <p
                      className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                    >
                      {items.message}
                    </p>
                  </div>
                </button>
              )} */}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-around items-center w-full h-[10%] min-h-[60px]">
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={CreateChannel}
            content="Create channel"
            // onclick={createChannels} TODO: correct this one
            onclick={() => {}}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={ExportChannels}
            content="Export channels"
            // onclick={exploreChannels}
            onclick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileSubSideBar;
