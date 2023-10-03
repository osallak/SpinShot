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

// message
// :
// "hello world 4"
// other
// :
// avatar
// :
// "defaultAvatar"
// id
// :
// "8860e10d-e9ab-4ef4-be6e-f1d076870d1b"
// username
// :
// "utilisateur2"
// [[Prototype]]
// :
// Object
// sender
// :
// "8860e10d-e9ab-4ef4-be6e-f1d076870d1b"
// sentAt
// :
// "3"

interface other {
  avatar: string;
  id: string;
  username: string;
}

interface data {
  message: string;
  other: other;
  sender: string;
  sentAt: string;
}

function SubSideBar(props: {
  open: boolean;
  setOpen: Function;
  setFlag: Function;
}) {
  const [readed, setReaded] = useState(false);
  const [clicked, setClicked] = useState<number>();
  const [searchValue, setSearchValue] = useState("");

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

  const [respo, setRespo] = useState<data[]>([]);

  const fetchData = async () => {
    const ayoubToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InV0aWxpc2F0ZXVyMSIsInN1YiI6ImMyYmFiMWRkLTY3MWUtNGJlNC04OWE2LTY2ZGU5NjlmYjdmMiIsImlzcyI6InNwaW5zaG90IiwiaWF0IjoxNjk2MzI5MjkxLCJleHAiOjE2OTY0MTU2OTF9.squkJh4GumVqR7EGvN55PrPHLyYVsmxvqCH35KnUwyQ";
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
      const res = await axios.get(`http://e3r10p18.1337.ma:3000/chat/all`, {
        headers: {
          Authorization: `Bearer ${ayoubToken}`,
        },
        params: {
          id: jwtToken.sub,
        },
      });
      setRespo(res.data.individual);
      console.log("message: ", res.data.individual[0]);
      // console.log("response data: ", res.data[0].Receiver);
    } catch (error) {
      console.log("error of fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const array = [
    {
      icon: test1,
      message: "hello world from the other side",
      username: "ataji",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "fragger",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "machlouj",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "ponpon",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "hlalouli",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "sknahs",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "navoos",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "ayoub",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "teejee",
    },
    {
      icon: test1,
      message: "hello world from the other side",
      username: "yakhoudr",
    },
  ];

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
          {array.map((data, index) => (
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
                  {data.username}
                </p>
                <p
                  className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                >
                  {data.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-[99%] xl:px-6 px-2 hover:overflow-auto overflow-hidden h-[70%] min-h-[100px]">
          {array.map((data, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center outline-none rounded-2xl"
            >
              {data.username.startsWith(searchValue) && (
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
                      {data.username}
                    </p>
                    <p
                      className={`font-poopins text-pearl flex justify-start text-sm font-medium opacity-40`}
                    >
                      {data.message}
                    </p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
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
