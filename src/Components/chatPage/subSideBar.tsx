import Image from "next/image";
import messagesIcon from "../../../public/messagesIcon.svg";
import SearchInput from "@/Components/ui/Inputs/searchInput";
import test1 from "../../../public/test1.svg";
import test2 from "../../../public/test2.svg";
import test3 from "../../../public/test3.svg";
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  useCallback,
} from "react";
import IconButton from "../ui/Buttons/IconButton";
import CreateChannel from "../../../public/CreateChannel.svg";
import ExportChannels from "../../../public/ExportChannels.svg";
import axios from "axios";

interface data {
  id: string;
  avatar: string;
  username: string;
}

interface otherdata {
  Receiver: data;
}

function SubSideBar(props: {
  open: boolean;
  setOpen: Function;
  setFlag: Function;
}) {
  const [readed, setReaded] = useState(false);
  const [clicked, setClicked] = useState<number>();

  const clickChat = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setClicked(index);
  };

  const exploreChannels = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFlag("ExploreChannels");
    props.setOpen(!props.open);
  };

  const createChannels = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFlag("CreateChannels");
    props.setOpen(!props.open);
  };

  const [respo, setRespo] = useState<otherdata[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ayoubToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5b3ViIiwic3ViIjoiMTE4NTc5ZTctZGE3Yy00MGExLWI4ZmYtNGVkMjE5MDhkYTE0IiwiaXNzIjoic3BpbnNob3QiLCJpYXQiOjE2OTUyNTE2MTYsImV4cCI6MTY5NTMzODAxNn0.DN5AXkCuE6Sh-ZpubfdY66V-uS-upKFHHG2yioFZoOo";
      function parseJwt(token: string) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
      }
      const jwtToken = parseJwt(ayoubToken);
      try {
        const res = await axios.get(
          `http://e3r10p14.1337.ma:3000/chat/all`,
          {
            headers: {
              Authorization: `Bearer ${ayoubToken}`,
            },
            params: {
              id: jwtToken.sub,
            },
          }
        );
        setRespo(res.data);
        // console.log("message : ", respo);
        // console.log("response data: ", res.data[0].Receiver);
      } catch (error) {
        console.log("error of fetching data: ", error);
      }
    };
    fetchData();
  });

  const array = [
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "ataji",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "fragger",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "machlouj",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "ponpon",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "hlalouli",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "sknahs",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "navoos",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "ayoub",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "teejee",
    },
    {
      icon: test1,
      messages: "hello world from the other side",
      userName: "yakhoudr",
    },
  ]

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
          <SearchInput data={array} />
        </div>
      </div>
      <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-[70%] min-h-[100px]">
        {array.map((data, index) => (
          <button
            onClick={(event) => clickChat(event, index)}
            key={index}
            className={`flex w-full justify-start space-x-3 xl:p-3 p-2 items-center outline-none flex-row rounded-2xl ${
              clicked == index ? "bg-very-dark-purple" : "bg-transparent"
            }`}
          >
            <Image src={data.icon} alt="test" />
            <div className="flex justify-start items-start space-y-1 flex-col">
              <p className="font-poppins flex justify-start text-pearl text-lg font-semibold">
                {data.userName}
              </p>
              <p
                className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
              >
                {data.messages}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-around items-center w-full h-[10%] min-h-[60px]">
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={CreateChannel}
            content="Create channel"
            onclick={createChannels}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-center items-center">
          <IconButton
            icon={ExportChannels}
            content="Export channels"
            onclick={exploreChannels}
          />
        </div>
      </div>
    </div>
  );
}

export default SubSideBar;
