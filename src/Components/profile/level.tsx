import { logos } from "@/Components/ui/FolderDropDown/ArrayIcon";
import DropdownUser from "@/Components/ui/FolderDropDown/DropdownUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux_tool";
import level from "./../../../public/levleIcon.svg";

const Levle = (props: any) => {
  const opned = props.opne;
  const data = useAppSelector((state) => state.Profile);
  const [my_levle, setLevle] = useState<number>(0);
  const [rank, setRank] = useState<number>(0);
  const router = useRouter();

  const isValueNaN = (value: any) => {
    return isNaN(value);
  };

  const getMyRank = (rank: number) => {
    if (!isValueNaN(rank)) {
      setRank(Math.floor(rank));
      const nb = parseFloat((rank % 1).toFixed(2));
      const print = nb * 100;
      setLevle(print);
    } else {
      setMyRank(0);
    }
  };

  const setMyRank = (rank: number) => {
    setRank(rank);
    setLevle(0);
  };

  useEffect(() => {
    getMyRank(data.profile?.profile?.level);
  }, [data]);

  // const sendInvitation = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/signin");
  //     return;
  //   }
  //   const twoFA = parseJwt(JSON.stringify(token));
  //   if (twoFA.isTwoFactorEnabled && !twoFA.isTwoFaAuthenticated) {
  //     router.push("/signin");
  //     return;
  //   }
  //   try {
  //     await axios.post(`${process.env.NEXT_PUBLIC_API}/friends/${router.query.id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     toast.success("user invited successfully");
  //   } catch (error: any) {
  //     // console.log(error);
  //   }
  // };

  // const HandleState = (name: any) => {
  //   // console.log("--->", name);
  // if (props.letPlay[0].name == "Sign out") {
  //   localStorage.removeItem("token");
  //   router.push("/signin");
  // } else {
  //   if (props.letPlay[0].name == "Invite to channel") {
  //     // console.log("1");
  //     props.setInvite(true);
  //   } else if (props.letPlay[1].name == "Invite") {
  //     // console.log("2");
  //     sendInvitation();
  //   }
  // }
  // };

  return (
    <div
      className={`rounded-[20px]  ${
        opned && props.width! < 1024
          ? "opacity-10   backdrop:blur bg-white/10 "
          : "backdrop:blur bg-white/10 "
      }  w-full flex flex-col`}
    >
      <div className="relative rounded-[20px]  w-full  h-[250px] c-gb:h-[70%]  flex flex-row justify-center ">
        <div className="absolute w-[120px] sm:w-[20%] c-gb:w-[10rem] c-10xl:w-[12rem] c-10xl:top-14  flex flex-col items-center justify-center  h-[80%] top-10 ">
          <span className="text-xl md:text-2xl c-gb:text-3xl text-pearl ">
            {data.profile?.profile?.rank}
          </span>
          {logos.map((option: any) => (
            <div key={option.id} className="w-full h-full ">
              {data.profile?.profile?.rank == option.rank ? (
                <Image src={option.logo} alt="" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="  right-0 absolute p-8 hidden c-gb:block ">
          <DropdownUser setInvite={props.setInvite} Array={props.letPlay} />
        </div>
      </div>
      <div className=" flex items-center justify-center flex-col  rounded-[20px] w-full h-[100px] c-gb:h-[30%]">
        <div className=" text-xl flex  justify-between  text-pearl  opacity-40 w-[85%]">
          <div className="flex flex-row space-x-1 text-xs sm:text-lg">
            <Image className="" src={level} alt="" /> <span>level</span>{" "}
            <span>{rank}</span>
          </div>
          <div className="text-xs sm:text-lg">
            <span>{my_levle}/100</span>
          </div>
        </div>
        <div className=" bg-very-dark-purple rounded-[20px] w-[90%] h-[25%] c-gb:h-[30%] flex items-center justify-start p-1">
          <div
            className={`rounded-[20px] bg-peridot  h-[100%] `}
            style={{ width: `${my_levle}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Levle;
