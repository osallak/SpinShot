import Image from "next/image";
import FriendsIcon from "../../../public/friend.svg";
import test1 from "../../../public/test1.svg"

const CurrentFriends = () => {
  const array = [
    {
      icon: test1,
      name: "TeeJee",
    },
    {
      icon: test1,
      name: "SKNAHS",
    },
    {
      icon: test1,
      name: "FRAG33R",
    },
    {
      icon: test1,
      name: "/API",
    },
    {
      icon: test1,
      name: "l3zawa",
    },
    {
      icon: test1,
      name: "Navoos",
    },
    {
      icon: test1,
      name: "PonPon",
    },
  ]
  return (
    <div className="w-[50%] h-full rounded-2xl bg-white/10 flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[100px]">
        <div className="w-full h-full flex-col px-14">
          <div className="w-full px-8 pt-5 flex flex-row space-x-3 h-full">
            <Image
              src={FriendsIcon}
              alt="message icon"
              className=" h-full xl:w-10 w-9"
            />
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              Friends
            </h1>
          </div>
          <div className="w-full border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col w-full h-[10%] min-h-[100px]">
        <div className="w-full h-[130px] flex-col px-24">
          <div className="w-full pt-5 flex flex-row space-x-3 h-[130px]">
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              7 Friends
            </h1>
          </div>
        </div>
      </div>
      <div className="border h-[80%] flex flex-col items-center min-h-[100px] w-full overflow-auto">
        {array.map((items, index) => (
          <div key={index} className="w-full h-[90px] border border-red-500">
            <div>
            <Image src={items.icon} alt="avatar" />
            <p>{items.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentFriends;
