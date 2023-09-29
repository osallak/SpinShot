import Image from "next/image";
import FriendsIcon from "../../../public/friend.svg";

const CurrentFriends = () => {
  return (
    <div className="w-[50%] h-full rounded-2xl bg-white/10">
      <div className="flex justify-center items-center flex-col w-full h-[130px]">
        <div className="w-full h-[130px] flex-col px-14">
          <div className="w-full px-8 pt-5 flex flex-row space-x-3 h-[130px]">
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
      <div className="flex justify-center items-center flex-col w-full h-[130px]">
        <div className="w-full h-[130px] flex-col px-24">
          <div className="w-full pt-5 flex flex-row space-x-3 h-[130px]">
            <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
              7 Friends
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentFriends;
