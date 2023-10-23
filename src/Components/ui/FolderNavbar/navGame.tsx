import React, { use, useEffect } from "react";
import test1 from "./../../../../public/test1.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../../redux_tool";
import { useRouter } from "next/router";
import parseJwt from "@/utils/parsJwt";
import { getProfile } from "../../../../redux_tool/redusProfile/profileThunk";

const NavGame = (props: any) => {
  const data = useAppSelector((state) => state.Profile);
  const dispatch = useAppDispatch();
  const router = useRouter();


  const getData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // console.log("data game zeb", props.matchData);

  useEffect(() => {
    getData();
  }, [props?.score]);

  console.log("data game zeb", props.dataGame);

  return (
    <div className="  w-[96%] c-gb:w-[80%]  bg-very-dark-purple rounded-xl sm:rounded-3xl flex justify-between flex-row items-center px-[2%] absolute top-16 md:top-6 p-3 ">
      <div className="flex  flex-row items-center justify-between w-[50%] ">
        <div className="flex  c-gb:space-x-8  ">
          {data?.profile?.profile?.avatar ? (
            <picture>
              <img
                className="w-14 h-14 rounded-xl"
                src={data?.profile?.profile?.avatar}
                alt=""
              />
            </picture>
          ) : (
              <Image className=" w-14 h-14 rounded-xl" src={test1} alt="" />
          )}
          <div className="p-1">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">
              {data?.profile?.username}
            </h1>
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
              {data?.profile?.profile?.rank}
            </h1>
          </div>
        </div>
        <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-end   ">
          {/* <h1 className=" hidden md:flex text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
            Level{" "}
          </h1> */}
          <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">
              {props?.score?.userScore ? props?.score?.userScore : 0}
            </h1>
          </div>
        </div>
      </div>
      <div className=" sm:p-1 x-3xl:p-3  text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40 p-1">
        vs
      </div>
      <div className="flex flex-row items-center  justify-between w-[50%] ">
        <div className="flex flex-row space-x-1 c-gb:space-x-5 items-center justify-start   ">
          <div className="  flex items-center justify-center rounded-2xl bg-white/10 p-2">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-peridot">
              {props?.score?.opponentScore ? props?.score?.opponentScore : 0}
            </h1>
          </div>
          {/* <h1 className=" hidden md:flex text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
            Level{" "}
          </h1> */}
        </div>
        <div className="flex justify-end  c-gb:space-x-8 ">
          <div className="flex  flex-col items-end justify-start p-1">
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl">
              {props.dataGame?.username}
            </h1>
            <h1 className=" text-xs sm:text-lg c-3xl:text-3xl text-pearl opacity-40">
              {props.dataGame?.profile?.rank}
            </h1>
          </div>
          {props.dataGame?.profile?.avatar ? (
            <picture>
              <img
                className=" w-14 h-14 rounded-xl"
                src={props.dataGame?.profile?.avatar}
                alt=""
              />
            </picture>
          ) : (
            <Image className=" w-14 h-14 rounded-xl" src={test1} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavGame;
